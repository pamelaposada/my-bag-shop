import { useLocation } from "react-router";
import Purchase from '../img/online-shopping.png'
import CheckOutItem from "./CheckOutItem";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import ThanksMessage from "./ThanksMessage";
import axios from "axios";

function SubmitPurchase(){
    
    const [finalMessage, setFinalMessage] = useState(false)
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [region, setRegion] = useState("")

    const location = useLocation()
    const fromCheckOut = location.state //Cart data, userLogging state, and current user.
    
    // Redirect user to home if login state is false.
    if(fromCheckOut === null){
        window.location = '/'
    }


    const sendPurchaseArray = fromCheckOut.fromCheckOut.map(({name, price}) => ({name, price}) )
    const handleFormSubmit = (e) => {
        e.preventDefault();

        const registered = {
            username : fromCheckOut.currentUser,
            products : sendPurchaseArray,
            total : totalFinal.toFixed(2),
            address: address,
            state: region,
            phone: phone

        }
        if (registered.state === "none"){
            console.log("Error: No State selected")
        }else if(fromCheckOut === null){
            console.log("Error: Invalid user")
        }else{
            axios.post("/app/checkout", registered)
            .then(response => console.log(response))
            setFinalMessage(true)
        }
        
    }

   

    useEffect(()=> {
       
     console.log(finalMessage)
      },[finalMessage]);
    
    const hideForm = finalMessage === true ? 'hide-form':'show-form'

    const totalFinal = fromCheckOut === null 
    ? 0
    : fromCheckOut.fromCheckOut.map((item, i)=> item.price).reduce((pre, curr, i) => pre + curr + 0)

    const displayCheckOut = fromCheckOut === null 
    ? <div className="item-cart-empty-error"><p>No items in your cart</p></div>
    : fromCheckOut.fromCheckOut.map((item, i)=>(
        <div key={i}>
            <CheckOutItem 
            name={item.name}
            price={item.price}
            />
        </div>
    ))
    

    const displayFinalMessage = finalMessage === true ? 'show-form' : 'hide-form'

    return(
        <div>
            <div className={displayFinalMessage}>
                <ThanksMessage name={fromCheckOut.currentUser}/>
            </div>
            
            <div className={`check-out-main-box ${hideForm}`}>
                
                    <h1 className="title">Checkout!</h1>
                    <img src={Purchase} alt="bags" className="bags"/>
                    <div className="chkout-item-box">
                        <h3 className="chk-title">Your Items:</h3>

                        {displayCheckOut}
                        
                        <form className={fromCheckOut === null ? "hide-form" : "show-form"} onSubmit={handleFormSubmit}>
                            <h3 className="chk-title">Your Delivery details:</h3>
                            <div className="form-bg">
                                <div className="format-form">
                                    <div className="add_plus_state">
                                        <label className="addr_inpt">
                                            Your Address:
                                            <input type="text" value={address} onChange={(e)=> setAddress(e.target.value)} />
                                        </label>
                                        
                                        <label>Your State:
                                        <select name="state" id="state" className="select-region" onChange={(e)=> setRegion(e.target.value)}>
                                            <option value="none">Select...</option>
                                            <option value="ACT">ACT</option>
                                            <option value="NSW">NSW</option>
                                            <option value="NT">NT</option>
                                            <option value="QLD">QLD</option>
                                            <option value="SA">SA</option>
                                            <option value="VIC">VIC</option>
                                            <option value="TAS">TAS</option>
                                            <option value="WA">WA</option>
                                        </select>
                                        </label>
                                    </div>
                                </div>
                                <div className="format-form">
                                    <label>
                                        Your Phone:
                                        <input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)}/>
                                    </label>
                                </div>
                            </div>
                            <h2><span>Total:</span> AUD {totalFinal.toFixed(2)}</h2>
                            <input type="submit" value="Confirm Order"className="final-chbkt-btn"/>
                        </form>
                    </div>
                    <Link to={`/`} className="cancel-link"><p className="cancel-p">Cancel</p></Link>
            </div>
            
        </div>
    )
}

export default SubmitPurchase;