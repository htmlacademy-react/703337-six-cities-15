import './error-message.css';
import { useAppSelector } from '../../hooks/hooks';
import { getErrorState } from '../../store/offers-data/offers-data.selectors';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getErrorState);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}

export default ErrorMessage;

