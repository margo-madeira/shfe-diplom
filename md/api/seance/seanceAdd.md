## Добавление нового сеанса

## ![POST](../img/post.svg) / seance

**_Добавляет_** новый сеанс в систему.  
**_Возвращает_** список всех сеансов.

## Параметры:

- **seanceHallid** - ID кинозала в котором будет проходить сеанс (число) - передают в теле запроса
- **seanceFilmid** - ID фильма, который будут показывать на сеансе (число) - передают в теле запроса
- **seanceTime** - Время сеанса  (текст) - передают в теле запроса.  
Время имеет вид `HH:MM` (Напрмиер `"09:30"`)  

    #### Нюансы работы кинотеатра
  - Последний сеанс должен заканчиваться не позднее 23:59
  - Разные сеансы идущее в одном зале не должны пересекаться по времени.  
  Например, сеанс начался в `10:00`, длительность фильма `120` мин (2 часа) - следовательно следующий сеанс в этом зале можно поставить только c `12:00`
  - Расписание сеансов каждый день одинаковое.

## Результат (`result`)

```javascript 
{  
  seances: [], // Список сеансов 
}  
```
