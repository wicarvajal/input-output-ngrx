import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { InputOutputModel } from '../../models/input-output.model';
import { Subscription } from 'rxjs';
import { InputOutputService } from '../../services/input-output.service';
import Swal from 'sweetalert2';
import { AppStateWithInputs } from '../input-output.reducer';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit, OnDestroy {
  inputsOutputs: InputOutputModel[] = [];
  ioSubs: Subscription;

  constructor(private store: Store<AppStateWithInputs>,
              private ioSvc: InputOutputService) { }

  ngOnInit(): void {
    this.ioSubs = this.store.select('inputOutput')
    .subscribe(({items}) => this.inputsOutputs = items);
  }

  deleteItem(uid: string) {
    // console.log(uid);
    this.ioSvc.deleteInputOutput(uid)
    .then(() => Swal.fire('Borrado', 'Item borrado', 'success'))
    .catch(err => Swal.fire('Error', err.message, 'error'));
  }

  ngOnDestroy(): void {
    this.ioSubs.unsubscribe();
  }
}
