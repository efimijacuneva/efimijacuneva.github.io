// builds the architecture diagrams from a project's `flow` array
// css flips it to a vertical stack under 720px

import { html, raw } from './dom.js';
import { connectorSvg } from './icons.js';

export function flowDiagram(flow, caption, label) {
  if (!flow || !flow.length) return '';

  const nodes = flow.map((node, i) => {
    const connector =
      i < flow.length - 1
        ? html`<li class="flow__link" aria-hidden="true">${raw(connectorSvg)}</li>`
        : '';

    return raw(html`
      <li class="flow__node" data-tone="${node.tone || 'engine'}">
        <span class="flow__label">${node.label}</span>
        ${node.sub ? raw(html`<span class="flow__sub">${node.sub}</span>`) : ''}
      </li>
      ${raw(connector)}
    `);
  });

  // ol because it really is a sequence of steps
  return html`
    <figure class="diagram">
      <div class="diagram__scroll">
        <ol class="flow" aria-label="${label || 'Architecture flow'}">
          ${nodes}
        </ol>
      </div>
      ${caption ? raw(html`<figcaption class="diagram__caption">${caption}</figcaption>`) : ''}
    </figure>
  `;
}
