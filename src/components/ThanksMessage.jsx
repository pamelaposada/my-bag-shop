import { Link } from 'react-router-dom';
import ShoppingBag from '../img/shopping-bag.png'

function ThanksMessage(props){
    return(
        <div className={`thanks-box`}>
            <h1>Thanks <span className='name-b'>{props.name}</span> for your purchase</h1>
            <img src={ShoppingBag} alt='shppoing bag' className='sh-b'/>
            <Link to={`/`} className="cancel-link"><p className="cancel-p">Back to Home</p></Link>
        </div>
    )
}
export default ThanksMessage;