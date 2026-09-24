/* Пять проверок приёмки. Вход — полезная нагрузка, собранная страницей
   (классы и вычисленные значения), и локальные источники истины. */
import { adaptSets, isVarClass } from './adaptations.mjs'
import { toPx, px } from './tokens.mjs'

const esc = (c) => c.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')
/* Имя класса в CSS экранировано: ASCII-пунктуация записана с обратным слэшем.
   Символы вне ASCII (U+0080 и выше) Tailwind оставляет как есть — в живом ките
   это `.not-first-of-type\\:before\\:content-\\['·'\\]`, где экранированы скобки и
   кавычки, но не сама точка-разделитель. Экранируя её тоже, сканер искал бы
   `\\·`, не находил ничего, и класс с правилом попадал в отчёт как класс без
   правила (Tooltip [kbds], проверка 3, раунд 11). */
const cssClass = (c) => c.replace(/[^A-Za-z0-9_\u0080-\uFFFF-]/g, (ch) => '\\' + ch)
/* Граница имени класса — не только буква, цифра и дефис, но и обратный слэш:
   с него начинается любой экранированный символ, и без него `.outline-primary`
   находится внутри `.outline-primary\/25`, а `text-[8px]` читает значение из
   правила `.text-\[8px\]\/3`. */
const ruleRe = (c, tail) => new RegExp(`\\.${esc(cssClass(c))}(?![\\w-\\\\])${tail}`)

/* Индекс парной закрывающей скобки, считая вложенность, или -1. */
const balanced = (s, i, open, close) => {
  let depth = 0
  for (; i < s.length; i++) {
    if (s[i] === open) depth++
    else if (s[i] === close && --depth === 0) return i
  }
  return -1
}
const IDENT = /[A-Za-z-][\w-]*/y

/* Индекс `{`, к которой ведёт запятая, закончившая часть группового селектора,
   или -1. Содержимое круглых и квадратных скобок пропускается тем же счётчиком
   парности, что и в цикле уточнений: наивное «встретил запятую — читай до `{`»
   вернуло бы ровно ту нестрогость `[^{]*`, ради снятия которой писался сканер.

   Закрывающая скобка, которую мы не открывали, означает, что запятая стояла
   ВНУТРИ скобок предка (`.x:where(.a, .b) .c`) и ничью часть не заканчивала;
   `}` — что селектор кончился, не дойдя до тела. И то и другое — не субъект. */
const groupBrace = (s, i) => {
  for (; i < s.length; i++) {
    const ch = s[i]
    if (ch === '{') return i
    if (ch === '(' || ch === '[') {
      const end = balanced(s, i, ch, ch === '(' ? ')' : ']')
      if (end < 0) return -1
      i = end
    } else if (ch === ')' || ch === ']' || ch === '}') return -1
  }
  return -1
}

