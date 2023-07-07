import './Banner.scss';
import { AiFillEnvironment, AiFillMail, AiFillPhone } from "react-icons/ai";
import Nav from 'react-bootstrap/Nav';
const Banner = () => {
    return (
        <div className="banner-container">
            <div className='list-banner--left'>
                <div className='list-banner--address flex'>
                    <div className='icon'>
                        <AiFillEnvironment />
                    </div>
                    <span>Cửa hàng</span>
                </div>
                <div className='list-banner--email flex'>
                    <div className='icon'>
                        <AiFillMail />
                    </div>
                    <span>nguyenhuuchi19942606@gmail.com</span>
                </div>
                <div className='list-banner--phone flex'>
                    <div className='icon'>
                        <AiFillPhone />
                    </div>
                    <span>090.925.8938</span>
                </div>
            </div>
            <div className='list-banner--right'>
                <Nav className="me-auto">
                    <Nav.Link className='list-baner--link'>Logn In</Nav.Link>
                    <Nav.Link className='list-baner--link'>Logn Out</Nav.Link>
                    {/* <Nav.Link className='list-baner--link'>Pro File</Nav.Link> */}
                </Nav>
            </div>
        </div>
    )
}
export default Banner;