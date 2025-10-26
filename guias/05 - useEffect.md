# useEffect

## Objetivo

- Ejecutar efectos secundarios tras el render (consultas, suscripciones,
  sincronización con APIs del navegador).
- Persistir el estado del contador en `localStorage` para que se mantenga entre
  recargas.
- Evitar errores comunes como dependencias incorrectas o accesos al DOM durante
  el render.

## Conceptos

### ¿Qué es un efecto?

Un efecto es código que se ejecuta después de que React renderiza tu componente.
Se usa para sincronizar la UI con sistemas externos (por ejemplo,
`localStorage`, `fetch`, eventos del navegador, timers…).

`useEffect` tiene esta forma:

```ts
useEffect(() => {
  // Efecto: se ejecuta después del render
  return () => {
    // (opcional) Limpieza: se ejecuta antes del próximo efecto o al desmontar
  };
}, [dependencias]);
```

### Contador persistente en localStorage

```tsx
"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "counter:v1";

export function PersistentCounter() {
  const [count, setCount] = useState(0);

  // Obtener el número de localstorage desdpués del primer render
  useEffect(() => {
    const item = window.localStorage.getItem(STORAGE_KEY);
    const num = Number(item);

    if (!Number.isNa(num)) {
      setCount(num);
    }
  }, []);

  // Actulizar el localstorage
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, String(count));
  }, [count]);

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <button onClick={() => setCount((c) => c - 1)}>-1</button>
      <span>{count}</span>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <button onClick={() => setCount(0)} disabled={count === 0}>
        Reset
      </button>
    </div>
  );
}
```

> [!NOTE]
>
> `useEffect` solo está disponible en Client Components. Añade `"use client"` en
> la primera línea del archivo del componente.

#### 📝 Ejercicio

- [ ] Crear un componente `PersistentCounter` en
      `src/app/persistent-counter.tsx`.
- [ ] Leer el valor inicial desde `localStorage` y guardarlo cada vez que cambie
      `count`.
- [ ] Añadir un botón "Reset" (deshabilitado si `count === 0`).
- [ ] Añadir una prop opcional `storageKey?: string` con valor por defecto
      `"counter:v1"`.
- [ ] Renderizar dos contadores con claves distintas para comprobar que cada uno
      recuerda su valor.

## Errores comunes

**❌ Dependencias incorrectas en el efecto**

```tsx
// ❌ Incorrecto: falta 'count' en dependencias
useEffect(() => {
  window.localStorage.setItem("counter:v1", String(count));
}, []); // No se ejecutará cuando cambie count
```

```tsx
// ✅ Correcto
useEffect(() => {
  window.localStorage.setItem("counter:v1", String(count));
}, [count]);
```

**❌ Efectos que provocan renders infinitos**

```tsx
// ❌ Incorrecto: actualizar estado sin condición dentro del efecto
useEffect(() => {
  setCount((c) => c + 1); // Esto dispara otro render → bucle infinito
});
```

```tsx
// ✅ Correcto: actualiza estado solo en respuesta a eventos o con lógicas controladas
useEffect(() => {
  // sincronización con sistemas externos sin modificar estado sin control
}, []);
```

## Resumen de lo aprendido

- Entendiste cuándo usar `useEffect` para sincronizar con sistemas externos.
- Persististe el estado del contador en `localStorage` de forma segura.
- Evitaste dependencias incorrectas y bucles de render.

## Recursos

- Documentación oficial de `useEffect`:
  `https://es.react.dev/reference/react/useEffect`
- Client Components en Next.js:
  `https://nextjs.org/docs/app/building-your-application/rendering/client-components`
- `localStorage` en MDN:
  `https://developer.mozilla.org/docs/Web/API/Window/localStorage`
