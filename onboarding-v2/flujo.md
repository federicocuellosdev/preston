# Flujo funcional — Onboarding Preston (v2)

Mapa de la experiencia del usuario dentro del onboarding, desde el ingreso hasta la creación del lead en Kommo y la entrega al equipo comercial.

Complementa a [categorias.md](categorias.md) (perfiles + requisitos por categoría).

---

## Estructura general

El recorrido tiene **3 pasos**:

1. **Categorización** — árbol de preguntas hasta identificar la categoría exacta.
2. **Datos personales comunes** — se piden a todos por igual (crea el lead en Kommo).
3. **Datos + documentación específicos** — dependen de la categoría (completan el lead).

Reglas de negocio:

- **El lead se crea al finalizar el Paso 2**, no al final del Paso 3. Si el usuario abandona en el Paso 3, el lead queda registrado con datos mínimos.
- **Los leads que abandonan el Paso 3 entran a una estrategia de remarketing** (WhatsApp, email, retargeting) para que vuelvan a completarlo. No se contactan directamente por un asesor humano en el primer intento — solo si el remarketing falla.
- **Persistencia local en el navegador.** Al finalizar el Paso 2 se guardan en `localStorage` los datos del lead (`lead_id`, categoría, sub-categoría, nombre, apellido, teléfono, DNI, timestamp). Si el usuario vuelve al onboarding:
  - Si ya tiene un `lead_id` guardado, saltea Pasos 1 y 2 y entra directo al Paso 3 en la categoría que le corresponde.
  - Si ya completó el Paso 3, se le muestra un mensaje "ya recibimos tu solicitud, un asesor te va a contactar" (sin re-crear el lead).
  - Fecha de expiración del `localStorage`: 30 días. Después de ese lapso el flujo arranca desde cero.

---

## Paso 1 — Categorización (árbol de decisión)

### Pregunta 1: Situación laboral
- Empleado → ir a **Rama A**
- Jubilado o Pensionado → ir a **Rama B**
- Otro → ir a **Rama C (YAFUE)**

---

### Rama A — Empleado

#### Pregunta A.1: ¿Dónde trabajás?

- **Fuerza de Seguridad o Defensa Nacional** → Pregunta A.2
- **Universidad** → Pregunta A.3
- **Empleado público provincial** → Pregunta A.4
- **Empleado municipal** → Pregunta A.5
- **Otro (empresa privada, monotributista, etc.)** → ir a **Rama C (YAFUE)**

#### Pregunta A.2: ¿A qué fuerza pertenecés?
_(Nota: acá es clave preguntar la fuerza específica porque el decreto cambia y hay fuerzas que no califican.)_

- Gendarmería Nacional (GNA) → categoría `FFSS-ACTIVO / GENDARMERIA` → **al Paso 2**
- Policía Federal Argentina (PFA) → categoría `FFSS-ACTIVO / POLICIA FEDERAL` → **al Paso 2**
- Ejército Argentino → categoría `FFSS-ACTIVO / EJERCITO` → **al Paso 2**
- Armada Argentina → categoría `FFSS-ACTIVO / ARMADA` → **al Paso 2**
- Fuerza Aérea → categoría `FFSS-ACTIVO / FUERZA AEREA` → **al Paso 2**
- Servicio Penitenciario Federal (SPF) → categoría `FFSS-ACTIVO / PENITENCIARIA` → **al Paso 2**
- Policía de Seguridad Aeroportuaria (PSA) → categoría `FFSS-ACTIVO / PSA` → **al Paso 2**
- Prefectura Naval Argentina → ir a **Rama C (YAFUE)**
- Policía provincial → ir a **Rama C (YAFUE)**

#### Pregunta A.3: ¿Qué universidad?
- Universidad Nacional de Rosario (UNR) → categoría `UNR` → **Fin temporal ("no disponible por ahora")**
- Otra → ir a **Rama C (YAFUE)**

#### Pregunta A.4: ¿Empleado público de qué provincia?
- Santa Fe → categoría `PUBLICO-SF` → **al Paso 2**
- CABA → categoría `PUBLICO-CABA` → **al Paso 2**
- Chubut → sub-pregunta: ¿provincial o municipal chubutense? → categoría `PUBLICO-CHUBUT` → **al Paso 2**
- Entre Ríos → categoría `PUBLICO-ER` → **al Paso 2**
- Otra → ir a **Rama C (YAFUE)**

#### Pregunta A.5: ¿En qué municipio trabajás?
- Municipalidad de Rosario → categoría `MUNIC-ROSARIO` → **al Paso 2**
- Otra municipalidad o comuna de Santa Fe → categoría `MUNIC-SF` → **al Paso 2**
- Municipal de otra provincia (excepto Chubut) → ir a **Rama C (YAFUE)**

---

### Rama B — Jubilado o Pensionado

#### Pregunta B.1: ¿De dónde cobrás tus haberes?

- ANSES → categoría `JUBILADO-ANSES` → **al Paso 2**
- Provincia → Pregunta B.2
- Fuerza de Seguridad (retirado/pensionado) → Pregunta B.3
- Otro → ir a **Rama C (YAFUE)**

