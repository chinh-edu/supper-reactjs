import './Register.scss';
import { useNavigate } from 'react-router-dom';
import { postRegistar } from '../../service/apiServices';
import { useState } from 'react';
import { toast } from 'react-toastify';
const Register = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [userName, setUsername] = useState("")
    const handleRegistar = async () => {
        let res = await postRegistar(email, password)
        if (res && res.EC === 0) {
            toast.success(res.EM)
            navigate('/')
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM)
        }
    }
    return (
        <div className="register-container col-3">
            <h3>REGISTAR</h3>
            <div className="registar-content">
                <div className="registar-email layout-flex">
                    <label>Email</label>
                    <input type="input" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="registar-username layout-flex">
                    <label>User name</label>
                    <input type="input" value={userName} onChange={(event) => setUsername(event.target.value)} />
                </div>
                <div className="registar-password layout-flex">
                    <label>Password</label>
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type="button" className="btn-register btn" onClick={() => handleRegistar()}>Sign Up</button>
                <button type='button' className='btn-goback btn' onClick={() => { navigate('/') }}>Go to Home Page</button>
            </div>
        </div>
    )
}
export default Register;