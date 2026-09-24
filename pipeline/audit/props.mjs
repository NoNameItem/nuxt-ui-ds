/* Пропы, какими их видит сам компонент Nuxt UI, — вход оракула. Два правила, и
   оба взяты из исходников библиотеки, а не выведены рассуждением: поимённая
   таблица READS (как строка tv() компонента читает вариант, имя которого
   совпало с именем слота или пропа) и useComponentIcons (leading/trailing
   вычисляются из иконок, а не берутся из пропа). Третье правило — что булев
   проп без default равен undefined — живёт в pipeline/doc-pages/parse-props.mjs,
   потому что через sfcDefaults идут и doc.defaults, и база синтетических
   разделов страницы. */

import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

/* Безусловного правила «имя слота совпало с именем булева варианта, значит
   вариант включён» не существует, хотя выглядит оно правдоподобно. Из 24 таких
   пар так читаются только четырнадцать; остальные компонент читает из пропа,
   инвертированно, по индексу узла или не передаёт в tv() вовсе. Безусловное
   правило стоило пяти ложных расхождений, записанных на кит (`PageSection` и
   `PageHero` [headline], `Table` [thead], `PricingTable` [tr], `PageCard`
   [root]), и одного погашенного настоящего (`ChangelogVersion` [meta]).
   Поэтому таблица поимённая, и у каждой строки — файл и строка библиотеки.
   Формы «по индексу узла» и «не передаёт в tv()» держались ровно на PricingTable и
   ChangelogVersion и ушли вместе с ними, когда эти компоненты вывели из кита.

   Плашка `$slotMark` в пропе — не переданное значение, а отметка генератора
   примеров (pipeline/doc-pages/examples.mjs): «одноимённый Vue-слот заполнен». Отсюда
   следствие, без которого формы читаются неверно: если Vue-слота с таким именем
   у компонента нет — а имя варианта могло совпасть со слотом темы или с
   пропом, — то живой компонент в этом примере не получает ничего, ни слота, ни
   пропа, и в tv() у него уходит undefined. Читать такую плашку как `true`
   нельзя: так появляются ложные расхождения, ровно этим и отличаются
   Modal.overlay и PageCard.spotlight от строк группы slot.

   Формы:
     slot     — компонент читает `!!props.x || !!slots.x`: включает и
                заполненный слот, и непустое значение пропа           → !!x
     truthy   — компонент читает `!!props.x`                          → !!x
     inverted — компонент читает `!slots.x`: заполненный слот выключает,
                а значение в пропе слот не заполняет           → !isMark(x)
     raw      — компонент читает значение сырым, без `!!`, и Vue-слота с
                таким именем у него нет                  → значение как есть
     icons    — ключ считает ветка componentIcons ниже, таблица не трогает
     inputNumberIncrement, inputNumberDecrement
              — обе кнопки InputNumber читаются с оглядкой на orientation
                (InputNumber.vue:75-76); формулы — в ветках switch ниже. Имена
                поимённые, а не общие, потому что общей формы тут нет: это две
                разные формулы, обе завязанные на соседний проп

   Форма применяется к любому значению, а не только к объекту. Прежний страж
   «преобразуем, только если в пропе объект» стоял на том, что обычное значение
   компонент читает так же, как оракул, — и для форм slot и truthy это неверно:
   компонент видит `!!props.x`, то есть непустую строку как `true`, а оракул
   отдавал строку в tv(), где она не находится ни во что. Один и тот же дефект
   кита был из-за этого показан в анатомии и скрыт в 337 случаях «пара +
   пример» на 18 парах. Пара, которой в таблице нет, не меняется — но и не
   проходит молча: полноту таблицы стерегут readsSelfCheck() и readsCoverage()
   внизу этого файла, и зовут их двое — pipeline/tests/props.test.mjs и сама приёмка,
   до запуска Chrome. */
