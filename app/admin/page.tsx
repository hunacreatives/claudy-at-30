"use client";

import { useState } from "react";

type RSVP = {
  id: string;
  name: string;
  email: string;
  message: string | null;
  created_at: string;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState(false);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [selectedRsvp, setSelectedRsvp] = useState<RSVP | null>(null);

  // Validate by asking the server (which checks the password and uses the
  // service-role key). No data is reachable without the correct password.
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const res = await fetch("/api/admin/rsvps", {
      headers: { "x-admin-password": password },
    });
    if (res.ok) {
      const { rsvps } = await res.json();
      setRsvps(rsvps ?? []);
      setAuthed(true);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const deleteRsvp = async (id: string) => {
    setDeleting(true);
    const res = await fetch(`/api/admin/rsvps?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
      headers: { "x-admin-password": password },
    });
    if (res.ok) {
      setRsvps((prev) => prev.filter((r) => r.id !== id));
    }
    setConfirmId(null);
    setDeleting(false);
  };

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
              {rsvps.length} {rsvps.length === 1 ? "response" : "responses"}
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
                  <th className="text-left px-5 py-3 font-semibold">Message</th>
                  <th className="text-left px-5 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3"></th>
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
                    <td className="px-5 py-3 text-[#555] italic max-w-xs truncate">
                      {r.message ? (
                        <button
                          onClick={() => setSelectedRsvp(r)}
                          className="hover:text-[#3d5a2a] hover:underline cursor-pointer text-left"
                        >
                          {r.message}
                        </button>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-5 py-3 text-[#999] whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {confirmId === r.id ? (
                        <span className="inline-flex gap-1">
                          <button
                            onClick={() => deleteRsvp(r.id)}
                            disabled={deleting}
                            className="text-xs bg-red-500 text-white px-2 py-1 rounded cursor-pointer hover:bg-red-600 disabled:opacity-50 transition-colors"
                          >
                            {deleting ? "…" : "Confirm"}
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="text-xs border border-gray-200 text-gray-400 px-2 py-1 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </span>
                      ) : (
                        <button
                          onClick={() => setConfirmId(r.id)}
                          className="text-xs text-red-400 hover:text-red-600 cursor-pointer transition-colors"
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedRsvp && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50"
          onClick={() => setSelectedRsvp(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 shadow-md w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="font-display font-bold text-[#3d5a2a] text-xl">
                  {selectedRsvp.name}
                </p>
                <p className="text-[#7b9a6a] text-sm">{selectedRsvp.email}</p>
              </div>
              <button
                onClick={() => setSelectedRsvp(null)}
                className="text-[#999] hover:text-[#3d5a2a] cursor-pointer text-xl leading-none"
              >
                ×
              </button>
            </div>
            <p className="text-[#555] whitespace-pre-wrap">{selectedRsvp.message}</p>
            <p className="text-[#999] text-xs mt-4">
              {new Date(selectedRsvp.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
