import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"; //điều hướng trang
// import { store, persistor } from './redux/store';
// import { Provider } from 'react-redux';
import 'nprogress/nprogress.css';
// import { PersistGate } from 'redux-persist/integration/react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import "react-awesome-lightbox/build/style.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import Admin from './Components/Admin/Admin';
import User from './Components/User/User';
import Homepage from './Components/Homepage/Homepage';
import DashBoard from './Components/Admin/ContentAdmin/DashBoard';
import ManageUser from './Components/Admin/ContentAdmin/ManageUser';


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  // <Provider store={store}>
  //   <PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Homepage />} />
        <Route path='user' element={<User />} />
      </Route>
      <Route path='admin' element={<Admin />}>
        <Route index element={<DashBoard />} />
        <Route path='manage-user' element={<ManageUser />} />
      </Route>
    </Routes>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </BrowserRouter>
  //   </PersistGate>
  // </Provider>
  // </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
