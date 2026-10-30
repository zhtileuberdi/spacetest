# Как выложить сайт на Vercel (для тех, кто делает это впервые)

Сервер больше не нужен: сайт — это просто файлы, Vercel раздаёт их бесплатно, а данные хранит Firebase.

## Шаг 1. Firebase
Выполните всё из **`docs/FIREBASE.md`** (вход Email/Password, база Firestore, правила, ключи в `public/firebase-config.js`).

## Шаг 2. Загрузите проект на GitHub
1. Создайте аккаунт на https://github.com и новый репозиторий (**New repository**, любое имя, Private или Public).
2. Загрузите в него все файлы проекта: на странице репозитория **Add file → Upload files**, перетащите содержимое папки `testspace`
   (папки `public`, `docs`, файлы `vercel.json`, `firestore.rules` и т.д.) → **Commit changes**.
   Файл `serviceAccountKey.json` загружать **нельзя** (его в проекте уже нет, и `.gitignore` его блокирует).

## Шаг 3. Подключите Vercel
1. https://vercel.com → **Sign up with GitHub**.
2. **Add New… → Project** → выберите свой репозиторий → **Import**.
3. Настройки оставьте как есть: Framework Preset — **Other**, Build Command и Install Command — пустые,
   Output Directory — `public` (это уже записано в `vercel.json`). Нажмите **Deploy**.
4. Через минуту появится адрес вида `https://ваш-проект.vercel.app`. Откройте его: сайт работает.

Любое изменение в GitHub Vercel выкладывает сам.

## Вариант без GitHub (через командную строку)
Нужен Node.js (только для этой команды, на сайт он не влияет):
```
cd testspace
npx vercel          # первый раз: вход и вопросы, на все отвечайте Enter
npx vercel --prod   # выложить на постоянный адрес
```

## Как провести тест в классе
1. Учитель регистрируется (роль **Учитель**) → «Группы» → создаёт группу (название + пароль).
2. Студенты регистрируются (роль **Студент**) → «Группы» → вступают по названию и паролю.
3. Учитель: «Задания» → «Создать». Студенты открывают сайт по ссылке Vercel с любого устройства.
4. Если нужен тест «для всех» без групп — сделайте задание **публичным** или **приватным** (вход по коду).

## Частые проблемы
| Проблема | Решение |
|---|---|
| Красная полоса «Firebase не настроен» | не вставлены ключи в `public/firebase-config.js` |
| Регистрация: «включите Email/Password» | Firebase → Authentication → Sign-in method → Email/Password |
| В консоли браузера (F12) `permission-denied` | не опубликованы правила `firestore.rules` |
| На Vercel 404 | в настройках проекта Output Directory должен быть `public` |
| Сбросить все данные | Firebase Console → Firestore Database → удалить коллекции; Authentication → Users → удалить пользователей |