#### Pregunta B.2: ¿De qué provincia sos jubilado/pensionado?
- Santa Fe → categoría `JUBILADO-SF` → **al Paso 2**
- Entre Ríos → categoría `PUBLICO-ER` → **al Paso 2**
- Otra → ir a **Rama C (YAFUE)**

#### Pregunta B.3: ¿De qué fuerza sos retirado/pensionado?
- Policía Federal Argentina (PFA) → categoría `FFSS-RETIRADO / POLICIA FEDERAL` → **al Paso 2**
- Otra fuerza (GNA, PSA, Prefectura, Armada, Ejército, FA, policía provincial) → Pregunta B.3.1

#### Pregunta B.3.1: ¿Cobrás tus haberes por la Caja de Retiros, Jubilaciones y Pensiones de la Policía Federal?
_(Regla clave: la Caja de Retiros PFA paga a retirados de varias fuerzas. Si cobra ahí, se puede vender.)_

- Sí → categoría `FFSS-RETIRADO / <fuerza>` → **al Paso 2**
- No / No sé → ir a **Rama C (YAFUE)**

---

### Rama C — YAFUE

Cubre a los leads que no encajan en las categorías de Preston pero pueden ser trabajados por la unidad de negocio **YAFUE**.

Estado: **pendiente de desarrollo.** Definir en una etapa posterior:
- Sub-preguntas / segmentación interna de YAFUE.
- Datos y documentación que requiere YAFUE.
- Handoff con esa unidad (pipeline propio en Kommo, tag `YAFUE`, etc.).

Hasta que se desarrolle, tratar como placeholder: capturar los datos comunes del Paso 2 con la categoría `YAFUE` y dejar el lead disponible para esa unidad.

---

## Paso 2 — Datos personales comunes

Se piden a **todos** los que llegan (independiente de la categoría). Al terminar este paso se **crea el lead en Kommo**.

Campos:
- Nombre
- Apellido
- Teléfono celular
- DNI (número escrito)

Al confirmar:
- POST al backend con `{ categoria, sub_categoria, nombre, apellido, telefono, dni }`.
- El backend crea el lead en Kommo (pipeline "Embudo de ventas" 8704063, etapa inicial), asigna las etiquetas correspondientes y devuelve `lead_id`.
- El frontend guarda `lead_id` en `sessionStorage` para el Paso 3.

Fin del Paso 2: el usuario ya es lead. Sigue al Paso 3.

---

## Paso 3 — Datos + documentación específicos por categoría

Al confirmar, el frontend hace PATCH/POST al backend con `lead_id` + los datos nuevos. El backend enriquece el lead en Kommo (custom fields + adjuntos) y lo mueve a la etapa correspondiente.

### FFSS-ACTIVO / GENDARMERIA
1. Preguntar: ¿Conocés tu disponible por Decreto 14/12? (input numérico opcional)
2. Confirmar número de DNI del Paso 2 (solo lectura).
3. Enviar.

### FFSS-ACTIVO / POLICIA FEDERAL, EJERCITO, ARMADA, FUERZA AEREA, PENITENCIARIA, PSA
1. Preguntar: ¿Conocés tu disponible por Decreto 352/2026? (input numérico opcional)
2. Confirmar número de DNI del Paso 2.
3. Enviar.

### FFSS-RETIRADO / POLICIA FEDERAL (o cobra por Caja de Retiros PFA)
1. Preguntar: ¿Conocés tu disponible de afectación? (input numérico opcional)
2. Subir último recibo de sueldo (PDF o imagen).
3. Enviar.

### PUBLICO-SF, PUBLICO-CABA, PUBLICO-ER, MUNIC-ROSARIO, JUBILADO-SF
1. Subir últimos 3 recibos de sueldo (PDF o imagen).
2. Enviar.

### PUBLICO-CHUBUT
1. Confirmar jurisdicción: provincial o municipal.
2. Subir últimos 3 recibos de sueldo.
3. Enviar.

### MUNIC-SF (excepto Rosario)
1. Preguntar: ¿En qué banco cobrás tus haberes?
   - Banco de Santa Fe → seguir.
   - BMR → seguir.
   - Otro → derivar a **Rama C (YAFUE)**: el lead queda con tag `YAFUE` para que lo trabaje esa unidad de negocio.
2. Subir último recibo de sueldo.
3. Subir movimientos bancarios de los últimos 2 meses con las 2 últimas acreditaciones (PDF o ticket).
4. ¿Tenés pagos de tarjeta de crédito en esos movimientos? Sí/No.
   - Sí → subir último resumen de la tarjeta.
5. Enviar.

### JUBILADO-ANSES
1. Preguntar: ¿En qué banco cobrás tus haberes?
   - Banco de Santa Fe → seguir.
   - BMR → seguir.
   - Otro → derivar a **Rama C (YAFUE)**: el lead queda con tag `YAFUE` para que lo trabaje esa unidad de negocio.
