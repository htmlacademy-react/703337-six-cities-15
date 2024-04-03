import { useState, FormEvent, ChangeEvent } from 'react';
import { maxLengthComment, minLengthComment } from '../../util';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { setError } from '../../store/action';
//import { clearErrorAction } from '../../store/api-actions';
import { fetchCommentAction } from '../../store/api-actions';
import { DEFAULT_MAX_LENGTH } from '../../const';

function CommentForm(): JSX.Element {
  const[formData, setFormData] = useState({comment: '', rating: 0});
  const [disabled, setDisabled] = useState(false);

  const param = useParams().id as string;
  const dispatch = useAppDispatch();

  const isDisabledButton = () => {
    if(!minLengthComment(formData.comment) || !maxLengthComment(formData.comment) || formData.rating === 0){
      return true;
    } else {
      return false;
    }
  };

  const handleFieldChange = ({target}: ChangeEvent<HTMLTextAreaElement>) => {
    const {value} = target;
    setFormData({...formData, comment: value});

    if(isDisabledButton()){
      dispatch(setError('Текст отзыва должен содержать от 50 до 300 символов. Для выбора рейтинга пользователь отмечает соответствующее количество звёзд.'));
    } else{
      dispatch(setError(null));
    }

  };

  const handleChangeRating = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {value} = target;
    setFormData({...formData, rating: Number(value)});
  };

  const handleSubmitClick = async(evt : FormEvent) => {
    evt.preventDefault();
    try{
      setDisabled(true);
      const responce = await dispatch(fetchCommentAction({id: param, comment: formData.comment, rating: formData.rating}));
      if(responce.type === 'user/Comment/rejected') {
        throw new Error();
      }
      setFormData({...formData, comment: '', rating: 0});
    } catch(err){
      dispatch(setError('Отзыв не отправлен! Проверьте правильность заполнения.'));
    } finally{
      setDisabled(false);
      dispatch(clearErrorAction());
    }
  };

  return (
    <form className="reviews__form form" onSubmit={(evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      handleSubmitClick(evt);
    }}
    action="#" method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating" >
        {[5, 4, 3, 2, 1].map((item) =>
          (
            <>
              <input key={`${item}star-rating`} checked={`${item}` === String(formData.rating)} onChange={handleChangeRating} className="form__rating-input visually-hidden"
                name="rating" value={item} id={`${item}-stars`} type="radio" disabled={disabled}
              />
              <label htmlFor={`${item}-stars`} className="reviews__rating-label form__rating-label" title="perfect">

                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star">
                  </use>
                </svg>
              </label>
            </>
          ))}

      </div>
      <textarea onChange={handleFieldChange} value={formData.comment} className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved" required maxLength={DEFAULT_MAX_LENGTH} disabled={disabled}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isDisabledButton()}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;

