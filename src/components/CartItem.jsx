import Remove from '../img/remove.png'

function CartItem(props){
    
    // console.log(props)
    // console.log(props.passSelected)

    return(
        <div className="item-cart">
            <div className="cart-image-container">
                <img src={props.url} alt="product" />
            </div>
            
            <p>{props.name}</p>
            <p className='item-price-cart'>{props.price}</p>
            <button className='remove-btn'
            onClick={(e) => {
                e.stopPropagation()
                props.onRemoveFromCartBox(props.name)
            }}
            >
                <img src={Remove} alt="remove" />
            </button>
        </div>
    )
}


export default CartItem;