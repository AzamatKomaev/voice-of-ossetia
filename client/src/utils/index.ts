import {AnyAction, Dispatch} from "redux";
import {INotification} from "../interfaces";

export const numberRange = (start: number, end: number) => {
  return new Array(end - start).fill(null).map((d, i) => i + start);
}

export const getReadableDateFormat = (dateString: Date | string): string => {
  let dateJs = new Date(dateString)
  let readableDateFormat = dateJs.toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
  return readableDateFormat.replace(",", "");
}


/**
 * Call dispatch function.
 * @param dispatch
 * @param action
 */
export const callDispatch = (dispatch: Dispatch<AnyAction>, action: {type: string, payload: any}): void => {
  dispatch({
    type: action.type,
    payload: action.payload
  })
}

export const getNotificationType = (notification: INotification): string | null => {
  const notificationTypes: any = {
    'App\\Notifications\\UserCreatedNotification': 'Уведомление о регистраций',
    'App\\Notifications\\CommentCreatedNotification': 'Уведомление о добавлений комментария к вашему посту.'
  }
  if (!(notification.type in notificationTypes)) {
    return null;
  }
  return notificationTypes[notification.type];
}
