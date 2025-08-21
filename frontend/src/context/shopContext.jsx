import axios from 'axios';
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export const ShopContext=createContext();

const ShopContextProvider=(props)=>{
    const currency='$';
    const delivery_fee=10;
    const backendUrl =import.meta.env.VITE_BACKEND_URL
    const [search,setSearch]=useState('');
    const [showSearch,setShowSearch]=useState(false);
    const [cartItems,setCartItems]=useState({});
    const [product,setProduct]=useState([]);
    const [token,setToken] = useState('');
    const navigate=useNavigate();


    const addToCart=async(itemId,size)=>{
        if(!size){
            toast.error('Select the Product Size');
            return;
        }
        let cartData=structuredClone(cartItems);

        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size]=1;
            }
        }
        else{
            cartData[itemId]={};
            cartData[itemId][size]=1;
        }
        setCartItems(cartData);
        if(token){
            try{
                await axios.post(backendUrl +'/api/cart/add',{itemId,size},{headers:{token}})
            }catch(error){
                console.log(error)
                toast.error(error.message)
            }
        }
    }
    const getCartCount=()=>{
        let totalCount=0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalCount+=cartItems[items][item];
                    }
                }
                catch(error){
                    console.log(error)
                    toast.error(error.message)
                }
            }
        }
        return totalCount;
    }
    // const getCartAmount=()=>{
    //     let totalAmount=0;
    //     for(const items in cartItems){
    //         let itemInfo=product.find((product)=>product._id==items);
    //         for(const item in cartItems[items]){
    //             try{
    //                 if(cartItems[items][item]>0){
    //                     totalAmount+=itemInfo.price*cartItems[items][item];
    //                 }
    //             }
    //             catch(error){
    //                 console.log(error)
    //                 toast.error(error.message)
    //             }
    //         }
    //     }
    //     return totalAmount;
    // }
    const getCartAmount = () => {
  let totalAmount = 0;

  for (const itemId in cartItems) {
    const itemInfo = product.find((p) => p._id === itemId);

    // skip if product not found
    if (!itemInfo) continue;

    for (const size in cartItems[itemId]) {
      const quantity = cartItems[itemId][size];
      if (quantity > 0) {
        totalAmount += itemInfo.price * quantity;
      }
    }
  }

  return totalAmount;
};


    const updateQuantity=async(itemId,size,quantity)=>{
        let cartData=structuredClone(cartItems);
        cartData[itemId][size]=quantity;

        setCartItems(cartData);
        if(token){
            try{
                await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
            }catch(error){
                console.log(error)
                    toast.error(error.message)
            }
        }
    }
    const getProductsData =async()=>{
        try{
            const response = await axios.get(backendUrl +'/api/product/list')
            console.log(response.data)
            if(response.data.success){
            setProduct(response.data.products);
            }
            else{
                toast.error(response.data.message)
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }
    const getUserCart =async(token) =>{
        try{
            const response =await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.message)
        }
    }
    useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
        setToken(storedToken);
        getUserCart(storedToken);
    }
}, []);

    useEffect(()=>{
        getProductsData();
    },[])
    // useEffect(()=>{
    //     if(!token && localStorage.getItem('token')){
    //         setToken(localStorage.getItem('token'))
    //         getUserCart(localStorage.getItem('token'))
    //     }
    // },[])

    const value={
        product,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,setCartItems,addToCart,
        getCartCount,updateQuantity,getCartAmount,navigate,backendUrl,
        setToken,token
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;