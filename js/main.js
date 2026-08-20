// entry point

import { initTheme, initNav, initReveal } from './components/header.js';
import { initSkills } from './components/skills.js';
import { initProjects } from './components/projects.js';
import { initApproach } from './components/approach.js';
import { initEducation } from './components/education.js';
import { initContact, initCopy } from './components/contact.js';

function boot() {
  initCopy();
  initTheme();
  initNav();
  initSkills();
  initProjects();
  initApproach();
  initEducation();
  initContact();

  // last, so it sees everything that was just rendered
  initReveal();

  // #project-<id> in the url opens that project straight away
  const match = window.location.hash.match(/^#project-([\w-]+)$/);
  if (match) {
    const trigger = document.querySelector(`[data-project="${match[1]}"]`);
    if (trigger) trigger.click();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
