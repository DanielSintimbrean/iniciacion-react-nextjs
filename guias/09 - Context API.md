# Context API

## Objetivo

- Entender qué es la Context API y cuándo usarla
- Aprender a crear y usar Context para compartir datos entre componentes
- Crear un sistema de tema claro/oscuro con Context

## Conceptos

### ¿Qué es Context API?

La **Context API** permite compartir datos entre múltiples componentes sin pasar
props por cada nivel.

**Sin Context (prop drilling):**

```
App → Div → Navbar → Button (necesita theme)
     ↓     ↓      ↓
  theme  theme  theme  ← Muy repetitivo
```

**Con Context:**

```
// Cualquier componente accede directamente
const { theme } = useTheme();
```

### ¿Cuándo usar Context?

- ✅ Datos globales (tema, usuario logueado)
- ✅ Se usa en muchos componentes distantes
- ✅ Evitar pasar props por 3+ niveles

**NO uses Context para:**

- ❌ Datos locales de un solo componente
- ❌ Datos que cambian muy frecuentemente

## Sintaxis: Crear un Context

### 1. Crear el Context y Provider

```tsx
// src/contexts/theme-context.tsx
"use client";
import { createContext, useState, useContext, ReactNode } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook personalizado para usar el Context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }
  return context;
}
```

### 2. Envolver la app con el Provider

```tsx
// src/app/layout.tsx
import { ThemeProvider } from "@/contexts/theme-context";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

### 3. Usar en componentes

```tsx
// src/components/theme-toggle.tsx
"use client";
import { useTheme } from "@/contexts/theme-context";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return <button onClick={toggleTheme}>Tema: {theme}</button>;
}
```

## 📝 Ejercicio: Sistema de tema claro/oscuro

Crea un sistema completo de tema claro/oscuro siguiendo estos pasos:

### Paso 1: Crear el Context

- [ ] Crea el `ThemeContext` con `createContext`
- [ ] Crea el `ThemeProvider` que maneja el estado
- [ ] Crea la función `toggleTheme` que cambia entre light y dark
- [ ] Crea el hook personalizado `useTheme`
- [ ] Modifica `src/app/layout.tsx` añadiendo `ThemeProvider`
- [ ] Usa el hook `useTheme` en `src/components/theme-toggle.tsx`
- [ ] Al hacer click, cambia entre "light" y "dark"

## Errores comunes

**❌ Usar Context en Server Components**

```tsx
// ❌ Incorrecto
export default function Page() {
  const { theme } = useTheme(); // ❌ Error: context en Server Component
  return <div>{theme}</div>;
}
```

```tsx
// ✅ Correcto: usa "use client"
"use client";
import { useTheme } from "@/contexts/theme-context";

export function PageContent() {
  const { theme } = useTheme(); // ✅ Funciona
  return <div>Tema: {theme}</div>;
}
```

**❌ Olvidar el Provider**

```tsx
// ❌ Sin Provider
export default function Layout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  ); // ❌ Context será null
}
```

```tsx
// ✅ Con Provider
export default function Layout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider> {/* ✅ Necesario */}
      </body>
    </html>
  );
}
```

## Resumen

- Context API permite compartir datos sin pasar props por cada nivel
- Úsalo para datos globales (tema, usuario) que se usan en muchos componentes y
  no tenga muchos cambios
- Siempre usa `"use client"` en componentes que usan Context

## Recursos

- [Documentación Context API](https://es.react.dev/reference/react/useContext)
- [Context completo](https://es.react.dev/learn/passing-data-deeply-with-context)
