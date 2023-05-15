import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './SignUpSession.css'
import Bar from './UI/BarMessage'

axios.defaults.withCredentials = true;

function SignUpSession(props){

    const [fullName, setFullName] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState("");
    // const [ErrorUsername, setErrorUsername] = useState("")

    // useEffect(()=> {
    //     console.log(formError)
    // },[formError])

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

        // Validation

        if(!registered.email.includes('@')){
            setFormError("No valid email")
            // console.log("error: Email error")
        }else if(registered.password.length < 6){
            setFormError("Password length too short")
            // console.log("error: Password error")
        }else{
            axios.post(`http://localhost:4000/app/signup`, registered)
            .then(response => response.data)

            setFormError("Your account has been successfully created")

            window.location = '/'
        }
            
        
    }

    const displayMessage = formError === "No valid email" || formError === "Password length too short" ? <Bar errorMsge={formError}/> : ""

    return(
        <div className="signup-box">
            {displayMessage}
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
                <p className='text-msje'>If you already have an account Login <Link to={'/login'} className='log-link'>here</Link></p>
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