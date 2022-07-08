import React from 'react';
import {useParams} from "react-router-dom";
import {useFetch} from "../utils/hooks";
import Http404Error from "../components/common/Http404Error";
import Spinner from "../components/common/Spinner";
import UserGroupItem from "../components/content/GroupItem/UserGroupItem";

const UserDetailPage = () => {
  const {userId} = useParams();
  const [userData, userStatusCode, userLoading] = useFetch(`api/users/${userId}`, {});

  if (userStatusCode === 404) {
    return (<Http404Error/>)
  }

  if (userLoading) {
    return (<Spinner/>)
  }

  return (
    <div>
      <UserGroupItem user={userData}/>
    </div>
  );
};

export default UserDetailPage;