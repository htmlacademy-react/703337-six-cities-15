import './success-message.css';
import { useAppSelector } from '../../hooks/hooks';
import { getIsAuthorization } from '../../store/user-process/user-process.selectors';

function SuccessMessage(): JSX.Element | null {
  const succses = useAppSelector(getIsAuthorization);
  return (succses === true)
    ? <div className='succ-message'>{'Вы авторизованы!'}</div>
    : null;

}

export default SuccessMessage;
