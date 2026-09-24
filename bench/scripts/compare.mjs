/* Метрика стенда визуальной сверки: сравнение пары снимков и картинка различий.
   Вынесена из diff.mjs отдельным модулем, чтобы её можно было закрепить тестом
   (bench/tests/parity-compare.test.mjs) — это те самые числа, из которых складывается отчёт
   и критерий приёмки, и до теста они были проверены только вручную.

   compareInPage исполняется НЕ в Node, а в странице Chromium: Playwright сериализует
   её через toString() и передаёт туда исходником. Отсюда единственное, но жёсткое
   ограничение: функция не смеет ссылаться ни на что из области модуля — ни на
   константы ниже, ни на импорты. Всё, что ей нужно, приходит единственным аргументом
   (вызывающий передаёт пороги явно). Ссылка на внешнее имя не сломает сборку и не
   будет видна в тесте — она упадёт в рантайме и только на той ветке, которая её
   тронет. Именно поэтому пороги здесь — аргументы, а не замыкание.

   Различающийся пиксель: d = |ΔR|+|ΔG|+|ΔB| (альфа отброшена, снимки непрозрачны) >
   CHANNEL_THRESHOLD. Обоснование числа — в шапке diff.mjs и bench/README.md. */

export const CHANNEL_THRESHOLD = 30
export const ROW_GAP = 6
export const COL_GAP = 10

export const compareInPage =
({ appData, kitData, CHANNEL_THRESHOLD, ROW_GAP, COL_GAP }) => {
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = () => reject(new Error('image decode failed'))
      img.src = src
    })
  }
  function pixels(img, w, h) {
    const c = document.createElement('canvas')
    c.width = w
    c.height = h
    const ctx = c.getContext('2d', { willReadFrequently: true })
    ctx.drawImage(img, 0, 0)
    return ctx.getImageData(0, 0, w, h).data
  }

  return Promise.all([loadImage(appData), loadImage(kitData)]).then(([appImg, kitImg]) => {
    const appSize = { w: appImg.naturalWidth, h: appImg.naturalHeight }
    const kitSize = { w: kitImg.naturalWidth, h: kitImg.naturalHeight }
    const w = Math.max(appSize.w, kitSize.w)
    const h = Math.max(appSize.h, kitSize.h)
    const a = pixels(appImg, w, h)
    const k = pixels(kitImg, w, h)

    const diffCanvas = document.createElement('canvas')
    diffCanvas.width = w
    diffCanvas.height = h
    const dctx = diffCanvas.getContext('2d')
    const dimg = dctx.createImageData(w, h)

    /* mask: 0 — совпадает, 1 — различие по цвету (d>порог), 2 — площадь за пределами
       одной из сторон (недостающая область, тоже различие, но другого рода). */
    const mask = new Uint8Array(w * h)
    let exactDiffPixels = 0
    let thresholdDiffPixels = 0
    let missingAreaPixels = 0
    let maxD = 0

    for (let y = 0; y < h; y++) {
      const appRow = y < appSize.h
      const kitRow = y < kitSize.h
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4
        const appIn = appRow && x < appSize.w
        const kitIn = kitRow && x < kitSize.w
        if (!appIn || !kitIn) {
          missingAreaPixels++
          mask[y * w + x] = 2
          dimg.data[i] = 234
          dimg.data[i + 1] = 88
          dimg.data[i + 2] = 12
          dimg.data[i + 3] = 255
          continue
        }
        const d = Math.abs(a[i] - k[i]) + Math.abs(a[i + 1] - k[i + 1]) + Math.abs(a[i + 2] - k[i + 2])
        if (d > 0) exactDiffPixels++
        if (d > maxD) maxD = d
        if (d > CHANNEL_THRESHOLD) {
          thresholdDiffPixels++
          mask[y * w + x] = 1
          dimg.data[i] = 255
          dimg.data[i + 1] = 0
          dimg.data[i + 2] = 0
          dimg.data[i + 3] = 255
        } else {
          const avg = (a[i] + a[i + 1] + a[i + 2]) / 3
          const muted = avg * 0.3 + 255 * 0.7
          dimg.data[i] = muted
          dimg.data[i + 1] = muted
          dimg.data[i + 2] = muted
          dimg.data[i + 3] = 255
        }
      }
    }
    dctx.putImageData(dimg, 0, 0)

    /* Группировка «полосы по Y → кластеры по X внутри полосы», как в ручном разборе
       задачи 7-ревью: разрыв больше ROW_GAP строк без различий начинает новую полосу,
       внутри неё разрыв больше COL_GAP столбцов режет на кластеры. Диф-пиксель — mask!=0
       (цветовое различие или недостающая область). */
    const rowHasDiff = new Uint8Array(h)
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (mask[y * w + x] !== 0) {
          rowHasDiff[y] = 1
          break
        }
      }
    }
    const ys = []
    for (let y = 0; y < h; y++) if (rowHasDiff[y]) ys.push(y)
    const regions = []
    if (ys.length) {
      let s = ys[0]
      let p = ys[0]
      const flushBand = (y0, y1) => {
        let x0 = w
        let x1 = -1
        const cols = new Uint8Array(w)
        let pixelsInBand = 0
        for (let y = y0; y <= y1; y++) {
          for (let x = 0; x < w; x++) {
            if (mask[y * w + x] !== 0) {
              cols[x] = 1
              pixelsInBand++
              if (x < x0) x0 = x
              if (x > x1) x1 = x
            }
          }
        }
        const xs = []
        for (let x = 0; x < w; x++) if (cols[x]) xs.push(x)
        let sx = xs[0]
        let px = xs[0]
        const clusters = []
        const flushCluster = (cx0, cx1) => {
          let pixelsInCluster = 0
          for (let y = y0; y <= y1; y++) {
            for (let x = cx0; x <= cx1; x++) if (mask[y * w + x] !== 0) pixelsInCluster++
          }
          const area = (y1 - y0 + 1) * (cx1 - cx0 + 1)
          clusters.push({ x0: cx0, x1: cx1, pixels: pixelsInCluster, area, density: area ? pixelsInCluster / area : 0 })
        }
        for (let idx = 1; idx < xs.length; idx++) {
          const x = xs[idx]
          if (x - px > COL_GAP) {
            flushCluster(sx, px)
            sx = x
          }
          px = x
        }
        if (xs.length) flushCluster(sx, px)
        regions.push({ y0, y1, x0, x1, pixels: pixelsInBand, clusters })
      }
      for (let idx = 1; idx < ys.length; idx++) {
        const y = ys[idx]
        if (y - p > ROW_GAP) {
          flushBand(s, p)
          s = y
        }
        p = y
      }
      flushBand(s, p)
    }

    /* diffRatio и sizeMismatch раньше считались в diff.mjs при записи в отчёт. Это такая
       же часть метрики, как счётчики: критерий приёмки назван через diffRatio, а разные
       размеры сторон — расхождение само по себе. Рядом со счётчиками они закрепляются
       одним тестом и одной точкой, а не двумя. */
    const diffPixels = thresholdDiffPixels + missingAreaPixels
    const totalPixels = w * h
    return {
      appSize,
      kitSize,
      canvasSize: { w, h },
      exactDiffPixels,
      thresholdDiffPixels,
      missingAreaPixels,
      diffPixels,
      diffRatio: totalPixels ? diffPixels / totalPixels : 0,
      sizeMismatch: appSize.w !== kitSize.w || appSize.h !== kitSize.h,
      maxChannelSum: maxD,
      regions,
      diffPng: diffCanvas.toDataURL('image/png')
    }
  })
}
