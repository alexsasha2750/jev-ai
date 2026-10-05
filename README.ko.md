# Jev AI

Pollinations를 통해 Jev로 구조화된 의사결정을 수행할 수 있는 브라우저 인터페이스입니다.

## Jev란?

Jev는 TypeSafe AI의 첫 번째 **System One** 모델입니다. 일반적인 채팅형 LLM처럼 자유 형식의 텍스트를 생성하는 대신 소프트웨어가 직접 처리할 수 있는 타입화된 의사결정을 반환하도록 설계되었습니다. 애플리케이션 상태와 타입이 지정된 질문을 제공하면 선택, 점수, 예/아니오 확률 등의 구조화된 결과를 반환하며 지원되는 경우 신뢰도 정보도 제공합니다.

핵심 아이디어는 **텍스트 문자열이 아니라 의사결정**입니다. 생성된 문장을 다시 분석하는 대신 결과 형식을 미리 정의하고 구조화된 결정을 코드에서 직접 사용할 수 있습니다. TypeSafe AI는 이 학습 방식을 **Reinforcement Learning for Calibrated Decisions (RLCD)**라고 설명합니다.

주요 사용 사례로는 분류, 점수화, 이진 결정, 에이전트 가드레일, 모델 라우팅, 작업 분류가 있습니다.

## 프로젝트 소개

**Jev AI**는 Pollinations를 통해 Jev 추론을 사용할 수 있도록 만든 가벼운 정적 웹 애플리케이션입니다. Pollinations 계정 또는 개인 API 토큰을 연결하고, 컨텍스트와 구조화된 질문을 입력한 뒤 Jev를 실행하고 결과를 확인할 수 있습니다.

모든 기능은 브라우저에서 실행되며 빌드 시스템이나 npm 패키지가 필요하지 않습니다.

## 로컬 실행

```sh
python3 -m http.server 8000
```

`http://localhost:8000`을 엽니다. 인증과 추론은 브라우저에서 Pollinations API를 사용합니다. 개인 API 토큰을 저장소에 커밋하거나 공유하지 마세요.

## 프로젝트 구조

- `index.html` — 애플리케이션 UI와 마크업
- `styles.css` — 디자인, 반응형 레이아웃, 접근성
- `app.js` — OAuth, 토큰 관리, Pollinations 연동, Jev 추론
- `assets/pollinations-logo-light.png` — Pollinations 로고

## 다른 언어

[English](README.md) · [Русский](README.ru.md) · [中文](README.zh.md) · [Español](README.es.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [日本語](README.ja.md) · [Português](README.pt.md) · [Italiano](README.it.md) · [العربية](README.ar.md)

## 참고 자료

- https://typesafe.ai/
- https://typesafe.ai/blog/introducing-system-one-models-and-jev
- https://typesafe-jev.com/en/about/

**Jev AI**는 독립적인 커뮤니티 프로젝트이며 별도로 명시되지 않는 한 TypeSafe AI와 제휴하거나 공식적으로 지원받는 프로젝트가 아닙니다.