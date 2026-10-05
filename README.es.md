Jev AI

Una interfaz de navegador para tomar decisiones estructuradas con Jev mediante Pollinations.

## ¿Qué es Jev?

Jev es el primer modelo **System One** de TypeSafe AI, diseñado para devolver decisiones tipadas que el software puede consumir directamente, en lugar de texto libre. Recibe el estado de una aplicación y preguntas tipadas, y puede devolver elecciones, puntuaciones y probabilidades de decisiones binarias, junto con información de confianza cuando está disponible.

La idea central es **decisiones, no cadenas de texto**. En lugar de generar una respuesta y después analizarla, una aplicación puede definir de antemano la forma del resultado y usar directamente la decisión estructurada de Jev. TypeSafe AI describe su enfoque de entrenamiento como **Reinforcement Learning for Calibrated Decisions (RLCD)**.

Usos habituales:
- **Clasificación** — asignar solicitudes, tickets o eventos a categorías.
- **Puntuación** — estimar urgencia, riesgo o calidad.
- **Decisiones binarias** — evaluar condiciones de sí/no como probabilidades.
- **Protecciones para agentes** — comprobar si una acción automática debe continuar o revisarse.
- **Enrutamiento de modelos** — elegir un modelo o flujo de trabajo.
- **Triage** — convertir el estado de una aplicación en decisiones utilizables por el código.

Jev tiene un propósito más específico que un LLM general: producir decisiones estructuradas y repetibles que el software pueda utilizar.

## Sobre este proyecto

**Jev AI** es una aplicación web estática y ligera que proporciona una interfaz de navegador para la inferencia de Jev mediante Pollinations.

Permite conectar una cuenta de Pollinations o usar un token personal, introducir contexto, definir preguntas estructuradas, ejecutar Jev y revisar las decisiones, la confianza y las distribuciones devueltas.

Todo funciona en el navegador; no hay sistema de compilación ni dependencias npm.

## Ejecución local

```sh
python3 -m http.server 8000
```

Abre `http://localhost:8000`.

La autenticación y la inferencia utilizan las API de Pollinations desde el navegador. Nunca publiques ni compartas tokens personales.

## Estructura

- `index.html` — interfaz y marcado
- `styles.css` — diseño, responsive y accesibilidad
- `app.js` — OAuth, tokens, integración con Pollinations e inferencia de Jev
- `assets/pollinations-logo-light.png` — recurso de marca de Pollinations

## Otros idiomas

[English](README.md) · [Русский](README.ru.md) · [中文](README.zh.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [العربية](README.ar.md)

## Fuentes

- https://typesafe.ai/
- https://typesafe.ai/blog/introducing-system-one-models-and-jev
- https://typesafe-jev.com/en/about/

**Jev AI** es un proyecto comunitario independiente y no está afiliado ni respaldado por TypeSafe AI salvo indicación expresa.