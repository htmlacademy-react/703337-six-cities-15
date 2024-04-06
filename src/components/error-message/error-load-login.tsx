import { setError } from '../../store/offers-data/offers-data.slice';
import './error-load.css';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/hooks';

function ErrorLoadLogin (): JSX.Element | null {
  const dispatch = useAppDispatch();
  const handleLoginClick = () => {
    dispatch(setError(null));
  };
  return (
    <>
      <p className={'internalServer'}>{'Не удалось авторизоваться!!!'}</p>
      <div style={{textAlign: 'center'}} onClick={handleLoginClick}>
        <Link to='/login'> Попробуйте авторизоваться еще раз.</Link>
      </div>
    </>
  );
}
export default ErrorLoadLogin;

