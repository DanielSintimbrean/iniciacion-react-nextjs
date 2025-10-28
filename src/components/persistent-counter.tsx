"use client";

import { useState, useEffect } from "react";

/**
 * Contador Persistente con useEffect
 *
 * Este componente demuestra cómo usar useEffect para persistir datos en localStorage.
 *
 * Ejercicio completado:
 *   - Cada vez que counter cambia, se guarda en localStorage
 *   - Al montar el componente, se lee el valor desde localStorage
 */
export function Counter() {
  const [counter, setCounter] = useState(0);

  // Clave para usar con localStorage para persistir el contador
  //  Guardar: localStorage.setItem(clave, valor)
  //  Leer: localStorage.getItem(clave)
  const clave = "persistent-counter";

  // useEffect para leer el valor inicial desde localStorage
  // Se ejecuta SOLO UNA VEZ después del primer render
  useEffect(() => {});

  // useEffect para guardar el valor en localStorage cada vez que counter cambia
  // Se ejecuta CADA VEZ que counter cambia (counter está en las dependencias)
  useEffect(() => {});

  function increment() {
    setCounter((c) => c + 1);
  }

  function reset() {
    setCounter(0);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <span>Contador: {counter}</span>

      <button onClick={increment}>Incrementar</button>

      <button disabled={counter == 0} onClick={reset}>
        Resetear
      </button>
    </div>
  );
}
