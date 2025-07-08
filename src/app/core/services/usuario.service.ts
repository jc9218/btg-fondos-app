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

    private fondosSuscritos = new Set<number>();

    suscribirConMonto(fondo: Fondo, monto: number): string | void {
        if (monto < fondo.montoMinimo) return 'Monto inferior al mínimo';

        const saldoActual = this.saldo.value;
        if (saldoActual >= monto) {
            this.saldo.next(saldoActual - monto);
            this.fondosSuscritos.add(fondo.id);
            this.agregarTransaccion('Suscripción', fondo, undefined, monto);
        } else {
            return 'Saldo insuficiente';
        }
    }

    estaSuscrito(fondo: Fondo): boolean {
        return this.fondosSuscritos.has(fondo.id);
    }

    cancelar(fondo: Fondo) {
        this.saldo.next(this.saldo.value + fondo.montoMinimo);
        this.fondosSuscritos.delete(fondo.id);
        this.agregarTransaccion('Cancelación', fondo);
    }

    private agregarTransaccion(
        tipo: 'Suscripción' | 'Cancelación',
        fondo: Fondo,
        notificacion?: string,
        montoOverride?: number
    ) {
        const tx: Transaccion = {
            tipo,
            fondo: fondo.nombre,
            monto: montoOverride ?? fondo.montoMinimo,
            fecha: new Date(),
            notificacion: notificacion as 'email' | 'sms',
        };
        this.historial.push(tx);
        this.historial$.next([...this.historial]);
    }
}