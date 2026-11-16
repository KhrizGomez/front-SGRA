'use strict';

const SIEMData = (() => {
  const USERS = {
    'e.perez': { role: 'Estudiante' }, 'm.lopez': { role: 'Estudiante' }, 'j.vera': { role: 'Estudiante' }, 'a.mora': { role: 'Estudiante' }, 'c.ruiz': { role: 'Estudiante' },
    'd.torres': { role: 'Docente' }, 'l.salas': { role: 'Docente' }, 'k.rios': { role: 'Estudiante' }, 'p.zambrano': { role: 'Estudiante' }, 'r.intriago': { role: 'Docente' },
    'coord.cedeno': { role: 'Coordinación académica con permisos de reporte', priv: true },
    'adm.sgra': { role: 'Administrador de SGRA', priv: true },
    'svc-respaldo': { role: 'Cuenta de servicio de respaldos (documentada)', priv: true, svc: true },
    'ex.alvarez': { role: 'Cuenta deshabilitada de un egresado', disabled: true }
  };
  const SRCS = ['Autenticación', 'SGRA', 'Firewall', 'Correo', 'Inteligencia'];
  const RULES = [
    { id: 'R1', name: 'Fuerza bruta contra una cuenta', sev: 'alta', on: true, n: 5, desc: 'N o más inicios de sesión fallidos de la misma cuenta en 5 minutos.', param: { label: 'Fallos mínimos', min: 3, max: 10, step: 1 }, qs: ['¿Los fallos vienen de una IP y ubicación habituales?', '¿Les siguió un inicio de sesión exitoso?'] },
    { id: 'R2', name: 'Inicio exitoso tras fallos repetidos', sev: 'alta', on: true, desc: 'Inicio exitoso de una cuenta con 3 o más fallos en los 10 minutos previos.', qs: ['¿El éxito llega desde el mismo equipo y ubicación que los fallos?', '¿La cuenta es privilegiada?'] },
    { id: 'R3', name: 'Cuenta privilegiada desde ubicación inusual', sev: 'critica', on: true, desc: 'Inicio exitoso de una cuenta con privilegios elevados desde fuera de Ecuador.', qs: ['¿Existe un viaje autorizado o una verificación por un canal confiable?', '¿Qué hizo la cuenta después del acceso?'] },
    { id: 'R4', name: 'Exportación masiva de registros', sev: 'alta', on: true, n: 300, ex: false, desc: 'Exportación de N o más registros en una sola operación.', param: { label: 'Registros mínimos', min: 100, max: 6000, step: 100 }, qs: ['¿La cuenta tiene una tarea programada y documentada?', '¿Los registros incluyen datos personales?'] },
    { id: 'R5', name: 'Coincidencia con un indicador de compromiso', sev: 'critica', on: true, desc: 'Evento con un dominio o una IP de la lista de IoC.', qs: ['¿Qué cuenta o equipo tocó el indicador?', '¿La conexión fue permitida o solo un intento?'] },
    { id: 'R6', name: 'Cuenta deshabilitada intenta acceder', sev: 'media', on: true, desc: 'Intento de acceso con una cuenta deshabilitada.', qs: ['¿Hay otros eventos de la misma cuenta o IP?'] }
  ];
  const NOTES = {
    olvido: 'e.perez olvidó su contraseña: los fallos y el éxito vienen del mismo equipo del campus y sin otros indicios.',
    ataque: 'Fallos repetidos desde un país no habitual contra una cuenta privilegiada, seguidos de un acceso exitoso: patrón de credencial comprometida.',
    exfil: 'La cuenta comprometida exportó un reporte de asistencia con datos personales: además de contener, corresponde notificar al delegado de protección de datos (LOPDP).',
    ioc: 'Conexión a un dominio de la lista de IoC del CSIRT: indicador de compromiso confirmado.',
    respaldo: 'Respaldo programado y documentado de la cuenta de servicio. Mejor que subir el umbral: aplicar una excepción aprobada para esa cuenta.',
    viaje: 'El administrador está en un viaje autorizado y se verificó por un canal confiable por TI: se cierra sin incidente y se documenta.',
    egresado: 'Un egresado intenta entrar con su cuenta antigua, sin otros indicios: se registra y se cierra sin incidente.',
    docente: 'El docente escribió mal su contraseña desde su oficina y entró después: evento sin incidente.',
    phishing: 'Correos con un dominio del aviso del CSIRT: campaña de phishing activa contra la institución.',
    cuenta: 'Acceso desde la IP del aviso del CSIRT con la cuenta de una estudiante que hizo clic en el enlace: cuenta comprometida.'
  };
  const SCN = {
    s1: { ioc: [['cdn-actualiza.example', 'Dominio', 'CSIRT nacional, aviso previo'], ['198.51.100.250', 'IP', 'CSIRT nacional, aviso previo']], script(t, add) {
      if (t === 10 || t === 11) { add({ src: 'Autenticación', host: 'SGRA-APP', user: 'e.perez', ip: '10.20.30.15', geo: 'Campus', act: 'Inicio de sesión', res: 'Fallido', grp: 'olvido' }); add({ src: 'Autenticación', host: 'SGRA-APP', user: 'e.perez', ip: '10.20.30.15', geo: 'Campus', act: 'Inicio de sesión', res: 'Fallido', grp: 'olvido' }); }
      if (t === 12) add({ src: 'Autenticación', host: 'SGRA-APP', user: 'e.perez', ip: '10.20.30.15', geo: 'Campus', act: 'Inicio de sesión', res: 'Exitoso', grp: 'olvido' });
      if (t >= 20 && t <= 23) for (let k = 0; k < 2; k += 1) add({ src: 'Autenticación', host: 'SGRA-APP', user: 'coord.cedeno', ip: '203.0.113.45', geo: 'País no habitual', act: 'Inicio de sesión', res: 'Fallido', mal: true, grp: 'ataque' });
      if (t === 25) add({ src: 'Autenticación', host: 'SGRA-APP', user: 'coord.cedeno', ip: '203.0.113.45', geo: 'País no habitual', act: 'Inicio de sesión', res: 'Exitoso', mal: true, grp: 'ataque' });
      if (t === 30) add({ src: 'SGRA', host: 'SGRA-APP', user: 'coord.cedeno', ip: '203.0.113.45', geo: 'País no habitual', act: 'Exportación de registros', det: 'Reporte de 480 filas de asistencia a refuerzos (datos personales)', count: 480, mal: true, grp: 'exfil', pd: true });
      if (t === 33) add({ src: 'Firewall', host: 'SGRA-APP', user: '', ip: '10.20.10.5', act: 'Conexión saliente', det: 'cdn-actualiza.example:443 permitida', domain: 'cdn-actualiza.example', mal: true, grp: 'ioc' });
      if (t === 40) add({ src: 'SGRA', host: 'SGRA-DB', user: 'svc-respaldo', ip: '10.20.10.9', geo: 'Campus', act: 'Exportación de registros', det: '5000 registros: respaldo de PostgreSQL programado', count: 5000, grp: 'respaldo' });
      if (t === 50) add({ src: 'Autenticación', host: 'SGRA-APP', user: 'd.torres', ip: '198.51.100.20', geo: 'Perú', act: 'Inicio de sesión', res: 'Exitoso', det: 'Congreso académico' });
      if (t === 58) add({ src: 'Autenticación', host: 'SGRA-APP', user: 'adm.sgra', ip: '198.51.100.77', geo: 'Colombia', act: 'Inicio de sesión', res: 'Exitoso', det: 'Viaje autorizado y verificado por TI', grp: 'viaje' });
      if (t === 70) add({ src: 'Autenticación', host: 'SGRA-APP', user: 'ex.alvarez', ip: '192.0.2.61', geo: 'Ecuador', act: 'Intento de acceso', res: 'Fallido', det: 'Cuenta deshabilitada', grp: 'egresado' });
    } },
    s2: { ioc: [], script(t, add, state) {
      if (t === 4) { add({ src: 'Inteligencia', host: 'CSIRT', user: '', ip: '', act: 'Aviso del CSIRT nacional', det: 'Nuevos IoC: invitacion-sgra.example y 203.0.113.80' }); state.ioc.push(['invitacion-sgra.example', 'Dominio', 'CSIRT nacional, minuto 2'], ['203.0.113.80', 'IP', 'CSIRT nacional, minuto 2']); }
      if (t === 10) ['m.lopez', 'j.vera', 'd.torres', 'a.mora'].forEach((u) => add({ src: 'Correo', host: 'Correo institucional', user: u, ip: '', act: 'Correo recibido con enlace', det: 'Asunto: invitación a una sesión de refuerzo', domain: 'invitacion-sgra.example', mal: true, grp: 'phishing' }));
      if (t === 15) add({ src: 'Firewall', host: 'LAB-05', user: 'j.vera', ip: '10.20.30.25', act: 'Conexión saliente', det: 'invitacion-sgra.example:443 permitida', domain: 'invitacion-sgra.example', mal: true, grp: 'phishing' });
      if (t === 22) add({ src: 'Autenticación', host: 'SGRA-APP', user: 'j.vera', ip: '203.0.113.80', geo: 'País no habitual', act: 'Inicio de sesión', res: 'Exitoso', mal: true, grp: 'cuenta' });
      if (t === 26) add({ src: 'SGRA', host: 'SGRA-APP', user: 'j.vera', ip: '203.0.113.80', geo: 'País no habitual', act: 'Cancelación de una solicitud de refuerzo', det: 'Solicitud REF-104 cancelada desde la sesión anómala', mal: true, grp: 'cuenta' });
      if (t === 35 || t === 36) for (let k = 0; k < (t === 35 ? 3 : 2); k += 1) add({ src: 'Autenticación', host: 'SGRA-APP', user: 'd.torres', ip: '10.20.40.8', geo: 'Campus', act: 'Inicio de sesión', res: 'Fallido', grp: 'docente' });
      if (t === 37) add({ src: 'Autenticación', host: 'SGRA-APP', user: 'd.torres', ip: '10.20.40.8', geo: 'Campus', act: 'Inicio de sesión', res: 'Exitoso', grp: 'docente' });
      if (t === 45) add({ src: 'SGRA', host: 'SGRA-DB', user: 'svc-respaldo', ip: '10.20.10.9', geo: 'Campus', act: 'Exportación de registros', det: '5000 registros: respaldo de PostgreSQL programado', count: 5000, grp: 'respaldo' });
    } },
    s3: { ioc: [['cdn-actualiza.example', 'Dominio', 'CSIRT nacional, aviso previo']], script(t, add) {
      if (t === 12 || t === 13) for (let k = 0; k < 2; k += 1) add({ src: 'Autenticación', host: 'SGRA-APP', user: 'e.perez', ip: '10.20.30.15', geo: 'Campus', act: 'Inicio de sesión', res: 'Fallido', grp: 'olvido' });
      if (t === 14) add({ src: 'Autenticación', host: 'SGRA-APP', user: 'e.perez', ip: '10.20.30.15', geo: 'Campus', act: 'Inicio de sesión', res: 'Exitoso', grp: 'olvido' });
      if (t === 30 || t === 31) for (let k = 0; k < (t === 30 ? 3 : 2); k += 1) add({ src: 'Autenticación', host: 'SGRA-APP', user: 'd.torres', ip: '10.20.40.8', geo: 'Campus', act: 'Inicio de sesión', res: 'Fallido', grp: 'docente' });
      if (t === 32) add({ src: 'Autenticación', host: 'SGRA-APP', user: 'd.torres', ip: '10.20.40.8', geo: 'Campus', act: 'Inicio de sesión', res: 'Exitoso', grp: 'docente' });
      if (t === 40) add({ src: 'SGRA', host: 'SGRA-DB', user: 'svc-respaldo', ip: '10.20.10.9', geo: 'Campus', act: 'Exportación de registros', det: '5000 registros: respaldo de PostgreSQL programado', count: 5000, grp: 'respaldo' });
      if (t === 55) add({ src: 'Autenticación', host: 'SGRA-APP', user: 'adm.sgra', ip: '198.51.100.77', geo: 'Colombia', act: 'Inicio de sesión', res: 'Exitoso', det: 'Viaje autorizado y verificado por TI', grp: 'viaje' });
      if (t === 70) add({ src: 'Autenticación', host: 'SGRA-APP', user: 'ex.alvarez', ip: '192.0.2.61', geo: 'Ecuador', act: 'Intento de acceso', res: 'Fallido', det: 'Cuenta deshabilitada', grp: 'egresado' });
    } }
  };
  const NORMAL = ['m.lopez', 'a.mora', 'c.ruiz', 'k.rios', 'p.zambrano', 'l.salas', 'r.intriago'];
  const BENIGN_DOM = ['aula-virtual.example', 'biblioteca.example', 'actualizaciones-so.example', 'revistas.example'];

  return { USERS, SRCS, RULES, NOTES, SCN, NORMAL, BENIGN_DOM };
})();
