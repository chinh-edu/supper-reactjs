import './App.scss';
import Navigation from './Components/Navigation/Navigation';
import Banner from './Components/Banner/Banner';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div className='app-container'>
      <div className='app-banner'>
        <Banner />
      </div>
      <div className='app-navigation'>
        <Navigation />
      </div>
      <div className='app-content'>
        <Outlet />
      </div>
    </div>
  );
}
export default App;
