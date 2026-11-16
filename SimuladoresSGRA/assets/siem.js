'use strict';

(function siem() {
  const { $, $$, esc } = SGRA;
  function rng(seed) { return function () { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const TICK_MIN = 0.5;
  const DUR = 100;
  const START = Date.UTC(2026, 9, 26, 12, 30, 0);
  const { USERS, SRCS, RULES, NOTES, SCN, NORMAL, BENIGN_DOM } = SIEMData;

  let S, timer = null, speed = 1, srcFilter = 'Todas', q = '', selected = null, firstMalT = null;
  function fresh() {
    const scn = $('#scn').value;
    S = { scn, t: 0, ev: [], alerts: [], ioc: SCN[scn].ioc.map((x) => x.slice()), rnd: rng(scn === 's1' ? 11 : scn === 's2' ? 22 : 33), fails: {}, lastNew: 0, done: false };
    selected = null; firstMalT = null;
    srcFilter = "Todas"; q = ""; $("#q").value = "";
    $$("[data-src]").forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.src === srcFilter)));
    RULES.forEach((r) => { r.count = 0; });
  }
  const iocSet = () => new Set(S.ioc.map((x) => x[0]));
  const fmt = (t) => new Date(START + t * TICK_MIN * 60000).toISOString().slice(11, 19);
  function add(e) {
    e.id = S.ev.length; e.t = S.t; e.user = e.user || ''; e.ip = e.ip || ''; e.det = e.det || ''; e.res = e.res || '';
    S.ev.push(e);
    if (e.mal && firstMalT === null) firstMalT = e.t;
    correlate(e);
  }
  function noise() {
    const r = S.rnd, n = 1 + Math.floor(r() * 3);
    for (let k = 0; k < n; k += 1) {
      const u = NORMAL[Math.floor(r() * NORMAL.length)], x = r();
      const camp = r() < 0.7;
      const ip = camp ? `10.20.${30 + Math.floor(r() * 20)}.${10 + Math.floor(r() * 200)}` : `192.0.2.${10 + Math.floor(r() * 200)}`;
      if (x < 0.4) add({ src: 'Autenticación', host: 'SGRA-APP', user: u, ip, geo: camp ? 'Campus' : 'Ecuador', act: 'Inicio de sesión', res: r() < 0.08 ? 'Fallido' : 'Exitoso' });
      else if (x < 0.7) add({ src: 'SGRA', host: 'SGRA-APP', user: u, ip, geo: camp ? 'Campus' : 'Ecuador', act: USERS[u].role === 'Docente' ? 'Registro de asistencia a refuerzo' : 'Consulta de solicitudes de refuerzo' });
      else { const d = BENIGN_DOM[Math.floor(r() * BENIGN_DOM.length)]; add({ src: 'Firewall', host: `LAB-0${1 + Math.floor(r() * 8)}`, user: '', ip: `10.20.30.${10 + Math.floor(r() * 90)}`, act: 'Conexión saliente', det: `${d}:443 permitida`, domain: d }); }
    }
  }
  function raise(rule, key, evs, entity) {
    const open = S.alerts.find((a) => a.rule === rule.id && a.key === key && a.status === 'abierta' && S.t - a.last <= 20);
    if (open) { evs.forEach((e) => { if (!open.events.includes(e.id)) open.events.push(e.id); }); open.last = S.t; return; }
    rule.count += 1;
    S.alerts.push({ id: S.alerts.length + 1, rule: rule.id, sev: rule.sev, key, entity, events: evs.map((e) => e.id), t: S.t, last: S.t, status: 'abierta' });
    S.lastNew = S.alerts.length;
  }
  function correlate(e) {
    const R = Object.fromEntries(RULES.map((r) => [r.id, r]));
    const u = USERS[e.user] || {};
    if (e.act === 'Inicio de sesión' && e.res === 'Fallido') {
      (S.fails[e.user] = S.fails[e.user] || []).push(e);
      const win = S.fails[e.user].filter((f) => S.t - f.t <= 10);
      if (R.R1.on && win.length >= R.R1.n) raise(R.R1, e.user, win, `${e.user} desde ${e.ip}`);
    }
    if (e.act === 'Inicio de sesión' && e.res === 'Exitoso') {
      const prev = (S.fails[e.user] || []).filter((f) => S.t - f.t <= 20);
      if (R.R2.on && prev.length >= 3) { raise(R.R2, e.user, prev.concat(e), `${e.user} desde ${e.ip}`); S.fails[e.user] = []; }
      if (R.R3.on && u.priv && e.geo && !['Campus', 'Ecuador'].includes(e.geo)) raise(R.R3, e.user, [e], `${e.user} desde ${e.geo} (${e.ip})`);
    }
    if (e.act === 'Exportación de registros' && R.R4.on && e.count >= R.R4.n && !(R.R4.ex && u.svc)) raise(R.R4, e.user, [e], `${e.user}: ${e.count} registros`);
    const set = iocSet();
    if (R.R5.on && ((e.domain && set.has(e.domain)) || (e.ip && set.has(e.ip)))) { const k = e.domain && set.has(e.domain) ? e.domain : e.ip; raise(R.R5, k, [e], `Indicador ${k}`); }
    if (R.R6.on && u.disabled) raise(R.R6, e.user, [e], `${e.user} (${e.ip})`);
  }
  function tick() {
    if (S.done || S.t >= DUR) return;
    S.t += 1;
    noise();
    SCN[S.scn].script(S.t, add, S);
    render();
    if (S.t >= DUR) showReport();
  }
  function start() { if (timer || S.done) return; timer = setInterval(tick, 900 / speed); $('#play').textContent = 'Pausar'; $('#play').setAttribute('aria-pressed', 'true'); }
  function stop() { clearInterval(timer); timer = null; $('#play').textContent = S.done ? 'Turno terminado' : 'Reanudar'; $('#play').setAttribute('aria-pressed', 'false'); }

  const truth = (a) => a.events.some((id) => S.ev[id].mal);
  function noteOf(a) { const evs = a.events.map((id) => S.ev[id]); const m = evs.find((e) => e.mal && e.grp) || evs.find((e) => e.grp); return m ? NOTES[m.grp] : 'Coincidencia sin otros indicios en los registros: se documenta y se cierra.'; }
  function stats() {
    const decided = S.alerts.filter((a) => a.status !== 'abierta');
    const correct = decided.filter((a) => (a.status === 'incidente') === truth(a)).length;
    const firstTrue = S.alerts.filter(truth).sort((x, y) => x.t - y.t)[0];
    const mttd = firstMalT === null ? null : firstTrue ? (firstTrue.t - firstMalT) * TICK_MIN : null;
    return { decided: decided.length, correct, open: S.alerts.filter((a) => a.status === 'abierta').length, inc: S.alerts.filter((a) => a.status === 'incidente').length, mttd, tp: S.alerts.filter(truth).length, fp: S.alerts.filter((a) => !truth(a)).length };
  }
  function renderKPIs() {
    const s = stats();
    $('#kpis').innerHTML = `
      <div class="kpi"><b>${S.ev.length}</b><span>eventos procesados</span></div>
      <div class="kpi" style="border-left-color:var(--high)"><b>${s.open}</b><span>alertas abiertas</span></div>
      <div class="kpi" style="border-left-color:var(--crit)"><b>${s.inc}</b><span>incidentes declarados</span></div>
      <div class="kpi" style="border-left-color:var(--gold)"><b>${s.mttd === null ? 'Sin datos' : `${s.mttd} min`}</b><span>tiempo hasta la primera detección</span></div>
      <div class="kpi" style="border-left-color:var(--info)"><b>${s.decided ? `${Math.round((s.correct / s.decided) * 100)} %` : 'Sin datos'}</b><span>acierto en el triaje (${s.correct} de ${s.decided})</span></div>`;
    $('#clock').textContent = `${fmt(S.t)} UTC, minuto ${Math.round(S.t * TICK_MIN)} de ${DUR * TICK_MIN}`;
  }
  function renderEvents() {
    const hl = selected ? new Set(S.alerts[selected - 1].events) : new Set();
    const qq = q.trim().toLowerCase();
    const rows = [];
    for (let i = S.ev.length - 1; i >= 0 && rows.length < 160; i -= 1) {
      const e = S.ev[i];
      if (srcFilter !== 'Todas' && e.src !== srcFilter) continue;
      if (qq && ![e.user, e.ip, e.domain, e.act, e.det, e.host, e.geo].join(' ').toLowerCase().includes(qq)) continue;
      const res = e.res === 'Fallido' ? '<span class="res-f">Fallido</span>' : e.res === 'Exitoso' ? '<span class="res-ok">Exitoso</span>' : '';
      rows.push(`<tr class="${hl.has(e.id) ? 'hl' : ''} ${e.t === S.t ? 'new' : ''}"><td>${fmt(e.t)}</td><td><span class="src">${e.src}</span></td><td>${esc(e.host)}</td><td>${esc(e.user)}</td><td>${esc(e.act)} ${res}</td><td>${esc(e.det)}${e.geo && e.geo !== 'Campus' ? ` <span class="muted">(${esc(e.geo)})</span>` : ''}</td><td class="mono">${esc(e.ip)}</td></tr>`);
    }
    $('#evs').innerHTML = rows.join('') || `<tr><td colspan="7"><div class="empty">${S.ev.length ? 'Ningún evento coincide con el filtro.' : 'Pulsa «Iniciar turno» para recibir eventos del SGRA.'}</div></td></tr>`;
  }
  function renderAlerts() {
    const list = S.alerts.slice().sort((a, b) => (b.status === 'abierta') - (a.status === 'abierta') || b.t - a.t);
    const R = Object.fromEntries(RULES.map((r) => [r.id, r]));
    $('#tab-al').textContent = `Alertas (${S.alerts.filter((a) => a.status === 'abierta').length} abiertas)`;
    $('#alerts').innerHTML = list.map((a) => `<li><button type="button" data-al="${a.id}" aria-current="${selected === a.id}"><span class="sev ${a.sev}">${a.sev === 'critica' ? 'Crítica' : a.sev[0].toUpperCase() + a.sev.slice(1)}</span><b>${R[a.rule].name}</b><span class="st ${a.status === 'abierta' ? 'st-open' : a.status === 'incidente' ? 'st-inc' : 'st-closed'}">${a.status === 'abierta' ? 'Abierta' : a.status === 'incidente' ? 'Incidente' : 'Cerrada'}</span><span class="ent">${fmt(a.t)} UTC, ${esc(a.entity)}, ${a.events.length} evento${a.events.length === 1 ? '' : 's'}</span></button></li>`).join('') || '<li class="empty">Sin alertas todavía. Las reglas activas evalúan cada evento al llegar.</li>';
  }
  function renderRules() {
    $('#pane-ru').innerHTML = RULES.map((r) => `<div class="rule"><label class="switch"><input type="checkbox" data-rule="${r.id}" ${r.on ? 'checked' : ''}><b>${r.id}. ${r.name}</b> <span class="sev ${r.sev}">${r.sev === 'critica' ? 'Crítica' : r.sev[0].toUpperCase() + r.sev.slice(1)}</span><span class="cnt">${r.count || 0} alertas</span></label><p>${r.desc}</p>
      ${r.param ? `<div class="param"><label for="p-${r.id}">${r.param.label}</label><input type="range" id="p-${r.id}" data-param="${r.id}" min="${r.param.min}" max="${r.param.max}" step="${r.param.step}" value="${r.n}"><output for="p-${r.id}" class="mono">${r.n}</output></div>` : ''}
      ${r.id === 'R4' ? `<label class="switch" style="margin-top:.3rem;font-size:.84rem"><input type="checkbox" data-ex="R4" ${r.ex ? 'checked' : ''}>Excepción aprobada: excluir la cuenta de servicio de respaldos documentada</label>` : ''}</div>`).join('') + '<p class="muted" style="font-size:.82rem">Los cambios se aplican a los eventos que llegan desde ahora. Afinar reglas equilibra falsos positivos y detecciones perdidas.</p>';
  }
  function renderIoc() {
    $('#iocs').innerHTML = S.ioc.map(([v, k, s]) => `<li><b class="mono">${esc(v)}</b> <span class="muted">${k}, ${esc(s)}</span></li>`).join('') || '<li class="empty">Sin indicadores cargados. Llegarán con los avisos de inteligencia.</li>';
    $('#tab-io').textContent = `Indicadores (${S.ioc.length})`;
  }
  function renderDetail() {
    const d = $('#detail');
    if (!selected) { d.innerHTML = '<h2>Triaje</h2><div class="empty">Selecciona una alerta para analizarla. Un evento no es un incidente hasta que el triaje lo valida.</div>'; return; }
    const a = S.alerts[selected - 1], r = RULES.find((x) => x.id === a.rule), evs = a.events.map((id) => S.ev[id]);
    const users = [...new Set(evs.map((e) => e.user).filter(Boolean))];
    let fbHtml = '';
    if (a.status !== 'abierta') {
      const ok = (a.status === 'incidente') === truth(a);
      const pd = evs.some((e) => e.pd);
      fbHtml = `<div class="fb ${ok ? 'ok' : 'bad'}"><div><b>${ok ? 'Decisión correcta.' : truth(a) ? 'Era un incidente.' : 'Era un falso positivo o un evento sin incidente.'}</b> ${noteOf(a)}${a.status === 'incidente' && truth(a) ? ` Siguiente fase: contención, preservando la evidencia.${pd ? ' Hay datos personales involucrados: notificar al delegado de protección de datos.' : ''}` : ''}</div></div>`;
    }
    d.innerHTML = `<h2>${r.name} <span class="sev ${a.sev}">${a.sev === 'critica' ? 'Crítica' : a.sev[0].toUpperCase() + a.sev.slice(1)}</span> <span class="hint">Alerta ${a.id}, ${fmt(a.t)} UTC</span></h2>
      <p style="margin:.1rem 0" class="muted">${r.desc}</p>
      <p style="margin:.3rem 0"><b>Entidad:</b> ${users.map((u) => `${esc(u)} (${USERS[u] ? USERS[u].role : 'sin registro'})`).join(', ') || esc(a.entity)}</p>
      <div class="scroll" style="max-height:9rem"><table class="tbl"><thead><tr><th>Hora</th><th>Evento</th><th>Detalle</th><th>IP</th></tr></thead><tbody>${evs.map((e) => `<tr><td>${fmt(e.t)}</td><td>${esc(e.act)} ${e.res ? `(${e.res})` : ''}</td><td>${esc(e.det)} ${e.geo && e.geo !== 'Campus' ? `<span class="muted">${esc(e.geo)}</span>` : ''}</td><td class="mono">${esc(e.ip)}</td></tr>`).join('')}</tbody></table></div>
      <p style="margin:.4rem 0 0"><b>Preguntas de triaje</b></p><ul class="qs">${r.qs.map((x) => `<li>${x}</li>`).join('')}</ul>
      <p class="muted" style="font-size:.82rem;margin:0">Consejo: busca el usuario o la IP en el flujo de eventos para ver qué pasó antes y después.</p>
      ${a.status === 'abierta' ? `<div class="decide"><button type="button" class="btn" data-dec="cerrada">Cerrar sin incidente</button><button type="button" class="btn danger" data-dec="incidente">Declarar incidente</button></div>` : ''}${fbHtml}`;
  }
  function render() { renderKPIs(); renderEvents(); renderAlerts(); renderIoc(); renderDetail(); $$('#pane-ru .cnt').forEach((node, i) => { node.textContent = `${RULES[i].count} alertas`; }); }

  function showReport() {
    S.done = true; stop();
    const s = stats(), R = Object.fromEntries(RULES.map((r) => [r.id, r]));
    const covered = new Set(S.alerts.flatMap((a) => a.events));
    const missed = S.ev.filter((e) => e.mal && !covered.has(e.id));
    const recs = [];
    const fpR4 = S.alerts.some((a) => a.rule === 'R4' && !truth(a));
    if (fpR4) recs.push('La exportación del respaldo programado generó un falso positivo: aplica la excepción aprobada para la cuenta de servicio en lugar de subir el umbral.');
    if (missed.some((e) => e.act === 'Exportación de registros')) recs.push('La exportación de datos personales quedó sin alerta: revisa el umbral de R4 o si la regla está activa.');
    if (missed.some((e) => e.act === 'Cancelación de una solicitud de refuerzo')) recs.push('Ninguna regla cubre la cancelación de solicitudes tras un acceso sospechoso: propón una regla nueva como lección aprendida.');
    if (missed.some((e) => e.act === 'Inicio de sesión')) recs.push('Hubo inicios de sesión maliciosos sin alerta: revisa R1, R2 y R3.');
    if (missed.some((e) => e.domain || e.src === 'Correo')) recs.push('Hubo eventos con indicadores de compromiso sin alerta: mantén R5 activa y la lista de IoC actualizada.');
    if (S.alerts.some((a) => a.status === 'abierta')) recs.push('Quedaron alertas abiertas: un triaje pendiente retrasa la declaración y la contención.');
    if (!recs.length) recs.push('Turno bien gestionado: las reglas detectaron la actividad maliciosa y el triaje separó incidentes de falsos positivos.');
    $('#rep-body').innerHTML = `<div class="rep-grid">
      <div class="kpi"><b>${S.alerts.length}</b><span>alertas generadas</span></div>
      <div class="kpi" style="border-left-color:var(--crit)"><b>${s.tp}</b><span>alertas con actividad maliciosa</span></div>
      <div class="kpi" style="border-left-color:var(--gold)"><b>${s.fp}</b><span>falsos positivos o eventos sin incidente</span></div>
      <div class="kpi" style="border-left-color:var(--info)"><b>${s.decided ? `${s.correct} de ${s.decided}` : '0'}</b><span>decisiones de triaje correctas</span></div>
      <div class="kpi"><b>${s.mttd === null ? (firstMalT === null ? 'No aplica' : 'Sin detección') : `${s.mttd} min`}</b><span>tiempo hasta la primera detección</span></div></div>
      <h3 style="margin:.3rem 0">Eventos maliciosos sin alerta (${missed.length})</h3>
      ${missed.length ? `<table class="tbl"><thead><tr><th>Hora</th><th>Evento</th><th>Usuario</th><th>Detalle</th></tr></thead><tbody>${missed.map((e) => `<tr><td>${fmt(e.t)}</td><td>${esc(e.act)}</td><td>${esc(e.user)}</td><td>${esc(e.det || e.domain || '')}</td></tr>`).join('')}</tbody></table>` : `<p class="muted">${firstMalT === null ? 'Este escenario no tenía actividad maliciosa.' : 'Todas las acciones maliciosas quedaron cubiertas por alguna alerta.'}</p>`}
      <h3 style="margin:.6rem 0 .3rem">Lecciones para afinar el SIEM</h3><ul>${recs.map((x) => `<li>${x}</li>`).join('')}</ul>
      <p class="muted" style="font-size:.84rem">Alertas por regla: ${RULES.map((r) => `${r.id} ${R[r.id].count || 0}`).join(', ')}.</p>`;
    $('#report').hidden = false; $('#rep-close').focus();
  }

  /* Eventos de la interfaz */
  $('#srcs').innerHTML = ['Todas'].concat(SRCS).map((s) => `<button type="button" class="chip" data-src="${s}" aria-pressed="${s === 'Todas'}">${s}</button>`).join(' ');
  $('#srcs').addEventListener('click', (e) => { const b = e.target.closest('[data-src]'); if (!b) return; srcFilter = b.dataset.src; $$('[data-src]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); renderEvents(); });
  $('#q').addEventListener('input', (e) => { q = e.target.value; renderEvents(); });
  $('#play').addEventListener('click', () => { if (S.t >= DUR) return; if (timer) stop(); else start(); });
  $('#step').addEventListener('click', () => { if (S.t < DUR) { tick(); tick(); } });
  $('#reset').addEventListener('click', () => { stop(); $('#report').hidden = true; fresh(); $('#play').textContent = 'Iniciar turno'; renderRules(); render(); });
  $('#scn').addEventListener('change', () => $('#reset').click());
  $('#end').addEventListener('click', () => { stop(); showReport(); });
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => { speed = Number(b.dataset.speed); $$('[data-speed]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); if (timer) { clearInterval(timer); timer = setInterval(tick, 900 / speed); } }));
  $$('[data-tab]').forEach((b) => b.addEventListener('click', () => { $$('[data-tab]').forEach((x) => x.setAttribute('aria-selected', String(x === b))); ['al', 'ru', 'io'].forEach((k) => { $(`#pane-${k}`).hidden = k !== b.dataset.tab; }); }));
  $('#alerts').addEventListener('click', (e) => { const b = e.target.closest('[data-al]'); if (!b) return; selected = Number(b.dataset.al); renderAlerts(); renderDetail(); renderEvents(); $('#detail').scrollTop = 0; });
  $('#detail').addEventListener('click', (e) => { const b = e.target.closest('[data-dec]'); if (!b || !selected) return; const a = S.alerts[selected - 1]; a.status = b.dataset.dec; a.decided = S.t; render(); });
  $('#pane-ru').addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.rule) RULES.find((r) => r.id === t.dataset.rule).on = t.checked;
    if (t.dataset.ex) RULES.find((r) => r.id === 'R4').ex = t.checked;
  });
  $('#pane-ru').addEventListener('input', (e) => { const t = e.target; if (!t.dataset.param) return; const r = RULES.find((x) => x.id === t.dataset.param); r.n = Number(t.value); t.nextElementSibling.textContent = t.value; });
  $('#rep-close').addEventListener('click', () => { $('#report').hidden = true; });
  $('#rep-reset').addEventListener('click', () => { $('#report').hidden = true; $('#reset').click(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('#report').hidden = true; });

  fresh(); renderRules(); render();
})();
