import {INotification, IUser} from "../interfaces";

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

export const getNotificationType = (notification: INotification): string | null => {
  const notificationTypes: any = {
    'App\\Notifications\\UserCreatedNotification': 'Уведомление о регистраций',
    'App\\Notifications\\CommentCreatedNotification': 'Уведомление о добавлений комментария к вашему посту'
  }
  if (!(notification.type in notificationTypes)) {
    return null;
  }
  return notificationTypes[notification.type];
}

export const getUserStatus = (user: IUser): string => {
  if (!user.is_active) return 'Гость';
  if (user.is_superuser) return 'Администратор';
  if (user.is_active) return 'Пользователь';
  return 'Неизвестно'
}
