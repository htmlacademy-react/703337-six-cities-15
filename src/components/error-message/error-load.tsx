import './error-load.css';
import { Link } from 'react-router-dom';
import { setIsFetchError } from '../../store/offers-data/offers-data.slice';
import { useAppDispatch } from '../../hooks/hooks';

function ErrorLoad (): JSX.Element | null {
  const dispatch = useAppDispatch();
  const handleMainClick = () => {
    dispatch(setIsFetchError(false));
  };
  return (
    <>
      <p className={'internalServer'}>{'404. Offer not found!'}</p>
      <div style={{textAlign: 'center'}} onClick={handleMainClick}>
        <Link to='/'> Вернуться на главную</Link>
      </div>
    </>
  );
}

export default ErrorLoad;