/* Тело правила, СУБЪЕКТОМ которого является класс, или null.

   Класс — субъект, если сразу за его именем идут только присоединённые
   уточнения — псевдоклассы и псевдоэлементы (`:hover`, `::before`, `:where(…)`,
   `:is(…)`, в том числе со вложенными скобками) и селекторы атрибутов
   (`[aria-disabled="true"]`), — и следом открывающая фигурная скобка ЛИБО
   запятая. Комбинатор (пробел, `>`, `+`, `~`) или закрывающая скобка означают,
   что класс стоит не на том элементе, которому правило принадлежит.

   Запятая субъектности не рвёт, и это отличие от первой редакции правила:
   в списке селекторов она заканчивает одну из равноправных частей, а не уводит
   класс на другой элемент. Цена ошибки — не потерянный кандидат, а ЛОЖНОЕ
   расхождение: на `.max-w-full,.max-w-screen{max-width:100%}` класс
   `max-w-full` переставал быть владельцем `width`, гейт «за свойство отвечает
   ровно один класс» не срабатывал, и у узла `w-96 max-w-full` объявленные
   384px сверялись с зажатыми пределом 320px. В живом ките форма есть:
   `.light,:host,:root{…}` в tokens/base.css.

   Прежний поиск `.имя[^{]*\{` субъектности не требовал: хвост `[^{]*` дочитывал
   от имени до ближайшей `{` через что угодно. Классу `group` он приписывал
   `…:is(:where(.group):not(:last-child) *):is(…) { border-radius: 0 }` —
   правило ПОТОМКА, — и `border-radius` получал второго владельца, из-за чего
   настоящее сравнение `rounded-md` выпадало по гейту «за свойство отвечает
   ровно один класс». На сохранённых нагрузках это 1597 фантомных кандидатов и
   479 подавленных сравнений; любой класс без двоеточия с правилом вида
   `.foo > * { padding: 1rem }` дал бы уже настоящее ложное расхождение.

   Регуляркой правило не выражается: `:where(:dir(rtl), [dir="rtl"] *)` несёт
   вложенные скобки, и `\([^)]*\)` на нём обрывается — отсюда сканер.

   Проверяются ВСЕ вхождения имени, а не первое: один и тот же класс стоит и в
   чужих селекторах, и в своём собственном правиле, а порядок в файле любой.

   ИЗВЕСТНОЕ ОГРАНИЧЕНИЕ: возвращается ПЕРВОЕ субъектное правило, а каскад
   применил бы последнее. Классов с двумя субъектными правилами на живых данных
   39, и расходятся они только цветами (не ключи OWNS) да завершающей `;`, так
   что сегодня это ничего не портит. Дёшево не чинится: «последнее» в склейке
   не равно «последнему» в браузере — файлы склеиваются по readdir, то есть
   utilities-extra.css раньше utilities.css, а страница импортирует их в
   обратном порядке. Честная починка — сначала выстроить порядок склейки по
   порядку импорта, и это отдельная работа. Заменённый поиск вёл себя так же. */
export function ruleBody(css, className) {
  const needle = '.' + cssClass(className)
  for (let at = css.indexOf(needle); at >= 0; at = css.indexOf(needle, at + 1)) {
    /* Отдельная проверка границы имени (`.outline-primary` внутри
       `.outline-primary\/25`) здесь не нужна — в отличие от ruleRe, где хвоста
       нет вовсе. Ни один символ имени класса (`[A-Za-z0-9_-]` и обратный слэш,
       с которого начинается экранированный) не является ни `:`, ни `[`, ни
       пробелом, ни `{`, ни `,`, поэтому цикл уточнений ломается о него сразу, а
       проверка на `{`/`,` уводит на следующее вхождение. */
    let i = at + needle.length
    let subject = true
    for (; subject;) {
      if (css[i] === ':') {
        i += css[i + 1] === ':' ? 2 : 1
        IDENT.lastIndex = i
        if (!IDENT.test(css)) { subject = false; break }
        i = IDENT.lastIndex
        if (css[i] === '(') {
          const end = balanced(css, i, '(', ')')
          if (end < 0) { subject = false; break }
          i = end + 1
        }
      } else if (css[i] === '[') {
        const end = balanced(css, i, '[', ']')
        if (end < 0) { subject = false; break }
        i = end + 1
      } else break
    }
    if (!subject) continue
    /* Пробел допустим только перед `{` или `,`: в любом другом месте это
       комбинатор потомка, то есть правило уже не про этот элемент. */
    while (/\s/.test(css[i] || '')) i++
    const open = css[i] === '{' ? i : (css[i] === ',' ? groupBrace(css, i + 1) : -1)
    if (open < 0) continue
    /* Тело — до ПАРНОЙ `}`, а не до первой: 95 правил живого кита несут
       вложенный `@supports`. На сегодняшних данных обе стратегии дают
       одинаковый набор объявлений (проверено по всем классам нагрузок,
       различий ноль), поэтому теста на это нет — но эквивалентность держится
       на данных, а не на устройстве, и вложенный блок с двумя объявлениями
       её сломает. */
    const end = balanced(css, open, '{', '}')
    if (end < 0) continue
    return css.slice(open + 1, end)
  }
  return null
}

/* 1. Отрисовка

   `librarySlots` — есть ли в шаблоне библиотечного SFC хоть один `data-slot`. У Link,
   Kbd, Container, Skeleton, Main, PageBody их нет вовсе (тема из одной строки, класс
   ставится без имени слота), и «ни одного data-slot» у такого примера — совпадение с
   библиотекой, а не пустой компонент: у Link на стенде 0 узлов с обеих сторон (сверка
   24.09). Не передан — ждём узлы, как раньше. */
