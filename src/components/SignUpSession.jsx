import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './SignUpSession.css'

function SignUpSession(props){

    const [fullName, setFullName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const changeFullName = (e) => {
        setFullName(e.target.value)
    }

    const changeUsername = (e) => {
        setUserName(e.target.value)
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const onSubmitSignupForm = (e) => {
        e.preventDefault()

        const registered = {
            fullName: fullName,
            username: username,
            email: email,
            password: password,
        }
        axios.post('http://localhost:4000/app/signup', registered)
        .then(response => console.log(response.data))

        window.location = '/'
    }

    return(
        <div className="signup-box">
            <h1 className="title">Sign Up</h1>
            <form onSubmit={onSubmitSignupForm}>                
                <div className="form-bg sgn-box">
                    <div className="format-form">
                        <label>
                            Your Name:
                            <input 
                            type="text"  
                            placeholder="Your name here..."
                            onChange={changeFullName}
                            value={fullName}
                            />
                        </label>
                    </div>
                    <div className="format-form">
                        <label>
                            Your Username:
                            <input 
                            type="text" 
                            placeholder="Your username here..."
                            onChange={changeUsername}
                            value={username}
                            />
                        </label>
                    </div>
                    <div className="format-form">
                        <label>
                            Your Email:
                            <input 
                            type="text" 
                            placeholder="Your email here..."
                            onChange={changeEmail}
                            value={email}
                            />
                        </label>
                    </div>
                    <div className="format-form">
                        <label>
                            Your Password:
                            <input 
                            type="text" 
                            placeholder="Your password here..."
                            onChange={changePassword}
                            value={password}
                            />
                        </label>
                    </div>
                </div>
                <p>If you already have an account Login <Link className='log-link'>here</Link></p>
                <input 
                type="submit" 
                value="Sign up"
                className="final-chbkt-btn"
                />
            </form>
            <Link to={"/"}>Cancel</Link>
        </div>
    )
}
export default SignUpSession;