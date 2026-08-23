# REACT_PRO_final_project_base

## Что сделано

### 1. Вынести UI-компоненты 
- Созданы общие UI-компоненты: `Button`, `Input`, `Loader`, `Textarea`
- Компоненты `Card`, `CartItem`, `ProfilePage`, `WithQuery`, `ReviewForm`, `SignInForm`, `SignUpForm` переиспользуют новые UI-компоненты

### 2. Разделить фичи по папкам
- Фичи перенесены из `widgets` в `features`: `auth`, `cart`, `search`
- `SignInForm` / `SignUpForm` → `features/auth`
- `CartCounter`, `CartItem`, `CartList`, `ProductCartCounter`, `CartAmount`, `Sort`, `Search` → `features/cart` / `features/search`

### 3. Убрать лишние проп-пробросы
- Убраны лишние пропсы из компонентов: `Button`, `Input`, `Loader`, `Textarea`
- Убраны избыточные пропсы из форм и компонентов карточек

### 4. Проанализировать проект и найти часто встречающиеся UI-компоненты 
- Обновлены `CartCounter`, `ProductCartCounter`, `Search`, `HomePage`, `NotFoundPage`

### 5. Оптимизация рендеров 
- Все компоненты обернуты в `React.memo`
- Создан хук `useProductLike` для инкапсуляции логики лайков
- `useCallback` / `useMemo` для стабильных ссылок
- Оптимизированы `useAddToCart`, `useProducts`, `useCount`

### 6. добавлен div modal-root 
- В `public/index.html` добавлен `<div id="modal-root">` для рендера модалок вне основного дерева

### 7. Реализовать компонент Modal 
- Создан `shared/ui/Modal` с CSS-модулями
- Создан хук `useConfirmDialog` для подтверждения действий

### 8. Автофокус на инпут формы (`d7fda95`)
- `Input` получила проп `autoFocus`
- `SignInForm`, `SignUpForm`, `CartCounter`, `CartItem`, `CartList`, `ProductCartCounter`, `Search`, `NotFoundPage`, `ProductPage` получили автофокус

### 9. Собственные сборки 
- Настроен Vite: `vite.config.js` с чанкингом MUI, sourcemap, esbuild-минификацией

## Структура папок

```
src/
├── app/           — корневой компонент (App.tsx), глобальные стили
├── features/      — бизнес-фичи (auth, cart, search)
├── pages/         — страницы (HomePage, ProductPage, CartPage, FavoritesPage, ProfilePage, SignInPage, SignUpPage, NotFoundPage)
├── shared/        — общий код
│   ├── api/       — HTTP-клиент (ApiServise.ts), RTK Query API
│   ├── assets/    — картинки, SVG-иконки
│   ├── hooks/     — кастомные хуки (useProductLike, useAddToCart, useConfirmDialog, useDebounce, usePagination)
│   ├── providers/ — React-провайдеры (router)
│   ├── store/     — Redux Toolkit (slices, hooks, HOCs)
│   ├── types/     — TypeScript-типы
│   ├── ui/        — общие UI-компоненты (Button, Input, Logo, Card, Modal, ButtonBack, Rating, LikeButton, Spinner, Loader, LoadMore, Search, Sort)
│   └── utils/     — утилиты (isLiked, getMessageFromError)
└── widgets/       — компонентные блоки (Header, Footer, CardList, ReviewList, SignInForm, SignUpForm)
```

## Сравнение сборок

### Vite (npm run build)

- **Время сборки:** ~2.06 сек
- **Размер файлов:**

| Файл | Размер | Gzip |
|------|--------|------|
| index.html | 0.70 kB | 0.36 kB |
| vendor.css | 13.88 kB | 2.63 kB |
| index.css | 40.33 kB | 7.64 kB |
| index.js | 68.54 kB | 22.84 kB |
| vendor-mui.js | 77.46 kB | 26.12 kB |
| vendor.js | 380.97 kB | 129.12 kB |
| **Итого JS** | **~527 kB** | **~178 kB** |
| **Всего** | **~537 kB** | **~183 kB** |


### Webpack (npm run start)

- **Время сборки:** ~9.7 сек
- **Размер файлов:**

| Файл |	Размер | 
|------|---------|
| static/scripts/main.2aad753fe87948d1dc41.js |	537 kB |
|static/styles/main.566492e7af92159284ab.css |	54.3 kB |
| index.html |	434 bytes |
| **Итого** (entrypoint) |	591 KiB |
