import MainScreen from '../../pages/main-screen/main-screen';

type AppScreenProps = {
  rentsCount: number;
}


function App({rentsCount} : AppScreenProps): JSX.Element {
  return (
    <MainScreen rentsCount = {rentsCount} />
  );
}

export default App;
