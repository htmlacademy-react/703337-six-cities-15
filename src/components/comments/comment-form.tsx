import { useState, FormEvent, ChangeEvent } from 'react';

function CommentForm(): JSX.Element {
  const[formData, setFormData] = useState({review: ''});
  const initialRating = {
    5: false,
    4: false,
    3: false,
    2: false,
    1: false,
  };
  const [checkedRating, setCheckedRating] = useState(initialRating);

  const handleFieldChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = target;
    setFormData({...formData, [name]: value});
  };

  const handleChangeRating = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {value, checked} = target;
    setCheckedRating({...initialRating, [value]: checked});
  };

  const handleSubmitClick = () => {
    setFormData({
      review: 'Мяу-мяу'
    });
    setCheckedRating(initialRating);
  };

  return (
    <form className="reviews__form form" onSubmit={(evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      handleSubmitClick();
    }}
    action="#" method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" >

        <input onChange={handleChangeRating} checked={checkedRating[5]} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={handleChangeRating} checked={checkedRating[4]} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={handleChangeRating} checked={checkedRating[3]} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={handleChangeRating} checked={checkedRating[2]} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input onChange={handleChangeRating} checked={checkedRating[1]} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>

      <textarea onChange={handleFieldChange} value={formData.review} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" required></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" >Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;

