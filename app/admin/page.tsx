"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type RSVP = {
  id: string;
  name: string;
  email: string;
  plus_ones: number;
  message: string | null;
  created_at: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    supabase
      .from("claudy_rsvps")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setRsvps(data ?? []);
        setLoading(false);
      });
  }, [authed]);

  const totalGuests = rsvps.reduce((sum, r) => sum + 1 + r.plus_ones, 0);

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#f5efe0] flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl p-10 shadow-md w-full max-w-xs text-center"
        >
          <p className="font-display font-bold text-[#3d5a2a] text-2xl mb-6">Admin Access</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-[#d4c5a9] rounded-lg px-4 py-2.5 text-sm text-[#3d5a2a] outline-none focus:border-[#7b9a6a] mb-3"
          />
          {error && <p className="text-red-500 text-xs mb-3">Incorrect password</p>}
          <button
            type="submit"
            className="w-full bg-[#3d5a2a] text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-[#2e4520] transition-colors cursor-pointer"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5efe0] px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="font-display font-bold text-[#3d5a2a] text-3xl">
              Claudy&apos;s 30th — RSVPs
            </h1>
            <p className="text-[#7b9a6a] text-sm mt-1">
              {rsvps.length} responses · {totalGuests} total guests
            </p>
          </div>
          <button
            onClick={() => location.reload()}
            className="text-sm text-[#7b9a6a] hover:text-[#3d5a2a] underline cursor-pointer"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-[#7b9a6a]">Loading...</p>
        ) : rsvps.length === 0 ? (
          <p className="text-[#7b9a6a]">No RSVPs yet.</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#3d5a2a] text-white">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold">Name</th>
                  <th className="text-left px-5 py-3 font-semibold">Email</th>
                  <th className="text-center px-4 py-3 font-semibold">+Guests</th>
                  <th className="text-left px-5 py-3 font-semibold">Message</th>
                  <th className="text-left px-5 py-3 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {rsvps.map((r, i) => (
                  <tr
                    key={r.id}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#f5efe0]/60"}
                  >
                    <td className="px-5 py-3 font-medium text-[#3d5a2a]">{r.name}</td>
                    <td className="px-5 py-3 text-[#555]">{r.email}</td>
                    <td className="px-4 py-3 text-center text-[#555]">{r.plus_ones}</td>
                    <td className="px-5 py-3 text-[#555] italic max-w-xs truncate">
                      {r.message || "—"}
                    </td>
                    <td className="px-5 py-3 text-[#999] whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
