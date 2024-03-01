import Logo from '../logo/logo';
import NavComponent from './nav-component';

type HeaderProps = {
  isLoggedIn: boolean;
  countFavorite?: number;
}
function Header({isLoggedIn, countFavorite} : HeaderProps): JSX.Element {

  if (isLoggedIn) {
    return (
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />

          </div>
        </div>
      </header>);
  }
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <NavComponent countFavorite={countFavorite}/>
        </div>
      </div>
    </header>
  );
}

export default Header;
