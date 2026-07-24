// Dribbble-inspired recreation ("Dreamland Wedding Planner" layout) using
// XX Event Design's real brand colors + copy. Photos are placeholders for now.

const dStyles = {
  bg: '#FFFDF9',
  bgTint: '#FAF3EA',
  ink: '#241A14',
  inkSoft: '#6B5240',
  rule: 'rgba(36,26,20,0.1)',
  accent: XX_BRAND.burgundy,
  serif: '"Cormorant Garamond", "Playfair Display", Georgia, serif',
  sans: '"Inter", system-ui, sans-serif',
};

const R = (dev, d, t, m) => (dev === 'mobile' ? m : dev === 'tablet' ? t : d);

function DBadgeIcon({ i }) {
  const icons = ['o', 'o', 'o', 'o'];
  return (
    <div style={{
      width: 44, height: 44, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: ['#F3E3EE', '#E9E1F5', '#FCE4D6', '#F6E9CE'][i % 4], fontSize: 18, color: dStyles.accent,
    }}>{icons[i % 4]}</div>
  );
}

function DNav({ device = 'desktop' }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const isMobile = device === 'mobile';
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: R(device, '18px 40px', '16px 28px', '14px 18px'),
      background: dStyles.bg, borderRadius: 16, margin: R(device, '20px 40px 0', '16px 20px 0', '12px 12px 0'),
      boxShadow: '0 2px 16px rgba(36,26,20,0.06)', fontFamily: dStyles.sans,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <XXLogo size={R(device, 38, 34, 30)} />
      </div>
      {!isMobile && (
        <div style={{ display: 'flex', gap: 28, fontSize: 13.5, color: dStyles.ink }}>
          {['Home', 'About', 'Services', 'Gallery', 'Contact us'].map((n, i) => (
            <span key={n} style={{ color: i === 0 ? dStyles.accent : dStyles.ink, cursor: 'pointer', fontWeight: i === 0 ? 600 : 400 }}>{n}</span>
          ))}
        </div>
      )}
      {!isMobile ? (
        <button style={{
          display: 'flex', alignItems: 'center', gap: 6, padding: '11px 20px', borderRadius: 24,
          background: dStyles.accent, color: '#FFFDF9', border: 'none', fontSize: 13, cursor: 'pointer', fontFamily: dStyles.sans,
        }}>Get in touch -></button>
      ) : (
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ width: 40, height: 40, border: 'none', background: 'transparent', display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <span style={{ width: 18, height: 1.5, background: dStyles.ink }} />
          <span style={{ width: 18, height: 1.5, background: dStyles.ink }} />
          <span style={{ width: 18, height: 1.5, background: dStyles.ink }} />
        </button>
      )}
      {isMobile && menuOpen && (
        <div style={{ position: 'absolute', top: 64, left: 12, right: 12, background: dStyles.bg, borderRadius: 12, boxShadow: '0 8px 32px rgba(36,26,20,0.15)', padding: 16, display: 'flex', flexDirection: 'column', gap: 4, zIndex: 30 }}>
          {['Home', 'About', 'Services', 'Gallery', 'Contact us'].map(n => (
            <span key={n} style={{ padding: '12px 8px', fontSize: 15, color: dStyles.ink, borderBottom: `1px solid ${dStyles.rule}` }}>{n}</span>
          ))}
        </div>
      )}
    </nav>
  );
}

function DPill({ children }) {
  return <div style={{ fontSize: 12, letterSpacing: '0.08em', color: dStyles.accent, fontWeight: 600, marginBottom: 10 }}>{children}</div>;
}

function DButton({ label, variant = 'primary' }) {
  const isPrimary = variant === 'primary';
  return (
    <button style={{
      padding: '13px 24px', borderRadius: 24, fontSize: 13.5, fontFamily: dStyles.sans, cursor: 'pointer',
      background: isPrimary ? dStyles.accent : 'transparent',
      color: isPrimary ? '#FFFDF9' : dStyles.ink,
      border: isPrimary ? 'none' : `1px solid ${dStyles.rule}`,
    }}>{label} {isPrimary && '->'}</button>
  );
}

