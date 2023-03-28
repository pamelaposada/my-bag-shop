

function CheckOutItem(props){
    return(
        <div className="ckout-box">
            <p>1x</p>
            <p>{props.name}</p>
            <p>{(props.price).toFixed(2)}</p>
        </div>
    )
}
export default CheckOutItem;