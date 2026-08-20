// skill cards, built from skillGroups

import { skillGroups } from '../data/skills.js';
import { html, raw, mount } from './dom.js';
import { icons } from './icons.js';

export function initSkills() {
  mount(
    'skills-grid',
    skillGroups
      .map(
        (group) => html`
          <article class="skill-card">
            <div class="skill-card__head">
              <span class="skill-card__icon">${raw(icons[group.icon] || icons.code)}</span>
              <h3 class="skill-card__title">${group.title}</h3>
            </div>
            <p class="skill-card__blurb">${group.blurb}</p>
            <ul class="tag-list">
              ${group.skills.map((skill) => raw(html`<li class="tag">${skill}</li>`))}
            </ul>
          </article>
        `
      )
      .join('')
  );
}
