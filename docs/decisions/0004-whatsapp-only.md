# 0004. Flujo WhatsApp-only sin carrito ni pasarela de pago

## Estado

Accepted

## Contexto

ReSirve es un marketplace de productos usados. La decisión central de producto es: ¿se implementa un flujo de e-commerce completo (carrito, checkout, pasarela de pago) o un flujo de contacto directo?

Factores considerados:
- El proyecto comienza como personal, con ~30 productos propios.
- No hay infraestructura de pagos configurada ni plan inmediato de monetización por comisión.
- El público objetivo en Argentina está altamente familiarizado con WhatsApp como canal de compra/venta informal.
- Implementar un checkout completo agregaría complejidad legal (términos de servicio, políticas de devolución, seguridad de pagos) sin beneficio claro en esta fase.

## Decisión

**No habrá carrito de compras, checkout ni pasarela de pago.**

El flujo de adquisición es exclusivamente contacto directo mediante WhatsApp. Cada producto tendrá un botón "Contactar" que abre una conversación de WhatsApp con el vendedor. El arreglo de pago y entrega ocurre fuera de la plataforma.

## Consecuencias

### Positivas

- **Simplicidad técnica**: no se integra MercadoPago, Stripe, ni ningún gateway de pagos.
- **Sin fricción para el comprador**: no necesita crear cuenta ni ingresar datos de tarjeta.
- **Cercanía humana**: el contacto directo refuerza la propuesta de valor de "productos con historia".
- **Sin responsabilidad legal de transacción**: la plataforma es un escaparate, no un intermediario comercial.

### Negativas

- **Sin monetización directa**: no se puede cobrar comisión por venta ni tarifa de publicación sin un sistema de pagos integrado.
- **Sin trazabilidad de transacciones**: no hay registro de qué productos se vendieron ni a quién.
- **Dependencia de WhatsApp**: si el vendedor no responde, no hay mecanismo de escrow ni mediación.
- **Escalabilidad limitada**: cuando el catálogo crezca a cientos de productos o múltiples vendedores, el flujo manual de WhatsApp puede saturarse.
