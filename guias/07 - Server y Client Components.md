# Server y Client Components

## Objetivo

- Entender la diferencia entre **Server Components** y **Client Components**
- Aprender cuándo usar cada tipo de componente según tus necesidades
- Comprender el concepto de **hidratación** y cómo funciona el renderizado en
  Next.js
- Identificar qué características requieren Client Components (`"use client"`)

## Conceptos

> [!IMPORTANT]
>
> En Next.js 13+ con App Router, **todos los componentes son Server Components
> por defecto**. Solo necesitas marcar un componente como Client cuando usa
> hooks, eventos o APIs del navegador.

### ¿Qué son los Server Components?

Los **Server Components** solo se ejecutan en el servidor. Generan HTML estático
que se envía al navegador.

**Características de Server Components:**

- ✅ Acceso directo a bases de datos o APIs backend
- ✅ Librerías de Node.js sin restricciones
- ✅ No envían JavaScript al cliente (bundle más pequeño)
- ✅ Mejor rendimiento inicial (HTML listo desde el servidor)
- ❌ No pueden usar hooks (`useState`, `useEffect`, etc.)
- ❌ No pueden escuchar eventos del navegador
- ❌ No pueden acceder a APIs del navegador (`localStorage`, `window`, etc.)

**Ejemplo de Server Component:**

```tsx
// src/app/posts/page.tsx
// Server Component (por defecto)
import { readFile } from "fs/promises";

export default async function Posts() {
  // ✅ Puede leer archivos del servidor
  const data = await readFile("./posts.json", "utf-8");
  const posts = JSON.parse(data);

  return (
    <div>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}
```

### ¿Qué son los Client Components?

Los **Client Components** se ejecutan en el navegador. Usan JavaScript para
hacer la interfaz interactiva.

**Características de Client Components:**

- ✅ Pueden usar hooks (`useState`, `useEffect`, `useRouter`, etc.)
- ✅ Pueden escuchar eventos del usuario (clicks, input changes, etc.)
- ✅ Pueden acceder a APIs del navegador
- ✅ Son interactivos
- ❌ No pueden acceder directamente a bases de datos
- ❌ Envían JavaScript al cliente (aumenta el bundle)
- ❌ Requieren la directiva `"use client"`

**Ejemplo de Client Component:**

```tsx
// src/components/counter.tsx
"use client"; // ← Necesario para usar hooks y eventos

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

Una vez que pones `"use client"` en un archivo, **todos los componentes que
importes directamente en ese archivo también se convierten en Client
Components**.

```tsx
// src/components/button.tsx
"use client";
import { Icon } from "./icon"; // ← Icon también será Client Component

export function Button() {
  return <Icon />; // Aunque Icon no tenga "use client", se ejecuta en el cliente
}
```

**Implicación:** Si importas un Server Component en un Client Component, ese
Server Component NO puede usar funciones del servidor.

```tsx
// ❌ No funciona
"use client";
import { ServerComponent } from "./server-component"; // Error si usa fs, DB, etc.

export function ClientComponent() {
  return <ServerComponent />;
}
```

**Solución:** Pasa el Server Component como children desde un Server Component
padre.

```tsx
// ✅ Funciona
// src/app/page.tsx (Server Component)
import { ServerComponent } from "./server-component"; // Obtiene datos en el servidor
import { ClientDisplay } from "./client-display";

export default async function Page() {
  return (
    <ClientDisplay>
      <ServerComponent />
    </ClientDisplay>
  );
}
```

### ¿Cuándo usar cada uno?

**Usa Server Components cuando:**

- Muestras contenido estático
- Necesitas acceso a datos del servidor (BD, APIs privadas, archivos)
- Quieres optimizar el rendimiento inicial
- El componente no necesita interactividad

**Usa Client Components cuando:**

- Necesitas usar hooks (`useState`, `useEffect`, etc.)
- Escuchas eventos del usuario (onClick, onChange, etc.)
- Accedes a APIs del navegador (`localStorage`, `window`, etc.)
- Usas hooks de Next.js (`useRouter`, `usePathname`, etc.)

## Errores comunes

**❌ Intentar usar hooks en Server Components**

```tsx
// ❌ Incorrecto: useState en un Server Component
import { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0); // ❌ Error: hooks no funcionan aquí
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

```tsx
// ✅ Correcto: añade "use client"
"use client";
import { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0); // ✅ Funciona
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**❌ Intentar acceder a APIs del navegador en Server Components**

```tsx
// ❌ Incorrecto: localStorage no existe en el servidor
export default function Page() {
  const name = window.localStorage.getItem("name"); // ❌ Error
  return <p>{name}</p>;
}
```

```tsx
// ✅ Correcto: usa Client Component y useEffect
"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(window.localStorage.getItem("name") || "");
  }, []);

  return <p>{name}</p>;
}
```

**❌ Importar Server Components directamente en Client Components**

No puedes importar Server Components que usan funciones del servidor (como
`readFile`) en Client Components.

```tsx
// ❌ Incorrecto: no puedes importar Server Components con funcionalidad del servidor
"use client";
import { ServerOnlyComponent } from "./server-only";

export default function ClientPage() {
  return <ServerOnlyComponent />; // ❌ No funciona
}
```

```tsx
// ✅ Correcto: pasa los datos como props en vez del componente
"use client";

type ClientPageProps = { data: string };

export default function ClientPage({ data }: ClientPageProps) {
  return <p>{data}</p>; // ✅ Funciona
}
```

```tsx
// Server Component padre
import ClientPage from "./client-page";

export default async function ServerPage() {
  const data = await fetchData(); // ✅ En el servidor
  return <ClientPage data={data} />; // ✅ Pasa los datos
}
```

## Caso de estudio

Analiza la estructura de tu proyecto:

- Mira `src/app/layout.tsx` — ¿Es Server o Client?
- Revisa `src/components/counter.tsx` — ¿Por qué tiene `"use client"`?
- Observa `src/app/page.tsx` — ¿Qué tipo de componente es?

**Regla de oro:** Si un componente necesita interactividad o hooks, usa
`"use client"`. Si solo muestra datos o contenido estático, déjalo como Server
Component (por defecto).

## Resumen de lo aprendido

- Entendiste la diferencia entre Server Components (solo servidor) y Client
  Components (servidor + cliente con hidratación).
- Aprendiste cuándo usar cada tipo: Server para contenido estático, Client para
  interactividad.
- Comprendiste el proceso de hidratación: HTML estático primero, luego
  JavaScript lo hace interactivo.
- Marcaste componentes como Client con `"use client"` cuando usas hooks o
  eventos.

## Recursos

- Documentación de Server Components:
  [link](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- Documentación de Client Components:
  [link](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
- React Server Components:
  [link](https://es.react.dev/reference/rsc/server-components)
