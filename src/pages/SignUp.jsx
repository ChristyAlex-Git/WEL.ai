import React from 'react'
import { useState } from 'react'
import {AiFillEyeInvisible, AiFillEye} from "react-icons/ai"
import { Link } from 'react-router-dom';
import OAuth from "../components/OAuth";
import {getAuth,createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {db} from "../firebase"
import { serverTimestamp, setDoc ,doc} from 'firebase/firestore';
import {useNavigate } from "react-router-dom"


export default function SignUp() {
  

  //password validation
  // const [disableSubmit,changeDisableSubmit]=useState(false)

  // function password_validation(e)
  // {
  //   if (password1 != password2)
  //   {
         //you could just assign two variables disables and nondisabled containg whole of the submit button changingn on condition
  //     console.log(password1)
  //     console.log(password2)
  //     console.log("Passwords doesn't match")
  //     changeDisableSubmit=true

  //}
  //   }

  const [showPassword1,setShowPassword1]=useState(false);
  const [showPassword2,setShowPassword2]=useState(false);
  const [formData, setFormDate]=useState(
    {
      email:"",
      password1:"",
      password2:"",
      name:""
    }
  ); 

  const navig=useNavigate()
  const { email, password1,password2,name } =formData

  function onChange(e){
    setFormDate((prevState)=>
   ({
    ...prevState,
    [e.target.id]:e.target.value
       

    }));
  }
  async function onSubmit(e)
  {
    //to remove the reload bahaviou of the logup page
    e.preventDefault()
    
    //
    try {
      const auth=getAuth()
      const userCredentials=await createUserWithEmailAndPassword(auth,email,password1);
      const user=userCredentials.user
      console.log(user)
      updateProfile(auth.currentUser,{
        displayName:name
      })
      const formDataCopy={...formData}
      delete formDataCopy.password1
      delete formDataCopy.password2
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "All Users", user.uid),formDataCopy)
      console.log("Navigating to the home now")
      useNavigate("/")


    } catch (error) {
      
      console.log(error);

    }


  }

  return (
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Sign Up</h1>
      {/* wrap for all content */}
      <div className='flex justify-center flex-wrap items-center px-6 py-12
      max-w-6xl mx-auto'>
        {/* wrap for image */}
        <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
          <img src="https://media.istockphoto.com/id/513633368/nl/foto/close-up-of-a-golden-key-and-metal-puzzle.jpg?s=612x612&w=0&k=20&c=KbDQFgdJcHwnXljj6XmfrXOeZEFO1Si-JTLCZWcjrzs=" alt="key" 
          className='w-full rounded-2xl '/>
        </div>
        {/* wrap for the form */}
        <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-20'>
          <form >
            {/*1) user name */}
            <input id='name' value={name} type="name" className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-xl transition ease-in-out mt-3 ' onChange={onChange} placeholder="Full Name"/>
           
            <div className='relative mb-2'>

            {/*2) password */}
            {/* change the toggle between text and password to show  anf hide the password */}
            <input id='password1' value={password1} type={showPassword1 ? "text" : "password"} className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-xl transition ease-in-out mt-3' onChange={onChange} placeholder="Password"/>            
            {showPassword1 ? (<AiFillEyeInvisible className='absolute right-3 top-6 text-xl cursor-pointer' onClick={()=>setShowPassword1((prevState)=> !prevState)}/>):(<AiFillEye 
            className='absolute right-3 top-6 text-xl cursor-pointer' onClick={() => setShowPassword1((prevState) => !prevState)} />)}
            </div>

            <div className='relative mb-2 pt-0'>
            {/*3) confirm password */}
            <input id='password2' value={password2} type={showPassword2 ? "text" : "password"} className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-xl transition ease-in-out mt-3' onChange={onChange} placeholder="Confirm Password"/>           
            {showPassword2 ? (<AiFillEyeInvisible className='absolute right-3 top-7 text-xl cursor-pointer' onClick={()=>setShowPassword2((prevState)=> !prevState)}/>):(<AiFillEye 
            className='absolute right-3 top-7 text-xl cursor-pointer' onClick={() => setShowPassword2((prevState) => !prevState)} />)}
            
            {/*4) email */}
            <input id='email' value={email} type="email" className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded-xl transition ease-in-out mt-3' onChange={onChange} placeholder="Email Address"/>
            </div>
            {/* forgotpass and  Sign In*/}
            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
              <p className='mb-6 '>Have an account ?
              <Link to="/sign-up" className='text-red-500 hover:text-red-700 transition duration-200 ease-in-out ml-1 '>Sign In</Link>
              </p>
            </div>

            {/* signup btton */}
            <button className='w-full h-8 text-white bg-blue-500 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200  ease-in-out hover:shadow-lg active:bg-blue-800'
          type='submit' onClick={onSubmit}>Sign Up</button>
          <div className='my-4 flex items-center before:flex-1 before:border-gray-300 before:border-t after:flex-1 after:border-gray-300 after:border-t'>
            <p className='text-center font-semibold mx-4'>OR</p>
          </div>
          {/* bttton for the google login */}
          <OAuth/>
          </form>

        </div>
      </div>
    </section>
    
  )
}
