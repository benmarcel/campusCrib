// app/ui/signup-form.tsx
'use client';

import { useActionState } from 'react';
import { register } from '@/lib/actions';

export default function RegisterForm() {
  const [errorMessage, formAction, isPending] = useActionState(register, undefined);

  const inputStyle = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all placeholder:text-gray-400 text-gray-700";
  const labelStyle = "block text-sm font-semibold text-blue-950 mb-1 ml-1";

  return (
    <form action={formAction} className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <h2 className="text-3xl font-bold text-center text-primary mb-8 uppercase tracking-tight">Signup</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
        {/* Name Field */}
        <div className="flex flex-col">
          <label className={labelStyle} htmlFor="full_name">Name</label>
          <input name="full_name" id="full_name" placeholder="John Doe" className={inputStyle} required />
        </div>

        {/* Email Field */}
        <div className="flex flex-col">
          <label className={labelStyle} htmlFor="email">Email</label>
          <input name="email" id="email" type="email" placeholder="johndoe@example.com" className={inputStyle} required />
        </div>

        {/* School Field */}
        <div className="flex flex-col">
          <label className={labelStyle} htmlFor="school">School/Location</label>
          <input name="school" id="school" placeholder="DELSU Abraka" className={inputStyle} />
        </div>

        {/* Password Field */}
        <div className="flex flex-col">
          <label className={labelStyle} htmlFor="password">Password</label>
          <input name="password" id="password" type="password" placeholder="••••••" className={inputStyle} required />
        </div>
        {/* Phone Number Field */}
        <div className="flex flex-col">
          <label className={labelStyle} htmlFor="phone_number">Phone Number</label>
          <input name="phone_number" id="phone_number" type="tel" placeholder="+1234567890" className={inputStyle} />
        </div>

        {/* Role Field */}
        <div className="flex flex-col">
          <label className={labelStyle} htmlFor="role">Role</label>
          <select name="role" id="role" className={inputStyle} required>
            <option value="" defaultValue={"student"}>Select your role</option>
            <option value="student">Student</option>
            <option value="landlord">Landlord</option>
            <option value="agent">Agent</option>
          </select>
        </div>

        {/* Address Field */}
        <div className="flex flex-col md:col-span-2">
          <label className={labelStyle} htmlFor="address">Address</label>
          <input name="address" id="address" placeholder="123 Main St, City, Country" className={inputStyle} />
        </div>
      </div>

      <button 
        disabled={isPending} 
        className="w-full bg-primary text-white py-4 rounded-xl mt-8 font-bold uppercase tracking-widest hover:bg-blue-950 transition-colors disabled:opacity-50"
      >
        {isPending ? 'Processing...' : 'Submit'}
      </button>

      {errorMessage && (
        <p className="mt-4 text-sm text-red-500 text-center bg-red-50 p-2 rounded-md">
          {errorMessage}
        </p>
      )}
    </form>
  );
}