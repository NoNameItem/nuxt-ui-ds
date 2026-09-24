import { test } from 'node:test'
import assert from 'node:assert/strict'
import { checkCssPresence, checkCompositesCss, checkDeclaredValues, checkClasses, ownNodes, ruleBody, checkRendered, checkNodes, childRuleBodies } from '../audit/checks.mjs'
import { varMap } from '../audit/tokens.mjs'

const CSS = `
.font-medium { font-weight: 500; }
.-translate-x-1\\/2 { translate: calc(calc(1 / 2 * 100%) * -1) var(--tw-translate-y); }
.-translate-y-1\\/2 { --tw-translate-y: -50%; translate: var(--tw-translate-x) var(--tw-translate-y); }
`

test('класс без правила в utilities.css — ошибка', () => {
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'base', class: 'font-medium bg-nowhere', computed: {} }] }] }
  const r = checkCssPresence(payload, CSS)
  assert.equal(r.failures.length, 1)
  assert.match(r.failures[0].got, /bg-nowhere/)
})

test('составное свойство, смешавшее литерал с переменной, — дефект раунда 7', () => {
  const r = checkCompositesCss(CSS)
  assert.equal(r.failures.length, 1)
  assert.match(r.failures[0].where, /translate-x/)
  assert.match(r.failures[0].got, /^translate: calc/)
})

test('составное свойство целиком из литералов дефектом не считается', () => {
  assert.equal(checkCompositesCss('.scale-110 { scale: 110% 110%; }').failures.length, 0)
})

test('свои узлы — те, чей владелец совпадает с проверяемым компонентом', () => {
  const nodes = [
    { slot: 'root', class: '', depth: 0, comp: 'Pagination' },
    { slot: 'list', class: 'flex', depth: 1, comp: 'Pagination' },
    { slot: 'item', class: 'rounded-md', depth: 2, comp: 'Button' },
    { slot: 'label', class: 'truncate', depth: 3, comp: 'Button' }
  ]
  assert.deepEqual(ownNodes(nodes, 'Pagination').map((n) => n.slot), ['root', 'list'])
})

test('соседние экземпляры на глубине 0 своими быть не перестают', () => {
  const nodes = [
    { slot: 'root', class: 'flex', depth: 0, comp: 'Modal' },
    { slot: 'root', class: 'flex', depth: 0, comp: 'Modal' }
  ]
  assert.equal(ownNodes(nodes, 'Modal').length, 2)
})

test('нагрузка без меток честно сообщает, что сравнивать нечего', () => {
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'root', class: 'flex', depth: 0, comp: null }] }] }
  const res = checkClasses(payload, { wantById: { 'a.0': { root: ['grid'] } }, hasItems: false, componentName: 'X' })
  assert.equal(res.failures.length, 1)
  assert.match(res.failures[0].got, /метк/)
})

test('экранированное имя класса в CSS находится', () => {
  const css = '.gap-1\\.5{gap:.375rem}.outline-primary\\/25{outline-color:red}'
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'root', class: 'gap-1.5 outline-primary/25', computed: {} }] }] }
  assert.deepEqual(checkCssPresence(payload, css).failures, [])
})

test('checkCssPresence различает класс темы и класс примера', () => {
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'root', class: 'from-theme from-example', computed: {} }] }] }
  const res = checkCssPresence(payload, '/* пусто */', new Set(['from-theme']))
  assert.equal(res.failures.length, 2)
  assert.equal(res.failures.find((f) => f.got === 'from-theme').source, 'тема')
  assert.equal(res.failures.find((f) => f.got === 'from-example').source, 'пример')
})

test('checkClasses считает слоты, выпавшие из-за items', () => {
  const want = { root: ['flex'], item: ['p-1'], label: ['truncate'] }
  const payload = { examples: [{ id: 'a.0', nodes: [
    { slot: 'root', class: 'flex', depth: 0, comp: 'X', computed: {} },
    { slot: 'item', class: 'p-1', depth: 1, comp: 'X', computed: {} },
    { slot: 'label', class: 'truncate', depth: 2, comp: 'X', computed: {} }
  ] }] }
  const res = checkClasses(payload, { wantById: { 'a.0': want }, hasItems: true, componentName: 'X' })
  assert.equal(res.failures.length, 0)
  assert.equal(res.skippedSlots, 2)
})

