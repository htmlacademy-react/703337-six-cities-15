import './success-message.css';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/hooks';

function SuccessMessage(): JSX.Element | null {
  const succses = useAppSelector((state) => state.authorizationStatus);

  return (succses === AuthorizationStatus.Auth)
    ? <div className='succ-message'>{'Вы авторизованы!'}</div>
    : null;

}

export default SuccessMessage;
