import Image from "next/image";
import { User2, Pencil, Phone, School, MapPin, BadgeCheck } from "lucide-react";
import type { Profile as ProfileProps } from "@/lib/definitions";

export function Profile({ profile }: { profile: ProfileProps }) {
  const fullName = profile.full_name ?? "";

  return (
    <div className="flex flex-col items-center text-center gap-6">
      {/* Avatar */}
      <div className="relative">
        {profile.avatar_url ? (
          <Image
            src={profile.avatar_url}
            alt="Avatar"
            width={120}
            height={120}
            className="rounded-full border-2 border-primary"
          />
        ) : (
          <div className="flex items-center justify-center w-32 h-32 rounded-full border-2 border-primary bg-gray-100">
            <User2 className="w-14 h-14 text-gray-400" />
          </div>
        )}

        <button className="absolute bottom-1 right-1 flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white shadow">
          <Pencil size={16} />
        </button>
      </div>

      {/* Name & email */}
      <div>
        <h1 className="text-2xl font-semibold">{fullName}</h1>
        <p className="text-gray-500">{profile.email}</p>
      </div>

      {/* Extra info card */}
      <div className="w-full max-w-md bg-white rounded-xl border shadow-sm p-5 space-y-4 text-left">
        <InfoRow
          icon={<Phone size={18} />}
          label="Phone number"
          value={profile.phone_number || "Not provided"}
        />

        <InfoRow
          icon={<School size={18} />}
          label="School"
          value={profile.school || "Not provided"}
        />

        <InfoRow
          icon={<MapPin size={18} />}
          label="Address"
          value={profile.address || "Not provided"}
        />

        <InfoRow
          icon={<BadgeCheck size={18} />}
          label="Verification"
          value={profile.is_verified ? "Verified" : "Not verified"}
          highlight={profile.is_verified}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition">
          Logout
        </button>

        <button className="px-6 py-2 rounded-full bg-primary text-white hover:opacity-90 transition">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

/* Small reusable row */
function InfoRow({
  icon,
  label,
  value,
  highlight,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-primary mt-0.5">{icon}</div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <p
          className={`font-medium ${
            highlight ? "text-green-600" : "text-gray-900"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
