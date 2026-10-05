# Jev AI

A browser-based interface for making structured decisions with Jev through Pollinations.

> **🌐 README:** [🇬🇧 EN](README.md) · [🇷🇺 RU](README.ru.md) · [🇨🇳 中文](README.zh.md) · [🇪🇸 ES](README.es.md) · [🇫🇷 FR](README.fr.md) · [🇩🇪 DE](README.de.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇵🇹 PT](README.pt.md) · [🇮🇹 IT](README.it.md) · [🇸🇦 العربية](README.ar.md)
Jev is TypeSafe AI's first **System One** model. Unlike a traditional chat-oriented LLM, Jev is designed to return **typed, machine-consumable decisions** rather than free-form text. You provide application state and typed questions; Jev returns structured answers such as choices, scores, and yes/no probabilities, with confidence information where supported.

> **Note:** This repository is an independent client interface. It is not the official TypeSafe AI product or website.

## What is Jev?

TypeSafe AI positions Jev as a decision model for software automation. The core idea is simple: **decisions, not strings**.

Instead of asking a generative model to write an answer and then parsing that text, an application can define the answer shape in advance. Jev evaluates the supplied state against those typed questions and returns structured results that application code can consume directly. TypeSafe AI describes its training approach as **Reinforcement Learning for Calibrated Decisions (RLCD)**.

Typical use cases include:

- **Classification** — route requests, tickets, or events to a predefined category.
- **Scoring** — estimate urgency, risk, quality, or another ordered value.
- **Binary decisions** — evaluate yes/no conditions as probabilities.
- **Agent guardrails** — check whether an automated action should proceed or require review.
- **Model routing** — decide which model or workflow should handle a task.
- **Task triage** — turn application state into decisions that existing code can act on.

Jev is not intended to replace general-purpose language models for writing, summarization, or open-ended conversation. Its role is narrower: make repeatable, structured decisions that software can use.

## About this project

**Jev AI** is a lightweight static web application that provides a browser interface for Jev inference through Pollinations.

The app lets you:

1. connect a Pollinations account or provide a personal API token;
2. enter application context;
3. define structured questions;
4. run Jev inference;
5. inspect returned decisions, confidence, and distributions.

Everything runs in the browser. There is no build system or package installation required.

## Run locally

The project is plain HTML, CSS, and JavaScript.

```sh
python3 -m http.server 8000
```

Then open:

```
http://localhost:8000
```

Authentication and inference are handled through Pollinations APIs from the browser. Never commit or share personal API tokens.

## Project structure

- `index.html` — application markup and interface
- `styles.css` — visual design, responsive layout, and accessibility polish
- `app.js` — OAuth flow, token handling, Pollinations integration, and Jev inference
- `assets/pollinations-logo-light.png` — Pollinations branding asset

## Credits & references

The description of Jev in this README is based on TypeSafe AI's public materials and documentation.

- TypeSafe AI — https://typesafe.ai/
- Introducing System One Models & Jev — https://typesafe.ai/blog/introducing-system-one-models-and-jev
- Jev overview — https://typesafe-jev.com/en/about/

Pollinations provides the API layer used by this project.

---

**Jev AI** is an independent community project and is not affiliated with or endorsed by TypeSafe AI unless explicitly stated otherwise.
