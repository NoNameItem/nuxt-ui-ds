/* Ядро регистра расхождений: чтение bench/ledger.yaml и проверка схемы.

   Функции чистые и файловой системы не знают: времена снимков и ожидаемый состав прогона
   считает ledger.mjs и передаёт готовыми множествами. Иначе правила проверялись бы только
   живым прогоном — то есть после часа съёмки, а не тестом.

   Проверка схемы отдельным вызовом, а не бросанием при чтении: замечаний бывает много, и
   человеку, который ведёт регистр руками, нужны все сразу, а не первое. */
import { parse } from 'yaml'

export const NONE = 'none'
export const SIDES = ['kit', 'ours', 'library', 'construction']
export const CLASS_STATUSES = ['open', 'sent', 'fixed', 'accepted', 'regressed']
export const VERDICTS = ['fixed', 'partial', 'none', 'refused']

const PAIR_KEY = /^(.+)\.(light|dark)$/

export function parseLedger(text) {
  const raw = parse(text)
  if (raw === null || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('регистр должен быть отображением')
  const classList = raw.classes ?? []
  const pairList = raw.pairs ?? []
  if (!Array.isArray(classList) || !Array.isArray(pairList)) throw new Error('classes и pairs должны быть списками')
  return {
    kit: raw.kit ?? {},
    classList,
    pairList,
    /* Map строится и при дублях — их называет validateLedger; иначе чтение падало бы
       раньше, чем человек увидел бы остальные замечания. */
    classes: new Map(classList.map((c) => [c?.id, c])),
    pairs: new Map(pairList.map((p) => [p?.pair, p]))
  }
}

export function validateLedger(ledger) {
  const problems = []
  const copied = ledger.kit?.statics_copied
  if (!copied) problems.push('kit.statics_copied не задан — свежесть снимков не с чем сравнивать')
  else if (Number.isNaN(Date.parse(String(copied)))) problems.push(`kit.statics_copied не дата: ${copied}`)

  const seenClass = new Set()
  for (const c of ledger.classList) {
    const say = (msg) => problems.push(`класс ${c?.id ?? '<без id>'}: ${msg}`)
    if (!c?.id) {
      say('нет поля id')
      continue
    }
    if (seenClass.has(c.id)) say('дублируется')
    seenClass.add(c.id)
    if (!SIDES.includes(c.side)) say(`side «${c.side}» не из ${SIDES.join('|')}`)
    if (!CLASS_STATUSES.includes(c.status)) say(`status «${c.status}» не из ${CLASS_STATUSES.join('|')}`)
    if (c.status === 'accepted' && !c.decided) say('accepted без поля decided — принять отклонение может только человек')
    /* Причина решения — часть решения. Пока она жила комментарием, вычистка комментариев
       стирала её вместе с историей раундов, и принятое расхождение оставалось без объяснения:
       следующий читатель не отличил бы его от забытого. */
    if (c.status === 'accepted' && (typeof c.reason !== 'string' || c.reason.trim() === '')) say('accepted без поля reason — причина решения записывается в регистре, а не в комментарии')
    if (c.components !== undefined && !Array.isArray(c.components)) say('components не список')
    for (const r of c.rounds ?? []) {
      if (!VERDICTS.includes(r?.verdict)) say(`раунд ${r?.n}: verdict «${r?.verdict}» не из ${VERDICTS.join('|')}`)
    }
  }

  const seenPair = new Set()
  for (const p of ledger.pairList) {
    const say = (msg) => problems.push(`пара ${p?.pair ?? '<без ключа>'}: ${msg}`)
    if (!p?.pair || !PAIR_KEY.test(p.pair)) {
      say('ключ должен быть <имя>.light или <имя>.dark')
      continue
    }
    if (seenPair.has(p.pair)) say('дублируется')
    seenPair.add(p.pair)
    if (p.residual == null) say('нет поля residual — «объяснено целиком» пишется явно как residual: none')
    /* Пустая строка проверку на null проходит (`'' == null` ложно), и пара становится блокером
       с бессмысленным текстом «остаток «» не классифицирован»: остаток — это текст незакрытого
       хвоста, и пустого текста у него не бывает. */
    else if (typeof p.residual !== 'string' || p.residual.trim() === '') say(`residual «${p.residual}» — остаток пишется непустой строкой, «объяснено целиком» как residual: none`)
    if (p.status !== undefined && p.status !== 'incomparable') say(`status «${p.status}» у пары бывает только incomparable`)
    /* Словарь тот же, что у класса: `side` у пары — пометка «пара измеряет не кит, а
       собственный состав страницы», по ней читают запись и отбирают пары, и опечатка
       `ourss` оставляет пометку нечитаемой молча. */
    if (p.side !== undefined && !SIDES.includes(p.side)) say(`side «${p.side}» не из ${SIDES.join('|')}`)
    if (p.workaround !== undefined && p.workaround !== 'ours') say(`workaround «${p.workaround}» бывает только ours`)
    /* `blind: yes` в YAML 1.2 — строка, то есть truthy; `blind: "false"` тоже truthy. Любая
       такая описка молча включила бы слепой режим, в котором пару закрывает не число, а статус
       класса. Пометка снимается удалением поля, а не словом. */
    if (p.blind !== undefined && p.blind !== true) say(`blind «${p.blind}» — пометка бывает только blind: true, снимается удалением поля`)
    const classes = p.classes ?? []
    if (p.status !== 'incomparable' && p.residual === NONE && classes.length === 0) say('нет классов — residual: none требует назвать все расхождения')
    for (const id of classes) if (!ledger.classes.has(id)) say(`ссылается на неизвестный класс ${id}`)
  }
  return problems
}

/* Старшинство причин: протухший снимок говорит о прежнем ките, поэтому остальные правила о
   такой паре ничего не значат — и её ноль тоже ничего не значит. Дальше «нет записи» и
   «остаток» идут раньше регресса: они про регистр, а не про кит, и чинятся без раунда.
   Регресс старше undecided: забытый decided не спрячется (validateLedger ловит как замечание
   схемы), а регресс назвать больше нечему. undecided проверяется раньше закрытия
   accepted, чтобы not-decided пара не закрылась как принятая. Исключение одно и названо в
   спеке: у пары со слепой пометкой регресс проверяется раньше остатка — остаток «?» стоит у
   неё почти всегда и спрятал бы устаревшую пометку. */
function pairVerdict({ ledger, entry, diff, stale, error }) {
  if (entry?.status === 'incomparable') return { closed: 'incomparable' }
  if (error !== undefined) return { reason: 'recheck', text: `пара не сравнилась (${error}) — требует перепроверки` }
  if (stale) return { reason: 'recheck', text: 'снимок старше правки кита — требует перепроверки' }

  const classes = (entry?.classes ?? []).map((id) => ledger.classes.get(id)).filter(Boolean)
  /* Слепой ноль по построению не имеет пиксельного следа: диф у него ноль и был нулём,
     поэтому закрыть его может только статус класса. */
  if (entry?.blind) {
    /* Слепая пометка и ненулевой диф несовместимы: либо пометка устарела (состав страницы
       изменился и свойство стало наблюдаемым — починка слепого класса ровно в этом и состоит),
       либо расхождение настоящее. Причина та же, что у регресса, — «помечено закрытым, а диф не
       ноль», — поэтому седьмой причины не появляется: словарь причин в спеке закрыт шестью. */
    if (diff !== 0) return { reason: 'regress', text: `помечена blind, но диф ${diff} — пометка устарела или расхождение настоящее` }
    if (classes.length > 0 && classes.every((c) => c.status === 'fixed')) return { closed: 'blindFixed' }
  } else if (diff === 0) {
    return { closed: 'match' }
  }

  if (!entry) return { reason: 'noEntry', text: `нет записи в регистре, диф ${diff}` }
  if (entry.residual !== NONE) return { reason: 'residual', text: `остаток «${entry.residual}» не классифицирован` }

  /* У слепой пары сюда доходит только нулевой диф — ненулевой закрыт регрессом выше, — и
     регрессом его звать нельзя: остаётся единственный случай, слепая пара со смешанными
     статусами классов (один fixed, другой open), которая ждёт починки, а не регрессировала. */
  const regressed = entry.blind ? undefined : classes.find((c) => c.status === 'fixed')
  if (regressed) return { reason: 'regress', text: `класс ${regressed.id} в статусе fixed, диф ${diff} (регресс)` }

  const undecided = classes.find((c) => c.status === 'accepted' && !c.decided)
  if (undecided) return { reason: 'undecided', text: `класс ${undecided.id} принят без поля decided` }
  if (classes.length > 0 && classes.every((c) => c.status === 'accepted')) return { closed: 'accepted' }

  const waiting = classes.find((c) => c.status === 'open' || c.status === 'sent' || c.status === 'regressed')
  return { reason: 'waiting', text: `ждёт починки, класс ${waiting?.id ?? '—'}, диф ${diff}` }
}

export function classify({ ledger, reportPairs, expectedKeys, staleKeys = new Set() }) {
  const closed = { match: 0, accepted: 0, incomparable: 0, blindFixed: 0 }
  const reasons = { recheck: 0, noEntry: 0, residual: 0, regress: 0, undecided: 0, waiting: 0 }
  /* Пиксельный итог считается БЕЗ пар, выведенных из сверки решением человека: `accepted`
     (pricing, changelog) и `incomparable` (page-cta). Их числа к выравниванию отношения не
     имеют, а весят много: 19.09.2026 сломавшийся pricing один поднял общую сумму с 3,6 млн до
     8,7 млн, и итог начал врать о направлении работы. Выведенные считаются отдельно, чтобы их
     не потерять из виду: если такая пара вдруг ухудшится вдесятеро, это всё равно видно. */
  const pixels = { counted: 0, excluded: 0, excludedPairs: [] }
  const blockers = []
  const matchWithShootErrors = []
  const byClass = new Map(ledger.classList.filter((c) => c?.id).map((c) => [c.id, { zero: [], left: [], stale: [], blind: [] }]))

  for (const [key, measured] of reportPairs) {
    const entry = ledger.pairs.get(key)
    const diff = measured.diffPixels ?? 0
    const stale = staleKeys.has(key)
    /* Непромеренная пара не годится ни в «ноль», ни в «осталось»: её число ничего не
       говорит о ките, и класс должен видеть её как непереснятую. Слепая пара промерена, но её
       ноль не аттестует ничего — в долю починенного она не входит ни числителем, ни
       знаменателем, поэтому у неё своё ведро. Старшинство: непромеренная, затем слепая. */
    const unmeasured = stale || measured.error !== undefined
    for (const id of entry?.classes ?? []) {
      const bucket = byClass.get(id)
      if (bucket) bucket[unmeasured ? 'stale' : entry.blind ? 'blind' : diff === 0 ? 'zero' : 'left'].push({ key, diff })
    }
    const verdict = pairVerdict({ ledger, entry, diff, stale, error: measured.error })
    if (verdict.closed === 'accepted' || verdict.closed === 'incomparable') {
      pixels.excluded += diff
      pixels.excludedPairs.push(key)
    } else {
      pixels.counted += diff
    }
    if (verdict.closed) {
      closed[verdict.closed] += 1
      /* Правило не меняется: съёмка ругалась, но PNG рядом валиден (иначе сработала бы ветка
         «нет снимка»), и пара закрыта совпадением. Меняется видимость — diff.mjs:97-100 требует
         показывать shootErrors, чтобы число не выглядело обычным результатом по чистому снимку.
         Считается только кит-сторона: основание тут кит-стороннее (skeleton.dark в run-1 с
         предупреждением CSP на ките), а пара с ошибкой только на нашей стороне, попав в этот
         счёт, была бы объявлена кит-сторонней — строка врала бы о стороне. */
      if (verdict.closed === 'match' && measured.shootErrors?.kit?.length) matchWithShootErrors.push(key)
      continue
    }
    reasons[verdict.reason] += 1
    /* Два поля про одно: `cause` — ключ причины из словаря `reasons` (по нему ledger.mjs
       сортирует и группирует печать), `reason` — её текст для человека. */
    blockers.push({ key, cause: verdict.reason, reason: verdict.text })
  }

  return {
    closed,
    reasons,
    blockers,
    byClass,
    matchWithShootErrors: matchWithShootErrors.sort(),
    missing: [...expectedKeys].filter((k) => !reportPairs.has(k)).sort(),
    /* Сверка состава в обе стороны: пара из прогона вне ожидаемого состава (страницу удалили
       или переименовали) ложного нуля не даёт — с ненулевым дифом она попадёт в «нет записи», —
       но названной быть обязана: вместе с отказом по недостающим парам она называет
       переименование целиком, а молча уходила в «совпадает». */
    extra: [...reportPairs.keys()].filter((k) => !expectedKeys.has(k)).sort(),
    pixels: { ...pixels, excludedPairs: pixels.excludedPairs.sort() },
    unresolved: blockers.length
  }
}
