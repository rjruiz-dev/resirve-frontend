# 0005. Producto con narrativa de "Historia"

## Estado

Accepted

## Contexto

Los marketplaces tradicionales (Facebook Marketplace, OLX) presentan productos como transacciones frías: foto, precio, estado, descripción técnica. ReSirve busca diferenciarse en un mercado saturado.

Factores considerados:
- El nombre mismo del proyecto, "ReSirve", juega con la idea de "re-usar" y "servir de nuevo".
- Los objetos usados tienen un pasado que los hace únicos: una mochila que viajó por Europa, un sillón de la casa de los abuelos.
- La narrativa emocional aumenta el valor percibido y la conexión comprador-vendedor.
- Ya existe un campo y una sección "Historia del producto" en el `ProductDetailComponent`.

## Decisión

**Cada producto debe incluir una narrativa personal opcional pero prominentemente destacada.**

El vendedor se verá incentivado a contar la historia del objeto (origen, uso, por qué lo vende, anécdotas). Esta historia se mostrará en la página de detalle como contenido protagonista, no como un dato secundario.

## Consecuencias

### Positivas

- **Diferenciación clara**: ningún marketplace masivo pone la historia del objeto como eje central.
- **Valor emocional**: un producto con historia percibe mayor valor que uno sin contexto.
- **Confianza**: contar por qué se vende y cómo se usó reduce la desconfianza del comprador.
- **Contenido único**: las historias no pueden ser copiadas por competidores de forma automática.

### Negativas

- **Fricción para el vendedor**: escribir una historia requiere más tiempo que subir solo foto y precio.
- **Calidad variable**: algunas historias serán genéricas o mal escritas si no hay guía.
- **Escalabilidad del contenido**: con cientos de productos, generar historias atractivas a escala requiere herramientas (ver ADR 0006 sobre IA ghostwriter).