export function checkRendered(payload, componentName, { librarySlots = true } = {}) {
  const failures = []
  const errs = payload.kitErrors
  if (errs && (Array.isArray(errs) ? errs.length : Object.keys(errs).length)) {
    failures.push({ where: componentName, got: `бандл кита сообщил об ошибках: ${JSON.stringify(errs).slice(0, 400)}`, want: '__errors пуст' })
  }
  if (!payload.examples.length) failures.push({ where: componentName, got: 'нет экземпляров', want: 'не меньше одного' })
  for (const e of payload.examples) {
    /* Причина важнее следствия: у упавшего примера узлов нет по определению,
       и сообщение «ни одного data-slot» увело бы искать пустой компонент. */
    if (e.error) { failures.push({ where: `${componentName} ${e.id}`, got: `исключение при рендере: ${e.error}`, want: 'пример рисуется' }); continue }
    if (!e.nodes.length && librarySlots) failures.push({ where: `${componentName} ${e.id}`, got: 'ни одного data-slot', want: 'корневой слот' })
  }
  return { name: 'отрисовка', failures }
}

/* Узел принадлежит проверяемому компоненту, если его владелец — он сам.
   Владельца ставит кит меткой `data-ds-component` на корне экземпляра
   (раунд 10), и по ней разом опознаются три вещи, которые раньше угадывались
   по именам слотов: узел вложенного компонента (`Avatar` внутри `Alert`),
   делегированный слот (`pagination.item` — это кнопка, и метка на нём
   Button) и соседний экземпляр того же компонента (метка та же, узел свой).
   Угадывание стоило дорого: правило по именам исключало 1460 своих узлов и
   обнуляло семь страниц целиком.

   Регистр имени в метке и в имени страницы сходится не всегда: у PageCTA кит
   пишет `PageCta`, и точная сверка отбрасывала все 63 узла страницы как чужие.
   Правило стоит в одной функции, потому что мест сверки два — здесь и в
   checkClasses, где узел относят к чужим. */
const sameComp = (comp, name) => String(comp || '').toLowerCase() === String(name).toLowerCase()

/* Второе имя владельца — для компонентов, чей корень рисует другой компонент
   (DELEGATES в pipeline/audit/props.mjs). Кит ставит на такой корень то метку
   обёртки (`DashboardSidebarToggle`), то метку делегата (`DashboardSearchButton`
   приходит помеченным как `Button`), и вторая читалась как чужое поддерево:
   страница сравнивала ноль узлов. Принимая оба имени, приёмка перестаёт
   зависеть от того, чья метка победила, — и переживёт правку кита в любую
   сторону. Своего Kbd внутри это не задевает: он в список не входит. */
const owns = (comp, componentName, also = []) =>
  sameComp(comp, componentName) || also.some((x) => sameComp(comp, x))

export function ownNodes(nodes, componentName, also = []) {
  return nodes.filter((n) => owns(n.comp, componentName, also))
}

/* 2. Классы против оракула. Для компонентов с items строго сверяется только
   корневой слот: класс повторяющихся слотов зависит от полей элемента. */
