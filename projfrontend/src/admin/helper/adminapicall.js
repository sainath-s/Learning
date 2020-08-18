import {API} from "../../backend"

//category Calls
export const createCategory = (userId,token,category)=>{
    //console.log(userId)
    //console.log(token)
    return fetch(`${API}/category/create/${userId}`,
            {
                method:"POST",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`       
                },
                body: JSON.stringify(category)
            })
            .then( response => {
                    //console.log(response)
                    return response.json();
            })
            .catch( error  =>{
                console.log(error);
            })
};

//get all Categories
export const  getCategories = ()=>{
    return fetch(`${API}/categories`,{
        method: "GET",
    })
    .then(response => {return response.json()})
    .catch(error =>{console.log(error) })
}

export const getCategory=(categoryId)=>{
    return fetch(`${API}/category/${categoryId}`,{
        method:"GET"
    })
    .then( response => {return response.json()}
    )
    .catch( err => {console.log(err)});
}

export const updateCategory =(categoryId,userId,token, category) =>{
    //console.log(category)
    return fetch(`${API}/category/${categoryId}/${userId}`,
    {
        method:"PUT",
        headers:{
            Accept:"application/json",  
            "Content-Type":"application/json",                 
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then( response => {
        return response.json()
    })
    .catch(error =>{
        console.log(error);
    })
};


export const deleteCategory = (categoryId, userId,token)=>{
    
    return fetch(`${API}/category/${categoryId}/${userId}`,
            {
                method:"DELETE",
                headers:{
                    Accept:"application/json",                   
                    Authorization: `Bearer ${token}`
                }
                
            }).then( response => {
                return response.json()
            })
            .catch(error =>{
                console.log(error);
            })
}

//product calls

//create product
export const createProduct = (userId,token, product)=>{
    //console.log(userId);
    return fetch(`${API}/product/create/${userId}`,
            {
                method:"POST",
                headers:{
                    Accept:"application/json",                   
                    Authorization: `Bearer ${token}`
                },
                body: product
            }).then( response => {
                console.log(response);
                return response.json()
            })
            .catch(error =>{
                console.log(error);
            })
}

//get All products
export const  getProducts = ()=>{
    return fetch(`${API}/products`,{
        method: "GET",
    })
    .then(response => {return response.json()})
    .catch(error =>{console.log(error) })
}

//delete a product
export const deleteProduct = (productId, userId,token)=>{
    return fetch(`${API}/product/${productId}/${userId}`,
            {
                method:"DELETE",
                headers:{
                    Accept:"application/json",                   
                    Authorization: `Bearer ${token}`
                }
                
            }).then( response => {
                return response.json()
            })
            .catch(error =>{
                console.log(error);
            })
}


//get a product
export const getProduct=(productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    })
    .then( response => {return response.json()}
    )
    .catch( err => {console.log(err)});
}

//update a product
export const updateProduct = (productId,userId,token, product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,
            {
                method:"PUT",
                headers:{
                    Accept:"application/json",                   
                    Authorization: `Bearer ${token}`
                },
                body: product
            }).then( response => {
                return response.json()
            })
            .catch(error =>{
                console.log(error);
            })
}
