# Jev AI

Eine browserbasierte Oberfläche für strukturierte Entscheidungen mit Jev über Pollinations.

## Was ist Jev?

Jev ist das erste **System-One-Modell** von TypeSafe AI. Es wurde entwickelt, um typisierte Entscheidungen zurückzugeben, die Software direkt verarbeiten kann, statt freien Text zu erzeugen. Eine Anwendung übergibt ihren Zustand und typisierte Fragen; Jev kann Auswahlwerte, Scores und Wahrscheinlichkeiten für Ja/Nein-Entscheidungen sowie – sofern unterstützt – Konfidenzinformationen liefern.

Die zentrale Idee lautet **Entscheidungen statt Textzeichenketten**. Statt eine Antwort zu erzeugen und anschließend zu parsen, kann eine Anwendung die Ergebnisstruktur vorher festlegen und die strukturierte Entscheidung direkt verwenden. TypeSafe AI beschreibt seinen Trainingsansatz als **Reinforcement Learning for Calibrated Decisions (RLCD)**.

Typische Einsatzbereiche:
- **Klassifikation** — Anfragen, Tickets oder Ereignisse Kategorien zuordnen.
- **Scoring** — Dringlichkeit, Risiko oder Qualität bewerten.
- **Binäre Entscheidungen** — Ja/Nein-Bedingungen als Wahrscheinlichkeiten bewerten.
- **Agenten-Schutz** — prüfen, ob eine automatisierte Aktion fortgesetzt oder überprüft werden soll.
- **Modell-Routing** — ein Modell oder einen Workflow auswählen.
- **Triage** — Anwendungszustand in direkt nutzbare Entscheidungen umwandeln.

Jev ist damit stärker auf strukturierte, wiederholbare Entscheidungen spezialisiert als ein allgemeines Sprachmodell.

## Über dieses Projekt

**Jev AI** ist eine schlanke statische Webanwendung mit einer Browseroberfläche für Jev-Inferenz über Pollinations.

Sie ermöglicht die Verbindung eines Pollinations-Kontos oder eines persönlichen API-Tokens, die Eingabe von Kontext, die Definition strukturierter Fragen, die Ausführung von Jev und die Anzeige der Ergebnisse.

Alles läuft im Browser. Es sind kein Build-System und keine npm-Abhängigkeiten erforderlich.

## Lokal ausführen

```sh
python3 -m http.server 8000
```

Danach `http://localhost:8000` öffnen.

Authentifizierung und Inferenz verwenden Pollinations-APIs aus dem Browser. Persönliche API-Tokens niemals veröffentlichen oder teilen.

## Projektstruktur

- `index.html` — Markup und Oberfläche
- `styles.css` — Design, Responsive Layout und Barrierefreiheit
- `app.js` — OAuth, Token-Verarbeitung, Pollinations-Integration und Jev-Inferenz
- `assets/pollinations-logo-light.png` — Pollinations-Logo

## Andere Sprachen

[English](README.md) · [Русский](README.ru.md) · [中文](README.zh.md) · [Español](README.es.md) · [Français](README.fr.md) · [日本語](README.ja.md) · [한국어](README.ko.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [العربية](README.ar.md)

## Quellen

- https://typesafe.ai/
- https://typesafe.ai/blog/introducing-system-one-models-and-jev
- https://typesafe-jev.com/en/about/

**Jev AI** ist ein unabhängiges Community-Projekt und steht nicht mit TypeSafe AI in Verbindung und wird von TypeSafe AI nicht unterstützt, sofern nicht ausdrücklich angegeben.