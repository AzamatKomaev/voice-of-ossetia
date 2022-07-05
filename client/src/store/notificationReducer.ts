import {INotification} from "../interfaces";

export const ADD_NOTIFICATIONS = "ADD_NOTIFICATIONS";
export const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";

interface INotificationReducerState {
  values: Array<INotification>
}

const defaultState: INotificationReducerState = {
  values: []
}

export const notificationReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case ADD_NOTIFICATIONS:
      return {
        ...state,
        values: [...state.values, ...action.payload.addedNotifications]
      }
    case HIDE_NOTIFICATION:
      return {
        ...state,
        values: state.values.filter((post) => post.id !== action.payload.hidedNotificationId)
      }
    default:
      return state;
  }
}

export const addNotificationsAction = (payload: {addedNotifications: INotification[]}) =>
  ({type: ADD_NOTIFICATIONS, payload})
export const hideNotificationAction = (payload: {hidedNotificationId: number}) =>
  ({type: HIDE_NOTIFICATION, payload})