export const READS = new Map(Object.entries({
  /* slot: `!!props.x || !!slots.x` — так читаются десять пар из четырнадцати.
     У остальных четырёх слагаемые другие, и `slot` им не формула, а
     приближение: оно совпадает с библиотекой, когда пример заполняет
     одноимённый слот, и расходится, когда вариант включает что-то другое —
     проп с другим именем или длина массива. Форма у них пока общая, разбор —
     задача 22; здесь только правда о том, что они на самом деле читают:
       Page.left           !!slots.left                        Page.vue:19,26
       Page.right          !!slots.right                       Page.vue:20,27
       PageSection.body    !!slots.body || !!props.features?.length
                             || !!slots.features               PageSection.vue:38
       ChatMessage.leading !!props.icon || !!props.avatar
                             || !!slots.leading                ChatMessage.vue:43
     Пропов с именами left, right, body и leading у этих компонентов нет вовсе —
     имя варианта совпадает только со слотом. Остальные десять строк читаются
     дословно как в заголовке группы. */
  'Alert.title': 'slot',              // Alert.vue:39      title: !!props.title || !!slots.title
  'Toast.title': 'slot',              // Toast.vue:46
  'PageCard.title': 'slot',           // PageCard.vue:57
  'PageCTA.title': 'slot',            // PageCTA.vue:33
  'PageFeature.title': 'slot',        // PageFeature.vue:34
  'PageHeader.title': 'slot',         // PageHeader.vue:25
  'PageHero.title': 'slot',           // PageHero.vue:32
  'PageSection.title': 'slot',        // PageSection.vue:36
  'PageSection.description': 'slot',  // PageSection.vue:37
  'PageSection.body': 'slot',         // PageSection.vue:38  !!slots.body || (features…)
  'ChatMessage.leading': 'slot',      // ChatMessage.vue:43  !!props.icon || !!props.avatar || !!slots.leading
  'ChatMessage.actions': 'slot',      // ChatMessage.vue:44
  'Page.left': 'slot',                // Page.vue:19,26      hasLeft = !!slots.left
  'Page.right': 'slot',               // Page.vue:20,27

  // truthy: !!props.x
  'BlogPost.image': 'truthy',         // BlogPost.vue:46     image: !!props.image

  /* Обе кнопки InputNumber читаются по-разному в зависимости от orientation, и
     формой truthy это условие не выражается: при vertical increment включает и
     чужой проп, а decrement выключен всегда. */
  'InputNumber.increment': 'inputNumberIncrement', // InputNumber.vue:75
  'InputNumber.decrement': 'inputNumberDecrement', // InputNumber.vue:76

  /* raw: значение уходит в tv() как есть. Пока страж пропускал только объекты,
     эти пары были неотличимы от удаления ключа (прежняя форма drop) — плашка слота и
     удалённый ключ дают в tv() одно и то же «ни во что не попало». На настоящем значении
     разница появляется: удаление стирает и `loading: true`, и `overlay: true`. */
  'Modal.overlay': 'raw',             // Modal.vue:64,165    overlay: props.overlay, без !!; Vue-слота overlay нет, data-slot стоит на элементе под v-if="props.overlay"
  'Table.loading': 'raw',             // Table.vue:96        loading: props.loading, без !!; Vue-слот loading есть (Table.vue:436), но вариант он не включает

  /* spotlight — тот же случай, что Modal.overlay, слово в слово: проп читается
     через `&&`, а не через `!!`; Vue-слота с таким именем у компонента нет
     (slots.spotlight не упоминается нигде), а data-slot стоит на элементе под
     v-if="props.spotlight" (PageCard.vue:80). Плашка, попавшая в этот проп, —
     метка слота темы, и живой компонент в том примере пропа не получает вовсе.

     Форма не off, хотя второе слагаемое и выглядит рантаймовым: elementX
     считает useMouseInElement как x − (rect.left + scrollX), где x до первого
     движения мыши равен нулю, то есть elementX = −rect.left. Ноль он даёт
     только у карточки, чей левый край совпал с левым краем страницы, — таких в
     примерах нет. Значит `spotlight: true` обязан включать вариант, и off
     (всегда false) неверна ровно так же, как truthy (плашка → true). */
  'PageCard.spotlight': 'raw',        // PageCard.vue:44,60,80  spotlight = props.spotlight && (elementX !== 0 || elementY !== 0)

  // inverted: !slots.x — вариант передаётся по узлу и перевёрнут
  'PageSection.headline': 'inverted', // PageSection.vue:56  ui.headline({ headline: !slots.headline })
  'PageHero.headline': 'inverted',    // PageHero.vue:44

  // icons: значение считает componentIcons ниже, таблица его не трогает
  'Input.leading': 'icons', 'Input.trailing': 'icons',
  'InputDate.leading': 'icons', 'InputDate.trailing': 'icons',
  'InputMenu.leading': 'icons', 'InputMenu.trailing': 'icons',
  'InputTags.leading': 'icons', 'InputTags.trailing': 'icons',
  'InputTime.leading': 'icons', 'InputTime.trailing': 'icons',
  'Select.leading': 'icons', 'Select.trailing': 'icons',
  'SelectMenu.leading': 'icons', 'SelectMenu.trailing': 'icons',
  'Textarea.leading': 'icons', 'Textarea.trailing': 'icons'
}))

/* Варианты, которые компонент считает сам, а не берёт из одноимённого пропа.
   В READS их держать нельзя: её строки стережёт readsCoverage(), а она объявляет
   строку устаревшей, если пара ни разу не получила значение-объект, — а сюда
   значение не приходит вовсе, ни объектом, ни как-либо ещё.

   Switch рисует ДВЕ иконки, а не одну: checkedIcon и uncheckedIcon — соседние
   узлы (Switch.vue:86-87), обе в разметке всегда, видимостью управляет CSS по
   data-state. При loading вместо них одна иконка загрузки (Switch.vue:84).
   Приёмка сравнивает первый узел каждого слота (checks.mjs:229), поэтому
   оракулу нужен ровно тот вариант, с которым нарисован ПЕРВЫЙ узел icon. */
export const COMPUTED = new Map(Object.entries({
  /* Тема получает `disabled: disabled.value || props.loading` (Switch.vue:61): загрузка
     выключает переключатель, и без этого у примеров `loading` ждали бы тему без
     opacity-75 и cursor-not-allowed, которые кит ставит верно. */
  Switch: (p) => ({
    ...(p.loading ? { disabled: true } : {}),
    ...(p.loading
      ? { checked: true, unchecked: true }           // Switch.vue:84
      : p.checkedIcon
        ? { checked: true, unchecked: false }        // Switch.vue:86 — первый из двух
        : { checked: false, unchecked: !!p.uncheckedIcon }) // Switch.vue:87
  }),

  /* Кнопка считает square сама: `props.square || !slots.default && !props.label`
     (Button.vue:120). Дефолтный Vue-слот генератор примеров кладёт в проп
     `children` (pipeline/doc-pages/examples.mjs:62), и на самой странице Button он
     заполнен у всех 91 примера — там правило не меняет ничего. Нужно оно
     делегирующим страницам (DELEGATES ниже): у кнопки, которую рисует
     `DashboardSidebarToggle`, нет ни метки, ни содержимого, и square даёт
     `p-1.5` вместо `px-2.5 py-1.5`.

     leading/trailing кнопка считает сама (Button.vue:121-122) — по той же
     формуле, что и остальные, но с двумя отличиями, из-за которых её нет в
     ICON_COMPONENTS: она передаёт голые isLeading/isTrailing, без
     `|| !!props.avatar || !!slots.leading`, и кормит useComponentIcons
     `loading: isLoading` (Button.vue:95), а не `props.loading`.

     В теме button оба варианта пусты, и до раунда 15 правило не меняло ничего:
     compound-правила с ними правят слоты leadingIcon и trailingIcon, а кит под
     `loading` узла иконки не рисовал вовсе. Теперь рисует, и правила работают:
     `{loading, leading} -> leadingIcon: animate-spin`,
     `{loading, !leading, trailing} -> trailingIcon: animate-spin`.

     `isLoading` упрощён до `!!p.loading`: остальные его слагаемые
     (`loadingAuto && (loadingAutoState || formLoading && type === 'submit')`,
     Button.vue:85-87) — состояния, которых на статичной странице не бывает. */
  Button: (p) => {
    const { isLeading, isTrailing } = componentIcons({ ...p, loading: !!p.loading })
    return { square: !!(p.square || (!p.children && !p.label)), leading: isLeading, trailing: isTrailing }
  },

  /* Пропа `size` у панели нет: вариант считается как `size: !!size.value`
     (DashboardPanel.vue:30), а size — это `storage.size ?? defaultSize`
     (composables/useResizable.js:46-47). Хранилище на статичной странице пусто, так
     что решает defaultSize. Пропы `size: true/false` в doc-примерах — след раздела
     вариантов темы, до tv() они не доходят. */
  DashboardPanel: (p) => ({ size: !!p.defaultSize })
}))

