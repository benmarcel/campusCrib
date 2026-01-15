'use client';

import { useActionState } from 'react';
import { authenticate } from '@/lib/actions';
import { useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get('callbackUrl')
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

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
        <div className="flex flex-col">
          <label className={labelStyle} htmlFor="password">Password</label>
          <input 
            name="password" 
            id="password" 
            type="password" 
            placeholder="••••••" 
            className={inputStyle} 
            required 
          />
        </div>
      </div>

      <button 
        disabled={isPending} 
        className="w-full bg-primary text-white py-4 rounded-xl mt-8 font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all disabled:opacity-50"
      >
        {isPending ? 'Authenticating...' : 'Login'}
      </button>

      {errorMessage && (
        <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-100">
          <p className="text-sm text-red-600 text-center font-medium">{errorMessage}</p>
        </div>
      )}
    </form>
  );
}