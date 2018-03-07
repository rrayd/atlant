# Atlant 🚑
medical pages

## Необходимо установить для сборщика
* node.js [install](https://nodejs.org/en/download/)
* ruby (for sass) [install](https://www.ruby-lang.org/en/downloads/)
* gulp (глобально) в node.js command prompt напишите `npm i -g gulp`

### Установка сборщика
Запустите node.js command prompt, перейдите в директорию проекта, напишите:
```terminal
npm install
```

### Режим разработчика
Запустите node.js command prompt, перейдите в директорию проекта, напишите:
```terminal
gulp serve
```
Изменения файлов в директории `/app` автоматически синхронизируются с браузером.
`/app` : здесь находится исходный неинтерпретированный код Вашего лэндинга.
Для стилей используется sass https://sass-scss.ru

### Сборка без интепретации (pre-production)
```terminal
gulp unless
```
Будет создана директория `/unless`

### Сборка минифицированная (production)
```terminal
gulp build
```
Будет создана директория `/dist`

