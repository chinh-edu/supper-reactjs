import './App.scss';
import Navigation from './Components/Navigation/Navigation';
import Banner from './Components/Banner/Banner';

const App = () => {
  return (
    <div className='app-container'>
      <Banner />
      <Navigation />
    </div>
  );
}
export default App;