test('светлая и тёмная копии примера сравниваются один раз', () => {
  // comp: 'X' — узел с меткой владельца, как в реальной нагрузке после раунда 10;
  // без неё узел не участвует в сравнении вовсе (см. checkClasses), и тест
  // проверял бы уже не дедуп, а «нет меток» из соседнего сценария
  const ex = { id: 'a.0', nodes: [{ slot: 'root', class: 'flex', depth: 0, comp: 'X' }] }
  const res = checkClasses({ examples: [ex, { ...ex }] }, { wantById: { 'a.0': { root: ['grid'] } }, hasItems: false, componentName: 'X' })
  assert.equal(res.failures.length, 1)
})

test('разошедшиеся копии примера — находка, а не дубль', () => {
  const light = { id: 'a.0', nodes: [{ slot: 'root', class: 'grid', depth: 0, comp: 'X' }] }
  const dark = { id: 'a.0', nodes: [{ slot: 'root', class: 'grid hidden', depth: 0, comp: 'X' }] }
  const res = checkClasses({ examples: [light, dark] }, { wantById: { 'a.0': { root: ['grid'] } }, hasItems: false, componentName: 'X' })
  assert.equal(res.failures.length, 1)
  assert.match(res.failures[0].got, /копии/)
})

test('процентное объявление расхождением не считается', () => {
  const css = '.size-full{width:100%;height:100%}'
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'root', class: 'size-full', computed: { width: '320px' } }] }] }
  const r = checkDeclaredValues(payload, css)
  assert.deepEqual(r.failures, [])
  /* Не только «расхождения нет», но и «сравнения не было»: без разбора
     объявленного `Math.abs(NaN - 320) > 0.51` ложно, расхождение не появляется
     всё равно, а `compared` растёт на каждом процентном объявлении — на живых
     нагрузках 31322 превратились бы в 35230, и охват в 84,4%. */
  assert.equal(r.compared, 0)
})

test('узлы без метки считаются отдельно от чужих', () => {
  const ex = { id: 'a.0', nodes: [
    { slot: 'root', class: 'grid', depth: 0, comp: 'X', computed: {} },
    { slot: 'body', class: 'flex', depth: 1, comp: null, computed: {} },
    { slot: 'icon', class: 'size-5', depth: 1, comp: 'Button', computed: {} }
  ] }
  // вторая копия с тем же id — светлая и тёмная: considered обязан считаться
  // после дедупа, иначе знаменатель доли «без метки» вдвое больше настоящего
  const res = checkClasses({ examples: [ex, { ...ex }] }, { wantById: { 'a.0': { root: ['grid'] } }, hasItems: false, componentName: 'X' })
  assert.equal(res.skippedNoOwner, 1)
  assert.equal(res.skippedForeign, 1)
  assert.equal(res.considered, 3)
})

test('пример, где метки нет ни у одного узла, попадает и в счёт «без метки»', () => {
  const payload = { examples: [{ id: 'a.0', nodes: [
    { slot: 'root', class: 'grid', depth: 0, comp: null, computed: {} },
    { slot: 'body', class: 'flex', depth: 1, comp: null, computed: {} }
  ] }] }
  const res = checkClasses(payload, { wantById: { 'a.0': { root: ['grid'] } }, hasItems: false, componentName: 'X' })
  assert.equal(res.considered, 2)
  assert.equal(res.skippedNoOwner, 2, 'иначе страница без меток в строку «больше половины узлов без метки» не попадёт')
})

test('правило потомков классу не приписывается', () => {
  const css = '.group):not(:last-child) *):is(:where(.group) *) { border-radius: 0; }'
  assert.equal(ruleBody(css, 'group'), null)
})

test('правило детей классу не приписывается', () => {
  assert.equal(ruleBody('.space-y-4 > :not(:last-child) { margin-block-start: 16px; }', 'space-y-4'), null)
})

