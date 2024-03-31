import CommentForm from '../comments/comment-form';
import { CommentsType } from '../../types/types';
import { ratingCard } from '../../const';
import { useAppSelector } from '../../hooks/hooks';
import { authorizationStatusState, commentsSortState } from '../../store/selectors';
import { AuthorizationStatus } from '../../const';
import { sortComment } from '../../util';

type ReviewsProps = {
  commentList: CommentsType;
}

function Reviews({commentList} : ReviewsProps): JSX.Element {
  const options = {
    year: 'numeric',
    month: 'long',
  } as const;
//[...commentList].sort(sortComment).slice(0, 10)
  const authorizationStatus = useAppSelector(authorizationStatusState);
  const list = useAppSelector(commentsSortState).map((item) =>{
    const {id, user, date, comment, rating} = item;
    const dateConfig = new Date(date).toLocaleString('en-US', options);
    return (
      <li key={`${id}-reviews`} className="reviews__item">
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
          </div>
          <span className="reviews__user-name">
            {user.name}
          </span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: ratingCard(rating)}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">
            {comment}
          </p>
          <time className="reviews__time" dateTime={date}>{dateConfig}</time>
        </div>
      </li>
    );
  });

  return(
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentList?.length}</span></h2>
      <ul className="reviews__list">
        {list}
      </ul>
      {authorizationStatus === AuthorizationStatus.Auth ? <CommentForm /> : ''}

    </section>
  );
}

export default Reviews;
