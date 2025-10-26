# Glosario

## Tecnologías Base

- **React.js**: Biblioteca de JavaScript desarrollada por Facebook para
  construir interfaces de usuario (UI) mediante componentes reutilizables.
  Permite crear aplicaciones interactivas y dinámicas de manera declarativa.

- **Next.js**: Framework de React que simplifica el desarrollo de aplicaciones
  web con funcionalidades como Server-Side Rendering (SSR), routing automático
  basado en archivos, y optimizaciones de rendimiento. Facilita crear
  aplicaciones full-stack.

- **TypeScript**: Superset de JavaScript que añade tipos estáticos. Proporciona
  mejor autocompletado, detección temprana de errores, y documentación implícita
  del código.

## Arquitectura y Conceptos Fundamentales

- **Frontend**: Parte de una aplicación que se ejecuta en el navegador del
  usuario. Incluye la interfaz visual, la lógica de presentación, y las
  interacciones del usuario (clicks, formularios, etc.).

- **Backend**: Parte de una aplicación que se ejecuta en el servidor. Maneja la
  lógica de negocio, acceso a bases de datos, autenticación, y procesamiento de
  datos que no debe exponerse al cliente.

- **Servidor**: Ordenador o programa que proporciona recursos, servicios o datos
  a otros programas o dispositivos (clientes). En web, el servidor maneja
  peticiones HTTP y responde con HTML, JSON, etc.

- **Cliente**: Dispositivo o aplicación que solicita recursos a un servidor. En
  el contexto web, es el navegador del usuario que consume el frontend de la
  aplicación.

- **Open Source**: Software cuyo código fuente está disponible públicamente.
  Cualquier persona puede ver, modificar y distribuir el código bajo licencias
  específicas (React y Next.js son open source).

- **API**: Conjunto de reglas y contratos que permiten que aplicaciones se
  comuniquen entre sí. En web, suele referirse a interfaces HTTP expuestas por
  el backend para acceder a datos u operaciones. También puede referirse a APIs
  del navegador (p. ej., `localStorage`, `fetch`).

- **Endpoint**: URL específica dentro de una API que representa una operación o
  recurso concreto (p. ej., `GET /api/users`, `POST /api/login`). Los endpoints
  suelen versionarse (p. ej., `/api/v1/...`) y definen el método, ruta y el
  formato de la solicitud y respuesta.

## Componentes y Renderizado

- **Componente**: Bloque básico de reutilización en React. Es una función o
  clase que describe cómo debe verse y comportarse una parte de la UI. Un
  componente devuelve JSX que describe elementos del DOM.

- **Server Component**: Componente de React que se ejecuta exclusivamente en el
  servidor de Next.js. Genera HTML estático que se envía al cliente, sin enviar
  JavaScript adicional. No puede usar hooks ni eventos del navegador. Es el tipo
  por defecto en Next.js 13+.

- **Client Component**: Componente de React que se ejecuta en el navegador.
  Requiere JavaScript para funcionar y puede usar hooks (`useState`,
  `useEffect`), eventos (`onClick`, `onChange`), y APIs del navegador. Se marca
  con la directiva `"use client"`.

- **Hidratación**: Proceso donde React "reactiva" el HTML mockup que viene del
  servidor añadiendo la lógica JavaScript necesaria para hacerlo completamente
  interactivo en el navegador.

- **Renderizado**: Proceso de convertir componentes React en elementos del DOM
  que el navegador puede mostrar. Incluye la generación de HTML y la aplicación
  de estilos.

- **Bundle**: Archivo JavaScript compilado que contiene todo el código necesario
  de una aplicación (o parte de ella). Los bundlers como Webpack o Turbopack
  unen los módulos y optimizan el código.

## Hooks de React

- **Hook**: Función especial de React que permite "conectar" funcionalidades al
  sistema de gestión de estado y ciclo de vida de React. Los hooks deben usarse
  dentro de componentes funcionales o en otros hooks personalizados.

- **useState**: Hook que permite añadir estado a un componente funcional.
  Retorna un array con el valor del estado y una función para actualizarlo.
  Cuando el estado cambia, React re-renderiza el componente.

- **useEffect**: Hook que permite ejecutar código después del renderizado del
  componente. Se usa para efectos secundarios como llamadas a APIs,
  suscripciones, o manipulación del DOM. Puede incluir una función de limpieza.

