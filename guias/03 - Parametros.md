# Parámetros (o props)

## Objetivo

- Personalizar componentes mediante parámetros para que muestren o actúen
  distinto según valores proporcionados.
- Reutilizar un mismo componente con diferentes datos sin duplicar código

## Conceptos

### Parametros

Los parámetros (o props) son como los ingredientes de un componente; si a una
pizza le añades distintos ingredientes (parámetros), sigues teniendo una pizza,
pero con distinto contenido y apariencia.

Los componentes funcionan igual; si les pasas parámetros, puedes cambiar su
estilo y contenido.

Por ejemplo, un botón puede mostrar diferentes textos según lo que le pases:

```tsx
function Welcome({ name }: { name: string }) {
  return <h1>Hola, {name}!</h1>;
}
```

```tsx
<Welcome name="Ana" />    // =>  <h1>Hola, Ana!</h1>
<Welcome name="Carlos" /> // =>  <h1>Hola, Carlos!</h1>
<Welcome name="Lucía" />  // =>  <h1>Hola, Lucía!</h1>
```

#### Ejercicio

- [ ] Modificar el componente `Button` para aceptar un parámetro `text`
- [ ] Usar el parámetro `text` dentro del componente
- [ ] Llamar al componente con diferentes textos desde `page.tsx` Esto devolverá
      tres botones, cada uno con un texto distinto.

### Parámetros opcionales

Puedes hacer que algunos parámetros sean opcionales usando `?`:

```tsx
function NombreSpan({
  nombre,
  apellido,
}: {
  nombre: string;
  appellido?: string; // El ? en los parámetros hace que este sea opcional
}) {
  let nombreCompleto;

  // Si 'apellido' no existe solo utilizar 'nombre'
  if (appellido === undefined){
    nombreCompleto = nombre
  } else {
    // Si 'apellido' existe utilizar ambos
    nombreCompleto = nombre + " " + apellido
  }

  return <span>{nombreCompleto}</button>;
}
```

```tsx
// Usar con o sin el parámetro opcional
<NombreSpan nombre="Daniel" />
<NombreSpan nombre="John" apellido="Doe" />
```

#### 📝 Ejercicio

- [ ] Añade un propiedad `variant` al botón que sea de tipo `"gray" | "red"`
- [ ] El `className` del botón tiene que ser `bg-red-300` si `variant` es `red`,
      y `bg-slate-300` si es `gray`

### Children

A veces quieres que un componente sirva como envoltorio para otros elementos o
contenido (en vez de solo aceptar parámetros simples), puedes usar un parametro
especial en React llamado `children`.

Esto permite que el componente envuelva y muestre cualquier contenido que se le
coloque dentro de sus etiquetas.

Por ejemplo:

> [!NOTE]
>
> El parametro children simpre va a ser de tipo `React.ReactNode`. Usar
> `React.ReactNode` permite que sea texto, elementos o cualquier contenido
> renderizable por React.

```tsx
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className={/* Unos estilos guapisimos que te has currado */}>
      {children}
    </div>
  );
}

// Se usa así:
<Card>
  <h2>Título</h2>
  <p>Este es el contenido dentro del componente Card.</p>
</Card>;
```

En este ejemplo, todo lo que pongas dentro de `<Card>...</Card>` estará
disponible como la prop `children` dentro del componente, y puedes renderizarlo
donde quieras dentro del markup del componente.

#### 📝 Ejercicio

- [ ] Sustituye el paramtro `text` del botón por children
- [ ] Actulizar los `Button` de `page.tsx`

## Errores comunes

**❌ No desestructurar los parámetros correctamente**

```tsx
// ❌ Incorrecto: recibir el valor directamente y no como parámetro
function Button(text: string) {
  return <button>{text}</button>; // ❌ Error: text no es un prop, es un valor directo
}

// ✅ Correcto: recibir el parámetro y desestructurarlo
function Button({ text }: { text: string }) {
  return <button>{text}</button>;
}
```

**❌ Modificar los parámetros directamente**

```tsx
// ❌ Incorrecto: nunca modificar props directamente
function Button({ text }: { text: string }) {
  text = "Nuevo texto"; // ❌ Error: los props son de solo lectura
  return <button>{text}</button>;
}

// ✅ Correcto: usar los props tal como se reciben
function Button({ text }: { text: string }) {
  return <button>{text}</button>;
}
```

**❌ Pasar children como parámetro en vez de contenido**

```tsx
// ❌ Incorrecto: pasar children como prop HTML en lugar de como contenido
<Button children="Hola" />

// ✅ Correcto: pasar children como contenido entre las etiquetas del componente
<Button>Hola</Button>
```

### ❌ No definir el tipo de `children` como `React.ReactNode`

```tsx
// ❌ Incorrecto: definir children solo como string
function Card({ children }: { children: string }) {
  return <div>{children}</div>;
}

// ✅ Correcto: definir children como React.ReactNode
function Card({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
```

## Caso de estudio

### Diferentes formas de definir los tipos de props en un componente

#### 1. Definición directa (inline) en los parámetros

```tsx
function Alerta({
  mensaje,
  tipo,
}: {
  mensaje: string;
  tipo: "info" | "error";
}) {
  return (
    <div>
      {tipo}: {mensaje}
    </div>
  );
}
```

#### 2. Definiendo primero un `type` y luego usándolo en el componente

```tsx
type AlertaProps = {
  mensaje: string;
  tipo: "info" | "error";
};

function Alerta(props: AlertaProps) {
  return (
    <div>
      {props.tipo}: {props.mensaje}
    </div>
  );
}

// También puedes usar destructuración usando el type:
function Alerta({ mensaje, tipo }: AlertaProps) {
  return (
    <div>
      {tipo}: {mensaje}
    </div>
  );
}
```

### Ejemplo Post en X

Supongamos que creamos el siguiente componente

<p align="center">
  <img src="./media/x-post.png" alt="Ejemplo Post X" width="320" />
</p>

<details>
  <summary>Ver definición del componente <code>Post</code></summary>

```tsx
// Post.tsx
type PostProps = {
  author: {
    name: string;
    avatar: string;
    username: string;
    verified?: boolean;
  };
  createdAt: Date;
  content: string;
  likes: number;
  reposts: number;
  comments: number;
  saves: number;
  views: number;
};

function Post({
  author,
  createdAt,
  content,
  likes,
  reposts,
  comments,
  saves,
  views,
}: PostProps) {
  return (
    /** Código del componente */
    <div>{/* aquí iría la UI del post */}</div>
  );
}
```

</details>

<details>
  <summary>Ver ejemplo de uso del componente <code>Post</code></summary>

```tsx
<Post
  author={{
    name: "Next.js",
    avatar: "",
    username: "nextjs",
    verified: true,
  }}
  createdAt={new Date("2025-10-26T04:47:00")}
  content="Everything we shipped at Next.js Conf 🧵..."
  comments={12}
  reposts={30}
  likes={228}
  saves={53}
  views={22300}
/>
```

</details>

## Recap

- Aprendiste a pasar datos a componentes usando parámetros
- Creaste un mismo componente puede mostrar diferentes resultados según los
  parámetros
- Ahora puedes construir componentes que se adaptan a diferentes situaciones

## Recursos

- Documentación oficial de React sobre props:
  [](https://es.react.dev/learn/passing-props-to-a-component)
