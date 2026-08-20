// the "how i work" section. each stage links to the projects that show it

import { approachStages } from '../data/skills.js';
import { projects } from '../data/projects.js';
import { html, raw, mount } from './dom.js';

const titleFor = (id) => (projects.find((p) => p.id === id) || {}).title || id;

export function initApproach() {
  mount(
    'approach-list',
    approachStages
      .map(
        (stage) => html`
          <article class="stage">
            <div class="stage__step" aria-hidden="true">${stage.step}</div>
            <div>
              <h3 class="stage__title">${stage.title}</h3>
              <p class="stage__lede">${stage.lede}</p>
            </div>
            <div class="stage__body-wrap">
              <p class="stage__body">${stage.body}</p>
              <div class="stage__refs">
                ${stage.projectIds.map(
                  (id) => raw(html`
                    <button type="button" class="ref-link" data-open-project="${id}">
                      ${titleFor(id)}
                      <span class="visually-hidden">- open project details</span>
                    </button>
                  `)
                )}
              </div>
            </div>
          </article>
        `
      )
      .join('')
  );
}