/* Варианты, которые библиотека передаёт в вызов ОДНОГО слота поверх общих: `ui.actions({
   …, orientation: 'horizontal' })`. Общая формула компонента (COMPUTED) тут не годится —
   остальные слоты этот вариант получают из пропа как есть.

   Приёмка сравнивает первый узел каждого слота (checkClasses), поэтому формула отвечает
   за тот узел, что идёт в DOM первым. Возвращает объект вариантов или null — «вызов без
   переопределения». Аргумент — пропы примера как есть, вместе с дефолтами страницы (так
   же, как у COMPUTED): формуле нужны сами пропы, а не их проекция в варианты. */
const hasActions = (p) => (Array.isArray(p.actions) ? p.actions.length > 0 : !!p.actions)
const paletteItems = (p) => (p.groups || []).flatMap((g) => g.items || [])
export const SLOT_VARIANTS = new Map(Object.entries({
  /* Узлов `actions` два: внутренний — при `orientation === 'vertical'` и непустых actions,
     красится с пропом как есть (Alert.vue:62); внешний — при horizontal или при `close`,
     красится с `orientation: 'horizontal'` всегда (Alert.vue:69). Внутренний стоит в
     DOM раньше, поэтому первый узел — внешний везде, где внутреннего нет. Условие
     внутреннего — `props.actions?.length || !!slots.actions`: плашка слота в `actions`
     (пример anatomy) — это заполненный слот, а не пустой массив. */
  Alert: { actions: (p) => (p.orientation ?? 'vertical') === 'vertical' && hasActions(p) ? null : { orientation: 'horizontal' } },
  Toast: { actions: (p) => (p.orientation ?? 'vertical') === 'vertical' && hasActions(p) ? null : { orientation: 'horizontal' } }, // Toast.vue:96, :105

  /* `alone` считает сам шаблон, у двух слотов по-разному (ChatTool.vue:81, :87;
     ChatReasoning.vue:132, :138). hasContent у них разный: у ChatTool — `!!slots.default`
     (ChatTool.vue:49), а дефолтный слот генератор примеров кладёт в `children`
     (pipeline/doc-pages/examples.mjs:62); у ChatReasoning — `!!props.text || props.streaming`
     (ChatReasoning.vue:94), содержимое там — текст рассуждения.
     chevron по умолчанию trailing (ChatTool.vue:22). resolvedIcon у ChatTool — иконка
     загрузки при loading, иначе icon (ChatTool.vue:56); у ChatReasoning — просто icon. */
  ChatTool: {
    leadingIcon: (p) => ({ alone: !(!!p.children && (p.chevron ?? 'trailing') === 'leading') }),
    chevronIcon: (p) => ({ alone: !(p.loading ? true : !!p.icon) })
  },
  ChatReasoning: {
    leadingIcon: (p) => ({ alone: !((!!p.text || !!p.streaming) && (p.chevron ?? 'trailing') === 'leading') }),
    chevronIcon: (p) => ({ alone: !p.icon })
  },

  /* Шаги рисуются v-for по max, и у каждого свой вариант `step: stepVariant(index)`
     (Progress.vue:126). Первый узел — index 0: isFirst всегда, isActive — `0 ===
     Number(modelValue)` (Progress.vue:80-100). Отсюда first при нулевом значении, иначе
     other (opacity-0). Шагов нет, пока max не массив, — тогда формула не нужна. */
  Progress: { step: (p) => (Array.isArray(p.max) ? { step: Number(p.modelValue) === 0 ? 'first' : 'other' } : null) },

  /* Вариант пункта, а не компонента. Пропов `active` у CommandPalette и FooterColumns нет, а
     `loading` палитры — спиннер поля ввода: в корневой tv() идут только size и virtualize
     (CommandPalette.vue:92-95), у FooterColumns — ничего (FooterColumns.vue:24). Секции
     variant-active и loading doc-страниц кладут ключ на весь компонент, и до пунктов он не
     доходит: каждый пункт считает свой (CommandPalette.vue:257-283, FooterColumns.vue:45-56).
     Полнота: темы красят этими ключами только item и itemLeadingIcon палитры и link колонок —
     все эти слоты здесь.

     `active` приходит из ULink: item.active, если задан, иначе false без `to` (Link.vue:108-113),
     а при `to` — совпадение маршрута. На статичной странице маршрут не совпадает ни у кого —
     это допущение, то же, что в промпте 118. Пункт считается по шаблону: группы по порядку,
     в группе — items; у itemLeadingIcon — первый пункт, у которого слот рисуется вообще
     (`v-if="item.loading"`, иначе `v-else-if="item.icon"`), и у ветки загрузки `active` в
     вызове нет, а у ветки иконки нет `loading`. */
  CommandPalette: {
    item: (p) => {
      const it = paletteItems(p)[0]
      return it ? { active: !!it.active, loading: undefined } : null
    },
    itemLeadingIcon: (p) => {
      const it = paletteItems(p).find((i) => i.loading || i.icon)
      if (!it) return null
      return it.loading ? { loading: true, active: undefined } : { active: !!it.active, loading: undefined }
    }
  },
  FooterColumns: {
    link: (p) => {
      const link = (p.columns || []).flatMap((c) => c.children || [])[0]
      return link ? { active: !!link.active } : null
    }
  }
}))

/* Компоненты, чей корень — не свой элемент, а другой компонент. Их тема не
   описывает корневой узел целиком: она отдаёт свою строку классов в `class`
   делегата, а рисует узел уже делегат — своей темой, со своими вариантами.

   Ждать от такого узла одну лишь тему обёртки неверно в обе стороны. У
   `DashboardSidebarToggle` это давало пять расхождений, записанных на кит,
   хотя кит был прав: он рисует полный класс кнопки, а мы ждали голое
   `lg:flex`. У `DashboardSidebarCollapse` и `ChatPromptSubmit` — ровно
   наоборот: кит рисует голую тему обёртки (`hidden lg:flex` и пустую строку),
   мы ровно её и ждали, и настоящий дефект структуры девять раундов проходил
   как «совпало».

   `theme` — короткое имя темы делегата в dist/docs/themes.json; `omit` —
   список пропов, которые до делегата не доходят (дословно reactiveOmit из
   библиотеки); `defaults` — дефолты defineProps обёртки, которых нет в
   doc.defaults страницы (туда попадают только варианты темы); `props` — то,
   что обёртка вычисляет и передаёт поверх пересланного.

   Иконки строки не задают. Обёртки подставляют их из appConfig.ui.icons
   (menu/close, panelOpen/panelClose, search, arrowUp/stop/reload), но на
   сравниваемый класс имя иконки не влияет: вариант leading в теме button
   пуст, а единственные compound-правила с ним требуют loading: true, чего у
   делегирующих обёрток не бывает. Слоты leadingIcon и trailingIcon кит с
   раунда 13 зовёт настоящими именами, так что появись такой случай — оракул
   должен будет считать leading/trailing и для делегата. */
