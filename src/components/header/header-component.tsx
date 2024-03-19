import Logo from '../logo/logo';
import { AuthorizationStatus } from '../../const';
import NavComponent from './nav-component';
import { useAppSelector } from '../../hooks/hooks';

type HeaderProps = {

  countFavorite?: number;
}
function Header({ countFavorite} : HeaderProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  if (authorizationStatus === AuthorizationStatus.NoAuth || authorizationStatus === AuthorizationStatus.Unknown) {
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
