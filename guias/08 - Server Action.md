# Server Actions

## Objetivo

- Comprender qué son las Server Actions y cómo funcionan en Next.js
- Aprender a crear funciones que se ejecutan en el servidor desde componentes
  del cliente
- Entender la diferencia entre Server Actions y API Routes
- Implementar formularios y acciones del usuario sin crear endpoints manualmente

## Conceptos

> [!NOTE]
>
> Las Server Actions son una forma "mágica" de crear endpoints de API sin tener
> que escribir archivos de ruta API manualmente.

### ¿Qué son las Server Actions?

Las **Server Actions** son funciones asíncronas que se ejecutan exclusivamente
en el servidor. Pueden ser llamadas desde componentes del cliente usando forms o
directamente con funciones.

**Ventajas:**

- ✅ No necesitas crear archivos de API Route (`app/api/...`)
- ✅ Ejecución segura en el servidor (acceso a BD, variables de entorno, etc.)
- ✅ Integración directa con formularios HTML
- ✅ Type-safe automático (TypeScript)
- ✅ Mejor rendimiento (menos código JavaScript en el cliente)

### Crear una Server Action

Para crear una Server Action, marca tu función con `"use server"`:

```tsx
// src/actions/todo-actions.ts
"use server";

export async function createTodo(title: string) {
  // ✅ Esta función solo se ejecuta en el servidor
  console.log("Creando todo:", title);

  // Aquí irías a tu BD o API
  // await db.todo.create({ title });

  return { success: true, message: "Todo creado" };
}
```

### Usar Server Actions en formularios

La forma más común de usar Server Actions es con `<form>` y el atributo
`action`:

```tsx
// src/components/todo-form.tsx
import { createTodo } from "@/actions/todo-actions";

export function TodoForm() {
  return (
    <form action={createTodo}>
      <input name="title" placeholder="Nuevo todo" required />
      <button type="submit">Crear</button>
    </form>
  );
}
```

> [!NOTE]
>
> Next.js automáticamente serializa los datos del formulario y los envía a la
> Server Action. Los inputs deben tener el atributo `name` para que funcione.

### FormData y Server Actions

Para acceder a los datos del formulario en tu Server Action, usa `FormData`:

```tsx
"use server";

export async function createTodo(formData: FormData) {
  const title = formData.get("title") as string;

  console.log("Título:", title);

  // Guardar en BD, etc.
  return { success: true };
}
```

```tsx
<form action={createTodo}>
  <input name="title" required />
  <button type="submit">Crear</button>
</form>
```

### Llamar Server Actions desde eventos del cliente

También puedes llamar Server Actions directamente desde funciones JavaScript:

```tsx
"use client";

import { createTodo } from "@/actions/todo-actions";
import { useState } from "react";

export function TodoButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);

    // ✅ Llamada directa a la Server Action
    const result = await createTodo("Comprar leche");

    console.log(result);
    setIsLoading(false);
  }

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Creando..." : "Crear Todo"}
    </button>
  );
}
```

### Ejemplo completo: Todo con Server Actions

```tsx
// src/actions/todo-actions.ts
"use server";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

let todos: Todo[] = []; // Simulación de BD

export async function createTodo(formData: FormData) {
  const title = formData.get("title") as string;

  const newTodo: Todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
  };

  todos.push(newTodo);

  return { success: true, todo: newTodo };
}

export async function getTodos() {
  return todos;
}

export async function toggleTodo(id: string) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
  return { success: true };
}
```

```tsx
// src/app/todos/page.tsx
import { getTodos } from "@/actions/todo-actions";
import { TodoForm } from "@/components/todo-form";
import { TodoList } from "@/components/todo-list";

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <div>
      <h1>Mis Todos</h1>
      <TodoForm />
      <TodoList todos={todos} />
    </div>
  );
}
```

```tsx
// src/components/todo-form.tsx
import { createTodo } from "@/actions/todo-actions";

export function TodoForm() {
  return (
    <form action={createTodo}>
      <input
        name="title"
        placeholder="Nuevo todo"
        required
        className="border p-2"
      />
      <button type="submit" className="border bg-blue-500 p-2">
        Crear
      </button>
    </form>
  );
}
```

```tsx
// src/components/todo-list.tsx
"use client";
import { toggleTodo } from "@/actions/todo-actions";

type TodoListProps = {
  todos: Array<{ id: string; title: string; completed: boolean }>;
};

export function TodoList({ todos }: TodoListProps) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <button onClick={() => toggleTodo(todo.id)}>
            {todo.completed ? "☑️" : "☐"} {todo.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
```

#### 📝 Ejercicio

Crea un formulario de contacto usando Server Actions:

- [ ] Crea `src/actions/contact-actions.ts` con una función `sendContact` que
      reciba nombre, email y mensaje.
- [ ] Crea un componente `ContactForm` que use la Server Action con un `<form>`.
- [ ] Simula el envío mostrando un mensaje en consola del servidor.
- [ ] (Opcional) Añade validación del lado del cliente antes de enviar.

## Errores comunes

**❌ Olvidar `"use server"` en la función**

```tsx
// ❌ Incorrecto: no es una Server Action
export async function createTodo(title: string) {
  // Esta función intentará ejecutarse en el cliente
  console.log(title);
}
```

```tsx
// ✅ Correcto
"use server";

export async function createTodo(title: string) {
  // Ahora es una Server Action
  console.log(title);
}
```

**❌ No pasar `FormData` cuando usas forms**

```tsx
"use server";

// ❌ Incorrecto: no recibe FormData
export async function createTodo(title: string) {
  console.log(title);
}
```

```tsx
"use server";

// ✅ Correcto
export async function createTodo(formData: FormData) {
  const title = formData.get("title") as string;
  console.log(title);
}
```

## Caso de estudio

Revisa el archivo `src/components/use-server-action.ts` en tu proyecto:

- ¿Qué hace la función `onClickServer`?
- ¿Cómo la importarías y usarías en un componente?
- ¿Por qué tiene `"use server"`?

Intenta crear un botón que llame a esta función y observa los logs en la
terminal del servidor.

## Resumen de lo aprendido

- Las Server Actions son funciones asíncronas que se ejecutan en el servidor.
- Se marcan con `"use server"` para indicar que solo corren en el servidor.
- Se pueden usar en `<form action={...}>` o llamarlas directamente desde el
  cliente.
- Permiten evitar crear archivos de API Route manualmente.
- Son type-safe y se integran perfectamente con TypeScript.

## Recursos

- Documentación de Server Actions:
  [link](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- Formularios con Server Actions:
  [link](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#forms)
