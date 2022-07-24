import UserGroupItem from "../GroupItem/UserGroupItem";
import {getNotificationType, getReadableDateFormat} from "../../../utils";
import {INotification} from "../../../interfaces";
import ActionButtonsGroupItem from "../GroupItem/ActionButtonsGroupItem";
import React from "react";
import {useDispatch} from "react-redux";
import {useHttpSender} from "../../../utils/hooks";
import {hideNotification} from "../../../utils/Actions/notifications";
import Modal from "../../common/Modal";
import {Link} from "react-router-dom";

interface INotificationCard {
  notification: INotification,
  isDetail: boolean
}

const NotificationCard = ({notification, isDetail}: INotificationCard) => {
  const dispatch = useDispatch()
  const httpSender = useHttpSender('notifications')

  const deleteNotification = async() => {
    const response = await httpSender.delete(notification.id)
    if (response.status === 204) {
      dispatch(hideNotification(notification.id))
    }
  }

  return (
    <div className="card">
      <Modal
        id={`notification-${notification.id}`}
        title="Удалить"
        content={<p>
          Вы точно хотите удалить <b>{getNotificationType(notification)}</b>,
          отправленное пользователем <i>{notification.data.sender.name}</i>?
      </p>}
        buttons={[{
          onClick: deleteNotification,
          value: 'Удалить'
        }]}
      />
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
            {notification.data.text.length <= 255 || isDetail
              ?
              <Link to={`/notifications/${notification.id}`} className="text-dark">
                {notification.data.text}
              </Link>
              :
              <div>
                <Link to={`/notifications/${notification.id}`} className="text-dark">
                  {notification.data.text.slice(0, 255)}...<br/>
                </Link>
                <Link to={`/notifications/${notification.id}`}>Нажмите, чтобы открыть полностью</Link>
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
            onClick: () => dispatch(hideNotification(notification.id)),
            className: "btn btn-secondary"
          }}
          deleting={{
            className: "btn btn-danger",
            "data-bs-target": `#notification-${notification.id}`,
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