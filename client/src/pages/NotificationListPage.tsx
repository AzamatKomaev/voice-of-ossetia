import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {usePagination} from "../utils/hooks";
import NotificationList from "../components/content/List/NotificationList";
import Spinner from "../components/common/Spinner";
import {addNotifications} from "../utils/Actions/notifications";

const NotificationListPage = () => {
  const dispatch = useDispatch();
  const [notifications, notificationsLoading] = usePagination('api/notifications', {})

  useEffect(() => {
    if (notifications && notifications.length > 0) {
      dispatch(addNotifications(notifications))
    }
  }, [notifications])


  return (
    <div className="container">
      <br/>
      <NotificationList/>
      {notificationsLoading &&
          <div>
              <br/><Spinner/><br/>
          </div>
          }
    </div>
  );
};

export default NotificationListPage;