const qr = document.querySelector('.qr');
let checkedSeans = localStorage.getItem('checkedSeans');
let tickets = JSON.parse(localStorage.getItem('tickets'));
let ticketsClient = JSON.parse(localStorage.getItem('ticketsClient'));
let checkedDate = localStorage.getItem('checkedDate');
let searchMonth = localStorage.getItem('searchMonth');
let searchPrice = localStorage.getItem('searchPrice');
let year = localStorage.getItem('checkedYear');
const filmName = document.querySelector('.name__payment').firstElementChild;
const placeInHeader = document.querySelector('.place__payment').firstElementChild;
const hall = document.querySelector('.hall__payment').firstElementChild;
const time = document.querySelector('.time__payment').firstElementChild;
let arrOfRow = [];

//запрос на сервер
fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
.then( response => response.json())
.then( function(data) {
    console.log(data);
    //находим сеанс по его id
    let indSeans = data.result.seances.findIndex(el => el.id === Number(checkedSeans));

    //заносим данные в шапку
    let indFilm = data.result.films.findIndex(el => el.id === data.result.seances[indSeans].seance_filmid);  
    filmName.textContent = `${data.result.films[indFilm].film_name}`;
    time.textContent = `${data.result.seances[indSeans].seance_time}`;
    let findHallId = data.result.halls.findIndex(el => data.result.seances[indSeans].seance_hallid === el.id);
    hall.textContent = data.result.halls[ findHallId].hall_name;
    for(let i = 0; i < ticketsClient.length; i++) {
      let searchPlaces = ticketsClient[i];
      if((i + 1) < ticketsClient.length) {
        placeInHeader.textContent += searchPlaces + ', ';
      } else if((i + 1) === ticketsClient.length) {
        placeInHeader.textContent += searchPlaces;
      }
    }
    
    //заносит цену и данные для кодирования
    const qrcode = QRCreator(`дата:${checkedDate}-${searchMonth}-${year},время:${time.textContent},фильм:${filmName.textContent},зал:${hall.textContent},ряд/место: ${placeInHeader.textContent},стоимость: ${searchPrice},Билет действителен строго на свой сеанс`,    
    {mode: -1,
      eccl: 0,
      version: -1,
      mask: -1,
      image: 'html',
      modsize: 3,
      margin: 2}
      );
    const content = (qrcode) =>{
        return qrcode.error ?
          `недопустимые исходные данные ${qrcode.error}`:
          qrcode.result;
      };
    console.log(qrcode.result);
    qr.append(content(qrcode));
})
localStorage.clear();
