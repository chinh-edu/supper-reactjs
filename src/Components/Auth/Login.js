import { useState } from 'react';
import './Login.scss'


const Login = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleLogin = () => {
        alert('me')
    }
    return (
        <div className="container-login">
            <div className="header-login">
                <span>Don't have an account yet?</span>
                <button type="button" className='button-header'>Sign up</button>
                <a href="#">Need help?</a>
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
                        <a href="#" >Forgot password</a>
                    </div>
                    <button type="button" className="btn-login" onClick={() => handleLogin()}>Login to Typrform</button>
                </div>
            </div>
        </div>
    )
}
export default Login;