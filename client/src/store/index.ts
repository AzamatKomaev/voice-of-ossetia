import {applyMiddleware, combineReducers, createStore} from 'redux';
import authReducer from "./authReducer";
import {fileReducer} from "./fileReducer";
import {commentReducer} from "./commentReducer";
import {postReducer} from "./postReducer";
import {notificationReducer} from "./notificationReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  auth: authReducer,
  file: fileReducer,
  post: postReducer,
  comment: commentReducer,
  notification: notificationReducer
})
export type IRootState = ReturnType<typeof rootReducer>
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
