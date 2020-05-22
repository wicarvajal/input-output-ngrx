import { createAction, props } from '@ngrx/store';
import { InputOutputModel } from '../models/input-output.model';

export const unsetItems = createAction('[InputOutput] unsetItems');
export const setItems = createAction('[InputOutput] setItems',
  props<{ items: InputOutputModel[] }>()
);
