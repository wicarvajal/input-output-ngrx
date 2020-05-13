import { Routes } from '@angular/router';
import { StatisticsComponent } from '../input-output/statistics/statistics.component';
import { InputOutputComponent } from '../input-output/input-output.component';
import { DetailComponent } from '../input-output/detail/detail.component';

export const dasboardRoutes: Routes = [
  {path: '', component: StatisticsComponent},
  {path: 'ingreso-egreso', component: InputOutputComponent},
  {path: 'detalle', component: DetailComponent},
];
