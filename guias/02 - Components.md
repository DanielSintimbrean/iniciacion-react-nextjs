# Componentes

## Objetivo

- Crear y reutilizar componentes para NO tener que copiar y pegar el mismo HTML
  en 50 lugares; lo creas una vez y lo reutilizas sin repetir código.

## Conceptos

### Componente

Un componente es como una pieza LEGO reutilizable: la defines una vez y la usas
donde la necesites

**¿Cómo creamos nuestros primer componente?**

Un componente es una función que cumple 2 requisitos:

1. El nombre del componente debe empezar por mayúscula
2. Devolver un elemento (tag HTML o un componente)

```tsx
function UnComponente() {
  return <div>Mi primer componente</div>;
}

function ComponenteComplejo() {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Edad</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Ana</td>
          <td>28</td>
        </tr>
        <tr>
          <td>Carlos</td>
          <td>34</td>
        </tr>
      </tbody>
    </table>
  );
}
```

Para utilizar el componente lo llamas como si fuera una etiqueta HTML, pero
usando el nombre del componente que creaste (empezando con mayúscula).

Por ejemplo, si tienes los componentes `UnComponente` y `ComponenteComplejo`
definidos arriba, puedes usarlos así:

```tsx
export default function App() {
  return (
    <div>
      <UnComponente />
      <ComponenteComplejo />
    </div>
  );
}
```

Esto mostrará ambos componentes dentro de un `<div>`. Así puedes reutilizar
cualquier componente en los lugares que lo necesites, sin tener que copiar y
pegar el mismo código.

#### 📝 Ejercicio

- [ ] Crear el componente Button en `src/app/page.tsx`
- [ ] Mover el componente creado a su propio archivo para poder reutilizarlo más
      fácilmente (`src/components/button.tsx`)
- [ ] Importar Button en `src/components/page.tsx`

> [!NOTE]
>
> `<Button/>` y `<Button></Button>` es lo mismo escrito de dos formas distintas

## Errores comunes

**❌ No devolver un elemento JSX**

```tsx
// ❌ Incorrecto: falta el return
function Button() {
  <button>Mi primer botón</button>;
}

// ✅ Correcto: tiene un "return"
function Button() {
  return <button>Mi primer botón</button>;
}
```

**❌ Comenzar el nombre en minúscula**

```tsx
// ❌ Incorrecto: el nombre empieza en minúscula
function myButton() {
  return <button>Mi primer botón</button>;
}

// ✅ Correcto: el nombre empieza en mayúscula
function Button() {
  return <button>Mi primer botón</button>;
}
```

## Resumen de lo aprendido

- Creaste tu primer componente en React
- Utilizaste un componente desde otro achivo
- Ya puedes dividir tu interfaz en piezas reutilizables

## Recursos

- Documentación oficial de React sobre componentes:
  ()[https://es.react.dev/learn/your-first-component]
