/* Nuxt UI Pro "SaaS" landing template recreation.
   Section rhythm and type scale come from page-hero.ts / page-section.ts /
   page-card.ts / container.ts. */
const { Button, Badge, Card, Icon, Separator, Input } = window.NuxtUIDesignSystem_69ebe5;

const Container = ({ children, class: c = '' }) => (
  <div className={'w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 ' + c}>{children}</div>
);

function SiteHeader({ dark, setDark }) {
  return (
    <header className="bg-default/75 backdrop-blur-sm border-b border-default h-(--ui-header-height) sticky top-0 z-50">
      <Container class="flex items-center justify-between gap-3 h-full">
        <div className="lg:flex-1 flex items-center gap-1.5">
          <span className="shrink-0 font-bold text-xl text-highlighted flex items-end gap-1.5">
            <Icon name="i-lucide-triangle" class="size-5 text-primary" />Acme
          </span>
        </div>
        <nav className="hidden lg:flex items-center gap-1">
          {['Product', 'Pricing', 'Docs', 'Blog'].map((l, i) => (
            <a key={l} href="#" className={'px-2.5 py-1.5 text-sm font-medium rounded-md transition-colors ' + (i === 0 ? 'text-highlighted bg-elevated' : 'text-muted hover:text-default hover:bg-elevated/50')}>{l}</a>
          ))}
        </nav>
        <div className="flex items-center justify-end lg:flex-1 gap-1.5">
          <Button color="neutral" variant="ghost" square icon={dark ? 'i-lucide-sun' : 'i-lucide-moon'} onClick={() => setDark(!dark)} />
          <Button color="neutral" variant="ghost" label="Sign in" class="hidden sm:inline-flex" />
          <Button label="Get started" trailingIcon="i-lucide-arrow-right" />
        </div>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <div className="relative isolate">
      <Container class="flex flex-col py-24 sm:py-32 lg:py-40 gap-16 sm:gap-y-24 items-center text-center">
        <div className="max-w-3xl">
          <div className="mb-4 flex justify-center">
            <Badge variant="subtle" color="primary" label="v4.11 — now with the Editor" leadingIcon="i-lucide-sparkles" />
          </div>
          <h1 className="text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-highlighted">Ship the interface, not the plumbing</h1>
          <p className="text-lg sm:text-xl/8 text-muted mt-6 text-pretty">A component system with sensible defaults, every slot themeable, and light and dark handled for you.</p>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-center">
            <Button size="xl" label="Start building" trailingIcon="i-lucide-arrow-right" />
            <Button size="xl" color="neutral" variant="outline" label="Read the docs" icon="i-lucide-book-open" />
          </div>
        </div>
      </Container>
    </div>
  );
}

function Logos() {
  return (
    <Container class="pb-16">
      <p className="text-center text-xs uppercase tracking-wide text-dimmed">Trusted by teams at</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-60">
        {['Vercel', 'Netlify', 'Linear', 'Stripe', 'Figma'].map((n) => (
          <span key={n} className="text-lg font-semibold text-muted">{n}</span>
        ))}
      </div>
    </Container>
  );
}

const FEATURES = [
  { icon: 'i-lucide-palette', title: 'Themeable to the slot', description: 'Every element of every component is a named slot you can restyle.' },
  { icon: 'i-lucide-moon-star', title: 'Dark mode by default', description: 'One class re-points the semantic roles. No component branches.' },
  { icon: 'i-lucide-accessibility', title: 'Accessible primitives', description: 'Keyboard, focus and ARIA behaviour handled underneath.' },
  { icon: 'i-lucide-gauge', title: 'Fast by construction', description: 'Utility classes resolved at build time — no runtime CSS-in-JS.' },
  { icon: 'i-lucide-blocks', title: '117 components', description: 'From buttons to dashboards, chat and pricing tables.' },
  { icon: 'i-lucide-file-code-2', title: 'Typed props', description: 'Variants, sizes and colours are unions, not strings.' }
];

