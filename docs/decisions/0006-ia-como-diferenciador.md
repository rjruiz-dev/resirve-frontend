# 0006. IA como diferenciador central (ghostwriter y curador)

## Estado

Accepted

## Contexto

ReSirve compite por experiencia, no por volumen (ver ADR 0004 y 0005). La inteligencia artificial puede ser un diferenciador o un gimmick. La decisión es dónde y cómo usar IA para que genuinamente mejore la experiencia.

Factores considerados:
- La IA como chatbot de "atención al cliente genérico" no aporta valor diferencial; cualquier sitio puede integrarlo.
- La IA como motor de búsqueda semántica es útil pero no es único.
- El verdadero cuello de botella del modelo de negocio es que los vendedores NO quieren escribir historias (fricción alta) y los compradores NO saben qué buscar (descubrimiento bajo).
- Por lo tanto, la IA debe resolver exactamente esos dos problemas.

## Decisión

**Usar IA en dos roles específicos que amplifican la propuesta de valor de "historias":**

1. **Ghostwriter de historias**: Cuando un vendedor sube un producto, la IA le sugiere preguntas clave ("¿Dónde lo usaste?", "¿Por qué lo vendes?") y genera 3 variantes de copy cálido y humano. El vendedor elige, edita y publica.
2. **Curador visual para el comprador**: El comprador describe su espacio o sube una foto de su ambiente. La IA sugiere productos del catálogo que encajen estéticamente, explicando por qué cada uno combina.

**Queda EXPLÍCITAMENTE fuera del alcance**: chatbots genéricos de atención al cliente, búsqueda semántica sin contexto visual, y generación de imágenes de productos.

## Consecuencias

### Positivas

- **Reduce fricción del vendedor**: bajar la barrera para escribir historias de calidad.
- **Mejora descubrimiento**: el comprador encuentra productos que no sabía que buscaba.
- **Experiencia única**: la combinación de "historia + IA curadora" no existe en marketplaces tradicionales.

### Negativas

- **Dependencia de modelos de lenguaje**: requiere integración con API de IA (OpenAI, Google, etc.) con costos recurrentes.
- **Prompt engineering**: generar sugerencias de calidad requiere iterar prompts y validar outputs.
- **Riesgo de genericidad**: si la IA genera historias demasiado similares, pierden el valor de autenticidad humana.
- **Privacidad**: la foto del espacio del comprador no debe almacenarse ni usarse para entrenar modelos.
