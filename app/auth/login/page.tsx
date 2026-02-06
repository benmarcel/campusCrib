import LoginForm from "../../ui/components/LoginForm";
import Link from "next/link";
import { Suspense } from "react";
export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-4">
      {/* Container for Form */}
      <div className="w-full max-w-md flex flex-col items-center">
        <Suspense fallback={<div className="text-gray-500 ">Loading...</div>}>
          <LoginForm />
        </Suspense>

        <p className="mt-8 text-gray-500 text-sm">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-[#001F3F] font-bold hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}