// ---------- HOME ----------
function DreamHome({ device = 'desktop' }) {
  const oneCol = device === 'mobile';
  return (
    <div style={{ background: dStyles.bgTint, fontFamily: dStyles.sans, color: dStyles.ink }}>
      <DNav device={device} />

      {/* Hero */}
      <section style={{ padding: R(device, '64px 40px 0', '48px 24px 0', '32px 16px 0'), textAlign: 'center' }}>
        <h1 style={{
          fontFamily: dStyles.serif, fontWeight: 600, fontSize: R(device, 56, 42, 32), lineHeight: 1.1,
          margin: '0 auto', maxWidth: 680,
        }}>
          Events Designed for <span style={{ color: dStyles.accent, fontStyle: 'italic' }}>Every Story</span>
        </h1>
        <p style={{ fontSize: R(device, 15, 14, 14), color: dStyles.inkSoft, maxWidth: 480, margin: '20px auto 0', lineHeight: 1.7 }}>
          Weddings, milestones, and gatherings across New England. Creativity is our middle name -
          sixteen years of tablescapes, florals, and nights guests still talk about.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 32, flexWrap: 'wrap' }}>
          <DButton label="Book Now" variant="primary" />
          <DButton label="Learn More" variant="secondary" />
        </div>
      </section>

      {/* 4-photo strip */}
      <section style={{ padding: R(device, '48px 40px 80px', '36px 24px 64px', '28px 16px 48px') }}>
        <div style={{ display: 'grid', gridTemplateColumns: R(device, 'repeat(4, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)'), gap: 14 }}>
          {[['plum', 'Ceremony'], ['blush', 'Bouquet'], ['gold', 'Rings'], ['ember', 'First dance']].map(([hue, label], i) => (
            <div key={i} style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '3 / 4' }}>
              <Photo label={label} hue={hue === 'gold' ? 'cream' : hue} w="100%" h="100%" />
            </div>
          ))}
        </div>
      </section>

      {/* About - 3-photo collage + checklist */}
      <section style={{
        padding: R(device, '0 40px 96px', '0 24px 72px', '0 16px 48px'), maxWidth: 1240, margin: '0 auto',
        display: 'grid', gridTemplateColumns: oneCol ? '1fr' : '1fr 1fr', gap: R(device, 56, 36, 32), alignItems: 'center',
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 12 }}>
          <div style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '3 / 4' }}><Photo label="Reception" hue="plum" w="100%" h="100%" /></div>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '1 / 1' }}><Photo label="Details" hue="blush" w="100%" h="100%" /></div>
            <div style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '1 / 1' }}><Photo label="Toast" hue="warm" w="100%" h="100%" /></div>
          </div>
        </div>
        <div>
          <DPill>About Us</DPill>
          <h2 style={{ fontFamily: dStyles.serif, fontWeight: 600, fontSize: R(device, 34, 30, 26), margin: '0 0 16px', lineHeight: 1.2 }}>
            Exceptional Event Design - Right Across New England
          </h2>
          <p style={{ fontSize: 14, color: dStyles.inkSoft, lineHeight: 1.7, marginBottom: 28, maxWidth: 440 }}>
            We specialize in organizing unforgettable events tailored to your vision - from
            intimate showers to full wedding productions.
          </p>
          <div style={{ display: 'grid', gap: 20 }}>
            {[
              ['Expert Event Designers', 'As an experienced studio, we craft tailored celebrations built around your unique story.'],
              ['Managed by professionals', 'Our services are overseen by a team who bring industry knowledge and a commitment to excellence.'],
              ['Dedicated to quality', 'Turning visions into reality - passionate about elegance in every detail.'],
            ].map(([t, b], i) => (
              <div key={t} style={{ display: 'flex', gap: 16 }}>
                <DBadgeIcon i={i} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{t}</div>
                  <div style={{ fontSize: 13.5, color: dStyles.inkSoft, marginTop: 4, lineHeight: 1.6 }}>{b}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services cards */}
      <section style={{ padding: R(device, '80px 40px', '64px 24px', '48px 16px'), background: dStyles.bg, textAlign: 'center' }}>
        <DPill>Our Services</DPill>
        <h2 style={{ fontFamily: dStyles.serif, fontWeight: 600, fontSize: R(device, 34, 30, 26), margin: '0 0 12px' }}>Expertly Planned Occasions</h2>
        <p style={{ fontSize: 14, color: dStyles.inkSoft, maxWidth: 460, margin: '0 auto 48px' }}>We specialize in organizing unforgettable events tailored to your vision.</p>
        <div style={{ display: 'grid', gridTemplateColumns: R(device, 'repeat(4, 1fr)', 'repeat(2, 1fr)', '1fr'), gap: 20, maxWidth: 1180, margin: '0 auto' }}>
          {SERVICES.map((s, i) => (
            <div key={s.cat} style={{ textAlign: 'left', padding: 24, borderRadius: 14, border: `1px solid ${dStyles.rule}` }}>
              <DBadgeIcon i={i} />
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: '18px 0 10px' }}>{s.cat}</h3>
              <p style={{ fontSize: 13, color: dStyles.inkSoft, lineHeight: 1.6, margin: '0 0 14px' }}>
                {s.items.slice(0, 3).join(' · ')}
              </p>
              <a style={{ fontSize: 13, color: dStyles.accent, cursor: 'pointer' }}>Learn more -></a>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section style={{ padding: R(device, '80px 40px 96px', '64px 24px 72px', '48px 16px 56px'), textAlign: 'center' }}>
        <DPill>Pricing</DPill>
        <h2 style={{ fontFamily: dStyles.serif, fontWeight: 600, fontSize: R(device, 34, 30, 26), margin: '0 0 40px' }}>Our Most Popular Package</h2>
        <div style={{ display: 'grid', gridTemplateColumns: R(device, 'repeat(3, 1fr)', 'repeat(3, 1fr)', '1fr'), gap: 20, maxWidth: 980, margin: '0 auto' }}>
          {PACKAGES.map((p) => (
            <div key={p.name} style={{
              textAlign: 'left', padding: 28, borderRadius: 16,
              border: p.featured ? `1px solid ${dStyles.accent}` : `1px solid ${dStyles.rule}`,
              transform: p.featured ? `scale(1.04)` : 'none', background: dStyles.bg,
              boxShadow: p.featured ? '0 20px 48px rgba(122,32,72,0.14)' : 'none',
            }}>
              <div style={{ fontFamily: dStyles.serif, fontSize: 34, fontWeight: 700, color: dStyles.accent }}>{p.price.replace('from ', '').replace('on request', '-')}</div>
              <h3 style={{ fontSize: 19, fontWeight: 600, margin: '14px 0 16px' }}>{p.name}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', fontSize: 13, color: dStyles.inkSoft, lineHeight: 2.1 }}>
                {p.features.map(f => <li key={f} style={{ display: 'flex', gap: 8 }}><span style={{ color: dStyles.accent }}>check</span>{f}</li>)}
              </ul>
              <button style={{
                width: '100%', padding: '13px 0', borderRadius: 24, fontSize: 13, cursor: 'pointer', fontFamily: dStyles.sans,
                background: p.featured ? dStyles.accent : 'transparent', color: p.featured ? '#FFFDF9' : dStyles.ink,
                border: p.featured ? 'none' : `1px solid ${dStyles.rule}`,
              }}>Get Started</button>
            </div>
          ))}
        </div>
      </section>

      <DFooter device={device} />
    </div>
  );
}

// ---------- SECOND PAGE: Testimonial / Blog / Contact ----------
function DreamMore({ device = 'desktop' }) {
  const oneCol = device === 'mobile';
  return (
    <div style={{ background: dStyles.bg, fontFamily: dStyles.sans, color: dStyles.ink }}>
      {/* Testimonial */}
      <section style={{ padding: R(device, '80px 40px', '64px 24px', '48px 16px'), maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
          <div>
            <DPill>Testimonial</DPill>
            <h2 style={{ fontFamily: dStyles.serif, fontWeight: 600, fontSize: R(device, 30, 26, 22), margin: 0 }}>
              Real stories from our <em style={{ fontStyle: 'italic' }}>happy clients</em>
            </h2>
          </div>
          <a style={{ fontSize: 13, color: dStyles.accent, cursor: 'pointer' }}>View all -></a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: oneCol ? '1fr' : '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: R(device, 22, 20, 18), fontWeight: 600, margin: '0 0 16px' }}>Happily Ever After Starts Here</h3>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: dStyles.inkSoft, marginBottom: 14 }}>
              "They turned a tired ballroom into something out of a magazine. Our guests are still
              texting us about the dessert bar."
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: dStyles.inkSoft }}>
              "They listened to our vision and brought it to life flawlessly. We couldn't have done
              it without them."
            </p>
            <div style={{ marginTop: 24, fontWeight: 600 }}>Wendy & Jonathan</div>
            <div style={{ fontSize: 13, color: dStyles.inkSoft }}>Wedding · Newport, RI</div>
          </div>
          <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4 / 5' }}>
            <Photo label="Testimonial" hue="ember" w="100%" h="100%" />
          </div>
        </div>
      </section>

      {/* Blog */}
      <section style={{ padding: R(device, '80px 40px', '64px 24px', '48px 16px'), background: dStyles.bgTint, textAlign: 'center' }}>
        <DPill>Journal</DPill>
        <h2 style={{ fontFamily: dStyles.serif, fontWeight: 600, fontSize: R(device, 30, 26, 22), margin: '0 0 12px' }}>Latest Notes & Stories</h2>
        <p style={{ fontSize: 14, color: dStyles.inkSoft, maxWidth: 460, margin: '0 auto 40px' }}>
          Ideas, behind-the-scenes, and inspiration from recent celebrations.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: R(device, 'repeat(3, 1fr)', 'repeat(2, 1fr)', '1fr'), gap: 20, maxWidth: 1100, margin: '0 auto' }}>
          {[
            ['Intimate Wedding Ideas for Small Venues', 'plum'],
            ['Styling a Dessert Bar Guests Remember', 'ember'],
            ['Five Tablescapes We Keep Coming Back To', 'blush'],
          ].map(([title, hue], i) => (
            <div key={i} style={{ textAlign: 'left', background: dStyles.bg, borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ aspectRatio: '4 / 3' }}><Photo hue={hue} w="100%" h="100%" /></div>
              <div style={{ padding: 20 }}>
                <div style={{ fontSize: 11, color: dStyles.inkSoft, marginBottom: 10 }}>10 Jan 2026</div>
                <h3 style={{ fontSize: 15, fontWeight: 600, margin: '0 0 10px', lineHeight: 1.4 }}>{title}</h3>
                <a style={{ fontSize: 13, color: dStyles.accent, cursor: 'pointer' }}>Read more -></a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: R(device, '80px 40px', '64px 24px', '48px 16px'), maxWidth: 1180, margin: '0 auto', display: 'grid', gridTemplateColumns: oneCol ? '1fr' : '1fr 1fr', gap: 40 }}>
        <div style={{ borderRadius: 16, overflow: 'hidden', aspectRatio: '4 / 5' }}>
          <Photo label="Contact" hue="warm" w="100%" h="100%" />
        </div>
        <div>
          <DPill>Contact</DPill>
          <h2 style={{ fontFamily: dStyles.serif, fontWeight: 600, fontSize: R(device, 28, 24, 22), margin: '0 0 24px' }}>Have a plan? We'd love to hear it!</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {['Name', 'Email', 'Services'].map(l => (
              <input key={l} placeholder={l} style={{ padding: '14px 16px', borderRadius: 10, border: `1px solid ${dStyles.rule}`, fontSize: 14, fontFamily: dStyles.sans, background: dStyles.bgTint }} />
            ))}
            <textarea placeholder="Write here..." rows="4" style={{ padding: '14px 16px', borderRadius: 10, border: `1px solid ${dStyles.rule}`, fontSize: 14, fontFamily: dStyles.sans, background: dStyles.bgTint, resize: 'none' }} />
            <button style={{ padding: '14px 0', borderRadius: 24, background: dStyles.accent, color: '#FFFDF9', border: 'none', fontSize: 14, cursor: 'pointer', fontFamily: dStyles.sans }}>Submit</button>
          </div>
        </div>
      </section>

      <DFooter device={device} />
    </div>
  );
}

