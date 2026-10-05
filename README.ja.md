# Jev AI

Pollinations を通じて Jev で構造化された意思決定を行うためのブラウザインターフェースです。

## Jev とは？

Jev は TypeSafe AI の最初の **System One** モデルです。一般的なチャット向け LLM のように自由形式の文章を生成するのではなく、ソフトウェアが直接処理できる型付きの意思決定を返すことを目的としています。アプリケーションの状態と型付きの質問を入力すると、選択肢、スコア、Yes/No の確率などの構造化された結果を返し、対応している場合は信頼度情報も提供します。

中心となる考え方は **「文字列ではなく意思決定」** です。生成された文章を後から解析するのではなく、結果の形をあらかじめ定義し、構造化された判断をそのままコードで利用できます。TypeSafe AI はこの学習手法を **Reinforcement Learning for Calibrated Decisions (RLCD)** と説明しています。

主な用途：分類、スコアリング、二値判断、エージェントのガードレール、モデルルーティング、タスクのトリアージ。

## このプロジェクトについて

**Jev AI** は Pollinations 経由で Jev 推論を利用するための軽量な静的 Web アプリです。Pollinations アカウントまたは個人 API トークンを接続し、コンテキストと構造化された質問を入力して Jev を実行し、結果を確認できます。

すべてブラウザ上で動作し、ビルドシステムや npm 依存関係は必要ありません。

## ローカル実行

```sh
python3 -m http.server 8000
```

`http://localhost:8000` を開きます。認証と推論にはブラウザから Pollinations API を使用します。個人 API トークンをコミットしたり共有したりしないでください。

## プロジェクト構成

- `index.html` — UI と HTML
- `styles.css` — デザイン、レスポンシブ対応、アクセシビリティ
- `app.js` — OAuth、トークン管理、Pollinations 連携、Jev 推論
- `assets/pollinations-logo-light.png` — Pollinations ロゴ

## その他の言語

[English](README.md) · [Русский](README.ru.md) · [中文](README.zh.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [한국어](README.ko.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [العربية](README.ar.md)

## 参考資料

- https://typesafe.ai/
- https://typesafe.ai/blog/introducing-system-one-models-and-jev
- https://typesafe-jev.com/en/about/

**Jev AI** は独立したコミュニティプロジェクトであり、明示されていない限り TypeSafe AI と提携・承認されたものではありません。