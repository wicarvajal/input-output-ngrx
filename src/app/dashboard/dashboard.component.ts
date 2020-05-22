import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { InputOutputService } from '../services/input-output.service';
import { setItems } from '../input-output/input-output.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs: Subscription;
  ioSubs: Subscription;
  userName: string;

  constructor(private store: Store<AppState>,
              private ioSvc: InputOutputService) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth').pipe(
      filter(auth => auth.user !== null)
    ).subscribe(({user}) => {
      this.userName = user.name;
      this.ioSubs = this.ioSvc.initInputsOutputs(user.uid)
      .subscribe(inOutOutputs => {
        this.store.dispatch(setItems({items: inOutOutputs}));
      });
    });
  }

  ngOnDestroy(): void {
    this.ioSubs?.unsubscribe();
    this.userSubs?.unsubscribe();
  }
}
