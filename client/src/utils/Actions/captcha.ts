import {AnyAction, Dispatch} from "redux";
import {setRecaptchaLoadingAction, setRecaptchaResponseAction, setVerifiedAction} from "../../store/captchaReducer";

export const setRecaptchaResponse = (captchaResponse: string): any => {
  return (dispatch: Dispatch<AnyAction>) => {
    return dispatch(setRecaptchaResponseAction({value: captchaResponse}))
  }
}

export const setRecaptchaLoading = (captchaLoading: boolean): any => {
  return (dispatch: Dispatch<AnyAction>) => {
    return dispatch(setRecaptchaLoadingAction({value: captchaLoading}))
  }
}

export const setVerified = (verified: boolean): any => {
  return (dispatch: Dispatch<AnyAction>) => {
    return dispatch(setVerifiedAction({value: verified}))
  }
}
