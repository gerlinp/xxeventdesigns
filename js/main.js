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
  const formError = document.getElementById('formError');
  const submitBtn = form.querySelector('.contact-submit');
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRe = /^[+]?[\d\s().-]{7,20}$/;

  const fields = {
    name: { input: document.getElementById('fieldName'), error: document.getElementById('errorName') },
    email: { input: document.getElementById('fieldEmail'), error: document.getElementById('errorEmail') },
    phone: { input: document.getElementById('fieldPhone'), error: document.getElementById('errorPhone') },
  };

  function setFieldError(field, hasError) {
    field.input.classList.toggle('error', hasError);
    field.error.hidden = !hasError;
  }

  function isNameOk() {
    return fields.name.input.value.trim().length > 0;
  }

  function isEmailOk() {
    return emailRe.test(fields.email.input.value.trim());
  }

  function isPhoneOk() {
    const phoneValue = fields.phone.input.value.trim();
    const phoneDigits = phoneValue.replace(/\D/g, '');
    return phoneRe.test(phoneValue) && phoneDigits.length >= 7;
  }

  function updateSubmitState() {
    submitBtn.disabled = !(isNameOk() && isEmailOk() && isPhoneOk());
  }

  updateSubmitState();
  form.addEventListener('input', updateSubmitState);

  function formatPhone(value) {
    const digits = value.replace(/\D/g, '').slice(0, 10);
    if (digits.length < 4) return digits;
    if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  fields.phone.input.addEventListener('input', () => {
    fields.phone.input.value = formatPhone(fields.phone.input.value);
  });

  fields.email.input.addEventListener('blur', () => {
    fields.email.input.value = fields.email.input.value.trim().toLowerCase();
  });

  function validate() {
    const nameOk = isNameOk();
    setFieldError(fields.name, !nameOk);

    const emailOk = isEmailOk();
    setFieldError(fields.email, !emailOk);

    const phoneOk = isPhoneOk();
    setFieldError(fields.phone, !phoneOk);

    return nameOk && emailOk && phoneOk;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (formError) formError.hidden = true;
    submitBtn.disabled = true;

    fetch(form.action, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: new FormData(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Request failed');

        success.classList.add('visible');
        form.reset();

        setTimeout(() => {
          success.classList.remove('visible');
        }, 2200);
      })
      .catch(() => {
        if (formError) formError.hidden = false;
      })
      .finally(() => {
        updateSubmitState();
      });
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
