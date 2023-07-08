import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FaGem, FaHeart, FaGalacticSenate, FaGoogle } from 'react-icons/fa'
import './Admin.scss';

const Admin = () => {
    return (
        <ProSidebar className="admin-container" image="https://images.unsplash.com/photo-1682685797741-f0213d24418c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80">
            <SidebarHeader className='sidebar-header'>
                Page Admin
            </SidebarHeader>
            <Menu iconShape="square">
                <MenuItem icon={<FaGem />}>Dashboard</MenuItem>
                <SubMenu title="Components" icon={<FaHeart />}>
                    <MenuItem>Component 1</MenuItem>
                    <MenuItem>Component 2</MenuItem>
                </SubMenu>
                <SubMenu title="Reports" icon={<FaGalacticSenate />}>
                    <MenuItem>My Report</MenuItem>
                    <MenuItem>MIS Report</MenuItem>
                </SubMenu>
            </Menu>
            <SidebarFooter className='sidebar-footer'>
                <FaGoogle />
                <span>View Source</span>
            </SidebarFooter>
        </ProSidebar>
    )
}
export default Admin;