export const DELEGATES = new Map(Object.entries({
  DashboardSidebarToggle: {
    to: 'Button', theme: 'button',                    // DashboardSidebarToggle.vue:14,54
    omit: ['icon', 'side', 'class'],                  // :45  reactiveOmit(props, "icon", "side", "class")
    defaults: { color: 'neutral', variant: 'ghost' }  // :17-18
  },
  DashboardSidebarCollapse: {
    to: 'Button', theme: 'button',                    // DashboardSidebarCollapse.vue:14,53
    omit: ['icon', 'side', 'class'],                  // :44
    defaults: { color: 'neutral', variant: 'ghost' }  // :16-17
  },
  DashboardSearchButton: {
    to: 'Button', theme: 'button',                    // DashboardSearchButton.vue:16,67
    omit: ['icon', 'label', 'variant', 'collapsed', 'tooltip', 'kbds', 'class', 'ui'], // :54
    defaults: { color: 'neutral', collapsed: false }, // :23,25
    /* Метка нужна не текстом, а фактом: она решает square у кнопки
       (Button.vue:120), а больше ни на один класс не влияет. Значение — из
       локали библиотеки (locale/en.js:67-68), и тест сверяет строку с ней. */
    props: (p) => ({
      label: p.label ?? SEARCH_LABEL,                            // :69
      variant: p.variant || (p.collapsed ? 'ghost' : 'outline'), // :70
      ...(p.collapsed ? { square: true } : {})                   // :73-76
    })
  },
  ChatPromptSubmit: {
    to: 'Button', theme: 'button',                    // ChatPromptSubmit.vue:14,96
    omit: ['icon', 'color', 'variant', 'status', 'disabled', 'streamingIcon', 'streamingColor',
      'streamingVariant', 'submittedIcon', 'submittedColor', 'submittedVariant', 'errorIcon',
      'errorColor', 'errorVariant', 'class', 'ui'],   // :58
    defaults: {                                       // :17,22-29
      status: 'ready',
      streamingColor: 'neutral', streamingVariant: 'subtle',
      submittedColor: 'neutral', submittedVariant: 'subtle',
      errorColor: 'error', errorVariant: 'soft'
    },
    /* Цвет и вариант кнопки выбирает статус (:60-91). Неизвестный статус даёт
       undefined, и `v-bind` от него не передаёт ничего — пустой объект. */
    props: (p) => ({
      ready: { color: p.color, variant: p.variant },                        // :61-66
      submitted: { color: p.submittedColor, variant: p.submittedVariant },  // :67-74
      streaming: { color: p.streamingColor, variant: p.streamingVariant },  // :75-82
      error: { color: p.errorColor, variant: p.errorVariant }               // :83-90
    }[p.status] ?? {})
  }
}))

/* Дочерний компонент ВНУТРИ разметки другого: `<UContainer :class="ui.container(…)">`
   в Header.vue:105. Такой узел рисует сам дочерний компонент — своей темой, — а
   класс обёртки приходит к нему пропом `class`. Ждать от него одну лишь строку
   слота обёртки неверно: у шести компонентов с UContainer это молча съедало всю
   базу контейнера (`max-w-(--ui-container) mx-auto px-4`), и девять раундов
   узел считался совпавшим.

   Таблица выведена из шаблонов библиотеки, а не из кита: у кита есть своя карта
   lib/child-themes.js, и списать её значило бы проверять кит им же самим. Разница
   не умозрительная — кит передаёт в тему дочернего блок `{size, color}` обёртки
   целиком, а библиотека передаёт то, что написано в месте вызова: Header не даёт
   UContainer ничего, NavigationMenu даёт UBadge явный размер из слота темы.

   `into` — слот дочернего компонента, в который его собственный шаблон кладёт
   props.class; у плоской темы это единственный base. Значение выведено из
   шаблонов: Badge.vue кладёт в `base`, Input/Textarea/Checkbox/Progress/Marquee —
   в `root`, а Modal.vue:74 — в `content`, не в первый слот темы. */
export const CHILD_INTO = {
  container: 'base',                 // Container.vue — плоская тема, один Primitive
  badge: 'base',                     // Badge.vue
  input: 'root',                     // Input.vue
  textarea: 'root',                  // Textarea.vue
  checkbox: 'root',                  // Checkbox.vue
  progress: 'root',                  // Progress.vue
  marquee: 'root',                   // Marquee.vue
  modal: 'content',                  // Modal.vue:74 — class уходит в content
  form: 'base',                      // Form.vue — плоская тема
  'chat-shimmer': 'base',            // ChatShimmer.vue — плоская тема
  'dashboard-resize-handle': 'base'  // DashboardResizeHandle.vue — плоская тема
}

/* Слоты, которые несёт СХЛОПНУТЫЙ узел дочернего компонента, — не то же, что
   CHILD_INTO. CHILD_INTO отвечает, куда приземляется входящий `class` (и это
   по-прежнему root); здесь — чем узел покрашен, когда библиотека рисует два
   элемента, а в дереве кита остался один.

   Признак взят из шаблонов библиотеки: `base` должен быть НЕПОСРЕДСТВЕННЫМ
   ребёнком root, иначе узел стоит не за пару «обёртка + красящий элемент».

     Textarea.vue:158,170  Primitive[data-slot=root] > textarea[data-slot=base]   — прямой
     Input.vue:152,163     Primitive[data-slot=root] > input[data-slot=base]      — прямой
     Progress.vue:114,121  Primitive[data-slot=root] > ProgressRoot[data-slot=base] — прямой
     Checkbox.vue:74,75,81 root > div[data-slot=container] > button[data-slot=base] — НЕ прямой

   Поэтому checkbox сюда не входит: у него root держит ещё wrapper/label/
   description (:94-101), и слияние дало бы узел, который одновременно строка
   раскладки и коробка чекбокса.

   Измерение, из-за которого карта вообще понадобилась: у chat-prompt кит рисует
   один <textarea>, и с одним лишь root он выходил 48px против 32px у библиотеки
   (journal/reports/2026-09-17-parity-run.md:542). Ожидание «только root» девять
   раундов держало этот дефект за совпадение. */
