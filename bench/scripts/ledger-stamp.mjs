/* Отметка свежести статики кита в регистре: kit.statics_copied и kit.bundle_size.

   Ставит её только `pnpm kit:pull` (pipeline/kit-export.mjs), после того как статика
   действительно выгружена. Отдельной команды больше нет: 2026-09-18 ручная отметка без
   перезабора объявила протухшими 308 пар, снятых по тому же бандлу. От statics_copied
   считается протухание снимков, поэтому отметка — текущее время, заведомо не раньше
   выгрузки: сдвиг в строгую сторону, протухшими считается больше пар, а не меньше.

   Функция чистая: текст регистра на входе, текст на выходе, отказ — исключение. */
import { isMap, parseDocument } from 'yaml'

export function stampLedger(text, { at = new Date().toISOString(), size } = {}) {
  /* parseDocument, а не parse: у регистра могут быть комментарии, и обычный разбор стёр бы
     их. Печать с lineWidth: 0 и без отступов в поточных списках даёт обратную запись символ
     в символ — это держит первый тест. */
  const doc = parseDocument(text)
  if (!isMap(doc.get('kit'))) throw new Error('в регистре нет отображения kit — это не регистр или он сломан правкой')
  if (Number.isNaN(Date.parse(at))) throw new Error(`отметка «${at}» не дата`)
  /* Только вперёд: отметка назад расстухляет пары, которые регистр уже считал протухшими.
     Чинить заведомо ошибочную отметку остаётся ручной правкой регистра — видимым решением. */
  const was = doc.getIn(['kit', 'statics_copied'])
  const wasAt = was == null ? NaN : Date.parse(String(was))
  if (!Number.isNaN(wasAt) && Date.parse(at) < wasAt) {
    throw new Error(`${at} раньше нынешней отметки ${was} — отметка двигается только вперёд, иначе протухшие пары молча станут свежими`)
  }
  doc.setIn(['kit', 'statics_copied'], at)
  if (size !== undefined) {
    if (!Number.isInteger(size) || size <= 0) throw new Error(`размер бандла «${size}» не целое положительное`)
    doc.setIn(['kit', 'bundle_size'], size)
  }
  let out = doc.toString({ lineWidth: 0, flowCollectionPadding: false })
  if (!text.endsWith('\n')) out = out.replace(/\n$/, '')
  return out
}
