import { getUpperCaseFirstLetter } from '../../util';
import { CardType, CardsType, CommentsType } from '../../types/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect} from 'react';

import { fetchOfferAction } from '../../store/api-actions';

import LoadingScreen from '../loading-screen/loading-screen';
import { AuthorizationStatus } from '../../const';
import Reviews from '../../components/offer/reviews-component';
import { ratingCard } from '../../const';
import cn from 'classnames';
import Header from '../../components/header/header-component';
import MapComponent from '../../components/map/map-component';
import ListOffers from '../../components/main-components/list-offers';
import { authorizationStatusState, favoritesState } from '../../store/selectors';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { statusFavoriteOfferAction } from '../../store/api-actions';

function OfferPage(): JSX.Element {
  const param = useParams().id as string;
  const favoritesArray = useAppSelector(favoritesState);
  const initialCount = favoritesArray.length;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthorization = useAppSelector(authorizationStatusState) === AuthorizationStatus.Auth;
  const offerObj = useAppSelector((state) => state.offer);
  const [cardMouseOver, setCardMouseOver] = useState<string | undefined>('');
  const [currentFavorites, setCurrentFavorites] = useState(initialCount);

  useEffect(() => {
    dispatch(fetchOfferAction(param));
  }, [dispatch, param]);


  if(offerObj === null){
    return (<div style={{textAlign: 'center'}}>{<LoadingScreen />}<p>Загружаем предложение</p></div>);
  }

  const currentOffer : CardType | null | undefined = offerObj?.currentOffer;
  const nearbyOffers : CardsType | undefined = offerObj?.nearby;
  const comments : CommentsType | undefined = offerObj?.comments;

  const {id, images, isPremium, isFavorite, title, rating, bedrooms, maxAdults, type, price, goods, host, description} = currentOffer!;

  const handleListItemHover = (listItemCardId: string) => {
    const currentCard = nearbyOffers?.find((item) => item?.id === listItemCardId)?.id;
    setCardMouseOver(currentCard);
  };

  const handleListItemOut = () => {
    setCardMouseOver(undefined);
  };

  const handleFavoriteClick = () => {
    if(!isAuthorization){
      navigate('/login');
    } else{
      dispatch(statusFavoriteOfferAction({
        id: id,
        favoriteStatus: isFavorite ? 0 : 1,
      }));
      setCurrentFavorites(isFavorite ? currentFavorites - 1 : currentFavorites + 1);
    }
  };

  return (
    <div className="page">
      <Header favorites={currentFavorites} />

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
                <button className={cn('offer__bookmark-button button', {'offer__bookmark-button--active': isFavorite})} type="button"
                  onClick={handleFavoriteClick}
                >
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
                <span className="offer__rating-value rating__value">{rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {getUpperCaseFirstLetter(type)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {bedrooms} {bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                </li>
                <li className="offer__feature offer__feature--adults">
                Max {maxAdults} {maxAdults > 1 ? 'adults' : 'adult'}
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
              <Reviews commentList={comments} />

            </div>
          </div>
          <MapComponent rentsCard={nearbyOffers} selectedCard={cardMouseOver} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <ListOffers rentsCard={nearbyOffers} onListItemHover={handleListItemHover}
              onListItemOut={handleListItemOut}
            />

          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferPage;
