import './BarMessage.css'
import { Link } from 'react-router-dom';

function AccountSuccess(props){
    return(
        <div className={props.succlass}>
            <p className='acc-success-p'>{`${props.succMsg}. Login `}</p>
            <Link to={"/login"} className='scc-link'>here</Link>
        </div>
    )
}
export default AccountSuccess;