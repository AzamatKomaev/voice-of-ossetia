import React from 'react';
import {getMediaFullPath} from "../../../api/media";
import {IUser} from "../../../interfaces";
import {Link} from "react-router-dom";

interface IUserGroupItem {
  user: IUser
}

const UserGroupItem = ({user}: IUserGroupItem) => {
  return (
    <li className="list-group-item">
      <div style={{display: "flex"}}>
        <img
          width={52}
          height={52}
          src={getMediaFullPath(user.avatar ?? 'public/user-icon.png')}
          alt={'пасхалка'}
          style={{borderRadius: "50%"}}
        />
        <div id="user-data" style={{marginLeft: "10px"}}>
          <h5 className="card-title">
            <Link to={`/users/${user.id}`} className="text-dark">{user.name}</Link>
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {user.first_name && user.last_name
              ? user.first_name + ' ' + user.last_name
              : 'Имя и фамилия не указаны'
            }
          </h6>
        </div>
      </div>
    </li>
  );
};

export default UserGroupItem;