import AddtoCart from '../img/add-to-cart.png'
import Remove from '../img/remove.png'
function Product (props){
  
    const isSelected = props.isSelected

    return(
      <div>
        <div >
            <div className='item'>
                <h3 className='item-name' >{props.name}</h3>
                <div className='item-category' >
                    <p className='item-category_all' style={props.style}>{props.category}</p>
                </div>
                <p className='item-description'>{props.description}</p>
                <h4 className='item-price' >${props.price} AUD</h4>
                <div className='product-container'>
                    <img src={props.url} alt="test" className="product-image"/>
                </div>
                <button className="cart-btn"
                onClick={(e)=> {
                    e.stopPropagation()
                    if(!isSelected){
                        props.onAddToCart(props.name)
                    }
                    else{
                        props.onRemoveFromCart(props.name)
                    }                  
                }
                }            
                >
                    <h4>{!isSelected ? "Add to cart": "Remove from cart"}</h4>
                    <img 
                    src={!isSelected ? AddtoCart : Remove} 
                    alt="cart" 
                    className='add-cart-img'
                    />
                </button>
            </div>
        </div>
      </div>
    )
  
  }

export default Product;