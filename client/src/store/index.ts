import {combineReducers, createStore} from 'redux';
import authReducer from "./authReducer";
import {fileReducer} from "./fileReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  file: fileReducer
})
export type IRootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer);
