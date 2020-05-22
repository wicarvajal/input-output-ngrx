import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';
import * as inputOutput from './input-output/input-output.reducer';

export interface AppState {
  ui: ui.State;
  auth: auth.State;
  inputOutput: inputOutput.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
  inputOutput: inputOutput.inputOutputReducer
};
