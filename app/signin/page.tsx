'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
export default function SignIn(){
const [email,setEmail]=useState('admin@example.com');
const [password,setPassword]=useState('admin123');
return (
<main className="min-h-screen grid place-items-center p-6">
<form onSubmit={e=>{e.preventDefault();signIn('credentials',{email,password,callbackUrl:'/admin'});}} className="bg-white p-6 rounded-xl shadow w-full max-w-md space-y-3">
<h1 className="text-xl font-semibold">Sign in</h1>
<input className="w-full border rounded p-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
<input className="w-full border rounded p-2" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password"/>
<button className="w-full bg-black text-white rounded p-2">Sign in</button>
</form>
</main>
);
}