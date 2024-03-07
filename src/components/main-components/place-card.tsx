import { CardType } from '../../types/card';
import { Link } from 'react-router-dom';
import { ratingCard } from '../../const';
import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

type PlaceCardProps = {
  cardObj: CardType;
  onMouseOver: (listItemCardId: string) => void;
  onMouseOut: () => void;
  params: boolean;
}

function PlaceCard({cardObj, onMouseOver, onMouseOut, params} : PlaceCardProps){
  const navigate = useNavigate();
  const {id, isPremium, previewImage, price, isFavorite, rating, title, type} = cardObj;

  const handleListItemHover = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    onMouseOver(id);
  };

  return (

    <article className={cn('place-card', {'near-places__card': params, 'cities__card': !params})}
      data-id={id} onMouseOver={handleListItemHover} onClick={() => navigate(`/offer/${id}`)} onMouseOut={onMouseOut}
    >
      <div className="place-card__mark">
        <span>{isPremium ? 'Premium' : ''}</span>
      </div>
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

          <button className={isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' : 'place-card__bookmark-button button'} type="button">
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
        <p className="place-card__type">{type}</p>
      </div>

    </article>
  );
}

export default PlaceCard;
