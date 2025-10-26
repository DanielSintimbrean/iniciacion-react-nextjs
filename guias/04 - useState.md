# useState

## Objetivo

- **Comprender el concepto de estado** y por qué es necesario para hacer
  componentes interactivos en React
- **Implementar el hook `useState`** para gestionar información que cambia en el
  tiempo (como contadores, datos de formularios, o estados de UI)
- **Gestionar eventos del usuario** (clics, escritura en inputs, etc.) y
  actualizar la interfaz en respuesta a estas acciones

## Conceptos

### ¿Qué es el estado?

El estado representa información que puede cambiar a lo largo del tiempo. Cuando
actualizas el estado, React vuelve a renderizar el componente para reflejar los
cambios en la UI.

React reacciona a los cambios de estado.

🚫 Ejemplo incorrecto: intentar actualizar una variable `let` en vez de usar
estado

```tsx
export function BadCounter() {
  let count = 0;

  function incrementarContador() {
    count = count + 1;
  }

  return (
    <button onClick={incrementarContador}>Has hecho clic {count} veces</button>
  );
}
```

Esto NO funciona: aunque `count` cambia en la función del click, React no vuelve
a renderizar el componente y el número nunca se actualiza en la interfaz.  
Debes usar `useState` para que React sepa que han habido cambios.

### useState

Sintaxis del `useState`:

```ts
const [estado, actualizarEstado] = useState(estadoInicial);
```

Ejemplo:

```tsx
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Has hecho clic {count} veces
    </button>
  );
}
```

> [!IMPORTANT]
>
> Para que `useState` funcione, asegúrate de añadir `"use client"` al principio
> del archivo del componente. Más adelante explicaremos por qué.

#### 📝 Ejercicio

- [ ] Crear un componente `Counter` en `src/app/counter.tsx` con un botón que
      incremente el contador.
- [ ] Añadir un botón "Reset" que ponga el contador a 0 (deshabilitado si ya es
      0).

### Actualizar estado de manera funcional

Cuando necesitas actualizar el estado en función de su valor previo, debes usar
la **forma funcional** de `setState.

En vez de pasar el nuevo valor directamente, le pasas **una función** que recibe
el valor anterior y devuelve el siguiente.

Podemos evitar algún que otor comportamiento inseperado.

> [!NOTE]
>
> **Arrow Functions (Funciones Flecha)**
>
> En los ejemplos verás notación como `(prev) => prev + 1` o
> `() => setCount(count + 1)`. Esto se llama **arrow function** (función flecha)
> y es una forma abreviada de escribir funciones en JavaScript.
>
> Muy utilizadas en React
>
> **Forma tradicional:**
>
> ```js
> function incrementar(num) {
>   return num + 1;
> }
> ```
>
> **Forma con arrow function:**
>
> ```js
> (num) => num + 1
> // O también:
> (num) => { return num + 1; }
> ```

**Ejemplo: incremento seguro usando la función como argumento**

```tsx
"use client";
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  // ❌ Forma incorrecta — forma directa
  function incrementar() {
    // ¡Cuidado si llamas dos veces a setCount(count + 1)!
    setCount(count + 1);
    setCount(count + 1);
    // Esto sumará solo 1, no 2. React "agrupará" las dos actualizaciones usando el mismo valor de count inicial.
  }

  // ✅ Forma correcta — usando la función
  function incrementarCorrecto() {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    // Esto sí suma 2 porque cada vez toma el valor "más actualizado"
  }

  return (
    <button onClick={incrementarCorrecto}>Has hecho clic {count} veces</button>
  );
}
```

Utiliza siempre la forma funcional cuando el nuevo estado depende del anterior.

**En eventos como este:**

```tsx
<button onClick={() => setCount((c) => c + 1)}>Sumar +1</button>
```

Esto garantiza que el contador nunca se “pierde” aunque haya varias
actualizaciones seguidas.

> [!NOTE]
>
> Si el nuevo estado **no** depende del anterior, puedes pasar el valor
> directamente.

#### 📝 Ejercicio

- [ ] Cambia cualquier uso de `setState` para usar la **forma funcional**.
- [ ] Comprueba que el contador ahora sí aumenta correctamente incluso si llamas
      varias veces seguidas a la función que incrementa el estado.

## Errores comunes

**❌ Olvidar `"use client"` al usar hooks**

```tsx
// ❌ Incorrecto: faltaría la directiva para Client Component
import { useState } from "react";

export function Clicker() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>{n}</button>;
}
```

```tsx
// ✅ Correcto
"use client";
import { useState } from "react";

export function Clicker() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN((v) => v + 1)}>{n}</button>;
}
```

**❌ Mutar el estado directamente cuando el nuevo estado depende del anterior**

```tsx
// ❌ Incorrecto: mutación directa
const [count, setCount] = useState(0);

setCount(count + 1);
```

```tsx
// ✅ Correcto: usa la forma funcional
const [count, setCount] = useState(0);

setCount((c) => c + 1);
```

**❌ Asumir que `setState` modifica al momemnto el valor**

```tsx
// ❌ Incorrecto: leer el nuevo valor justo después de setCount
setCount(count + 1);

console.log(count); // Aún tiene el valor anterior
```

```tsx
// ✅ Correcto: basarse en el valor anterior o reaccionar en render
setCount((c) => c + 1);
```

## Caso de estudio

### Botón de Like con contador

Un botón que alterna el estado de "like" y ajusta el contador de likes.

```tsx
"use client";
import { useState } from "react";

type LikeButtonProps = { initialLikes?: number };

export function LikeButton({ initialLikes = 10 }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);

  function toggleLike() {
    setLiked((prev) => !prev);
  }

  let likes = initialLikes;

  // Si le has dado me gusta suma +1 a los likes totales
  if (liked) {
    likes = likes + 1;
  }

  return (
    <button
      aria-pressed={liked}
      onClick={toggleLike}
      className={liked ? "bg-red-300" : "bg-slate-300"}
    >
      {liked ? "❤️" : "🤍"} {likes}
    </button>
  );
}
```

### Inputs de email usando useState

Un ejemplo de cómo crear un `<input>` para email controlado con estado:

```tsx
"use client";
import { useState } from "react";

export function EmailInput() {
  const [email, setEmail] = useState("");

  return (
    <form>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@email.com"
        />
      </label>
      <div>Valor ingresado: {email}</div>
    </form>
  );
}
```

## Resumen de lo aprendido

- Entendiste qué es el estado y cuándo usarlo.
- Usaste `useState` para actualizar la UI a partir de eventos.

## Recursos

- Documentación oficial de `useState`:
  [link](https://es.react.dev/reference/react/useState)
- Client Components en Next.js:
  [link](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
