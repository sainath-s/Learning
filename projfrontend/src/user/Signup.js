import React ,{useState} from 'react';
import Base from '../core/Base';
import {Link} from 'react-router-dom';
import { signup } from '../auth/helper';


const Signup =() =>{
    const [values, setValues] = useState({
        name:"",
        email:"",
        password:"",
        error:"",
        success:false
    });

    const {name, email,password,error,success} =values;

    const handleChange = name => event => {
        setValues({...values,error: false,[name]:event.target.value})
    }

    //onclick event
    const onSubmit = event =>{
        event.preventDefault();
        setValues({...values,error:false});
        signup({name,email,password})
        .then(data => {
            if(data.error){
                setValues({...values,error:data.error,success:false})
            }
            else{
                setValues({...values,name:"",email:"",password:"",error:"",success:true});
            }
        })
        .catch(
                console.log("Error in Signup")
        )
    }

    const successMessage = () =>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-success" style={{display: success ? "" : "none"}}>
                        New Account was created successfully.Please <Link to="/signin">Login</Link> here
                    </div>
                </div>
            </div>);
    };

    const errorMessage = () =>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                        {error}
                    </div>
                </div>
            </div>
            );
    };

    const signupform =()=>{
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form>
                        <div className="form-group">
                            <label className="text-light">Name</label>
                            <input className="form-control" onChange={handleChange("name")}
                            value={name} 
                            type="text"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">EMAIL</label>
                            <input className="form-control"  onChange={handleChange("email")}
                            value={email} 
                             type="email"/>
                        </div>
                        <div className="form-group">
                            <label className="text-light">Password</label>
                            <input className="form-control"  onChange={handleChange("password")} 
                            value={password} 
                            type="password"/>
                        </div>
                        <button className="btn-success btn-block" onClick={onSubmit}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }

    return (
        <Base title="Singup Page" description="Page for User to Signup!">
            {successMessage()}
            {errorMessage()}
            {signupform()}
            {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
        </Base>
    )
}


export default Signup;