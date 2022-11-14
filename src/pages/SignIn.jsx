import React from 'react'
import { useState } from 'react'
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"
import { Link } from 'react-router-dom';
import OAuth from "../components/OAuth";
import {signInWithEmailAndPassword, getAuth} from "firebase/auth"
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';


export default function SignIn() {

  const navigate=useNavigate();
  async function onSubmit(e)
  {
    e.preventDefault()
    try {
      const auth=getAuth()
      const userCredential = await signInWithEmailAndPassword(auth,email,password)

      if (userCredential.user)
      {
        navigate("/")
        toast.success("Login success")
      }

    } 
    catch (error) {
     toast.error("Incorrect user credentials") 
    }
  }

  const [showPassword,setShowPassword]=useState(false);
  const [formData, setFormDate]=useState(
    {
      email:"",
      password:"",
    }
  ); 
  const { email, password } =formData

  function onChange(e){
    setFormDate((prevState)=>
   ({
    ...prevState,
    [e.target.id]:e.target.value
       

    }));
  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign In</h1>
      {/* wrap for all content */}
      <div className='flex justify-center flex-wrap items-center px-6 py-12
      max-w-6xl mx-auto'>
        {/* wrap for image */}
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://media.istockphoto.com/id/513633368/nl/foto/close-up-of-a-golden-key-and-metal-puzzle.jpg?s=612x612&w=0&k=20&c=KbDQFgdJcHwnXljj6XmfrXOeZEFO1Si-JTLCZWcjrzs=" alt="key" 
          className='w-full rounded-2xl '/>
        </div>
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form onSubmit={onSubmit}>
            <input id='email' value={email} type="email" className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-xl transition ease-in-out ' onChange={onChange} placeholder="Email Address"/>
            
            <div className='relative mb-6'>
            <input id='password' value={password} type={showPassword ? "text" : "password"} className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-xl transition ease-in-out mt-3' onChange={onChange} placeholder="Password"/>
            {showPassword ? (<AiFillEyeInvisible className='absolute right-3 top-5 text-xl cursor-pointer' onClick={()=>setShowPassword((prevState)=> !prevState)}/>):(<AiFillEye 
            className='absolute right-3 top-5 text-xl cursor-pointer' onClick={() => setShowPassword((prevState) => !prevState)} />)}
            </div>
            {/* forgotpass and  */}
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6 '>Don't have an account ?
              <Link to="/sign-up" className='text-red-500 hover:text-red-700 transition duration-200 ease-in-out ml-1 '>Register</Link>
              </p>
              <p>
              <Link to="/forgot-password"  className='text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out ml-1' >Forgot password</Link>  
              </p>
              <p></p>


            </div>
            <button className='w-full h-8 text-white bg-blue-500 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200  ease-in-out hover:shadow-lg active:bg-blue-800'
          type='submit'>Sign In</button>
          <div className='my-4 flex items-center before:flex-1 before:border-gray-300 before:border-t after:flex-1 after:border-gray-300 after:border-t'>
            <p className='text-center font-semibold mx-4'>OR</p>
          </div>
          <OAuth/>
          </form>

        </div>
      </div>
    </section>
    
  )
}
