import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { logoutAction} from '../../store/api-actions';
import { getFavoritesState } from '../../store/offers-data/offers-data.selectors';
import { getLogin } from '../../store/user-process/user-process.selectors';

type NavComponentProps = {
  favoritesCount?: number;
}

function NavComponent({favoritesCount} : NavComponentProps): JSX.Element {
  const loginState = useAppSelector(getLogin);
  const favorites = useAppSelector(getFavoritesState);
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
              <img className="reviews__avatar user__avatar" src={loginState?.avatarUrl} width="54" height="54" alt="Reviews avatar" />
            </div>
            <span className="header__user-name user__name">{loginState?.email}</span>
            <span className="header__favorite-count">{favoritesCount ? favoritesCount : favorites.length}
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
