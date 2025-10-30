"use client";
import { useState } from "react";
import { contact } from "./action";

export default function Page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (isSending) return;

    setIsSending(true);

    try {
      await contact({ name, email, message });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-4 bg-white">
        <div className="flex flex-col gap-2">
          <input
            className="rounded-md border border-gray-300 p-2"
            type="text"
            name="name"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="rounded-md border border-gray-300 p-2"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            className="rounded-md border border-gray-300 p-2"
            name="message"
            placeholder="Mensaje"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="rounded-md bg-blue-500 p-2 text-white disabled:opacity-60"
            type="button"
            onClick={handleSend}
            disabled={isSending}
          >
            {isSending ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </main>
    </div>
  );
}
