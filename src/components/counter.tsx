"use client";

import { useState } from "react";
/**
 * Utilizar useState para crear un contador
 *
 * Ejercicio:
 *   - Añadir "use client" y el import de useState
 *   - Crear un estado count con valor inicial 0
 *   - Crear un botón que incremente el contador al hacer clic
 *   - Añadir un botón "Reset" que ponga el contador a 0
 *   - El botón Reset debe estar deshabilitado si el contador ya es 0
 */

export function Counter() {
  const [counter, setCounter] = useState(0);

  function increment() {
    setCounter((c) => c + 1);
  }

  function reset() {
    setCounter(0);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span>Contatador: {counter}</span>

      <button onClick={increment}>Incrementar</button>

      <button disabled={counter == 0} onClick={reset}>
        Resetear
      </button>
    </div>
  );
}
