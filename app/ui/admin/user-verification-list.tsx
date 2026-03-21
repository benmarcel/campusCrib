import { getAllUsersForVerification } from "@/lib/data";
import VerifyUserButton from "./verify-user";
import type { User } from "@/lib/definitions";

export default async function UserVerificationList() {
  const users = await getAllUsersForVerification();

  if (users.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-slate-400 font-medium">All users are verified!</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-50">
      {users.map((user: User) => (
        <div key={user.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold uppercase">
              {user.full_name?.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-slate-900">{user.full_name}</p>
              <p className="text-sm text-slate-500">{user.phone_number}</p>
            </div>
          </div>
          <VerifyUserButton userId={user.id} />
        </div>
      ))}
    </div>
  );
}