2. Subir último recibo de sueldo.
3. Subir movimientos bancarios de los últimos 2 meses con las 2 últimas acreditaciones.
4. ¿Tenés pagos de tarjeta de crédito? Sí/No.
   - Sí → subir último resumen de la tarjeta.
5. Enviar.

### UNR
1. Mostrar: "En este momento la línea para UNR está suspendida. Cuando se reactive te vamos a contactar."
2. El lead se crea pero se marca como suspendido (no se pasa a etapa activa).

---

## Handoff bot IA ↔ equipo comercial

Actualmente el agente IA de WhatsApp (etapa "Testing AI") pregunta por chat todo lo que el onboarding v2 va a capturar de una. Con el flujo nuevo, el agente pierde parte de su rol.

Propuesta de intervención del bot:

| Momento | Rol del bot |
|---|---|
| Usuario completa Paso 2 pero abandona Paso 3 | Bot inicia conversación por WhatsApp para completar los datos faltantes del Paso 3. |
| Usuario completa Paso 3 entero por el web | Bot **no interviene**. Lead pasa directo a etapa "Leads calificados" (o la que defina el comercial). |
| Usuario responde por WhatsApp antes de entrar al onboarding web | Bot categoriza como hoy (v3) y crea el lead. |
| Documento subido en Paso 3 es ilegible | Bot pide reenvío por WhatsApp. |

Gate concreto: si el lead llegó a Kommo con **todos los datos + docs del Paso 3**, saltea IA y va directo a asesor humano. Si le falta cualquier dato específico, el bot IA intenta completarlo por WhatsApp antes de derivarlo.

---

## Info que recibe el equipo comercial al cierre

Al terminar el Paso 3 (o al terminar el Paso 2 si abandonó), el asesor comercial ve en Kommo:

### Custom fields del lead (siempre presentes)
- Categoría (`PUBLICO-SF`, `FFSS-ACTIVO`, etc.)
- Sub-categoría (`GENDARMERIA`, `POLICIA FEDERAL`, etc.) — cuando aplica
- Nombre, Apellido, Teléfono, DNI
- Estado del onboarding: `Paso 2 completo` / `Paso 3 completo` / `Derivado a YAFUE` / etc.

### Custom fields específicos por categoría
- **FFSS activos**: disponible por decreto (si el usuario lo cargó).
- **FFSS retirados**: disponible de afectación.
- **ANSES / MUNIC-SF**: banco de haberes.
- **MUNIC-SF / ANSES**: pagos de tarjeta detectados (Sí/No).

### Adjuntos
- Recibos de sueldo.
- DNI (si se pide en el flujo).
- Movimientos bancarios.
- Resumen de tarjeta (si corresponde).

### Etapa inicial en Kommo según cierre
- Paso 3 completo con toda la doc → etapa "Leads calificados".
- Paso 2 completo, Paso 3 incompleto → etapa "INGRESO" (bot IA intenta seguir por WhatsApp).
- No califica para Preston (banco no apto, fuerza no incluida, situación laboral fuera de perfil, etc.) → deriva a YAFUE con tag `YAFUE` + tag del motivo. Ningún lead se marca como "perdido" desde el onboarding.

---

## FAQ por perfil (placeholder)

Sección a completar con las dudas frecuentes que el equipo comercial recibe hoy, agrupadas por categoría. Sirve para:
- Alimentar la base de conocimiento del bot IA.
- Poblar tooltips o "más info" dentro del onboarding para bajar la tasa de abandono.

Categorías donde ya sabemos que hay fricción alta:
- ANSES banco no apto → hoy pierde muchos leads; con el flujo v2 pasa directo a YAFUE (sin fricción).
- FFSS retirados con caja distinta a PFA → el criterio no es intuitivo (fuerza vs caja pagadora).
- Chubut provincial vs municipal → ambos aptos pero requieren aclaración.
- Municipalidades SF ≠ Rosario → sumar aviso claro sobre bancos aptos antes de pedir docs.

---

## Resumen visual del flujo

```
┌─────────────────────────────────────────────┐
│ PASO 1 — Categorización                      │
│                                              │
│  Situación → Rama A / Rama B / Otro         │
│    ↓                                         │
│  Sub-preguntas hasta categoría específica    │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ PASO 2 — Datos comunes (siempre)             │
│                                              │
│  Nombre | Apellido | Teléfono | DNI          │
│                    ↓                         │
│         [ CREA LEAD EN KOMMO ]               │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ PASO 3 — Datos + docs específicos            │
│                                              │
│  Ramifica según categoría:                   │
│   - Banco (ANSES, MUNIC-SF)                  │
│   - Disponible por decreto (FFSS)            │
│   - Recibos, DNI, movimientos, resumen       │
│                    ↓                         │
│      [ ENRIQUECE LEAD + CAMBIA ETAPA ]       │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ HANDOFF                                      │
│                                              │
│  Todo OK → Asesor humano                     │
│  Faltan datos → Bot IA por WhatsApp          │
│  No califica Preston → Rama C (YAFUE)        │
└─────────────────────────────────────────────┘
```
