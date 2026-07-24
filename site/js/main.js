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
