import {combineReducers, createStore} from 'redux';
import authReducer from "./authReducer";
import {fileReducer} from "./fileReducer";
import {commentReducer} from "./commentReducer";
import {postReducer} from "./postReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  file: fileReducer,
  post: postReducer,
  comment: commentReducer
})
export type IRootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer);
