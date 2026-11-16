'use strict';

const SGRA = (() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const sidebarMarkup = `
  <aside class="sgra-sidebar" aria-label="Simuladores de seguridad">
    <div class="sgra-brand"><svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m1 6 9-4 9 4-9 4-9-4Zm4 2v5c3 3 7 3 10 0V8m4-2v6"/></svg><strong>SGRA</strong><small>Módulo de Seguridad Informática</small></div>
    <nav class="sgra-nav" id="sgra-nav" aria-label="Simuladores">
        <a href="./Simulador_SIEM_SGRA.html" data-module="siem" aria-label="SIEM"><svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 10h4l2-5 4 10 2-5h4"/></svg><span>SIEM</span></a>
        <a href="./Simulador_ID_AM_SGRA.html" data-module="idam" aria-label="ID.AM"><svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="13" rx="2"/><path d="M7 3v3m6-3v3m-7 4h8m-8 3h6"/></svg><span>ID.AM</span></a>
        <a href="./Simulador_EDR_SGRA.html" data-module="edr" aria-label="EDR"><svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m10 2 7 3v5c0 4-3 6-7 8-4-2-7-4-7-8V5l7-3Z"/><path d="m7 10 2 2 4-4"/></svg><span>EDR</span></a>
    </nav>
  </aside>
`;
  const headerMarkup = `
    <header class="sgra-header">
      <button type="button" class="sgra-menu" id="sgra-menu" aria-label="Mostrar u ocultar navegación de simuladores" aria-controls="sgra-nav" aria-expanded="true"><svg viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 5h14M3 10h14M3 15h14"/></svg></button>
      <strong>SGRA | Sistema de Gestión de Refuerzos Académicos</strong>
      <div class="sgra-prefs" role="group" aria-label="Ajustes de visualización"><button type="button" class="tb" id="zoom-out" aria-label="Reducir el texto">A−</button><button type="button" class="tb" id="zoom-in" aria-label="Ampliar el texto">A+</button></div>
    </header>
`;

  const sidebar = $('[data-sgra-sidebar]');
  const header = $('[data-sgra-header]');
  sidebar.outerHTML = sidebarMarkup;
  header.outerHTML = headerMarkup;

  const activeLink = $(`#sgra-nav [data-module="${document.body.dataset.simulator}"]`);
  activeLink.setAttribute('aria-current', 'page');

  const menu = $('#sgra-menu');
  menu.addEventListener('click', () => {
    const collapsed = $('.sgra-shell').classList.toggle('is-collapsed');
    menu.setAttribute('aria-expanded', String(!collapsed));
  });
  const root = document.documentElement;
  let z = 1;
  const setZ = (v) => { z = Math.min(1.6, Math.max(0.75, Math.round(v * 100) / 100)); root.style.setProperty('--z', z); };
  $('#zoom-out').addEventListener('click', () => setZ(z - 0.1));
  $('#zoom-in').addEventListener('click', () => setZ(z + 0.1));

  return { $, $$, esc };
})();
