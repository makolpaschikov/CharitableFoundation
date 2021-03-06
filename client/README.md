Инструкции по работе с клиентом

# Разработка

До начала разработки нужно перейти в папку клиента и установить зависимости

```
$ cd client
$ npm install
```

Обычно один раз установить их достаточно, но с ходом разработки могут появляться новые, поэтому периодически могут появляться ошибки вида "cannot find module ...", это значит, что нужно запустить `npm install` ещё раз.

Далее для старта клиента

```
$ npm start
```

Команда сама запустит сервер на http://localhost:3000 и откроет страницу в браузере. Все запросы которые реакт не умеет обрабатывать (то есть запросы к API) будут проксироваться на адрес http://localhost:8080 где основной сервер должен с ними разобраться и вернуть ответ. То есть для разработки надо запустить обе программы: клиент и сервер, клиент сам разберётся что куда отправлять.

# Продакшн

В проде нужно собрать проект

```
$ cd client
$ npm run build
```

Появится папка `build` в которой лежат все статические файлы, нужные клиенту.

## Что должен делать сервер

Правильно отвечать на все GET запросы.

1. Если путь запроса совпадает с путём к какому-нибудь файлу в `build`, отправлять этот файл. Пример файлов, которые сервер должен вернуть на соответствующие запросы:

    - `/static/js/main.asd91s.chunk.js` -> `client/build/static/js/main.asd91s.chunk.js`
    - `/static/css/main.asd91s.chunk.css` -> `client/build/static/css/main.chunk.asd91s.css`
    - `/favicon.ico` -> `client/build/favicon.ico`

2. На все остальные запросы (кроме ендпоинтов API) возвращать файл `build/index.html`. Пример:

    - `/` -> `client/build/index.html`
    - `/index.html` -> `client/build/index.html`
    - `/profile` -> `client/build/index.html`
    - `/some-page-that-doesnt-exist` -> `client/build/index.html`

Для определенности я бы порекомендовал всем ендпоинты API делать пути `/api/...`, например `/api/login`, `/api/get-catalog` или `/api/restore-password`
