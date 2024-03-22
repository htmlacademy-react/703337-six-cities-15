import './succses-message.css';
import { AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks/hooks';

function SuccsesMessage(): JSX.Element | null {
  const succses = useAppSelector((state) => state.authorizationStatus);
  console.log(succses);
  
  return (succses === AuthorizationStatus.Auth)
    ? <div className='succ-message'>{'Вы авторизованы!'}</div>
    : null;

}

export default SuccsesMessage;
