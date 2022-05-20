import {IUser} from '../interfaces';

export const GET_CURRENT_USER = 'GET_CURRENT_USER';

interface IAuthReducer {
  data: IUser | null,
  statusCode: number | null
}

const defaultState: IAuthReducer = {
  data: null,
  statusCode: null
}

const authReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        data: action.payload.response.data,
        statusCode: action.payload.response.status
      };
    default:
      return state;
  }
}

export default authReducer;