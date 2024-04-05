import { CardType } from '../../types/types';
import { getUpperCaseFirstLetter } from '../../util';
import { Link } from 'react-router-dom';
import { ratingCard } from '../../const';
import { MouseEvent, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { statusFavoritesActionMainPage } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/user-process.selectors';

type PlaceCardProps = {
  cardObj: CardType;
  onMouseOver?: (listItemCardId: string) => void;
  onMouseOut?: () => void;
  onFavoriteClick?: (isFavorite : boolean) => void;
}

function PlaceCard ({cardObj, onMouseOver, onMouseOut, onFavoriteClick} : PlaceCardProps){
  console.info('<PlaceCard />: Render');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorization = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;

  const {id, isPremium, previewImage, price, isFavorite, rating, title, type} = cardObj;
  const locationAbs = useLocation().pathname === '/';

  const handleListItemHover = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    onMouseOver!(id);
  };

  const handleFavoriteClick = async(evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    if(!isAuthorization){
      navigate('/login');
    } else{
      let responceCard = null;
      const responce = await dispatch(statusFavoritesActionMainPage({
        id: id,
        favoriteStatus: isFavorite ? 0 : 1,
      }));
      responceCard = responce.payload as CardType;
      onFavoriteClick!(responceCard.isFavorite);
    }
  };

  return (

    <article className={cn('place-card', {'near-places__card': !locationAbs, 'cities__card': locationAbs})}
      data-id={id} onMouseOver={handleListItemHover} onMouseOut={onMouseOut}
    >

      {isPremium ? <div className="place-card__mark"><span>Premium</span></div> : ''}

      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={`/offer/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image" />
        </Link>
      </div>

      <div className="place-card__info" >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button className={cn('place-card__bookmark-button button', {'place-card__bookmark-button--active': isFavorite})} type="button"
            onClick={(evt) => {
              handleFavoriteClick(evt);
            }}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
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
        <p className="place-card__type">{getUpperCaseFirstLetter(type)}</p>
      </div>

    </article>
  );
}

export const PlaceCardMemo = memo(PlaceCard, (prevProps, nextProps) => prevProps.cardObj === nextProps.cardObj);

