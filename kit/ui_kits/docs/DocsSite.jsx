/* Nuxt UI Pro "Docs" template recreation: header, aside navigation, prose body,
   table of contents (page-anchors.ts), prev/next links. */
const { Button, Badge, Kbd, Icon, Separator, Alert, Tabs } = window.NuxtUIDesignSystem_69ebe5;

const NAV = [
  { label: 'Getting Started', items: ['Installation', 'Theme', 'Icons', 'Fonts'] },
  { label: 'Components', items: ['Button', 'Badge', 'Card', 'Input', 'Table'], active: 'Button' },
  { label: 'Composables', items: ['useToast', 'useOverlay'] }
];

const TOC = ['Usage', 'Variants', 'Sizes', 'Colors', 'Icons', 'API'];

function DocsAside({ current, setCurrent }) {
  return (
    <aside className="hidden lg:block w-64 shrink-0 py-8 pe-8 sticky top-(--ui-header-height) h-[calc(100vh-var(--ui-header-height))] overflow-y-auto">
      <nav className="flex flex-col gap-6">
        {NAV.map((group) => (
          <div key={group.label} className="flex flex-col gap-0.5">
            <span className="w-full flex items-center gap-1.5 font-semibold text-xs/5 text-highlighted px-2.5 py-1.5">{group.label}</span>
            {group.items.map((item) => (
              <button key={item} type="button" onClick={() => setCurrent(item)}
                className={'group relative w-full flex items-center gap-1.5 font-medium text-sm px-2.5 py-1.5 rounded-md text-start transition-colors ' +
                  (current === item ? 'text-primary bg-primary/10' : 'text-muted hover:text-default hover:bg-elevated/50')}>
                <span className="truncate">{item}</span>
              </button>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}

function Code({ children }) {
  return (
    <pre className="rounded-md bg-muted ring ring-default p-4 overflow-x-auto text-sm/6 text-default"><code>{children}</code></pre>
  );
}

function DocsBody({ current }) {
  return (
    <div className="min-w-0 flex-1 py-8">
      <div className="flex items-center gap-1.5 text-sm text-muted">
        <span>Components</span><Icon name="i-lucide-chevron-right" class="size-4 text-dimmed" /><span className="text-default">{current}</span>
      </div>
      <h1 className="mt-3 text-4xl font-bold text-highlighted tracking-tight">{current}</h1>
      <p className="mt-3 text-lg text-muted text-pretty">A themeable {current.toLowerCase()} with variants, sizes and the seven colour roles.</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        <Badge variant="subtle" color="neutral" label="GitHub" leadingIcon="i-lucide-github" />
        <Badge variant="subtle" color="neutral" label={'themes/' + current.toLowerCase() + '.ts'} leadingIcon="i-lucide-file-code-2" />
      </div>
      <Separator class="my-8" />
      <h2 id="usage" className="text-2xl font-bold text-highlighted scroll-mt-24">Usage</h2>
      <p className="mt-3 text-base text-muted">Import the component and pass a label. Every slot accepts a class override through <code className="text-sm font-mono text-highlighted bg-elevated rounded px-1 py-0.5">ui</code>.</p>
      <div className="mt-4 rounded-md ring ring-default overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-default bg-elevated/50">
          <Icon name="i-lucide-code" class="size-4 text-dimmed" /><span className="text-xs font-medium text-muted">Preview</span>
          <Button size="xs" color="neutral" variant="ghost" square icon="i-lucide-copy" class="ms-auto" />
        </div>
        <div className="p-6 flex items-center justify-center gap-2 bg-default">
          <Button label="Button" /><Button color="neutral" variant="outline" label="Button" /><Button variant="soft" label="Button" />
        </div>
      </div>
      <div className="mt-3"><Code>{'<UButton label="Button" />\n<UButton color="neutral" variant="outline" label="Button" />'}</Code></div>
      <h2 id="variants" className="mt-10 text-2xl font-bold text-highlighted scroll-mt-24">Variants</h2>
      <p className="mt-3 text-base text-muted">Six variants, defined in <code className="text-sm font-mono text-highlighted bg-elevated rounded px-1 py-0.5">variants.variant</code>.</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {['solid', 'outline', 'soft', 'subtle', 'ghost', 'link'].map((v) => <Button key={v} variant={v} label={v} />)}
      </div>
      <h2 id="sizes" className="mt-10 text-2xl font-bold text-highlighted scroll-mt-24">Sizes</h2>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {['xs', 'sm', 'md', 'lg', 'xl'].map((s) => <Button key={s} size={s} label={s} />)}
      </div>
      <Alert class="mt-8" variant="subtle" color="info" icon="i-lucide-info" title="Sizes are per component"
        description="Button has xs…xl. Badge and Avatar have their own scales — never copy one scale onto another." />
      <div className="mt-12 grid sm:grid-cols-2 gap-4">
        {[['Previous', 'Badge', 'i-lucide-arrow-left'], ['Next', 'Card', 'i-lucide-arrow-right']].map(([k, l, i], idx) => (
          <a key={k} href="#" className={'flex items-center gap-3 rounded-lg p-4 ring ring-default hover:bg-elevated/50 transition-colors ' + (idx ? 'sm:text-end sm:flex-row-reverse' : '')}>
            <Icon name={i} class="size-5 text-dimmed shrink-0" />
            <span className="min-w-0"><span className="block text-xs text-dimmed">{k}</span><span className="block text-sm font-medium text-highlighted">{l}</span></span>
          </a>
        ))}
      </div>
    </div>
  );
}

function DocsToc() {
  return (
    <div className="hidden xl:block w-56 shrink-0 py-8 ps-8 sticky top-(--ui-header-height) h-[calc(100vh-var(--ui-header-height))]">
      <span className="text-xs font-semibold text-highlighted">On this page</span>
      <nav className="mt-3 flex flex-col gap-1">
        {TOC.map((t, i) => (
          <a key={t} href={'#' + t.toLowerCase()} className={'text-sm py-0.5 transition-colors ' + (i === 0 ? 'text-primary' : 'text-muted hover:text-default')}>{t}</a>
        ))}
      </nav>
      <Separator class="my-4" />
      <a href="#" className="flex items-center gap-1.5 text-sm text-muted hover:text-default"><Icon name="i-lucide-pencil" class="size-4" />Edit this page</a>
    </div>
  );
}

function DocsSite() {
  const [current, setCurrent] = React.useState('Button');
  const [dark, setDark] = React.useState(false);
  return (
    <div className={(dark ? 'dark ' : '') + 'bg-default text-default min-h-screen'}>
      <header className="bg-default/75 backdrop-blur-sm border-b border-default h-(--ui-header-height) sticky top-0 z-50">
        <div className="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-full">
          <span className="shrink-0 font-bold text-xl text-highlighted flex items-end gap-1.5">
            <Icon name="i-lucide-triangle" class="size-5 text-primary" />Nuxt UI
            <Badge size="sm" variant="subtle" color="neutral" label="v4.11.1" class="mb-1" />
          </span>
          <nav className="hidden lg:flex items-center gap-1">
            {['Docs', 'Components', 'Pro', 'Releases'].map((l, i) => (
              <a key={l} href="#" className={'px-2.5 py-1.5 text-sm font-medium rounded-md transition-colors ' + (i === 1 ? 'text-highlighted bg-elevated' : 'text-muted hover:text-default hover:bg-elevated/50')}>{l}</a>
            ))}
          </nav>
          <div className="flex items-center gap-1.5">
            <Button color="neutral" variant="outline" size="sm" icon="i-lucide-search" label="Search…" class="text-dimmed font-normal w-48 justify-start"
              trailing={<span className="hidden lg:flex items-center gap-0.5 ms-auto"><Kbd>⌘</Kbd><Kbd>K</Kbd></span>} />
            <Button color="neutral" variant="ghost" square icon={dark ? 'i-lucide-sun' : 'i-lucide-moon'} onClick={() => setDark(!dark)} />
            <Button color="neutral" variant="ghost" square icon="i-lucide-github" />
          </div>
        </div>
      </header>
      <div className="w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex gap-8">
        <DocsAside current={current} setCurrent={setCurrent} />
        <DocsBody current={current} />
        <DocsToc />
      </div>
    </div>
  );
}

Object.assign(window, { DocsSite });
