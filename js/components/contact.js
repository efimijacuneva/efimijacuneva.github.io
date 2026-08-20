// contact section, the links under the hero, and the footer
// everything reads from site.links so there's one place to change them

import { site } from '../data/site.js';
import { html, raw, mount, qs } from './dom.js';
import { icons } from './icons.js';

// skips anything set to null in site.js
function linkEntries() {
  const { email, github, linkedin, resume } = site.links;
  return [
    email && {
      key: 'email',
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      icon: icons.mail,
      external: false,
    },
    linkedin && {
      key: 'linkedin',
      label: 'LinkedIn',
      value: linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: linkedin,
      icon: icons.linkedin,
      external: true,
    },
    github && {
      key: 'github',
      label: 'GitHub',
      value: github.replace(/^https?:\/\/(www\.)?/, ''),
      href: github,
      icon: icons.github,
      external: true,
    },
    resume && {
      key: 'resume',
      label: 'CV',
      value: 'Download PDF',
      href: resume,
      icon: icons.fileText,
      external: true,
    },
  ].filter(Boolean);
}

const targetAttrs = (entry) =>
  entry.external ? raw(' target="_blank" rel="noopener noreferrer"') : raw('');

const externalHint = (entry) =>
  entry.external ? raw('<span class="visually-hidden"> (opens in a new tab)</span>') : '';

export function initContact() {
  const entries = linkEntries();

  mount(
    'hero-links',
    entries
      .map(
        (entry) => html`
          <a href="${entry.href}"${targetAttrs(entry)}>
            ${raw(entry.icon)}${entry.label}${externalHint(entry)}
          </a>
        `
      )
      .join('')
  );

  mount(
    'contact-links',
    entries
      .map(
        (entry) => html`
          <a class="contact-link" href="${entry.href}"${targetAttrs(entry)}>
            <span class="contact-link__icon">${raw(entry.icon)}</span>
            <span>
              <span class="contact-link__label">${entry.label}</span>
              <span class="contact-link__value">${entry.value}</span>
            </span>
            <span class="contact-link__arrow" aria-hidden="true">${raw(icons.arrowUpRight)}</span>
            ${externalHint(entry)}
          </a>
        `
      )
      .join('')
  );

  mount(
    'footer-links',
    entries
      .map((entry) => html`<a href="${entry.href}"${targetAttrs(entry)}>${entry.label}${externalHint(entry)}</a>`)
      .join('')
  );

  const year = qs('#footer-year');
  if (year) year.textContent = String(new Date().getFullYear());
}

export function initCopy() {
  const set = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };

  set('hero-name', site.name);
  set('hero-intro', site.intro);
  set('contact-prompt', site.contactPrompt);
  set('contact-body', site.contactBody);
  set('brand-name', site.name);
  set('hero-location', site.location);

  // photo is optional, hero goes two-column only if there is one
  const portrait = qs('#hero-portrait');
  if (portrait && site.photo && site.photo.src) {
    portrait.innerHTML = html`
      <img src="${site.photo.src}" alt="${site.photo.alt || site.name}"
           width="520" height="520" loading="eager" decoding="async">
    `;
    const inner = qs('.hero__inner');
    if (inner) inner.classList.add('has-portrait');
  }

  const role = qs('#hero-role');
  if (role) role.innerHTML = html`${site.role} <strong>/</strong> ${site.focus}`;

  const cta = qs('#contact-cta');
  if (cta && site.links.email) {
    cta.href = `mailto:${site.links.email}`;
  } else if (cta) {
    cta.setAttribute('aria-disabled', 'true');
  }
}
