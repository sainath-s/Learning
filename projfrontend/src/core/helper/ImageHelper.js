import React from 'react'
import { API } from '../../backend';



const ImageHelper = ({product}) => {
    let Imageurl = product ? `${API}/product/photo/${product._id}` : `https://images.pexels.com/photos/806627/pexels-photo-806627.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
    return (
        <div className="rounded border border-success p-2">
                <img
                  src={Imageurl}
                  alt="testphoto"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                  className="mb-3 rounded"
                />
        </div>
    )
}

export default ImageHelper;
