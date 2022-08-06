import React from 'react';
import AvatarInputModal from "../Modal/AvatarInputModal";
import SettingsForm from "../Form/SettingsForm";

const SettingsItem = () => {
  return (
    <div style={{marginLeft: "10px"}}>
      <div style={{marginTop: "-20px"}}>
        <h4>Загрузить изображение</h4>
        <AvatarInputModal/>
      </div>
      <br/>
      <SettingsForm/>
    </div>
  );
};

export default SettingsItem;