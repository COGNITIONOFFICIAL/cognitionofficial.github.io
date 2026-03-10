/* ═══════════════════════════════════════════
   COGNITION COACHING CENTRE – SCRIPT.JS
   Vanilla JS · No Dependencies · GitHub Pages Compatible
═══════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── DOM READY ── */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setupNavbar();
    setupHamburger();
    setupScrollReveal();
    setupParallax();
    createParticles();
    setupTestimonialSlider();
    setupNoteTabs();
    setupFloatingButtons();
    setupSectionSpy();
    setupCounters();
    setupCourseCardStagger();
    setupTopperCardStagger();
    setupScrollIndicator();
    setupSmoothScroll();
    setupScrollBgShift();
  }

  /* ═══════════════════════════════════════════
     NAVBAR – scroll effect & hide/show
  ═══════════════════════════════════════════ */
  function setupNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    function onScroll() {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ═══════════════════════════════════════════
     HAMBURGER MENU
  ═══════════════════════════════════════════ */
  function setupHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    // Create overlay backdrop
    let overlay = document.getElementById('navOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'navOverlay';
      overlay.className = 'nav-overlay';
      document.body.appendChild(overlay);
    }

    let isOpen = false;

    function openMenu() {
      isOpen = true;
      navLinks.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      isOpen = false;
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () => isOpen ? closeMenu() : openMenu());
    overlay.addEventListener('click', closeMenu);

    // Close on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });
  }

  /* ═══════════════════════════════════════════
     SCROLL REVEAL ANIMATIONS
  ═══════════════════════════════════════════ */
  function setupScrollReveal() {
    const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  /* ═══════════════════════════════════════════
     PARALLAX – mouse-move on Hero + scroll on About
  ═══════════════════════════════════════════ */
  function setupParallax() {
    const hero        = document.querySelector('.hero');
    const video       = document.getElementById('heroVideo');
    const heroContent = document.getElementById('heroContent');
    if (!hero) return;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    hero.addEventListener('mousemove', (e) => {
      const rect    = hero.getBoundingClientRect();
      const centerX = rect.width  / 2;
      const centerY = rect.height / 2;
      targetX = (e.clientX - rect.left  - centerX) / centerX;
      targetY = (e.clientY - rect.top - centerY) / centerY;
    });

    hero.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });

    (function animateParallax() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      if (video) {
        video.style.transform = `scale(1.06) translate(${currentX * 12}px, ${currentY * 8}px)`;
      }
      if (heroContent) {
        heroContent.style.transform = `translate(${currentX * -4}px, ${currentY * -3}px)`;
      }
      requestAnimationFrame(animateParallax);
    })();

    // Scroll parallax for About section background
    const aboutBg = document.querySelector('.about-parallax-bg');
    if (aboutBg) {
      window.addEventListener('scroll', () => {
        aboutBg.style.transform = `translateY(${window.scrollY * 0.12}px)`;
      }, { passive: true });
    }
  }

  /* ═══════════════════════════════════════════
     FLOATING PARTICLES in Hero
  ═══════════════════════════════════════════ */
  function createParticles() {
    const container = document.getElementById('heroParticles');
    if (!container) return;

    for (let i = 0; i < 22; i++) {
      const p    = document.createElement('div');
      p.className = 'particle';
      const size  = Math.random() * 6 + 3;
      const left  = Math.random() * 100;
      const top   = Math.random() * 100 + 20;
      const delay = Math.random() * 8;
      const dur   = Math.random() * 6 + 6;
      const alpha = Math.random() * 0.5 + 0.2;
      const isGold = Math.random() > 0.45;
      p.style.cssText = `
        width:${size}px; height:${size}px;
        left:${left}%; top:${top}%;
        animation-delay:${delay}s; animation-duration:${dur}s;
        background:${isGold ? `rgba(255,184,0,${alpha})` : `rgba(155,77,202,${alpha})`};
      `;
      container.appendChild(p);
    }
  }

  /* ═══════════════════════════════════════════
     TESTIMONIAL SLIDER
  ═══════════════════════════════════════════ */
  function setupTestimonialSlider() {
    const slides       = document.querySelectorAll('.testimonial-slide');
    const dotsWrap     = document.getElementById('sliderDots');
    const prevBtn      = document.getElementById('sliderPrev');
    const nextBtn      = document.getElementById('sliderNext');
    const sliderEl     = document.getElementById('testimonialSlider');
    if (!slides.length || !dotsWrap) return;

    let current   = 0;
    let autoTimer = null;

    // Build dots
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => { clearAuto(); goTo(i); startAuto(); });
      dotsWrap.appendChild(dot);
    });

    function updateDots() {
      dotsWrap.querySelectorAll('.dot').forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function goTo(index) {
      slides[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      updateDots();
    }

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    if (prevBtn) prevBtn.addEventListener('click', () => { clearAuto(); prev(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { clearAuto(); next(); startAuto(); });

    function startAuto() { autoTimer = setInterval(next, 5000); }
    function clearAuto()  { clearInterval(autoTimer); }

    startAuto();

    // Touch / swipe support
    if (sliderEl) {
      let touchStartX = 0;
      sliderEl.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
      sliderEl.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { clearAuto(); diff > 0 ? next() : prev(); startAuto(); }
      }, { passive: true });
    }
  }

  /* ═══════════════════════════════════════════
     NOTES PDF TAB SWITCHER
  ═══════════════════════════════════════════ */
  function setupNoteTabs() {
    const tabs   = document.querySelectorAll('.notes-tab');
    const viewer = document.getElementById('pdfViewer');
    if (!tabs.length || !viewer) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const pdf = tab.getAttribute('data-pdf');
        if (pdf) {
          viewer.style.opacity = '0';
          viewer.style.transition = 'opacity .25s';
          setTimeout(() => { viewer.src = pdf; viewer.style.opacity = '1'; }, 260);
        }
      });
    });
  }

  /* ═══════════════════════════════════════════
     FLOATING CONTACT BUTTONS
  ═══════════════════════════════════════════ */
  function setupFloatingButtons() {
    const wrap = document.getElementById('floatingBtns');
    if (!wrap) return;

    // Show after 2 s delay
    setTimeout(() => wrap.classList.add('visible'), 2000);

    // Also show on first scroll
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) wrap.classList.add('visible');
    }, { passive: true, once: true });

    // Shake every 9 s to attract attention
    function shakeButtons() {
      wrap.querySelectorAll('.float-btn').forEach((btn, i) => {
        setTimeout(() => {
          btn.classList.add('shake');
          btn.addEventListener('animationend', () => btn.classList.remove('shake'), { once: true });
        }, i * 320);
      });
    }

    setTimeout(shakeButtons, 5000);
    setInterval(shakeButtons, 9000);
  }

  /* ═══════════════════════════════════════════
     ACTIVE SECTION HIGHLIGHTING in Navbar
  ═══════════════════════════════════════════ */
  function setupSectionSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const active = link.getAttribute('href') === '#' + id;
            link.classList.toggle('active', active);
          });
        }
      });
    }, { threshold: 0.35, rootMargin: '-70px 0px -30% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  /* ═══════════════════════════════════════════
     COUNTER ANIMATION for Hero Stats
  ═══════════════════════════════════════════ */
  function setupCounters() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;

    let triggered = false;

    function animateCounters() {
      if (triggered) return;
      triggered = true;
      document.querySelectorAll('.stat-num').forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target') || stat.textContent);
        const suffix = stat.getAttribute('data-suffix') || stat.textContent.replace(/\d+/, '');
        if (!target) return;
        let current   = 0;
        const increment = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current = Math.min(current + increment, target);
          stat.textContent = current + suffix;
          if (current >= target) clearInterval(timer);
        }, 25);
      });
    }

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { setTimeout(animateCounters, 1100); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(heroSection);
  }

  /* ═══════════════════════════════════════════
     COURSE CARD stagger on scroll
  ═══════════════════════════════════════════ */
  function setupCourseCardStagger() {
    const cards = document.querySelectorAll('.course-card');
    if (!cards.length) return;

    cards.forEach((card, i) => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(40px)';
      card.style.transition = `opacity .55s ease ${i * 0.1}s, transform .55s ease ${i * 0.1}s`;
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'none';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
  }

  /* ═══════════════════════════════════════════
     TOPPER CARD stagger + gold glow
  ═══════════════════════════════════════════ */
  function setupTopperCardStagger() {
    const cards = document.querySelectorAll('.topper-card');
    if (!cards.length) return;

    cards.forEach((card, i) => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(40px)';
      card.style.transition = `opacity .55s ease ${i * 0.1}s, transform .55s ease ${i * 0.1}s`;
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'none';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));

    // Dynamic gold-glow on mouse move
    cards.forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width)  * 100;
        const y = ((e.clientY - rect.top)  / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    });
  }

  /* ═══════════════════════════════════════════
     SCROLL INDICATOR – fade out on scroll
  ═══════════════════════════════════════════ */
  function setupScrollIndicator() {
    const el = document.getElementById('scrollIndicator');
    if (!el) return;
    window.addEventListener('scroll', () => {
      el.style.opacity = window.scrollY > 80 ? '0' : '1';
    }, { passive: true });
  }

  /* ═══════════════════════════════════════════
     SMOOTH SCROLL for anchor links
  ═══════════════════════════════════════════ */
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ═══════════════════════════════════════════
     SCROLL-TRIGGERED BG SHIFT for Hero overlay
  ═══════════════════════════════════════════ */
  function setupScrollBgShift() {
    const hero    = document.querySelector('.hero');
    const overlay = hero && hero.querySelector('.hero-overlay');
    if (!overlay) return;

    window.addEventListener('scroll', () => {
      const progress = Math.min(window.scrollY / (hero.offsetHeight || 1), 1);
      overlay.style.opacity = (0.78 + progress * 0.2).toString();
    }, { passive: true });
  }

})();
