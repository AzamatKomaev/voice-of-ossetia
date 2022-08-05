import {IUser} from '../interfaces';
import {AxiosResponse} from "axios";

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const RESET_AUTH_REDUCER_STATE = "RESET_AUTH_REDUCER_STATE";

export interface IAuthReducer {
  data: IUser | null,
  statusCode: number | null,
  isAuth: boolean,
  loading: boolean
}

const defaultState: IAuthReducer = {
  data: null,
  statusCode: null,
  isAuth: false,
  loading: true
}

const authReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        data: action.payload.response.data,
        statusCode: action.payload.response.status,
        isAuth: action.payload.response.status === 200 && action.payload.response.data?.id !== null,
        loading: false
      }
    case RESET_AUTH_REDUCER_STATE:
      return defaultState
    default:
      return state;
  }
}

export const setCurrentUserAction = (payload: {response: AxiosResponse}) => ({type: SET_CURRENT_USER, payload})
export const resetAuthReducerStateAction = () => ({type: RESET_AUTH_REDUCER_STATE})

export default authReducer;