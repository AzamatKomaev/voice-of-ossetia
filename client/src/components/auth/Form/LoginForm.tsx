import React, {useState} from 'react';
import {AuthAPI} from "../../../api/auth";
import Reaptcha from "reaptcha";
import Spinner from "../../common/Spinner";

const LoginForm = () => {
  const [name, setName] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [recaptchaResponse, setRecaptchaResponse] = useState<string>("")
  const [recaptchaLoading, setRecaptchaLoading] = useState<boolean>(true)
  const [verified, setVerified] = useState<boolean>(false)
  const [errors, setErrors] = useState<any>({
    non_field_error: null,
    name: null,
    password: null,
    captcha_response: null
  })

  const handleLoginUserButton = async() => {
    setLoading(true)
    const response = await AuthAPI.login({
      name: name,
      password: password,
      captcha_response: recaptchaResponse
    })
    setLoading(false)

    if (response.status === 201) {
      localStorage.setItem('api-token', response.data?.token)
      window.location.href = '/'
    }
    else setErrors(response.data.errors)
  }

  const onLoad = () => {
    setRecaptchaLoading(false);
  }

  const onVerify = (recaptchaResponse: string) => {
    setVerified(true)
    setRecaptchaResponse(recaptchaResponse)
  };

  return (
    <div>
      <div className="container col-12 col-sm-8 col-md-7 col-lg-5">
        <h3 style={{textAlign: "center"}}>Вход</h3>
        {loading && <Spinner/>}
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
          <label htmlFor="name">Пароль</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Введите пароль"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errors.password ? <p className="text-danger">{errors.password[0]}</p> : null}
          {errors.non_field_errors ? <p className="text-danger">{errors.non_field_errors[0]}</p> : null}
        </div>
        <br/>
        {recaptchaLoading && <Spinner/>}
        <Reaptcha sitekey="6LeKffsgAAAAAMWElUlIuCCXiNUgIr21n6g3JEP6" onVerify={onVerify} onLoad={onLoad}/>
        <br/>
        <button
          className="btn btn-primary"
          onClick={handleLoginUserButton}
          disabled={!verified}
        >
          Войти!
        </button>
      </div>
    </div>
  );
};

export default LoginForm;