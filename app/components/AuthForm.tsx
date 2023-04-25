'use client'
import React, { FormEvent, useRef } from 'react'

type Props = {}

export default function AuthForm({}: Props) {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);


    async function submitHandler(event: FormEvent) {
    event.preventDefault();


    
    const enteredEmail = emailInputRef.current?.value
    const enteredPassword = passwordInputRef.current?.value;

    // optional: Add validation here

    // if (isLogin) {
        // await signIn('credentials', {
        // redirect: '/',
        // email: enteredEmail,
        // password: enteredPassword,
        // });

    // } else {
    //     try {
    //     const result = await createUser(enteredEmail, enteredPassword);
    //     setRegistered(true)
    //     } catch (error) {
    //     console.log(error);
    //     }
    
    }
  return (
    <div className='flex justify-center'>
        <form onSubmit={submitHandler} className='mt-6 w-80 flex flex-col gap-4'>
            <div className='flex flex-row justify-between'>
              <label className='text-pink-500' htmlFor='email'>Your Email</label>
              <input className=' text-slate-800 ' type='email' id='email' required ref={emailInputRef} />
            </div>
            <div className='flex flex-row justify-between'>
              <label className='text-pink-500' htmlFor='password'>Your Password</label>
              <input
                className='text-slate-800 '
                type='password'
                id='password'
                required
                ref={passwordInputRef}
              />
            </div>
            <div className='my-5'>
              {/* <button className='button button-color mr-4'>{isLogin ? 'Login' : 'Create Account'}</button>
              <button
                type='button'

                onClick={switchAuthModeHandler}>
                {isLogin ? 'No Account? Create One' : 'Already a user? Login'}
              </button> */}
              <button className='bg-slate-700 text-pink-500 shadow-black shadow-md rounded-md w-60 h-8 hover:font-bold hover:shadow-none hover:underline transition-all ease-linear duration-200'>Login</button>
            </div>
          </form>
    </div>
  )
}