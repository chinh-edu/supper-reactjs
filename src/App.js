//Availability
import './App.scss';

// Add library
import { Outlet } from "react-router-dom";

// Add file
import Header from './Components/Header/Header';

const App = () => {

  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='app-app'>
          <Outlet />
        </div>
      </div>

    </div >
  );

}

export default App;
