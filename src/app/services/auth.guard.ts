import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

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

}
