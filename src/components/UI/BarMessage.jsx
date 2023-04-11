import './BarMessage.css'

function BarMessage(props){
    return(
        <div className="bar-msj-box">
            <p>{props.errorMsge}</p>
        </div>
    )
}
export default BarMessage;