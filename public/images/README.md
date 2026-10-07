# 📸 Изображения сайта — спеки и промпты

Все файлы в этой папке — **временные AI-заглушки (placeholder content)**.
Они не являются реальными фотографиями мастерa или клиентов.

Чтобы заменить их на реальные фотографии — просто **перезапишите файл с тем же
именем и путём** (через файловый менеджер хостинга или по FTP/SFTP).
Ничего в коде менять не нужно: все пути подключены в `src/data/images.ts`.

---

## Общий стиль съёмки (apply to every image)

**Look & feel**

> Premium beauty editorial photography, shot by a professional fashion/beauty
> photographer. Photorealistic, natural skin texture, realistic hair strands and
> shine, soft diffused studio lighting with a gentle key light, sophisticated
> minimal set, clean neutral background (warm off-white / soft beige / light
> greige), slightly warm neutral color grading, subtle film grain, shallow but
> controlled depth of field, high-end hair studio photography, calm and modern
> mood, 85mm lens look, editorial magazine quality.

**Negative prompt (for all images)**

> text, letters, typography, watermark, logo, brand names, captions, 3D render,
> CGI, illustration, cartoon, painting, drawing, vector art, extra fingers,
> deformed hands, duplicated tools, malformed comb, distorted hair, plastic skin,
> over-smoothed skin, excessive retouching, heavy makeup, fantasy hairstyle,
> unnatural reflections, oversaturated colors, low quality, jpeg artifacts,
> cropped head, busy background.

**Технические требования**

| | |
|---|---|
| Формат | `.jpg` (quality ≥ 85) или `.webp` / `.avif` |
| Цветность | sRGB |
| Обработка | без надписей, без рамок, без коллажей |
| Минимальная ширина | 1200 px (для retina — 1600–2000 px) |

---

## `/images/master/` — портреты мастера

### `master-hero.jpg`

| | |
|---|---|
| Назначение | Портрет мастера в Hero-блоке (крупное изображение справа) |
| Ratio | **4:5** (вертикаль) |
| Размер | 1600 × 2000 px |
| Важно | место слева/сверху оставлено под текст, лицо и волосы хорошо видны |

**Prompt**

> Professional editorial portrait of a young female hair artist standing in a
> sophisticated minimal hair studio, waist-up composition, confident and calm
> expression, long straight glossy black hair falling over the shoulders, natural
> soft makeup, wearing a modern minimalist tailored business suit in a neutral
> dark beige tone with no logos, holding a professional styling comb in one hand
> and a professional flat iron in the other held naturally and correctly, hands
> anatomically correct, soft diffused studio light from the side, warm neutral
> color grading, clean light greige background with generous negative space,
> photorealistic beauty editorial photography, 85mm lens, vertical 4:5 portrait,
> no text, no watermark, no logo.

### `master-about.jpg`

| | |
|---|---|
| Назначение | Второй портрет в блоке «О мастере» |
| Ratio | **3:4** (вертикаль) |
| Размер | 1500 × 2000 px |
| Важно | похож на hero по стилю, но другая поза/ракурс, без инструментов в кадре |

**Prompt**

> Editorial portrait of the same young female hair artist in a minimal premium
> hair studio, three-quarter view, three-quarter body crop, long straight black
> healthy hair, natural makeup, calm confident look into the camera, wearing a
> minimalist neutral tone blazer without logos, arms relaxed, soft window-like
> diffused lighting, warm neutral color grading, clean off-white background,
> photorealistic beauty editorial photography, vertical 3:4 portrait, no text,
> no watermark, no logo.

---

## `/images/services/` — карточки услуг (все 4:5, 1600 × 2000 px)

### `keratin-botox.jpg` — Кератин / Ботокс

| | |
|---|---|
| Назначение | Карточка услуги «Кератин / Ботокс» |
| Ratio | **4:5** |
| Важно | лицо не видно, акцент на гладкость и блеск |

**Prompt**

> Back view of a woman with medium-long perfectly smooth glossy healthy hair
> after a keratin treatment, silky soft natural shine, seen mostly from behind
> slightly angled, face not visible, minimal light neutral studio background of
> a premium hair salon, soft diffused lighting, warm neutral color grading,
> realistic hair strands, photorealistic beauty editorial photography, vertical
> 4:5, no text, no watermark.

### `cold-repair.jpg` — Холодное восстановление