/* Запятая заканчивает одну из равноправных частей списка селекторов, а не
   уводит класс на другой элемент. Третий случай — тот, на котором ломается
   наивная починка «встретил запятую — читай до `{`»: субъект там `.c`, а `.a`
   стоит внутри `:where(…)` у предка. */
test('часть группового селектора остаётся субъектом', () => {
  assert.match(ruleBody('.a,.b{padding:16px}', 'a'), /padding/)
  assert.match(ruleBody('.foo .a,.b{padding:16px}', 'a'), /padding/)
  assert.equal(ruleBody('.x:where(.a, .b) .c{padding:16px}', 'a'), null)
})

/* Защит у groupBrace пять, и отрицательный тест выше страхует только одну —
   остановку на `)`. Остальные четыре: пропуск содержимого скобок (ради него
   groupBrace и написан сканером, а не чтением до первой `{`), остановка на `]`
   и на `}` и счётчик парности внутри самого groupBrace. */
test('скобки и строки внутри группового селектора границей части не являются', () => {
  // скобки в СОСЕДНЕЙ части пропускаются целиком, а не обрывают поиск тела
  assert.match(ruleBody('.a, .b:where(.x){padding:16px}', 'a'), /padding/)
  // имя внутри значения атрибута: до `{` дороги нет, мешает закрывающая `]`
  assert.equal(ruleBody('[data-x=".a,b"] .c{padding:16px}', 'a'), null)
  // имя внутри строкового значения объявления: селектор кончился на `}`
  assert.equal(ruleBody('.x{content:".a,.b"}\n.victim{padding:999px}', 'a'), null)
  // незакрытая скобка: без счётчика индекс уезжает в начало файла за чужим телом
  assert.equal(ruleBody('{ color: red }\n.a,.b:where(bad', 'a'), null)
})

/* Псевдоэлемент пишется двумя двоеточиями, и второе обязано быть съедено вместе
   с первым: иначе IDENT спотыкается о него, класс теряет правило и заодно
   статус владельца. В живом ките это классы `after:*` и `before:*`. */
test('псевдоэлемент принадлежность не рвёт', () => {
  assert.match(ruleBody('.after\\:ms-0\\.5::after{margin-inline-start:2px}', 'after:ms-0.5'), /margin-inline-start/)
})

/* Веток парности в сканере две, и тест про незакрытый `[` проверяет только
   одну; без счётчика на круглых скобках индекс так же уезжает в начало файла. */
test('незакрытый псевдокласс со скобкой правила не даёт', () => {
  assert.equal(ruleBody('{ color: red }\n.foo:where(bad', 'foo'), null)
})

/* Своё правило класса стоит в файле после чужих вхождений его имени (у `group`
   так и есть), поэтому первое вхождение — не ответ. */
test('своё правило находится и после чужого вхождения имени', () => {
  assert.match(ruleBody('.p-4 > * { padding: 0; }\n.p-4 { padding: 16px; }', 'p-4'), /16px/)
})

/* Незакрытая скобка в селекторе сканер обязан остановить, а не пересчитать
   индекс: без проверки парности он уезжает в начало файла и приписывает классу
   тело первого попавшегося чужого правила. */
test('незакрытый селектор атрибута правила не даёт', () => {
  assert.equal(ruleBody('{ color: red }\n.foo[bad', 'foo'), null)
})

test('присоединённые уточнения принадлежность не рвут', () => {
  assert.match(ruleBody('.aria-disabled\\:opacity-75[aria-disabled="true"] { opacity: 75%; }', 'aria-disabled:opacity-75'), /opacity/)
  assert.match(ruleBody('.rtl\\:-rotate-90:where(:dir(rtl), [dir="rtl"] *) { rotate: -90deg; }', 'rtl:-rotate-90'), /rotate/)
  assert.match(ruleBody('.p-4 { padding: 16px; }', 'p-4'), /padding/)
})

