import React, {ChangeEvent, useRef, useState} from 'react';
import {useSelector} from "react-redux";
import {IRootState} from "../../../store";
import UserGroupItem from "../../content/GroupItem/UserGroupItem";
import UserItem from "../Item/UserItem";

const AvatarInput = () => {
  const user = useSelector((state: IRootState) => state.auth.data)
  const avatarRef = useRef<any>(null)
  const [avatar, setAvatar] = useState<any>(null)
  const [avatarLoad, setAvatarLoad] = useState<boolean>(false)


  const onFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAvatarLoad(false)
    const reader = new FileReader()
    const avatar = avatarRef.current
    const file = e.target.files ? e.target.files[0] : null

    if (!file) {
      alert('Ошибка: загруженное изображение не найдено')
      return ;
    }

    reader.readAsDataURL(file)
    reader.onload = () => {
      avatar.src = reader.result
      setAvatar(reader.result)
      setAvatarLoad(true)
    }
  }

  return (
    <div>
      <b className="text-danger">Внимание!</b>
      <p className="text-danger">На данный момент у нас отсутствует редактор изображений. Рекомендуем вам выбрать аватарку с одинаковой шириной и высотой</p>
      <input type="file" accept="image/*" onChange={onFileInputChange}/><br/><br/>
      <div style={{width: "100%"}}>
        <img ref={avatarRef} className="avatar-load" alt="user-avatar-load"/><br/><br/>
      </div>
      <p>Вид при просмотре поста/комментария:</p>
      {avatarLoad && <UserGroupItem user={user} avatar={avatar}/>}
      <br/>
      <p>Вид при просмотре вашего профиля:</p>
      {avatarLoad && <UserItem user={user} showButtons={false} avatar={avatar}/>}
    </div>
  );
};

export default AvatarInput;