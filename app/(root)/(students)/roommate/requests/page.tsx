// import { connection } from "next/server";
import { getLoggedinUser } from "@/lib/data";
import { Suspense } from "react";
import Link from "next/link";
import { getIncomingRequests, getOutgoingRequests } from "@/lib/data";
import { Users, ArrowLeft, Inbox, Send } from "lucide-react";
import IncomingRequestCard from "@/app/ui/roommate/IncomingRequestCard";
import OutgoingRequestCard from "@/app/ui/roommate/OutgoingRequestCard";

export default async function RequestsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
//   await connection();

  const user = await getLoggedinUser();
  if (!user) return;

  const params = await searchParams;
  const activeTab = params.tab ?? "incoming";

  const [incoming, outgoing] = await Promise.all([
    getIncomingRequests(user.id),
    getOutgoingRequests(user.id),
  ]);
  console.log("incoming", incoming);
  console.log("outgoing", outgoing);
  console.log("userid", user.id)

  const pendingIncoming = incoming.filter((r) => r.status === "pending");

  return (
    <Suspense
      fallback={
        <div className="py-24 flex items-center justify-center">
          <span className="text-sm text-slate-500">Loading...</span>
        </div>
      }
    >
      <section className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {/* Back */}
          <Link
            href="/roommate"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 font-medium mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to board
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-accent font-semibold text-sm uppercase tracking-wider mb-2">
              <Users size={16} />
              <span>Find Roomie</span>
            </div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Requests
            </h1>
            <p className="text-slate-500 mt-1">
              Manage your incoming and outgoing connect requests.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-slate-200 mb-8">
            <Link
              href="/roommate/requests?tab=incoming"
              className={`pb-4 text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "incoming"
                  ? "border-b-2 border-accent text-accent"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Inbox size={14} />
              Incoming
              {pendingIncoming.length > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white text-xs font-black">
                  {pendingIncoming.length}
                </span>
              )}
            </Link>
            <Link
              href="/roommate/requests?tab=outgoing"
              className={`pb-4 text-sm font-bold transition-all flex items-center gap-2 ${
                activeTab === "outgoing"
                  ? "border-b-2 border-accent text-accent"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Send size={14} />
              Outgoing
              <span className="text-xs text-slate-400 font-normal">
                ({outgoing.length})
              </span>
            </Link>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-4">
            {activeTab === "incoming" ? (
              incoming.length === 0 ? (
                <EmptyState
                  message="No incoming requests yet."
                  sub="When students send you a connect request, they'll appear here."
                />
              ) : (
                incoming.map((request) => (
                  <IncomingRequestCard key={request.id} request={request} />
                ))
              )
            ) : outgoing.length === 0 ? (
              <EmptyState
                message="No outgoing requests yet."
                sub="Connect with students on the roommate board to get started."
              />
            ) : (
              outgoing.map((request) => (
                <OutgoingRequestCard key={request.id} request={request} />
              ))
            )}
          </div>
        </div>
      </section>
    </Suspense>
  );
}

function EmptyState({ message, sub }: { message: string; sub: string }) {
  return (
    <div className="py-16 flex flex-col items-center gap-3 text-center">
      <div className="h-14 w-14 bg-slate-100 rounded-full flex items-center justify-center">
        <Users size={24} className="text-slate-300" />
      </div>
      <p className="font-bold text-slate-600">{message}</p>
      <p className="text-sm text-slate-400 max-w-xs">{sub}</p>
    </div>
  );
}
