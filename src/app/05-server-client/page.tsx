import { ClientComponent } from "./client";
import { ServerComponent } from "./server";

export default function Page() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-4 bg-white">
        <ClientComponent />
        <ServerComponent />
      </main>
    </div>
  );
}
