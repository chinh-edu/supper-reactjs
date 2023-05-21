import videoHomepage from '../../assets/video-homepage.mp4';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Hompage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const navigate = useNavigate();
    return (
        <div className="homepage-container">
            <video autoPlay muted loop className='video' >
                <source src={videoHomepage} type="video/mp4" />
            </video>
            <div className='homepage-content'>
                <h1 className='homepage-content--title'>There's a better way to ask</h1>
                <p className='homepage-content--content'>You don't want to make a boring form. And your audience won't answer one. Create a typeform instead—and make everyone happy.</p>
                {isAuthenticated === false ?
                    <button className='homepage-content--button' type='button' onClick={() => { navigate('/login') }}>Get start - it's free</button>
                    :
                    <button className='homepage-content--button' type='button' onClick={() => { navigate('/user') }}>Doing quiz now</button>
                }
            </div>
        </div>
    )
}
export default Hompage;