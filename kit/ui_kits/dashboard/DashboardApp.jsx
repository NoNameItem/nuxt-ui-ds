/* Nuxt UI Pro "Dashboard" template recreation.
   Shell classes are lifted verbatim from dashboard-sidebar.ts / dashboard-panel.ts /
   dashboard-navbar.ts / dashboard-toolbar.ts; primitives come from the design system. */
const { Button, Badge, Card, Input, Avatar, Kbd, Separator, Alert, Progress, Table, Icon } = window.NuxtUIDesignSystem_69ebe5;

const NAV = [
  { label: 'Home', icon: 'i-lucide-house' },
  { label: 'Inbox', icon: 'i-lucide-inbox', badge: '4' },
  { label: 'Customers', icon: 'i-lucide-users' },
  { label: 'Settings', icon: 'i-lucide-settings' }
];

const CUSTOMERS = [
  { name: 'Ada Lovelace', email: 'ada@algo.dev', plan: 'Team', status: 'Active', mrr: '$249' },
  { name: 'Grace Hopper', email: 'grace@navy.mil', plan: 'Solo', status: 'Active', mrr: '$29' },
  { name: 'Alan Turing', email: 'alan@bletchley.uk', plan: 'Team', status: 'Trialing', mrr: '$0' },
  { name: 'Katherine Johnson', email: 'kj@nasa.gov', plan: 'Enterprise', status: 'Active', mrr: '$1,200' },
  { name: 'Margaret Hamilton', email: 'mh@apollo.io', plan: 'Solo', status: 'Churned', mrr: '$0' }
];

const STATUS_COLOR = { Active: 'success', Trialing: 'info', Churned: 'neutral' };

function SidebarLink({ item, active, onClick }) {
  return (
    <button type="button" onClick={onClick}
      className={'group relative w-full flex items-center gap-1.5 font-medium text-sm px-2.5 py-1.5 rounded-md transition-colors ' +
        (active ? 'text-highlighted bg-elevated' : 'text-muted hover:text-default hover:bg-elevated/50')}>
      <Icon name={item.icon} class="shrink-0 size-5" />
      <span className="truncate">{item.label}</span>
      {item.badge && <Badge class="ms-auto" size="sm" color="neutral" variant="subtle" label={item.badge} />}
    </button>
  );
}

function Sidebar({ current, setCurrent, onSearch }) {
  return (
    <div data-slot="root" className="relative flex flex-col min-h-full w-64 shrink-0 border-e border-default" style={{ '--width': '16rem' }}>
      <div data-slot="header" className="h-(--ui-header-height) shrink-0 flex items-center gap-1.5 px-4">
        <span className="size-6 rounded-md bg-primary flex items-center justify-center shrink-0">
          <Icon name="i-lucide-triangle" class="size-3.5 text-inverted" />
        </span>
        <span className="font-bold text-highlighted truncate">Acme Inc</span>
        <Icon name="i-lucide-chevrons-up-down" class="size-4 text-dimmed ms-auto" />
      </div>
      <div data-slot="body" className="flex flex-col gap-4 flex-1 overflow-y-auto px-4 py-2">
        <Button color="neutral" variant="outline" class="w-full justify-start text-dimmed font-normal" icon="i-lucide-search" onClick={onSearch}
          label="Search…" trailing={<span className="hidden lg:flex items-center gap-0.5 ms-auto"><Kbd value="meta">⌘</Kbd><Kbd value="k">K</Kbd></span>} />
        <div className="flex flex-col gap-0.5">
          {NAV.map((item) => <SidebarLink key={item.label} item={item} active={current === item.label} onClick={() => setCurrent(item.label)} />)}
        </div>
        <div className="flex flex-col gap-0.5 mt-auto">
          <span className="w-full flex items-center gap-1.5 font-semibold text-xs/5 text-highlighted px-2.5 py-1.5">Workspace</span>
          {[{ label: 'Billing', icon: 'i-lucide-credit-card' }, { label: 'Members', icon: 'i-lucide-user-plus' }].map((i) =>
            <SidebarLink key={i.label} item={i} />)}
        </div>
      </div>
      <div data-slot="footer" className="shrink-0 flex items-center gap-1.5 px-4 py-2 border-t border-default">
        <Avatar size="sm" fallback="AL" />
        <span className="text-sm font-medium text-default truncate">Ada Lovelace</span>
        <Icon name="i-lucide-ellipsis-vertical" class="size-4 text-dimmed ms-auto" />
      </div>
    </div>
  );
}

