// project cards, the category filter and the details dialog
// all of it comes from the projects array in data/projects.js

import { projects, alsoBuilt, CATEGORIES } from '../data/projects.js';
import { html, raw, qs, qsa } from './dom.js';
import { icons } from './icons.js';
import { flowDiagram } from './flowDiagram.js';

const accentVar = (project) => `--card-accent: var(--cat-${CATEGORIES[project.categories[0]].accent});`;

function techTags(tech, limit) {
  const shown = limit ? tech.slice(0, limit) : tech;
  const rest = limit && tech.length > limit ? tech.length - limit : 0;
  return html`
    <ul class="tag-list">
      ${shown.map((t) => raw(html`<li class="tag">${t}</li>`))}
      ${rest ? raw(html`<li class="tag">+${rest} more</li>`) : ''}
    </ul>
  `;
}

function metricsBlock(metrics) {
  if (!metrics || !metrics.length) return '';
  return html`
    <ul class="card__metrics">
      ${metrics.map(
        (m) => raw(html`
          <li class="metric">
            <div class="metric__value">${m.value}</div>
            <div class="metric__label">${m.label}</div>
          </li>
        `)
      )}
    </ul>
  `;
}

function card(project) {
  const cats = project.categories.map((c) => CATEGORIES[c].label);

  const externalLinks = [
    project.links.github && { href: project.links.github, label: 'GitHub', icon: icons.github },
    project.links.demo && { href: project.links.demo, label: 'Live demo', icon: icons.externalLink },
  ].filter(Boolean);

  return html`
    <article
      class="card ${project.featured ? 'card--featured' : ''}"
      style="${raw(accentVar(project))}"
      data-categories="${project.categories.join(' ')}"
      id="project-${project.id}"
    >
      <div class="card__top">
        <ul class="chip-row">
          ${cats.map((label) => raw(html`<li class="chip">${label}</li>`))}
        </ul>
        ${project.featured ? raw(html`<span class="card__flag">Flagship</span>`) : ''}
      </div>

      <h3 class="card__title">${project.title}</h3>
      <p class="card__tagline">${project.tagline}</p>

      ${raw(project.featured ? metricsBlock(project.metrics) : '')}

      <div class="card__tech">${raw(techTags(project.tech, project.featured ? 12 : 6))}</div>

      <div class="card__foot">
        <button
          type="button"
          class="btn btn--ghost btn--sm card__expand"
          data-project="${project.id}"
        >
          Details<span class="visually-hidden"> about ${project.title}</span>
          ${raw(icons.arrowRight)}
        </button>
        ${externalLinks.map(
          (link) => raw(html`
            <a class="btn btn--ghost btn--sm" href="${link.href}" target="_blank" rel="noopener noreferrer">
              ${raw(link.icon)}${link.label}
              <span class="visually-hidden"> for ${project.title} (opens in a new tab)</span>
            </a>
          `)
        )}
      </div>
    </article>
  `;
}

function dialogContent(project) {
  const externalLinks = [
    project.links.github && { href: project.links.github, label: 'View on GitHub', icon: icons.github },
    project.links.demo && { href: project.links.demo, label: 'Live demo', icon: icons.externalLink },
  ].filter(Boolean);

  return html`
    <div class="dialog__head">
      <div>
        <h2 class="dialog__title" id="project-dialog-title">${project.title}</h2>
        ${project.period ? raw(html`<p class="dialog__period">${project.period}</p>`) : ''}
      </div>
      <button type="button" class="icon-btn" data-close-dialog aria-label="Close project details">
        ${raw(icons.close)}
      </button>
    </div>

    <div class="dialog__body">
      <ul class="chip-row">
        ${project.categories.map((c) => raw(html`<li class="chip">${CATEGORIES[c].label}</li>`))}
      </ul>

      <div class="dialog__section">
        ${project.description.map((p) => raw(html`<p>${p}</p>`))}
      </div>

      ${raw(
        project.flow
          ? html`<div class="dialog__section">
              <h3 class="dialog__label">Architecture</h3>
              ${raw(flowDiagram(project.flow, project.flowCaption, `${project.title} architecture`))}
            </div>`
          : ''
      )}

      ${raw(
        project.metrics && project.metrics.length
          ? html`<div class="dialog__section">
              <h3 class="dialog__label">By the numbers</h3>
              ${raw(metricsBlock(project.metrics))}
            </div>`
          : ''
      )}

      <div class="dialog__section">
        <h3 class="dialog__label">Engineering highlights</h3>
        <div class="highlights">
          ${project.highlights.map(
            (h) => raw(html`
              <div class="highlight">
                <h4 class="highlight__title">${h.title}</h4>
                <p class="highlight__body">${h.body}</p>
              </div>
            `)
          )}
        </div>
      </div>

      <div class="dialog__section">
        <h3 class="dialog__label">Technologies</h3>
        ${raw(techTags(project.tech))}
      </div>

      ${project.links.note ? raw(html`<p class="dialog__note">${project.links.note}</p>`) : ''}

      <div class="dialog__actions">
        ${externalLinks.map(
          (link) => raw(html`
            <a class="btn btn--primary" href="${link.href}" target="_blank" rel="noopener noreferrer">
              ${raw(link.icon)}${link.label}
              <span class="visually-hidden"> (opens in a new tab)</span>
            </a>
          `)
        )}
        <button type="button" class="btn btn--ghost" data-close-dialog>Close</button>
      </div>
    </div>
  `;
}

