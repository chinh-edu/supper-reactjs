import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../service/apiServices';
import './Login.scss'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/useAction';
import { ImSpinner10 } from 'react-icons/im';

const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const handleLogin = async () => {
        if (!email && !password) {
            toast.error(`Please enter your  value`);
            return;
        }
        setIsLoading(true);
        let res = await postLogin(email, password);
        if (res && res.EC === 0) {
            dispatch(doLogin(res));
            toast.success(res.EM);
            setIsLoading(false);
            navigate('/');
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
            setIsLoading(false);
        }
    }


    return (
        <div className="container-login">
            <div className="header-login">
                <span>Don't have an account yet?</span>
                <button type="button" className='button-header' onClick={() => { navigate('/registar') }}>Sign up</button>
                <span className='link'>Need help?</span>
            </div>
            <div className='login-body'>
                <h2 className="title-login">Typeform</h2>
                <span className="slogan-login">Hello, who's this?</span>
                <div className="content-login">
                    <div className="email-content content-layout" >
                        <label>Email</label>
                        <input type="input" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </div>
                    <div className="password-content content-layout">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    </div>
                    <div className='forgot-password'>
                        <span className='link'>Forgot password</span>
                    </div>
                    <button type="button" className="btn-login" onClick={() => handleLogin()} disabled={isLoading} >
                        {isLoading === true && <ImSpinner10 className='loaderIcon' />}
                        <span>Login to Typrform</span>
                    </button>
                    <button type='button' className='btn-goback' onClick={() => { navigate('/') }}>Go to Home Page</button>
                </div>
            </div>
        </div>
    )
}
export default Login;