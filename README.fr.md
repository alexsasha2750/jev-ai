# Jev AI

Une interface navigateur pour prendre des décisions structurées avec Jev via Pollinations.

## Qu’est-ce que Jev ?

Jev est le premier modèle **System One** de TypeSafe AI. Il est conçu pour produire des décisions typées directement exploitables par les logiciels, plutôt que du texte libre. L’application fournit un état et des questions typées ; Jev peut retourner des choix, des scores et des probabilités pour les décisions binaires, ainsi que des informations de confiance lorsqu’elles sont disponibles.

L’idée centrale est **des décisions, pas des chaînes de texte**. Au lieu de générer une réponse puis de l’analyser, une application peut définir à l’avance la forme du résultat et utiliser directement la décision structurée. TypeSafe AI décrit son approche d’entraînement comme **Reinforcement Learning for Calibrated Decisions (RLCD)**.

Cas d’utilisation :
- **Classification** — classer des demandes, tickets ou événements.
- **Scoring** — estimer urgence, risque ou qualité.
- **Décisions binaires** — évaluer des conditions oui/non sous forme de probabilités.
- **Garde-fous pour agents** — vérifier si une action automatisée peut continuer ou doit être revue.
- **Routage de modèles** — choisir un modèle ou un workflow.
- **Triage** — transformer l’état d’une application en décisions utilisables par le code.

Jev vise donc un usage plus ciblé qu’un LLM généraliste : produire des décisions structurées et reproductibles utilisables par les logiciels.

## À propos du projet

**Jev AI** est une application web statique légère offrant une interface navigateur pour l’inférence Jev via Pollinations.

Elle permet de connecter un compte Pollinations ou un token personnel, saisir un contexte, définir des questions structurées, lancer Jev et consulter les décisions, la confiance et les distributions retournées.

Tout fonctionne dans le navigateur, sans système de build ni dépendances npm.

## Exécution locale

```sh
python3 -m http.server 8000
```

Ouvrez `http://localhost:8000`.

L’authentification et l’inférence utilisent les API Pollinations depuis le navigateur. Ne publiez ni ne partagez jamais vos tokens personnels.

## Structure

- `index.html` — interface et balisage
- `styles.css` — design, responsive et accessibilité
- `app.js` — OAuth, tokens, intégration Pollinations et inférence Jev
- `assets/pollinations-logo-light.png` — ressource de marque Pollinations

## Autres langues

[English](README.md) · [Русский](README.ru.md) · [中文](README.zh.md) · [Español](README.es.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [العربية](README.ar.md)

## Sources

- https://typesafe.ai/
- https://typesafe.ai/blog/introducing-system-one-models-and-jev
- https://typesafe-jev.com/en/about/

**Jev AI** est un projet communautaire indépendant et n’est pas affilié à TypeSafe AI ni approuvé par celle-ci sauf indication contraire.