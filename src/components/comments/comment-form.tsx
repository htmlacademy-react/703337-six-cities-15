import { useState, FormEvent, ChangeEvent, Fragment } from 'react';
import { maxLengthComment, minLengthComment } from '../../util';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { setError } from '../../store/offers-data/offers-data.slice';
import { clearErrorAction } from '../../services/process-error-handle';
import { fetchCommentAction } from '../../store/api-actions';
import { DEFAULT_MAX_LENGTH } from '../../const';

interface KeyTitle {
  [key: string]: string;
}

function CommentForm(): JSX.Element {
  const[formData, setFormData] = useState({comment: '', rating: 0});
  const [isLoading, setIsLoading] = useState(false);

  const param = useParams().id as string;
  const dispatch = useAppDispatch();

  const isDisabledButton = () => !minLengthComment(formData.comment) || !maxLengthComment(formData.comment) || formData.rating === 0;

  const ratingMap : KeyTitle = {
    '5': 'perfect',
    '4': 'good',
    '3': 'not bad',
    '2': 'badly',
    '1': 'terribly',
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
      setIsLoading(true);
      const responce = await dispatch(fetchCommentAction({id: param, comment: formData.comment, rating: formData.rating}));
      if(responce.type === 'user/Comment/rejected') {
        throw new Error();
      }
      setFormData({...formData, comment: '', rating: 0});
    } catch(err){
      dispatch(setError('Отзыв не отправлен! Проверьте правильность заполнения.'));
    } finally{
      setIsLoading(false);
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
            <Fragment key={item}>
              <input checked={`${item}` === String(formData.rating)} onChange={handleChangeRating} className="form__rating-input visually-hidden"
                name="rating" value={item} id={`${item}-stars`} type="radio" disabled={isLoading}
              />
              <label htmlFor={`${item}-stars`} className="reviews__rating-label form__rating-label" title={ratingMap[String(item)]}>

                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star">
                  </use>
                </svg>
              </label>
            </Fragment>
          )
        )}

      </div>
      <textarea onChange={handleFieldChange} value={formData.comment} className="reviews__textarea form__textarea" id="review" name="review"
        placeholder="Tell how was your stay, what you like and what can be improved" required maxLength={DEFAULT_MAX_LENGTH} disabled={isLoading}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={isLoading || isDisabledButton()}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;

