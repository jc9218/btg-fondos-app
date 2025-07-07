import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Transaccion } from '../../core/models/transaction.model';
import { UsuarioService } from '../../core/services/usuario.service';

@Component({
    selector: 'app-historial',
    standalone: true,
    imports: [CommonModule, MatTableModule],
    templateUrl: './historial.component.html',
    styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {
    displayedColumns: string[] = ['tipo', 'fondo', 'monto', 'fecha', 'notificacion'];
    historial$!: Observable<Transaccion[]>;

    constructor(private usuarioService: UsuarioService) {
        this.historial$ = this.usuarioService.historial$;
    }
}
