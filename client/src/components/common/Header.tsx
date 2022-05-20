import React, {useState} from 'react';

const navItems = [
  {
    className: 'nav-link active',
    href: '/',
    value: 'На главную'
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
  const [isAuth, setIsAuth] = useState<boolean>(false)

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
            {navItems.map(nav => (
              <li className="nav-item">
                <a className={nav.className} href={nav.href}>{nav.value}</a>
              </li>
            ))}
            {!isAuth ?
            authNavItems.map(nav => (
              <li className="nav-item">
                <a className={nav.className} href={nav.href}>{nav.value}</a>
              </li>
            ))
            :
            null
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;