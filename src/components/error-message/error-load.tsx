import './error-load.css';
//import { Link } from 'react-router-dom';

function ErrorLoad (): JSX.Element | null {
  return (
    <>
      <p className={'internalServer'}>{'Offer not found!'}</p>
      <div style={{textAlign: 'center'}}>

      </div>
    </>
  );
}

export default ErrorLoad;
