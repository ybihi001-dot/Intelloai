"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <main style={{ maxWidth: 480, margin: "2rem auto", padding: "1rem" }}>
      <h1>IntelloAI</h1>
      <p>Formulaire de contact pour generer des leads.</p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input placeholder="Nom complet" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Email" type="email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Telephone (optionnel)" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <textarea placeholder="Message (optionnel)" value={form.message} rows={4}
          onChange={(e) => setForm({ ...form, message: e.target.value })} />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Envoi..." : "Envoyer"}
        </button>
      </form>
      {status === "success" && <p style={{ color: "green" }}>Merci ! Message envoye.</p>}
      {status === "error" && <p style={{ color: "red" }}>Erreur, reessayez.</p>}
    </main>
  );
}
