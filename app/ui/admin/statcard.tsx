
import {ReactNode} from "react";


export function StatCard({ title, value, icon, color }: { title: string, value: number | string, icon: ReactNode, color: string }) {
  const colors: Record<string, string> = {
    indigo: "bg-indigo-50 text-indigo-600",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-green-50 text-green-600",
  };
  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
      <div className={`p-3 rounded-2xl ${colors[color]}`}>
        {icon ? (icon) : "?"}
      </div>
      <div>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{title}</p>
        <p className="text-2xl font-black text-slate-900">{value}</p>
      </div>
    </div>
  );
}


