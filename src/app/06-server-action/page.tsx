"use client";
import { contact } from "./action";

export default function Page() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-4 bg-white">
        <form className="flex flex-col gap-2" action={contact}>
          <input
            className="rounded-md border border-gray-300 p-2"
            type="text"
            name="name"
            placeholder="Nombre"
          />
          <input
            className="rounded-md border border-gray-300 p-2"
            type="email"
            name="email"
            placeholder="Email"
          />
          <textarea
            className="rounded-md border border-gray-300 p-2"
            name="message"
            placeholder="Mensaje"
          />
          <button
            className="rounded-md bg-blue-500 p-2 text-white"
            type="submit"
          >
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
}
