import { Routes } from '@angular/router';
import { FondosComponent } from './features/fondos/fondos.component';
import { HistorialComponent } from './features/historial/historial.component';

export const routes: Routes = [
    { path: '', component: FondosComponent },
    { path: 'historial', component: HistorialComponent }
  ];