function renderFilters(host) {
  const counts = Object.keys(CATEGORIES).map((key) => ({
    key,
    label: CATEGORIES[key].label,
    count: projects.filter((p) => p.categories.includes(key)).length,
  }));

  host.innerHTML = html`
    <button type="button" class="filter" data-filter="all" aria-pressed="true">
      All work <span class="filter__count">${projects.length}</span>
    </button>
    ${counts.map(
      (c) => raw(html`
        <button type="button" class="filter" data-filter="${c.key}" aria-pressed="false">
          ${c.label} <span class="filter__count">${c.count}</span>
        </button>
      `)
    )}
    <p class="filter-status" role="status" aria-live="polite"></p>
  `;
}

export function initProjects() {
  const grid = qs('#project-grid');
  const filterHost = qs('#project-filters');
  const dialog = qs('#project-dialog');
  const alsoHost = qs('#also-built');
  if (!grid || !dialog) return;

  // everything renders up front, the filter only narrows it down
  grid.innerHTML = projects.map(card).join('');
  renderFilters(filterHost);

  if (alsoHost) {
    alsoHost.innerHTML = alsoBuilt
      .map(
        (item) => html`
          <li class="mini">
            <h3 class="mini__title">${item.title}</h3>
            <p class="mini__tagline">${item.tagline}</p>
            <p class="mini__tech">${item.tech}</p>
          </li>
        `
      )
      .join('');
  }

  const status = qs('.filter-status', filterHost);

  filterHost.addEventListener('click', (event) => {
    const button = event.target.closest('.filter');
    if (!button) return;

    const filter = button.dataset.filter;
    qsa('.filter', filterHost).forEach((b) =>
      b.setAttribute('aria-pressed', String(b === button))
    );

    let visible = 0;
    qsa('.card', grid).forEach((el) => {
      const match = filter === 'all' || el.dataset.categories.split(' ').includes(filter);
      el.classList.toggle('is-hidden', !match);
      if (match) visible += 1;
    });

    status.textContent =
      filter === 'all'
        ? ''
        : `Showing ${visible} ${visible === 1 ? 'project' : 'projects'} in ${CATEGORIES[filter].label}.`;
  });

  let lastFocused = null;

  const openProject = (id) => {
    const project = projects.find((p) => p.id === id);
    if (!project) return;

    lastFocused = document.activeElement;
    dialog.style.cssText = accentVar(project);
    dialog.innerHTML = dialogContent(project);
    dialog.showModal();
    qs('.dialog__body', dialog).scrollTop = 0;
    qs('[data-close-dialog]', dialog).focus();
  };

  grid.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-project]');
    if (trigger) openProject(trigger.dataset.project);
  });

  // the approach section links back in here
  document.addEventListener('click', (event) => {
    const ref = event.target.closest('[data-open-project]');
    if (ref) openProject(ref.dataset.openProject);
  });

  dialog.addEventListener('click', (event) => {
    // backdrop click or either close button
    if (event.target === dialog || event.target.closest('[data-close-dialog]')) dialog.close();
  });

  // don't wipe the content here. close fires async, so closing and reopening
  // quickly would blank the dialog that was just filled in
  dialog.addEventListener('close', () => {
    if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
  });
}
