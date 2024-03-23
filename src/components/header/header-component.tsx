import Logo from '../logo/logo';
import { NavLink} from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import NavComponent from './nav-component';
import { useAppSelector } from '../../hooks/hooks';

type NavLinkPropsCust = {
  isActive: boolean;
  isPending: boolean;
}

const getClassForNavLink = ({isActive} : NavLinkPropsCust) : string =>
  isActive ? 'visually-hidden' : '';

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  if (authorizationStatus === AuthorizationStatus.NoAuth || authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <NavLink to="/login" className={getClassForNavLink}>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__login">Sign in</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </NavLink>

          </div>
        </div>
      </header>);
  }
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <NavComponent />
        </div>
      </div>
    </header>
  );
}

export default Header;