| | |
|---|---|
| Назначение | Карточка услуги «Холодное восстановление» |
| Ratio | **4:5** |
| Важно | естественная текстура, живое движение волос, ощущение ухода |

**Prompt**

> Side-back view of shoulder-length hair with natural texture and healthy
> restored look, soft gentle shine, natural movement and light bounce, one hand
> gently touching the ends, face not visible, minimal neutral studio background,
> soft diffused daylight, warm neutral color grading, realistic hair texture,
> photorealistic beauty editorial photography, vertical 4:5, no text, no
> watermark.

### `nanoplasty.jpg` — Нанопластика

| | |
|---|---|
| Назначение | Карточка услуги «Нанопластика» |
| Ratio | **4:5** |
| Важно | очень гладкие прямые тёмные волосы, вид со спины / 3/4 |

**Prompt**

> Back view of a woman with very long ultra-smooth straight dark brown hair
> after a nanoplasty treatment, mirror-like healthy gloss, perfectly aligned
> strands, face not visible, minimalist bright studio background, soft even
> studio lighting, warm neutral color grading, photorealistic hair photography,
> vertical 4:5, no text, no watermark.

---

## `/images/gallery/` — примеры работ (все 4:5, 1600 × 2000 px)

Общие правила для всех 12 фотографий:

- человек снят **со спины**, лицо не видно;
- акцент на волосах: длина, цвет, текстура, блеск;
- единая визуальная идентичность, но разные ракурсы, свет и фон (нейтральный);
- разные длины/цвета, лёгкое движение волос, без текста и логотипов.

| Файл | Что на фото | Prompt (дополнение к общему стилю) |
|---|---|---|
| `work-01.jpg` | Длинные прямые чёрные волосы | back view, very long pin-straight jet black hair, glossy and sleek, neutral warm studio backdrop |
| `work-02.jpg` | Длинные тёмно-коричневые волосы | back view, long dark brown hair with soft natural fall and subtle warm reflections, salon interior out of focus |
| `work-03.jpg` | Средняя длина, светло-коричневый | back view, medium-length light brown hair, soft blowout with gentle movement, bright airy studio |
| `work-04.jpg` | Длинные русые волосы | back view, long blonde hair with dimensional cool-to-warm tones, silky shine, soft window light |
| `work-05.jpg` | Очень длинные тёмные волосы | back view, extra-long dark hair reaching the lower back, healthy weight and gloss, minimal beige studio |
| `work-06.jpg` | Средняя длина, тёплый каштан | back view, medium-length warm chestnut hair with sun-kissed warmth, soft loose ends, warm neutral grading |
| `work-07.jpg` | Длинные волосы с мягкими волнами | back view, long hair with soft natural waves, airy texture and gentle movement, slight turn of shoulders |
| `work-08.jpg` | Светлые прямые волосы | back view, straight light blonde hair, clean sleek finish with natural shine, light grey studio background |
| `work-09.jpg` | Короткое каре | back and slightly side view of a short bob haircut, precise clean lines, nape visible, face not visible |
| `work-10.jpg` | Средняя длина, холодный брюнет | back view, medium-length cool-toned brunette hair, mirror gloss after treatment, cool neutral background |
| `work-11.jpg` | Длинные волосы с объёмом | back view, long voluminous hair with natural body at the roots, soft bounce, three-quarter turn |
| `work-12.jpg` | Очень гладкие длинные волосы | back view, extra-smooth glass-like long hair after a straightening procedure, perfect alignment, high shine |

**Пример полного промпта для `work-01.jpg`**

> Back view of a woman with very long pin-straight jet black hair, glossy and
> perfectly sleek, face not visible, shoulders and upper back in frame, neutral
> warm off-white studio backdrop, soft diffused studio lighting from the side,
> realistic hair strands with natural shine, warm neutral color grading, subtle
> film grain, photorealistic high-end beauty photography, 85mm lens, vertical
> 4:5, no text, no watermark, no logo.
>
> Negative: text, watermark, logo, face, front view, extra fingers, deformed
> hands, 3D render, illustration, plastic skin, distorted hair.

---

## Чек-лист после замены

1. Имя файла и путь не изменились (`master-hero.jpg` и т.д.).
2. Пропорции близки к указанным (иначе `object-cover` аккуратно обрежет края).
3. Изображения оптимизированы (до 300–500 КБ на файл).
4. Проверьте сайт на 390 px и 1440 px — картинки не должны растягиваться.
