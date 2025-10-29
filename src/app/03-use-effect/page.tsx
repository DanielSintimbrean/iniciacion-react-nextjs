import { Counter } from "../../components/persistent-counter";

export default function ElQueMeDaLaGana() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center bg-white">
        <Counter />
      </main>
    </div>
  );
}
