import './Register.scss'

const Register = () => {
    return (
        <div className="register-container col-3">
            <h3>REGISTAR</h3>
            <div className="registar-content">
                <div className="registar-email layout-flex">
                    <label>Email</label>
                    <input type="input" />
                </div>
                <div className="registar-password layout-flex">
                    <label>Password</label>
                    <input type="password" />
                </div>
                <div className="registar-password__again layout-flex">
                    <label>Again Password</label>
                    <input type="password" />
                </div>
                <div className="btn-checkbox">
                    <input type="checkbox" />
                    <span>I agree to the terms</span>
                </div>
                <button type="button" className="btn-register">Login to Typrform</button>
            </div>
        </div>
    )
}
export default Register;