import React, {useState} from 'react';
import Select from "../../common/Select";
import {numberRange} from "../../../utils";

const SettingsItem = () => {
  const [age, setAge] = useState<string>("");

  return (
    <div style={{marginLeft: "10px"}}>
      <div style={{marginTop: "-20px"}}>
        <h4>Нажмите на аватарку, чтобы загрузить новую</h4>
      </div>
      <br/>
      <div className="full-name-item-flex">
        <div className="form-group" style={{width: '50%'}}>
          <label htmlFor="first-name">Имя</label>
          <input
            type="text"
            className="form-control"
            id="email"
            placeholder="Введите имя"
          />
        </div>
        <div className="form-group" style={{width: '50%'}}>
          <label htmlFor="last-name">Фамилия</label>
          <input
            type="text"
            className="form-control"
            id="last-name"
            placeholder="Введите фамилию"
          />
        </div>
      </div>
      <br/>
      <div className="form-group" style={{width: '100%'}}>
        <label htmlFor="locality">Населённый пункт</label>
        <input
          type="text"
          className="form-control"
          id="last-name"
          placeholder="Введите город/село"
        />
      </div>
      <br/>
      <div className="form-group">
        <label htmlFor="age">Дата рождения</label>
        <Select name={'Выберите год'} options={numberRange(1930, 2020)} value={age} setFn={setAge}/>
      </div>
    </div>
  );
};

export default SettingsItem;