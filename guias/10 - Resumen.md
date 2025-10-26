## Resumen de lo aprendido

### Base de React

- Componentes: crear y componer interfaces reutilizables
- Estado con `useState`: gestionar datos locales y actualizar la UI
- Sincronización con `useEffect`: reaccionar a cambios y obtener datos de fuera
  de React

### Navegación con Next.js

- App Router (file-based routing): rutas según la estructura de carpetas
- Segmentos dinámicos y parámetros: páginas con `[id]`
- Enlaces y navegación: `Link`, navegación programática y preservación de estado

### Server y Client Components

- Decidir qué va en servidor y qué en cliente para optimizar rendimiento
- Carga de datos en servidor: fetch en Server Components y render inicial

### Comunicación Cliente → Servidor

- Server Actions: ejecutar lógica de servidor desde el cliente sin API extra

### Compartir estado sin prop drilling

- Context API: crear un provider y envolver la app/secciones
- Consumo con `useContext`: acceder al estado y acciones desde cualquier nivel
- Evitar prop drilling: pasar menos props a través de múltiples niveles
