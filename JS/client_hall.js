const btnReserv = document.querySelector(".btn");
const main = document.querySelector(".main");
const filmTime = document.querySelector(".film__time");
const filmName = document.querySelector(".film__name");
const hallNumber = document.querySelector(".hall__number");
const places = document.querySelector(".places");
let checkedSeans = localStorage.getItem('checkedSeans');
let arr = [];
let ticket;
let coast;
let numbOfRow;
let numbOfPlace;


//тап по экрану
touchCount = 0;
main.addEventListener('touchstart', () => {
    touchCount++;
})

main.addEventListener('touchend', () => {
    if(touchCount %2 === 0) {
        main.style.width = Number(main.style.width) * 1.5;
    }
})

//запрос на сервер
    fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
    .then( response => response.json())
    .then( function(data) {
        console.log(data);

        //находим сеанс по его id

        let indSeans = data.result.seances.findIndex(el => el.id === Number(checkedSeans));

        //заносим данные в шапку
        let indFilm = data.result.films.findIndex(el => el.id === data.result.seances[indSeans].seance_filmid);  
        filmName.textContent = data.result.films[indFilm].film_name;
        filmTime.textContent = "Начало сеанса: " + data.result.seances[indSeans].seance_time;
        let findHallId = data.result.halls.findIndex(el => data.result.seances[indSeans].seance_hallid === el.id);
        hallNumber.textContent = data.result.halls[ findHallId].hall_name;

        //загружает конфигурацию зала
        let currentDate = new Date();
        let today = currentDate.getDate();
        let month = currentDate.getMonth();
        let fullYear = currentDate.getFullYear();
        let seanceId = Number(checkedSeans);
        let checkedDate = toString(fullYear-month-today);

        fetch( `https://shfe-diplom.neto-server.ru/hallconfig?seanceId=${seanceId}&date=${checkedDate}` )
        
            .then( response => response.json())
            .then( function(data) {
                console.log( data );

                data.result.forEach(element => {
                    places.insertAdjacentHTML('beforeend', `<div class="rows_of_scheme"></div>`);

                });

                let maxPlaces;
                const rowsOfScheme = Array.from(document.querySelectorAll(".rows_of_scheme"));
                for(let i = 0; i < rowsOfScheme.length; i++) {
                    for(let j = 0; j < data.result[i].length; j++) {
                        rowsOfScheme[i].insertAdjacentHTML('beforeend', `<div class="place_of_scheme" data-id="${data.result[i][j]}"><img src="" class="img_place_scheme"></div>`);
                        maxPlaces = data.result[i].length;
                    }
                }

                const placeOfScheme = Array.from(document.querySelectorAll(".place_of_scheme"));
                for(let i = 0; i < placeOfScheme.length; i++) {
                if(placeOfScheme[i].dataset.id === "vip") {
                    placeOfScheme[i].firstElementChild.src = '../images/свободно_вип.png';        
                }
                if(placeOfScheme[i].dataset.id === "standart") {
                    placeOfScheme[i].firstElementChild.src = '../images/свободно.png';        
                }
                if(placeOfScheme[i].dataset.id === "taken") {
                    placeOfScheme[i].firstElementChild.src = '../images/занято.png';        
                }      
            }
            
            //при выборе мест
            
            places.addEventListener('click', (e) => {
            
                if(e.target.classList.contains("place_of_scheme")) {
                    e.target.firstElementChild.src = '../images/выбрано.png';
                    e.target.firstElementChild.classList.add("check_blue");
                }
                if(e.target.classList.contains("img_place_scheme")) {
                    e.target.src = '../images/выбрано.png';
                    e.target.classList.add("check_blue");
                }

            
                let indPlace = placeOfScheme.findIndex(el => el.firstElementChild.classList.contains("check_blue"));
                numbOfRow = Math.ceil((indPlace + 1) / maxPlaces);
                numbOfPlace = (indPlace + 1) - (maxPlaces * (numbOfRow - 1));
                if(e.target.closest(".place_of_scheme").dataset.id === "vip") {
                    coast = 350;
                }
                if(e.target.closest(".place_of_scheme").dataset.id === "standart") {
                    coast = 250;
                } 
                function Ticket(numbOfRow, numbOfPlace, coast) {
                    this.row = `${numbOfRow}`;
                    this.place = `${numbOfPlace}`;
                    this.coast = `${coast}`;      
                }
                ticket = new Ticket(numbOfRow, numbOfPlace, coast);
                arr.push(ticket);
                return;
                
            })//клик по месту 
       
        
        //клик по кнопке
        btnReserv.addEventListener('click', () => { 
            localStorage.setItem('tickets', JSON.stringify(arr));
            document.location='../index/client_pay.html';
        })
    })//config

})//alldata
