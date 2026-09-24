/* Nuxt UI Pro "Chat" template recreation: conversation rail, chat-messages.ts
   thread with left/right sides, chat-prompt.ts composer with submit button. */
const { Button, Badge, Avatar, Icon, Separator, Kbd } = window.NuxtUIDesignSystem_69ebe5;

const THREADS = [
  { title: 'Theming a button', when: '2m', active: true },
  { title: 'Dark mode strategy', when: '1h' },
  { title: 'Table row selection', when: 'Yesterday' },
  { title: 'Migrating from v3', when: 'Mon' }
];

const SEED = [
  { role: 'user', content: 'How do I make a destructive button?' },
  { role: 'assistant', content: 'Pass the error colour role. The classes come straight from themes/button.ts — solid + error resolves to bg-error, text-inverted and hover:bg-error/75.', code: '<UButton color="error" label="Delete project" />' },
  { role: 'user', content: 'And a quieter version of the same thing?' },
  { role: 'assistant', content: 'Use the soft or ghost variant with the same colour. The compound variants keep the text in the error role while dropping the fill.', code: '<UButton color="error" variant="soft" label="Delete" />' }
];

function Message({ m }) {
  const user = m.role === 'user';
  return (
    <div className={'relative flex gap-3 group/message ' + (user ? 'flex-row-reverse' : '')}>
      {!user && <span className="size-8 shrink-0 rounded-full bg-primary/10 flex items-center justify-center ring ring-default">
        <Icon name="i-lucide-sparkles" class="size-4 text-primary" />
      </span>}
      {user && <Avatar size="sm" fallback="AL" />}
      <div className={'min-w-0 flex flex-col gap-2 ' + (user ? 'items-end' : 'items-start')}>
        <div className={'rounded-lg px-4 py-3 text-sm/6 max-w-2xl ' + (user ? 'bg-elevated text-default' : 'text-default')}>
          {m.content}
          {m.code && <pre className="mt-3 rounded-md bg-muted ring ring-default p-3 overflow-x-auto text-xs/6"><code>{m.code}</code></pre>}
        </div>
        {!user && (
          <div className="flex items-center gap-0.5 opacity-0 group-hover/message:opacity-100 transition-opacity">
            {['i-lucide-copy', 'i-lucide-thumbs-up', 'i-lucide-thumbs-down', 'i-lucide-refresh-cw'].map((i) => (
              <Button key={i} size="xs" color="neutral" variant="ghost" square icon={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ChatApp() {
  const [dark, setDark] = React.useState(false);
  const [messages, setMessages] = React.useState(SEED);
  const [draft, setDraft] = React.useState('');
  const [pending, setPending] = React.useState(false);
  const send = () => {
    if (!draft.trim()) return;
    setMessages((m) => [...m, { role: 'user', content: draft }]);
    setDraft('');
    setPending(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', content: 'Every value in that answer would come from themes.json — the theme literal is embedded in each component of this design system.' }]);
      setPending(false);
    }, 900);
  };
  return (
    <div className={(dark ? 'dark ' : '') + 'bg-default text-default h-screen flex'}>
      <div className="hidden lg:flex flex-col w-72 shrink-0 border-e border-default">
        <div className="h-(--ui-header-height) shrink-0 flex items-center gap-1.5 px-4">
          <span className="font-bold text-highlighted">Chat</span>
          <Button size="sm" class="ms-auto" icon="i-lucide-plus" label="New" />
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2 flex flex-col gap-0.5">
          <span className="font-semibold text-xs/5 text-highlighted px-2.5 py-1.5">Recent</span>
          {THREADS.map((t) => (
            <button key={t.title} type="button"
              className={'w-full flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-md text-start transition-colors ' + (t.active ? 'text-highlighted bg-elevated' : 'text-muted hover:text-default hover:bg-elevated/50')}>
              <span className="truncate">{t.title}</span>
              <span className="ms-auto text-xs text-dimmed shrink-0">{t.when}</span>
            </button>
          ))}
        </div>
        <div className="shrink-0 flex items-center gap-1.5 px-4 py-2 border-t border-default">
          <Avatar size="sm" fallback="AL" />
          <span className="text-sm font-medium text-default truncate">Ada Lovelace</span>
          <Button class="ms-auto" color="neutral" variant="ghost" square size="xs" icon={dark ? 'i-lucide-sun' : 'i-lucide-moon'} onClick={() => setDark(!dark)} />
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="h-(--ui-header-height) shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5">
          <span className="font-semibold text-highlighted truncate">Theming a button</span>
          <div className="flex items-center gap-1.5">
            <Badge variant="subtle" color="neutral" label="gpt-4o" leadingIcon="i-lucide-cpu" />
            <Button color="neutral" variant="ghost" square icon="i-lucide-share-2" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col gap-8">
            {messages.map((m, i) => <Message key={i} m={m} />)}
            {pending && (
              <div className="flex gap-3 items-center text-sm text-muted">
                <span className="size-8 shrink-0 rounded-full bg-primary/10 flex items-center justify-center ring ring-default">
                  <Icon name="i-lucide-sparkles" class="size-4 text-primary" />
                </span>
                <span className="h-4 w-40 rounded bg-gradient-to-r from-elevated via-accented to-elevated bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite]" />
              </div>
            )}
          </div>
        </div>
        <div className="shrink-0 px-4 sm:px-6 pb-6">
          <div className="max-w-3xl mx-auto w-full rounded-lg bg-default ring ring-default focus-within:ring-2 focus-within:ring-primary transition-shadow">
            <textarea rows="2" value={draft} onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Ask anything…"
              className="w-full resize-none bg-transparent px-4 pt-3 text-sm text-default placeholder:text-dimmed focus:outline-none" />
            <div className="flex items-center gap-1.5 px-2 pb-2">
              <Button color="neutral" variant="ghost" square size="sm" icon="i-lucide-paperclip" />
              <Button color="neutral" variant="ghost" size="sm" icon="i-lucide-globe" label="Search" />
              <span className="ms-auto flex items-center gap-1.5">
                <span className="hidden sm:flex items-center gap-0.5 text-dimmed"><Kbd>⏎</Kbd></span>
                <Button size="sm" square icon="i-lucide-arrow-up" onClick={send} disabled={!draft.trim()} />
              </span>
            </div>
          </div>
          <p className="max-w-3xl mx-auto w-full mt-2 text-center text-xs text-dimmed">Responses are mocked in this kit.</p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ChatApp });
