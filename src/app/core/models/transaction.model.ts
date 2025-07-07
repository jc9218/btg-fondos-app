export interface Transaccion {
    tipo: 'Suscripción' | 'Cancelación';
    fondo: string;
    monto: number;
    fecha: Date;
    notificacion?: 'email' | 'sms';
}
  