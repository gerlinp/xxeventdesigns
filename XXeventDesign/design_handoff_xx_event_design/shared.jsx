// shared.jsx — brand tokens, Logo, Photo placeholder, etc.

// Colors sampled from the ACTUAL logo + live xxeventdesign.com site.
const XX_BRAND = {
  magenta:  '#C43D8E',
  purple:   '#8E3FA6',
  purpleDk: '#6B2C82',
  orange:   '#E8792E',
  orangeDk: '#C75A16',
  gold:     '#D9A441',
  goldDk:   '#8B5E2E',
  burgundy: '#7A2048',
  ink:      '#3D2A1F',
  inkSoft:  '#6B5240',
  cream:    '#FFFDF9',
  creamDk:  '#F7F1E6',
  paper:    '#FFFFFF',
  line:     'rgba(61,42,31,0.12)',
};

const XX_GRADIENT = 'linear-gradient(115deg, #C43D8E 0%, #8E3FA6 32%, #E8792E 68%, #D9A441 100%)';
const XX_GRADIENT_SOFT = 'linear-gradient(115deg, rgba(196,61,142,0.85) 0%, rgba(232,121,46,0.85) 100%)';

// Logo mark — simplified ribbon-style XX glyph using SVG paths
// (renders without the JPG; we keep the JPG for the literal logo file
// the user provided in case they want it embedded later).
// The REAL uploaded logo image (butterfly/ribbon mark + script wordmark).
// Used everywhere instead of a hand-drawn recreation.
function XXLogo({ size = 64, wordmark = false }) {
  const src = (typeof window !== 'undefined' && window.__resources && window.__resources.logoImg) || 'assets/logo.jpg';
  return (
    <img
      src={src}
      alt="XX Event Design"
      style={{
        height: size, width: 'auto', display: 'block', flex: '0 0 auto',
        objectFit: 'contain', ...(wordmark ? {} : { objectPosition: 'left center' }),
      }}
    />
  );
}

// Wordmark — uses the same gradient stops as the logo glyph.
function XXWordmark({ size = 28, tagline = true, color }) {
  const ink = color || XX_BRAND.ink;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
      <div style={{
        fontFamily: '"Alex Brush", "Dancing Script", cursive',
        fontWeight: 400,
        fontSize: size,
        color: ink,
      }}>
        <span style={{
          background: XX_GRADIENT,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>XX</span>
        <span style={{ marginLeft: size * 0.14, fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic' }}>Event Design</span>
      </div>
      {tagline && (
        <div style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontStyle: 'italic',
          fontSize: size * 0.34,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: ink,
          opacity: 0.6,
          marginTop: size * 0.1,
        }}>Creativity is our middle name</div>
      )}
    </div>
  );
}

// Subtle striped placeholder for photography. Tints with brand color, labels
// what kind of image belongs here.
function Photo({ label, w = '100%', h = 240, hue = 'warm', radius = 0, style = {} }) {
  const palettes = {
    warm:   ['#F5D4B5', '#EFAA84', '#D87850'],
    blush:  ['#F4D1D4', '#E8AAB1', '#C97987'],
    plum:   ['#D8B7DE', '#B17BBE', '#7B2E89'],
    ember:  ['#F5C29A', '#EF8F4A', '#A8420F'],
    sage:   ['#CFD9C2', '#A4B393', '#6F8463'],
    night:  ['#5A3A52', '#3A2030', '#1A0E18'],
    cream:  ['#F5EBDA', '#E8D6B8', '#C8A77A'],
  };
  const [a, b, c] = palettes[hue] || palettes.warm;
  const id = 'pat-' + Math.random().toString(36).slice(2, 8);
  return (
    <div style={{
      width: w, height: h, borderRadius: radius, position: 'relative', overflow: 'hidden',
      background: `linear-gradient(135deg, ${a} 0%, ${b} 45%, ${c} 100%)`,
      ...style,
    }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.18 }}>
        <defs>
          <pattern id={id} x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
      {label && (
        <div style={{
          position: 'absolute', left: 12, bottom: 10,
          fontFamily: '"JetBrains Mono", ui-monospace, monospace',
          fontSize: 10, letterSpacing: '0.08em',
          color: 'rgba(255,255,255,0.92)', textTransform: 'uppercase',
          background: 'rgba(0,0,0,0.18)', padding: '4px 8px', borderRadius: 2,
          backdropFilter: 'blur(4px)',
        }}>{label}</div>
      )}
    </div>
  );
}

