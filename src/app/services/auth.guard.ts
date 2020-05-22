import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authSvc: AuthService,
              private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authSvc.isAuth().pipe(
      tap(state => {
        if (!state) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

  canLoad(): Observable<boolean> {
    return this.authSvc.isAuth().pipe(
      tap(state => {
        console.log(state);
        if (!state) {
          this.router.navigate(['/login']);
        }
      }),
      // se usa el take para cancelar la subscripcion al recibir la primera respuesta
      // ya que en el canload no me subscribo, no puedo desuscribirme de otra forma
      take(1)
    );
  }
}
