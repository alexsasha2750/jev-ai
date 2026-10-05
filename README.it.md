# Jev AI

Un'interfaccia browser per prendere decisioni strutturate con Jev tramite Pollinations.

> **🌐 README:** [🇬🇧 EN](README.md) · [🇷🇺 RU](README.ru.md) · [🇨🇳 中文](README.zh.md) · [🇪🇸 ES](README.es.md) · [🇫🇷 FR](README.fr.md) · [🇩🇪 DE](README.de.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇵🇹 PT](README.pt.md) · [🇮🇹 IT](README.it.md) · [🇸🇦 العربية](README.ar.md)
## Che cos'è Jev?

Jev è il primo modello **System One** di TypeSafe AI. È progettato per restituire decisioni tipizzate che il software può usare direttamente, invece di testo libero. L'applicazione fornisce lo stato e domande tipizzate; Jev può restituire scelte, punteggi e probabilità per decisioni sì/no, oltre a informazioni sulla confidenza quando disponibili.

L'idea centrale è **decisioni, non stringhe**. Invece di generare testo e analizzarlo successivamente, un'applicazione può definire in anticipo la forma del risultato e utilizzare direttamente la decisione strutturata. TypeSafe AI descrive il proprio approccio di addestramento come **Reinforcement Learning for Calibrated Decisions (RLCD)**.

Casi d'uso: classificazione, scoring, decisioni binarie, guardrail per agenti, instradamento dei modelli e triage delle attività.

## Il progetto

**Jev AI** è una leggera applicazione web statica che offre un'interfaccia browser per l'inferenza Jev tramite Pollinations. Puoi collegare un account Pollinations o un token personale, inserire il contesto, definire domande strutturate, eseguire Jev e consultare i risultati.

Tutto funziona nel browser, senza sistema di build né dipendenze npm.

## Esecuzione locale

```sh
python3 -m http.server 8000
```

Apri `http://localhost:8000`.

Autenticazione e inferenza utilizzano le API Pollinations dal browser. Non pubblicare né condividere token personali.

## Struttura

- `index.html` — interfaccia e markup
- `styles.css` — design, layout responsive e accessibilità
- `app.js` — OAuth, token, integrazione Pollinations e inferenza Jev
- `assets/pollinations-logo-light.png` — risorsa del marchio Pollinations

## Fonti

- https://typesafe.ai/
- https://typesafe.ai/blog/introducing-system-one-models-and-jev
- https://typesafe-jev.com/en/about/

**Jev AI** è un progetto comunitario indipendente e non è affiliato né approvato da TypeSafe AI, salvo diversa indicazione.
