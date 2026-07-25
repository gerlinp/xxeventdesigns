// Mobile nav toggle
(function () {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();

// Contact form validation
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const success = document.getElementById('formSuccess');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const fields = {
    name: { input: document.getElementById('fieldName'), error: document.getElementById('errorName') },
    email: { input: document.getElementById('fieldEmail'), error: document.getElementById('errorEmail') },
    services: { input: document.getElementById('fieldServices'), error: document.getElementById('errorServices') },
  };

  function setFieldError(field, hasError) {
    field.input.classList.toggle('error', hasError);
    field.error.hidden = !hasError;
  }

  function validate() {
    let valid = true;

    const nameOk = fields.name.input.value.trim().length > 0;
    setFieldError(fields.name, !nameOk);
    if (!nameOk) valid = false;

    const emailOk = emailRe.test(fields.email.input.value.trim());
    setFieldError(fields.email, !emailOk);
    if (!emailOk) valid = false;

    const servicesOk = fields.services.input.value.trim().length > 0;
    setFieldError(fields.services, !servicesOk);
    if (!servicesOk) valid = false;

    return valid;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    success.classList.add('visible');
    form.reset();

    setTimeout(() => {
      success.classList.remove('visible');
    }, 2200);
  });
})();

// Gallery lightbox
(function () {
  const items = Array.from(document.querySelectorAll('.gallery-item img'));
  if (!items.length) return;

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  let index = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    lightboxImg.src = items[index].src;
    lightboxImg.alt = items[index].alt;
  }

  function open(i) {
    show(i);
    lightbox.classList.add('open');
  }

  function close() {
    lightbox.classList.remove('open');
  }

  items.forEach((img, i) => {
    img.addEventListener('click', () => open(i));
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => show(index - 1));
  nextBtn.addEventListener('click', () => show(index + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
})();
