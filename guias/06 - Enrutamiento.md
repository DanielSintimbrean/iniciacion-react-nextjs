# Enrutamiento (App Router)

## Objetivo

- Entender cómo funciona el enrutamiento basado en el sistema de archivos de
  Next.js (App Router)
- Aprender a navegar con `Link` y navegación programática con `useRouter`
- Usar `layout.tsx` para compartir UI (navbar) entre páginas
- Identificar rutas activas con `usePathname`

## Conceptos

### Enrutamiento por archivos en `src/app/`

Next.js crea rutas a partir de las carpetas y archivos dentro de `src/app/`.

- **`/`** corresponde a `src/app/page.tsx`
- **`/about`** corresponde a `src/app/about/page.tsx`
- **Layouts compartidos**: `src/app/layout.tsx` envuelve todas las páginas

```txt
// Estructura mínima en árbol de rutas
src/
└── app/
    ├── layout.tsx      // Layout raíz compartido
    ├── page.tsx        // Ruta "/"
    └── about/
        └── page.tsx    // Ruta "/about"
```

### Navegación declarativa con `Link`

Usa `Link` para cambiar de ruta sin recargar la página.

```tsx
// ✅ Correcto: navegación declarativa
import Link from "next/link";

export default function Home() {
  return (
    <nav>
      <Link href="/">Inicio</Link>
      <Link href="/about">Acerca</Link>
    </nav>
  );
}
```

```tsx
// ❌ Incorrecto: <a> causa navegación completa del navegador
export default function Home() {
  return (
    <nav>
      <a href="/about">Acerca</a>
    </nav>
  );
}
```

### Rutas activas con `usePathname`

Para resaltar el link activo del navbar:

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/about", label: "Sobre nosotros" },
    { href: "/contact", label: "Contactanos" },
  ];

  return (
    <nav>
      {links.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={isActive ? "font-bold underline" : ""}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
```

### Layouts compartidos

El archivo `src/app/layout.tsx` define UI común (cabecera, footer, navbar) que
se comparte entre todas las páginas hijas.

```tsx
// src/app/layout.tsx
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        {/* Aquí suele ir el Navbar */}
        {children}
      </body>
    </html>
  );
}
```

#### 📝 Ejercicio

Organiza los ejercicios previos y permite alternarlos con un navbar global.

- [ ] Crear las rutas: '01-componentes', '02-use-state', '03-use-effect'.
- [ ] Añadir una barra de navegación en `src/app/layout.tsx` con enlaces a las
      rutas creadas
- [ ] Resaltar el enlace activo usando `usePathname` en un componente
      `Navbar`.`.

### Rutas dinámicas

Las rutas dinámicas te permiten crear páginas que pueden cambiar según el valor
de parámetros en la URL. Para crear una ruta dinámica, usa corchetes `[]` en el
nombre de la carpeta o archivo.

```txt
// Estructura para rutas dinámicas
src/
└── app/
    └── pokemon/
        ├── page.tsx           // Ruta "/pokemon"
        └── [id]/
            └── page.tsx       // Ruta "/pokemon/[id]"
                                  (ej: "/pokemon/1", "/pokemon/hola", "/pokemon/lo-que-quieras")
```

#### Acceder a los parámetros dinámicos

En un componente de página, puedes acceder a los parámetros de la URL usando
`params`:

```tsx
// src/app/pokemon/[id]/page.tsx
export default async function PokemonDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await prams;
  const pokemon = await fetchPokemon(id);

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} />
    </div>
  );
}
```

> [!NOTE]
>
> Desde **Next.js 15**, los `params` en las rutas dinámicas se reciben como una
> **Promise** `params: Promise<{ id: string }>;`.  
> En versiones anteriores (**Next.js 14 y anteriores**), `params` era un objeto
> normal `params: { id: string };`.

**Ejemplo en Next.js 14 y anteriores:**

```tsx
// src/app/pokemon/[id]/page.tsx
export default function PokemonDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  // ...
}
```

**Ejemplo en Next.js 15:**

```tsx
// src/app/pokemon/[id]/page.tsx
export default async function PokemonDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // ...
}
```

#### 📝 Ejercicio: Pokemon con rutas dinámicas

- [ ] Crear la página de detalle con ruta dinámica `/04-pokemon/[id]`
- [ ] La página de detalle debe mostrar imagen del pokemon

## Errores comunes

**❌ Usar `<a>` en vez de `Link`**

```tsx
// ❌ Incorrecto: fuerza recarga completa
<a href="/ejercicios/use-state">useState</a>
```

```tsx
// ✅ Correcto
<Link href="/ejercicios/use-state">useState</Link>
```

**❌ Olvidar exportar por defecto en `page.tsx`**

Cada archivo de página (`page.tsx`) debe exportar _por defecto_ un componente
React. Si te olvidas de usar la exportación por defecto, Next.js no podrá
encontrar el componente para esa ruta y mostrará un error.

```tsx
// ❌ Incorrecto: falta la exportación por defecto
export function Page() {
  return <div>Página</div>;
}
```

```tsx
// ✅ Correcto: debe ser export default
export default function Page() {
  return <div>Página</div>;
}
```

**❌ Olvidar que `params` es una Promise desde Next.js 15**

Desde Next.js 15, el parámetro `params` en las rutas dinámicas se recibe como
una _Promise_ y **no** como un objeto directo.

```tsx
// ❌ Incorrecto: params debería ser una Promise
export default async function Page({ params }: { params: { id: string } }) {
  // ...
}
```

```tsx
// ✅ Correcto: params es una Promise<{ id: string }>
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ...
}
```

## Resumen de lo aprendido

- Navegaste entre rutas con el App Router basadas en archivos en `src/app/`
- Usaste `Link` para navegación declarativa y `useRouter` para programática
- Compartiste UI con `layout.tsx` y resaltaste la ruta activa con `usePathname`
- Organizaste los ejercicios anteriores y los enlazaste desde un navbar
- Creaste rutas dinámicas con `[id]` para páginas con parámetros
- Navegaste entre páginas dinámicas usando valores del parámetro `params`

## Recursos

- Documentación de App Router: [link](https://nextjs.org/docs/app)
- Navegación en App Router (`next/navigation`):
  [link](https://nextjs.org/docs/app/building-your-application/routing/navigation)
- `Link` en Next.js:
  [link](https://nextjs.org/docs/app/api-reference/components/link)
- Rutas dinámicas:
  [link](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
