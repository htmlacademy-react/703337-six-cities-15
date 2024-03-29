import CommentForm from '../comments/comment-form';
import { CommentsType } from '../../types/card';
import { ratingCard } from '../../const';

type ReviewsProps = {
  commentList: CommentsType;
}

function Reviews({commentList} : ReviewsProps): JSX.Element {
  const list = commentList.map((item) =>{
    const {id, date, user, comment, rating} = item;
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
          <time className="reviews__time" dateTime="2019-04-24">{date}</time>
        </div>
      </li>
    );
  });

  return(
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{commentList.length}</span></h2>
      <ul className="reviews__list">
        {list}
      </ul>
      <CommentForm />

    </section>
  );
}

export default Reviews;