export const CHILD_PAINT = {
  textarea: ['root', 'base'],
  input: ['root', 'base'],
  progress: ['root', 'base']
}

/* То же для собственных слотов страницы: библиотека красит один свой узел строками двух
   слотов темы, и отдельного узла у второго слота нет вовсе. Пара — [внешний, внутренний]
   в смысле paintedTokens: строка первого уходит в `class` второго.

     InputTags.vue:120-121  TagsInputRoot[data-slot=root]
                            :class="ui.root({ class: [ui.base({ class: props.ui?.base }), …] })"

   Без этой записи оракул ждал на корне только `root`, и все 74 примера страницы InputTags
   давали «лишние» классы base — ровно те, что библиотека туда и кладёт (сверка 24.09). */
export const OWN_PAINT = {
  InputTags: { root: ['base', 'root'] },

  /* Та же склейка по условию. При `multiple && !isAutocomplete` (InputMenu.vue:91, :97)
     ComboboxRoot стоит с as-child (InputMenu.vue:397) и отдаёт свой `ui.root` единственному
     ребёнку — Anchor, у которого `data-slot="base"` и `ui.base` (InputMenu.vue:402). Склейку
     делает слияние атрибутов Vue, а не twMerge: классы обоих слотов остаются все; тест
     проверяет, что paintedTokens тут ничего не теряет. Без multiple корень — свой элемент,
     и записи нет. */
  InputMenu: { base: (p) => (p.multiple && p.mode !== 'autocomplete' ? ['root', 'base'] : null) }
}

/* Не знание о библиотеке, а принятое человеком отклонение кита: у кита нет элемента
   библиотеки, и его классы лежат на соседнем узле. Ожидание такого узла — склейка слотов
   (paintedTokens, как у OWN_PAINT), а `ledger` называет класс реестра со статусом accepted и
   полем decided: приёмка проверяет это при старте и без такого класса не запускается. Запись
   ослабляет ровно один узел: любое другое отклонение страницы остаётся расхождением, а сам
   факт принятия печатается в отчёте, а не растворяется в нуле.

     Editor.vue: div[data-slot=root] > EditorContent[data-slot=content] > ProseMirror[base]
     кит: один div[data-slot=root] с классами root и base; узла content нет, Tiptap нет */
export const ACCEPTED_PAINT = new Map(Object.entries({
  Editor: { root: { paint: ['root', 'base'], ledger: 'kit-editor-no-tiptap' } }
}))

/* Запись без принятого класса реестра — это отклонение, которое никто не принимал. Вход —
   результат parseLedger (bench/scripts/ledger-core.mjs), чтобы проверку звали и приёмка, и тест. */
export function acceptedPaintProblems(ledger) {
  const problems = []
  for (const [page, slots] of ACCEPTED_PAINT) for (const [slot, { ledger: id }] of Object.entries(slots)) {
    const c = ledger.classes.get(id)
    if (!c) problems.push(`ACCEPTED_PAINT ${page}.${slot}: класса ${id} нет в реестре`)
    else if (c.status !== 'accepted' || !c.decided) problems.push(`ACCEPTED_PAINT ${page}.${slot}: класс ${id} не принят человеком (status ${c.status}, decided ${c.decided ?? 'нет'})`)
  }
  return problems
}

/* То, что примитив reka-ui делает инлайновым стилем или атрибутом, а кит — классами.
   Итог в DOM один и тот же, но приёмка сравнивает классы, и у библиотеки этих классов
   нет. Каждая строка — цитата из reka и нулевая пара стенда; добавленные классы кит
   ОБЯЗАН нести — неверное направление или лишнее состояние остаются расхождением.

   Возвращает список классов к ожиданию слота (пустой — ничего не добавлять). */
const chatToolOpen = (p) => (p.open !== undefined ? !!p.open : (p.defaultOpen ?? !!(p.actions?.length && p.children)))
const chatReasoningOpen = (p) => (p.open !== undefined ? !!p.open : (p.defaultOpen ?? !!p.streaming))
export const PRIMITIVE_CLASSES = new Map(Object.entries({
  /* SplitterGroup: style { display: flex, flexDirection: row|column, height: 100%,
     overflow: hidden, width: 100% } (reka-ui 2.10.4, dist/Splitter/SplitterGroup.js:506-512);
     direction — orientation, по умолчанию horizontal (Splitter.vue:16, :55). Пара splitter — 0. */
  Splitter: { root: (p) => ['flex', (p.orientation ?? 'horizontal') === 'vertical' ? 'flex-col' : 'flex-row', 'overflow-hidden', 'size-full'] },

  /* Закрытый CollapsibleContent (безусловный: ChatTool.vue:106, ChatReasoning.vue:154) при
     unmountOnHide = false (дефолт ChatTool.vue:31, ChatReasoning.vue:29) остаётся
     в DOM с `hidden="until-found"` (dist/Collapsible/CollapsibleContent.js:82), кит ставит
     класс `hidden`. У content обоих компонентов нет своих отступов и рамки, поэтому
     `content-visibility: hidden` и `display: none` дают одну раскладку — пары chat-tool
     (четыре закрытых ряда из пяти) и chat-reasoning (первый ряд закрыт) в ноль.
     Открытость — дословно из шаблонов: ChatTool.vue:42-54 (actions с содержимым
     раскрывают), ChatReasoning.vue:39-40 (открыт, пока streaming). */
  ChatTool: { content: (p) => (chatToolOpen(p) ? [] : ['hidden']) },
  ChatReasoning: { content: (p) => (chatReasoningOpen(p) ? [] : ['hidden']) }
}))

