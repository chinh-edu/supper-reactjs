import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import User from './Components/User/User';
import Admin from './Components/Admin/Admin';
import Hompage from './Components/Home/Homepage';
import ManageUser from './Components/Admin/Content/ManageUser';
import DashBoard from './Components/Admin/Content/DashBoard';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Hompage />} />
          <Route path='user' element={<User />} />
        </Route>
        <Route path='/admin' element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path='manage-user' element={<ManageUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