export function checkClasses(payload, { wantById, hasItems, componentName, ownComps = [] }) {
  const failures = []
  /* Ноль расхождений — не то же самое, что «совпало»: часть узлов и слотов
     страницы в сравнение вовсе не попадает — узлы чужих компонентов (владелец
     по data-ds-component — не проверяемый, см. ownNodes), узлы вовсе без
     метки владельца, пример без записи в wantById, собственные слоты
     компонента с items кроме корневого, слот, для которого у оракула нет
     ожидания. «Чужой» и «без метки» — разные истории: первое законно (кит
     рисует чужое поддерево), второе означает, что сравнить было не с чем —
     метки нет вовсе, — и это не норма. Счётчиков поэтому три. */
  let skippedForeign = 0   // узел принадлежит другому компоненту — законно
  let skippedNoOwner = 0   // метки нет вовсе — сравнить не с чем, и это не норма
  let skippedSlots = 0
  /* Слотов, по которым сравнение действительно состоялось. Без этого счётчика
     страница, чьи узлы все свои, но ни один слот не имеет ожидания, отчитается
     нулём расхождений и ни в одну строку «не проверялось» не попадёт: узлы не
     чужие и метки на них есть. Так молчал `Container` — девять своих узлов со
     слотами, которых в теме нет вовсе. */
  let comparedSlots = 0
  /* Узлов, которые эта функция реально разобрала — после дедупа копий, то
     есть по одному разу на id примера. Это честный знаменатель для доли
     «без метки»: сырой счёт узлов страницы включает обе копии (светлую и
     тёмную), а skippedForeign/skippedNoOwner — только представителя каждого
     id, и деление первого на второе занижает долю вдвое против того, что
     видно в DOM (Modal 43% вместо настоящих 86%). */
  let considered = 0
  /* Каждый пример нарисован дважды — светлая и тёмная копия. Классы у копий
     совпадают по построению: проверено на всех 2799 парах, различаются только
     измеренные цвета. Поэтому вторую копию сравнивать незачем, иначе каждое
     расхождение считается дважды и числа отчёта вдвое больше действительных.
     Расхождение самих копий по классам — находка: значит тема зависит от
     темы оформления не только цветом. */
  const seenEx = new Map()
  for (const e of payload.examples) {
    const sig = e.nodes.map((n) => `${n.slot}|${n.class}`).join('\n')
    if (seenEx.has(e.id)) {
      if (seenEx.get(e.id) !== sig) failures.push({ where: `${componentName} ${e.id}`, got: 'светлая и тёмная копии различаются по классам', want: 'копии совпадают' })
      continue
    }
    seenEx.set(e.id, sig)
    considered += e.nodes.length

    const want = wantById[e.id]
    if (!want) { for (const n of e.nodes) n.comp ? skippedForeign++ : skippedNoOwner++; continue }
    /* Нагрузка без меток — это старый кит или сломанная сборка. Молча сравнить
       нечего, и ноль расхождений тут значил бы «не проверяли». */
    if (e.nodes.length && e.nodes.every((n) => !n.comp)) {
      /* Счётчик доводится до того же множества узлов, что и considered: иначе
         пример целиком без меток раздувает знаменатель, не трогая числитель, и
         страница, где метки нет НИ У ОДНОГО узла, в строку «больше половины
         узлов без метки» не попадает вовсе — ровно та страница, ради которой
         строка и написана. */
      skippedNoOwner += e.nodes.length
      failures.push({ where: `${componentName} ${e.id}`, got: 'у узлов нет метки data-ds-component', want: 'метка компонента на корне экземпляра' })
      continue
    }
    const mine = ownNodes(e.nodes, componentName, ownComps)
    for (const n of e.nodes) {
      if (owns(n.comp, componentName, ownComps)) continue
      n.comp ? skippedForeign++ : skippedNoOwner++
    }
    const seen = new Map()
    for (const n of mine) if (!seen.has(n.slot)) seen.set(n.slot, n.class.split(/\s+/).filter(Boolean).sort())
    const slots = hasItems ? [mine[0]?.slot].filter(Boolean) : [...seen.keys()]
    /* Компонент с items сверяется только по корневому слоту: класс
       повторяющихся слотов зависит от полей элемента. Остальные свои слоты
       из сравнения выпадают — и это тоже сужение, а не совпадение. */
    skippedSlots += seen.size - slots.length
    for (const slot of slots) {
      const exp = want[slot]
      if (!exp) { skippedSlots++; continue }
      comparedSlots++
      const pair = adaptSets(seen.get(slot) || [], exp)
      if (pair.got.join(' ') !== pair.want.join(' ')) {
        failures.push({ where: `${componentName} ${e.id} [${slot}]`, got: pair.got.join(' '), want: pair.want.join(' ') })
      }
    }
  }
  return { name: 'классы против оракула', failures, skippedForeign, skippedNoOwner, skippedSlots, comparedSlots, considered }
}

