import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Transaccion } from "../models/transaction.model";
import { Fondo } from "../models/fondo.model";

@Injectable({ providedIn: 'root' })
export class UsuarioService {
    private saldo = new BehaviorSubject<number>(500000);
    saldo$ = this.saldo.asObservable();

    private historial: Transaccion[] = [];
    historial$ = new BehaviorSubject<Transaccion[]>([]);

    suscribir(fondo: Fondo, metodo: 'email' | 'sms'): string | void {
        const saldoActual = this.saldo.value;
        if (saldoActual >= fondo.montoMinimo) {
            this.saldo.next(saldoActual - fondo.montoMinimo);
            this.agregarTransaccion('Suscripción', fondo, metodo);
        } else {
            return 'Saldo insuficiente';
        }
    }

    cancelar(fondo: Fondo) {
        this.saldo.next(this.saldo.value + fondo.montoMinimo);
        this.agregarTransaccion('Cancelación', fondo);
    }

    private agregarTransaccion(tipo: 'Suscripción' | 'Cancelación', fondo: Fondo, notificacion?: string) {
        const tx: Transaccion = {
            tipo,
            fondo: fondo.nombre,
            monto: fondo.montoMinimo,
            fecha: new Date(),
            notificacion: notificacion as 'email' | 'sms'
        };
        this.historial.push(tx);
        this.historial$.next([...this.historial]);
    }
}