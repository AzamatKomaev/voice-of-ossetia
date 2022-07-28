import {AnyAction, Dispatch} from "redux";
import {resetAuthReducerStateAction, setCurrentUserAction} from "../../store/authReducer";
import {AxiosResponse} from "axios";

export const setCurrentUser = (response: AxiosResponse): any => {
  return (dispatch: Dispatch<AnyAction>) => {
    return dispatch(setCurrentUserAction({response}))
  }
}

export const resetAuthReducerState = (): any => {
  return (dispatch: Dispatch<AnyAction>) => {
    return dispatch(resetAuthReducerStateAction())
  }
}
