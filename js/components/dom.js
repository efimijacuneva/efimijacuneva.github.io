// small helpers used by the other modules
// html`` escapes anything you interpolate, so text from the data files is safe

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (ch) => ESCAPES[ch]);

// use this when you're passing in markup you already built
export const raw = (markup) => ({ __raw: String(markup) });

export function html(strings, ...values) {
  return strings.reduce((out, str, i) => {
    if (i === 0) return str;
    const value = values[i - 1];
    let rendered;

    if (value === null || value === undefined || value === false) {
      rendered = '';
    } else if (Array.isArray(value)) {
      rendered = value.map((v) => (v && v.__raw !== undefined ? v.__raw : escapeHtml(v))).join('');
    } else if (value.__raw !== undefined) {
      rendered = value.__raw;
    } else {
      rendered = escapeHtml(value);
    }
    return out + rendered + str;
  }, '');
}

export function mount(id, markup) {
  const host = document.getElementById(id);
  if (host) host.innerHTML = markup;
  return host;
}

export const qs = (selector, scope = document) => scope.querySelector(selector);
export const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
