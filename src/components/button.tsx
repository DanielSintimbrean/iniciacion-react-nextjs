/**
 * Para que podamos utilizar un componente desde otro archivo, debemos exportarlo
 * utilizando la palabra reservada `export`.
 *
 * Ejercicio:
 *   Copiar el componente Button que hemos creado en el archivo `page.tsx` y
 *   exportarlo para que podamos utilizarlo desde otro archivo.
 */

/**
 * Crear tu primer componente botón aquí
 *
 * Un componente es una función que cumple 2 requisitos:
 *   1. El nombre del componente debe empezar por mayúscula
 *   2. Devolver un elemento (tag HTML o un componente)
 *
 * Ejercicio:
 *   Crear un componente Button que devuelva un botón con el texto "Mi primer botón"
 */
export function Button() {
  return <button>Mi primer botón</button>;
}
