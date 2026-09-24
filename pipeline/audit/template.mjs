/* Разбор <template> у SFC библиотеки: какие узлы компонент рисует всегда.
   Результат — три множества имён слотов: рисуется всегда, рисуется у
   открытого экземпляра, рисуется под условием (эти не проверяются).

   Зачем отдельный разборщик. Пять существующих проверок сравнивают КЛАССЫ у
   тех узлов, что в DOM есть. Узла, который кит не нарисовал вовсе, ни одна из
   них не видит: сравнивать нечего — расхождения не возникает. Это ровно тот
   класс дефектов, который виден глазами (пропал спиннер, пропала стрелка) и
   невидим приёмке.

   Источник истины — SFC библиотеки, а не дерево кита: строить ожидание из
   исходников кита значило бы проверять кит им же самим.

   Что считается безусловным узлом: у самого тега и ни у одного из предков нет
   v-if / v-else-if / v-else / v-for, и он не лежит ни внутри <slot> (там
   разметка — запасное содержимое, и её видно только когда слот пуст), ни
   внутри <template #имя> (именованный слот рисует потребитель), ни внутри
   определения переиспользуемого шаблона из createReusableTemplate.

   Про createReusableTemplate: пара `const [DefineX, ReuseX] = …` делит разметку
   надвое — DefineX на месте не рисует НИЧЕГО, он только запоминает; рисует
   ReuseX, и почти всегда под условием. Так у Header блок left лежит в
   DefineLeftTemplate, у Sidebar — body и inner, у PricingTable — tierWrapper.
   Имена Define-компонентов читаются из script-блока, а не угадываются по
   виду `Define…Template`.

   v-show не блокирует: узел в DOM есть, просто скрыт стилем.

   Отдельно — примитивы reka-ui, которые в разметке стоят без условия, но у
   себя внутри монтируются не всегда (DEFERRED ниже). Это знание о библиотеке,
   и оно вписано таблицей с цитатами, а не выведено из кита. Таблица заведомо
   неполна: в неё попадает то, на чём проверка спотыкалась. Это не дыра — новый
   такой примитив придёт находкой, её разберут и либо запишут сюда, либо
   предъявят киту.

   Динамическое имя (:data-slot="…") не попадает ни в одно из трёх множеств:
   у 23 компонентов корень пишет `$attrs['data-slot'] ?? 'root'`, и статически
   имя слота оттуда не добыть. Такие вхождения возвращаются отдельным списком,
   чтобы пробел был назван, а не растворился в множестве проверенных. */

/* Атрибуты в открывающем теге: кавычки учитываются, чтобы `>` внутри значения
   (например в выражении v-if) не оборвал тег раньше времени. */
const TAG = /<(\/?)([A-Za-z][\w.-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>/gs
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'])
/* Хвост `|$` обязателен: у атрибута без значения (`<tr v-else>`) строка
   атрибутов кончается сразу за именем — закрывающий `>` съеден самим TAG, — и
   без него ветка v-else читалась как безусловная. Так пропадал `empty` у
   Table. */
const COND = /(?:^|\s)(?:v-if|v-else-if|v-else|v-for)(?=[\s=>]|$)/
const NAMED_SLOT = /(?:^|\s)(?:#|v-slot)/
/* Примитив, который в шаблоне выглядит безусловным, а рисуется по состоянию.
   Блокирует и сам узел, и всё под ним — как условие, но с указанием, ЧЕМ
   именно: `open` отделено от прочего, потому что открытость видна приёмке из
   пропов примера, и такие узлы проверяются у открытых экземпляров. */
const DEFERRED = new Map([
  /* <Presence :present="forceMount || rootContext.open"> — содержимое
     смонтировано только у раскрытого (reka-ui 2.10.4,
     dist/Collapsible/CollapsibleContent.js:71-77). */
  ['CollapsibleContent', 'open'],
  /* Тот же Presence по открытости списка (dist/Combobox/ComboboxContent.js:136). */
  ['ComboboxContent', 'open'],
  /* И тот же у Select: `present = props.forceMount || rootContext.open.value`
     (reka-ui 2.10.4, dist/Select/SelectContent.js:134). Тег в карту не входил, и
     `content`/`viewport` у Select ждали безусловно. Девять раундов это сходилось по
     ошибке с обеих сторон: кит рисовал попап независимо от `open` (класс kit-isroot),
     а оракул его независимо от `open` и ждал. Как только кит починили, ожидание
     осталось единственным неверным — 82 расхождения «отсутствующие узлы». */
  ['SelectContent', 'open'],
  /* `isMounted && typeof indicatorStyle.size === "number"` — до измерения
     активной вкладки не рисуется ничего (dist/Tabs/TabsIndicator.js:57-64).
     В статическом рендере измерять нечем, поэтому не `open`. */
  ['TabsIndicator', 'measure'],
  /* UModal: DialogContent под Presence `present: forceMount || rootContext.open`
     (reka-ui 2.10.4, dist/Dialog/DialogContent.js:47; Modal.vue:70-72). Закрытая модалка не
     рисует ничего — ни свой content, ни содержимое слотов, переданных ей в шаблоне. */
  ['UModal', 'open'],
  /* Сам Presence стоит в шаблоне явно ровно в одном месте — кнопка автопрокрутки
     ChatMessages: `<Presence :present="showAutoScroll">` (ChatMessages.vue:232), где
     showAutoScroll — ref(false) (ChatMessages.vue:48), который выставляет замер прокрутки
     `scrollHeight - scrollPosition >= 100` при монтировании и по scroll
     (ChatMessages.vue:105-112, 160-176). Решает измерение, а не пропы, — поэтому не `open`:
     viewport не ждут никогда. */
  ['Presence', 'measure']
])

/* Теги с точкой — это reka-ui/namespaced: `Component.Content` при
   `Component = isAutocomplete ? Autocomplete : Combobox` значит
   ComboboxContent либо AutocompleteContent, а какой именно — решает рантайм.
   Общее у всех namespace-ов одно: часть Content лежит под Presence по
   открытости, часть Portal — телепорт того же содержимого. Поэтому таблица
   для таких тегов заведена по последней части имени. */
const DEFERRED_PART = new Map([
  ['Content', 'open'],
  ['Portal', 'open']
])
/* Компоненты без собственного корневого элемента: `data-slot` на их теге узла не даёт.
   Корень UModal — DialogRoot (Modal.vue:70), который рисует только слот, и атрибут
   `data-slot="modal"`, повешенный на тег в DashboardSearch.vue:142, падает вместе с
   прочими несвязанными атрибутами. Замер 24.09 на стенде: у открытого dashboard-search
   слоты overlay, content, … и ни одного modal. До этой строки `modal` ждали у всех семи
   примеров doc-страницы DashboardSearch. */
const NO_ELEMENT = new Set(['UModal'])

const gateOf = (name) => name.includes('.') ? DEFERRED_PART.get(name.split('.').pop()) : DEFERRED.get(name)

const REUSABLE = /const\s*\[\s*(\w+)\s*,\s*\w+\s*\]\s*=\s*createReusableTemplate/g
const SLOT_ATTR = /\sdata-slot="([^"]*)"/g
const DYN_SLOT_ATTR = /\s:data-slot="([^"]*)"/g

