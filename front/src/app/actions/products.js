import Axios from "axios";
import { Redirect } from "react-router";
import { GET_PRODUCTS, PRODUCTS_ERROR,DELETE_PRODUCTS,GET_CATEGORIES,CATEGORIES_ERROR ,ADD_PRODUCTS} from "./types";

export const getProducts = ()=> async dispatch =>{
    
        try {
            const res = await Axios.get(`${process.env.REACT_APP_API_URL}/api/products`)
          dispatch({
                type:GET_PRODUCTS,
                payload:res.data
            })
        } catch (error) {
            dispatch({
                type:PRODUCTS_ERROR
            })
        }
    
    
}
export const deleteProduct = (id)=> async dispatch =>{
    if(window.confirm("Are You Sure You Want To Delete Product")){  
    try {
            await Axios.delete(`${process.env.REACT_APP_API_URL}/api/products/${id}`, {headers:{'x-auth-token':localStorage.getItem('authToken')}})
          dispatch({
                type:DELETE_PRODUCTS,
                payload:id
            });
        } catch (error) {
            dispatch({
                type:PRODUCTS_ERROR
            })
        }
    }
    
}
//Add Product 
export const addProduct = (formData)=> async dispatch =>{
    
    try {
        const res = await Axios.post(`${process.env.REACT_APP_API_URL}/api/products`, {headers:{
            'x-auth-token':localStorage.getItem('authToken')
        }})
      dispatch({
            type:ADD_PRODUCTS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PRODUCTS_ERROR
        })
    }


}

export const getCategory = ()=> async dispatch =>{
    
    try {
        const res = await Axios.get(`${process.env.REACT_APP_API_URL}/api/categories`)
        
      dispatch({
            type:GET_CATEGORIES,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:CATEGORIES_ERROR
        })
    }


}