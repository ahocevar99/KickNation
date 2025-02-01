import React, { useState } from 'react'
import '../styles/SignUpLogin.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
const SignUp = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [clubName, setClubName] = useState('')
    const [password, setPassword] = useState('')

    const signUpSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/register', {
                username: username,
                clubName: clubName,
                password: password,
            })
            console.log(response.data.message)
            if (response.data.message == "Successful signup"){
                navigate("/")
            }
        } catch (error) {
            console.error("Error sending data: ", error)
        }
    }

    return (
        <div className='container'>
            <div className="title">Sign Up</div>
            <div className="underline"></div>
            <form onSubmit={signUpSubmit}>
                <div className="inputs">
                    <div className="input">
                        <i class="fa-solid fa-user"></i>
                        <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} value={username}/>
                    </div>
                    <div className="input">
                        <i class="fa-solid fa-shield-halved"></i>
                        <input type="text" placeholder='Club Name' onChange={(e) => setClubName(e.target.value)} value={clubName}/>
                    </div>
                    <div className="input">
                        <i class="fa-solid fa-lock"></i>
                        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={password}/>
                    </div>
                </div>

                <button className="submit submit-signup">Sign Up</button>
            </form>
            <div className='container-login'>
                <div className='text-login'>Don't have an account? </div>
                <Link to="/" className="submit submit-login">Login</Link>
            </div>
        </div>
    )
}

export default SignUp
