import {NavLink} from 'react-router-dom';
type IsActiveType = {isActive: boolean}

const getClassForNavLink = ({isActive} : IsActiveType) : string =>
  isActive ? 'header__logo-link header__logo-link--active' : 'header__logo-link';

function Logo(): JSX.Element {
  return (
    <div className="header__left">
      <NavLink to="/" className={getClassForNavLink}>
        <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
      </NavLink>
    </div>
  );
}

export default Logo;
