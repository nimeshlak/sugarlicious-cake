import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const {token, setToken,navigate,} = useContext(ShopContext)

  const [name, setName] = useState('');
  const [password, setPassword]= useState('')
  const [email, setEmail] = useState('')


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if(currentState === "Sign Up"){
        const response = await axios.post('http://localhost:4000/api/user/register', {name, email, password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }else{
          toast.error(response.data.message)
        }

      }else{
        const response = await axios.post('http://localhost:4000/api/user/login', {email,password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }else{
          toast.error(response.data.message)
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      {currentState === 'Login' ? '' : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='w-full px-6 py-2 border border-gray-800 rounded-full' placeholder='Name' required/>}
      <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-6 py-2 border border-gray-800 rounded-full' placeholder='Email' required/>
      <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className='w-full px-6 py-2 border border-gray-800 rounded-full' placeholder='Password' required/>
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {currentState === 'Sign Up' ? '': <p className='cursor-pointer px-3 text-[#640D5F] hover:text-[#EE66A6] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EE66A6]' >Forgot Password ? </p>}
        {
          currentState === 'Login'
          ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer px-3 text-[#640D5F] hover:text-[#EE66A6] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EE66A6]'>Create Account</p>
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer px-3 text-[#640D5F] hover:text-[#EE66A6] font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#EE66A6]'>Login Here</p>
        }
      </div>
      <button onClick={onSubmitHandler} className='bg-black text-white font-light px-8 py-2 mt-4 rounded-full'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login