/* 3. Каждый класс имеет правило в tokens/*.css. Классы с произвольным свойством
   кит превращает в инлайновый style через extractVarClasses() — у них правила нет.

   Класс без правила приходит из двух разных мест, и разговор о них разный:
   класс темы кита — пробел генерации CSS, класс примера документации — то,
   что напишет и пользователь артборда. Счёт общий, разделение в отчёте. */
export function checkCssPresence(payload, css, themeClasses = new Set(), { generates = null } = {}) {
  const failures = []
  /* Класс без правила и у библиотеки (pipeline/audit/tailwind.mjs) — не дефект кита, а
     буквальный повтор: расхождением не считается, но и не исчезает — уходит в отчёт
     отдельным списком. Без пробы (generates = null) всё идёт в failures, как раньше. */
  const deadInLibrary = []
  const seen = new Set()
  for (const e of payload.examples) for (const n of e.nodes) {
    for (const c of n.class.split(/\s+/).filter(Boolean)) {
      if (isVarClass(c) || seen.has(c)) continue
      seen.add(c)
      if (!ruleRe(c, '').test(css)) {
        const f = { where: `${e.id} [${n.slot}]`, got: c, want: 'правило в tokens/*.css', source: themeClasses.has(c) ? 'тема' : 'пример' }
        if (generates && !generates(c)) deadInLibrary.push(f)
        else failures.push(f)
      }
    }
  }
  return { name: 'классы против CSS', failures, deadInLibrary }
}

/* 4. Составные свойства. Статическая часть: правило-утилита, задающее составное
   свойство, не должно СМЕШИВАТЬ литеральные части с var(--tw-*) — либо все оси
   собираются из переменных, либо все заданы литералом. Смешение и есть дефект
   раунда 7: применённая следом утилита читает переменную, которую первая не
   присвоила, и обнуляет чужую ось.

   Формулировка «переменную никто не присваивает» здесь не работает: такие
   переменные объявлены через @property с initial-value, читать их законно, и на
   живом tokens/utilities.css эта формулировка даёт 385 ложных срабатываний.
   Проверено на живом файле: 21 правило в правильной форме, 6 целиком литеральных
   (перебивают все оси разом, безопасно), 1 смешанное — .backdrop-blur-sm. */
const COMPOSITE = ['translate', 'scale', 'rotate', 'filter', 'backdrop-filter']

/* Статическая часть: сканирует весь CSS токенов (tokens/*.css) один раз, а не
   на каждой странице — иначе единственное смешанное правило (.backdrop-blur-sm)
   попадает в отчёт 118 раз, по разу на страницу. */
export function checkCompositesCss(css) {
  const failures = []
  for (const r of css.matchAll(/([^{}]+)\{([^}]*)\}/g)) {
    const sel = r[1].trim()
    if (!sel.startsWith('.')) continue
    for (const prop of COMPOSITE) {
      const m = new RegExp(`(?:^|;)\\s*${prop}\\s*:\\s*([^;]+)`).exec(r[2])
      if (!m) continue
      const parts = m[1].trim().split(/\s+(?![^()]*\))/)
      if (parts.length < 2) continue
      const vars = parts.filter((x) => /^var\(--tw-/.test(x)).length
      if (vars > 0 && vars < parts.length) {
        failures.push({ where: sel, got: `${prop}: ${m[1].trim()}`, want: 'все оси из var(--tw-*) либо все литералом' })
      }
    }
  }
  return { name: 'составные свойства (CSS)', failures }
}

export function checkComposites(payload) {
  const failures = []
  for (const e of payload.examples) for (const n of e.nodes) {
    const t = n.computed.translate
    if (t && /(^|\s)0px(\s|$)/.test(t) && /-translate-x-/.test(n.class) && /-translate-y-/.test(n.class)) {
      failures.push({ where: `${e.id} [${n.slot}]`, got: `translate: ${t}`, want: 'обе оси не нулевые' })
    }
  }
  return { name: 'составные свойства', failures }
}

