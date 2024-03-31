import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { logoutAction} from '../../store/api-actions';
import { favoritesState } from '../../store/selectors';

type NavComponentProps = {
  favoritesCount?: number;
}

function NavComponent({favoritesCount} : NavComponentProps): JSX.Element {
  const loginState = useAppSelector((state) => state.login);
  const favorites = useAppSelector(favoritesState);
  const dispatch = useAppDispatch();
  console.info('<Nav />: Render');
  const handleClickSignOut = () => {
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link to="/favorites" className="header__nav-link header__nav-link--profile" >
            <div className="header__avatar-wrapper user__avatar-wrapper">
            </div>
            <span className="header__user-name user__name">{loginState}</span>
            <span className="header__favorite-count">{favoritesCount ? favoritesCount : favorites.length }
            </span>
          </Link>
        </li>
        <li className="header__nav-item" onClick={handleClickSignOut}>
          <a className="header__nav-link" href="#">
            <span className="header__signout">Sign out</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavComponent;
