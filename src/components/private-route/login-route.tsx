import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';

type LoginRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function LoginRoute(props: LoginRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus !== AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Root} />
  );
}

export default LoginRoute;
