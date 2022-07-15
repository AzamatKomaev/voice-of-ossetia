import React from 'react';
import {IUser} from "../../../interfaces";
import UserItem from "../Item/UserItem";

const UserCard = ({user}: {user: IUser}) => {
  return (
    <div className="card">
      <UserItem user={user}/>
    </div>
  );
};

export default UserCard;