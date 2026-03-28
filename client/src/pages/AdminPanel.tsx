import { useState } from "react";
import { useLocation } from "wouter";
import { Mail, CheckCircle2, XCircle, FileText, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CVSubmission {
  id: string;
  recruiterName: string;
  recruiterEmail: string;
  plan: "DEMO" | "PRO";
  cvCount: number;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
  results?: {
    shortlist: number;
    rejected: number;
    reasons: string[];
  };
}

export default function AdminPanel() {
  const [, setLocation] = useLocation();
  const [submissions, setSubmissions] = useState<CVSubmission[]>([
    {
      id: "1",
      recruiterName: "Juan García",
      recruiterEmail: "juan@empresa.com",
      plan: "PRO",
      cvCount: 15,
      submittedAt: "2026-03-26T10:30:00",
      status: "pending",
    },
    {
      id: "2",
      recruiterName: "María López",
      recruiterEmail: "maria@empresa.com",
      plan: "DEMO",
      cvCount: 3,
      submittedAt: "2026-03-26T09:15:00",
      status: "approved",
      results: {
        shortlist: 2,
        rejected: 1,
        reasons: ["Falta experiencia en Python", "No cumple requisitos ATS"],
      },
    },
  ]);

  const [selectedSubmission, setSelectedSubmission] = useState<CVSubmission | null>(null);
  const [emailMessage, setEmailMessage] = useState("");

  const handleApprove = (id: string) => {
    setSubmissions(
      submissions.map((s) =>
        s.id === id
          ? {
              ...s,
              status: "approved",
              results: {
                shortlist: Math.floor(Math.random() * s.cvCount),
                rejected: s.cvCount - Math.floor(Math.random() * s.cvCount),
                reasons: [
                  "Falta experiencia relevante",
                  "No cumple requisitos técnicos",
                  "Incompatibilidad geográfica",
                ],
              },
            }
          : s
      )
    );
  };

  const handleReject = (id: string) => {
    setSubmissions(submissions.map((s) => (s.id === id ? { ...s, status: "rejected" } : s)));
  };

  const handleSendEmail = (submission: CVSubmission) => {
    if (!emailMessage.trim()) return;

    const subject = `Resultados de análisis de CVs - ${submission.plan === "PRO" ? "Plan Pro" : "Demo"}`;
    const body = `Hola ${submission.recruiterName},\n\n${emailMessage}\n\nResultados:\n- Shortlist: ${submission.results?.shortlist || 0}\n- Rechazados: ${submission.results?.rejected || 0}\n\nSaludos,\nCVitae Team`;

    window.open(`mailto:${submission.recruiterEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setEmailMessage("");
    setSelectedSubmission(null);
  };

  const pendingCount = submissions.filter((s) => s.status === "pending").length;
  const approvedCount = submissions.filter((s) => s.status === "approved").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white pt-20 pb-20">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setLocation("/")} className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-blue-600 rounded-lg flex items-center justify-center font-black text-xs">AD</div>
            <span className="font-bold">CVitae Admin</span>
          </button>
          <button onClick={() => setLocation("/")} className="text-sm hover:text-red-400 transition hidden md:block">Salir</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4">
        {/* STATS */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8">
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Pendientes</p>
            <p className="text-4xl font-black text-amber-400">{pendingCount}</p>
          </div>
          <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8">
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Aprobados</p>
            <p className="text-4xl font-black text-green-400">{approvedCount}</p>
          </div>
          <div className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-8">
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">Total CVs</p>
            <p className="text-4xl font-black text-blue-400">{submissions.reduce((acc, s) => acc + s.cvCount, 0)}</p>
          </div>
        </section>

        {/* SUBMISSIONS */}
        <section>
          <h1 className="text-4xl font-black mb-8">Gestión de Análisis</h1>
          <div className="space-y-6">
            {submissions.map((submission) => (
              <div key={submission.id} className="bg-gradient-to-r from-slate-800/40 to-slate-800/20 backdrop-blur border border-slate-700/50 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-black">{submission.recruiterName}</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${submission.plan === "PRO" ? "bg-purple-600/30 text-purple-300" : "bg-slate-700/50 text-slate-300"}`}>
                        {submission.plan}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm">{submission.recruiterEmail}</p>
                    <p className="text-slate-500 text-xs mt-2">{submission.cvCount} CVs | {new Date(submission.submittedAt).toLocaleString()}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {submission.status === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(submission.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition"
                        >
                          <CheckCircle2 className="h-4 w-4" /> Aprobar
                        </button>
                        <button
                          onClick={() => handleReject(submission.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg font-semibold transition"
                        >
                          <XCircle className="h-4 w-4" /> Rechazar
                        </button>
                      </>
                    )}
                    {submission.status === "approved" && (
                      <span className="px-4 py-2 bg-green-600/30 text-green-300 rounded-lg font-semibold text-sm uppercase tracking-wider">Aprobado</span>
                    )}
                    {submission.status === "rejected" && (
                      <span className="px-4 py-2 bg-red-600/30 text-red-300 rounded-lg font-semibold text-sm uppercase tracking-wider">Rechazado</span>
                    )}
                  </div>
                </div>

                {submission.results && (
                  <div className="bg-slate-800/50 rounded-xl p-6 mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Shortlist</p>
                        <p className="text-3xl font-black text-green-400">{submission.results.shortlist}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Rechazados</p>
                        <p className="text-3xl font-black text-red-400">{submission.results.rejected}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm uppercase tracking-wider mb-1">Tasa Aprobación</p>
                        <p className="text-3xl font-black text-blue-400">{Math.round((submission.results.shortlist / submission.cvCount) * 100)}%</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm uppercase tracking-wider mb-3">Razones de Rechazo</p>
                      <div className="space-y-2">
                        {submission.results.reasons.map((reason, idx) => (
                          <div key={idx} className="flex gap-2 p-2 bg-slate-700/30 rounded">
                            <span className="text-red-400">•</span>
                            <p className="text-slate-300 text-sm">{reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {submission.status === "approved" && (
                  <div className="bg-slate-800/50 rounded-xl p-6">
                    {selectedSubmission?.id === submission.id ? (
                      <div className="space-y-4">
                        <textarea
                          value={emailMessage}
                          onChange={(e) => setEmailMessage(e.target.value)}
                          placeholder="Escribe el mensaje para enviar por email..."
                          className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
                          rows={4}
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleSendEmail(submission)}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition"
                          >
                            <Mail className="h-4 w-4" /> Enviar Email
                          </button>
                          <button
                            onClick={() => setSelectedSubmission(null)}
                            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setSelectedSubmission(submission)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold transition w-full justify-center"
                      >
                        <Mail className="h-4 w-4" /> Enviar Resultados por Email
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
