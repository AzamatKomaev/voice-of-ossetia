import React from 'react';
import {useSelector} from "react-redux";
import {IRootState} from "../store";
import Http404Error from "../components/common/Http404Error";
import UserItem from "../components/user/Item/UserItem";
import SettingsItem from "../components/user/Item/SettingsItem";

const UserSettingsPage = () => {
  const auth = useSelector((state: IRootState) => state.auth);

  if (!auth.isAuth) {
    return <Http404Error/>
  }

  return (
    <div className="container">
      <UserItem user={auth?.data} showButtons={false}/>
      <br/>
      <SettingsItem/>
    </div>
  );
};

export default UserSettingsPage;