import MainPage from '../../pages/main-page/main-page';
import PlaceCard from '../place-card';


function App(): JSX.Element {
  return (
    <MainPage>
      <PlaceCard/>
      <PlaceCard/>
      <PlaceCard/>
      <PlaceCard/>
      <PlaceCard/>
    </MainPage>
  );
}

export default App;
