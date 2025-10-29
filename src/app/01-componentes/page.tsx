import { Button } from "../../components/button";

export default function ElQueMeDaLaGana() {
  return (
    <div className="flex min-h-screen justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center bg-white">
        <Button>Botón 1</Button>
        <Button variant="red">Botón 2</Button>
        <Button variant="gray">Botón 3</Button>
      </main>
    </div>
  );
}
