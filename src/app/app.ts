import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule
  ],
  template: `
    <mat-toolbar color="primary">
      <span>BTG Fondos</span>
      <span class="spacer"></span>
      <a mat-button routerLink="/">Fondos</a>
      <a mat-button routerLink="/historial">Historial</a>
    </mat-toolbar>

    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    .container { padding: 1rem; }
  `]
})
export class App { }
