import LoginForm from "@/app/ui/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-4">
      {/* Container for Form */}
      <div className="w-full max-w-md flex flex-col items-center">
        

        <LoginForm />
        
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