import React,{useState, useEffect} from 'react'
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemtoCart,removeItemfromCart } from './helper/CartHelper';


const Card = ({product , addtoCart = true , removefromCart = false , 
                setReload= f => f , reload=undefined}) => {

        const [redirect,setRedirect]=useState(false);
        const [count,setCount] = useState(product.count)

        const cardTitle = product ? product.name : "A photo from pexels"
        const cardDescription = product ? product.description : "Default Description"
        const cardPrice = product ? product.price : "Default Price"
        
        const ItemToCart = ()=>{
            addItemtoCart(product,()=>setRedirect(true))
        }

        const getAredirect = (redirect) =>{
            if(redirect){
              return <Redirect to="/cart"/>
            }
        }
        const showAddtoCart = addtoCart => {
          return (
              addtoCart && (
              <button
                 onClick={ItemToCart}
                 className="btn btn-block btn-outline-success mt-2 mb-2"
              >
                  Add to Cart
              </button>)
          )
        }

        const showremoveFromCart =  removefromCart => {

          return ( removefromCart && (
              <button
                onClick={()=>
                  {
                    removeItemfromCart(product._id);
                    setReload(!reload)
                  }}
                className="btn btn-block btn-outline-danger mt-2 mb-2"
              >
              Remove from cart
              </button>
          )
          )
        }

        return (
          <div className="card text-white bg-dark border border-info ">
            <div className="card-header lead">{cardTitle}</div>
            <div className="card-body">
              {getAredirect(redirect)}
              <ImageHelper product={product}/>              
              <p className="lead bg-success font-weight-normal text-wrap">
                {cardDescription}
              </p>
              <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
              <div className="row">
                <div className="col-12">
                  {showAddtoCart(addtoCart)}
                </div>
                <div className="col-12">
                  {showremoveFromCart(removefromCart)}
                </div>
              </div>
            </div>
          </div>
        );
};

export default Card;



