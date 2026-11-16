'use strict';

const IDAMData = (() => {
  const SUB = [
    ['ID.AM-01', 'Inventario de hardware'], ['ID.AM-02', 'Inventario de software, servicios y sistemas'], ['ID.AM-03', 'Flujos de red y de datos autorizados'],
    ['ID.AM-04', 'Servicios de proveedores'], ['ID.AM-05', 'Priorización de activos'], ['ID.AM-07', 'Inventario de datos'], ['ID.AM-08', 'Ciclo de vida de los activos']
  ];
  const STEPS = [
    { title: 'Descubrir el hardware', sub: 'ID.AM-01' },
    { title: 'Software y ciclo de vida', sub: 'ID.AM-02, ID.AM-08' },
    { title: 'Datos y propietarios', sub: 'ID.AM-07' },
    { title: 'Priorizar activos', sub: 'ID.AM-05' },
    { title: 'Flujos y proveedores', sub: 'ID.AM-03, ID.AM-04' },
    { title: 'Prueba: aviso de vulnerabilidad', sub: 'Inventario en uso' }
  ];
  const NET = [
    { seg: 'Servidores, 10.20.10.0/24', devs: [['10.20.10.5', 'SGRA-APP', 'Servidor de la aplicación SGRA'], ['10.20.10.6', 'SGRA-DB', 'Servidor de base de datos'], ['10.20.10.9', 'SGRA-BACKUP', 'Servidor de respaldos'], ['10.20.10.12', 'SIEM-01', 'Plataforma SIEM']] },
    { seg: 'Laboratorio, 10.20.30.0/24', devs: [['10.20.30.2', 'AP-03', 'Punto de acceso'], ['10.20.30.11', 'LAB-01', 'Equipo de laboratorio'], ['10.20.30.12', 'LAB-02', 'Equipo de laboratorio'], ['10.20.30.14', 'LAB-04', 'Equipo de laboratorio'], ['10.20.30.40', 'IMP-02', 'Impresora de red'], ['10.20.30.77', 'u1', 'No inventariado'], ['10.20.30.90', 'u2', 'No inventariado'], ['10.20.30.101', 'u3', 'No inventariado']] }
  ];
  const UNK = {
    u1: { ip: '10.20.30.77', t: 'Equipo de pruebas de SGRA para la demostración de refuerzos. TI confirmó a su responsable, pero falta incorporarlo al inventario.', opts: ['Registrar y asignar propietario', 'Retirar de la red', 'Aislar y analizar'], a: 0, why: 'Es un activo legítimo sin registrar: se inventaría con su propietario para gestionarlo.' },
    u2: { ip: '10.20.30.90', t: 'Router inalámbrico doméstico que un estudiante conectó para tener más cobertura.', opts: ['Registrar y asignar propietario', 'Retirar de la red', 'Aislar y analizar'], a: 1, why: 'Dispositivo no autorizado que abre una red paralela: se retira y se recuerda la política de uso aceptable.' },
    u3: { ip: '10.20.30.101', t: 'Equipo sin propietario identificable con puertos de administración abiertos.', opts: ['Registrar y asignar propietario', 'Retirar de la red', 'Aislar y analizar'], a: 2, why: 'Sin propietario y con exposición: se aísla y se analiza antes de decidir; podría ser un incidente.' }
  };
  const DATA = [
    { k: 'exp', t: 'Matrículas de estudiantes', cls: ['Datos personales'], own: ['Secretaría académica'] },
    { k: 'cal', t: 'Listas de asistencia a refuerzos', cls: ['Datos personales'], own: ['Secretaría académica', 'Coordinación de carrera'] },
    { k: 'pre', t: 'Copias de seguridad de la base de datos', cls: ['Confidencial', 'Datos personales'], own: ['Dirección de TI'] },
    { k: 'pin', t: 'Horarios de ocupación sin nombres de participantes', cls: ['Interna'], own: ['Gestión de espacios físicos'] },
    { k: 'log', t: 'Registros de autenticación', cls: ['Confidencial', 'Datos personales'], own: ['Dirección de TI'] }
  ];
  const CLS = ['Pública', 'Interna', 'Confidencial', 'Datos personales'];
  const OWN = ['Secretaría académica', 'Coordinación de carrera', 'Gestión de espacios físicos', 'Dirección de TI'];
  const PRIO = [
    { k: 'SGRA-DB', t: 'Base de datos con matrículas, solicitudes y asistencia', lvl: 'Alta', why: 'Concentra datos personales: impacto alto en las tres dimensiones.' },
    { k: 'SGRA-APP', t: 'Aplicación para solicitar, programar y registrar refuerzos', lvl: 'Alta', why: 'Su caída detiene la operación académica y procesa credenciales.' },
    { k: 'SGRA-BACKUP', t: 'Copias de la base de datos de SGRA', lvl: 'Alta', why: 'Contiene los mismos datos sensibles y sostiene la recuperación.' },
    { k: 'LAB-01', t: 'Equipo de prácticas del laboratorio', lvl: 'Baja', why: 'Sin datos sensibles y con reemplazo sencillo.' },
    { k: 'IMP-02', t: 'Impresora de red del laboratorio', lvl: 'Baja', why: 'Impacto limitado en la misión.' }
  ];
  const FLOWS = [
    { t: 'Usuarios hacia SGRA-APP, puerto 443', a: 0, why: 'Acceso documentado de estudiantes, docentes y personal a SGRA.' },
    { t: 'SGRA-APP hacia SGRA-DB, puerto 5432', a: 0, why: 'La aplicación consulta su base de datos.' },
    { t: 'SGRA-DB hacia SGRA-BACKUP, puerto 22', a: 0, why: 'Respaldo programado y documentado.' },
    { t: 'LAB-04 hacia SGRA-DB, puerto 5432', a: 1, why: 'El laboratorio no debe consultar la base de datos directamente.' },
    { t: 'SGRA-DB hacia 198.51.100.23, puerto 443', a: 1, why: 'Destino externo sin documentar: revisar con el equipo de respuesta.' },
    { t: 'SGRA-APP hacia SIEM-01, puerto 514', a: 0, why: 'Envío simulado de eventos al SIEM.' },
    { t: 'API SGRA hacia Azure Blob Storage, HTTPS', a: 0, why: 'Almacenamiento autorizado de adjuntos y recursos de los refuerzos.' },
    { t: 'API SGRA hacia Azure Key Vault, HTTPS', a: 0, why: 'Lectura autorizada de secretos de configuración.' }
  ];
  const SW = [
    { k: 's1', t: 'Interfaz SGRA · Angular 21', host: 'SGRA-APP', inv: true },
    { k: 's2', t: 'API SGRA · Spring Boot 4 y Java 21', host: 'SGRA-APP', inv: true },
    { k: 's3', t: 'Biblioteca de autenticación «sgra-auth-demo» 2.1', host: 'SGRA-APP', inv: false, dep: true },
    { k: 's4', t: 'PostgreSQL (versión ficticia fuera de soporte)', host: 'SGRA-DB', inv: true, eol: true },
    { k: 's5', t: 'Biblioteca de autenticación «sgra-auth-demo» 2.3', host: 'u1', inv: false, dep: true }
  ];

  return { SUB, STEPS, NET, UNK, DATA, CLS, OWN, PRIO, FLOWS, SW };
})();
