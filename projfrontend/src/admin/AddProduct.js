import React ,{ useState , useEffect} from 'react'
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { getCategories, createProduct } from './helper/adminapicall'
import { isAuthenticated } from '../auth/helper'


const AddProduct = () => {

    const {user,authToken} = isAuthenticated();

    const [values , setValues] =useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        categories:[],
        category:"",
        loading:false,
        error:"",
        createdProduct:"",
        getRedirect:false,
        formData:""
    });

    const {name, 
           description, 
           price, 
           stock , 
           categories , 
           category , 
           loading, 
           error,
           createdProduct,
           getRedirect,
           formData
        } = values;
    

    
    const preload = () => {
        getCategories().then(data =>  {
            //console.log(data);
            if(data.error){
                setValues({...values,error:data.error})
            }else{  
                setValues({...values,categories:data,formData: new FormData()})
                //console.log(categories);
            }
        })
    };

    useEffect (()=>{
        preload()
    },[]);

    const handleChange = name => event =>{
        //console.log(event.target.value)
        const value = name  === "photo" ? event.target.files[0] : event.target.value
        formData.set(name,value);
        setValues({...values, [name]: value});
    }

    const onSubmit = (event)=>{
        event.preventDefault();
        console.log(user._id,authToken);
        setValues({...values,error:"",loading:true});
        createProduct(user._id,authToken,formData).then( data =>{
            //console.log(data)
            if(data.error){
                setValues({...values,error:data.error})
            }
            else{
                setValues({...values,
                name:"",
                description:"",
                price:"",
                stock:"",
                loading:false,
                createdProduct:data.name
            })

            }
     }).catch(error => {console.log(error)})
    };

    const SuccessMessage = () =>{
        return (
            <div className="alert alert-success mt-3" style={{display: createdProduct ?  "" : "none"}}>
                    <h4>{createdProduct} created successfully</h4>
            </div>
        )
    }

    const ErrorMessage = () =>{
        if(error){
            return (
                <div className="alert alert-danger mt-3">
                        <h4>Error in Adding new Product: {error} </h4>
                </div>)
        }       
    };

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
                onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && 
              categories.map((cate,index)=>(
                    <option key={index} value={cate._id}>{cate.name}</option>
             ))}
              
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Stock"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-outline-success mb-3">
            Create Product
          </button>
        </form>
      );

    return (
        <Base title="Add a new Product"
               description="Welcome to Product Creation Section"
               className="container bg-info p-4">
            
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">Admin Home</Link>
            <div className="row bg-dark text-white rounded">
                <div className="col md-8 offset-md-2">
                    {SuccessMessage()}
                    {ErrorMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    )
}

export default AddProduct;
