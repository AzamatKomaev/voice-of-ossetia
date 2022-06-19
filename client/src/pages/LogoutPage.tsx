import React, {useEffect, useState} from 'react';

const LogoutPage = () => {
  const [isLogout, setIsLogout] = useState<boolean>(false);

  const handleLogoutButton = () => {
    localStorage.removeItem('api-token');
    setIsLogout(true);
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
              <a href="/auth/login">Войти</a><br/>
              <a href="/auth/create">Зарегистрироваться</a>
          </div>
      }
    </div>
  );
};

export default LogoutPage;