/* Компонент, который библиотека рисует только внутри другого. UToast живёт в Toaster:
   тот передаёт ему `data-slot="base"` и `:class="ui.base(…)"` (Toaster.vue:97-98). Проп
   `class` Toast объявляет сам (Toast.vue:31), так что строка Toaster уходит в
   `ui.root({ class: [ui.root, props.class] })` через twMerge, а `data-slot` из $attrs
   перекрывает свой `root`. В DOM у тоста поэтому нет узла root — есть узел base с классами
   root тоста поверх base тостера. `props` — дефолты defineProps тостера (Toaster.vue:21-29):
   position не задан, и тема берёт defaultVariants bottom-right. */
/* `swap` — отклонение, принятое человеком для этой среды: класс библиотеки → класс кита.
   Тостер кита выкладывает стопку в потоке (relative, flex с gap), а не absolute с transform;
   это класс реестра kit-toaster-stack-in-flow, accepted, decided 2026-09-23 («тосты в ките
   достаточно репрезентативны для использования в макетах»). Без swap тот же механизм давал
   11 расхождений `relative` против `absolute` у всех примеров doc-страницы Toast. */
export const HABITAT = new Map(Object.entries({
  Toast: { theme: 'toaster', slot: 'base', into: 'root', props: {}, swap: { absolute: 'relative' } }
}))

export const CHILDREN = new Map(Object.entries({
  Banner: { container: { theme: 'container' } },            // Banner.vue:109
  Footer: { container: { theme: 'container' } },            // Footer.vue:29
  Header: { container: { theme: 'container' } },            // Header.vue:105
  PageCTA: { container: { theme: 'container' } },           // PageCTA.vue:41
  PageHero: { container: { theme: 'container' } },          // PageHero.vue:40
  PageSection: { container: { theme: 'container' } },       // PageSection.vue:46

  BlogPost: { badge: { theme: 'badge', props: () => ({ color: 'neutral', variant: 'subtle' }) } },          // BlogPost.vue:107
  /* Размер бейджа обёртка отдаёт не пропом, а слотом темы: значение слота
     linkTrailingBadgeSize — это имя ступени, а не классы. */
  NavigationMenu: {
    linkTrailingBadge: {
      theme: 'badge',                                       // NavigationMenu.vue:160-165
      props: (p, raw) => ({ color: 'neutral', variant: 'outline', size: p.ui?.linkTrailingBadgeSize ?? raw.linkTrailingBadgeSize })
    }
  },

  ChatPrompt: { body: { theme: 'textarea', props: () => ({ variant: 'none' }) } },        // ChatPrompt.vue:99-104
  /* Шиммер стоит под v-if: без streaming на этом месте обычный <span>, и своей
     темы у узла нет вовсе (ChatReasoning.vue:142-143). */
  ChatReasoning: { label: { theme: 'chat-shimmer', when: (p) => !!p.streaming } },         // ChatReasoning.vue:142
  CommandPalette: { input: { theme: 'input', props: (p) => ({ variant: 'none', size: p.size }) } }, // CommandPalette.vue:323-326
  Listbox: { input: { theme: 'input', props: (p) => ({ size: p.size }) } },               // Listbox.vue:209
  CheckboxGroup: { item: { theme: 'checkbox', props: (p) => ({ color: p.color, size: p.size }) } }, // CheckboxGroup.vue:118-121
  PageLogos: { logos: { theme: 'marquee' } },                                             // PageLogos.vue:58
  Toast: { progress: { theme: 'progress', props: (p) => ({ color: p.color, size: 'sm' }) } }, // Toast.vue:131
  DashboardPanel: { handle: { theme: 'dashboard-resize-handle' } },                       // DashboardPanel.vue:56
  DashboardSearch: { modal: { theme: 'modal' } },                                         // DashboardSearch.vue:137
  AuthForm: { form: { theme: 'form' } }                                                   // AuthForm.vue:135
}))

/* Имя doc-страницы дочернего компонента по короткому имени его темы:
   `dashboard-resize-handle` → `DashboardResizeHandle`. Нужно за дефолтами
   defineProps — их в теме нет, а на класс они влияют: Progress.vue:21 задаёт
   orientation="horizontal", и без него у прогресса внутри Toast пропадают
   `w-full flex flex-col`. Вызывающий обязан проверить, что такая страница есть. */
export const childPageName = (theme) => theme.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('')

/* Пропы, с которыми обёртка зовёт дочерний компонент, плюс класс слота обёртки
   в `class` — ровно так, как это делает шаблон библиотеки. Слот, в который этот
   класс ляжет, возвращается вторым значением. */
export function childCall(page, slot, props, wrapperRaw) {
  const row = CHILDREN.get(page)?.[slot]
  if (!row) return null
  /* Узел под v-if: в другой ветке на его месте обычный элемент, и складывать
     тему дочернего компонента не с чем. */
  if (row.when && !row.when(props)) return null
  const into = CHILD_INTO[row.theme]
  if (!into) throw new Error(`CHILDREN: для темы «${row.theme}» не задан слот, принимающий class`)
  return {
    theme: row.theme,
    into,
    paint: CHILD_PAINT[row.theme] ?? null,
    props: { ...(row.props ? row.props(props, wrapperRaw) : {}), class: String(wrapperRaw[slot] ?? '') }
  }
}

// locale/en.js:67-68 — dashboardSearchButton.label
export const SEARCH_LABEL = 'Search\u2026'

/* Пропы, с которыми обёртка зовёт делегата. `wrapperRaw` — строки слотов темы
   обёртки, как их отдал resolveRaw: корневой уходит делегату в `class`,
   остальные — в `ui`. Так делает transformUI (utils/index.js:134) с одной
   разницей: она кладёт в `ui` и корневой слот тоже, а мы нет — строка там
   вышла бы та же самая, что уже пришла в `class`, и tailwind-merge её просто
   повторит. */
export function delegateProps(page, props, wrapperRaw) {
  const row = DELEGATES.get(page)
  if (!row) return null
  const all = { ...row.defaults, ...props }
  const forwarded = { ...all }
  for (const k of row.omit) delete forwarded[k]
  const out = { ...forwarded, ...(row.props ? row.props(all) : {}) }
  const slots = Object.keys(wrapperRaw)
  out.class = String(wrapperRaw[slots[0]] ?? '')
  const ui = {}
  for (const s of slots.slice(1)) ui[s] = String(wrapperRaw[s] ?? '')
  /* Пустой `ui` не ставится: у плоской темы обёртки своих слотов нет, и проп
     `ui` в этом случае библиотека пересылает делегату как есть (он не в omit
     ни у toggle, ни у collapse). */
  if (slots.length > 1) out.ui = { ...out.ui, ...ui }
  return out
}

