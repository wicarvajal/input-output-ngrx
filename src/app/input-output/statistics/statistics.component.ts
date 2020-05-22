import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { InputOutputModel } from 'src/app/models/input-output.model';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithInputs } from '../input-output.reducer';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: [
  ]
})
export class StatisticsComponent implements OnInit {
  inputs = 0;
  outputs = 0;
  totalInputs = 0;
  totalOutputs = 0;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppStateWithInputs>) { }

  ngOnInit(): void {
    this.store.select('inputOutput')
      .subscribe(({ items }) => {
        this.generateStatistics(items);
      });
  }

  generateStatistics(items: InputOutputModel[]) {
    this.inputs = 0;
    this.outputs = 0;
    this.totalInputs = 0;
    this.totalOutputs = 0;

    for (const item of items) {
      if (item.type === 'input') {
        this.totalInputs += item.amount;
        this.inputs++;
      } else {
        this.totalOutputs += item.amount;
        this.outputs++;
      }
    }

    this.doughnutChartData = [[this.totalInputs, this.totalOutputs]];
  }

}
