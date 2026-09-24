import { test, before, after } from 'node:test'
import assert from 'node:assert/strict'
import { deflateSync } from 'node:zlib'
import { chromium } from 'playwright'
import { CHANNEL_THRESHOLD, COL_GAP, ROW_GAP, compareInPage } from '../scripts/compare.mjs'

/* Метрика дифа считалась только вручную — независимым пересчётом по семи парам прогона.
   Здесь она закрепляется на снимках, у которых разница известна по построению: PNG
   собираются прямо тут (фильтр 0, RGBA, без цветового профиля — sRGB по умолчанию и с
   обеих сторон), поэтому ожидания не взяты из самого сравнения и не сойдутся с ним
   случайно. Браузер настоящий: comparePair декодирует PNG через Image и читает пиксели
   через canvas, и ветка разных размеров сторон живёт именно в декодировании. */

const CRC = Uint32Array.from({ length: 256 }, (_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c >>> 0
})
const crc32 = (buf) => {
  let c = 0xffffffff
  for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}
const chunk = (type, data) => {
  const head = Buffer.alloc(8)
  head.writeUInt32BE(data.length, 0)
  head.write(type, 4, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([head.subarray(4), data])), 0)
  return Buffer.concat([head, data, crc])
}
/* pixel(x, y) → [r, g, b]; альфа всегда 255 — снимки стенда непрозрачны, а прозрачность
   дала бы предумноженную альфу при чтении из canvas и увела бы ожидания. */
const png = (w, h, pixel) => {
  const raw = Buffer.alloc((w * 4 + 1) * h)
  for (let y = 0; y < h; y++) {
    const row = y * (w * 4 + 1)
    raw[row] = 0
    for (let x = 0; x < w; x++) {
      const [r, g, b] = pixel(x, y)
      const i = row + 1 + x * 4
      raw[i] = r
      raw[i + 1] = g
      raw[i + 2] = b
      raw[i + 3] = 255
    }
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0)
  ihdr.writeUInt32BE(h, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  const body = Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0))
  ])
  return `data:image/png;base64,${body.toString('base64')}`
}
const solid = (w, h, rgb) => png(w, h, () => rgb)
const WHITE = [255, 255, 255]
const BLACK = [0, 0, 0]

let browser
let page
before(async () => {
  browser = await chromium.launch()
  page = await browser.newPage()
})
after(async () => {
  await browser.close()
})

const compare = (appData, kitData) =>
  page.evaluate(compareInPage, { appData, kitData, CHANNEL_THRESHOLD, ROW_GAP, COL_GAP })

test('совпадающие снимки дают нули по всем счётчикам', async () => {
  const r = await compare(solid(4, 4, [128, 128, 128]), solid(4, 4, [128, 128, 128]))
  assert.equal(r.exactDiffPixels, 0)
  assert.equal(r.thresholdDiffPixels, 0)
  assert.equal(r.missingAreaPixels, 0)
  assert.equal(r.diffPixels, 0)
  assert.equal(r.maxChannelSum, 0)
  assert.equal(r.diffRatio, 0)
  assert.equal(r.sizeMismatch, false)
  assert.deepEqual(r.regions, [])
})

test('порог строгий: d, равное порогу, расхождением не считается', async () => {
  const d = CHANNEL_THRESHOLD / 3
  const r = await compare(solid(4, 4, [100, 100, 100]), solid(4, 4, [100 + d, 100 + d, 100 + d]))
  assert.equal(r.maxChannelSum, CHANNEL_THRESHOLD)
  assert.equal(r.thresholdDiffPixels, 0)
  assert.equal(r.exactDiffPixels, 16, 'побайтовый счётчик считает то, что порог отбрасывает')
  assert.deepEqual(r.regions, [])
})

test('d на единицу выше порога считается расхождением', async () => {
  const d = CHANNEL_THRESHOLD / 3
  const r = await compare(solid(4, 4, [100, 100, 100]), solid(4, 4, [100 + d, 100 + d, 101 + d]))
  assert.equal(r.maxChannelSum, CHANNEL_THRESHOLD + 1)
  assert.equal(r.thresholdDiffPixels, 16)
  assert.equal(r.diffPixels, 16)
})

/* Число 30 названо в описании метрики в report.json и в bench/README.md как обоснованное
   замером (шум 5 против слабейшего настоящего расхождения 563). Тихой сменой оно
   обесценит оба текста разом. */
test('порог метрики равен 30', () => {
  assert.equal(CHANNEL_THRESHOLD, 30)
})

test('сдвиг линии на 1px: различаются обе строки, обе стороны целиком', async () => {
  const app = png(8, 8, (_x, y) => (y === 2 ? BLACK : WHITE))
  const kit = png(8, 8, (_x, y) => (y === 3 ? BLACK : WHITE))
  const r = await compare(app, kit)
  assert.equal(r.thresholdDiffPixels, 16)
  assert.equal(r.exactDiffPixels, 16)
  assert.equal(r.maxChannelSum, 765)
  assert.equal(r.missingAreaPixels, 0)
  assert.equal(r.diffRatio, 16 / 64)
  assert.equal(r.regions.length, 1)
  assert.deepEqual(
    { ...r.regions[0], clusters: r.regions[0].clusters.length },
    { y0: 2, y1: 3, x0: 0, x1: 7, pixels: 16, clusters: 1 }
  )
})

test('разная высота сторон: недостающая площадь различается безусловно', async () => {
  const r = await compare(solid(4, 6, [20, 30, 40]), solid(4, 4, [20, 30, 40]))
  assert.deepEqual(r.canvasSize, { w: 4, h: 6 })
  assert.equal(r.missingAreaPixels, (6 - 4) * 4)
  assert.equal(r.thresholdDiffPixels, 0)
  assert.equal(r.exactDiffPixels, 0, 'площадь за пределами стороны не идёт в побайтовый счётчик')
  assert.equal(r.diffPixels, 8)
  assert.equal(r.diffRatio, 8 / 24)
  assert.equal(r.sizeMismatch, true)
})

test('разрыв шире COL_GAP режет полосу на кластеры', async () => {
  const spot = (x, y) => (y >= 4 && y <= 5 && ((x >= 0 && x <= 2) || (x >= 20 && x <= 22)) ? BLACK : WHITE)
  const r = await compare(solid(40, 10, WHITE), png(40, 10, spot))
  assert.equal(r.thresholdDiffPixels, 12)
  assert.equal(r.regions.length, 1, 'строки 4 и 5 смежны — полоса одна')
  const band = r.regions[0]
  assert.deepEqual({ y0: band.y0, y1: band.y1, x0: band.x0, x1: band.x1, pixels: band.pixels }, { y0: 4, y1: 5, x0: 0, x1: 22, pixels: 12 })
  assert.deepEqual(band.clusters, [
    { x0: 0, x1: 2, pixels: 6, area: 6, density: 1 },
    { x0: 20, x1: 22, pixels: 6, area: 6, density: 1 }
  ])
})
