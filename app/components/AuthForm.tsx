'use client'
import { SignInResponse, signIn } from 'next-auth/react';
import React, { FormEvent, useRef } from 'react'

type Props = {}

async function createUser(name:string, password:string, email:string) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, password, email }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

export default function AuthForm({}: Props) {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const usernameInputRef = useRef<HTMLInputElement>(null);

    const [registered, setRegistered] = React.useState(false);
    const [loginMode, setLoginMode] = React.useState(false);
    const [loginError, setLoginError] = React.useState(false);
    const [regError, setRegError] = React.useState('');

    function toggleRegistered() {
      setLoginMode(true)
      setRegistered(false)
    }


    async function submitHandler(event: FormEvent) {
      event.preventDefault();

      const enteredEmail = emailInputRef.current?.value || ""
      const enteredPassword = passwordInputRef.current?.value || "";
      const enteredUsername = usernameInputRef.current?.value || "";

      // optional: Add validation here

     if (loginMode) {
      //  try {
        const signinResult = await signIn('credentials', {
          callbackUrl: '/',
          name: enteredUsername,
          password: enteredPassword,
          redirect:false
          });

          if (signinResult?.ok) {
            // window.location.href = signinResult.url || '/'

          }

        if (!signinResult) {
          setLoginError(true)
          return
        }

        if (signinResult.error) {
          console.log(signinResult.error)
          setLoginError(true)
        } else {
          window.location.href = signinResult.url || '/'
        }
        
        //  } catch(err) {
          //  console.error(err)
        // }
     } else {
        try {
         const result = await createUser(enteredUsername, enteredPassword, enteredEmail);
         setRegistered(true)
        } catch (error:any) {
         console.log(error);
         setRegError(error.message)
        }
      }
    }
  return (
    <div className='flex justify-center'>
      {!registered ? (
        <form onSubmit={submitHandler} className='mt-6 w-80 flex flex-col gap-4'>
            <div className='flex flex-row justify-between'>
              <label className='text-pink-500' htmlFor='username'>Your Username</label>
              <input className='text-slate-800 ' type='text' id='username' required ref={usernameInputRef} />
            </div>
            {!loginMode &&
            <div className='flex flex-row justify-between'>
              <label className='text-pink-500' htmlFor='email'>Your Email</label>
              <input className=' text-slate-800 ' type='email' id='email' required ref={emailInputRef} />
            </div>
            }
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
              <button className='bg-slate-700 text-pink-500 border border-black shadow-black shadow-md rounded-md w-60 h-8 hover:border-none hover:font-bold hover:shadow-none hover:underline transition-all ease-linear duration-200'>
                {loginMode ? 'Login' : 'Create Account'}</button>
            </div>
            {loginError && <div className='text-red-500'>Login failed, please check username and password</div>}
            {!loginMode && <div>
              <p>Already have an account?</p>
              <button className='bg-slate-700 text-pink-500 border border-black shadow-black shadow-md rounded-md w-60 h-8 hover:border-none hover:font-bold hover:shadow-none hover:underline transition-all ease-linear duration-200'
                onClick={() => setLoginMode(true)}
              >Login here</button>
            </div>
            }
            {regError && <div className='text-red-500'>{regError}</div>}
          </form>
          ): (
            <div>
              <h1 className='p-6'>Account Created</h1>
              <button className='bg-slate-700 text-pink-500 border border-black shadow-black shadow-md rounded-md w-60 h-8 hover:border-none hover:font-bold hover:shadow-none hover:underline transition-all ease-linear duration-200'
              onClick={() => toggleRegistered()}>
                Login now
              </button>
            </div>
          )}
    </div>
  )
 }