import React from 'react'
import '../styles/SignUpLogin.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
const SignUp = () => {
    return (
        <div className='container'>
            <div className="title">Sign Up</div>
            <div className="underline"></div>
            <div className="inputs">
                <div className="input">
                    <i class="fa-solid fa-user"></i>
                    <input type="text" placeholder='Username' />
                </div>
                <div className="input">
                    <i class="fa-solid fa-shield-halved"></i>
                    <input type="text" placeholder='Club Name' />
                </div>
                <div className="input">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" placeholder='Password' />
                </div>
            </div>

            <div className="submit submit-signup">Sign Up</div>
            <div className='container-login'>
                <div className='text-login'>Don't have an account? </div>
                <Link to = "/" className="submit submit-login">Login</Link>
            </div>
        </div>
    )
}

export default SignUp
