import React from 'react';
import {useParams} from "react-router-dom";
import {useFetch} from "../utils/hooks";
import Spinner from "../components/common/Spinner";
import NotificationCard from "../components/content/Card/NotificationCard";

const NotificationDetailPage = () => {
  const {notificationId} = useParams();

  const [notification, notificationStatus, notificationLoading]: ReturnType<typeof useFetch> = useFetch(
    `api/notifications/${notificationId}/`, 'get', {}
  )

  if (notificationLoading) {
    return <Spinner/>
  }

  if (notificationStatus === 404) {
    return <h1>404 error</h1>
  }

  return (
    <div className="container">
      <br/>
      {notification && <NotificationCard notification={notification} isDetail={true}/>}
    </div>
  );
};

export default NotificationDetailPage;