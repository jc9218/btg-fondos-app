import { Component, OnInit } from '@angular/core';
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

    constructor(
        private fb: FormBuilder,
        private fondosService: FondosService,
        private usuarioService: UsuarioService,
        private snackBar: MatSnackBar
    ) {
        this.saldo$ = this.usuarioService.saldo$;
     }

    ngOnInit(): void {
        this.metodoForm = this.fb.group({
            metodo: ['email', Validators.required]
        });

        this.fondosService.getFondos().subscribe({
            next: (fondos) => {
                this.fondos = fondos;
                this.cargando = false;
                console.log('Fondos cargados:', fondos, this.cargando);
            },
            error: (err) => {
                console.error('Error al obtener fondos:', err);
                this.cargando = false;
            }
          });
    }

    suscribir(fondo: Fondo): void {
        console.log('📥 suscribir() en el componente padre:', fondo);

        const metodo = this.metodoForm.value.metodo;
        const resultado = this.usuarioService.suscribir(fondo, metodo);

        if (resultado === 'Saldo insuficiente') {
            this.snackBar.open('❌ Saldo insuficiente', 'Cerrar', { duration: 3000 });
        } else {
            this.snackBar.open('✅ Suscripción exitosa', 'Cerrar', { duration: 2000 });
        }
    }

    cancelar(fondo: Fondo): void {
        console.log('📥 suscribir() en el componente padre:', fondo);
        
        this.usuarioService.cancelar(fondo);
        this.snackBar.open('🧾 Cancelación realizada', 'Cerrar', { duration: 2000 });
    }
}
