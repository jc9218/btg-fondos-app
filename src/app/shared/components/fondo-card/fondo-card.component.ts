import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Fondo } from '../../../core/models/fondo.model';

@Component({
    standalone: true,
    selector: 'app-fondo-card',
    imports: [CommonModule, MatCardModule, MatButtonModule],
    templateUrl: './fondo-card.component.html',
})
export class FondoCardComponent {
    @Input() fondo!: Fondo;
    @Output() suscribir = new EventEmitter<Fondo>();
    @Output() cancelar = new EventEmitter<Fondo>();
    @Input() suscrito: boolean = false;
    @Input() saldoSuficiente: boolean = true;

    onSuscribir(): void {
        this.suscribir.emit(this.fondo);
    }

    onCancelar(): void {
        this.cancelar.emit(this.fondo);
    }
}
