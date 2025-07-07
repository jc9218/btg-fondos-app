import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-saldo-widget',
    standalone: true,
    imports: [CommonModule, MatCardModule],
    templateUrl: './saldo-widget.component.html',
    styleUrls: ['./saldo-widget.component.scss']
})
export class SaldoWidgetComponent implements OnInit {
    saldo$!: Observable<number>;

    constructor(private usuarioService: UsuarioService) { }

    ngOnInit(): void {
        this.saldo$ = this.usuarioService.saldo$;
    }
  }