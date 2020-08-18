import React,{useState,useEffect} from 'react';
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';
import StripeCheckouts from './StripeCheckout';

const Cart = () => {
    //console.log("API is",API);

    const [products,setProducts]=useState([])
    const [reload,setReload] =useState(false)

    useEffect(()=>{
        setProducts(loadCart)
    },[reload])
    
    const loadAllProducts =() =>{
        return (
            <div>
                <h2>This section is to load products</h2>
                {products && products.map((product,index) =>{
                     return(
                        <Card key={index} product={product} addtoCart={false} removefromCart={true} setReload={setReload} reload={reload}/>    
                    )
                    // <Card key={index} product={product} removefromCart={true}/>
                })}
            </div>
        )
    }        

    const loadCheckout =() =>{
        return (
            <div>
                <h2>This section is for checkout</h2>
            </div>
        )
    }        

    return(
        <Base title="Cart Page" description="Ready to Checkout">
            <div className="row text-center">
                <div className="col-6">
                    {loadAllProducts()}
                </div>
                <div className="col-6">
                    <StripeCheckouts products={products} setReload={setReload}/>
                </div>
            </div>
        </Base>
    );
};

export default Cart;