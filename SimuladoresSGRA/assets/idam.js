'use strict';

(function idam() {
  const { $, $$ } = SGRA;
  const { SUB, STEPS, NET, UNK, DATA, CLS, OWN, PRIO, FLOWS, SW } = IDAMData;
  const level = (n) => (n >= 8 ? 'Alta' : n >= 6 ? 'Media' : 'Baja');

  let S, cur = 0, scanTimer;
  function resetAssessment() { S.search = null; S.compared = false; S.checked[5] = false; }
  function fresh() {
    clearTimeout(scanTimer);
    S = { auth: false, disc: false, shown: 0, dev: { u1: null, u2: null, u3: null }, sbom: false, sw: { s3: false, s5: false }, eol: null,
      data: Object.fromEntries(DATA.map((d) => [d.k, { cls: '', own: '' }])), cia: Object.fromEntries(PRIO.map((p) => [p.k, [2, 2, 2]])),
      flows: FLOWS.map(() => null), supplier: null, checked: {}, search: null, compared: false };
    cur = 0;
  }
  const qaRegistered = () => S.dev.u1 === 0;
  function coverage() {
    const c = {};
    const chk = (k) => S.checked[k];
    c['ID.AM-01'] = chk(0) ? Object.keys(UNK).filter((k) => S.dev[k] === UNK[k].a).length / 3 : 0;
    const swNeeded = ['s3'].concat(qaRegistered() ? ['s5'] : []);
    c['ID.AM-02'] = chk(1) ? (swNeeded.filter((k) => S.sw[k]).length / swNeeded.length) * (qaRegistered() ? 1 : 0.75) : 0;
    c['ID.AM-08'] = chk(1) ? (S.eol === 0 ? 1 : S.eol === 2 ? 0.6 : 0) : 0;
    c['ID.AM-07'] = chk(2) ? DATA.reduce((a, d) => a + (d.cls.includes(S.data[d.k].cls) ? 0.5 : 0) + (d.own.includes(S.data[d.k].own) ? 0.5 : 0), 0) / DATA.length : 0;
    c['ID.AM-05'] = chk(3) ? PRIO.filter((p) => level(S.cia[p.k].reduce((a, b) => a + b, 0)) === p.lvl).length / PRIO.length : 0;
    c['ID.AM-03'] = chk(4) ? FLOWS.filter((f, i) => S.flows[i] === f.a).length / FLOWS.length : 0;
    c['ID.AM-04'] = chk(4) ? (S.supplier === 0 ? 1 : 0) : 0;
    return c;
  }
  function renderSide() {
    $('#steps').innerHTML = STEPS.map((s, i) => `<li><button type="button" data-step="${i}" ${i === cur ? 'aria-current="step"' : ''}><span class="n ${S.checked[i] ? 'done' : ''}">${S.checked[i] ? '✓' : i + 1}</span><b>${s.title}</b><span class="sub">${s.sub}</span></button></li>`).join('');
    const c = coverage();
    $('#cov').innerHTML = SUB.map(([k, t]) => `<div title="${t}"><b>${k}</b><span class="b" role="img" aria-label="${k}: ${Math.round((c[k] || 0) * 100)} %"><span style="width:${(c[k] || 0) * 100}%"></span></span><span class="mono">${Math.round((c[k] || 0) * 100)} %</span></div>`).join('') +
      `<div style="grid-template-columns:1fr auto;margin-top:.2rem"><span>Promedio de cobertura</span><b>${Math.round((Object.values(c).reduce((a, b) => a + b, 0) / SUB.length) * 100)} %</b></div>`;
  }
  const fb = (ok, html) => `<div class="fb ${ok === true ? 'ok' : ok === false ? 'bad' : 'info'}"><div>${html}</div></div>`;
  function inventory() {
    const hw = ['SGRA-APP', 'SGRA-DB', 'SGRA-BACKUP', 'SIEM-01', 'AP-03', 'LAB-01', 'LAB-02', 'LAB-04', 'IMP-02'].concat(qaRegistered() ? ['SGRA-QA (10.20.30.77)'] : []);
    const sw = SW.filter((s) => s.inv || (s.k === 's3' && S.sw.s3) || (s.k === 's5' && S.sw.s5 && qaRegistered())).map((s) => `${s.t} en ${s.host === 'u1' ? 'SGRA-QA' : s.host}`);
    return `<details class="inv"><summary>Inventario actual: ${hw.length} equipos y ${sw.length} componentes de software</summary><p style="margin:.3rem 0"><b>Hardware:</b> ${hw.join(', ')}.</p><p style="margin:0"><b>Software:</b> ${sw.join('; ')}.</p></details>`;
  }

  function step0() {
    const devTile = ([ip, id, role], k) => { const unk = id.startsWith('u'); return `<div class="dev ${unk ? 'unk' : ''} ${k < S.shown ? 'show' : ''}"><b>${unk ? 'Sin registro' : id}</b><span class="mono">${ip}</span><br><span class="muted">${unk ? 'No está en el inventario' : role}</span></div>`; };
    let k = 0;
    const map = S.disc ? `<div class="segs">${NET.map((n) => `<div class="segbox"><h3>${n.seg}</h3><div class="devs">${n.devs.map((d) => devTile(d, k++)).join('')}</div></div>`).join('')}</div>` : '';
    const rows = S.disc ? `<h3 style="margin:.8rem 0 .2rem">Decide qué hacer con cada dispositivo no inventariado</h3><div class="rows">${Object.entries(UNK).map(([key, u]) => {
      const v = S.dev[key], show = S.checked[0];
      const ok = v === u.a;
      return `<div class="row ${show ? (ok ? 'ok' : 'bad') : ''}"><span><b class="mono">${u.ip}</b> ${u.t}</span><select class="f" data-dev="${key}" aria-label="Decisión para ${u.ip}"><option value="">Elige una decisión</option>${u.opts.map((o, i) => `<option value="${i}" ${v === i ? 'selected' : ''}>${o}</option>`).join('')}</select>${show ? `<span class="why">${ok ? '✓' : `✗ Corresponde: ${u.opts[u.a]}.`} ${u.why}</span>` : ''}</div>`;
    }).join('')}</div>` : '';
    return `<h2>1. Descubrir el hardware <span class="hint">ID.AM-01</span></h2>
      <p class="lead">El inventario registra los equipos que sostienen SGRA y los que se usan para acceder al sistema. Contrástalo con los hallazgos de una red ficticia.</p>
      <div class="gate"><label class="switch"><input type="checkbox" id="auth" ${S.auth ? 'checked' : ''}>Tengo autorización escrita de la Dirección de TI con alcance definido: 10.20.10.0/24 y 10.20.30.0/24.</label>
        <div><button type="button" class="btn primary" id="scan" ${S.auth && !S.disc ? '' : 'disabled'}>Ejecutar el descubrimiento autorizado</button> <span class="muted" style="font-size:.84rem">${S.auth ? 'Alcance acordado: solo esas dos redes.' : 'Sin autorización no se analiza ninguna red (NIST SP 800-115).'}</span></div></div>
      ${map}${rows}${inventory()}
      ${S.disc ? `<div class="actions"><button type="button" class="btn primary" data-check="0" ${Object.values(S.dev).every((v) => v !== null) ? '' : 'disabled'}>Comprobar decisiones</button></div>` : ''}`;
  }
  function step1() {
    const show = S.checked[1];
    const list = S.sbom ? `<table class="tbl" style="margin-top:.5rem"><thead><tr><th>Componente encontrado</th><th>Equipo</th><th>En el inventario</th><th>Acción</th></tr></thead><tbody>${SW.filter((s) => s.k !== 's5' || qaRegistered()).map((s) => {
      const inInv = s.inv || S.sw[s.k];
      return `<tr><td>${s.t}${s.dep ? ' <span class="muted">(dependencia)</span>' : ''}</td><td>${s.host === 'u1' ? 'SGRA-QA' : s.host}</td><td class="${show ? (inInv ? 'ok' : 'bad') : ''}">${inInv ? 'Sí' : 'No'}</td><td>${!inInv ? `<button type="button" class="btn sm" data-add="${s.k}">Agregar al inventario</button>` : s.eol ? '<span class="sev alta">Fin de soporte</span>' : ''}</td></tr>`;
    }).join('')}</tbody></table></div>
      ${qaRegistered() ? '' : '<p class="muted" style="font-size:.84rem">El equipo de pruebas 10.20.30.77 no se registró en la tarea 1, así que su software no entra en este análisis.</p>'}
      <div class="row ${show ? (S.eol === 0 ? 'ok' : 'bad') : ''}" style="margin-top:.5rem"><span><b>Instancia simulada de PostgreSQL sin soporte.</b> ¿Qué decisión de ciclo de vida registras?</span><select class="f" id="eol" aria-label="Decisión de ciclo de vida"><option value="">Elige una decisión</option>${['Actualizar a una versión con soporte en una ventana planificada', 'Mantenerlo sin cambios mientras funcione', 'Aceptar el riesgo temporal con control compensatorio y plazo'].map((o, i) => `<option value="${i}" ${S.eol === i ? 'selected' : ''}>${o}</option>`).join('')}</select>${show ? `<span class="why">${S.eol === 0 ? '✓ Se mantiene, reemplaza o retira el software según su riesgo (PR.PS-02) con reversión documentada.' : S.eol === 2 ? '◐ Aceptable solo como medida transitoria, registrada y con plazo: la solución sigue siendo actualizar.' : '✗ Un componente sin soporte deja de recibir parches: corresponde actualizar.'}</span>` : ''}</div>` : '';
    return `<h2>2. Software y ciclo de vida <span class="hint">ID.AM-02 e ID.AM-08</span></h2>
      <p class="lead">Un SBOM (lista de materiales del software) revela las dependencias reales de cada sistema. Compáralo con el inventario y decide sobre los componentes sin soporte.</p>
      <button type="button" class="btn primary" id="sbom" ${S.sbom ? 'disabled' : ''}>Generar el SBOM de los equipos inventariados</button>
      ${list}${inventory()}
      ${S.sbom ? `<div class="actions"><button type="button" class="btn primary" data-check="1" ${S.eol !== null ? '' : 'disabled'}>Comprobar</button></div>${show ? fb(SW.filter((s) => s.dep && (s.k !== 's5' || qaRegistered())).every((s) => S.sw[s.k]) ? true : false, SW.filter((s) => s.dep && (s.k !== 's5' || qaRegistered())).every((s) => S.sw[s.k]) ? 'Las dependencias quedaron inventariadas: ahora puedes saber dónde se usa cada biblioteca.' : 'Faltan dependencias en el inventario: si llega un aviso sobre ellas, no sabrás qué equipos revisar.') : ''}` : ''}`;
  }
  function step2() {
    const show = S.checked[2];
    return `<h2>3. Datos y propietarios <span class="hint">ID.AM-07</span></h2>
      <p class="lead">Cada tipo de dato necesita una clasificación y un propietario que responda por él. En Ecuador, los datos personales se protegen según la LOPDP.</p>
      <div class="tbl-wrap" tabindex="0" role="region" aria-label="Tabla de la tarea"><table class="tbl"><thead><tr><th>Tipo de dato</th><th>Clasificación</th><th>Propietario</th>${show ? '<th>Revisión</th>' : ''}</tr></thead><tbody>${DATA.map((d) => {
        const v = S.data[d.k], okC = d.cls.includes(v.cls), okO = d.own.includes(v.own);
        return `<tr><td>${d.t}</td><td><select data-dc="${d.k}" aria-label="Clasificación de ${d.t}"><option value="">Elige</option>${CLS.map((c) => `<option ${v.cls === c ? 'selected' : ''}>${c}</option>`).join('')}</select></td><td><select data-do="${d.k}" aria-label="Propietario de ${d.t}"><option value="">Elige</option>${OWN.map((c) => `<option ${v.own === c ? 'selected' : ''}>${c}</option>`).join('')}</select></td>${show ? `<td class="${okC && okO ? 'ok' : 'bad'}">${okC && okO ? '✓ Correcto' : `✗ ${okC ? '' : `Clasificación: ${d.cls.join(' o ')}. `}${okO ? '' : `Propietario: ${d.own.join(' o ')}.`}`}</td>` : ''}</tr>`;
      }).join('')}</tbody></table></div>
      <div class="actions"><button type="button" class="btn primary" data-check="2" ${DATA.every((d) => S.data[d.k].cls && S.data[d.k].own) ? '' : 'disabled'}>Comprobar</button></div>`;
  }
  function step3() {
    const show = S.checked[3];
    return `<h2>4. Priorizar activos <span class="hint">ID.AM-05</span></h2>
      <p class="lead">Valora el impacto de perder la confidencialidad (C), la integridad (I) y la disponibilidad (A) de cada activo, de 1 a 3. La suma indica la prioridad: alta desde 8, media de 6 a 7 y baja hasta 5.</p>
      <div class="tbl-wrap" tabindex="0" role="region" aria-label="Tabla de la tarea"><table class="tbl"><thead><tr><th>Activo</th><th>C</th><th>I</th><th>A</th><th>Prioridad</th>${show ? '<th>Revisión</th>' : ''}</tr></thead><tbody>${PRIO.map((p) => {
        const v = S.cia[p.k], sum = v.reduce((a, b) => a + b, 0), lv = level(sum), ok = lv === p.lvl;
        return `<tr><td><b>${p.k}</b><br><span class="muted">${p.t}</span></td>${[0, 1, 2].map((i) => `<td><select data-cia="${p.k}:${i}" aria-label="${['Confidencialidad', 'Integridad', 'Disponibilidad'][i]} de ${p.k}">${[1, 2, 3].map((n) => `<option ${v[i] === n ? 'selected' : ''}>${n}</option>`).join('')}</select></td>`).join('')}<td><span class="lvl ${lv}">${lv}</span> <span class="muted">(${sum})</span></td>${show ? `<td class="${ok ? 'ok' : 'bad'}">${ok ? '✓' : `✗ Se espera ${p.lvl.toLowerCase()}.`} <span style="font-weight:400">${p.why}</span></td>` : ''}</tr>`;
      }).join('')}</tbody></table></div>
      <div class="actions"><button type="button" class="btn primary" data-check="3">Comprobar</button></div>`;
  }
  function step4() {
    const show = S.checked[4];
    return `<h2>5. Flujos y proveedores <span class="hint">ID.AM-03 e ID.AM-04</span></h2>
      <p class="lead">El firewall registró estas comunicaciones. Compáralas con la arquitectura documentada de SGRA.</p>
      <div class="rows">${FLOWS.map((f, i) => { const v = S.flows[i], ok = v === f.a; return `<div class="row ${show ? (ok ? 'ok' : 'bad') : ''}"><span class="mono" style="font-size:.95em">${f.t}</span><select class="f" data-flow="${i}" aria-label="Flujo ${f.t}"><option value="">Elige</option><option value="0" ${v === 0 ? 'selected' : ''}>Autorizado y documentado</option><option value="1" ${v === 1 ? 'selected' : ''}>No autorizado</option></select>${show ? `<span class="why">${ok ? '✓' : '✗'} ${f.why}</span>` : ''}</div>`; }).join('')}</div>
      <h3 style="margin:.9rem 0 .2rem">Servicio de proveedor sin registrar</h3>
      <div class="row ${show ? (S.supplier === 0 ? 'ok' : 'bad') : ''}"><span>En este escenario, Azure Blob Storage almacena archivos adjuntos de las solicitudes de refuerzo. El servicio aún no figura en el inventario de proveedores y los adjuntos pueden contener datos personales.</span><select class="f" id="supp" aria-label="Decisión sobre el proveedor"><option value="">Elige una decisión</option>${['Registrarlo, asignar un responsable y revisar el contrato', 'No registrarlo porque el servicio es gratuito', 'Suspender el almacenamiento sin coordinar con TI'].map((o, i) => `<option value="${i}" ${S.supplier === i ? 'selected' : ''}>${o}</option>`).join('')}</select>${show ? `<span class="why">${S.supplier === 0 ? '✓ Los servicios de proveedores también se inventarían; al tratar datos personales, el contrato debe cubrir la LOPDP.' : '✗ Corresponde registrarlo con un responsable y revisar el contrato: procesa datos personales de estudiantes.'}</span>` : ''}</div>
      <div class="actions"><button type="button" class="btn primary" data-check="4" ${S.flows.every((v) => v !== null) && S.supplier !== null ? '' : 'disabled'}>Comprobar</button></div>`;
  }
  function step5() {
    const affectedReal = ['SGRA-APP', 'SGRA-QA (10.20.30.77)'];
    const found = [];
    if (S.sw.s3) found.push('SGRA-APP');
    if (S.sw.s5 && qaRegistered()) found.push('SGRA-QA (10.20.30.77)');
    let res = '';
    if (S.search) {
      res = found.length ? `<p>Tu inventario encuentra «sgra-auth-demo» en: <b>${found.join(' y ')}</b>.</p>` : '<p><b>Tu inventario no encuentra ningún equipo con «sgra-auth-demo».</b></p>';
      res += S.compared ? (() => {
        const missed = affectedReal.filter((x) => !found.includes(x));
        const reasons = missed.map((m) => (m === 'SGRA-APP' ? 'SGRA-APP: faltó agregar la dependencia «sgra-auth-demo» 2.1 al inventario de software (tarea 2).' : qaRegistered() ? 'El equipo de pruebas: faltó agregar su biblioteca «sgra-auth-demo» 2.3 al inventario (tarea 2).' : 'El equipo de pruebas 10.20.30.77: quedó sin registrar como activo en la tarea 1, así que su software es invisible.'));
        return missed.length ? fb(false, `<b>Encontraste ${found.length} de 2 equipos afectados.</b> Quedó expuesto:<br>${reasons.join('<br>')}<br>Sin inventario completo, la evaluación y la remediación del playbook de vulnerabilidades parten incompletas.`) : fb(true, '<b>Encontraste los 2 equipos afectados.</b> Con un inventario actualizado, la respuesta a la vulnerabilidad puede pasar de inmediato a evaluar con CVSS, KEV y EPSS, y a remediar.');
      })() : `<div class="actions"><button type="button" class="btn primary" id="compare">Comparar con el escenario simulado</button></div>`;
    }
    return `<h2>6. Prueba: aviso de vulnerabilidad <span class="hint">el inventario en uso</span></h2>
      <div class="notice"><b>Aviso ficticio del CSIRT.</b> Vulnerabilidad crítica en la biblioteca «sgra-auth-demo», versiones 2.x. Identifica de inmediato los activos afectados.</div>
      <p class="lead">La identificación del playbook de vulnerabilidades depende de lo que sabe tu inventario. Busca la biblioteca con lo que registraste en las tareas anteriores.</p>
      <button type="button" class="btn primary" id="search" ${S.search ? 'disabled' : ''}>Buscar «sgra-auth-demo» en el inventario</button>
      ${res}${inventory()}
      ${S.compared ? `<div class="actions"><button type="button" class="btn" id="again">Revisar las tareas y volver a intentar</button></div>` : ''}`;
  }
  const VIEWS = [step0, step1, step2, step3, step4, step5];
  function render() {
    $('#work').innerHTML = VIEWS[cur]() + `<div class="actions" style="justify-content:space-between;border-top:1px solid var(--line);padding-top:.6rem;margin-top:.9rem">${cur > 0 ? `<button type="button" class="btn" data-go="${cur - 1}">Tarea anterior</button>` : '<span></span>'}${cur < 5 ? `<button type="button" class="btn primary" data-go="${cur + 1}">Siguiente tarea</button>` : ''}</div>`;
    renderSide();
  }
  function scan() {
    S.disc = true; S.shown = 0; render();
    const total = NET.reduce((a, n) => a + n.devs.length, 0);
    const reveal = () => { S.shown += 1; $$('.dev').forEach((d, i) => d.classList.toggle('show', i < S.shown)); if (S.shown < total) scanTimer = setTimeout(reveal, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 140); };
    reveal();
  }
  $('#work').addEventListener('change', (e) => {
    const t = e.target;
    if (t.id === 'auth') { S.auth = t.checked; render(); return; }
    if (t.dataset.dev) { S.dev[t.dataset.dev] = t.value === '' ? null : Number(t.value); S.checked[0] = false; S.checked[1] = false; resetAssessment(); render(); return; }
    if (t.id === 'eol') { S.eol = t.value === '' ? null : Number(t.value); S.checked[1] = false; render(); return; }
    if (t.dataset.dc) { S.data[t.dataset.dc].cls = t.value; S.checked[2] = false; render(); return; }
    if (t.dataset.do) { S.data[t.dataset.do].own = t.value; S.checked[2] = false; render(); return; }
    if (t.dataset.cia) { const [k, i] = t.dataset.cia.split(':'); S.cia[k][Number(i)] = Number(t.value); S.checked[3] = false; render(); return; }
    if (t.dataset.flow) { S.flows[Number(t.dataset.flow)] = t.value === '' ? null : Number(t.value); S.checked[4] = false; render(); return; }
    if (t.id === 'supp') { S.supplier = t.value === '' ? null : Number(t.value); S.checked[4] = false; render(); }
  });
  $('#work').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b || b.disabled) return;
    if (b.id === 'scan') { scan(); return; }
    if (b.id === 'sbom') { S.sbom = true; render(); return; }
    if (b.dataset.add) { S.sw[b.dataset.add] = true; S.checked[1] = false; resetAssessment(); render(); return; }
    if (b.dataset.check) { S.checked[Number(b.dataset.check)] = true; render(); return; }
    if (b.dataset.go) { cur = Number(b.dataset.go); render(); $('#work').scrollIntoView({ block: 'start', behavior: 'smooth' }); return; }
    if (b.id === 'search') { S.search = true; S.checked[5] = true; render(); return; }
    if (b.id === 'compare') { S.compared = true; render(); return; }
    if (b.id === 'again') { S.search = null; S.compared = false; S.checked[5] = false; cur = 0; render(); }
  });
  $('#steps').addEventListener('click', (e) => { const b = e.target.closest('[data-step]'); if (b) { cur = Number(b.dataset.step); render(); } });
  $('#reset').addEventListener('click', () => { fresh(); render(); });
  fresh(); render();
})();
