import { test } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, rm, utimes, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { staleReason } from '../scripts/stale.mjs'

/* Ловушка прогона 2026-09-17: сторону переснимали, а diff.mjs пропускал пару по готовой
   картинке в diff/ и годной записи в report.json и молча отдавал прежние числа. Прогон
   при этом выглядел сделанным. Здесь закрепляется обратное: снимок новее вывода —
   пересчёт, и решение принимается по временам файлов, а не по флагу от человека. */

/* Времена задаются явно: «записали позже» на быстрой файловой системе может уложиться
   в одну миллисекунду, и тест ловил бы разрешение таймера, а не правило. */
const at = (sec) => new Date(1_700_000_000_000 + sec * 1000)

async function pair({ app, kit, diff }) {
  const dir = await mkdtemp(path.join(tmpdir(), 'parity-stale-'))
  const p = { app: path.join(dir, 'app.png'), kit: path.join(dir, 'kit.png'), diff: path.join(dir, 'diff.png'), dir }
  for (const side of ['app', 'kit', 'diff']) {
    const sec = { app, kit, diff }[side]
    if (sec === null) continue
    await writeFile(p[side], '')
    await utimes(p[side], at(sec), at(sec))
  }
  return p
}
const check = async (times) => {
  const p = await pair(times)
  try {
    return staleReason(p.diff, p.app, p.kit)
  } finally {
    await rm(p.dir, { recursive: true, force: true })
  }
}

test('снимок app новее дифа — пара устарела', async () => {
  const reason = await check({ app: 200, kit: 100, diff: 150 })
  assert.match(reason, /app/, 'причина должна называть сторону, иначе пересчёт неотличим от обычного')
})

test('снимок kit новее дифа — пара устарела', async () => {
  assert.match(await check({ app: 100, kit: 200, diff: 150 }), /kit/)
})

test('обе стороны новее дифа — причина называет обе', async () => {
  const reason = await check({ app: 200, kit: 210, diff: 150 })
  assert.match(reason, /app/)
  assert.match(reason, /kit/)
})

test('диф новее обоих снимков — пара свежая', async () => {
  assert.equal(await check({ app: 100, kit: 110, diff: 200 }), null)
})

/* Граница: съёмка и диф одной секунды — это тот же прогон, а не пересъёмка. Иначе
   каждая пара пересчитывалась бы на каждом запуске и идемпотентность исчезла бы. */
test('времена совпадают — пара свежая', async () => {
  assert.equal(await check({ app: 150, kit: 150, diff: 150 }), null)
})

/* stat по отсутствующему файлу бросает — на этом терялась бы ветка «нет снимка app».
   Сама по себе пропажа стороны устареванием не считается: сравнивать не с чем. */
test('снимка стороны нет, уцелевшая не новее дифа — пара свежая', async () => {
  assert.equal(await check({ app: null, kit: 100, diff: 200 }), null)
})

/* А вот это — тот же случай, из-за которого пункт и написан: app переснимали, съёмка
   упала и shoot.mjs удалил PNG, kit переснялся успешно. Промолчать значит оставить в
   отчёте прежние числа как действующие. Сказав, свежесть отдаёт пару ветке «нет снимка
   app», которая называет причину точнее и видна в отчёте. */
test('снимка стороны нет, но уцелевшая новее дифа — пара устарела', async () => {
  assert.match(await check({ app: null, kit: 100, diff: 50 }), /kit/)
})

test('картинки дифа нет — свежесть молчит, пара и так пересчитывается', async () => {
  assert.equal(await check({ app: 200, kit: 200, diff: null }), null)
})