test('проверка 5 сравнивает объявления правила, а не префикс класса', () => {
  const css = '.p-4 { padding: calc(var(--spacing) * 4) }'
  const vars = varMap([':root { --spacing: 0.25rem }'])
  const node = { slot: 'root', class: 'p-4', computed: { 'padding-top': '16px', 'padding-right': '24px', 'padding-bottom': '16px', 'padding-left': '16px' } }
  const res = checkDeclaredValues({ examples: [{ id: 'a.0', nodes: [node] }] }, css, vars)
  assert.equal(res.failures.length, 1)
  assert.match(res.failures[0].got, /padding-right/)
  assert.equal(res.compared, 4)
  // одно объявление-кандидат на четыре сравнения: охват считается по кандидатам,
  // и подменять его числом сравнений нельзя
  assert.equal(res.candidates, 1)
  assert.equal(res.used, 1)
})

test('за свойство отвечает ровно один класс, иначе сравнения нет', () => {
  const css = '.size-5 { width: calc(var(--spacing) * 5); height: calc(var(--spacing) * 5) } .w-full { width: 100% }'
  const vars = varMap([':root { --spacing: 0.25rem }'])
  const node = { slot: 'root', class: 'size-5 w-full', computed: { width: '300px', height: '20px' } }
  const res = checkDeclaredValues({ examples: [{ id: 'a.0', nodes: [node] }] }, css, vars)
  assert.equal(res.failures.length, 0)
  /* Сравнение высоты состояться обязано: без этой строки тест проходит и при
     полностью выключенном сравнении, а проверяет он исключение одной ширины. */
  assert.equal(res.compared, 1)
})

test('сокращённая запись gap не сравнивается как одно число', () => {
  // .gap-16 — единственный владелец, computed отдаёт две длины
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'root', class: 'gap-16', computed: { gap: '96px 64px' } }] }] }
  const r = checkDeclaredValues(payload, '.gap-16 { gap: 64px; }', new Map())
  assert.equal(r.failures.length, 0, 'при parseFloat вместо px здесь появится расхождение')
  assert.equal(r.compared, 0)
})

/* Гап у обеих осей одинаков намеренно: при разных браузер отдаёт две длины
   («96px 64px»), строгий разбор px обращает их в NaN и сравнение пропускается
   САМ — заслон владельцев при этом не работает, и тест проходил бы с пустой
   таблицей OWNS. Равные оси браузер сериализует одним значением, разбор
   проходит, и единственное, что удерживает сравнение, — второй владелец `gap`.
   Нагрузка такой формы живая, а не выдуманная: у BlogPosts узел с классами
   `gap-8 lg:gap-y-16` отдаёт `gap: 32px` одним значением (одним значением на
   сохранённых нагрузках приходят 40 104 гапа из 40 528). */
test('второй класс-владелец gap исключает сравнение', () => {
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'root', class: 'gap-16 gap-y-16', computed: { gap: '64px' } }] }] }
  const css = '.gap-16 { gap: 64px; }\n.gap-y-16 { row-gap: 64px; }'
  const r = checkDeclaredValues(payload, css, new Map())
  assert.equal(r.compared, 0, 'без row-gap в OWNS владелец один и сравнение состоится')
})

test('гибкому элементу объявленная ширина не сверяется', () => {
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'root', class: 'w-0 flex-1', computed: { width: '320px' } }] }] }
  const r = checkDeclaredValues(payload, '.w-0 { width: 0px; }', new Map())
  assert.equal(r.compared, 0)
  assert.equal(r.failures.length, 0)
  /* Кандидат тут есть, гасится только сравнение. Величина эта — знаменатель
     заглавной строки охвата, и считаться она обязана до гейтов, а не после. */
  assert.equal(r.candidates, 1)
})

test('негибкому элементу объявленная ширина сверяется', () => {
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'root', class: 'w-0', computed: { width: '320px' } }] }] }
  const r = checkDeclaredValues(payload, '.w-0 { width: 0px; }', new Map())
  assert.equal(r.compared, 1, 'парный тест: без него предыдущий проходит при выключенном сравнении')
  assert.equal(r.failures.length, 1)
})

