import Logo from '../logo/logo';
import { useEffect } from 'react';
import { NavLink} from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import NavComponent from './nav-component';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { favoritesState, authorizationStatusState } from '../../store/selectors';
import { fetchFavoriteAction } from '../../store/api-actions';

type NavLinkPropsCust = {
  isActive: boolean;
  isPending: boolean;
}

type HeaderComponentProps = {
  favorites?: number;
}

const getClassForNavLink = ({isActive} : NavLinkPropsCust) : string =>
  isActive ? 'visually-hidden' : '';

function Header({favorites} : HeaderComponentProps): JSX.Element {
  const authorizationStatus = useAppSelector(authorizationStatusState);
  const favoritesArray = useAppSelector(favoritesState);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if(authorizationStatus === AuthorizationStatus.Auth){
  //     dispatch(fetchFavoriteAction());
  //   }
  // }, [authorizationStatus]);

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
          <NavComponent favoritesCount={favorites}/>
        </div>
      </div>
    </header>
  );
}
//
export default Header;
