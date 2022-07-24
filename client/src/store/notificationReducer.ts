import {INotification} from "../interfaces";

const ADD_NOTIFICATIONS = "ADD_NOTIFICATIONS";
const HIDE_NOTIFICATION = "HIDE_NOTIFICATION";
const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";

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
    case CLEAR_NOTIFICATIONS:
      return {
        ...state, values: []
      }
    default:
      return state;
  }
}

export const addNotificationsAction = (payload: {addedNotifications: INotification[]}) =>
  ({type: ADD_NOTIFICATIONS, payload})
export const hideNotificationAction = (payload: {hidedNotificationId: number}) =>
  ({type: HIDE_NOTIFICATION, payload})
export const clearNotificationsAction = () => ({type: CLEAR_NOTIFICATIONS})