const SERVICES = [
  { cat: 'Design',     items: ['Venue design', 'Florals', 'Tablescapes', 'Photo backdrops', 'Lighting design', 'Custom linens', 'Seasonal decor'] },
  { cat: 'Planning',   items: ['Venue scouting', 'Budget creation & tracking', 'Itineraries', 'Vendor partnerships', 'Welcome bags'] },
  { cat: 'Experience', items: ['Custom dessert & candy bars', 'Catering', 'Photography', 'Videography', 'Disc jockey'] },
  { cat: 'Day-Of',     items: ['Tenting & staging', 'Event rentals', 'Event staffing', 'Transportation', 'Hosting services', 'Rehearsal dinner', 'Farewell brunch'] },
];

const TESTIMONIALS = [
  { who: 'Wendy & Jonathan', event: 'Wedding · Newport, RI',     quote: 'They turned a tired ballroom into something out of a magazine. Our guests are still texting us about the dessert bar.' },
  { who: 'The Alvarez Family', event: 'Sweet 16 · Worcester, MA', quote: 'Three weeks out, our venue cancelled. XX rebuilt the whole night somewhere new and it was better than what we lost.' },
  { who: 'Priya M.',           event: 'Baby Shower · Boston, MA',  quote: 'Tablescapes, florals, the little welcome bags — every detail landed. I just showed up and enjoyed my own party.' },
  { who: 'Devon & Marcus',     event: 'Anniversary · Cape Cod',    quote: 'Ten years married and they made it feel like the wedding we never got to have. Worth every penny.' },
];

const PACKAGES = [
  { name: 'Soirée',       price: 'from $2,400', tag: 'Intimate gatherings', features: ['Up to 40 guests', 'Design concept + moodboard', 'Tablescape + florals', '1 vendor coordination', 'Day-of styling (4 hrs)'] },
  { name: 'Celebration',  price: 'from $5,800', tag: 'Showers · birthdays · milestones', features: ['Up to 120 guests', 'Full design build', 'Florals, linens, lighting', 'Vendor management (up to 5)', 'Day-of staff (8 hrs)', 'Custom dessert bar'], featured: true },
  { name: 'Signature',    price: 'on request',  tag: 'Weddings · large galas',           features: ['Unlimited guests', 'Concept → execution', 'Full vendor partnerships', 'Venue scouting + scouting trips', 'Multi-day coverage', 'Dedicated lead + assistants'] },
];

const FAQ = [
  { q: 'How far out should we book?',           a: 'For weddings and large events, 9–12 months is ideal. Smaller showers and milestones can be turned around in 6–8 weeks. We do take on rushes when the calendar allows — ask.' },
  { q: 'Do you travel beyond New England?',     a: 'Yes. The bulk of our work is MA, RI, CT, and NH, but we travel anywhere in the Northeast and beyond for the right event. Destination weddings welcome.' },
  { q: 'Can you work with our existing vendors?', a: 'Absolutely. We bring trusted partners but we also love folding in florists, photographers, or caterers you already love.' },
  { q: 'What does the design process look like?', a: 'Discovery call → concept + moodboard → proposal → vendor + logistics build → on-site styling → event day. You get to approve every milestone.' },
  { q: 'Is there a deposit?',                   a: 'A 25% retainer holds your date. The remainder is split into two payments — at concept approval and 14 days before the event.' },
];

const GALLERY = [
  { hue: 'plum',  cat: 'Weddings',     label: 'Wendy & Jonathan · 2024' },
  { hue: 'ember', cat: 'Sweet 16',     label: 'Hailey · enchanted forest' },
  { hue: 'blush', cat: 'Baby Showers', label: 'Pink + peony tablescape' },
  { hue: 'sage',  cat: 'Weddings',     label: 'Outdoor ceremony arch' },
  { hue: 'cream', cat: 'Tablescapes',  label: 'Gold + cream head table' },
  { hue: 'warm',  cat: 'Dessert Bars', label: 'Vintage carnival theme' },
  { hue: 'plum',  cat: 'Lighting',     label: 'Uplit ballroom · Boston' },
  { hue: 'ember', cat: 'Florals',      label: 'Peach garden roses' },
  { hue: 'night', cat: 'Receptions',   label: 'Waterfront night, RI' },
];

const SITE = {
  email: 'cxeventdesign@gmail.com',
  phone: '(508) 436-0848',
  insta: '@xxeventdesign',
  area:  'New England · Boston, Cape Cod, Newport, Worcester',
};

Object.assign(window, {
  XX_BRAND, XX_GRADIENT, XX_GRADIENT_SOFT,
  XXLogo, XXWordmark, Photo,
  SERVICES, TESTIMONIALS, PACKAGES, FAQ, GALLERY, SITE,
});
