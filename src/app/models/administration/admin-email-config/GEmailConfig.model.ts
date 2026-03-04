export interface GEmailConfig {
  pidconfiguracioncorreo: number;
  pcorreoemisor: string;
  pservidorsmtp: string;
  ppuertosmtp: number;
  pssl?: boolean;
  pnombreremitente?: string;
  pfechahoracreacion: Date;
  pestadop: string;
}

export interface GEmailConfigCUD {
  pidconfiguracioncorreo?: number;
  idusuario: number;
  pcorreoemisor: string;
  paplicacionsontrasena: string;
  pservidorsmtp: string;
  ppuertosmtp: number;
  pssl: boolean;
  pnombreremitente: string;
}

export interface GEmailConfigDetail {
  idCorreo: number;
  correo: string;
  contrasenaApp: string;
  servidorSmtp: string;
  puertoSmtp: number;
  ssl: boolean;
  nombreRemitente: string;
  estado: string;
}
