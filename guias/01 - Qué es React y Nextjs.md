# ¿Qué es React y qué es Next.js?

Es importante diferenciar estas dos herramientas para saber cuándo usamos
características de una y cuándo de la otra.

- React es una biblioteca de JavaScript para construir interfaces de usuario
  (UI). Se centra en cómo se ve y comporta la interfaz en la pantalla.
- Next.js es un framework que usa React, y le añade un set de herramietas y
  estructura que facilita el desarrollo de apliaciones de React.

En otras palabras:

- React es el motor de la interfaz.
- Next.js es todo lo demás que te permite conducir.

## Estructura básica del proyecto (App Router)

- `src/app/layout.tsx`: envoltorio común de la aplicación
- `src/app/page.tsx`: página principal en la ruta `/`

## Comandos básicos

```bash
# Entorno de desarrollo, se actualiza cada vez que haces un cambio en código
npm run dev

# Compilar para producción
npm run build

# Para previsualizar cómo se vería la aplicación después de compilar
npm run start
```

## ¿Cómo podemos crear un proyecto desde cero?

Para ello los mejor es utilizar el comando de la documentación oficial
([link](https://nextjs.org/docs/app/getting-started/installation))

```
npx create-next-app@latest my-app
```
