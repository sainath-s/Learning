import React,{useState,useEffect} from 'react';
import '../styles.css';
import {API} from '../backend';
import Base from './Base';
import Card from './Card';
import { getProducts } from './helper/coreapicalls';


export default function Home(){
    //console.log("API is",API);

    const [products,setProducts] = useState([])
    const [error , setError] = useState(false)

    const loadAllProduts = () =>{
        getProducts().then(data => {
            if(data.error) {
                setError(data.error)
            }
            else{
                setProducts(data);
            }
        })
    };

    useEffect(()=>{
        loadAllProduts()
    },[]);

    return(
        <Base title="Home Page" description="Welcom to T-shirts">
            {/* <h1 className="text-white">Hello FrontEnd</h1> */}
            <div className="row text-center">
                {/* <div className="col-4">
                    <Card></Card>
                </div> */}
                <h1 className="text-white">All of t-shirts</h1>
                <div className="row">
                    {products.map((product, index)=>{
                        return(
                            <div key={index} className="col-4 mb-4">
                                <Card product={product}/>    
                            </div>
                        )
                    })}
                </div>
            </div>
        </Base>
    );
};

