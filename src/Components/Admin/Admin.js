import AdminSiderBar from "./AdminSiderBar";
import './Admin.scss';
import { Outlet } from "react-router-dom";

const Admin = () => {
    return (
        <div className="admin-container">
            <div className="sb-admin">
                <AdminSiderBar />
            </div>
            <div className="ct-admin">
                <Outlet />
            </div>
        </div>
    )
}
export default Admin;