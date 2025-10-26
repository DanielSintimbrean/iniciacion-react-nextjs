# useEffect

## Objetivo

- Comprender los casos de uso principales del hook `useEffect`
- Aprender a identificar cuándo es necesario usar `useEffect` en un componente
  React
- Evitar usos incorrectos y efectos secundarios no deseados al trabajar con
  React

## Conceptos

> [!WARNING]
>
> Este hook tiene muchas triquiñuelas y utilizarlo correctamente es complicado
> hasta para los programadores experimentados.
>
> Hasta propios ingenieros de Cloudflare provocaron una caída de su Dashboard
> por un uso incorrecto de `useEffect`.
> ([link](https://blog.cloudflare.com/deep-dive-into-cloudflares-sept-12-dashboard-and-api-outage/))

### ¿Qué es useEffect?

`useEffect` es un hook que nos permite ejecutar código **después de que React
renderiza** el componente.

Utiliza principalmente para comunicar React con el exterior, normalmente nuestro
backend (API)

`useEffect` tiene esta forma:

```ts
useEffect(() => {
  // se ejecuta después del render

  return () => {
    // Se usa para casos muy concretos
    // (opcional) Limpieza: se ejecuta antes de ejecutar por la siguiente vez useEffect o al desmontar
  };
}, [dependencias]);
```

El array de dependencias en `useEffect` controla cuándo se ejecuta. Hay tres
casos principales:

1. **Sin array de dependencias**:

   ```js
   useEffect(() => {
     // Se ejecuta después de cada renderizado
   });
   ```

   El efecto se ejecuta después de **cada render** del componente.

2. **Array vacío `[]`**:

   ```js
   useEffect(() => {
     // Se ejecuta solo una vez después del primer render
   }, []);
   ```

   El efecto se ejecuta **solo una vez**, después del primer render (similar a
   `componentDidMount` en clases).

3. **Array con dependencias `[a, b]`**:
   ```js
   useEffect(() => {
     // Se ejecuta cuando 'a' o 'b' cambian
   }, [a, b]);
   ```
   El efecto se ejecuta después del render **solo si alguna de las dependencias
   cambia** desde el render anterior.

Esto te permite controlar con precisión cuándo corre tu efecto dentro del ciclo
de vida del componente.

> [!IMPORTANT]
>
> Para que `useEffect` funcione, asegúrate de añadir `"use client"` al principio
> del archivo del componente. Más adelante explicaremos por qué.

### Ejemplos

#### Ejemplo: Sincronización con APIs externas

```tsx
"use client";
import { useState, useEffect } from "react";

function Quote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    fetch("https://api.chucknorris.io/jokes/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.value);
      });
  }, []); // Solo se ejecuta una vez, al montar el componente

  return (
    <div>
      <p>{quote}</p>
      <button onClick={() => window.location.reload()}>
        Obtener nueva frase
      </button>
    </div>
  );
}
```

#### Ejemplo: Modificando `document`

```tsx
"use client";
import { useState, useEffect } from "react";

function CounterWithTitle() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Cambiamos el título del documento para mostrar el contador
    document.title = `Contador: ${count}`;
  }, [count]);

  return (
    <div>
      <p>Has hecho clic {count} veces</p>
      <button onClick={() => setCount(count + 1)}>Incrementar</button>
    </div>
  );
}
```

#### Ejemplo: UseEffect con limpieza (cleanup)

```tsx
"use client";
import { useState, useEffect } from "react";

function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup: elimina el listener cuando el componente se desmonta
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <p>
        Posición del mouse: {position.x}, {position.y}
      </p>
    </div>
  );
}
```

#### Ejemplo: Controlar temporizadores

```tsx
"use client";
import { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    // Limpieza del intervalo al desmontar
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <p>Han pasado {seconds} segundos</p>;
}
```

#### 📝 Ejercicio

- [ ] Crear un componente `PersistentCounter` en
      `src/components/persistent-counter.tsx`.
- [ ] Guardarlo en `localStorage` cada vez que cambie `count`.
- [ ] Sincronizar el valor inicial desde `localStorage`

> [!NOTE] `localStorage` permite almacenar datos de manera persistente en el
> navegador del usuario. Cada valor se almacena como un string y se accede
> mediante pares clave-valor usando métodos como
> `localStorage.setItem(clave, valor)` y `localStorage.getItem(clave)`.

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
// ❌ Incorrecto: actualizar estado sin condición
useEffect(() => {
  setCount((c) => c + 1); // Esto dispara otro render → bucle infinito
});
```

```tsx
// ✅ Correcto: actualiza estado solo en respuesta a eventos o con lógicas controladas
useEffect(() => {
  setCount((c) => c + 1);
}, [variableControlada]);
```

**❌ Usar `useEffect` para computar estado derivado cuando no es necesario**

A veces se usa `useEffect` para calcular un valor a partir de otros estados,
cuando lo más apropiado sería calcular directamente el valor.

```tsx
// ❌ Incorrecto: usar useEffect para calcular un valor derivado
const [count, setCount] = useState(0);
const [doble, setDoble] = useState(0);

useEffect(() => {
  setDoble(count * 2);
}, [count]);
```

Esto es innecesario y puede provocar renders extra.

```tsx
// ✅ Correcto: calcular el valor directamente, o usar useMemo si es costoso
const [count, setCount] = useState(0);
// Simplemente:
const doble = count * 2;
```

## Caso de estudio

Hecho un vistazo a `src/components/persistent-counter.tsx` y juega con él
mirando los logs las herramientas de desarrolladores de tu navegador.

- Analiza el orden en que se ejecutan los `console.log`
- Hazle cambios y observa que pasa
  - Cambia el orden de los `useEffect`
  - Añade otro contador y otros `useEffects` con distintas variables de
    dependencias

## Resumen de lo aprendido

- Entendiste cuándo usar `useEffect` para sincronizar con sistemas externos.
- Persististe el estado del contador en `localStorage` de forma segura.
- Evitaste dependencias incorrectas y bucles de render.

## Recursos

- Documentación oficial de `useEffect`:
  [link](https://es.react.dev/reference/react/useEffect)
- Client Components en Next.js:
  [link](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- `localStorage` en MDN:
  [link](https://developer.mozilla.org/docs/Web/API/Window/localStorage)
