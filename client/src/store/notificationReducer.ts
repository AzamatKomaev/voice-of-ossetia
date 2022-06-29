import {INotification} from "../interfaces";

export const ADD_NOTIFICATIONS = "ADD_NOTIFICATIONS";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

interface INotificationReducerState {
  values: Array<INotification>,
  nextPage: string | null
}

const defaultState: INotificationReducerState = {
  values: [],
  nextPage: null
}

export const notificationReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case ADD_NOTIFICATIONS:
      return {
        ...state,
        values: [...state.values, ...action.payload.addedNotifications],
        nextPage: action.payload.nextPage
      }
    case HIDE_NOTIFICATION:
      return {
        ...state,
        values: state.values.filter((post) => post.id !== action.payload.hidedNotification.id)
      }
    default:
      return state;
  }
}
