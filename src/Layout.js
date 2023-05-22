import App from './App';
import Admin from './Components/Admin/Admin';
import Hompage from './Components/Home/Homepage';
import ManageUser from './Components/Admin/Content/ManageUser';
import DashBoard from './Components/Admin/Content/DashBoard';
import Login from './Components/Auth/Login';
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Register from './Components/Auth/Register';
import ListQuiz from './Components/User/ListQuiz';
import DetailQuiz from './Components/User/DetailQuiz';

const Notfound = () => {
    return (
        <div className="alert alert-danger mt-3">
            404.Not found data width you curent URL
        </div>
    )
}
const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route index element={<Hompage />} />
                    <Route path='user' element={<ListQuiz />} />
                </Route>
                <Route path='/quiz/:id' element={<DetailQuiz />} />
                <Route path='/admin' element={<Admin />}>
                    <Route index element={<DashBoard />} />
                    <Route path='manage-user' element={<ManageUser />} />
                </Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/registar' element={<Register />}></Route>
                <Route path='*' element={<Notfound />}></Route>
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