/**
 * Para que podamos utilizar un componente desde otro archivo, debemos exportarlo
 * utilizando la palabra reservada `export`.
 */

/**
 * Crear tu primer componente botón aquí
 *
 * Un componente es una función que cumple 2 requisitos:
 *   1. El nombre del componente debe empezar por mayúscula
 *   2. Devolver un elemento (tag HTML o un componente)
 *
 * Ejercicio:
 *   - Modificar el componente Button para aceptar un parámetro text
 *   - Añade el parametro opcional variant
 */
export function Button({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant?: "red" | "gray";
}) {
  let className;

  if (variant == "red") {
    className = "bg-red-300";
  }

  if (variant == "gray") {
    className = "bg-slate-300";
  }

  return <button className={className}>{children}</button>;
}
