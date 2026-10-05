# Jev AI

واجهة تعمل في المتصفح لاتخاذ قرارات منظمة باستخدام Jev عبر Pollinations.

> **🌐 README:** [🇬🇧 EN](README.md) · [🇷🇺 RU](README.ru.md) · [🇨🇳 中文](README.zh.md) · [🇪🇸 ES](README.es.md) · [🇫🇷 FR](README.fr.md) · [🇩🇪 DE](README.de.md) · [🇯🇵 日本語](README.ja.md) · [🇰🇷 한국어](README.ko.md) · [🇵🇹 PT](README.pt.md) · [🇮🇹 IT](README.it.md) · [🇸🇦 العربية](README.ar.md)
## ما هو Jev؟

Jev هو أول نموذج **System One** من TypeSafe AI. صُمم لإرجاع قرارات محددة النوع يمكن للبرمجيات استخدامها مباشرة بدلاً من إنشاء نص حر. يرسل التطبيق حالة النظام والأسئلة المحددة النوع، ويمكن لـ Jev إرجاع اختيارات ودرجات واحتمالات لقرارات نعم/لا، بالإضافة إلى معلومات الثقة عند توفرها.

الفكرة الأساسية هي **قرارات، وليس سلاسل نصية**. بدلاً من إنشاء إجابة نصية ثم تحليلها، يمكن للتطبيق تحديد شكل النتيجة مسبقاً واستخدام القرار المنظم مباشرة. تصف TypeSafe AI منهج التدريب لديها باسم **Reinforcement Learning for Calibrated Decisions (RLCD)**.

تشمل الاستخدامات الشائعة التصنيف، والتقييم، والقرارات الثنائية، وضوابط الوكلاء، وتوجيه النماذج، وفرز المهام.

## حول المشروع

**Jev AI** هو تطبيق ويب ثابت وخفيف يوفر واجهة متصفح لاستخدام استدلال Jev عبر Pollinations. يتيح ربط حساب Pollinations أو إدخال رمز API شخصي، وإدخال السياق، وتعريف الأسئلة المنظمة، وتشغيل Jev، ومراجعة النتائج.

يعمل كل شيء في المتصفح ولا يحتاج إلى نظام بناء أو حزم npm.

## التشغيل محلياً

```sh
python3 -m http.server 8000
```

ثم افتح `http://localhost:8000`.

تستخدم المصادقة والاستدلال واجهات Pollinations من المتصفح. لا ترفع رموز API الشخصية إلى المستودع ولا تشاركها.

## بنية المشروع

- `index.html` — واجهة التطبيق وترميز HTML
- `styles.css` — التصميم والتخطيط المتجاوب وتحسينات إمكانية الوصول
- `app.js` — OAuth وإدارة الرموز وتكامل Pollinations واستدلال Jev
- `assets/pollinations-logo-light.png` — شعار Pollinations

## المصادر

- https://typesafe.ai/
- https://typesafe.ai/blog/introducing-system-one-models-and-jev
- https://typesafe-jev.com/en/about/

**Jev AI** مشروع مجتمعي مستقل، ولا يرتبط بـ TypeSafe AI أو يحظى بتأييدها ما لم يُذكر ذلك صراحة.
