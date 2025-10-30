"use client";

import { useEffect, useState } from "react";

/**
 * Truco para saber si estás ejecutando en el cliente
 * o en el servidor.
 *
 * Ya que el ojecto global 'window' solo existen en los navegadores
 */
const isServer = typeof window === "undefined";

export function ClientComponent() {
  const [couter, setCouter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCouter((c) => c + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (isServer) {
    console.log("Client Component rederizando en Servidor");
  } else {
    console.log("Client Component rederizando en Cliente");
  }

  return <div>Client Component ({couter}s)</div>;
}