function DFooter({ device = 'desktop' }) {
  const oneCol = device === 'mobile';
  return (
    <footer style={{ background: dStyles.bgTint, padding: R(device, '64px 40px 32px', '48px 24px 28px', '36px 16px 24px'), fontFamily: dStyles.sans }}>
      <div style={{ display: 'grid', gridTemplateColumns: oneCol ? '1fr' : '1.4fr 1fr 1fr 1.2fr', gap: 32 }}>
        <div>
          <XXLogo size={38} />
          <p style={{ fontSize: 13, color: dStyles.inkSoft, lineHeight: 1.7, marginTop: 14, maxWidth: 260 }}>
            Your special day should be full of happiness and cherished memories. We make event
            planning delightful.
          </p>
        </div>
        {[
          { h: 'Information', items: ['About Us', 'Gallery', 'Services', 'Contact Us'] },
          { h: 'Support', items: ['FAQs', 'Terms & Condition', 'Privacy policy'] },
        ].map(c => (
          <div key={c.h}>
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>{c.h}</div>
            {c.items.map(i => <div key={i} style={{ fontSize: 13, color: dStyles.inkSoft, lineHeight: 2.2 }}>{i}</div>)}
          </div>
        ))}
        <div>
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14 }}>Contact</div>
          <div style={{ fontSize: 13, color: dStyles.inkSoft, lineHeight: 2.2 }}>
            {SITE.area}<br/>Tel: {SITE.phone}<br/>{SITE.email}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 40, paddingTop: 20, borderTop: `1px solid ${dStyles.rule}`, textAlign: 'center', fontSize: 12, color: dStyles.inkSoft }}>
        © 2026 XX Event Design. All rights reserved.
      </div>
    </footer>
  );
}

Object.assign(window, { DreamHome, DreamMore });
