/* ── Custom cursor ──────────────────────────────────── */
(function () {
  var dot  = document.getElementById('cursorDot');
  var ring = document.getElementById('cursorRing');
  if (!dot || !ring || !window.matchMedia('(pointer: fine)').matches) return;

  var mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  document.querySelectorAll('a, button, .skill-card, .project-card').forEach(function (el) {
    el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
    el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
  });
}());

/* ── Navbar scroll + hamburger ──────────────────────── */
(function () {
  var navbar    = document.querySelector('.navbar');
  var hamburger = document.querySelector('.hamburger');
  var mobileMenu = document.querySelector('.mobile-menu');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) { navbar.classList.add('scrolled'); }
    else                     { navbar.classList.remove('scrolled'); }
  }, { passive: true });

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }
}());

/* ── Scroll-reveal ──────────────────────────────────── */
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var delay = parseFloat(entry.target.dataset.revealDelay || 0) * 1000;
      setTimeout(function () { entry.target.classList.add('visible'); }, delay);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  els.forEach(function (el) { io.observe(el); });
}());

/* ── Skill bar animation ────────────────────────────── */
(function () {
  var fills = document.querySelectorAll('.skill-fill');
  if (!('IntersectionObserver' in window)) {
    fills.forEach(function (f) { f.style.width = f.dataset.width; });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      var fill = entry.target;
      setTimeout(function () { fill.style.width = fill.dataset.width; }, 200);
      io.unobserve(fill);
    });
  }, { threshold: 0.5 });
  fills.forEach(function (f) { io.observe(f); });
}());

/* ── Contact form (demo) ────────────────────────────── */
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var original = btn.textContent;
    btn.textContent = '✓ Sent!';
    btn.style.background = '#22c55e';
    setTimeout(function () {
      btn.textContent = original;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}());
