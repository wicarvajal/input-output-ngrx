import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { isLoading, stopLoading } from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  uiSubs: Subscription;
  loading = false;

  constructor(private fb: FormBuilder,
              private authSvc: AuthService,
              private router: Router,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubs = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading;
    });
  }

  createUser() {
    if (this.registerForm.invalid) { return; }

    this.store.dispatch(isLoading());
    // Swal.fire({
    //   title: 'Espere...',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   }
    // });

    const { name, email, password } = this.registerForm.value;

    this.authSvc.createUser(name, email, password)
      .then(credentials => {
        // console.log(credentials);
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