const isMark = (v) => v !== null && typeof v === 'object' && v.$slotMark !== undefined

/* Дословно useComponentIcons из @nuxt/ui 4.11.1: порядок и скобки сохранены,
   чтобы расхождение с библиотекой было видно построчно. */
function componentIcons(p) {
  const isLeading = (p.icon && p.leading) || (p.icon && !p.trailing) || (p.loading && !p.trailing) || !!p.leadingIcon
  const isTrailing = (p.icon && p.trailing) || (p.loading && p.trailing) || (!!p.trailingIcon && p.trailing !== false)
  return { isLeading: !!isLeading, isTrailing: !!isTrailing }
}

/* Компоненты, которым leading/trailing считает формула ниже. Это НЕ полный
   список зовущих useComponentIcons: его зовут десять .vue, но формула у них
   пофайловая, и двух добавить сюда нельзя, не заведя им своей ветки —
   Badge.vue:36-42 не передаёт leading/trailing в tv() вовсе, а Button.vue:120-121
   передаёт голые isLeading/isTrailing, без `|| !!props.avatar || !!slots.leading`,
   и кормит useComponentIcons `loading: isLoading` с учётом состояния формы
   (Button.vue:95). Сегодня разницы не видно только потому, что у badge вариантов
   leading/trailing нет, а у button обе ветки пусты. Состав множества стережёт
   тест в pipeline/tests/props.test.mjs: он сверяет его с настоящими вызывающими и держит
   Badge и Button известными исключениями.

   Шеврон по умолчанию подставляют те три, что показывают выпадающий список
   (Select.vue:79, SelectMenu.vue:104, InputMenu.vue:115). */
export const ICON_COMPONENTS = new Set(['Input', 'Textarea', 'InputDate', 'InputTime', 'InputMenu', 'InputTags', 'Select', 'SelectMenu'])
export const CHEVRON_COMPONENTS = new Set(['Select', 'SelectMenu', 'InputMenu'])

export function oracleProps({ page, theme, props }) {
  const out = { ...props }
  for (const k of Object.keys(theme?.variants || {})) {
    const form = READS.get(`${page}.${k}`)
    switch (form) {
      /* Компонент читает `!!props.x`: непустая строка для него такой же `true`,
         как заполненный слот, а отсутствие пропа — честный `false`, а не
         «ключа нет». Этот `false` делает `!!` внутри выражения компонента, а не
         приведение Vue: прокси useComponentProps отдаёт непереданный булев проп
         без default как undefined, минуя правило «isAbsent && !hasDefault →
         false», — так что до tv() значение доходит ложным именно отсюда. */
      case 'slot': case 'truthy': out[k] = !!out[k]; break
      /* Вариант считается от слота, а не от пропа (`!slots.x`): значение в
         пропе слот не заполняет, и вариант остаётся истинным. */
      case 'inverted': out[k] = !isMark(out[k]); break
      /* Единственные две пары, чей ответ зависит не только от собственного
         значения (InputNumber.vue:75-76). Слагаемые берутся из props, а не из
         out, намеренно: порядок обхода theme.variants не должен менять ответ —
         если decrement попадётся раньше, к строке increment out.decrement уже
         переписан нулём, и вертикальный случай разъедется. */
      case 'inputNumberIncrement':
        out[k] = props.orientation === 'vertical' ? !!props.increment || !!props.decrement : !!props.increment
        break
      case 'inputNumberDecrement':
        out[k] = props.orientation === 'vertical' ? false : !!props.decrement
        break
      /* Компонент читает значение сырым, без `!!`, и Vue-слота с этим именем у
         него нет: что пришло, то и уходит в tv(). Ветка пустая, но не лишняя —
         без неё форма упала бы в default ошибкой, а строка таблицы нужна, чтобы
         пару не считала непокрытой readsCoverage(). */
      case 'raw': break
      /* Ветка пустая, но не лишняя: значение считает componentIcons ниже, а без
         этой строки форма icons ушла бы в default и упала бы ошибкой. */
      case 'icons': break
      /* Пары в таблице нет — путь законный: значение остаётся как есть, а
         полноту таблицы стережёт readsCoverage(). Случай отделён от default
         затем, чтобы в default остался ровно один случай — незаконный. */
      case undefined: break
      /* Опечатка в имени формы иначе неотличима от отсутствия строки: обе уходят
         в default и молчат. Гейт её ловит на всей таблице, а здесь она падает в
         точке применения, на конкретной паре. */
      default: throw new Error(`неизвестная форма READS «${form}» у пары ${page}.${k}`)
    }
  }

  /* Считается после таблицы: формула читает исходные props, а перезаписывает
     out — как и ветки inputNumber* выше. */
  const computed = COMPUTED.get(page)
  if (computed) Object.assign(out, computed(props))

  if (!ICON_COMPONENTS.has(page)) return out
  /* Плашка слота в самих leading/trailing — это заполненный слот, то есть
     !!slots.leading в компоненте; в useComponentIcons такой проп не идёт. */
  const slotLeading = isMark(props.leading)
  const slotTrailing = isMark(props.trailing)
  const { isLeading, isTrailing } = componentIcons({
    icon: out.icon,
    loading: out.loading,
    leadingIcon: out.leadingIcon,
    trailingIcon: out.trailingIcon ?? (CHEVRON_COMPONENTS.has(page) ? 'i-lucide-chevron-down' : undefined),
    leading: slotLeading ? undefined : props.leading,
    trailing: slotTrailing ? undefined : props.trailing
  })
  return { ...out, leading: isLeading || !!out.avatar || slotLeading, trailing: isTrailing || slotTrailing }
}

/* Полнота таблицы — дело не только тестовое. Тест на покрытие обходит
   dist/docs/pages, а без него пропускается через t.skip, и «таблица не
   проверена» выглядит на чистом клоне как «всё хорошо». Поэтому ту же проверку
   зовёт сама приёмка, до первого запуска Chrome (pipeline/audit-kit.mjs):
   непокрытая пара обязана назваться сразу, а не через двадцать минут прогона.
   Функция одна на оба вызова намеренно — в задаче 17 разошлись ровно две копии
   одной проверки.

   Разделены они по входу, а не по смыслу: readsSelfCheck() сверяет таблицу саму
   с собой и работает всюду, readsCoverage() дополнительно сверяет её с
   собранными страницами и без них работать не может. */
