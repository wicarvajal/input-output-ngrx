import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { isLoading, stopLoading } from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loading = false;
  uiSubs: Subscription;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['willy@asd.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    });

    this.uiSubs = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  login() {
    if (this.loginForm.invalid) { return; }

    this.store.dispatch(isLoading());

    // Swal.fire({
    //   title: 'Espere...',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    const { email, password } = this.loginForm.value;
    this.auth.login(email, password)
      .then(res => {
        console.log(res);
        // Swal.close();
        this.store.dispatch(stopLoading());
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.store.dispatch(stopLoading());
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message
        });
      });
  }

  ngOnDestroy(): void {
    this.uiSubs.unsubscribe();
  }

}
