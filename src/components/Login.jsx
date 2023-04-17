import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router";

import Bar from '../components/UI/BarMessage'

function Login(props){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState([])

    // const location = useLocation()
    // const fromProductList = location.state



    const onchangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onUserName = (e) => {
        setUsername(e.target.value)
    }

    const onSubmitLoginForm = (e) => {
        e.preventDefault()
        
        const registered = {
       
            username: username,
            email: email,
            password: password,
        }
        

        axios.post('http://localhost:4000/app/login', registered)
        .then(response => setMessage(response.data.message))

        
    }
    if(message === "login success"){
            // props.state.location.data.fromProductList(message.message)
            // window.location = '/'
            console.log(message)
        }


    const displayMessage = message === "Wrong username or password" ? <Bar errorMsge={message}/> : ""

    useEffect(()=> {
        console.log(message)
        
      },[message])

    return(
        <div className="signup-box">
        {displayMessage}
        <h1 className="title">Login</h1>
        <form onSubmit={onSubmitLoginForm}>                
            <div className="form-bg sgn-box">
                <div className="format-form">
                    <label>
                        Your Username:
                        <input 
                        type="text"  
                        placeholder="Your name here..."
                        onChange={onUserName}
                        value={username}
                        />
                    </label>
                </div>
                <div className="format-form">
                    <label>
                        Your Password:
                        <input 
                        type="text" 
                        placeholder="Your username here..."
                        onChange={onchangePassword}
                        value={password}
                        />
                    </label>
                </div>
            </div>
            <p>If you don't have an account Signup <Link to={'/signup'} className='log-link'>here</Link></p>
            <input 
            type="submit" 
            value="Login"
            className="final-chbkt-btn"
            />
        </form>
        <Link to={"/"}>Cancel</Link>
    </div>
    )
}
export default Login;