function Stat({ label, value, delta, up }) {
  return (
    <Card variant="outline" ui={{ body: 'p-4 sm:p-4' }}>
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs font-medium text-muted uppercase tracking-wide">{label}</span>
        <Badge size="sm" variant="subtle" color={up ? 'success' : 'error'} label={delta} />
      </div>
      <div className="mt-2 text-2xl font-semibold text-highlighted tabular-nums">{value}</div>
    </Card>
  );
}

function HomeBody() {
  return (
    <>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <Stat label="MRR" value="$48,290" delta="+12.4%" up />
        <Stat label="Customers" value="1,204" delta="+3.1%" up />
        <Stat label="Churn" value="1.8%" delta="-0.4%" up />
        <Stat label="Open tickets" value="17" delta="+5" />
      </div>
      <Alert variant="subtle" color="info" icon="i-lucide-info" title="Usage at 82% of plan"
        description="You are approaching the seat limit on the Team plan." />
      <Card variant="outline" ui={{ header: 'p-4 sm:px-4', body: 'p-0' }}
        header={<div className="flex items-center justify-between gap-2">
          <div><div className="text-highlighted font-semibold">Customers</div><div className="mt-1 text-muted text-sm">5 of 1,204</div></div>
          <div className="flex items-center gap-1.5">
            <Input size="sm" icon="i-lucide-search" placeholder="Filter…" />
            <Button size="sm" color="neutral" variant="outline" icon="i-lucide-sliders-horizontal" label="View" />
          </div>
        </div>}>
        <div className="relative overflow-auto">
          <table className="min-w-full overflow-clip">
            <thead className="relative">
              <tr>
                {['Customer', 'Plan', 'Status', 'MRR', ''].map((h) =>
                  <th key={h} className="px-4 py-3.5 text-sm text-highlighted text-start font-semibold border-b border-default">{h}</th>)}
              </tr>
            </thead>
            <tbody className="divide-y divide-default">
              {CUSTOMERS.map((c) => (
                <tr key={c.email} className="hover:bg-elevated/50">
                  <td className="p-4 text-sm text-muted whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm" fallback={c.name.split(' ').map((w) => w[0]).join('')} />
                      <span><span className="block text-default font-medium">{c.name}</span><span className="block text-dimmed text-xs">{c.email}</span></span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted whitespace-nowrap">{c.plan}</td>
                  <td className="p-4 text-sm text-muted whitespace-nowrap"><Badge size="sm" variant="subtle" color={STATUS_COLOR[c.status]} label={c.status} /></td>
                  <td className="p-4 text-sm text-muted whitespace-nowrap tabular-nums">{c.mrr}</td>
                  <td className="p-4 text-sm text-muted whitespace-nowrap text-end"><Button size="xs" color="neutral" variant="ghost" square icon="i-lucide-ellipsis" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function SettingsBody() {
  return (
    <>
      <Card variant="outline" header={<div><div className="text-highlighted font-semibold">Profile</div><div className="mt-1 text-muted text-sm">This is how others see you.</div></div>}
        footer={<div className="flex justify-end gap-1.5"><Button color="neutral" variant="ghost" label="Cancel" /><Button label="Save changes" /></div>}>
        <div className="flex flex-col gap-4 max-w-md">
          <label className="flex flex-col gap-1.5"><span className="text-sm font-medium text-default">Name</span><Input defaultValue="Ada Lovelace" /></label>
          <label className="flex flex-col gap-1.5"><span className="text-sm font-medium text-default">Email</span><Input defaultValue="ada@algo.dev" /></label>
          <label className="flex flex-col gap-1.5"><span className="text-sm font-medium text-default">Bio</span><Input placeholder="Tell us about yourself" /></label>
        </div>
      </Card>
      <Card variant="outline" header={<div className="text-highlighted font-semibold">Plan usage</div>}>
        <div className="flex flex-col gap-4 max-w-md">
          {[['Seats', 82], ['API calls', 46], ['Storage', 18]].map(([l, v]) => (
            <div key={l} className="flex flex-col gap-2">
              <div className="flex justify-between text-sm"><span className="text-default">{l}</span><span className="text-muted tabular-nums">{v}%</span></div>
              <Progress />
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}

function InboxBody() {
  return (
    <div className="flex flex-col divide-y divide-default -m-4 sm:-m-6">
      {[['Ada Lovelace', 'Re: invoice for March', 'Thanks — approved and paid.', true],
        ['Grace Hopper', 'Feature request: nested tables', 'Would love row grouping in the table.', true],
        ['Alan Turing', 'Trial extension', 'Could we get two more weeks?', false],
        ['Katherine Johnson', 'SSO rollout', 'Our IT team has questions about SAML.', false]].map(([who, subj, body, unread]) => (
        <div key={subj} className="flex items-start gap-3 p-4 hover:bg-elevated/50 cursor-pointer">
          <Avatar size="md" fallback={who.split(' ').map((w) => w[0]).join('')} />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-highlighted truncate">{who}</span>
              {unread && <span className="size-1.5 rounded-full bg-primary shrink-0" />}
              <span className="ms-auto text-xs text-dimmed shrink-0">2h ago</span>
            </div>
            <div className="text-sm text-default truncate">{subj}</div>
            <div className="text-sm text-muted truncate">{body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SearchModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-elevated/75" onClick={onClose}>
      <div className="w-full max-w-lg rounded-lg overflow-hidden bg-default shadow-lg ring ring-default divide-y divide-default"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-2 px-4">
          <Icon name="i-lucide-search" class="size-5 text-dimmed shrink-0" />
          <input autoFocus placeholder="Search customers, settings, docs…"
            className="w-full py-3.5 text-sm bg-transparent text-default placeholder:text-dimmed focus:outline-none" />
          <Kbd value="esc">ESC</Kbd>
        </div>
        <div className="p-1 max-h-72 overflow-y-auto">
          <div className="px-2.5 py-1.5 text-xs font-semibold text-highlighted">Pages</div>
          {NAV.map((n, i) => (
            <div key={n.label} className={'flex items-center gap-1.5 px-2.5 py-1.5 text-sm rounded-md cursor-pointer ' + (i === 0 ? 'text-highlighted bg-elevated' : 'text-default hover:bg-elevated/50')}>
              <Icon name={n.icon} class="size-5 shrink-0 text-dimmed" />{n.label}
              <Icon name="i-lucide-corner-down-left" class="size-4 ms-auto text-dimmed" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardApp() {
  const [current, setCurrent] = React.useState('Home');
  const [search, setSearch] = React.useState(false);
  const [dark, setDark] = React.useState(false);
  const [tab, setTab] = React.useState('Overview');
  const body = current === 'Settings' ? <SettingsBody /> : current === 'Inbox' ? <InboxBody /> : <HomeBody />;
  return (
    <div className={(dark ? 'dark ' : '') + 'min-h-screen bg-default text-default'}>
      <div className="flex min-h-screen">
        <Sidebar current={current} setCurrent={setCurrent} onSearch={() => setSearch(true)} />
        <div data-slot="root" className="relative flex flex-col min-w-0 flex-1">
          <div data-slot="root" className="h-(--ui-header-height) shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <Icon name="i-lucide-panel-left" class="size-5 text-dimmed shrink-0 me-1.5" />
              <span className="flex items-center gap-1.5 font-semibold text-highlighted truncate">{current}</span>
            </div>
            <div className="flex items-center shrink-0 gap-1.5">
              <Button color="neutral" variant="ghost" square icon={dark ? 'i-lucide-sun' : 'i-lucide-moon'} onClick={() => setDark(!dark)} />
              <Button color="neutral" variant="ghost" square icon="i-lucide-bell" />
              <Button icon="i-lucide-plus" label="New customer" />
            </div>
          </div>
          {current !== 'Settings' && (
            <div className="shrink-0 flex items-center justify-between border-b border-default px-4 sm:px-6 gap-1.5 overflow-x-auto min-h-[49px]">
              <div className="flex items-center gap-1.5">
                {['Overview', 'Activity', 'Reports'].map((t) => (
                  <button key={t} type="button" onClick={() => setTab(t)}
                    className={'px-2.5 py-1.5 text-sm font-medium rounded-md transition-colors ' + (tab === t ? 'text-highlighted bg-elevated' : 'text-muted hover:text-default')}>{t}</button>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <Button size="sm" color="neutral" variant="outline" icon="i-lucide-calendar" label="Last 30 days" />
                <Button size="sm" color="neutral" variant="outline" square icon="i-lucide-download" />
              </div>
            </div>
          )}
          <div data-slot="body" className="flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6">{body}</div>
        </div>
      </div>
      {search && <SearchModal onClose={() => setSearch(false)} />}
    </div>
  );
}

Object.assign(window, { DashboardApp });
