import UserGroupItem from "../GroupItem/UserGroupItem";
import {getNotificationType, getReadableDateFormat} from "../../../utils";
import {INotification} from "../../../interfaces";
import ActionButtonsGroupItem from "../GroupItem/ActionButtonsGroupItem";
import React from "react";

interface INotificationCard {
  notification: INotification,
  isDetail: boolean
}

const NotificationCard = ({notification, isDetail}: INotificationCard) => {
  return (
    <div className="card">
      <ul className="list-group list-group-flush">
        <p className="text-primary" style={{padding: ".5rem 1rem"}}>{getNotificationType(notification) ?? 'Уведомление'}</p>
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
              ?
              <a href={`/notifications/${notification.id}`} className="text-dark" style={{textDecoration: "none"}}>
                {notification.data.text}
              </a>
              :
              <div>
                <a href={`/notifications/${notification.id}`} className="text-dark" style={{textDecoration: "none"}}>
                  {notification.data.text.slice(0, 255)}...<br/>
                </a>
                <a href={`/notifications/${notification.id}`}>Нажмите, чтобы открыть полностью</a>
              </div>
            }
        </li>
        <li className="list-group-item">
          <small className="text-muted">
            Прочитано: <br/>
            {notification.read_at ? getReadableDateFormat(notification.read_at) : '-'}<br/>
            Создано: <br/>
            {getReadableDateFormat(notification.created_at)}, <br/>
          </small>
        </li>
        <ActionButtonsGroupItem
          complaining={{
            onClick: () => {},
            className: "btn btn-primary"
          }}
          hiding={{
            onClick: () => {},
            className: "btn btn-secondary"
          }}
          deleting={{
            className: "btn btn-danger",
            "data-bs-target": `#post-1`,
            "data-bs-toggle": "modal"
          }}
          showDeletingButton={true}
          showHidingButton={true}
        />
      </ul>
    </div>
  );
};

export default NotificationCard;