/* Корневой блок <template> вместе с вложенными: считаем глубину, а не ищем
   первый </template> — внутри почти каждого компонента есть свои. */
function rootTemplate(src) {
  const open = src.search(/<template>/)
  if (open < 0) return ''
  const from = open + '<template>'.length
  const rest = src.slice(from)
  let depth = 1
  for (const m of rest.matchAll(/<\/?template[\s>]/g)) {
    depth += m[0].startsWith('</') ? -1 : 1
    if (depth === 0) return rest.slice(0, m.index)
  }
  return rest
}

/* Последние части namespace-имён, встречающихся в шаблоне, — то самое, по чему
   работает DEFERRED_PART. Отдаётся наружу, чтобы тест сверял состав целиком:
   новая часть в библиотеке обязана быть разобрана человеком. Иначе возможны обе
   беды разом — `Picker.Content` тихо уедет из проверяемого множества, а
   отложенный примитив с новым именем тихо в него попадёт.

   Считаются все namespace-теги, а не только несущие data-slot: Portal своего
   data-slot не имеет и работает предком. */
export function namespacedParts(src) {
  const out = new Set()
  for (const m of rootTemplate(src).replace(/<!--[\s\S]*?-->/g, '').matchAll(TAG)) {
    if (!m[1] && m[2].includes('.')) out.add(m[2].split('.').pop())
  }
  return out
}

export function templateSlots(src) {
  /* Комментарии убираем до разбора: data-slot в закомментированной разметке
     дал бы узел, которого нет ни в библиотеке, ни в ките. */
  const tpl = rootTemplate(src).replace(/<!--[\s\S]*?-->/g, '')
  const defines = new Set([...src.matchAll(REUSABLE)].map((m) => m[1]))
  const stack = []
  const unconditional = new Set()
  const whenOpen = new Set()
  const conditional = new Set()
  const dynamic = []
  for (const m of tpl.matchAll(TAG)) {
    const [, closing, name, attrs, selfClosing] = m
    if (closing) {
      /* Незакрытые теги в шаблоне встречаются (самозакрытие у компонентов), и
         разматывать стек надо до одноимённого, а не на один шаг. */
      while (stack.length) { if (stack.pop().name === name) break }
      continue
    }
    /* Запреты трёх видов. Жёсткий (условие, отложенный не по открытости)
       выключает и сам узел, и всё под ним. Мягкий (открытость) — так же, но
       снимается, когда пример открыт. Третий выключает только содержимое: сам
       тег либо вовсе не узел DOM (<slot>, <template #имя>), либо рисуется, а
       детей его рисует кто-то другой и когда-то потом (Define-компонент). */
    const gate = gateOf(name)
    const hard = COND.test(attrs) || (gate && gate !== 'open')
    const soft = gate === 'open'
    const childrenHard = hard || name === 'slot' || defines.has(name)
      || (name === 'template' && NAMED_SLOT.test(attrs))
    const blockedHard = hard || stack.some((x) => x.hard)
    const blockedOpen = soft || stack.some((x) => x.open)
    for (const [, slot] of NO_ELEMENT.has(name) ? [] : attrs.matchAll(SLOT_ATTR)) {
      if (blockedHard) conditional.add(slot)
      else if (blockedOpen) whenOpen.add(slot)
      else unconditional.add(slot)
    }
    for (const [, expr] of attrs.matchAll(DYN_SLOT_ATTR)) dynamic.push(expr)
    if (!selfClosing && !VOID.has(name.toLowerCase())) stack.push({ name, hard: childrenHard, open: soft })
  }
  /* Имя, встреченное и так и так (две ветки v-if с одним именем слота, как
     label у ChatReasoning), берётся по самому слабому условию: одного
     безусловного вхождения достаточно, чтобы узел ждали всегда. */
  for (const s of unconditional) { conditional.delete(s); whenOpen.delete(s) }
  for (const s of whenOpen) conditional.delete(s)
  return { unconditional, whenOpen, conditional, dynamic }
}
