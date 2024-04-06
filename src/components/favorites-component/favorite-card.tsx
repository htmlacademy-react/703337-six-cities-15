import { CardType } from '../../types/types';
import { ratingCard } from '../../const';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { statusFavoritesActionMainPage } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks/hooks';

type FavoriteCardProps = {
  cardObj: CardType;
  onFavoriteClick: (isfavorite: boolean) => void;
}

const FAVORITE = 1;
const UNFAVORITE = 0;

function FavoritesCard({cardObj, onFavoriteClick} : FavoriteCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {id, isPremium, isFavorite, previewImage, price, rating, title, type} = cardObj;

  const handleListItemClick = async() => {
    let responceCard = null;
    const responce = await dispatch(statusFavoritesActionMainPage({
      id: id,
      favoriteStatus: isFavorite ? UNFAVORITE : FAVORITE,
    }));

    responceCard = responce.payload as CardType;
    onFavoriteClick(responceCard?.isFavorite);
  };
//{`/offer/${id}`}
  return (
    <article className="favorites__card place-card" data-id={id}>

      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}

      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to="/">
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image" />
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={cn('place-card__bookmark-button button', {'place-card__bookmark-button--active': isFavorite})} type="button"
            onClick={()=>{
              handleListItemClick();
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: ratingCard(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>);
}

export default FavoritesCard;