/* 5. Числа против объявленных значений: класс на месте, но действует ли он.

   Сравнивается не префикс класса, а объявления его правила: Tailwind v4 пишет
   `padding`, `padding-inline`, `padding-block`, и таблица префиксов из шести
   строк мимо них проходила. Сравниваются только безусловные классы — у класса
   с вариантом (`sm:p-6`, `hover:gap-2`) правило применяется не всегда, и
   измеренное значение о нём ничего не говорит; но за свойство такой класс
   отвечает наравне с безусловным, поэтому в счёт владельцев он входит. */
const COMPARABLE = {
  padding: ['padding-top', 'padding-right', 'padding-bottom', 'padding-left'],
  'padding-inline': ['padding-left', 'padding-right'],
  'padding-inline-start': ['padding-left'],
  'padding-inline-end': ['padding-right'],
  'padding-block': ['padding-top', 'padding-bottom'],
  'padding-top': ['padding-top'], 'padding-right': ['padding-right'],
  'padding-bottom': ['padding-bottom'], 'padding-left': ['padding-left'],
  gap: ['gap'], width: ['width'], height: ['height'],
  'border-radius': ['border-radius'], 'font-size': ['font-size'],
  /* Утилиты gap-x-/gap-y- пишут column-gap/row-gap — то есть тоже владеют
     вычисленным `gap`. Без этой строки `gap-16 sm:gap-y-24` даёт ложное
     расхождение: браузер отдаёт `gap` двумя значениями («96px 64px»), где
     row-gap = 96 (от sm:gap-y-24) и column-gap = 64 (от gap-16, применился
     верно). С owners-проверкой ниже пара исключается из сравнения — то же
     правило, что уже действует для padding. */
  'row-gap': ['gap'], 'column-gap': ['gap']
}

/* Владение — не то же самое, что сравнимость, и одной таблицей их путать
   нельзя. COMPARABLE отвечает на вопрос «какие объявления сверять с измеренным
   значением», OWNS — «какие объявления на измеренное значение влияют». Там,
   где роли расходятся, гейт владельцев по COMPARABLE не срабатывает вовсе:
   измеренная ширина — значение ИСПОЛЬЗУЕМОЕ, между ним и объявленным стоят
   min-width/max-width, и у пары `w-full max-w-md` владелец `width` остаётся
   один, а измеренное значение — одно число с `px`, которое строгий разбор
   честно принимает. Оба заслона пропускают по построению; то же с угловыми
   border-*-radius при `rounded-md rounded-t-lg`.

   Дописать эти ключи в COMPARABLE — не решение: `min-width: 0px` стал бы
   кандидатом и сверялся с шириной, а это 1015 ложных расхождений на живых
   нагрузках. Роли разведены, а не таблица расширена. */
const OWNS = {
  ...COMPARABLE,
  'min-width': ['width'], 'max-width': ['width'],
  'min-height': ['height'], 'max-height': ['height'],
  'border-top-left-radius': ['border-radius'], 'border-top-right-radius': ['border-radius'],
  'border-bottom-left-radius': ['border-radius'], 'border-bottom-right-radius': ['border-radius'],
  'border-start-start-radius': ['border-radius'], 'border-start-end-radius': ['border-radius'],
  'border-end-start-radius': ['border-radius'], 'border-end-end-radius': ['border-radius']
}

/* Второй, независимый заслон на ту же ошибку — на случай пары без второго
   класса-владельца, которую owners-проверка выше не поймает. Измеренное
   значение обязано быть ровно числом с единицей и ничем больше, тем же
   строгим разбором (`px` из tokens.mjs), что уже применён к объявленному
   через toPx. Голый parseFloat читает число из начала строки и на
   сокращённой записи врёт: `parseFloat('96px 64px')` молча берёт 96. Строгий
   разбор превращает такую строку в NaN, и сравнение честно пропускается —
   цена ложного расхождения здесь высока: подрывает доверие ко всем тридцати
   тысячам сравнений разом. */

/* Правило, которое класс РОДИТЕЛЯ пишет детям: `[&>button]:py-0` даёт
   `.\[\&\>button\]\:py-0 > button { padding-block: 0 }`, `*:my-5` — `….\*\:my-5 > *`.
   ruleBody такие правила отбрасывает намеренно (они не про сам элемент), а здесь нужны
   именно они: у ребёнка это второй владелец свойства. Возвращает тела всех правил, где
   за именем класса в селекторе стоит комбинатор `>`. */
