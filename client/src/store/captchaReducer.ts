const SET_RECAPTCHA_RESPONSE = "SET_RECAPTCHA_RESPONSE"
const SET_RECAPTCHA_LOADING = "SET_RECAPTCHA_LOADING"
const SET_VERIFIED = "SET_VERIFIED"

interface ICaptchaReducerState {
  recaptchaResponse: string,
  recaptchaLoading: boolean,
  verified: boolean
}

const defaultState: ICaptchaReducerState = {
  recaptchaResponse: "",
  recaptchaLoading: true,
  verified: false
}

export const captchaReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_RECAPTCHA_RESPONSE:
      return {
        ...state, recaptchaResponse: action.payload.value
      }
    case SET_RECAPTCHA_LOADING:
      return {
        ...state, recaptchaLoading: action.payload.value
      }
    case SET_VERIFIED:
      return {
        ...state, verified: action.payload.value
      }
    default:
      return state
  }
}

export const setRecaptchaResponseAction = (payload: {value: string}) => ({type: SET_RECAPTCHA_RESPONSE, payload})
export const setRecaptchaLoadingAction = (payload: {value: boolean}) => ({type: SET_RECAPTCHA_LOADING, payload})
export const setVerifiedAction = (payload: {value: boolean}) => ({type: SET_VERIFIED, payload})
