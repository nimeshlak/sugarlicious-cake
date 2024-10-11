import React, { useCallback, useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

  const [method, setMethod] = useState('cod');
  const {navigate, backendUrl,token, cartItems, setCartItems, getCartTotal, delivery_fee, products} = useContext(ShopContext)
  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({...data,[name]:value}))
  }

  const onSubmitHandler = async (event)=> {
    event.preventDefault()
    try {
      let orderItems = []
      for(const items in cartItems){
        for(const item in cartItems[items]){
          if(cartItems[items][item] > 0 ){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      let orderData = {
        address:formData,
        items: orderItems,
        amount: getCartTotal() + delivery_fee
      }

      switch(method){
        //API call for COD
        case 'cod':
          const response = await axios.post('https://sugarlicious-cake-backend.vercel.app/api/order/place', orderData, {headers:{token}});
          if(response.data.success){
            setCartItems({})
            navigate('/orders')
          }else{
            toast.error(response.data.message)
          }
          break; 

        default:
          break;

      }

    } catch (error) {
      console.log(error);
    }
  }
  

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangehandler} name='firstName' value={formData.firstName} type="text" placeholder='First Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangehandler} name='lastName' value={formData.lastName}type="text" placeholder='Last Name' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangehandler} name='email' value={formData.email} type="email" placeholder='Email Address' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <input required onChange={onChangehandler} name='street' value={formData.street} type="text" placeholder='Street/House No ' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        <div className='flex gap-3'>
          <input required onChange={onChangehandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangehandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <div className='flex gap-3'>
          <input required onChange={onChangehandler} name='zipcode' value={formData.zipcode} type="number" placeholder='Zipcode' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
          <input required onChange={onChangehandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
        </div>
        <input required onChange={onChangehandler} name='phone' value={formData.phone} type="number" placeholder='Mobile No' className='border border-gray-300 rounded py-1.5 px-3.5 w-full' />
      </div>


      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>
        <div className='mt-12'>
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <h3>** Currently orders on Cash on Delivery</h3>
          {/* Payment Method Selecrion */} 
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=> setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor pointer'>
              <p className={`min-w-3.5 h-3.5 border-black rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={()=> setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor pointer'>
              <p className={`min-w-3.5 h-3.5 border-black rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={()=> setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor pointer'>
              <p className={`min-w-3.5 h-3.5 border-black rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>Cash on Delivery</p>
            </div>
          </div>
          <div className='w-full text-end mt-8'>
            <button type='submit' className='bg-black text-white px-16 py-3 text-sm rounded-full'>Place order</button>
          </div>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder