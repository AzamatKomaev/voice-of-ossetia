import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {IRootState} from "../../../store";
import Select from "../../common/Select";
import {numberRange} from "../../../utils";
import {AuthAPI} from "../../../api/auth";
import Spinner from "../../common/Spinner";

const SettingsForm = () => {
  const user = useSelector((state: IRootState) => state.auth.data)
  const avatar = useSelector((state: IRootState) => state.avatarLoad.file)
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [locality, setLocality] = useState<string>("")
  const [age, setAge] = useState<string>("")
  const [description, setDescription] = useState<string>(user?.description ?? "")
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<any>({
    first_name: null,
    last_name: null,
    locality: null,
    age: null,
    description: null
  })

  // Set up form for sending request.
  const setUpForm = (): FormData => {
    let formData = new FormData()
    formData.append('first_name', firstName)
    formData.append('last_name', lastName)
    formData.append('locality', locality)
    formData.append('age', age)
    formData.append('description', description)
    formData.append('avatar', avatar ?? "")
    formData.append('_method', 'patch')
    return formData
  }

  const handleUpdateUserButton = async() => {
    setLoading(true)
    let data = setUpForm()
    const response = await AuthAPI.update(data)
    setLoading(false)
    if (response.status === 200) window.location.reload()
    else setErrors(response.data.errors)
  }

  return (
    <div>
      <div className="full-name-item-flex">
        {loading && <div style={{marginTop: "-75px"}}><Spinner/><br/></div>}
        <div className="form-group" style={{width: '50%'}}>
          <label htmlFor="first-name">Имя ({user.first_name ?? 'Не назначено'})</label>
          <input
            type="text"
            className="form-control"
            id="first-name"
            placeholder="Введите имя"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
          {errors.first_name ? <p className="text-danger">{errors.first_name[0]}</p> : <p></p>}
        </div>
        <div className="form-group" style={{width: '50%'}}>
          <label htmlFor="last-name">Фамилия ({user.last_name ?? 'Не назначено'})</label>
          <input
            type="text"
            className="form-control"
            id="last-name"
            placeholder="Введите фамилию"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
          {errors.last_name ? <p className="text-danger">{errors.last_name[0]}</p> : <p></p>}
        </div>
      </div>
      <br/>
      <div className="form-group" style={{width: '100%'}}>
        <label htmlFor="locality">Населённый пункт ({user.locality})</label>
        <input
          type="text"
          className="form-control"
          id="locality"
          placeholder="Введите город/село"
          value={locality}
          onChange={e => setLocality(e.target.value)}
        />
        {errors.locality ? <p className="text-danger">{errors.locality[0]}</p> : <p></p>}
      </div>
      <br/>
      <div className="form-group">
        <label htmlFor="age">Дата рождения ({user.age ?? 'Не назначено'})</label>
        <Select name={'Выберите год'} options={numberRange(1930, 2020)} value={age} setFn={setAge}/>
        {errors.age ? <p className="text-danger">{errors.age[0]}</p> : <p></p>}
      </div>
      <div className="form-group">
        <label htmlFor="description">Описание</label><br/>
        <textarea
          className="form-control"
          onChange={e => setDescription(e.target.value)}
          style={{fontSize: "11pt"}}
          value={description}
          rows={7}
        ></textarea>
      </div>
      <br/>
      <button className="btn btn-warning" onClick={handleUpdateUserButton}>Сохранить</button>
    </div>
  );
};

export default SettingsForm;