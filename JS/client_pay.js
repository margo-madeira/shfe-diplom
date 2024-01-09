const btnPay = document.querySelector(".btn_pay");
let tickets = JSON.parse(localStorage.getItem('tickets'));
console.log(tickets);
let arrForSumm = [];
let searchPrice;
let checkedDate = localStorage.getItem('checkedDate');
let searchMonth = localStorage.getItem('searchMonth');
let year = new Date().getFullYear();
let arrOfRow = [];

const filmName = document.querySelector('.name__payment').firstElementChild;
const searchPlace = document.querySelector('.place__payment').firstElementChild;
const hall = document.querySelector('.hall__payment').firstElementChild;
const time = document.querySelector('.time__payment').firstElementChild;
const price = document.querySelector(".price__payment").firstElementChild;

//формирует шапку
let checkedSeans = localStorage.getItem('checkedSeans');

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
    for(let i = 0; i < tickets.length; i++) {
         let searchPlaces = tickets[i].place;
         let numbOfRows = tickets[i].row;
         arrOfRow.push(numbOfRows);
         if((i + 1) < tickets.length) {
            searchPlace.textContent += Array.from(searchPlaces) + ',';
         } else if((i + 1) === tickets.length) {
            searchPlace.textContent += Array.from(searchPlaces);
         }
        arrForSumm.push(Number(tickets[i].coast));
         
    }
    searchPrice = arrForSumm.reduce((acc, number) => acc + number, 0);
    price.textContent = searchPrice;
    localStorage.setItem('searchPrice', searchPrice);


    btnPay.addEventListener('click', () => {

        const formData = new FormData();
        formData.set('seanceId', `${checkedSeans}`);
        formData.set('ticketDate', `${checkedDate}-${searchMonth}-${year}`);
        formData.set('tickets', `${JSON.stringify(tickets)}`);
        fetch( 'https://shfe-diplom.neto-server.ru/ticket',{
            method: 'POST',
            body: formData
        })
            .then( response => response.json())
            .then( function(data) {
                console.log(data);  
        })  
        document.location='../index/client_ticket.html';
    })
})
