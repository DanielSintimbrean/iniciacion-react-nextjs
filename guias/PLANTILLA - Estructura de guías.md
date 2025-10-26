# Plantilla de guía — Iniciación a React y Next.js

Esta plantilla define la estructura y el estilo de todas las guías del módulo.

- Contexto del curso: React 18 + Next.js 16 (App Router) con TypeScript
- Convenciones de código:
  - Usar archivos bajo `src/app/` (App Router)
  - Indicar `"use client"` solo si el componente necesita estado/efectos/eventos
  - Priorizar Server Components cuando sea posible
  - Snippets breves y ejecutables en TSX

---

## Estructura de la guía

Cada guía debe seguir esta estructura básica:

### 1. Objetivo

- Descripción clara de qué sabrá hacer el alumno al terminar (1–2 frases)
- Criterios de éxito concretos en formato bullet points

**Ejemplo:**

```markdown
## Objetivo

- Crear y reutilizar componentes para NO tener que copiar y pegar el mismo HTML
  en 50 lugares; lo creas una vez y lo reutilizas sin repetir código.
```

### 2. Conceptos

Esta es la sección principal donde se explica el contenido. Puede tener
múltiples subsecciones según la complejidad del tema:

- **Título principal del concepto** usando `###`
- **Explicación** con palabras simples y analogías
- **Ejemplo de código** inline cuando sea necesario
- **Ejercicios** usando `#### 📝 Ejercicio` con tareas marcables

**Estructura de subsección de concepto:**

```markdown
### Nombre del Concepto

Explicación simple del concepto con analogías... Puedes incluir múltiples
párrafos aquí.

#### 📝 Ejercicio

- [ ] Tarea 1: Descripción clara
- [ ] Tarea 2: Descripción clara
- [ ] Tarea 3: Descripción clara
```

**Nota:** Puedes agregar bloques `> [!NOTE]` para información adicional
importante.

### 3. Errores comunes

Lista los errores más frecuentes con ejemplos de código incorrecto vs correcto:

**❌ Descripción del error**

```tsx
// ❌ Incorrecto: explicación
function Ejemplo() {
  // código incorrecto
}

// ✅ Correcto: explicación
function Ejemplo() {
  // código correcto
}
```

### 4. Caso de estudio (opcional)

Si el concepto necesita un ejemplo más complejo o real, inclúyelo aquí:

- Ejemplos de implementación en UI reales
- Diferentes formas de implementar el mismo concepto
- Usa bloques `<details>` para código extenso que se puede contraer

### 5. Resumen / Recap

Resumen de lo que el alumno ha aprendido (3–5 bullets):

```markdown
## Resumen de lo aprendido

- Logro 1: Descripción
- Logro 2: Descripción
- Logro 3: Descripción
```

**Alternativa:** Usar "Recap" si se conecta mejor con el contexto:

```markdown
## Recap

- Aprendiste a hacer X
- Creaste Y
- Ahora puedes construir Z
```

### 6. Recursos

Enlaces a documentación oficial y recursos relevantes:

```markdown
## Recursos

- Documentación oficial sobre [tema]: `https://es.react.dev/ruta-relevante`
```

---

## Convenciones de código

### Snippets de código

- Usa bloques de código TypeScript con `tsx` syntax highlighting
- Los snippets deben ser ejecutables en un proyecto Next.js estándar
- Siempre muestra el código incorrecto primero con `❌`, luego el correcto con
  `✅`

### Comentarios en código

- Usa comentarios para explicar qué hace cada parte
- Mantén el código claro y autodocumentado
- Evita jerga técnica innecesaria

### Notas importantes

Usa bloques de llamada Markdown para notas importantes:

```markdown
> [!NOTE]
>
> Información adicional importante que el estudiante debe saber.
```

---

## Ejemplo de estructura completa (basado en guías reales)

````markdown
# Título de la Guía

## Objetivo

- Objetivo principal en una frase
- Objetivo secundario si hay varios

## Conceptos

### Concepto Principal

Explicación con analogías y palabras simples...

```tsx
// Ejemplo de código mínimo ejecutable
```
````

#### 📝 Ejercicio

- [ ] Tarea práctica 1
- [ ] Tarea práctica 2

### Subtema Adicional (si es necesario)

Más explicaciones...

#### 📝 Ejercicio

- [ ] Otras tareas

## Errores comunes

**❌ Error frecuente**

```tsx
// ❌ Incorrecto: descripción
código_incorrecto;
```

```tsx
// ✅ Correcto: descripción
código_correcto;
```

## Caso de estudio (opcional)

Descripción del caso...

<details>
  <summary>Ver código del componente X</summary>

```tsx
código aquí
```

</details>

## Resumen de lo aprendido (o Recap)

- Logro 1
- Logro 2
- Logro 3

## Recursos

- Documentación oficial: `https://es.react.dev/ruta`

```

```
