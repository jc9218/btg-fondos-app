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

    onSuscribir(): void {
        console.log('✅ onSuscribir ejecutado');
        this.suscribir.emit(this.fondo);
    }

    onCancelar(): void {
        console.log('✅ onCancelar ejecutado');
        this.cancelar.emit(this.fondo);
    }
}
