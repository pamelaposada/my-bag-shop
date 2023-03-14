import Remove from '../img/remove.png'

function CartItem(props){
    
    // if(!props){
    //     return <EmptyCart/>
    // }
    // console.log(props)
    // console.log(props.passSelected)

    return(
        <div className="item-cart">
            <div className="cart-image-container">
                <img src={props.url} alt="product" />
            </div>
            
            <p>{props.name}</p>
            <p>{props.price}</p>
            <button className='remove-btn'>
                <img src={Remove} alt="remove" />
            </button>
        </div>
    )
}

function EmptyCart(){
    return(
        <div className="empty-cart">
            <p>Your cart is empty.</p>
        </div>
    )
}

export default CartItem;