import './Navigation.scss'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className='navigation-container'>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav flex-collapse">
                        <Nav className="me-auto flex-nav">
                            <Nav.Link href="#home">Trang chủ</Nav.Link>
                            <Nav.Link href="#link">Sản phẩm</Nav.Link>
                            <Nav.Link href="#link">Dịch vụ</Nav.Link>
                            <Nav.Link href="#link">Thương hiệu</Nav.Link>
                            <Link to="/user" className='nav-link'>User</Link>
                            <Link to="/admin" className='nav-link'>Admin</Link>
                            <NavDropdown title="Liên hệ" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">
                                    Separated link
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div class="input-group">
                <input type="text" className="form-control" placeholder="Search..." />
            </div>
        </div>
    )
}
export default Navigation;