export function childRuleBodies(css, className) {
  const needle = '.' + cssClass(className)
  const out = []
  for (let at = css.indexOf(needle); at >= 0; at = css.indexOf(needle, at + 1)) {
    const open = css.indexOf('{', at)
    if (open < 0) break
    const selectorTail = css.slice(at + needle.length, open)
    if (/[A-Za-z0-9_-]/.test(css[at + needle.length] || '')) continue // `.x` внутри `.x-y`
    if (!selectorTail.includes('>')) continue
    const end = balanced(css, open, '{', '}')
    if (end > open) out.push(css.slice(open + 1, end))
  }
  return out
}

export function checkDeclaredValues(payload, css, vars = new Map()) {
  const failures = []
  let compared = 0
  let candidates = 0
  /* Кандидаты и сравнения — разные единицы: одно объявление `padding` даёт
     четыре сравнения, `gap` — одно. Делить одно на другое нельзя (на наборе из
     одних `p-*` доля вышла бы больше ста процентов), поэтому охват считается
     третьей величиной — кандидатами, давшими хотя бы одно сравнение. */
  let used = 0
  const seenEx = new Set()
  for (const e of payload.examples) {
    if (seenEx.has(e.id)) continue
    seenEx.add(e.id)
    for (const [j, n] of e.nodes.entries()) {
      const classes = n.class.split(/\s+/).filter(Boolean)
      const owners = new Map()
      const decls = []
      /* Второй владелец свойства — правило родителя для детей. У InputNumber vertical
         узел increment несёт `[&>button]:py-0` (тема библиотеки), и кнопка внутри с
         объявленным `p-1.5` мерит padding-top 0 и в библиотеке тоже: сверять `p-1.5` с
         измеренным нельзя. Родитель здесь — ближайший предшествующий узел со слотом на
         уровень выше: depth считает только предков с data-slot, так что это не обязательно
         родитель в DOM. Ошибка такой замены в одну сторону — лишний раз снятое сравнение,
         ложного расхождения она не даёт. */
      let parent = null
      for (let k = j - 1; k >= 0; k--) if (e.nodes[k].depth === n.depth - 1) { parent = e.nodes[k]; break }
      for (const c of (parent?.class || '').split(/\s+/).filter((x) => /^(?:\[&>[^\]]*\]|\*):/.test(x))) {
        for (const body of childRuleBodies(css, c)) {
          for (const m of body.matchAll(/(?:^|;)\s*([a-z-]+)\s*:/g)) for (const p of OWNS[m[1]] || []) owners.set(p, (owners.get(p) || 0) + 1)
        }
      }
      for (const c of classes) {
        const body = ruleBody(css, c)
        if (body === null) continue
        for (const m of body.matchAll(/(?:^|;)\s*([a-z-]+)\s*:\s*([^;]+)/g)) {
          const owned = OWNS[m[1]]
          if (!owned) continue
          const props = COMPARABLE[m[1]]
          /* Условность правила определяется двоеточием в ИМЕНИ класса, а не
             контекстом: правило внутри `@media` отличается от безусловного
             только именем. На живом ките совпадение полное (сравнимых правил
             для классов без двоеточия внутри условных at-правил — ноль), потому
             что Tailwind приписывает каждому варианту префикс с двоеточием. Но
             связь договорная, а не структурная: правило, обёрнутое `@media` не
             из варианта (плагин, ручной блок в utilities-extra.css), станет
             безусловным кандидатом, и измеренное значение сверится с тем, что
             сейчас не применено. */
          if (props && !c.includes(':')) decls.push({ c, value: m[2].trim(), props })
          for (const p of owned) owners.set(p, (owners.get(p) || 0) + 1)
        }
      }
      /* Гибкий элемент: итоговый размер задаёт алгоритм flex, а не объявленная
         ширина. `w-0 flex-1` — законная пара, ширина вырастет из основы. */
      const flexy = classes.some((c) => /^(flex-\d|flex-auto|flex-initial|grow|basis-)/.test(c))
      for (const { c, value, props } of decls) {
        candidates++
        if (flexy && props.some((p) => p === 'width' || p === 'height')) continue
        if (props.some((p) => owners.get(p) > 1)) continue
        const want = toPx(value, vars)
        if (!Number.isFinite(want)) continue
        let hit = 0
        for (const p of props) {
          const got = px(n.computed[p])
          if (!Number.isFinite(got)) continue
          compared++
          hit++
          if (Math.abs(got - want) > 0.51) {
            failures.push({ where: `${e.id} [${n.slot}] ${c}`, got: `${p}: ${n.computed[p]}`, want: `${p}: ${want}px` })
          }
        }
        if (hit) used++
      }
    }
  }
  return { name: 'числа против объявленных значений', failures, compared, candidates, used }
}

