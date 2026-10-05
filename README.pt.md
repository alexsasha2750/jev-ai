# Jev AI

Uma interface de navegador para tomar decisões estruturadas com Jev através do Pollinations.

## O que é Jev?

Jev é o primeiro modelo **System One** da TypeSafe AI. Em vez de gerar texto livre como um LLM tradicional voltado para conversação, foi projetado para retornar decisões tipadas que o software pode consumir diretamente. A aplicação fornece estado e perguntas tipadas; Jev pode retornar escolhas, pontuações e probabilidades de decisões sim/não, além de informações de confiança quando disponíveis.

A ideia central é **decisões, não strings**. Em vez de gerar texto e depois analisá-lo, uma aplicação pode definir antecipadamente a estrutura do resultado e usar diretamente a decisão estruturada. A TypeSafe AI descreve sua abordagem de treinamento como **Reinforcement Learning for Calibrated Decisions (RLCD)**.

Usos comuns incluem classificação, pontuação, decisões binárias, guardrails para agentes, roteamento de modelos e triagem de tarefas.

## Sobre este projeto

**Jev AI** é uma aplicação web estática e leve que oferece uma interface de navegador para inferência do Jev através do Pollinations. Permite conectar uma conta Pollinations ou um token pessoal, inserir contexto, definir perguntas estruturadas, executar o Jev e consultar os resultados.

Tudo funciona no navegador, sem sistema de build ou dependências npm.

## Executar localmente

```sh
python3 -m http.server 8000
```

Abra `http://localhost:8000`.

A autenticação e a inferência usam as APIs do Pollinations no navegador. Nunca publique ou compartilhe tokens pessoais.

## Estrutura

- `index.html` — interface e marcação
- `styles.css` — design, layout responsivo e acessibilidade
- `app.js` — OAuth, tokens, integração Pollinations e inferência Jev
- `assets/pollinations-logo-light.png` — recurso de marca do Pollinations

## Outros idiomas

[English](README.md) · [Русский](README.ru.md) · [中文](README.zh.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Italiano](README.it.md) · [العربية](README.ar.md)

## Fontes

- https://typesafe.ai/
- https://typesafe.ai/blog/introducing-system-one-models-and-jev
- https://typesafe-jev.com/en/about/

**Jev AI** é um projeto comunitário independente e não é afiliado nem endossado pela TypeSafe AI, salvo indicação expressa.