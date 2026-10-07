# [MASTER_NAME] — Premium Hair Artist Website

Персональный сайт-портфолио мастера по волосам: editorial / premium / minimal.
React + TypeScript + Vite + Tailwind CSS 4 + Framer Motion + Lucide React.

---

## 🚀 Быстрый старт

```bash
npm install        # установка зависимостей
npm run dev        # dev-сервер → http://localhost:5173
npm run build      # production build → dist/
npm run preview    # предпросмотр production-сборки → http://localhost:4173
npm run typecheck  # проверка TypeScript
```

---

## 📁 Структура проекта

```
api/
  contact.ts                 ← serverless-эндпоинт для формы (Resend)
public/
  images/
    README.md                ← СПЕКИ + ПРОМПТЫ для всех 17 изображений
    master/master-hero.jpg      (4:5)   — заглушка, заменить на реальный портрет
    master/master-about.jpg     (3:4)   — заглушка, заменить на реальный портрет
    services/keratin-botox.jpg  (4:5)   — карточка услуги
    services/cold-repair.jpg    (4:5)   — карточка услуги
    services/nanoplasty.jpg     (4:5)   — карточка услуги
    gallery/work-01…work-12.jpg (4:5)   — примеры работ (12 шт.)
  favicon.svg, robots.txt, _redirects
src/
  components/
    Header, MobileMenu, Hero, Intro, SectionHeading,
    AboutPreview, About, Services, ServiceCard,
    Gallery, GalleryLightbox, CallToAction,
    Contact, ContactForm, SocialLinks, Footer,
    PageHero, Button, OptimizedImage, Reveal
  pages/        HomePage, AboutPage, ServicesPage, GalleryPage,
                ContactPage, NotFoundPage
  layouts/      MainLayout (Header + Outlet + Footer)
  data/         siteData.ts (весь текст), images.ts (все пути к фото)
  hooks/        ScrollToTop, useBodyScrollLock, usePageSeo, useScrolled
  lib/          utils.ts (cn/pad2), links.ts (social/contact helpers)
  styles/       index.css (Tailwind + design tokens)
```

**Роуты:** `/` · `/about` · `/services` · `/gallery` · `/contact` · `*` (404)

---

## 🖼 Изображения (AI placeholders)

В окружении не было доступно средство генерации изображений, поэтому:

1. создана **точная структура папок и имён файлов** (см. выше);
2. для каждой картинки написаны **промпты и технические спеки** —
   `public/images/README.md`;
3. все изображения подключены через **единый конфиг** — `src/data/images.ts`;
4. компонент `OptimizedImage` показывает **аккуратный placeholder**
   (градиент + имя файла), а не «битую» картинку, если файла ещё нет.

### Как заменить на реальные фото

Загрузите файл **с тем же именем и путём** через файловый менеджер хостинга:

```
images/master/master-hero.jpg     ← реальный портрет (4:5)
images/master/master-about.jpg    ← реальный портрет (3:4)
images/services/keratin-botox.jpg
images/services/cold-repair.jpg
images/services/nanoplasty.jpg
images/gallery/work-01.jpg … work-12.jpg
```

React-код менять **не нужно**. Пути хранятся только в `src/data/images.ts`.
Ни одна реальная фотография не используется — весь фото-контент является
временным контентом-заглушкой.

---

## ✏️ Где что менять

| Что менять | Файл |
|---|---|
| Имя мастера, город, тэглайн | `src/data/siteData.ts` → `master` |
| SEO title / description / OG | `src/data/siteData.ts` → `seo` + `index.html` |
| Текст вступления | `src/data/siteData.ts` → `intro` |
| Текст «О мастере», статистика | `src/data/siteData.ts` → `about` |
| Услуги: название, описание | `src/data/siteData.ts` → `services[]` |
| **Длительность и цена** | `src/data/siteData.ts` → `services[].duration / price` |
| Порядок / состав услуг (можно добавить 4-ю) | `src/data/siteData.ts` → `services[]` |
| Подписи и alt-тексты галереи | `src/data/siteData.ts` → `gallery` |
| Тексты CTA | `src/data/siteData.ts` → `cta` |
| Контакты (e-mail, адрес, часы) | `src/data/siteData.ts` → `contact` |
| **Social links** (Instagram, Facebook, TikTok, WhatsApp, Telegram) | `src/data/siteData.ts` → `social` |
| Пути к фотографиям | `src/data/images.ts` |
| Цвета (палитра) | `src/styles/index.css` → `@theme` |
| Шрифты | `src/main.tsx` + `src/styles/index.css` → `--font-display / --font-sans` |
| Меню / навигация | `src/data/siteData.ts` → `navigation` |

Значения вида `[MASTER_NAME]`, `[CITY]`, `[PRICE]`, `[INSTAGRAM_URL]` —
это **плейсхолдеры**: замените их на реальные данные.

---

## 📧 Форма и e-mail

Форма отправляет POST на `/api/contact` (serverless-функция, `api/contact.ts`),
которая пересылает письмо через **Resend**. Ключ API остаётся на сервере и
никогда не попадает во фронтенд.

```bash
cp .env.example .env
# .env
CONTACT_EMAIL=you@example.com
RESEND_API_KEY=re_xxxxxxxxxxxx
# CONTACT_FROM=Site Form <onboarding@resend.dev>   # необязательно
```

- **DEV-режим** (`npm run dev`): запрос имитируется, ключ не нужен.
- **PRODUCTION**: нужен хостинг с serverless-функциями (Vercel / Netlify /
  Cloudflare Pages). Для чисто статического хостинга замените адрес отправки
  в `src/components/ContactForm.tsx` на свой форму-сервис (Formspree, Web3Forms…).

---

## 🌐 Публикация

1. `npm run build` → папка `dist/`.
2. Загрузите содержимое `dist/` на хостинг (в корень сайта).
3. Загрузите реальные фотографии в `images/...` (файловый менеджер хостинга).
4. **SPA-фallback** обязателен, иначе внутренние страницы (/about …) не откроются
   напрямую:
   - Netlify — `public/_redirects` уже лежит в проекте;
   - Vercel — `vercel.json` уже лежит в проекте;
   - другой хостинг — настройте rewrite `/* → /index.html`.

---

## ✅ QA (проверено)

| Проверка | Результат |
|---|---|
| TypeScript / production build | ✅ без ошибок |
| Lighthouse: Accessibility / Best Practices / SEO | ✅ 100 / 100 / 100 |
| Desktop: 1440, 1280, 1024 | ✅ нет горизонтального скролла |
| Tablet: 768 | ✅ |
| Mobile: 390, 375, 320 | ✅ |
| Навигация (роуты + 404) | ✅ |
| Галерея: стрелки, счётчик 01/12, миниатюры | ✅ |
| Свайп галереи (drag) | ✅ |
| Lightbox: клик, ← →, Escape, блокировка скролла | ✅ |
| Мобильное меню: открытие, Escape, aria-expanded | ✅ |
| Форма: валидация, фокус на ошибке, success-state | ✅ |
| Lazy loading / eager hero / responsive sizes | ✅ |
| Консоль: ошибок нет | ✅ |
| prefers-reduced-motion | ✅ |
