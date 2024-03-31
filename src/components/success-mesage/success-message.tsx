import './success-message.css';
import { useAppSelector } from '../../hooks/hooks';

function SuccessMessage(): JSX.Element | null {
  const succses = useAppSelector((state) => state.isAuthorization);
  return (succses === true)
    ? <div className='succ-message'>{'Вы авторизованы!'}</div>
    : null;

}

export default SuccessMessage;
