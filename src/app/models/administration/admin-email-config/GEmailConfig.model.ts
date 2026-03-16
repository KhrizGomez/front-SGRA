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
  idusuario?: number;
  pcorreoemisor?: string;
  paplicacionsontrasena?: string;
  pservidorsmtp?: string;
  ppuertosmtp?: number;
  pssl?: boolean;
  pnombreremitente?: string;
  pfechahoracreacion?: string;
  pestadop?: string;
}

export interface EmailTestDTO {
  servidorSmtp: string;
  puertoSmtp: number;
  usaSSL: boolean;
  correoEmisor: string;
  contrasenaAplicacion: string;
  nombreRemitente: string;
}
