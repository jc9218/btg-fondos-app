import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Fondo } from '../../../core/models/fondo.model';

@Component({
    standalone: true,
    selector: 'app-fondo-card',
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
    ],
    templateUrl: './fondo-card.component.html',
})
export class FondoCardComponent {
    @Input() fondo!: Fondo;
    @Output() invertir = new EventEmitter<{ fondo: Fondo, monto: number }>();
    @Output() cancelar = new EventEmitter<Fondo>();
    @Input() suscrito: boolean = false;
    @Input() saldoSuficiente: boolean = true;
    monto: number = 0;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['fondo'] && this.fondo) {
            this.monto = this.fondo.montoMinimo;
        }
    }

    onInvertir() {
        if (this.monto >= this.fondo.montoMinimo) {
            this.invertir.emit({ fondo: this.fondo, monto: this.monto });
        }
    }

    onCancelar(): void {
        this.cancelar.emit(this.fondo);
    }
}
