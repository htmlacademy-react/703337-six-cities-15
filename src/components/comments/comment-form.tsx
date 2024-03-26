import { useState, FormEvent, ChangeEvent } from 'react';

function CommentForm(): JSX.Element {
  const[formData, setFormData] = useState({review: '', checked: ''});

  const [checkedRating, setCheckedRating] = useState('');

  const handleFieldChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = target;
    setFormData({...formData, [name]: value,checked: checkedRating});

  };

  const handleChangeRating = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {value} = target;
    setCheckedRating(value);
  };

  const handleSubmitClick = () => {
    setFormData({...formData,
      review: 'Мяу-мяу'
    });
    setCheckedRating('');
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
        {[5, 4, 3, 2, 1].map((item) =>
          (
            <>
              <input key={`${item}star-rating`} checked={`${item}` === checkedRating} onChange={handleChangeRating} className="form__rating-input visually-hidden" name="rating" value={item} id={`${item}-stars`} type="radio" />
              <label htmlFor={`${item}-stars`} className="reviews__rating-label form__rating-label" title="perfect">

                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star">
                  </use>
                </svg>
              </label>
            </>
          ))}

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

