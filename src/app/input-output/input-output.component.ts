import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InputOutputModel } from '../models/input-output.model';
import { InputOutputService } from '../services/input-output.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { isLoading, stopLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input-output',
  templateUrl: './input-output.component.html',
  styles: [
  ]
})
export class InputOutputComponent implements OnInit, OnDestroy {

  inputForm: FormGroup;
  type = 'input';
  loading = false;
  uiSubs: Subscription;

  constructor(private fb: FormBuilder,
              private ioSvc: InputOutputService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.inputForm = this.fb.group({
      description: ['', Validators.required],
      amount: ['', Validators.required]
    });

    this.uiSubs = this.store.select('ui').subscribe(load => {
      this.loading = load.isLoading;
    });
  }

  saveInput() {
    if (this.inputForm.invalid) { return; }
    console.log(this.inputForm.value);
    this.store.dispatch(isLoading());

    const { description, amount } = this.inputForm.value;

    const inputOutput = new InputOutputModel(description, amount, this.type);
    delete inputOutput.uid;

    this.ioSvc.createInputOutput(inputOutput)
      .then(() => {
        this.store.dispatch(stopLoading());
        Swal.fire('Registro Creado', description, 'success');
      })
      .catch(err => {
        this.store.dispatch(stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }

  ngOnDestroy() {
    this.uiSubs.unsubscribe();
  }
}
