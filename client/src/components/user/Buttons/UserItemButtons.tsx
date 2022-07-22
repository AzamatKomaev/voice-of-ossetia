import React from 'react';
import {IUser} from "../../../interfaces";
import {useSelector} from "react-redux";
import {IRootState} from "../../../store";

const UserItemButtons = ({user}: {user: IUser}) => {
  const auth = useSelector((state: IRootState) => state.auth)

  if (auth?.data?.id === user.id) {
    return (
      <button id="track-button" className="btn btn-secondary">
        Редактировать
      </button>
    )
  }

  return (
    <button id="track-button" className="btn btn-primary">
      Отслеживать
    </button>
  );
};

export default UserItemButtons;