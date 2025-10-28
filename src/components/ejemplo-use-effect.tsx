"use client";
import { useEffect, useState } from "react";

export function EjemploUseEffect() {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div>
      <button onClick={() => setShowComponent(!showComponent)}>
        {showComponent ? "Ocultar Componente" : "Mostrar Componente"}
      </button>
      {showComponent ? <ComponentConUseEffect /> : <p>Componente Escondido</p>}
    </div>
  );
}

function ComponentConUseEffect() {
  const [count, setCount] = useState(0);
  console.log("===== Renderizando Componente ======");

  console.log("1 - useEffect");

  useEffect(() => {
    // Se ejecuta siempre al final de cada render
    console.log("====== Terminando de Renderizar ========");
  });

  useEffect(() => {
    // Se ejectua después del primer render
    console.warn("Componente montado en el DOM");

    // Se ejectua cuando ocultamos el componente
    return () => console.warn("Componente retirado del DOM");
  }, []);

  useEffect(() => {
    console.log("Contador cambiado a", count);

    return () => console.log("Limpiza Contador de", count);
  }, [count]);

  console.log("2 - useEffect");

  return (
    <div onClick={() => setCount((c) => c + 1)}>
      Mostrado useEffect ({count})
    </div>
  );
}