const FORMS = new Set(['slot', 'truthy', 'inverted', 'raw', 'icons', 'inputNumberIncrement', 'inputNumberDecrement'])

export function readsSelfCheck() {
  /* Опечатка в имени формы уходит в default ветки switch, то есть ведёт себя
     ровно как отсутствие строки, — и молчит. */
  const badForms = [...READS].filter(([, form]) => !FORMS.has(form)).map(([k, form]) => `${k} → ${form}`).sort()
  /* Строки icons и множество ICON_COMPONENTS — две записи одного факта, и
     разъехаться они могут в обе стороны: страница с формой icons вне множества
     остаётся с необработанным объектом, страница в множестве без строк icons
     означает формулу без таблицы. */
  const iconPages = [...new Set([...READS].filter(([, f]) => f === 'icons').map(([k]) => k.split('.')[0]))]
  const iconsNotInSet = iconPages.filter((p) => !ICON_COMPONENTS.has(p)).sort()
  const setNotInIcons = [...ICON_COMPONENTS].filter((p) => !iconPages.includes(p)).sort()
  const problems = [
    ...badForms.map((b) => `неизвестная форма в таблице READS: ${b}`),
    ...iconsNotInSet.map((p) => `форма icons у страницы «${p}», которой нет в ICON_COMPONENTS`),
    ...setNotInIcons.map((p) => `страница «${p}» есть в ICON_COMPONENTS, но строк icons у неё нет`)
  ]
  return { badForms, iconsNotInSet, setNotInIcons, problems }
}

const docOf = (html) => JSON.parse(/id="ds-doc">([\s\S]*?)<\/script>/.exec(html)[1])
/* Небулев вариант объект не включает и включить не может: у tv нет ключа, в
   который бы он попал. Такая пара в таблице не нужна. */
const isBoolVariant = (vals) => Object.keys(vals || {}).every((k) => k === 'true' || k === 'false')

export async function readsCoverage({ pagesDir = 'dist/docs/pages', themesFile = 'dist/docs/themes.json' } = {}) {
  const themes = JSON.parse(await readFile(themesFile, 'utf8'))
  const byShort = new Map(Object.entries(themes).map(([k, v]) => [k.split('/').pop(), v]))
  const missing = []
  const hit = new Set()
  const pagesSeen = new Set()
  let pairs = 0
  for (const f of (await readdir(pagesDir)).filter((x) => x.endsWith('.doc.html')).sort()) {
    const doc = docOf(await readFile(path.join(pagesDir, f), 'utf8'))
    const theme = byShort.get(doc.theme)
    if (!theme) continue
    pagesSeen.add(doc.name)
    const seen = new Set()
    for (const s of doc.sections) {
      s.examples.forEach((e, i) => {
        const props = { ...doc.defaults, ...s.base, ...e.patch }
        for (const k of Object.keys(theme.variants || {})) {
          const v = props[k]
          if (v === null || typeof v !== 'object') continue
          const pair = `${doc.name}.${k}`
          if (seen.has(pair)) continue
          seen.add(pair)
          pairs++
          if (READS.has(pair)) { hit.add(pair); continue }
          if (isBoolVariant(theme.variants[k])) missing.push(`${pair} (${s.id}.${i})`)
        }
      })
    }
  }
  const stale = [...READS.keys()].filter((k) => !hit.has(k)).sort()
  /* Формула, чья страница исчезла (переименовали компонент, убрали из кита),
     молчит ровно так же, как верная: она просто никогда не зовётся. */
  const staleComputed = [...COMPUTED.keys()].filter((p) => !pagesSeen.has(p)).sort()
  /* Та же болезнь у строки DELEGATES, и ещё одна своя: имя темы делегата.
     Опечатка в нём или переименование темы в ките дают «темы нет», а страница
     с делегатом без темы сравнивать корень не сможет вовсе — молча и с нулём
     расхождений, ровно как до появления таблицы. */
  const staleDelegates = [...DELEGATES.keys()].filter((p) => !pagesSeen.has(p)).sort()
  const badDelegateThemes = [...DELEGATES].filter(([, row]) => !byShort.has(row.theme))
    .map(([p, row]) => `${p} → ${row.theme}`).sort()
  /* И та же — у CHILDREN: страница, которой нет, и тема дочернего, которой нет.
     Второе особенно тихо: без темы ожидание для слота не построится, узел
     выпадет в skippedSlots, и страница отчитается нулём. */
  const staleChildren = [...CHILDREN.keys()].filter((p) => !pagesSeen.has(p)).sort()
  const badChildThemes = [...CHILDREN].flatMap(([p, slots]) =>
    Object.entries(slots).filter(([, row]) => !byShort.has(row.theme)).map(([slot, row]) => `${p}.${slot} → ${row.theme}`)).sort()
  const self = readsSelfCheck()
  const problems = [
    /* Пустой обход — не «всё сошлось»: значит проверять было нечего, и молчать
       об этом нельзя ни тесту, ни приёмке. */
    ...(pairs ? [] : [`в ${pagesDir} не нашлось ни одной пары «страница + вариант» со значением-объектом — проверять нечего`]),
    ...missing.map((m) => `пары нет в таблице READS: ${m} — реши по строке tv() компонента, как он читает ключ, и добавь форму`),
    ...stale.map((k) => `строка READS «${k}» не встретилась ни на одной странице — устарела`),
    ...staleComputed.map((p) => `формула COMPUTED для «${p}» не встретилась ни на одной странице — устарела`),
    ...staleDelegates.map((p) => `строка DELEGATES «${p}» не встретилась ни на одной странице — устарела`),
    ...badDelegateThemes.map((x) => `тема делегата не найдена в themes.json: ${x}`),
    ...staleChildren.map((p) => `строка CHILDREN «${p}» не встретилась ни на одной странице — устарела`),
    ...badChildThemes.map((x) => `тема дочернего компонента не найдена в themes.json: ${x}`),
    ...self.problems
  ]
  return { pairs, missing, stale, staleComputed, staleDelegates, badDelegateThemes, staleChildren, badChildThemes, ...self, problems }
}
