import Logo from '../logo/logo';
import { memo } from 'react';
import { NavLink} from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import NavComponent from './nav-component';
import { useAppSelector } from '../../hooks/hooks';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

type NavLinkPropsCust = {
  isActive: boolean;
  isPending: boolean;
}

type HeaderComponentProps = {
  favorites?: number;
}

const getClassForNavLink = ({isActive} : NavLinkPropsCust) : string =>
  isActive ? 'header__nav-link header__nav-link--profile visually-hidden' : 'header__nav-link header__nav-link--profile';

function Header({favorites} : HeaderComponentProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  if (authorizationStatus === AuthorizationStatus.NoAuth || authorizationStatus === AuthorizationStatus.Unknown) {
    return (
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />

            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <NavLink to="/login" className={getClassForNavLink} >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__login">Sign in</span>
                  </NavLink>
                </li>
              </ul>
            </nav>

          </div>
        </div>
      </header>);
  }
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <NavComponent favoritesCount={favorites}/>
        </div>
      </div>
    </header>
  );
}
//
export const HeaderMemo = memo(Header, (prevProps, nextProps) => prevProps === nextProps);

export default Header;
