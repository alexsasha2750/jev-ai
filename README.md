# Jev AI

A browser-based interface for making structured decisions with Jev through Pollinations.

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

## Languages / Языки / 言語

### English

Jev is TypeSafe AI's first System One model, built for fast, structured decisions that software can consume directly. Instead of generating free-form text, it evaluates application state against typed questions and returns structured decisions such as choices, scores, and probabilities. This project provides a browser-based interface for using Jev through Pollinations.

### Русский

Jev — первая модель **System One** от TypeSafe AI, созданная для быстрых структурированных решений, которые программное обеспечение может использовать напрямую. Вместо генерации произвольного текста модель получает состояние приложения и типизированные вопросы, а затем возвращает структурированные результаты: варианты выбора, оценки и вероятности. Этот проект предоставляет браузерный интерфейс для работы с Jev через Pollinations.

### 中文

Jev 是 TypeSafe AI 推出的第一款 **System One** 模型，专注于让软件直接使用快速、结构化的决策结果。与生成自由文本的传统语言模型不同，Jev 接收应用状态和类型化问题，并返回选择、评分以及概率等结构化结果。本项目通过 Pollinations 提供一个基于浏览器的 Jev 使用界面。

### Español

Jev es el primer modelo **System One** de TypeSafe AI, diseñado para tomar decisiones rápidas y estructuradas que el software puede utilizar directamente. En lugar de generar texto libre, Jev recibe el estado de una aplicación y preguntas tipadas, y devuelve resultados estructurados como opciones, puntuaciones y probabilidades. Este proyecto ofrece una interfaz web para utilizar Jev mediante Pollinations.

### Français

Jev est le premier modèle **System One** de TypeSafe AI, conçu pour produire des décisions rapides et structurées que les logiciels peuvent utiliser directement. Au lieu de générer du texte libre, Jev reçoit l'état d'une application et des questions typées, puis renvoie des résultats structurés tels que des choix, des scores et des probabilités. Ce projet fournit une interface web pour utiliser Jev via Pollinations.

### Deutsch

Jev ist das erste **System-One-Modell** von TypeSafe AI und wurde für schnelle, strukturierte Entscheidungen entwickelt, die Software direkt verwenden kann. Statt freien Text zu erzeugen, verarbeitet Jev den Anwendungszustand und typisierte Fragen und liefert strukturierte Ergebnisse wie Auswahlwerte, Scores und Wahrscheinlichkeiten. Dieses Projekt stellt eine browserbasierte Oberfläche für die Nutzung von Jev über Pollinations bereit.

### 日本語

Jev は TypeSafe AI が提供する最初の **System One** モデルで、ソフトウェアが直接利用できる高速かつ構造化された意思決定を目的としています。自由形式の文章を生成するのではなく、アプリケーションの状態と型付きの質問を受け取り、選択肢、スコア、確率などの構造化された結果を返します。このプロジェクトでは、Pollinations 経由で Jev を利用できるブラウザベースのインターフェースを提供します。

### 한국어

Jev는 TypeSafe AI의 첫 번째 **System One** 모델로, 소프트웨어가 직접 사용할 수 있는 빠르고 구조화된 의사결정을 제공하도록 설계되었습니다. 자유 형식의 텍스트를 생성하는 대신 애플리케이션 상태와 타입이 지정된 질문을 받아 선택, 점수, 확률과 같은 구조화된 결과를 반환합니다. 이 프로젝트는 Pollinations를 통해 Jev를 사용할 수 있는 브라우저 기반 인터페이스를 제공합니다.

### Português

Jev é o primeiro modelo **System One** da TypeSafe AI, criado para decisões rápidas e estruturadas que podem ser consumidas diretamente por software. Em vez de gerar texto livre, Jev recebe o estado da aplicação e perguntas tipadas e retorna resultados estruturados, como escolhas, pontuações e probabilidades. Este projeto fornece uma interface web para usar o Jev através do Pollinations.

### Italiano

Jev è il primo modello **System One** di TypeSafe AI, progettato per produrre decisioni rapide e strutturate che il software può utilizzare direttamente. Invece di generare testo libero, Jev riceve lo stato dell'applicazione e domande tipizzate e restituisce risultati strutturati come scelte, punteggi e probabilità. Questo progetto offre un'interfaccia browser per utilizzare Jev tramite Pollinations.

### العربية

Jev هو أول نموذج **System One** من TypeSafe AI، وقد صُمم لاتخاذ قرارات سريعة ومنظمة يمكن للبرمجيات استخدامها مباشرة. بدلاً من إنشاء نص حر، يستقبل Jev حالة التطبيق وأسئلة محددة النوع، ثم يعيد نتائج منظمة مثل الاختيارات والدرجات والاحتمالات. يوفّر هذا المشروع واجهة تعمل في المتصفح لاستخدام Jev عبر Pollinations.

## Credits & references

The description of Jev in this README is based on TypeSafe AI's public materials and documentation.

- TypeSafe AI — https://typesafe.ai/
- Introducing System One Models & Jev — https://typesafe.ai/blog/introducing-system-one-models-and-jev
- Jev overview — https://typesafe-jev.com/en/about/

Pollinations provides the API layer used by this project.

---

**Jev AI** is an independent community project and is not affiliated with or endorsed by TypeSafe AI unless explicitly stated otherwise.
