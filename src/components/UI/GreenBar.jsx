import './BarMessage.css'

function GreenBar(props){
    return(
        <div className="success">
            <p>{(`Welcome back ${(props.successLogin)}`).toUpperCase()}</p>
        </div>
    )
}
export default GreenBar;