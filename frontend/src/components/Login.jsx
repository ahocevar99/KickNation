import React, {useState} from 'react'
import '../styles/SignUpLogin.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios'

const Login = () => {
    
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post ('http://localhost:3000/login', {
                username: username,
                password: password,
            })
            if (response.data.message == "Successful login") {
                navigate('/home', {state:{username:username}});
            }
        } catch (error) {
            console.error('Error sending data: ', error);
        }

    }


  
    return (
    <div className='container'>
            <div className="title">Login</div>
            <div className="underline"></div>
            <form onSubmit={loginSubmit}>
            <div className="inputs">
                <div className="input">
                    <i class="fa-solid fa-user"></i>
                    <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username}/>
                </div>
                <div className="input">
                    <i class="fa-solid fa-lock"></i>
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                </div>
            </div>

            <button className="submit submit-login">Login</button>
            </form>
            <div className='container-login'>
                <div className='text-login'>Already have an account? </div>
                <Link to = "/signup" className="submit submit-login" >SignUp</Link>
            </div>
        </div>
  )
}

export default Login
