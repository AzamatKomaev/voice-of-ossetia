import React, {useCallback} from 'react';
import {getMediaFullPath} from "../../../api/media";
import {IUser} from "../../../interfaces";
import {getUserStatus} from "../../../utils";
import UserItemButtons from "../Buttons/UserItemButtons";

interface IUserItem {
  user: IUser,
  showButtons: boolean,
  avatar?: string | null
}

const UserItem = ({user, showButtons, avatar=null}: IUserItem) => {
  const userStatusCallback = useCallback(() => getUserStatus(user), [user])

  return (
    <div style={{padding: "15px"}}>
      <div className="user-item">
        <img
          src={avatar ?? getMediaFullPath(user.avatar ?? 'public/user-icon.png')}
          alt={'user-' + user.id}
          className="user-avatar"
          style={{border: "1px solid #555"}}
        />
        <div id="user-data">
          <h5 className="card-title" style={{fontSize: "25pt"}}>{user.name}</h5>
          <p className="fw-light text-danger" style={{marginTop: "-9px", marginLeft: "3px"}}>{userStatusCallback()}</p>
        </div>
        <div className="break"></div>
        {showButtons && <UserItemButtons user={user}/>}
      </div>
    </div>
  );
};

export default UserItem;