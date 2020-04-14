![alt text](https://i.ibb.co/yQwyp0R/123.png "Logo NewsExplorer")

## для проекта [news-explorer](http://news-explorer.ru/)

DEMO: https://zuhijan.github.io/news-explorer/
Полный функционал доступен при развертывании локально. 
Backend код этого проекта: https://github.com/zuhijan/news-exlorer-api


### Процесс работы
- По ключевым словам, мы обращаемся к публичкому API  https://newsapi.org.
- После положительного ответа отображаем первые 3 статьи. 
- При нажаитии на "Показать еще"
подгружаем по 3 статьи. 
- Для авторизации обращаемся к бэкенду по адресу api.news-explorer.ru.
- Реализована валидация данных полей и отображение ошибки, при некорректной авторизации.
- Для авторизованного пользователя доступно сохранение статей, 
которые отображаются в разделе "Сохраненные статьи".
- Данные пользователя сохраняются в localStorage. При выходе - очищаются. 


### Задача проекта
Учебный проект реализующий интерфейс поиска новостных статей по запросу. 
Интерфейс регистрации и авторизации. Сохранение статей в избранное.

### Используемые технологии
HTML, CSS, 
JavaScript (Отправка запросов, Валидация, Открытие попапов, отрисовка карточек), 
Webpack (сборка develop, production и deploy), npm.


---
### Установка и запуск проекта

Склонируйте гит-репозиторий
> git clone <https://github.com/zuhijan/news-explorer.git>

Установите npm-зависимости
> npm install

#### Запустите проект

Production сборка.Запустить сервер на localhost:8080.
> npm run start

Dev сборка.Запустить сервер на localhost:8080 с хот релоудом;
> npm run dev

Deploy на github
> npm run deploy
