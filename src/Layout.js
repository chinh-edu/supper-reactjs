import App from './App';
import User from './Components/User/User';
import Admin from './Components/Admin/Admin';
import Hompage from './Components/Home/Homepage';
import ManageUser from './Components/Admin/Content/ManageUser';
import DashBoard from './Components/Admin/Content/DashBoard';
import Login from './Components/Auth/Login';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Register from './Components/Auth/Register';
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Hompage />} />
                    <Route path='user' element={<User />} />
                </Route>
                <Route path='/admin' element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path='manage-user' element={<ManageUser />} />
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/registar' element={<Register />}></Route>
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
                theme="dark"
            />
        </>
    )
}
export default Layout