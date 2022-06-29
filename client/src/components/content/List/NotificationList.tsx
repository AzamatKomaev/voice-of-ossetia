import React from 'react';
import {useSelector} from "react-redux";
import {IRootState} from "../../../store";
import {INotification} from "../../../interfaces";
import NotificationCard from "../Card/NotificationCard";

const NotificationList = () => {
  const notifications = useSelector((state: IRootState) => state.notification.values)

  return (
    <div className="row">
      {notifications.length > 0  &&
        notifications.map((notification: INotification, index: number) => (
          <div key={index}>
            <NotificationCard notification={notification} isDetail={false}/><br/>
          </div>
        ))}
    </div>
  );
};

export default NotificationList;