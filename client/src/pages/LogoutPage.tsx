import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {resetAuthReducerState} from "../utils/Actions/auth";

const LogoutPage = () => {
  const dispatch = useDispatch()
  const [isLogout, setIsLogout] = useState<boolean>(false)

  const handleLogoutButton = () => {
    localStorage.removeItem('api-token');
    setIsLogout(true);
    dispatch(resetAuthReducerState())
  }

  return (
    <div style={{marginLeft: "10px"}}>
      <br/>
      {isLogout
        ? <h1>Вы успешно вышли из своего аккаунта!</h1>
        : <button className="btn btn-danger" onClick={handleLogoutButton}>Хочу выйти!</button>
      }
      <br/>
      {isLogout &&
          <div>
              <Link to="/auth/login">Войти</Link><br/>
              <Link to="/auth/create">Зарегистрироваться</Link>
          </div>
      }
    </div>
  );
};

export default LogoutPage;