import React,{useState,useEffect} from 'react';
import { isAuthenticated } from '../auth/helper';
import { emptyCart, loadCart } from  "./helper/CartHelper"
import { Link } from 'react-router-dom';
import StripeCheckout from "react-stripe-checkout"
import { API } from '../backend';


const StripeCheckouts = ({products,setReload = f=>f , reload=undefined}) => {

    const [data,setData]= useState({
        loading:false,
        success:false,
        error:"",
        address:""
    });

    const token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalAmount =  ()=>{
        let amount = 0;
        if(products){
            products.map(p => {
                amount =  amount+p.price
            })
            return amount;        
        }
        return amount;
        
    }

    const makePayment = (token) => {
        const body={
            token,
            products,
        }

        const headers={
            "Content-Type":"application/json"
        }

        return fetch(`${API}stripepayment`,{
            method: "POST",
            headers,
            body:JSON.stringify(body)
        }).then(response=>{
            console.log(response)
            const {status} = response;
            console.log("STATUS",status);
            // const orderData ={
            //     products:products,
            //     transaction_id:response.transaction.id

            // }
            emptyCart(()=>{
                console.log("")
            });
            //Reload the page
            setReload(!reload);

        })
        .catch(error=>console.log(error))
    }
    
    const showStripeButton = () =>{
        return isAuthenticated() ? (
            <StripeCheckout
                stripeKey="pk_test_51HD1kEI5PRYYO9mPtPtZGHNDlBlCUEaUgRg3ltPzijJHdqgs8LvJfO3fFidoq2VU6eru2f34BeyiXIWBVpVg0cvE00qAPJ9k3u"
                token={makePayment}
                amount={getFinalAmount() * 100}
                name="Buy Tshirt"
                shippingAddress
                billingAddress
            >
            <button className="btn btn-success">Pay with stripe</button>
            </StripeCheckout>
        ) : (
            <Link to="/signin"><button className="btn btn-warning">Signin</button></Link>
        )
    }

    
    // const erroMessage=()=>{

    // }

    return (
        <div>
            <h3 className="text-out">Stripe Chekout {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}

export  default StripeCheckouts