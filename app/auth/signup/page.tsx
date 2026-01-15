import RegisterForm from "@/app/ui/signup-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4">
      <div className="w-full max-w-2xl">
        {/* You can add your Logo here as seen in Figma */}
        <RegisterForm />
        
        <p className="text-center mt-6 text-gray-600">
          Already have an account? <Link href="/auth/login" className="text-blue-900 font-bold">Login</Link>
        </p>
      </div>
    </main>
  );
}