/* 6. Отсутствующие узлы. Проверки 2-5 сравнивают КЛАССЫ у тех узлов, что в DOM
   есть; узел, которого кит не нарисовал, ни одной из них не виден — сравнивать
   нечего, расхождения не возникает. Эта сравнивает состав узлов.

   Ожидание приходит из шаблона библиотеки (pipeline/audit/template.mjs) двумя
   множествами: `always` — слоты, которые компонент рисует при любых пропах, и
   `open` — те, что появляются у открытого экземпляра. Второе множество
   сверяется только там, где пример открыт: открытость видна из его пропов
   (`open: true` ставит фикстура оверлея, см. pipeline/doc-pages/fixtures.mjs).

   Чего проверка НЕ ловит: узлы под условием (v-if по пропам, слотам, полям
   элемента) — их 616 против 158 проверяемых. Пропавший спиннер раунда 15 был
   как раз из них (`isLeading && leadingIconName`), и эта проверка его бы не
   заметила. */
/* `transparentComps` — компоненты, в шаблоне которых у библиотеки нет ни одного `data-slot`
   (Container, Link и др.). Своих слотов у них нет, и `data-slot`-узел под таким владельцем —
   разметка обёртки: Banner.vue ставит `<UContainer data-slot="container">`, а внутрь кладёт
   свои `left`, `center`, `right`. Кит рисует `container` своим Container с меткой владельца, и
   метку наследуют все потомки — до 24.09 это давало «узлов нет: container, left, center,
   right» у Banner, Header, Footer, PageCTA, PageHero, PageSection при узлах, которые есть
   (сверка на артборде banner--class: 25 из 25). Правило выведено из библиотеки, не из кита. */
export function checkNodes(payload, { always, open, isOpen, componentName, ownComps = [], transparentComps = new Set() }) {
  const failures = []
  let comparedExamples = 0
  const seen = new Set()
  for (const e of payload.examples) {
    /* Упавший пример узлов не имеет по определению — про него уже сказала
       проверка отрисовки, и второе сообщение о том же только путает. */
    if (e.error || seen.has(e.id)) continue
    seen.add(e.id)
    comparedExamples++
    /* Свои узлы, а не все: чужое поддерево несёт СВОИ имена слотов, и `root`
       вложенного Avatar не должен закрывать `root` страницы. Дочерний узел,
       объявленный разметкой обёртки (`<UBadge data-slot="badge">` в
       BlogPost.vue:107), приходит помеченным обёрткой — измерено на всех 118
       страницах, — и в своих остаётся. Если кит когда-нибудь пометит такой
       узел дочерним компонентом, это придёт находкой «узла нет»: разбирать
       её надо здесь, а не записывать киту. */
    const have = new Set([
      ...ownNodes(e.nodes, componentName, ownComps),
      ...e.nodes.filter((n) => transparentComps.has(n.comp))
    ].map((n) => n.slot))
    const want = isOpen(e.id) ? [...always, ...open] : [...always]
    const missing = want.filter((s) => !have.has(s))
    if (missing.length) {
      failures.push({
        where: `${componentName} ${e.id}`,
        got: `узлов нет: ${missing.join(', ')}`,
        want: `слоты, которые библиотека рисует здесь всегда: ${want.join(', ')}`
      })
    }
  }
  return { name: 'отсутствующие узлы', failures, comparedExamples, alwaysSlots: always.size, openSlots: open.size }
}
