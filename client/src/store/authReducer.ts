import {IUser} from '../interfaces';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';

interface IAuthReducer {
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
    case GET_CURRENT_USER:
      return {
        ...state,
        data: action.payload.response.data,
        statusCode: action.payload.response.status,
        isAuth: action.payload.response.status === 200 && action.payload.response.data?.id !== null,
        loading: false
      };
    default:
      return state;
  }
}

export default authReducer;