test('предел ширины владеет ею наравне с объявленной шириной', () => {
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'root', class: 'w-96 max-w-full', computed: { width: '320px' } }] }] }
  const css = '.w-96 { width: 384px; }\n.max-w-full { max-width: 100%; }'
  const r = checkDeclaredValues(payload, css, new Map())
  assert.equal(r.compared, 0, 'используемая ширина зажата пределом, объявленной не равна')
  assert.equal(r.failures.length, 0)
})

/* Единственный заслон против возврата 1015 ложных расхождений: у узла нет
   второго класса-владельца, поэтому гейт владельцев молчит, и отсутствие
   сравнения держится ровно на том, что min-/max- нет в COMPARABLE. */
test('предел ширины сам по себе кандидатом не становится', () => {
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'root', class: 'max-w-96', computed: { width: '320px' } }] }] }
  const r = checkDeclaredValues(payload, '.max-w-96{max-width:384px}', new Map())
  assert.equal(r.candidates, 0, 'max-width влияет на ширину, но сравнению не подлежит')
  assert.equal(r.compared, 0)
  assert.equal(r.failures.length, 0)
})

/* Класс с вариантом применяется не всегда, и измеренное значение о нём ничего
   не говорит: медиазапрос здесь не выполнен, объявлено 24px, измерено 16px. */
test('класс с вариантом кандидатом не становится', () => {
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'root', class: 'sm:p-6', computed: { 'padding-top': '16px' } }] }] }
  const css = '@media (min-width:640px){.sm\\:p-6{padding:24px}}'
  const r = checkDeclaredValues(payload, css, new Map())
  assert.equal(r.candidates, 0)
  assert.equal(r.failures.length, 0)
})

/* Каждый пример нарисован дважды, светлой и тёмной копией. Без дедупа все три
   опубликованные величины проверки 5 удваиваются. */
test('светлая и тёмная копии примера разбираются один раз', () => {
  const ex = { id: 'a.0', nodes: [{ slot: 'root', class: 'w-0', computed: { width: '0px' } }] }
  const r = checkDeclaredValues({ examples: [ex, { ...ex }] }, '.w-0 { width: 0px; }', new Map())
  assert.equal(r.candidates, 1)
  assert.equal(r.compared, 1)
})

/* Кандидат, у которого объявленное разобралось, а измерять нечего: в числитель
   охвата он попасть не должен, иначе строка перестаёт означать написанное. */
test('кандидат без единого измеренного значения охват не увеличивает', () => {
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'root', class: 'p-4', computed: {} }] }] }
  const r = checkDeclaredValues(payload, '.p-4 { padding: 16px; }', new Map())
  assert.equal(r.candidates, 1)
  assert.equal(r.compared, 0)
  assert.equal(r.used, 0)
})

test('имя класса не матчится внутри более длинного экранированного имени', () => {
  const css = '.text-\\[8px\\]\\/3 { font-size: 8px; line-height: 3 }'
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'root', class: 'text-[8px]', computed: { 'font-size': '8px' } }] }] }
  const res = checkCssPresence(payload, css, new Set())
  assert.equal(res.failures.length, 1, 'правила для text-[8px] в этом CSS нет')
})

test('владелец узла сверяется без учёта регистра имени', () => {
  const payload = { examples: [{ id: 'anatomy.0', nodes: [{ slot: 'root', class: 'block', comp: 'PageCta', depth: 0, computed: {} }] }] }
  const r = checkClasses(payload, { wantById: { 'anatomy.0': { root: ['block'] } }, hasItems: false, componentName: 'PageCTA' })
  assert.equal(r.failures.length, 0)
  assert.equal(r.skippedForeign, 0, 'узел свой, а не чужой')
})

/* Второй заслон на то же правило: сверок имени в checkClasses две — ownNodes и
   отнесение узла к чужим. Тест выше ловит только вторую (при точной ownNodes
   сравнивать нечего, и ноль расхождений выглядит как успех), поэтому здесь
   классы узла и темы расходятся: сравнение обязано состояться и это увидеть. */
