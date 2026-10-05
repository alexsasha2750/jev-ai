# Jev AI

通过 Pollinations 使用 Jev 进行结构化决策的浏览器界面。

> **🌐 README:** [🇬🇧 EN](README.md) · [🇷🇺 RU](README.ru.md) · [🇨🇳 中文](README.zh.md) · [🇪🇸 ES](README.es.md) · [🇫🇷 FR](README.fr.md) · [🇩🇪 DE](README.de.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇵🇹 PT](README.pt.md) · [🇮🇹 IT](README.it.md) · [🇸🇦 العربية](README.ar.md)
Jev 是 TypeSafe AI 推出的第一款 **System One** 模型。与面向聊天和自由文本生成的传统 LLM 不同，Jev 专注于返回**可由程序直接处理的类型化决策**。应用可以提供状态和类型化问题，Jev 则返回选择、评分以及“是/否”概率等结构化结果，并在支持的情况下提供置信度信息。

> **注意：** 本仓库是一个独立的客户端界面，并非 TypeSafe AI 的官方产品或官方网站。

## 什么是 Jev？

TypeSafe AI 将 Jev 定位为用于软件自动化的决策模型。核心理念很简单：**决策，而不是字符串**。

传统做法是让生成式模型输出文本，再从文本中解析需要的数据。Jev 则允许应用提前定义结果的结构，根据类型化问题评估提供的应用状态，并返回程序可以直接使用的结构化结果。TypeSafe AI 将其训练方法描述为 **Reinforcement Learning for Calibrated Decisions (RLCD)**。

典型应用场景包括：

- **分类** — 将请求、工单或事件分配到预定义类别。
- **评分** — 评估紧急程度、风险、质量或其他有序指标。
- **二元决策** — 以概率形式评估“是/否”条件。
- **智能体护栏** — 判断自动化操作是否可以继续，或是否需要人工检查。
- **模型路由** — 决定应该使用哪个模型或工作流。
- **任务分流** — 将应用状态转换为现有代码可以直接使用的决策。

Jev 并不是为了取代通用语言模型在写作、摘要或开放式对话方面的能力。它的定位更加专一：生成可重复、结构化并能被软件直接使用的决策。

## 关于本项目

**Jev AI** 是一个轻量级静态 Web 应用，为通过 Pollinations 使用 Jev 推理提供浏览器界面。

你可以：

1. 连接 Pollinations 账户或输入个人 API Token；
2. 输入应用上下文；
3. 定义结构化问题；
4. 运行 Jev 推理；
5. 查看返回的决策、置信度和分布。

所有功能都在浏览器中运行，无需构建系统，也无需安装 npm 依赖。

## 本地运行

项目由纯 HTML、CSS 和 JavaScript 构成。

```sh
python3 -m http.server 8000
```

然后打开：

```
http://localhost:8000
```

身份验证和推理通过浏览器调用 Pollinations API 完成。请勿将个人 API Token 提交到仓库或分享给他人。

## 项目结构

- `index.html` — 应用界面和 HTML 结构
- `styles.css` — 视觉设计、响应式布局和无障碍优化
- `app.js` — OAuth、Token 管理、Pollinations 集成和 Jev 推理
- `assets/pollinations-logo-light.png` — Pollinations 品牌资源

## 来源

Jev 的介绍基于 TypeSafe AI 的公开材料和文档。

- TypeSafe AI — https://typesafe.ai/
- Introducing System One Models & Jev — https://typesafe.ai/blog/introducing-system-one-models-and-jev
- Jev overview — https://typesafe-jev.com/en/about/

Pollinations 为本项目提供 API 层。

---

**Jev AI** 是一个独立的社区项目，除非另有明确说明，否则与 TypeSafe AI 没有隶属或官方认可关系。
