import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/scss/styles.scss';
import { FaGem, FaHeart, FaGalacticSenate, FaListUl } from 'react-icons/fa'
import './AdminSiderBar.scss';
import { useState } from 'react';
import logo from '../../logo.svg';
import { useNavigate } from "react-router-dom";


const AdminSiderBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    console.log(`check navigation:`, navigate)
    return (
        <div className='sidebar-container'>
            <ProSidebar
                className="prosidebar-container"
                image='https://images.unsplash.com/photo-1688745796837-42ab6378d9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60'
                collapsed={collapsed}
            >
                <SidebarHeader className='sidebar-header'>
                    Page Admin
                </SidebarHeader>
                <Menu iconShape="square">
                    <MenuItem icon={<FaGem />} onClick={() => { navigate('/admin') }}>Dashboard</MenuItem>
                    <SubMenu title="Components" icon={<FaHeart />}>
                        <MenuItem>Component 1</MenuItem>
                        <MenuItem>Component 2</MenuItem>
                    </SubMenu>
                    <SubMenu title="Features" icon={<FaGalacticSenate />}>
                        <MenuItem onClick={() => { navigate('./manage-user') }}>User Manage</MenuItem>
                        <MenuItem>Test Quiz Manage</MenuItem>
                        <MenuItem>Question Manage</MenuItem>
                    </SubMenu>
                </Menu>
                <SidebarFooter className='sidebar-footer'>
                    <div className='sb-footer--child'>
                        <img src={logo} />
                        {collapsed === false ? <span>View Source</span> : ""}
                    </div>
                </SidebarFooter>
            </ProSidebar>
            <div className='sb-collapse'>
                <button
                    style={{
                        border: 'none',
                        backgroundColor: '#fff',
                        fontSize: '25px'
                    }}
                    className="sb-button"
                    onClick={() => setCollapsed(!collapsed)}>
                    <FaListUl />
                </button>
            </div>

        </div>
    )
}
export default AdminSiderBar;
