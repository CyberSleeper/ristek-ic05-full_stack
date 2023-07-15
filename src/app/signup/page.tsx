"use client";

import { useForm } from 'react-hook-form'
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'

type FormData = {
  email: string;
  password: string;
  confirm_password: string;
};

export default function Home() {
  const { register, handleSubmit, formState: { errors }, reset, watch, setError } = useForm<FormData>();
  const router = useRouter()
  const onSubmit = ((data: FormData, e: any) => {
    e.preventDefault();
    axios.post("http://localhost:8080/auth/register", {
      email: data.email,
      password: data.password
    }).then(res => {
      console.log("Signing in", res);
      alert('Sign in successful')
      router.push('/home');
    }).catch(err => {
      console.log(err);
      setError("email", {
        type: "manual",
        message: "email already in use"
      })
    })
    reset();
  });
  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      <div className="bg-black w-1/2 max-w-5xl h-fit m-auto text-center rounded-xl px-5 py-7">
        <p className='mb-3 text-3xl font-semibold'>
          Join Chatter Today
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='relative z-0 w-full mb-6 group text-left'>
            <input className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 ${ errors.email ? `focus:border-red-600 peer dark:focus:border-red-500` : `focus:border-blue-600 peer dark:focus:border-blue-500` }`}
              placeholder=" "
              id="email"
              {...register("email", {
                required: "required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format"
                }
              })}
              type="email"
            />
            <label htmlFor="email" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${ errors.email ? `peer-focus:text-red-600 peer-focus:dark:text-red-500` : `peer-focus:text-blue-600 peer-focus:dark:text-blue-500` } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
              email
            </label>
            {errors.email && <span role="alert" className='text-sm text-red-500'>{errors.email.message}</span>}
          </div>
          <div className='relative z-0 w-full mb-6 group text-left'>
            <input className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 ${ errors.password ? `focus:border-red-600 peer dark:focus:border-red-500` : `focus:border-blue-600 peer dark:focus:border-blue-500` }`}
              placeholder=" "
              id="password"
              {...register("password", {
                required: "required",
                minLength: {
                  value: 6,
                  message: "min length is 6"
                }
              })}
              type="password"
            />
            <label htmlFor="password" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${ errors.password ? `peer-focus:text-red-600 peer-focus:dark:text-red-500` : `peer-focus:text-blue-600 peer-focus:dark:text-blue-500` } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
              password
            </label>
            {errors.password && <span role="alert" className='text-sm text-red-500'>{errors.password.message}</span>}
          </div>
          <div className='relative z-0 w-full mb-6 group text-left'>
            <input className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 ${ errors.confirm_password ? `focus:border-red-600 peer dark:focus:border-red-500` : `focus:border-blue-600 peer dark:focus:border-blue-500` }`}
              placeholder=" "
              id="confirm_password"
              {...register("confirm_password", {
                required: "required",
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return "your password do not match";
                  }
                }
              })}
              type="password"
            />
            <label htmlFor="confirm_password" className={`peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 ${ errors.confirm_password ? `peer-focus:text-red-600 peer-focus:dark:text-red-500` : `peer-focus:text-blue-600 peer-focus:dark:text-blue-500` } peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6`}>
              confirm password
            </label>
            {errors.confirm_password && <span role="alert" className='text-sm text-red-500'>{errors.confirm_password.message}</span>}
          </div>
          <button type="submit" className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded-full mb-4">SIGN UP</button>
        </form>
        <p className={`m-0 text-sm text-gray-600`}>
          Have an account already? <Link href="/login" className='text-blue-400 hover:underline'>Log in</Link>
        </p>
      </div>
    </main>
  )
}
