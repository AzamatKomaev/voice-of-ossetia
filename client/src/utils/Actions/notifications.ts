import {INotification} from "../../interfaces";
import {AnyAction, Dispatch} from "redux";
import {addNotificationsAction, hideNotificationAction} from "../../store/notificationReducer";

export const addNotifications = (notifications: INotification[]): any => {
  return (dispatch: Dispatch<AnyAction>) => {
    return dispatch(addNotificationsAction({addedNotifications: notifications}))
  }
}

export const hideNotification = (notificationId: number): any => {
  return (dispatch: Dispatch<AnyAction>) => {
    return dispatch(hideNotificationAction({hidedNotificationId: notificationId}))
  }
}
