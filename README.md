# Медицинская информационная система

Этот проект является курсовой работой на курсе Т-Банк Финтех Javascript.  
Автор: Гришенков Павел Федорович  
Ссылка: [https://courseworktrynottodie.vercel.app/](https://courseworktrynottodie.vercel.app/)

## Краткое описание

Медицинская информационная система (МИС) — это веб-приложение, которое позволяет врачам вести учет пациентов, управлять осмотрами и генерировать отчеты.

Проект поддерживает авторизацию, регистрацию пользователей (врачей), работу с профилем, список пациентов, карту пациента, создание и редактирование осмотров, а также генерацию статистических отчетов.

## Основные функции и маршруты

### Авторизация

- **URL:** `/login`
- **Описание:**  
Пользователь вводит email и пароль для авторизации. Успешный вход возвращает токен авторизации.
- **Примечания:**  
После успешного входа кнопка "Вход" в навбаре меняется на кнопку с ФИО пользователя. При нажатии на ФИО доступен выпадающий список с кнопками:
  - "Профиль"
  - "Выход"

### Регистрация

- **URL:** `/registration`
- **Описание:**  
Регистрация новых пользователей (только для врачей). Успешная регистрация возвращает токен авторизации.

### Профиль

- **URL:** `/profile`
- **Описание:**  
Страница профиля позволяет редактировать личные данные врача:
  - Email
  - ФИО
  - Телефон
  - Пол
  - Дата рождения

### Список пациентов

- **URL:** `/patients`
- **Описание:**  
Отображение списка всех пациентов системы.
- **Поддерживаемые функции:**  
  - **Пагинация:**
    Пример URL:
    - `/patients/?page=1&size=5`
    - `/patients/?page=2&size=10`
  - **Фильтрация и сортировка:**
    Пример URL:
    - `/patients?name=Иван&conclusions=Disease&page=1`
    - `/patients?onlyMine=true&sorting=CreateDesc`
- **Фильтры:**
  - Поиск по имени пациента
  - Фильтрация по заключению осмотра (выздоровление, болезнь, смерть)
  - Наличие запланированных визитов
  - Только мои пациенты
- **Сортировка:**
  - По имени (А-Я/Я-А)
  - По дате создания (новые/старые)
  - По дате осмотров (новые/старые)

### Карта пациента

- **URL:** `/patient/{id}`
- **Описание:**  
Страница с деталями пациента и списком его осмотров.
- **Поддерживаемые функции:**  
  - **Пагинация:**
    Пример URL:
    - `/patient/{id}?page=1&size=5`
    - `/patient/{id}?page=2&size=10`
  - **Фильтрация и сортировка:**
    Пример URL:
    - `/patient/{id}?icdRoots=e42b938d-1f3b-4119-b495-18afa80f6543`
    - `/patients/{id}?grouped=true`
- **Фильтры:**
  - По корневым кодам МКБ-10
  - Группировка по повторным осмотрам
- **Особенности:**
  - Осмотры пациента делятся на 2 колонки на широких экранах и в 1 колонку на узких.
  - Иконки пациентов различаются по полу.
  - Осмотр с заключением "Смерть" выделяется цветом, пациент не может иметь дальнейших осмотров.
  - При выборе критерия "Сгруппировать по повторным" осмотры группируются в цепочки взаимосвязанных осмотров.
  - На странице присутствует 2 вида кнопок "Добавить осмотр":
    1. Расположена вверху страницы.
    2. Расположена на карточке осмотра:
       - Отображается только в том случае, если у осмотра еще нет дочерних осмотров.
       - При нажатии новый осмотр будет отмечен как "Повторный осмотр", а данный осмотр будет выбран как предыдущий для создаваемого.

### Создание осмотра

- **URL:** `/inspection/create`
- **Описание:**  
Форма для создания нового осмотра.
- **Требования:**
  - Дата осмотра не может быть в будущем.
  - Нельзя создать более одного осмотра с заключением "Смерть".
  - Основной диагноз обязателен.
  - При создании консультации необходимо указать комментарий, описывающий проблему.
  - Заключения:
    - "Болезнь" — указать дату следующего визита.
    - "Смерть" — указать дату и время смерти.
    - "Выздоровление" — дополнительная информация не требуется.

### Страница осмотра

- **URL:** `/inspection/{id}`
- **Описание:**  
Страница с подробностями осмотра.
- **Особенности:**
  - При нажатии на кнопку редактирования осмотра открывается модальное окно, предоставляющее возможность отредактировать основные поля осмотра:
    - Жалобы
    - Анамнез заболевания
    - Рекомендации по лечению
    - Диагнозы
    - Заключение
  - Редактирование осмотра доступно только врачу, создавшему данный осмотр!
  - Просмотр и добавление комментариев к консультациям.

### Список консультаций

- **URL:** `/consultations`
- **Описание:**  
Список осмотров с консультациями, соответствующими специальности врача.
- **Поддерживаемые функции:**
  - **Пагинация:**
    Пример URL:
    - `/consultations?page=1&size=5`
    - `/consultations?page=2&size=10`
  - **Фильтрация и сортировка:**
    Пример URL:
    - `/consultations?icdRoots=e42b938d-1f3b-4119-b495-18afa80f6543`
    - `/consultations?grouped=true`
- **Фильтры:**
  - По корневым кодам МКБ-10
  - Группировка по повторным осмотрам
- **Особенности:**
  - Осмотры делятся на 2 колонки на широких экранах и в 1 колонку на узких.
  - Осмотр с заключением "Смерть" выделяется цветом, пациент не может иметь дальнейших осмотров.
  - При выборе критерия "Сгруппировать по повторным" осмотры группируются в цепочки взаимосвязанных осмотров.

### Генерация отчета

- **URL:** `/reports`
- **Описание:**  
Форма для генерации отчетов по статистике осмотров.
- **Поля фильтрации:**
  - Диапазон дат
  - По корневым кодам МКБ-10
- **Отчет отображается в виде таблицы:**
  - Колонки — корни МКБ-10
  - Строки — пациенты
  - В ячейке — количество осмотров по каждой группе.

### Not found

- **URL:** `*`
- **Описание:**  
Страница с сообщением об ошибке 404, когда пользователь пытается перейти по несуществующему маршруту.
- **Функции:**  
Предлагает перейти на страницу "Авторизация" или "Список пациентов".
