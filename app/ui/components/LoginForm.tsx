'use client';

import { useActionState, useState } from 'react';
import { authenticate } from '@/lib/actions';
import { useSearchParams } from 'next/navigation';
import { Eye, EyeClosed } from 'lucide-react';
import Alert from './Alert';
export default function LoginForm() {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get('callbackUrl')
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);
  const [showPassword, setShowPassword] = useState(false);

  const inputStyle = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#001F3F] transition-all placeholder:text-gray-400 text-gray-700";
  const labelStyle = "block text-sm font-semibold text-blue-950 mb-1 ml-1";

  return (
    <form action={formAction} className="w-full max-w-md bg-secondary p-8 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-center text-primary mb-8 uppercase tracking-tight">Login</h2>
      {/* hidden input to get callback url */}
      <input type="hidden" name="callbackUrl" value={callBackUrl ?? ''} />
      <div className="space-y-4">
        {/* Email Field */}
        <div className="flex flex-col">
          <label className={labelStyle} htmlFor="email">Email</label>
          <input 
            name="email" 
            id="email" 
            type="email" 
            placeholder="johndoe@example.com" 
            className={inputStyle} 
            required 
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col relative">
          <label className={labelStyle} htmlFor="password">Password</label>
          <input 
            name="password" 
            id="password" 
            type={showPassword ? "text" : "password"}
            placeholder="••••••" 
            className={inputStyle} 
            required 
          />
           {/* Toggle Password Visibility */}
      <div className="">
        {showPassword ? (
          <Eye size={20} className="absolute right-3 top-[70%] -translate-y-1/2 text-gray-400 cursor-pointer" onClick={() => setShowPassword(false)} />
        ) : (
          <EyeClosed size={20} className="absolute right-3 top-[70%] -translate-y-1/2 text-gray-400 cursor-pointer" onClick={() => setShowPassword(true)} />
        )}
      </div>
        </div>
      </div>
     
      <button 
        disabled={isPending} 
        className="w-full bg-primary text-white py-4 rounded-xl mt-8 font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all disabled:opacity-50"
      >
        {isPending ? 'Authenticating...' : 'Login'}
      </button>

      {errorMessage && (
        <Alert variant="error" message={errorMessage} />
      )}
    </form>
  );
}