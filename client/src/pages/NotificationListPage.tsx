import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {usePagination} from "../utils/hooks";
import {callDispatch} from "../utils";
import {ADD_NOTIFICATIONS} from "../store/notificationReducer";
import NotificationList from "../components/content/List/NotificationList";
import Spinner from "../components/common/Spinner";

const NotificationListPage = () => {
  const dispatch = useDispatch();

  const [notifications, notificationsLoading] = usePagination('api/notifications', {})

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      callDispatch(dispatch, {
        type: ADD_NOTIFICATIONS,
        payload: {
          addedNotifications: notifications ?? []
        }
      })
    }
  }, [notifications])


  return (
    <div className="container">
      <br/>
      <NotificationList/>
      {notificationsLoading && <Spinner/>}
    </div>
  );
};

export default NotificationListPage;