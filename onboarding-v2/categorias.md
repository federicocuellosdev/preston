# Categorías de público objetivo — Preston

**Rol de este documento:** catálogo de perfiles con los requisitos de calificación y la documentación que corresponde a cada uno. Es la fuente de verdad de **qué se le pide a cada categoría**.

**Cómo se usa en el flujo:** la lógica del recorrido del usuario (qué pregunta se hace primero, cómo se ramifica según respuestas, en qué paso se pide cada dato) vive en [flujo.md](flujo.md). Este archivo solo responde a la pregunta *"si el lead cae en la categoría X, ¿qué necesita?"*.

Fuente: documento de contexto del agente IA (v3, mayo 2026) con las observaciones de Sergio Suarez incorporadas.

---

## Empleados públicos

### Universidad Nacional de Rosario (UNR)
- **Estado:** Suspendido temporalmente (no operar hasta reactivación).
- **Sub-categoría CRM:** `UNR`.
- **Requisitos (cuando se reactive):**
  1. Confirmar que es empleado/a de la UNR.
  2. Últimos 3 recibos de sueldo (PDF o imagen).

### Provincia de Santa Fe
- **Estado:** Activo.
- **Sub-categoría CRM:** `PUBLICO-SF`.
- **Requisitos:**
  1. Últimos 3 recibos de sueldo (PDF o imagen).

### Municipalidades y comunas de la Provincia de Santa Fe (excepto Rosario)
- **Estado:** Activo.
- **Sub-categoría CRM:** `MUNIC-SF`.
- **Regla de banco:** solo aptos.
  - Banco de Santa Fe
  - Banco Municipal de Rosario (BMR)
- **Requisitos:**
  1. Confirmar municipalidad/comuna específica.
  2. Preguntar banco de haberes.
  3. Si banco apto, solicitar:
     - Último recibo de sueldo (PDF o imagen).
     - Movimientos bancarios de los últimos 2 meses con las últimas 2 acreditaciones de sueldo (PDF o ticket de cajero).
     - Si figuran pagos a tarjeta de crédito, último resumen de la tarjeta.
  4. Si banco no apto: no hay línea disponible.

### Municipalidad de Rosario
- **Estado:** Activo.
- **Sub-categoría CRM:** `MUNIC-ROSARIO`.
- **Requisitos:**
  1. Últimos 3 recibos de sueldo (PDF o imagen).

### Gobierno de la Ciudad de Buenos Aires
- **Estado:** Activo.
- **Sub-categoría CRM:** `PUBLICO-CABA`.
- **Requisitos:**
  1. Últimos 3 recibos de sueldo (PDF o imagen).

### Provincia de Chubut
- **Estado:** Activo.
- **Sub-categoría CRM:** `PUBLICO-CHUBUT`.
- **Alcance:** provincial + municipales (habilitadas según Sergio).
- **Requisitos:**
  1. Confirmar jurisdicción (provincial o municipal chubutense; no empresa privada).
  2. Últimos 3 recibos de sueldo (PDF o imagen).

### Provincia de Entre Ríos
- **Estado:** Activo.
- **Sub-categoría CRM:** `PUBLICO-ER`.
- **Requisitos:**
  1. Últimos 3 recibos de sueldo (PDF o imagen).

---

## Fuerzas de Seguridad y Defensa Nacionales — Activos

### Gendarmería Nacional Argentina (GNA)
- **Estado:** Activo.
- **Sub-categoría CRM:** `FFSS-ACTIVO` + tag `GENDARMERIA`.
- **Requisitos:**
  1. Confirmar que es específicamente GNA.
  2. Preguntar: "¿Conocés cuál es tu disponible por Decreto 14/12?" (aplica sólo a GNA por la modalidad vieja, vigente por esta semana).
  3. Número de DNI (a validar contra el formulario).

### Policía Federal Argentina (PFA) — activos
- **Estado:** Activo.
- **Sub-categoría CRM:** `FFSS-ACTIVO` + tag `POLICIA FEDERAL`.
- **Requisitos:**
  1. Confirmar institución.
  2. Preguntar: "¿Conocés cuál es tu disponible por Decreto 352/2026?"
  3. Número de DNI (a validar contra el formulario).

### Ejército Argentino — activos
- **Estado:** Activo.
- **Sub-categoría CRM:** `FFSS-ACTIVO` + tag `EJERCITO`.
- **Requisitos:**
  1. Confirmar institución.
  2. Preguntar: "¿Conocés cuál es tu disponible por Decreto 352/2026?"
  3. Número de DNI (a validar contra el formulario).

### Armada Argentina — activos
- **Estado:** Activo.
- **Sub-categoría CRM:** `FFSS-ACTIVO` + tag `ARMADA`.
- **Requisitos:**
  1. Confirmar institución.
  2. Preguntar: "¿Conocés cuál es tu disponible por Decreto 352/2026?"
  3. Número de DNI (a validar contra el formulario).

### Fuerza Aérea Argentina — activos
- **Estado:** Activo.
- **Sub-categoría CRM:** `FFSS-ACTIVO` + tag `FUERZA AEREA`.
- **Requisitos:**
  1. Confirmar institución.
  2. Preguntar: "¿Conocés cuál es tu disponible por Decreto 352/2026?"
  3. Número de DNI (a validar contra el formulario).

### Servicio Penitenciario Federal (SPF) — activos
- **Estado:** Activo.
- **Sub-categoría CRM:** `FFSS-ACTIVO` + tag `PENITENCIARIA`.
- **Requisitos:**
  1. Confirmar institución.
  2. Preguntar: "¿Conocés cuál es tu disponible por Decreto 352/2026?"
  3. Número de DNI (a validar contra el formulario).

