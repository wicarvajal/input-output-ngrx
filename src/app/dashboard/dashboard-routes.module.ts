import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { dasboardRoutes } from './dashboard.routes';

const childRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dasboardRoutes,
    // canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(childRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRoutesModule { }
