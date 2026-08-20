// nav, mobile menu, theme toggle, scroll spy and the scroll-in animation

import { site } from '../data/site.js';
import { html, mount, qs, qsa } from './dom.js';
import { icons } from './icons.js';

const THEME_KEY = 'ec-theme';

// the initial theme is set by the inline script in index.html so there's no
// flash on load. this just handles clicking the toggle afterwards
export function initTheme() {
  const toggle = qs('#theme-toggle');
  if (!toggle) return;

  const sync = () => {
    const isLight = document.documentElement.dataset.theme === 'light';
    toggle.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    toggle.setAttribute('aria-pressed', String(isLight));
  };

  toggle.innerHTML =
    `<span class="theme-icon-light">${icons.moon}</span>` +
    `<span class="theme-icon-dark">${icons.sun}</span>`;

  toggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // storage can be blocked in private mode, toggle still works for the session
    }
    sync();
  });

  sync();
}

export function initNav() {
  mount(
    'primary-nav',
    site.nav
      .map((item) => html`<a class="nav__link" href="#${item.id}">${item.label}</a>`)
      .join('')
  );

  const nav = qs('#primary-nav');
  const toggle = qs('#nav-toggle');
  const header = qs('#site-header');

  if (toggle && nav) {
    toggle.innerHTML = icons.menu;

    const setOpen = (open) => {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      toggle.innerHTML = open ? icons.close : icons.menu;
    };

    setOpen(false);
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.addEventListener('click', (e) => {
      if (e.target.closest('.nav__link')) setOpen(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });
    // close it if the window gets wide enough for the desktop nav
    window.matchMedia('(min-width: 821px)').addEventListener('change', (e) => {
      if (e.matches) setOpen(false);
    });
  }

  if (header) {
    const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // highlight the nav link for whatever section you're looking at
  const links = qsa('.nav__link', nav);
  const sections = site.nav.map((item) => document.getElementById(item.id)).filter(Boolean);

  if (!sections.length || !('IntersectionObserver' in window)) return;

  const visible = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });

      const current = site.nav.find((item) => visible.has(item.id));
      links.forEach((link) =>
        link.setAttribute('aria-current', String(!!current && link.hash === `#${current.id}`))
      );
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

// fade sections in as you scroll to them
export function initReveal() {
  const items = qsa('.reveal');
  if (!items.length) return;

  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    !('IntersectionObserver' in window)
  ) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
  );

  items.forEach((el) => observer.observe(el));
}