function Features() {
  return (
    <div className="relative isolate">
      <Container class="flex flex-col py-16 sm:py-24 lg:py-32 gap-8 sm:gap-16">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold text-primary">Everything included</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-pretty tracking-tight font-bold text-highlighted">A system, not a pile of components</h2>
          <p className="text-base sm:text-lg text-muted mt-4">The same seven colour roles and five size steps run through every component.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="relative flex flex-col rounded-lg p-6 bg-elevated/50 ring ring-default">
              <Icon name={f.icon} class="size-6 shrink-0 text-primary" />
              <h3 className="mt-4 text-base font-semibold text-highlighted">{f.title}</h3>
              <p className="mt-1 text-sm text-muted">{f.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

const PLANS = [
  { title: 'Solo', description: 'For one developer shipping side projects.', price: '$0', features: ['117 components', 'Light & dark', 'Community support'] },
  { title: 'Team', description: 'For product teams that ship weekly.', price: '$249', features: ['Everything in Solo', 'Pro templates', 'Priority support', 'Figma library'], highlight: true },
  { title: 'Enterprise', description: 'For organisations with a design system team.', price: 'Custom', features: ['Everything in Team', 'SSO & audit log', 'Design review', 'SLA'] }
];

function Pricing() {
  return (
    <Container class="py-16 sm:py-24">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl tracking-tight font-bold text-highlighted">Simple pricing</h2>
        <p className="text-base sm:text-lg text-muted mt-4">One licence, unlimited projects.</p>
      </div>
      <div className="mt-12 grid lg:grid-cols-3 gap-6 items-start">
        {PLANS.map((p) => (
          <div key={p.title} className={'relative flex flex-col rounded-lg p-6 sm:p-8 ' + (p.highlight ? 'bg-default ring-2 ring-primary lg:scale-105 shadow-lg' : 'bg-default ring ring-default')}>
            {p.highlight && <Badge class="absolute -top-3 left-6" label="Most popular" />}
            <h3 className="text-base font-semibold text-highlighted">{p.title}</h3>
            <p className="mt-1 text-sm text-muted">{p.description}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="text-4xl font-bold text-highlighted tracking-tight">{p.price}</span>
              {p.price !== 'Custom' && <span className="text-sm text-muted">/month</span>}
            </div>
            <ul className="mt-6 flex flex-col gap-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted">
                  <Icon name="i-lucide-circle-check" class="size-5 shrink-0 text-primary" />{f}
                </li>
              ))}
            </ul>
            <Button class="mt-8 justify-center" block variant={p.highlight ? 'solid' : 'outline'} color={p.highlight ? 'primary' : 'neutral'} label={p.price === 'Custom' ? 'Talk to sales' : 'Get started'} />
          </div>
        ))}
      </div>
    </Container>
  );
}

function CTA() {
  return (
    <Container class="py-16 sm:py-24">
      <div className="rounded-lg bg-inverted px-6 py-16 sm:px-16 text-center">
        <h2 className="text-3xl sm:text-4xl tracking-tight font-bold text-inverted">Start with the defaults. Change what you need.</h2>
        <p className="mt-4 text-base text-inverted/75">Install once and get every component, in both themes.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" color="neutral" label="Get started" trailingIcon="i-lucide-arrow-right" />
          <Button size="lg" color="neutral" variant="ghost" class="text-inverted hover:bg-inverted/10" label="Book a demo" />
        </div>
      </div>
    </Container>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-default">
      <Container class="py-8 lg:py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[['Product', ['Features', 'Pricing', 'Changelog', 'Roadmap']],
          ['Resources', ['Docs', 'Templates', 'Figma kit', 'Showcase']],
          ['Company', ['About', 'Blog', 'Careers', 'Contact']],
          ['Legal', ['Privacy', 'Terms', 'Licence']]].map(([title, links]) => (
          <div key={title} className="flex flex-col gap-3">
            <span className="text-sm font-semibold text-highlighted">{title}</span>
            {links.map((l) => <a key={l} href="#" className="text-sm text-muted hover:text-default">{l}</a>)}
          </div>
        ))}
      </Container>
      <Separator />
      <Container class="py-8 lg:py-4 lg:flex lg:items-center lg:justify-between lg:gap-x-3">
        <span className="text-sm text-muted">© 2026 Acme Inc.</span>
        <div className="flex items-center gap-1.5 mt-3 lg:mt-0">
          {['i-lucide-github', 'i-lucide-twitter', 'i-lucide-linkedin'].map((i) => (
            <Button key={i} color="neutral" variant="ghost" square icon={i} />
          ))}
        </div>
      </Container>
    </footer>
  );
}

function LandingPage() {
  const [dark, setDark] = React.useState(false);
  return (
    <div className={(dark ? 'dark ' : '') + 'bg-default text-default min-h-screen'}>
      <SiteHeader dark={dark} setDark={setDark} />
      <Hero />
      <Logos />
      <Features />
      <Pricing />
      <CTA />
      <SiteFooter />
    </div>
  );
}

Object.assign(window, { LandingPage });
