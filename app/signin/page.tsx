import React from 'react'
import AuthForm from '../components/AuthForm'

type Props = {}

export default function signin({}: Props) {
  return (
    <div className='mt-12'>
        <h1 className='font-bold text-3xl text-pink-600'>Sign in or sign up</h1>
        <AuthForm/>
    </div>
  )
}