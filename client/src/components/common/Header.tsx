import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {IRootState} from "../../store";
import {Link} from "react-router-dom";

const Header = () => {
  const auth = useSelector((state: IRootState) => state.auth)

  useEffect(() => {

  }, [])

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
      className: 'nav-link',
      href: `/users/${auth?.data?.id}`,
      value: 'Профиль'
    },
    {
      className: 'nav-link',
      href: '/notifications',
      value: `Уведомления ${auth.isAuth && auth.data.notification_count ? 'new: ' + auth.data.notification_count : ''}`
    },
    {
      className: 'nav-link text-danger',
      href: '/auth/logout',
      value: 'Выйти'
    }
  ]

  const notAuthNavItems = [
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

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Голос Осетий <small style={{fontSize: "9pt"}}>beta</small></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            {navItems.map((nav, index) => (
              <li key={index} className="nav-item">
                <Link className={nav.className} to={nav.href}>{nav.value}</Link>
              </li>
            ))}
            {auth.isAuth
              ?
              authNavItems.map((nav, index) => (
                <li key={index} className="nav-item">
                  <Link className={nav.className} to={nav.href}>{nav.value}</Link>
                </li>
              ))
              :
              notAuthNavItems.map((nav, index) => (
                <li key={index} className="nav-item">
                  <Link className={nav.className} to={nav.href}>{nav.value}</Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;