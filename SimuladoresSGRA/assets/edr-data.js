'use strict';

const EDRData = (() => {
  const BASE_HOSTS = [
    { id: 'LAB-03', role: 'Equipo de laboratorio', user: 'k.rios', crit: 'baja', files: 1200 },
    { id: 'LAB-05', role: 'Equipo de laboratorio', user: 'm.lopez', crit: 'baja', files: 1200 },
    { id: 'COORD-01', role: 'Estación de Coordinación', user: 'coord.vera', crit: 'baja', files: 1200 },
    { id: 'GESTOR-01', role: 'Estación del Gestor de Espacios Físicos', user: 'r.intriago', crit: 'media', files: 3000 },
    { id: 'SGRA-APP', role: 'Servidor de la aplicación SGRA', user: 'svc-sgra', crit: 'alta', files: 4000, service: true },
    { id: 'SGRA-BACKUP', role: 'Repositorio de copias y reportes del ejercicio', user: 'svc-respaldo', crit: 'alta', files: 6000 },
    { id: 'SGRA-DB', role: 'Servidor de base de datos', user: 'svc-bd', crit: 'alta', files: 6000 }
  ];
  const SCN = {
    a: { origin: 'COORD-01', mal: 'proceso-cifrado.demo', ioc: 'descargas-cdn.example', mode: 'cifrado' },
    b: { origin: 'SGRA-APP', mal: 'proceso-anomalo.demo', ioc: 'pool-minado.example', mode: 'minero' }
  };

  return { BASE_HOSTS, SCN };
})();