test('узел с иным регистром имени попадает в сравнение, а не мимо него', () => {
  const payload = { examples: [{ id: 'anatomy.0', nodes: [{ slot: 'root', class: 'flex', comp: 'PageCta', depth: 0, computed: {} }] }] }
  const r = checkClasses(payload, { wantById: { 'anatomy.0': { root: ['block'] } }, hasItems: false, componentName: 'PageCTA' })
  assert.equal(r.failures.length, 1, 'сравнение состоялось и нашло расхождение')
  assert.match(r.failures[0].where, /\[root\]/)
})

test('не-ASCII символ в имени класса кит не экранирует — сканер тоже не должен', () => {
  /* Правило живого кита, дословно из tokens/utilities-extra.css: точку-разделитель
     Tailwind оставляет как есть, а экранирует только ASCII-пунктуацию. Сканер,
     экранировавший всё подряд, искал `\·` и не находил ничего — и класс, у
     которого правило есть, попадал в отчёт как класс без правила. */
  const css = ".not-first-of-type\\:before\\:content-\\[\\'·\\'\\]:not(:first-of-type)::before {content: '·';}"
  assert.match(ruleBody(css, "not-first-of-type:before:content-['·']"), /content/)
  // ASCII-пунктуация по-прежнему экранируется: без этого `.\[` не найдётся
  assert.match(ruleBody(".w-\\[3px\\]{width:3px}", 'w-[3px]'), /width/)
})

/* Компонент, чей корень рисует другой компонент (DELEGATES в
   pipeline/audit/props.mjs): метку на корне кит ставит то свою, то делегата —
   `DashboardSearchButton` приходит помеченным как `Button`, и без второго
   имени вся страница уходила в «чужое поддерево»: двадцать узлов, ноль
   сравнений и ноль расхождений, неотличимых от совпадения.

   Классы узла и ожидания здесь намеренно разные: совпади они, ноль
   расхождений значил бы и «сравнили», и «не сравнивали вовсе». */
test('узел с меткой делегата сравнивается, а не считается чужим', () => {
  const payload = { examples: [{ id: 'a.0', nodes: [{ slot: 'base', class: 'flex', depth: 0, comp: 'Button', computed: {} }] }] }
  const args = { wantById: { 'a.0': { base: ['grid'] } }, hasItems: false, componentName: 'DashboardSearchButton' }
  const without = checkClasses(payload, args)
  assert.equal(without.skippedForeign, 1, 'без ownComps узел считается чужим')
  assert.equal(without.failures.length, 0)
  const with_ = checkClasses(payload, { ...args, ownComps: ['Button'] })
  assert.equal(with_.skippedForeign, 0)
  assert.equal(with_.failures.length, 1, 'сравнение состоялось и нашло расхождение')
})

test('ownComps не делает своим соседний компонент внутри поддерева', () => {
  /* У DashboardSearchButton в поддереве есть ещё и Kbd — он в список не
     входит и обязан остаться чужим. */
  const payload = { examples: [{ id: 'a.0', nodes: [
    { slot: 'base', class: 'grid', depth: 0, comp: 'Button', computed: {} },
    { slot: 'base', class: 'px-1', depth: 2, comp: 'Kbd', computed: {} }
  ] }] }
  const r = checkClasses(payload, { wantById: { 'a.0': { base: ['grid'] } }, hasItems: false, componentName: 'DashboardSearchButton', ownComps: ['Button'] })
  assert.equal(r.skippedForeign, 1)
  assert.equal(r.failures.length, 0)
})

/* Ноль расхождений на странице, чьи узлы все свои и все с метками, тоже может
   означать «не сравнивали»: у слота может не быть ожидания — так молчит
   `Container`, где кит рисует девять узлов со слотами, которых в теме нет.
   Ни skippedForeign, ни skippedNoOwner такую страницу не выдают. */