## Next.js Routing

- **Enrutamiento**: Mecanismo que determina qué componente o página mostrar
  basándose en la URL actual. En Next.js 13+, el enrutamiento es automático
  basado en la estructura de carpetas.

- **App Router**: Sistema de routing de Next.js 13+ basado en la estructura de
  archivos en la carpeta `src/app/` o `app/`. Cada carpeta representa una ruta y
  los archivos especiales (`page.tsx`, `layout.tsx`) definen el contenido.

- **Link**: Componente de Next.js que permite navegar entre páginas sin recargar
  completamente la página (Single Page Application). Es preferible usar `Link`
  en lugar de etiquetas `<a>` para mejor rendimiento.

- **useRouter**: Hook de Next.js que proporciona métodos para navegación
  programática. Útil para navegar después de acciones del usuario, como submit
  de formularios o validaciones.

- **usePathname**: Hook de Next.js que retorna la ruta actual de la página (ej:
  `/about` o `/products/123`). Útil para identificar la página activa y aplicar
  estilos condicionales.

## Directivas y Server Actions

- **'use client'**: Directiva que debe colocarse al inicio de un archivo para
  indicar que el componente necesita ejecutarse en el cliente. Requerida cuando
  se usan hooks, eventos, o APIs del navegador.

- **'use server'**: Directiva que marca funciones para ejecutarse exclusivamente
  en el servidor. Se usa principalmente para Server Actions, permitiendo crear
  endpoints de API de forma declarativa sin archivos de rutas separados.

- **Server Action**: Función marcada con `"use server"` que puede ser llamada
  directamente desde componentes client. Next.js automáticamente crea un
  endpoint que maneja estas llamadas, reduciendo la necesidad de crear rutas API
  manualmente.

## Estado y Datos

- **Estado (State)**: Información que puede cambiar durante la vida de un
  componente y que afecta al renderizado. En React, el estado debe actualizarse
  usando la función `set` del `useState` para provocar re-renders.

- **Props**: Datos que se pasan de un componente padre a uno hijo. Son
  inmutables y permiten comunicación entre componentes. Es la forma principal de
  compartir información en React.

- **Children**: Prop especial en React que representa el contenido colocado
  entre las etiquetas de apertura y cierre de un componente. Permite composición
  flexible de componentes.

## Context y Patrones

- **Context API**: Característica de React que permite compartir datos entre
  componentes sin necesidad de pasar props manualmente por cada nivel de la
  jerarquía. Útil para temas globales, autenticación, o configuración.

## Sintaxis y Conceptos de JavaScript

- **Arrow Function (Función Flecha)**: Forma abreviada de escribir funciones en
  JavaScript usando la sintaxis `() => {}`. Muy utilizada en React para
  callbacks y funciones en línea.

- **DOM (Document Object Model)**: Representación en forma de árbol de objetos
  que el navegador crea del documento HTML. Permite a JavaScript acceder,
  modificar y manipular elementos, atributos y contenido de una página web.
  React actualiza eficientemente el DOM cuando los componentes cambian.

- **JSX**: Extensión de sintaxis de JavaScript que permite escribir HTML dentro
  de código JavaScript. React lo convierte en llamadas a funciones que crean
  elementos del DOM.

- **localStorage**: API del navegador que permite almacenar datos de forma
  persistente en el cliente. Los datos se mantienen incluso después de cerrar el
  navegador. Solo puede almacenar strings.

- **Promise**: Objeto de JavaScript que representa un valor que puede estar
  disponible ahora, en el futuro o nunca. Se usa para manejar operaciones
  asíncronas (como peticiones HTTP). Una Promise puede tener tres estados:
  `pending`, `fulfilled` (resuelta), o `rejected` (rechazada). Se combina con
  `.then()`/`.catch()` o con `async/await`.

## Renderizado y Optimización

- **First Paint**: Primer momento en que el navegador muestra contenido visual
  en la pantalla. Un First Paint rápido mejora la percepción de rendimiento.

- **Re-render**: Proceso de volver a ejecutar la función del componente y
  comparar el resultado anterior con el nuevo para actualizar solo las partes
  del DOM que cambiaron.
