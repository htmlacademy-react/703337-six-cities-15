
import { CardsType } from '../../types/card';
import { arrayComment } from '../../mocks/comment';
import Reviews from '../../components/offer/reviews-component';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ratingCard } from '../../const';
import cn from 'classnames';
import Header from '../../components/header/header-component';
import MapComponent from '../../components/map/map-component';
import ListOffers from '../../components/main-components/list-offers';

type OfferPageProps = {
  rentsCard: CardsType;
}

function OfferPage({rentsCard} : OfferPageProps): JSX.Element {
  const params = useParams();

  const [cardMouseOver, setCardMouseOver] = useState<string | undefined>('');
  const offerId = params.id;
  const offerObj = rentsCard.find((item) => item.id === offerId);
  const favoritesArray = rentsCard.filter((item) => item.isFavorite);

  const {images, isPremium, isFavorite, title, rating, bedrooms, maxAdults, type, price, goods, host, description} = offerObj!;

  const handleListItemHover = (listItemCardId: string) => {
    const currentCard = rentsCard.find((item) => item.id === listItemCardId)?.id;
    setCardMouseOver(currentCard);
  };

  const handleListItemOut = () => {
    setCardMouseOver(undefined);
  };

  return (
    <div className="page">
      <Header isLoggedIn={false} countFavorite={favoritesArray.length}/>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((item : string) =>
                (
                  <div key={`photo-${item}`} className="offer__image-wrapper">
                    <img className="offer__image" src={item} alt="Photo studio" />
                  </div>
                ))}


            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {isPremium ? <div className="offer__mark"><span>Premium</span></div> : ''}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {title}
                </h1>
                <button className={cn('offer__bookmark-button button', {'offer__bookmark-button--active': isFavorite})} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: ratingCard(rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">4.8</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {maxAdults}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((item) =>
                    (
                      <li key={`inside${item}`} className="offer__inside-item">
                        {item}
                      </li>
                    )
                  )}


                </ul>
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={host.isPro ? 'offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper' : 'offer__avatar-wrapper user__avatar-wrapper'}>
                    <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="offer__user-name">
                    {host.name}
                  </span>
                  <span className="offer__user-status">
                    {host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {description}
                  </p>
                  <p className="offer__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <Reviews commentList={arrayComment} />

            </div>
          </div>
          <MapComponent rentsCard={rentsCard} selectedCard={cardMouseOver} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <ListOffers rentsCard={rentsCard} onListItemHover={handleListItemHover}
              onListItemOut={handleListItemOut}
            />

          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
