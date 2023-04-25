import Sidebar from "./Sidebar";
import './Admin.scss'
import { FaBars } from 'react-icons/fa'
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Admin = (props) => {
    const [isCollaped, setIsCollaped] = useState(false)

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <Sidebar collapsed={isCollaped} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars onClick={() => setIsCollaped(!isCollaped)} />
                </div>
                <div className="admin-main">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default Admin;