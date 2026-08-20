// education + experience timeline

import { timeline } from '../data/site.js';
import { html, raw, mount } from './dom.js';

export function initEducation() {
  mount(
    'timeline',
    timeline
      .map(
        (entry) => html`
          <article class="entry">
            <div class="entry__head">
              <h3 class="entry__title">${entry.title}</h3>
              <span class="entry__period">${entry.period}</span>
            </div>
            <p class="entry__org">
              ${entry.org}
              <span class="entry__place"> · ${entry.place}</span>
            </p>
            <ul class="entry__points">
              ${entry.points.map((point) => raw(html`<li>${point}</li>`))}
            </ul>
          </article>
        `
      )
      .join('')
  );
}
