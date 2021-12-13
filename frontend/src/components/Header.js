import logo from '../images/logo.svg';

function Header( {page, email = '', method} ) {

  let buttonTitle;

  if (page === 'log_in') {
    buttonTitle = 'Регистрация'
  } else if (page === 'sign_up') {
    buttonTitle = 'Вход'
  } else if (page === 'main') {
    buttonTitle = 'Выйти'
  }

  return (
    <header className={`header ${page === 'main' ? 'header_main' : ''}`}>
      <img className={`header__logo ${page === 'main' ? 'header__logo_main' : ''}`} src={logo} alt="Логотип" />
      <div className={`header__line ${page === 'main' ? 'header__line_main' : ''}`}>
        {page === 'main' && (
          <p className="header__user-email">
            {email}
          </p>
        )}
        <button className={`header__button ${page === 'main' && 'header__button_title_logout'}`} type="button" onClick={method}>
          {buttonTitle}
        </button>
      </div> 
    </header>
  )
}

export default Header