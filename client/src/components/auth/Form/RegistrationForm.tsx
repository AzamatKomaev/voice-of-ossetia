import React, {useState} from 'react';
import {numberRange} from "../../../utils";
import Select from "../../common/Select";
import {AuthAPI} from "../../../api/auth";
import Spinner from "../../common/Spinner";
import {useSelector} from "react-redux";
import {IRootState} from "../../../store";
import Captcha from "../../common/Captcha";

const RegistrationForm = () => {
  const {recaptchaResponse, verified} = useSelector((state: IRootState) => state.captcha)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [locality, setLocality] = useState<string>("")
  const [age, setAge] = useState<string>("")
  const [firstName, setFirstName] = useState<string>("")
  const [lastName, setLastName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [password2, setPassword2] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const [errors, setErrors] = useState<any>({
    name: null,
    email: null,
    locality: null,
    age: null,
    first_name: null,
    last_name: null,
    password: null,
    password2: null,
    captcha_response: null
  })

  const handleRegisterUserButton = async() => {
    if (password !== password2) {
      setErrors({
        ...errors,
        password2: ['The password are not equal.']
      })
      return
    }

    setLoading(true)
    const response = await AuthAPI.register({
      name: name,
      email: email,
      locality: locality,
      age: age,
      first_name: firstName,
      last_name: lastName,
      password: password,
      password2: password2,
      captcha_response: recaptchaResponse
    })
    setLoading(false)

    if (response.status === 201) window.location.href = '/auth/login/'
    else setErrors(response.data.errors)
  }

  return (
    <div>
      <div className="container col-12 col-sm-8 col-md-7 col-lg-5">
        <h3 style={{textAlign: "center"}}>Регистрация</h3>
        {loading && <Spinner/>}
        <div className="form-group">
          <label htmlFor="email">Электронная почта</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Введите почту"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errors.email ? <p className="text-danger">{errors.email[0]}</p> : <p></p>}
        </div>
        <div className="form-group">
          <label htmlFor="name">Логин</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Введите логин"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {errors.name ? <p className="text-danger">{errors.name[0]}</p> : <p></p>}
        </div>
        <div className="form-group">
          <label htmlFor="locality">Населенный пункт</label>
          <input
            type="text"
            className="form-control"
            id="locality"
            placeholder="Введите ваше местоположение"
            value={locality}
            onChange={e => setLocality(e.target.value)}
          />
          {errors.locality ? <p className="text-danger">{errors.locality[0]}</p> : <p></p>}
        <div className="form-group">
          <label htmlFor="age">Дата рождения*</label>
          <Select name={'Выберите год'} options={numberRange(1930, 2020)} value={age} setFn={setAge}/>
          {errors.age ? <p className="text-danger">{errors.age[0]}</p> : <p></p>}
        </div>
        <div style={{display: 'flex'}}>
          <div className="form-group" style={{width: '100%'}}>
            <label htmlFor="first-name">Имя*</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Введите имя"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            {errors.first_name ? <p className="text-danger">{errors.first_name[0]}</p> : <p></p>}
          </div>
          <div className="form-group" style={{width: '100%'}}>
            <label htmlFor="last-name">Фамилия*</label>
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
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Придумайте пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errors.password ? <p className="text-danger">{errors.password[0]}</p> : <p></p>}
        </div>
        <div className="form-group">
          <label htmlFor="password2">Пароль еще раз</label>
          <input
            type="password"
            className="form-control"
            id="password2"
            placeholder="Повторите пароль"
            value={password2}
            onChange={e => setPassword2(e.target.value)}
          />
          {errors.password2 ? <p className="text-danger">{errors.password2[0]}</p> : <p></p>}
        </div>
        <Captcha/>
        <button
          className="btn btn-primary"
          onClick={handleRegisterUserButton}
          disabled={!verified}
        >Зарегистрироваться!
        </button>
        <br/>
        <small>* - необязательные поля для заполнения</small>
      </div>
      </div>
    </div>
  );
};

export default RegistrationForm;