import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { maxLengthComment, minLengthComment } from '../../util';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';
import { setError } from '../../store/action';
import { clearErrorAction } from '../../store/api-actions';
import { fetchCommentAction } from '../../store/api-actions';


function CommentForm(): JSX.Element {
  const[formData, setFormData] = useState({comment: '', rating: 0});

  const param = useParams().id as string;
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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
      dispatch(clearErrorAction());
    }

  };

  const handleChangeRating = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {value} = target;
    setFormData({...formData, rating: Number(value)});
  };

  const handleSubmitClick = (e : FormEvent) => {
    try{
      const form = e.target as HTMLFormElement;
      const formInputs = form.elements;
      for (let i = 0; i < formInputs.length; i++) {
        if (formInputs[i].nodeName === 'INPUT' && (formInputs[i] as HTMLInputElement).type === 'radio') {
          (formInputs[i] as HTMLInputElement).disabled = true;
        }
      }

      buttonRef.current!.disabled = true;
      textRef.current!.disabled = true;
      dispatch(fetchCommentAction({id: param, comment: formData.comment, rating: formData.rating}));
      setFormData({...formData, comment: '', rating: 0});
      buttonRef.current!.disabled = false;
    } catch(err){
      dispatch(setError('Отзыв не отправлен! Проверьте правильность заполнения.'));
    } finally{
      buttonRef.current!.disabled = false;
      textRef.current!.disabled = false;
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
              <input ref={inputRef} key={`${item}star-rating`} checked={`${item}` === String(formData.rating)} onChange={handleChangeRating} className="form__rating-input visually-hidden" name="rating" value={item} id={`${item}-stars`} type="radio" />
              <label htmlFor={`${item}-stars`} className="reviews__rating-label form__rating-label" title="perfect">

                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star">
                  </use>
                </svg>
              </label>
            </>
          ))}

      </div>
      <textarea ref={textRef} onChange={handleFieldChange} value={formData.comment} className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" required></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button ref={buttonRef} className="reviews__submit form__submit button" type="submit" disabled={isDisabledButton()}>Submit</button>
      </div>
    </form>
  );
}

export default CommentForm;

