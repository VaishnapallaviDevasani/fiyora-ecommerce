import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/shopContext';
import Productitem from './Productitem';
import Title from './Title';

const Bestseller = () => {

    const {product} =useContext(ShopContext);
    const [bestseller,setbestseller]=useState([]);
    useEffect(()=>{
        const bestproduct=product.filter((item)=>(item.bestseller));
        setbestseller(bestproduct.slice(0,5))
    },[])
  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'BEST'} text2={'SELLER'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        High on demand
        </p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
            bestseller.map((item,index)=>(
            <Productitem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>
            ))
        }
      </div>
    </div>
  )
}

export default Bestseller
