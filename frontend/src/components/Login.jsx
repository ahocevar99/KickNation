import React from 'react'
import '../styles/SignUpLogin.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='container'>
            <div className="title">Login</div>
            <div className="underline"></div>
            <div className="inputs">
                <div className="input">
                    <i class="fa-solid fa-user"></i>
                    <input type="text" placeholder='Username' />
                </div>
                <div className="input">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" placeholder='Password' />
                </div>
            </div>

            <div className="submit submit-signup">Login</div>
            <div className='container-login'>
                <div className='text-login'>Already have an account? </div>
                <Link to = "/signup" className="submit submit-login">SignUp</Link>
            </div>
        </div>
  )
}

export default Login
