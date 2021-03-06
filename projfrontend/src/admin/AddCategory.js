import React,{useState} from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';
import { createCategory } from './helper/adminapicall';


const AddCategory = () => {
    
    const [name, SetName] = useState("");
    const [error, SetError] = useState(false);
    const [success, SetSuccess] = useState(false);

    const {user,authToken} = isAuthenticated();

    const goBack= ()=>(

        <div className="mt-5">
            <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">Admin Home</Link>
        </div>

    );

    const handleChange = (event)=>{
        //
        SetError("");
        SetName(event.target.value);
    };

    const onSubmit  = (event)=>{
        event.preventDefault();
        SetError("");
        SetSuccess("false");
        //backend request fired
        createCategory(user._id,authToken,{name})
        .then(data =>{
            //console.log(data)
            if(data.error){
                SetError(error);
            }
            else {
                SetError("");
                SetSuccess("true");
                SetName("");
            }
        })
        .catch(error =>{
            console.log(error);
        })
    };

    const successMessage = () =>{
        if(success) {
            return ( <h4 className="text-success"> Catergory created successfull </h4>)
        }     
    }
    const warningMessage = () =>{
        if(error) {
            return ( <h4 className="text-Danger"> Failed to create catergory</h4>)
        }     
    }
    const myCategoryFrom =()=>{
        return(
        <form >
            <div className="form-group">
                <p className="lead">Enter the Category</p>
                <input type="text" className="form-control my-3" 
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder="For Ex.Summer"
                />
                <button onClick={onSubmit} className="btn btn-outline-info">Create Category</button>
            </div>
        </form>
        );
    }

    

    return (
        <Base title="Create a catergory here"
                description="Add a new category"
                className="container bg-info p-4">
                <div className="row bg-white rounded">
                    <div className="col-md-8 offset-md-2">
                        {myCategoryFrom()}
                        {goBack()}
                        {successMessage()} 
                        {warningMessage()}
                        
                    </div>
                </div>
        </Base>
    )
};

export default AddCategory;