### Policía de Seguridad Aeroportuaria (PSA) — activos
- **Estado:** Activo (según observación de Sergio: "PSA TENEMOS").
- **Sub-categoría CRM:** `FFSS-ACTIVO` + tag PSA (a crear).
- **Requisitos:**
  1. Confirmar institución.
  2. Preguntar: "¿Conocés cuál es tu disponible por Decreto 352/2026?"
  3. Número de DNI (a validar contra el formulario).

### No incluidas (activos)
- **Estado:** No aplica.
- Prefectura Naval Argentina (PNA).
- Policías provinciales.

---

## Fuerzas de Seguridad — Retirados / Jubilados / Pensionados

### Policía Federal Argentina (PFA) — retirados, jubilados o pensionados
- **Estado:** Activo.
- **Sub-categoría CRM:** `FFSS-RETIRADO` + tag `POLICIA FEDERAL`.
- **Requisitos:**
  1. Confirmar que cobra por la Caja de Retiros, Jubilaciones y Pensiones de la PFA.
  2. Preguntar: "¿Conocés cuál es tu disponible de afectación?"
  3. Último recibo de sueldo (PDF o imagen).

### Retirados de otras fuerzas que cobran por Caja de Retiros de PFA
- **Estado:** Activo.
- **Sub-categoría CRM:** `FFSS-RETIRADO` + tag de la fuerza correspondiente.
- **Regla clave (Sergio):** la Caja de Retiros PFA incluye a retirados de FFSS varias; se les puede vender si cobran ahí.
- **Requisitos:**
  1. Primero pedir el recibo para confirmar que la caja pagadora es la de la PFA.
  2. Si confirma, seguir el flujo de PFA: disponible de afectación + recibo.
  3. Si no cobra por esa caja, no hay línea disponible.

### No incluidos (retirados)
- **Estado:** No aplica.
- Retirados de Gendarmería que cobran por caja distinta a PFA.
- Retirados de PSA con caja distinta.
- Retirados de Prefectura, Armada, Ejército, Fuerza Aérea, policías provinciales, cuando no cobran por Caja de Retiros PFA.

---

## Jubilados y pensionados

### Provincia de Santa Fe
- **Estado:** Activo.
- **Sub-categoría CRM:** `JUBILADO-SF`.
- **Requisitos:**
  1. Últimos 3 recibos (PDF o imagen).

### Provincia de Entre Ríos (jubilados/pensionados)
- **Estado:** Activo.
- **Sub-categoría CRM:** `PUBLICO-ER` (misma que empleados públicos ER).
- **Requisitos:**
  1. Últimos 3 recibos (PDF o imagen).

### ANSES (jubilados y pensionados nacionales)
- **Estado:** Activo.
- **Sub-categoría CRM:** `JUBILADO-ANSES`.
- **Regla de banco:** solo aptos.
  - Banco de Santa Fe
  - Banco Municipal de Rosario (BMR)
- **Requisitos:**
  1. Antes de pedir documentación, preguntar: "¿En qué banco cobrás tus haberes?"
  2. Si banco apto, solicitar:
     - Último recibo de sueldo (PDF o imagen).
     - Movimientos bancarios de los últimos 2 meses con las 2 últimas acreditaciones (PDF o ticket de cajero).
     - Si figuran pagos a tarjeta de crédito, último resumen de la tarjeta.
  3. Si banco no apto: derivar al link de yafue (no rechazo genérico).

---

## Reglas transversales

- **Verificación obligatoria de institución específica.** Nunca asumir por respuesta genérica ("trabajo en seguridad", "soy estatal"). Repreguntar hasta confirmar el organismo exacto.
- **DNI:** cuando corresponde, se solicita el número escrito (no imagen) para validar contra el formulario del onboarding.
- **Documentación uno por uno:** el agente pide un documento por mensaje, confirma recepción, luego pide el siguiente.
- **No prometer:** ni aprobación, ni montos, ni tasas, ni plazos.
- **Cuando el lead no califica:** enviar mensaje de "no hay línea disponible" (excepto ANSES banco no apto → link yafue) y finalizar la conversación. No transferir a humano.

---

## Sub-categorías CRM vigentes (tags actuales del embudo)

Etiquetas presentes hoy en el pipeline "Embudo de ventas" (8704063) con volumen relevante:

| Tag CRM | Perfil |
|---|---|
| `PUBLICO-SF` | Empleado público Prov. Santa Fe |
| `PUBLICO-CABA` | Empleado público CABA |
| `PUBLICO-ER` | Empleado público / jubilado Entre Ríos |
| `PUBLICO-CHUBUT` | Empleado público Chubut (provincial + municipal) |
| `MUNIC-SF` | Empleado municipal Santa Fe (excepto Rosario) |
| `MUNIC-ROSARIO` | Empleado Municipalidad de Rosario |
| `UNR` | Empleado UNR (suspendido) |
| `FFSS-ACTIVO` | Fuerzas de seguridad y armadas nacionales activas |
| `FFSS-RETIRADO` | Retirados/jubilados/pensionados fuerzas (Caja de Retiros PFA) |
| `JUBILADO-SF` | Jubilado provincia Santa Fe |
| `JUBILADO-ANSES` | Jubilado/pensionado ANSES |
| `GENDARMERIA`, `POLICIA FEDERAL`, `EJERCITO`, `ARMADA`, `FUERZA AEREA`, `PENITENCIARIA` | Sub-institución (aplicada a mano hoy) |
