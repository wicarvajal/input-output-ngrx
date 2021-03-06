import { createReducer, on } from '@ngrx/store';
import { InputOutputModel } from '../models/input-output.model';
import { setItems, unsetItems } from './input-output.actions';
import { AppState } from '../app.reducer';

export interface State {
  items: InputOutputModel[];
}

export interface AppStateWithInputs extends AppState {
  inputOutput: State;
}

export const initialState: State = {
  items: [],
};

const _inputOutpurReducer = createReducer(initialState,
  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unsetItems, state => ({ ...state, items: [] }))
);

export function inputOutputReducer(state, action) {
  return _inputOutpurReducer(state, action);
}
