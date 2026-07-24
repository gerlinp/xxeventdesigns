// Direction A — POLISHED v4 · elegant reset
// Radically simplified, closer to amorologyweddings.com: huge whitespace, one
// quiet serif, photography (placeholder for now) carrying all the emotion,
// no boxes/borders/competing type systems.

const aStyles = {
  bg: '#FFFDF9',
  ink: '#33261E',
  inkSoft: '#7A6A5C',
  rule: 'rgba(51,38,30,0.1)',
  serif: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
  sans: '"Inter", system-ui, sans-serif',
};

const R = (dev, d, t, m) => (dev === 'mobile' ? m : dev === 'tablet' ? t : d);

function ANav({ active = 'Home', device = 'desktop', overlay = false }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isMobile = device === 'mobile';
  const fg = (overlay && !menuOpen) ? '#FFFDF9' : aStyles.ink;

  return (
    <>
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: R(device, '36px 64px', '28px 40px', '18px 20px'),
      fontFamily: aStyles.sans, background: overlay ? 'transparent' : aStyles.bg,
      gap: 16, position: overlay ? 'absolute' : 'static', top: 0, left: 0, right: 0, zIndex: 20,
    }}>
      {!isMobile ? (
        <div style={{ display: 'flex', gap: R(device, 32, 20, 0), fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: fg }}>
          {['Home', 'Services', 'Gallery'].map(n => (
            <span key={n} style={{ opacity: n === active ? 1 : 0.6, cursor: 'pointer' }}>{n}</span>
          ))}
        </div>
      ) : <div />}

      <XXLogo size={R(device, 40, 36, 30)} />

      {!isMobile ? (
        <div style={{ fontSize: 10, letterSpacing: '0.24em', textTransform: 'uppercase', color: fg }}>
          <span style={{ opacity: active === 'Contact' ? 1 : 0.6, cursor: 'pointer' }}>Contact</span>
        </div>
      ) : (
        <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu" style={{
          display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'center', justifyContent: 'center',
          width: 44, height: 44, border: 'none', background: 'transparent', cursor: 'pointer', flexShrink: 0,
        }}>
          <span style={{ width: 18, height: 1, background: fg, transition: 'transform 0.25s ease', transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
          <span style={{ width: 18, height: 1, background: fg, transition: 'opacity 0.25s ease', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 18, height: 1, background: fg, transition: 'transform 0.25s ease', transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
        </button>
      )}
    </nav>
    {isMobile && menuOpen && (
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 15,
        background: aStyles.bg, paddingTop: 80, paddingBottom: 40,
        display: 'flex', flexDirection: 'column', animation: 'navSlide 0.25s ease both',
      }}>
        {['Home', 'Services', 'Gallery', 'Contact'].map(n => (
          <a key={n} onClick={() => setMenuOpen(false)} style={{
            padding: '16px 28px', fontFamily: aStyles.serif, fontStyle: 'italic', fontSize: 22,
            color: aStyles.ink, opacity: n === active ? 1 : 0.6, cursor: 'pointer', minHeight: 44, display: 'flex', alignItems: 'center',
          }}>{n}</a>
        ))}
        <div style={{ padding: '20px 28px 0', fontSize: 12, color: aStyles.inkSoft, lineHeight: 2 }}>{SITE.email}<br/>{SITE.phone}</div>
        <style>{`@keyframes navSlide{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    )}
    </>
  );
}

function AFooter({ device = 'desktop' }) {
  return (
    <footer style={{ background: aStyles.ink, color: 'rgba(255,253,249,0.9)', fontFamily: aStyles.sans, textAlign: 'center' }}>
      <div style={{ padding: R(device, '120px 56px 72px', '88px 40px 56px', '64px 20px 44px') }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.55, marginBottom: 24 }}>Get in touch</div>
        <h2 style={{ fontFamily: aStyles.serif, fontStyle: 'italic', fontWeight: 400, fontSize: R(device, 56, 46, 34), margin: 0, lineHeight: 1.2 }}>
          Let's design your next event.
        </h2>
        <div style={{ marginTop: 40 }}>
          <PolishButton label="Start a project →" variant="primary" light />
        </div>
      </div>
      <div style={{
        borderTop: '1px solid rgba(255,253,249,0.12)', padding: R(device, '26px 64px', '22px 40px', '18px 20px'),
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10,
        fontSize: 11, opacity: 0.5, letterSpacing: '0.04em',
      }}>
        <span>{SITE.email} · {SITE.phone}</span>
        <span>© 2026 XX EVENT DESIGN · EST. 2010</span>
      </div>
    </footer>
  );
}

function PolishButton({ label, variant = 'primary', light = false }) {
  const isPrimary = variant === 'primary';
  const bg = isPrimary ? (light ? '#FFFDF9' : aStyles.ink) : 'transparent';
  const fg = isPrimary ? (light ? aStyles.ink : '#FFFDF9') : (light ? '#FFFDF9' : aStyles.ink);
  const border = isPrimary ? 'none' : `1px solid ${light ? 'rgba(255,253,249,0.55)' : aStyles.ink}`;
  return (
    <button style={{
      padding: '16px 34px', minHeight: 48, background: bg, color: fg, border,
      fontFamily: aStyles.sans, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
      cursor: 'pointer', transition: 'opacity 0.2s ease', WebkitTapHighlightColor: 'transparent',
    }}
    onMouseEnter={e => e.target.style.opacity = 0.75}
    onMouseLeave={e => e.target.style.opacity = 1}
    onTouchStart={e => e.target.style.opacity = 0.75}
    onTouchEnd={e => e.target.style.opacity = 1}
    >{label}</button>
  );
}

function PolishForm() {
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const handleChange = (e) => { const { name, value } = e.target; setForm(p => ({ ...p, [name]: value })); if (errors[name]) setErrors(p => ({ ...p, [name]: '' })); };
  const validate = () => { const e = {}; if (!form.name.trim()) e.name = 'Required'; if (!form.email.trim()) e.email = 'Required'; else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'; if (!form.message.trim()) e.message = 'Required'; return e; };
  const handleSubmit = (ev) => { ev.preventDefault(); const e = validate(); if (Object.keys(e).length) { setErrors(e); return; } setSubmitted(true); setTimeout(() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', message: '' }); }, 2200); };
  return (
    <form onSubmit={handleSubmit}>
      {submitted && <div style={{ padding: 16, background: '#F3EEE2', color: aStyles.ink, marginBottom: 16, fontFamily: aStyles.sans, fontSize: 14 }}>✓ Thank you! We'll be in touch within one business day.</div>}
      {[['name', 'Your name'], ['email', 'Email *'], ['phone', 'Phone (optional)']].map(([id, label]) => (
        <label key={id} style={{ borderBottom: `1px solid ${aStyles.rule}`, padding: '18px 0', display: 'block' }}>
          <span style={{ fontFamily: aStyles.sans, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: errors[id] ? '#A94B3F' : aStyles.inkSoft, display: 'block' }}>{label} {errors[id] && `— ${errors[id]}`}</span>
          <input type={id === 'email' ? 'email' : 'text'} name={id} value={form[id]} onChange={handleChange} style={{ marginTop: 8, border: 'none', outline: 'none', fontFamily: aStyles.serif, fontSize: 21, width: '100%', background: 'transparent', color: aStyles.ink }} />
        </label>
      ))}
      <label style={{ borderBottom: `1px solid ${aStyles.rule}`, padding: '18px 0' }}>
        <span style={{ fontFamily: aStyles.sans, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: errors.message ? '#A94B3F' : aStyles.inkSoft, display: 'block' }}>Tell us about it {errors.message && `— ${errors.message}`}</span>
        <textarea name="message" value={form.message} onChange={handleChange} rows="4" style={{ marginTop: 8, border: 'none', outline: 'none', fontFamily: aStyles.serif, fontSize: 21, width: '100%', background: 'transparent', color: aStyles.ink, resize: 'none' }} />
      </label>
      <button type="submit" style={{ marginTop: 28, padding: '16px 30px', background: aStyles.ink, color: '#FFFDF9', border: 'none', fontFamily: aStyles.sans, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer' }}>
        Send inquiry →
      </button>
    </form>
  );
}

// Simple full-width portrait image + caption, alternating sides. No borders,
// no offset overlap thumbnails — one clean photo per row, generous whitespace.
function PortfolioRow({ device, reverse, category, title, body, hue }) {
  const oneCol = device === 'mobile';
  const imgCol = (
    <div style={{ width: '100%', aspectRatio: R(device, '4 / 5', '4 / 5', '3 / 4'), overflow: 'hidden' }}>
      <Photo label={category} hue={hue} h="100%" w="100%" />
    </div>
  );
  const textCol = (
    <div style={{ padding: oneCol ? '40px 4px 0' : R(device, '0 64px', '0 40px', 0), display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ fontFamily: aStyles.sans, fontSize: 10, letterSpacing: '0.26em', textTransform: 'uppercase', color: aStyles.inkSoft, marginBottom: 18 }}>{category}</div>
      <h3 style={{ fontFamily: aStyles.serif, fontStyle: 'italic', fontWeight: 400, fontSize: R(device, 40, 34, 28), color: aStyles.ink, margin: '0 0 20px', lineHeight: 1.15 }}>{title}</h3>
      <p style={{ fontSize: R(device, 15, 14, 14), lineHeight: 1.8, color: aStyles.inkSoft, maxWidth: 400, margin: 0 }}>{body}</p>
    </div>
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: oneCol ? '1fr' : '1fr 1fr', gap: 0, alignItems: 'stretch', padding: oneCol ? '0 20px' : 0 }}>
      {reverse && !oneCol ? <>{textCol}{imgCol}</> : <>{imgCol}{textCol}</>}
    </div>
  );
}

// ---------- HOME ----------
function HomeAPolished({ device = 'desktop' }) {
  const oneCol = device === 'mobile';

  return (
    <div style={{ background: aStyles.bg, color: aStyles.ink, fontFamily: aStyles.sans, overflowX: 'hidden' }}>
      {/* ─── FULL-BLEED HERO ─── */}
      <section style={{ position: 'relative', minHeight: R(device, '100vh', 640, 560), display: 'flex', flexDirection: 'column' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <Photo hue="night" w="100%" h="100%" />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(20,12,10,0.35) 0%, rgba(20,12,10,0.15) 45%, rgba(20,12,10,0.6) 100%)' }} />
        <ANav active="Home" device={device} overlay />
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: R(device, '40px 64px', '32px 40px', '28px 24px') }}>
          <div style={{ fontFamily: aStyles.sans, fontSize: 10, letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(255,253,249,0.7)', marginBottom: 28 }}>
            New England · Est. 2010
          </div>
          <h1 style={{
            fontFamily: aStyles.serif, fontStyle: 'italic', fontWeight: 400, color: '#FFFDF9',
            fontSize: R(device, 68, 52, 34), lineHeight: 1.2, margin: 0, maxWidth: 760,
          }}>
            Creativity is our middle name.
          </h1>
          <p style={{ fontFamily: aStyles.sans, fontSize: R(device, 14, 13, 13), color: 'rgba(255,253,249,0.8)', marginTop: 26, maxWidth: 440, lineHeight: 1.75, letterSpacing: '0.01em' }}>
            Full-service event design and styling across New England — weddings, showers,
            milestones, and the celebrations in between.
          </p>
          <div style={{ marginTop: 40 }}>
            <PolishButton label="Let us design your event" variant="primary" light />
          </div>
        </div>
      </section>

      {/* ─── ABOUT — one clean photo, generous space ─── */}
      <section style={{
        padding: R(device, '140px 64px', '96px 40px', '64px 24px'),
        display: 'grid', gridTemplateColumns: oneCol ? '1fr' : '1fr 1fr',
        gap: R(device, 72, 44, 40), alignItems: 'center', maxWidth: 1240, margin: '0 auto',
      }}>
        <div style={{ width: '100%', aspectRatio: '4 / 5', overflow: 'hidden' }}>
          <Photo label="Studio" hue="blush" w="100%" h="100%" />
        </div>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: aStyles.inkSoft, marginBottom: 22 }}>About Us</div>
          <h2 style={{ fontFamily: aStyles.serif, fontStyle: 'italic', fontSize: R(device, 34, 30, 24), lineHeight: 1.45, color: aStyles.ink, margin: '0 0 26px', fontWeight: 400 }}>
            Since 2010, we've designed events across New England for every occasion that calls
            for one — weddings, birthdays, showers, and the anniversaries no one expected to
            need this much ceremony.
          </h2>
          <p style={{ fontSize: R(device, 15, 14, 14), lineHeight: 1.8, color: aStyles.inkSoft, maxWidth: 420, marginBottom: 30 }}>
            Every event starts the same way: we listen first, then design backwards from the
            feeling you want the room to leave behind.
          </p>
          <a style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: aStyles.ink, borderBottom: `1px solid ${aStyles.ink}`, paddingBottom: 4, cursor: 'pointer' }}>
            Discover more
          </a>
        </div>
      </section>

      {/* ─── PORTFOLIO ROWS ─── */}
      <div style={{ display: 'grid', gap: R(device, 140, 96, 72) }}>
        <PortfolioRow device={device} category="Weddings" hue="plum" title="Timeless Celebrations" body="Florals, candlelit tablescapes, and the small details that make a reception feel entirely your own." />
        <PortfolioRow device={device} reverse category="Milestones" hue="ember" title="Sweet Celebrations" body="Showers, sweet 16s, and first communions — dessert bars and tablescapes guests remember long after." />
        <PortfolioRow device={device} category="Receptions" hue="night" title="Unforgettable Nights" body="Uplighting, dance floors, and the details that carry a night from ceremony into celebration." />
      </div>

      {/* ─── QUOTE ─── */}
      <section style={{ padding: R(device, '160px 64px', '112px 40px', '72px 24px'), textAlign: 'center' }}>
        <blockquote style={{ fontFamily: aStyles.serif, fontStyle: 'italic', fontSize: R(device, 38, 30, 24), lineHeight: 1.4, color: aStyles.ink, margin: 0, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto' }}>
          "You're only as good as your last event."
        </blockquote>
        <div style={{ fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase', color: aStyles.inkSoft, marginTop: 24 }}>— XX Event Design</div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{
        padding: R(device, '0 64px 100px', '0 40px 72px', '0 24px 56px'),
        display: 'grid', gridTemplateColumns: R(device, 'repeat(4, 1fr)', 'repeat(4, 1fr)', 'repeat(2, 1fr)'),
        gap: R(device, 24, 20, 32), textAlign: 'center', maxWidth: 900, marginLeft: 'auto', marginRight: 'auto',
      }}>
        {[['16', 'years designing'], ['420+', 'events delivered'], ['38', 'trusted vendors'], ['100%', 'satisfaction']].map(([n, l]) => (
          <div key={l}>
            <div style={{ fontFamily: aStyles.serif, fontStyle: 'italic', fontSize: R(device, 38, 32, 28), color: aStyles.ink, lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: R(device, 10, 10, 9), letterSpacing: '0.16em', textTransform: 'uppercase', color: aStyles.inkSoft, marginTop: 10 }}>{l}</div>
          </div>
        ))}
      </section>

      {/* ─── TESTIMONIALS — plain, no boxes ─── */}
      <section style={{ padding: R(device, '0 64px 140px', '0 40px 96px', '0 24px 64px'), maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: aStyles.inkSoft, marginBottom: 56 }}>Testimonials</div>
        <div style={{ display: 'grid', gap: R(device, 56, 44, 40) }}>
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: aStyles.serif, fontStyle: 'italic', fontSize: R(device, 24, 21, 18), lineHeight: 1.6, color: aStyles.ink, margin: '0 auto', maxWidth: 620 }}>"{t.quote}"</p>
              <div style={{ marginTop: 18, fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: aStyles.inkSoft }}>{t.who} · {t.event}</div>
            </div>
          ))}
        </div>
      </section>

      <AFooter device={device} />
    </div>
  );
}

// ---------- CONTACT ----------
function ContactAPolished({ device = 'desktop' }) {
  const oneCol = device === 'mobile';
  return (
    <div style={{ background: aStyles.bg, color: aStyles.ink, fontFamily: aStyles.sans }}>
      <ANav active="Contact" device={device} />
      <section style={{ padding: R(device, '80px 64px 0', '56px 40px 0', '40px 24px 0'), textAlign: 'center' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: aStyles.inkSoft, marginBottom: 20 }}>Get in touch</div>
        <h1 style={{ fontFamily: aStyles.serif, fontStyle: 'italic', fontWeight: 400, fontSize: R(device, 52, 42, 32), margin: 0 }}>Contact Me</h1>
      </section>
      <section style={{ padding: R(device, '64px 64px 120px', '48px 40px 88px', '32px 24px 56px'), display: 'grid', gridTemplateColumns: oneCol ? '1fr' : '1fr 1fr', gap: R(device, 64, 40, 36), maxWidth: 1100, margin: '0 auto' }}>
        <div>
          <div style={{ width: '100%', maxWidth: R(device, 400, 340, '100%'), aspectRatio: '4 / 5', overflow: 'hidden', marginBottom: R(device, 36, 28, 28) }}>
            <Photo label="Guests" hue="warm" w="100%" h="100%" />
          </div>
          <div style={{ display: 'grid', gap: 20 }}>
            {[['Email', SITE.email], ['Phone', SITE.phone], ['Instagram', SITE.insta]].map(([k, v]) => (
              <div key={k} style={{ borderTop: `1px solid ${aStyles.rule}`, paddingTop: 12 }}>
                <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: aStyles.inkSoft }}>{k}</div>
                <div style={{ fontFamily: aStyles.serif, fontSize: R(device, 19, 18, 17), marginTop: 4 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div><PolishForm /></div>
      </section>
      <AFooter device={device} />
    </div>
  );
}

// ---------- SERVICES ----------
function ServicesAPolished({ device = 'desktop' }) {
  const oneCol = device === 'mobile';
  return (
    <div style={{ background: aStyles.bg, color: aStyles.ink, fontFamily: aStyles.sans }}>
      <ANav active="Services" device={device} />

      <section style={{ padding: R(device, '96px 64px 0', '64px 40px 0', '44px 24px 0'), textAlign: 'center' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: aStyles.inkSoft, marginBottom: 20 }}>What we do</div>
        <h1 style={{ fontFamily: aStyles.serif, fontStyle: 'italic', fontWeight: 400, fontSize: R(device, 56, 44, 32), margin: '0 auto', maxWidth: 640, lineHeight: 1.2 }}>
          Everything an event needs, from first sketch to last dance.
        </h1>
        <p style={{ fontSize: R(device, 15, 14, 14), lineHeight: 1.8, color: aStyles.inkSoft, maxWidth: 480, margin: '24px auto 0' }}>
          Most clients use four or five of these. A few use everything. We'll figure out which
          together on a short call.
        </p>
      </section>

      {/* Service categories — plain columns, no boxes */}
      <section style={{
        padding: R(device, '96px 64px', '72px 40px', '48px 24px'), maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: R(device, 'repeat(4, 1fr)', 'repeat(2, 1fr)', '1fr'),
        gap: R(device, 56, 40, 44),
      }}>
        {SERVICES.map((s) => (
          <div key={s.cat}>
            <h3 style={{ fontFamily: aStyles.serif, fontStyle: 'italic', fontSize: R(device, 26, 24, 22), fontWeight: 400, margin: '0 0 20px', color: aStyles.ink }}>{s.cat}</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14, lineHeight: 2.1, color: aStyles.inkSoft }}>
              {s.items.map(it => <li key={it}>{it}</li>)}
            </ul>
          </div>
        ))}
      </section>

      {/* Pricing */}
      <section style={{ padding: R(device, '96px 64px 120px', '72px 40px 96px', '48px 24px 64px'), maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: aStyles.inkSoft, marginBottom: 20 }}>Investment</div>
          <h2 style={{ fontFamily: aStyles.serif, fontStyle: 'italic', fontWeight: 400, fontSize: R(device, 40, 34, 28), margin: 0 }}>Three places to start.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: R(device, 'repeat(3, 1fr)', 'repeat(3, 1fr)', '1fr'), gap: R(device, 48, 32, 40) }}>
          {PACKAGES.map((p) => (
            <div key={p.name} style={{ textAlign: 'center', paddingTop: 32, borderTop: `1px solid ${p.featured ? aStyles.ink : aStyles.rule}` }}>
              <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: aStyles.inkSoft, marginBottom: 12 }}>{p.tag}</div>
              <h3 style={{ fontFamily: aStyles.serif, fontStyle: 'italic', fontSize: R(device, 34, 30, 28), fontWeight: 400, margin: '0 0 8px' }}>{p.name}</h3>
              <div style={{ fontSize: 15, color: aStyles.inkSoft, marginBottom: 28 }}>{p.price}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 13.5, lineHeight: 2.1, color: aStyles.inkSoft }}>
                {p.features.map(f => <li key={f}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <AFooter device={device} />
    </div>
  );
}

// ---------- GALLERY ----------
function GalleryAPolished({ device = 'desktop' }) {
  const [filter, setFilter] = React.useState('All');
  const cats = ['All', ...new Set(GALLERY.map(g => g.cat))];
  const items = filter === 'All' ? GALLERY : GALLERY.filter(g => g.cat === filter);
  const oneCol = device === 'mobile';

  return (
    <div style={{ background: aStyles.bg, color: aStyles.ink, fontFamily: aStyles.sans }}>
      <ANav active="Gallery" device={device} />

      <section style={{ padding: R(device, '96px 64px 0', '64px 40px 0', '44px 24px 0'), textAlign: 'center' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: aStyles.inkSoft, marginBottom: 20 }}>Portfolio</div>
        <h1 style={{ fontFamily: aStyles.serif, fontStyle: 'italic', fontWeight: 400, fontSize: R(device, 56, 44, 32), margin: 0 }}>Sixteen years, one room at a time.</h1>
        <p style={{ fontSize: R(device, 15, 14, 14), lineHeight: 1.8, color: aStyles.inkSoft, maxWidth: 480, margin: '24px auto 0' }}>
          The archive has moved off Instagram and onto our own site.
        </p>
      </section>

      <section style={{ padding: R(device, '48px 64px 0', '36px 40px 0', '28px 24px 0'), display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: '10px 18px', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
            background: 'transparent', color: filter === c ? aStyles.ink : aStyles.inkSoft,
            border: 'none', borderBottom: filter === c ? `1px solid ${aStyles.ink}` : '1px solid transparent',
            cursor: 'pointer', fontFamily: aStyles.sans,
          }}>{c}</button>
        ))}
      </section>

      <section style={{ padding: R(device, '56px 64px 120px', '40px 40px 96px', '32px 24px 64px'), maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: R(device, 'repeat(3, 1fr)', 'repeat(2, 1fr)', '1fr'), gap: R(device, 28, 22, 24) }}>
          {items.map((g, i) => (
            <div key={i}>
              <div style={{ width: '100%', aspectRatio: '4 / 5', overflow: 'hidden' }}>
                <Photo label={g.label} hue={g.hue} w="100%" h="100%" />
              </div>
              <div style={{ marginTop: 12, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: aStyles.inkSoft }}>{g.cat}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: R(device, '0 64px 120px', '0 40px 96px', '0 24px 64px'), textAlign: 'center' }}>
        <div style={{ fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', color: aStyles.inkSoft, marginBottom: 16 }}>Behind the scenes</div>
        <h2 style={{ fontFamily: aStyles.serif, fontStyle: 'italic', fontWeight: 400, fontSize: R(device, 32, 28, 24), margin: '0 0 20px' }}>More on Instagram.</h2>
        <a style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: aStyles.ink, borderBottom: `1px solid ${aStyles.ink}`, paddingBottom: 4, cursor: 'pointer' }}>{SITE.insta} →</a>
      </section>

      <AFooter device={device} />
    </div>
  );
}

Object.assign(window, { HomeAPolished, ContactAPolished, ServicesAPolished, GalleryAPolished });
