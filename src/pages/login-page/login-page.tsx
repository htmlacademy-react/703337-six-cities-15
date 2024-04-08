import { useRef, FormEvent } from 'react';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/hooks';
import { loginAction } from '../../store/api-actions';
import Header from '../../components/header/header-component';
import { ChangeEvent } from 'react';
import { processErrorHandle } from '../../services/process-error-handle';
import { getRandomCity } from '../../util';
import { changeCity, filterOffers } from '../../store/offers-data/offers-data.slice';
import { Link } from 'react-router-dom';

function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const city = getRandomCity();
  const passwordRegex = /(?=.*[0-9])(?=.*[a-z])[0-9a-z]{2,}/i;

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (loginRef.current !== null && passwordRef.current !== null && passwordRegex.test(passwordRef.current.value)) {
      dispatch(loginAction({
        login: loginRef.current.value,
        password: passwordRef.current.value
      }));
    }
  };

  const handlePasswordChange = ({target}: ChangeEvent<HTMLInputElement>) => {
    const {value} = target;
    if(!passwordRegex.test(value)){
      processErrorHandle('Пароль состоит минимум из одной буквы и цифры');
    }
  };

  const handleRandomCityClick = (item : string) => {
    dispatch(changeCity(item));
    dispatch(filterOffers());
  };

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">
              Sign in
            </h1>

            <form className="login__form form" onSubmit={handleSubmit} action="/" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  ref={loginRef}
                  type="email"
                  name="email"
                  placeholder="Email" required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password" onChange={handlePasswordChange}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current" >
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Root} onClick={() => handleRandomCityClick(city)}>
                <span>{city}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
