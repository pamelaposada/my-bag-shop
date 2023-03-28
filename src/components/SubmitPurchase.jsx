import { useLocation } from "react-router";
import Purchase from '../img/online-shopping.png'
import CheckOutItem from "./CheckOutItem";
import { Link } from 'react-router-dom';
import { useState } from "react";

function SubmitPurchase(){
    // const[displayForm, setDisplayForm] = useState(true)

    const location = useLocation()
    const fromCheckOut = location.state

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
    
    // const displayForm = fromCheckOut === null ? 
    return(
        <div>
            <div className="check-out-main-box">
                
                    <h1 className="title">Checkout!</h1>
                    <img src={Purchase} alt="bags" className="bags"/>
                    <div className="chkout-item-box">
                        <h3 className="chk-title">Your Items:</h3>

                        {displayCheckOut}
                        
                        <form className={fromCheckOut === null ? "hide-form" : "show-form"}>
                            <h3 className="chk-title">Your Delivery details:</h3>
                            <div className="form-bg">
                                <div className="format-form">
                                    <label>
                                        Your Name:
                                        <input type="text" name="name" />
                                    </label>
                                </div>
                                <div className="format-form">
                                    <label>
                                        Your Surname:
                                        <input type="text" name="surname" />
                                    </label>
                                </div>
                                <div className="format-form">
                                    <label>
                                        Your Address:
                                        <input type="text" name="address" />
                                    </label>
                                </div>
                                <div className="format-form">
                                    <label>
                                        Your Phone:
                                        <input type="text" name="phone" />
                                    </label>
                                </div>
                            </div>
                            <h2><span>Total:</span> AUD {totalFinal.toFixed(2)}</h2>
                            <input type="submit" value="Confirm Order"className="final-chbkt-btn"/>
                        </form>
                    </div>
            </div>
            <Link to={`/`} className="cancel-link"><p className="cancel-p">Cancel</p></Link>
        </div>
    )
}

export default SubmitPurchase;