test('сравнённые слоты считаются отдельно от пропущенных', () => {
  const payload = { examples: [{ id: 'a.0', nodes: [
    { slot: 'base', class: 'grid', depth: 0, comp: 'X', computed: {} },
    { slot: 'icon', class: 'size-5', depth: 1, comp: 'X', computed: {} }
  ] }] }
  const r = checkClasses(payload, { wantById: { 'a.0': { base: ['grid'] } }, hasItems: false, componentName: 'X' })
  assert.equal(r.failures.length, 0)
  assert.equal(r.comparedSlots, 1, 'сравнён только base')
  assert.equal(r.skippedSlots, 1, 'у icon ожидания нет')

  const blind = checkClasses(payload, { wantById: { 'a.0': { root: ['grid'] } }, hasItems: false, componentName: 'X' })
  assert.equal(blind.failures.length, 0, 'расхождений нет')
  assert.equal(blind.comparedSlots, 0, 'и не могло быть: не сравнивали ничего')
})

test('упавший пример отчитывается причиной, а не отсутствием узлов', () => {
  const payload = { kitErrors: null, examples: [
    { id: 'variant-type.0', theme: 'light', nodes: [], error: 'InvalidStateError: Failed to set the value property' },
    { id: 'usage.0', theme: 'light', nodes: [] }
  ] }
  const r = checkRendered(payload, 'InputMenu')
  assert.equal(r.failures.length, 2)
  assert.match(r.failures[0].got, /исключение при рендере/)
  assert.match(r.failures[1].got, /ни одного data-slot/)
})

test('пример без data-slot — не расхождение, если их нет и в шаблоне библиотеки', () => {
  const payload = { kitErrors: null, examples: [{ id: 'anatomy.0', theme: 'light', nodes: [] }] }
  assert.equal(checkRendered(payload, 'Link', { librarySlots: false }).failures.length, 0)
  assert.equal(checkRendered(payload, 'Badge').failures.length, 1)
})

test('узлы обёртки под прозрачным компонентом считаются своими', () => {
  const payload = { kitErrors: null, examples: [{ id: 'anatomy.0', theme: 'light', nodes: [
    { slot: 'root', comp: 'Banner', depth: 0 },
    { slot: 'container', comp: 'Container', depth: 1 },
    { slot: 'left', comp: 'Container', depth: 2 }
  ] }] }
  const always = new Set(['root', 'container', 'left'])
  const args = { always, open: new Set(), isOpen: () => false, componentName: 'Banner' }
  assert.equal(checkNodes(payload, args).failures.length, 1, 'без правила — «узлов нет»')
  assert.equal(checkNodes(payload, { ...args, transparentComps: new Set(['Container']) }).failures.length, 0)
})

/* Правило родителя для детей — второй владелец свойства (InputNumber vertical: узел
   increment несёт `[&>button]:py-0`, и кнопка с `p-1.5` мерит padding-top 0 и в
   библиотеке). Сравнение снимается только по свойствам, которые правило родителя пишет. */
test('проверка 5: [&>…]-правило родителя снимает сравнение своих свойств, и только их', () => {
  const css = '.p-1\\.5 { padding: 6px } .\\[\\&\\>button\\]\\:py-0 > button { padding-block: 0px; }'
  assert.equal(childRuleBodies(css, '[&>button]:py-0').length, 1)
  const parent = { slot: 'increment', class: '[&>button]:py-0', depth: 1, computed: {} }
  const child = { slot: 'base', class: 'p-1.5', depth: 2, computed: { 'padding-top': '0px', 'padding-right': '6px', 'padding-bottom': '0px', 'padding-left': '6px' } }
  const res = checkDeclaredValues({ examples: [{ id: 'a.0', nodes: [parent, child] }] }, css)
  assert.deepEqual(res.failures, [])
  // Отрицательный: без правила у родителя тот же ребёнок — два расхождения (верх и низ).
  const bare = checkDeclaredValues({ examples: [{ id: 'a.0', nodes: [{ ...parent, class: '' }, child] }] }, css)
  assert.equal(bare.failures.length, 2)
  // Правило родителя не про padding — сравнение остаётся.
  const other = checkDeclaredValues({ examples: [{ id: 'a.0', nodes: [{ ...parent, class: '[&>button]:gap-0' }, child] }] }, css + ' .\\[\\&\\>button\\]\\:gap-0 > button { gap: 0 }')
  assert.equal(other.failures.length, 2)
})
