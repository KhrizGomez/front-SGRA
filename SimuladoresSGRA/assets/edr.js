'use strict';

(function edr() {
  const { $, $$, esc } = SGRA;
  const START = Date.UTC(2026, 9, 26, 14, 0, 0);
  const LIMIT = 30;
  const fmt = (t) => new Date(START + t * 60000).toISOString().slice(11, 16);
  function digest(str) { let out = ''; for (let r = 0; r < 8; r += 1) { let h = (0x811c9dc5 ^ Math.imul(r + 1, 0x9e3779b9)) >>> 0; for (let i = 0; i < str.length; i += 1) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193); h ^= h >>> 13; } h = Math.imul(h ^ (h >>> 16), 0x85ebca6b); out += ((h ^ (h >>> 13)) >>> 0).toString(16).padStart(8, '0'); } return out; }
  const { BASE_HOSTS, SCN } = EDRData;

  let S, timer = null, speed = 1, sel = null;
  function baseProcs(h) {
    if (h.id.startsWith('SGRA-APP')) return [{ pid: 1, name: 'sistema', parent: 0 }, { pid: 410, name: 'api_sgra_java', parent: 1, user: 'svc-sgra' }, { pid: 455, name: 'agente_edr', parent: 1, user: 'sistema' }];
    if (h.id.startsWith('SGRA-DB')) return [{ pid: 1, name: 'sistema', parent: 0 }, { pid: 380, name: 'motor_bd', parent: 1, user: 'svc-bd' }, { pid: 455, name: 'agente_edr', parent: 1, user: 'sistema' }];
    return [{ pid: 1, name: 'sistema', parent: 0 }, { pid: 820, name: 'explorador', parent: 1, user: h.user }, { pid: 455, name: 'agente_edr', parent: 1, user: 'sistema' }];
  }
  function fresh() {
    const sc = $('#scn').value;
    S = { sc, t: 0, policy: 'detectar', dets: [], cust: [], blocked: false, firstDet: null, firstAct: null, contained: null, reinfect: 0, downtime: 0, degraded: 0, done: false,
      hosts: BASE_HOSTS.map((h) => ({ ...h, net: true, power: true, comp: false, enc: 0, procs: baseProcs(h).map((p) => ({ ...p, alive: true })), tl: [], mem: null, pkg: false, persist: false, quarantined: false, malKilled: false, malStarted: false, restored: false, patched: false, isolatedAt: null, memLost: false })) };
    sel = SCN[sc].origin;
    $('#play').textContent = 'Iniciar';
    $$('[data-pol]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.pol === 'detectar')));
  }
  const H = (id) => S.hosts.find((h) => h.id === id);
  const malProc = (h) => (h.power ? h.procs.find((p) => p.name === SCN[S.sc].mal && p.alive) : null);
  function tl(h, txt) { h.tl.push({ t: S.t, txt }); }
  function det(h, sev, name, txt) { S.dets.push({ t: S.t, host: h.id, sev, name, txt }); if (S.firstDet === null && sev !== 'info') S.firstDet = S.t; }
  function spawn(h, p) { h.procs.push({ ...p, alive: true }); if (p.flag === 'mal') h.hadMal = true; }

  function scenarioA() {
    const o = H('COORD-01'), t = S.t;
    if (t === 1) { spawn(o, { pid: 4120, name: 'visor_adjuntos', parent: 820, user: 'coord.vera', note: 'abre adjunto_refuerzo.demo' }); tl(o, 'coord.vera abre el adjunto adjunto_refuerzo.demo en el visor de adjuntos.'); }
    if (t === 2) { spawn(o, { pid: 4188, name: 'proceso_secundario', parent: 4120, user: 'coord.vera', flag: 'sus', note: 'actividad no esperada' }); tl(o, 'El visor de adjuntos inicia un proceso secundario inesperado.'); det(o, 'alta', 'El visor de adjuntos inicia un proceso inesperado', 'Cadena de procesos inusual en COORD-01.'); }
    if (t === 3) {
      if (S.blocked || !o.net) { tl(o, 'Intento de conexión a descargas-cdn.example bloqueado.'); det(o, 'info', 'Conexión bloqueada', 'El indicador estaba bloqueado o el equipo aislado.'); }
      else { tl(o, 'Conexión a descargas-cdn.example y descarga de proceso-cifrado.demo.'); det(o, 'critica', 'Conexión a un dominio de la lista de IoC', 'descargas-cdn.example coincide con un aviso del CSIRT.'); o.dropped = true; }
    }
    if (t === 4 && o.dropped && o.power && !o.malKilled) {
      if (S.policy === 'prevenir') { o.blockedOnce = true; tl(o, 'La política bloqueó la ejecución de proceso-cifrado.demo (mala reputación y comportamiento).'); det(o, 'info', 'Ejecución bloqueada por la política', 'proceso-cifrado.demo sigue en disco: falta ponerlo en cuarentena.'); }
      else { spawn(o, { pid: 4302, name: 'proceso-cifrado.demo', parent: 4188, user: 'coord.vera', flag: 'mal', note: 'modifica archivos de usuario' }); o.comp = true; o.malStarted = true; tl(o, 'proceso-cifrado.demo empieza a modificar archivos y cambiar sus extensiones.'); det(o, 'critica', 'Modificación masiva de archivos (comportamiento de cifrado)', 'Cientos de archivos cambian de contenido y extensión por minuto.'); }
    }
    if (t === 5 && malProc(o)) { o.persist = true; tl(o, 'Se crea la tarea programada «Tarea simulada» y se borran copias de recuperación locales.'); det(o, 'alta', 'Persistencia y borrado de copias locales', 'Tarea programada nueva y eliminación de copias de recuperación.'); }
    if (t === 7 && malProc(o) && o.net && H('SGRA-BACKUP').net && H('SGRA-BACKUP').power) { tl(o, 'La telemetría registra escrituras en un área compartida de SGRA-BACKUP.'); det(H('SGRA-BACKUP'), 'critica', 'Cifrado sobre un recurso compartido', 'Escrituras masivas desde COORD-01 en el área compartida de SGRA-BACKUP.'); }
    if (t === 10 && malProc(o) && o.net) { tl(o, 'proceso-cifrado.demo accede al recurso compartido de LAB-03.'); det(H('LAB-03'), 'critica', 'Cifrado sobre un recurso compartido', 'Escrituras masivas desde COORD-01 en LAB-03.'); }
    if (o.persist && !o.quarantined && o.power && !malProc(o) && o.malKilled && o.restartAt === S.t) { spawn(o, { pid: 5100 + S.t, name: 'proceso-cifrado.demo', parent: 1, user: 'sistema', flag: 'mal', note: 'reiniciado por la tarea programada' }); o.malKilled = false; S.reinfect += 1; tl(o, 'La tarea programada vuelve a lanzar proceso-cifrado.demo: reinfección.'); det(o, 'critica', 'Reinfección por persistencia', 'Faltó la erradicación: cuarentena y eliminación de la persistencia.'); }
    const mp = malProc(o);
    if (mp && o.power) {
      o.enc = Math.min(o.files, o.enc + 60);
      if (o.net && t >= 8) { const b = H('SGRA-BACKUP'); if (b.net && b.power) { b.comp = true; b.enc = Math.min(b.files, b.enc + 150); } }
      if (o.net && t >= 11) { const l = H('LAB-03'); if (l.net && l.power) { l.comp = true; l.enc = Math.min(l.files, l.enc + 40); } }
    }
  }
  function scenarioB() {
    const o = H('SGRA-APP'), t = S.t;
    if (t === 1) {
      if (S.policy === 'prevenir') { tl(o, 'La política bloqueó un proceso lanzado por el componente ficticio sin actualizar de la API SGRA.'); det(o, 'info', 'Ejecución bloqueada por la política', 'El componente ficticio sin actualizar sigue sin parche: falta corregirlo.'); o.blockedOnce = true; }
      else { spawn(o, { pid: 2210, name: 'proceso-anomalo.demo', parent: 410, user: 'svc-sgra', flag: 'mal', note: 'lanzado por un componente ficticio sin actualizar' }); o.comp = true; o.malStarted = true; tl(o, 'El servidor web, a través de un componente ficticio sin actualizar, inicia proceso-anomalo.demo.'); det(o, 'alta', 'El servicio web inicia un proceso inesperado', 'api_sgra_java no debería crear procesos de este tipo.'); }
    }
    if (t === 2 && malProc(o)) { if (S.blocked || !o.net) tl(o, 'Conexión a pool-minado.example bloqueada.'); else { tl(o, 'proceso-anomalo.demo usa el 96 % de la CPU y se conecta a pool-minado.example.'); det(o, 'critica', 'Uso intensivo de CPU y conexión a un IoC', 'pool-minado.example figura en la lista de indicadores.'); } }
    if (t === 4 && malProc(o)) { o.persist = true; tl(o, 'proceso-anomalo.demo se registra como servicio del sistema para sobrevivir a reinicios.'); det(o, 'alta', 'Persistencia como servicio', 'Servicio nuevo creado por la cuenta de SGRA.'); }
    if (t === 7 && malProc(o) && o.net) { tl(o, 'proceso-anomalo.demo intenta usar la cuenta de servicio de SGRA contra SGRA-DB.'); det(H('SGRA-DB'), 'critica', 'Uso anómalo de la cuenta de servicio de SGRA', 'Autenticación desde SGRA-APP fuera del patrón habitual.'); const b = H('SGRA-DB'); b.comp = true; spawn(b, { pid: 3301, name: 'proceso-anomalo.demo', parent: 380, user: 'svc-bd', flag: 'mal', note: 'copia lanzada desde SGRA-APP' }); }
    if (!o.patched && o.quarantined && o.reinfectAt === S.t) { spawn(o, { pid: 2400 + S.t, name: 'proceso-anomalo.demo', parent: 410, user: 'svc-sgra', flag: 'mal', note: 'el componente sigue vulnerable' }); o.comp = true; o.quarantined = false; o.malKilled = false; S.reinfect += 1; tl(o, 'El componente ficticio sin parche vuelve a lanzar proceso-anomalo.demo: reinfección.'); det(o, 'critica', 'Reinfección por vulnerabilidad sin corregir', 'Falta aplicar el parche del componente.'); }
    if (!o.net || !o.power) S.downtime += 1; else if (malProc(o)) S.degraded += 1;
  }
  function tick() {
    if (S.done) return;
    S.t += 1;
    if (S.sc === 'a') scenarioA(); else scenarioB();
    if (S.contained === null && S.firstDet !== null && isContained()) S.contained = S.t;
    render();
    if (S.t >= LIMIT) { stop(); report(); }
  }
  function isContained() { const origin = H(SCN[S.sc].origin); return (origin.malStarted || S.blocked || !origin.net || !origin.power || origin.quarantined) && S.hosts.every((h) => !malProc(h) || !h.net || !h.power); }
  function start() { if (timer || S.done) return; timer = setInterval(tick, 1400 / speed); $('#play').textContent = 'Pausar'; }
  function stop() { clearInterval(timer); timer = null; $('#play').textContent = S.done ? 'Terminado' : 'Reanudar'; }

  function status(h) {
    if (!h.power) return ['Apagado', 's-off'];
    if (h.restored && !malProc(h)) return [h.net ? 'Recuperado' : 'Recuperado, aislado', 's-rec'];
    if (!h.net) return ['Aislado', 's-ais'];
    if (h.comp && malProc(h)) return ['Comprometido', 's-comp'];
    if (S.dets.some((d) => d.host === h.id && d.sev !== 'info')) return ['En alerta', 's-alerta'];
    return ['Sano', 's-sano'];
  }

  function act(kind, arg) {
    if (S.done) return;
    const h = H(sel); let msg = '', ok = true;
    if (S.firstAct === null && S.firstDet !== null) S.firstAct = S.t;
    const mp = malProc(h);
    if (kind === 'isolate') { if (!h.power) { msg = 'El equipo está apagado.'; ok = false; } else { h.net = false; h.isolatedAt = S.t; msg = `${h.id} aislado: sin red, pero el agente sigue comunicado con la consola.`; tl(h, 'Equipo aislado de la red por el analista.'); if (h.service) msg += ' SGRA queda fuera de servicio mientras dure el aislamiento.'; } }
    if (kind === 'reconnect') { const clean = !malProc(h) && !(h.persist && !h.quarantined) && !(S.sc === 'b' && h.id === 'SGRA-APP' && h.hadMal && !h.patched); h.net = true; tl(h, 'Equipo reconectado a la red.'); msg = clean ? 'Reconectado tras erradicar y validar.' : 'Reconectado sin erradicar: riesgo de propagación.'; ok = clean; }
    if (kind === 'mem') {
      if (!h.power) { msg = 'Imposible: la memoria volátil se perdió al apagar el equipo.'; ok = false; }
      else { h.mem = (mp || h.procs.some((p) => p.alive && p.flag === 'sus')) ? 'completa' : 'parcial'; const hh = digest(`${h.id}|mem|${S.t}`); S.cust.push({ t: S.t, host: h.id, what: 'Imagen de memoria volátil', tool: 'Agente EDR 5.2 (simulado)', hash: hh }); msg = h.mem === 'completa' ? 'Memoria capturada con el proceso sospechoso activo: evidencia completa.' : 'Memoria capturada, pero el proceso ya no estaba: evidencia parcial.'; ok = h.mem === 'completa'; tl(h, 'Captura de memoria volátil registrada en la cadena de custodia.'); }
    }
    if (kind === 'pkg') { const hh = digest(`${h.id}|pkg|${S.t}`); h.pkg = true; S.cust.push({ t: S.t, host: h.id, what: 'Paquete de registros y archivo sospechoso', tool: 'Agente EDR 5.2 (simulado)', hash: hh }); msg = 'Paquete de evidencia recolectado con su huella y registrado en la cadena de custodia.'; tl(h, 'Paquete de evidencia recolectado.'); }
    if (kind === 'kill') { const p = h.procs.find((x) => x.pid === arg); if (!p || !p.alive) return; p.alive = false; tl(h, `Proceso ${p.name} (${p.pid}) terminado.`); if (p.name === SCN[S.sc].mal) { h.malKilled = true; msg = h.mem ? 'Proceso malicioso terminado después de capturar la memoria.' : 'Proceso terminado sin capturar antes la memoria: se pierden artefactos del proceso.'; ok = !!h.mem; if (h.persist && !h.quarantined && S.sc === 'a') h.restartAt = S.t + 3; } else { msg = `Terminaste ${p.name}, que no era el proceso malicioso.`; ok = false; if (p.name === 'api_sgra_java') { msg += ' SGRA deja de responder.'; S.downtime += 2; } } }
    if (kind === 'erad') {
      if (mp) { msg = 'El proceso malicioso sigue activo: termínalo antes de erradicar.'; ok = false; }
      else if (!h.comp && !h.persist && !h.dropped && !h.hadMal) { msg = 'No hay artefactos maliciosos en este equipo.'; ok = false; }
      else { h.quarantined = true; h.persist = false; h.procs.forEach((p) => { if (p.flag === 'sus') p.alive = false; }); msg = 'Archivo en cuarentena, persistencia eliminada y procesos sospechosos detenidos.'; tl(h, 'Erradicación: cuarentena del archivo y eliminación de la persistencia.'); if (S.sc === 'b' && h.id === 'SGRA-APP' && !h.patched) { h.reinfectAt = S.t + 3; msg += ' Atención: el componente ficticio sin actualizar sigue sin parche.'; ok = false; } }
    }
    if (kind === 'patch') { h.patched = true; msg = 'Parche del componente aplicado: se cierra la causa raíz.'; tl(h, 'Parche aplicado al complemento del servidor web.'); h.reinfectAt = null; }
    if (kind === 'block') { S.blocked = true; msg = `Indicador ${SCN[S.sc].ioc} bloqueado en el firewall perimetral.`; }
    if (kind === 'off') { if (!h.mem) { h.memLost = true; msg = 'Equipo apagado sin capturar la memoria: la evidencia volátil se perdió (orden de volatilidad).'; ok = false; } else msg = 'Equipo apagado después de capturar la memoria.'; if (h.procs.some((p) => p.flag === 'mal' && p.alive)) h.malKilled = true; h.procs.forEach((p) => { p.alive = false; }); h.power = false; tl(h, 'Equipo apagado.'); }
    if (kind === 'on') { h.power = true; h.procs = baseProcs(h).map((p) => ({ ...p, alive: true })); msg = 'Equipo encendido.'; tl(h, 'Equipo encendido.'); if (h.persist && !h.quarantined) h.restartAt = S.t + 1; }
    if (kind === 'restore') {
      if (!h.power) { msg = 'Enciende el equipo para restaurar.'; ok = false; }
      else if (malProc(h) || (h.persist && !h.quarantined)) { h.enc = 0; msg = 'Restauraste sin erradicar: el proceso o la persistencia volverán a dañar los archivos.'; ok = false; if (!malProc(h)) h.restartAt = S.t + 1; }
      else { h.enc = 0; h.restored = true; h.comp = false; msg = 'Archivos restaurados desde un respaldo validado. Valida el servicio antes de reconectar.'; tl(h, 'Restauración desde respaldo validado.'); }
    }
    $('#act-fb').innerHTML = `<div class="fb ${ok ? 'ok' : 'warn'}">${esc(msg)}</div>`;
    if (S.contained === null && S.firstDet !== null && isContained()) S.contained = S.t;
    render();
  }

  function renderKPIs() {
    const enc = S.hosts.reduce((a, h) => a + h.enc, 0), aff = S.hosts.filter((h) => h.comp || h.enc > 0).length;
    const ev = S.cust.length;
    $('#kpis').innerHTML = `
      <div class="kpi" style="border-left-color:var(--crit)"><b>${S.sc === 'a' ? enc : `${S.degraded} min`}</b><span>${S.sc === 'a' ? 'archivos de refuerzo afectados' : 'con SGRA degradado'}</span></div>
      <div class="kpi" style="border-left-color:var(--high)"><b>${aff}</b><span>equipos comprometidos</span></div>
      <div class="kpi" style="border-left-color:var(--info)"><b>${S.downtime} min</b><span>SGRA fuera de servicio</span></div>
      <div class="kpi" style="border-left-color:var(--gold)"><b>${S.contained !== null && S.firstDet !== null ? `${S.contained - S.firstDet} min` : 'Pendiente'}</b><span>de la primera detección a la contención</span></div>
      <div class="kpi"><b>${ev}</b><span>registros en la cadena de custodia</span></div>`;
    $('#clock').textContent = `${fmt(S.t)} UTC, minuto ${S.t} de ${LIMIT}`;
  }
  function renderHosts() {
    $('#hlist').innerHTML = S.hosts.map((h) => { const [st, cls] = status(h); return `<li><button type="button" class="${cls}" data-host="${h.id}" aria-current="${sel === h.id}"><span class="nm">${h.id}<span class="stx">${st}</span></span><span class="rl">${h.role}, criticidad ${h.crit}</span>${h.enc ? `<span class="bar" aria-hidden="true"><span style="width:${(h.enc / h.files) * 100}%"></span></span>` : ''}</button></li>`; }).join('');
  }
  function treeHtml(h, parent) {
    const kids = h.procs.filter((p) => p.parent === parent);
    if (!kids.length) return '';
    return `<ul${parent === 0 ? ' class="tree"' : ''}>${kids.map((p) => `<li><span class="pnode ${p.flag || ''} ${p.alive ? '' : 'dead'}"><b>${esc(p.name)}</b><span class="pid">PID ${p.pid}${p.user ? `, ${esc(p.user)}` : ''}</span>${p.note ? `<span class="muted" style="font-size:.8rem">${esc(p.note)}</span>` : ''}${p.flag === 'mal' ? '<span class="sev critica">Malicioso</span>' : p.flag === 'sus' ? '<span class="sev alta">Sospechoso</span>' : ''}${p.alive && h.power && p.pid !== 1 && p.name !== 'agente_edr' ? `<button type="button" class="btn sm danger" data-kill="${p.pid}">Terminar</button>` : ''}</span>${treeHtml(h, p.pid)}</li>`).join('')}</ul>`;
  }
  function renderHost() {
    const h = H(sel), [st] = status(h);
    $('#host').innerHTML = `<h2>${h.id} <span class="hint">${h.role}. Usuario: ${h.user}. Criticidad ${h.crit}.</span></h2>
      <div class="chips"><span>Estado: <b>${st}</b></span><span>Red: <b>${h.net ? 'conectado' : 'aislado'}</b></span><span>Energía: <b>${h.power ? 'encendido' : 'apagado'}</b></span><span>Memoria capturada: <b>${h.mem ? h.mem : h.memLost ? 'perdida' : 'no'}</b></span>${h.enc ? `<span>Archivos dañados: <b>${h.enc} de ${h.files}</b></span>` : ''}${h.persist ? '<span style="background:var(--high-bg)">Persistencia activa</span>' : ''}</div>
      <h3 style="margin:.2rem 0 .3rem;font-size:.95rem">Árbol de procesos</h3>
      ${h.power ? treeHtml(h, 0) : '<div class="empty">Equipo apagado: no hay telemetría de procesos.</div>'}
      <h3 style="margin:.7rem 0 .3rem;font-size:.95rem">Telemetría del equipo</h3>
      <ul class="tl">${h.tl.slice().reverse().map((e) => `<li><span class="mono">${fmt(e.t)}</span><span>${esc(e.txt)}</span></li>`).join('') || '<li><span></span><span class="muted">Sin actividad relevante.</span></li>'}</ul>`;
  }
  function renderSide() {
    const h = H(sel);
    $('#act-host').textContent = `sobre ${h.id}`;
    const b = (k, label, dis) => `<button type="button" class="btn" data-act="${k}" ${dis ? 'disabled' : ''}>${label}</button>`;
    $('#acts').innerHTML = [
      h.net ? b('isolate', 'Aislar de la red', !h.power) : b('reconnect', 'Reconectar a la red', !h.power),
      b('mem', 'Capturar memoria volátil', !h.power),
      b('pkg', 'Recolectar paquete de evidencia', false),
      b('erad', 'Cuarentena y eliminar persistencia', !h.power),
      b('block', `Bloquear ${SCN[S.sc].ioc}`, S.blocked),
      S.sc === 'b' && h.id === 'SGRA-APP' ? b('patch', 'Aplicar parche del componente', h.patched || !h.power) : b('restore', 'Restaurar desde respaldo validado', !h.power),
      h.power ? b('off', 'Apagar el equipo', false) : b('on', 'Encender el equipo', false)
    ].join('');
    $('#dets').innerHTML = S.dets.slice().reverse().map((d) => `<li><span class="sev ${d.sev}">${d.sev === 'critica' ? 'Crítica' : d.sev === 'info' ? 'Información' : 'Alta'}</span> <b>${esc(d.name)}</b><div class="meta">${fmt(d.t)} UTC, ${d.host}. ${esc(d.txt)}</div></li>`).join('') || '<li class="empty">Sin detecciones. Inicia el escenario.</li>';
    $('#cust').innerHTML = S.cust.length ? `<div class="tbl-wrap" tabindex="0" role="region" aria-label="Registros de evidencia"><table class="tbl"><thead><tr><th>Hora</th><th>Equipo</th><th>Evidencia</th><th>Huella (simulada)</th></tr></thead><tbody>${S.cust.map((c) => `<tr><td>${fmt(c.t)}</td><td>${c.host}</td><td>${esc(c.what)}<br><span class="muted">${esc(c.tool)}, analista del curso</span></td><td class="mono" style="word-break:break-all">${c.hash.slice(0, 24)}…</td></tr>`).join('')}</tbody></table></div>` : '<p class="muted" style="margin:0">Aún no hay evidencia registrada. Quién, cuándo, con qué herramienta y con qué resultado.</p>';
  }
  function render() { renderKPIs(); renderHosts(); renderHost(); renderSide(); }

  function report() {
    S.done = true; stop();
    const affected = S.hosts.filter((h) => h.malStarted || h.comp || h.enc > 0 || S.dets.some((d) => d.host === h.id && d.sev !== 'info'));
    const o = H(SCN[S.sc].origin);
    const anyMal = S.hosts.some((h) => malProc(h));
    const memOk = o.mem === 'completa', memLost = S.hosts.some((h) => h.memLost);
    const erad = !anyMal && S.hosts.filter((h) => h.hadMal || h.dropped).every((h) => h.quarantined && !h.persist) && (S.sc === 'a' || o.patched || S.t === 0);
    const restored = S.sc === 'a' ? S.hosts.every((h) => h.enc === 0) && S.hosts.filter((h) => h.comp).every((h) => h.restored) : erad && o.net && o.power;
    const unsafe = S.hosts.some((h) => h.net && malProc(h));
    const enc = S.hosts.reduce((a, h) => a + h.enc, 0);
    const spread = S.hosts.filter((h) => h.id !== o.id && (h.comp || h.hadMal)).length;
    const prevented = !o.malStarted && (o.blockedOnce || S.sc === 'a' && S.t >= 4 && (!o.dropped || o.quarantined));
    const L = (state, t, d) => `<b class="${state}">${state === 'ok' ? '✓' : state === 'mid' ? '◐' : '✗'} ${t}</b><span>${d}</span>`;
    const lines = [
      L(S.firstAct !== null || prevented ? 'ok' : 'bad', 'Detección y análisis', prevented ? 'Se evitó la ejecución del proceso malicioso. Revisa los registros para confirmar el alcance.' : S.firstAct !== null ? `Primera acción ${S.firstAct - S.firstDet} min después de la primera detección.` : 'No hubo acciones de respuesta.'),
      L(prevented || (S.contained !== null && spread === 0) ? 'ok' : S.contained !== null ? 'mid' : 'bad', 'Contención', prevented ? 'Sin propagación.' : S.contained !== null ? `Contenido ${S.contained - S.firstDet} min después de la primera detección. Equipos alcanzados además del origen: ${spread}.` : 'El proceso malicioso siguió activo con red.'),
      L(memOk && !memLost ? 'ok' : memLost ? 'bad' : 'mid', 'Preservación de evidencia', memLost ? 'Se apagó un equipo sin capturar la memoria: se perdió evidencia volátil.' : memOk ? `Memoria del equipo de origen capturada con el proceso activo; ${S.cust.length} registros en la cadena de custodia.` : 'Falta capturar la memoria antes de terminar el proceso o apagar.'),
      L(erad ? 'ok' : 'bad', 'Erradicación', erad ? (S.sc === 'b' ? 'Proceso terminado, persistencia eliminada y complemento corregido.' : 'Archivo en cuarentena y persistencia eliminada.') : `Quedan causas por eliminar${S.reinfect ? `; hubo ${S.reinfect} reinfección${S.reinfect === 1 ? '' : 'es'}` : ''}.`),
      L(restored && !unsafe ? 'ok' : 'bad', 'Recuperación', S.sc === 'a' ? (enc === 0 ? 'Archivos restaurados desde respaldos validados.' : `Quedan ${enc} archivos dañados sin restaurar.`) : `SGRA fuera de servicio ${S.downtime} min y degradado ${S.degraded} min.`)
    ];
    $('#rep-body').innerHTML = `<p class="muted" style="margin-top:0">Escenario: ${$('#scn').selectedOptions[0].text}. Equipos involucrados: ${affected.map((h) => h.id).join(', ') || 'ninguno'}.</p>
      <div class="ph">${lines.join('')}</div>
      <h3 style="margin:.6rem 0 .3rem">Lecciones del tema</h3>
      <ul><li>La contención equilibra la urgencia con la evidencia: primero la memoria volátil, luego terminar o apagar.</li><li>${S.sc === 'b' ? 'En un servidor crítico, aislar interrumpe el servicio: terminar el proceso, bloquear el indicador y corregir la causa puede contener con menos impacto.' : 'Aislar a tiempo evita la propagación por recursos compartidos.'}</li><li>Restaurar sin erradicar produce reinfecciones; la recuperación se valida antes de reconectar.</li></ul>`;
    $('#report').hidden = false; $('#rep-close').focus();
  }

  $('#hlist').addEventListener('click', (e) => { const b = e.target.closest('[data-host]'); if (!b) return; sel = b.dataset.host; $('#act-fb').innerHTML = ''; render(); });
  $('#host').addEventListener('click', (e) => { const b = e.target.closest('[data-kill]'); if (b) act('kill', Number(b.dataset.kill)); });
  $('#acts').addEventListener('click', (e) => { const b = e.target.closest('[data-act]'); if (b && !b.disabled) act(b.dataset.act); });
  $$('[data-pol]').forEach((b) => b.addEventListener('click', () => { S.policy = b.dataset.pol; $$('[data-pol]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); }));
  $('#play').addEventListener('click', () => { if (timer) stop(); else start(); });
  $('#step').addEventListener('click', () => { if (!S.done) tick(); });
  $('#reset').addEventListener('click', () => { stop(); fresh(); $('#act-fb').innerHTML = ''; render(); });
  $('#scn').addEventListener('change', () => $('#reset').click());
  $('#end').addEventListener('click', () => { if (!S.done) report(); else $('#report').hidden = false; });
  $$('[data-speed]').forEach((b) => b.addEventListener('click', () => { speed = Number(b.dataset.speed); $$('[data-speed]').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); if (timer) { clearInterval(timer); timer = setInterval(tick, 1400 / speed); } }));
  $('#rep-close').addEventListener('click', () => { $('#report').hidden = true; });
  $('#rep-reset').addEventListener('click', () => { $('#report').hidden = true; $('#reset').click(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') $('#report').hidden = true; });
  fresh(); render();
})();
