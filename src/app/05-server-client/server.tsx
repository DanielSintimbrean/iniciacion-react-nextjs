/**
 * Truco para saber si estás ejecutando en el cliente
 * o en el servidor.
 *
 * Ya que el ojecto global 'window' solo existen en los navegadores
 */
const isServer = typeof window === "undefined";

function delay(t: number) {
  return new Promise((resolve) => setTimeout(resolve, t));
}

import fs from "fs/promises";
import path from "path";

export async function ServerComponent() {
  /**
   * Este recurso podría ser cualquier dato o elemento que se encuentre en nuestro servidor:
   * por ejemplo, un archivo local, información almacenada en una base de datos, la respuesta de
   * una API interna o externa, archivos de configuració, entre muchos otros.
   */
  const filePath = path.join(
    process.cwd(),
    "src",
    "app",
    "05-server-client",
    "file.txt",
  );

  let file;

  // Simulamos que es una API que tarda mucho
  await delay(3000);

  try {
    file = await fs.readFile(filePath, "utf8");
  } catch (error) {
    console.error(error);
    file = "Error al leer archivho";
  }

  if (isServer) {
    console.log("Server Component rederizando en Servidor");
  } else {
    console.log("Server Component rederizando en Cliente");
  }

  return (
    <div className="text-center">
      <div>Server Component</div>
      <div>{file}</div>
    </div>
  );
}
