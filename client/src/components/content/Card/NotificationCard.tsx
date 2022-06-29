import React from 'react';
import {INotification} from "../../../interfaces";
import UserGroupItem from "../GroupItem/UserGroupItem";
import {getReadableDateFormat} from "../../../utils";

interface INotificationCard {
  notification: INotification,
  isDetail: boolean
}

const NotificationCard = ({notification, isDetail}: INotificationCard) => {
  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        {isDetail
          ?
          <UserGroupItem user={notification.data.sender}/>
          :
          <div className="list-group-item">
            <b>{notification.data.sender.name}</b><br/>
            <p className="card-subtitle mb-2 text-muted">
              {notification.data.sender.first_name && notification.data.sender.last_name
                ? notification.data.sender.first_name + ' ' + notification.data.sender.last_name
                : 'Имя и фамилия не указаны'
              }
            </p>
            <div>
              Статус: {notification.read_at
                ? <p className="text-primary">прочитано</p>
                : <p className="text-danger">не прочитано</p>
              }
            </div>
          </div>
        }
        <li className="list-group-item">
          {notification.data.text.length <= 255
            ? <p>{notification.data.text}</p>
            : <p>
                {notification.data.text.slice(0, 255)}...<br/>
                <a href={`/notifications/${notification.id}`}>Нажмите, чтобы открыть полностью</a>
              </p>
          }
        </li>
        <li className="list-group-item">
          <small className="text-muted">
            Создано: <br/>
            {getReadableDateFormat(notification.created_at)}, <br/>
            Прочитано: <br/>
            {notification.read_at ?? '-'}
          </small>
        </li>
      </ul>
    </div>
  );
};

export default NotificationCard;