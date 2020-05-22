import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { InputOutputComponent } from './input-output.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';
import { OrderInputsPipe } from '../pipes/order-inputs.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutesModule } from '../dashboard/dashboard-routes.module';
import { StoreModule } from '@ngrx/store';
import { inputOutputReducer } from './input-output.reducer';

@NgModule({
  declarations: [
    DashboardComponent,
    InputOutputComponent,
    StatisticsComponent,
    DetailComponent,
    OrderInputsPipe
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('inputOutput', inputOutputReducer),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    RouterModule,
    DashboardRoutesModule
  ]
})
export class InputOutputModule { }
