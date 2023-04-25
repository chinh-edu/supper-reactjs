import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart, FaAngleRight } from 'react-icons/fa';
import sidebarBg from '../../assets/sidebarBg.jpg';
import logo from '../../logo.svg'
import ManageUser from './Content/ManageUser';
const Sidebar = (props) => {
    const { image, collapsed, toggled, handleToggleSidebar } = props;
    return (

        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
                <SidebarHeader>
                    <img src={logo} style={{
                        width: '48px',
                    }} />
                    <div
                        style={{
                            color: '#00bfff',
                            padding: '24px 0px',
                            textTransform: 'uppercase',
                            fontWeight: 'bold',
                            fontSize: 14,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        CHI NGUYEN BLOG
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<FaTachometerAlt />}
                        // suffix={<span className="badge red">New</span>}
                        >
                            Dashboard
                            <Link to="/admin" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">

                        <SubMenu
                            // suffix={<span className="badge yellow"> </span>}
                            icon={<FaGem />}
                            title="Feature"
                        >
                            <MenuItem>
                                Quản lý user
                                <Link to="/admin/manage-user" />
                            </MenuItem>
                            <MenuItem>Quản lý bài Quiz</MenuItem>
                            <MenuItem>Quản lý câu hỏi</MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://www.facebook.com/profile.php?id=100007736622049"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                            style={{
                                textDecoration: "none",
                            }}
                        >
                            <span style={{
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                overflow: 'hidden',
                                fontSize: '16px',
                                color: '#999',
                                padding: '10px 30px',
                                border: '0.5px solid #777',
                                borderRadius: '24px'
                            }}>
                                &#169;Nguyen Huu Chi
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar >
        </>
    )
}
export default Sidebar
