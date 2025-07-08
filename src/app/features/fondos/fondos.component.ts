import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { FondoCardComponent } from '../../shared/components/fondo-card/fondo-card.component';
import { SaldoWidgetComponent } from '../../shared/components/saldo-widget/saldo-widget.component';
import { Fondo } from '../../core/models/fondo.model';
import { FondosService } from '../../core/services/fondos.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-fondos',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatRadioModule,
        MatSnackBarModule,
        FondoCardComponent,
        SaldoWidgetComponent,
    ],
    templateUrl: './fondos.component.html',
    styleUrls: ['./fondos.component.scss']
})
export class FondosComponent implements OnInit {
    fondos: Fondo[] = [];
    metodoForm!: FormGroup;
    saldo$!: Observable<number>;
    cargando = true;
    saldoDisponible: number = 0;

    constructor(
        private fb: FormBuilder,
        private fondosService: FondosService,
        private usuarioService: UsuarioService,
        private snackBar: MatSnackBar,
        private cdRef: ChangeDetectorRef
    ) {
        this.saldo$ = this.usuarioService.saldo$;
    }

    ngOnInit(): void {
        this.metodoForm = this.fb.group({
            metodo: ['email', Validators.required]
        });

        this.saldo$.subscribe(saldo => {
            this.saldoDisponible = saldo;
        });

        this.fondosService.getFondos().subscribe({
            next: (fondos) => {
                this.fondos = fondos;
                this.cargando = false;
                this.cdRef.detectChanges();
            },
            error: (err) => {
                console.error('Error al obtener fondos:', err);
                this.cargando = false;
            }
        });
    }

    invertir(data: { fondo: Fondo, monto: number }) {
        const { fondo, monto } = data;

        if (this.saldoDisponible < monto) {
            this.snackBar.open('❌ Saldo insuficiente', 'Cerrar', { duration: 3000 });
            return;
        }

        this.usuarioService.suscribirConMonto(fondo, monto);
        this.snackBar.open('✅ Inversión exitosa', 'Cerrar', { duration: 2000 });
        this.cdRef.detectChanges();
      }

    estaSuscrito(fondo: Fondo): boolean {
        return this.usuarioService.estaSuscrito(fondo);
    }

    cancelar(fondo: Fondo): void {
        this.usuarioService.cancelar(fondo);
        this.snackBar.open('Cancelación realizada', 'Cerrar', { duration: 2000 });

        this.cdRef.detectChanges();
    }
}
