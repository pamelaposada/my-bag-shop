import { useEffect, useState } from 'react'
import ListOfProducts from '../data/ListOfProducts'
import Product from './Product';
import Cart from '../img/cart.png';
import CartItem from './CartItem'
import { Link, Params } from 'react-router-dom';


function ProductList(){
  const list= ListOfProducts
  const [copydata, setCopydata] = useState([]);
  const [data, setData] = useState(list);
  const [inputContent, setInputContent] = useState('');
  const [cartStyle, setCartStyle] = useState({display: 'none'});
  const [cart, setCart] = useState([]);


  const handleBtns = (e) => {
    if(e.target.value === "All products"){
      setCopydata(list)
    }
    else if(e.target.value === "Business and Travel"){
      let pantsAndSkirts = list.filter(item => item.category === "business" || item.category === "travel")
      setCopydata(pantsAndSkirts)
    }
    else if (e.target.value === "handbags"){
      let selecJackets = list.filter(item => item.category === "handbags")
      setCopydata(selecJackets)
    }
    else{
      let selectShirts = list.filter(item => item.category === "wallets")
      setCopydata(selectShirts)
    }
  }

  const handleChange = (e) => {
    // console.log(e.target.value)
    setInputContent(e.target.value)
  }

  const searchBar = (e) => {
    // console.log(inputContent)

    // Filter by name and description
    let filterData = data.filter(item => item.name.toLocaleLowerCase()
    .search(inputContent
    .toLocaleLowerCase()) >= 0 || item.description
    .toLocaleLowerCase()
    .search(inputContent.toLocaleLowerCase()) >= 0 ||
    item.category.toLocaleLowerCase().search(inputContent.toLocaleLowerCase()) >= 0)
    setCopydata(filterData)
  }

  const sortByPrice = (e) => {
    // Sort by highest and lowest price
    if(e.target.value === "highest"){
      const sorting = [...data].sort((a,b) => (b.price - a.price))
      setCopydata(sorting)
    }
    else if (e.target.value === "lowest"){
      const sorting = [...data].sort((a,b) => (a.price - b.price))
      setCopydata(sorting)
    }
  }

//   Display all products from the start
  useEffect(()=> {
    const displayItems = ()=> {
        setCopydata(list)
    }
    displayItems()
  },[]);

//  Cart functions 
  const displayCartItems = (e) => {
    setCartStyle({display: "block"})
  }

  const hideCartItems = (e) => {
    setCartStyle({display: 'none'})
  }

  const addToCartClick = (item) => {
    const newCart = [...cart, item];
    setCart(newCart);
  }

  // Remove from Products list
  const removeFromCartClick = (name) => {
    const newCart = cart.filter(item => item !== name);
    setCart(newCart);
  }

  // Remove from Cart
  const removeFromCartBox = (itemToRemove) => {
    const newCart = cart.filter(item => item !== itemToRemove);
    setCart(newCart)
  }

  useEffect(()=> {
    console.log(cart)
  },[cart])

  const selectedItems = data.filter(item => cart.includes(item.name))
  const displayCheckOut = selectedItems.length !== 0
    ?<CheckOut cartLng={selectedItems}/> 
    : <h4>Your cart is empty</h4>


    return(
          <div>
            <div>
            <Link to={"/signup"} className="sign-up-bt sg-link" onClick={(e)=> {
                e.stopPropagation()}}>Sign Up</Link>
              <h1 className='title'>My Bag Shop</h1>        
              <div className='main-cart-box'>
                  <div className='cart-box' onMouseEnter={displayCartItems} >
                      <img 
                      src={Cart} 
                      alt="cart"/>
                      <p>{cart.length}</p>             
                  </div>

                  {/* Hover */}
                  <div className='main-cart-items' 
                  style={cartStyle} 
                  onMouseLeave={hideCartItems}
                  >
                      <div className="cart-items-container">
                          
                          {selectedItems.map((item, i) => (
                              <div key={i}>
                                  <CartItem 
                                  url={item.url}
                                  name={item.name}
                                  price={item.price}
                                  passSelected={selectedItems}
                                  onRemoveFromCartBox={removeFromCartBox}
                                  />
                              </div>
                          ))}
                          {displayCheckOut} 
                      </div>        
                  </div>
            </div>
            <div className='heading'></div>
            <h2 className='title-products'>Available Products</h2>
            <div className='filters'>
                <div className='btns'>
                    <button className='btn-p btn' value={'handbags'} onClick={handleBtns}>Handbags</button>
                    <button className='btn-p-and-s btn' value={'Business and Travel'} onClick={handleBtns}>Business and Travel</button>
                    <button className='btn-j btn' value={'wallets'} onClick={handleBtns}>Wallets</button>
                    <button className='btn-all btn' value={'All products'} onClick={handleBtns}>All products</button>
                </div>
                <div className='search-bar'>
                <div>
                    <input type="search"  className="input-style" onChange={handleChange}></input>
                    <button className='btn-search' onClick={searchBar}>Search</button>
                </div>
                <div>
                    <p className='sort-title'>Sort by price</p>
                    <fieldset className='check-box' onChange={sortByPrice}>
                        <input type='radio' name='sort' value='highest'></input>
                        <label className='radio-label'>Highest</label>
                        <input type='radio' name='sort' value='lowest'></input>
                        <label className='radio-label'>Lowest</label>
                    </fieldset>
                </div>
                </div>
            </div>
          </div>
        <div className='box'>
            {copydata.map((item, i)=> 
            (
              <div key={i}>
                <Product 
                name={item.name} 
                category={item.category} 
                description={item.description} 
                price={item.price} 
                url={item.url}
                onAddToCart={addToCartClick}
                onRemoveFromCart={removeFromCartClick}
                isSelected={cart.includes(item.name)}
                />
              </div>  
            ))
          }
        </div>
      </div>  
    )
}

export default ProductList

function CheckOut(props){

  // console.log(props.cartLng)

  // const purchase = props.cartLng

  const totalValues = props.cartLng.map((item,i) => item.price).reduce((pre,curr,i) => pre + curr + 0)

  // console.log(totalValues)

  return(
    <div>
      <h4>Total: <span className='total-value-color'>${(totalValues).toFixed(2)}</span></h4>
      <button className='cart-btn checkout-btn'>
        <Link to={`/checkout`} className="ckeckout-link" state={{fromCheckOut: props.cartLng}}>
        <p>{`Proceed to check out (${props.cartLng.length} items)`}</p>
        </Link>
      </button>
    </div> 
  )
}