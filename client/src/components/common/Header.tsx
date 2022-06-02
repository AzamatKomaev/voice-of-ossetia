import React from 'react';
import {useSelector} from "react-redux";
import {IRootState} from "../../store";

const navItems = [
  {
    className: 'nav-link active',
    href: '/',
    value: 'На главную'
  },
  {
    className: 'nav-link',
    href: '/posts/create',
    value: 'Создать пост'
  },
  {
    className: 'nav-link',
    href: '/posts',
    value: 'Посты'
  },
  {
    className: 'nav-link',
    href: '/',
    value: 'Связь с администратором'
  }
]

const authNavItems = [
  {
    className: 'nav-link text-danger',
    href: '/auth/login',
    value: 'Вход'
  },
  {
    className: 'nav-link text-danger',
    href: '/auth/create',
    value: 'Регистрация'
  }
]

const Header = () => {
  const auth = useSelector((state: IRootState) => state.auth)

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Голос Осетий</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {navItems.map((nav, index) => (
              <li key={index} className="nav-item">
                <a className={nav.className} href={nav.href}>{nav.value}</a>
              </li>
            ))}
            {!auth.isAuth ?
            authNavItems.map((nav, index) => (
              <li key={index} className="nav-item">
                <a className={nav.className} href={nav.href}>{nav.value}</a>
              </li>
            ))
            :
            <li className="nav-item">
              <a className="nav-link text-danger" href="/auth/logout">Выйти</a>
            </li>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;