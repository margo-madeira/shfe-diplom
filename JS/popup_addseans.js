const btnCloseSeanse = document.querySelector(".close__addfilm_seanse");
const contSeans = document.querySelector(".seans");
const formSeans = document.querySelector(".form_addfilm_seans");
const cancelSeanse = document.querySelector(".btn__addfilm_cancel");
const filmNameSeanse = document.querySelector(".select__addseans_film");
const hallNameSeanse = document.querySelector(".select__addseans_hall");
const timeNameSeanse = document.querySelector('.select_time');
const btnAdds = document.querySelector(".btn__addfilm_adds");
let arrForTime = [];
let checkFilmDuration;
let resultForTime = [];
let diffrens;
let result;
let checkedIdHall;
let checkedIdfilm;
let checkedTime;
let countOfTime = 0;
let resultHour;
let resultMin;
let checkedIdfilmName;

    
//заполнение листа залов и др
fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
    .then( response => response.json())
    .then( function(data) {
        console.log(data);

        //сортируем время
        let arrSort = [];
        for(let i = 0; i < data.result.seances.length; i++) {
            arrSort.push(data.result.seances[i]);
        }
        arrSort.sort(function(a, b) {
            return a.seance_time.replace(':', '') - b.seance_time.replace(':', '');
        });
            
        //клик на зал
        hallNameSeanse.addEventListener('focus', (e) => {
            
            //удаляем старую разметку
            timeNameSeanse.length = 0;
            hallNameSeanse.length = 0;
            resultForTime.length = 0;
             
            for(let i = 0; i < data.result.halls.length; i++) {
                e.target.insertAdjacentHTML('beforeend', `<option class="option_addseans name_of_hall" data-id="${data.result.halls[i].id}">${data.result.halls[i].hall_name}</option>`);
            }
            //если выбран первый эл select
            checkedIdHall = Number(e.target.options[0].dataset.id);
        })//клик поselect
           
        //выбор зала
        hallNameSeanse.addEventListener('change', (e) => {
            timeNameSeanse.length = 0;
            resultForTime.length = 0; 
            arrForTime.length = 0;           
            checkedIdHall = Number(e.target.options[e.target.selectedIndex].dataset.id);   
        })//выбор зала клик
                 
            
        //клик фильм
        filmNameSeanse.addEventListener('focus', (e) => {
            //удаляем старую разметку
            filmNameSeanse.length = 0;
            timeNameSeanse.length = 0;
            for(let i = 0; i < data.result.films.length; i++) {
                e.target.insertAdjacentHTML('beforeend', `<option class="option_addseans name_of_film" data-id="${data.result.films[i].id}">${data.result.films[i].film_name}</option>`);
            } 
            //если выбран первый эл select
            checkedIdfilm = Number(e.target.options[0].dataset.id);  
            checkedIdfilmName = e.target.options[0].text;
            for(let i = 0; i < data.result.films.length; i++) {
                if(data.result.films[i].id === checkedIdfilm) {
                    checkFilmDuration = Number(data.result.films[i].film_duration);
                }
            }
        })
   
        //выбор фильма
        filmNameSeanse.addEventListener('change', (e) => { 
            timeNameSeanse.length = 0;
            checkedIdfilm = Number(e.target.options[e.target.selectedIndex].dataset.id);
            checkedIdfilmName = e.target.options[e.target.selectedIndex].text;
            for(let i = 0; i < data.result.films.length; i++) {
                if(data.result.films[i].id === checkedIdfilm) {
                    checkFilmDuration = Number(data.result.films[i].film_duration);
                }
            }
        })//выбор фильма

        //клик время
        timeNameSeanse.addEventListener('focus', (e) => { 
            if(filmNameSeanse.value.trim() && hallNameSeanse.value.trim()) {
                timeNameSeanse.length = 0;  
                resultForTime.length = 0;
                
                for(let i = 0; i < arrSort.length; i++) { 
                    for(j = 0; j < data.result.films.length; j++) {

                        if(Number(arrSort[i].seance_hallid) === checkedIdHall) {//ищем зал
                            if(Number(arrSort[i].seance_filmid) === Number(data.result.films[j].id)) {//ищем фильм
                                let searchDuration = data.result.films[j].film_duration;//продолжительн фильма
                                //считаем свободное время
                                let hourAndMinutes = arrSort[i].seance_time.split(':', [2]);
                                let inMinutes = Number(hourAndMinutes[0]) * 60 + Number(hourAndMinutes[1]);
                                let searchTime = inMinutes + Number(searchDuration);
                                arrForTime.push(searchTime);//массив свободного времени

                                if(arrForTime.length > 1) {
                                    //находим разницу м/у каждой парой в массиве времени
                                    for(let k = countOfTime; k < arrForTime.length; k++) {
                                        countOfTime++;
                                        diffrens = inMinutes - arrForTime[k];
                                        if(diffrens >= checkFilmDuration) {
                                            resultForTime.push(arrForTime[k]);
                                        } else {
                                            break;
                                        } 
                                    }
                                    break;
                                }
                            break;
                            } 
                        } 
                    }//внутр цикл
                }//внеш цикл
            
                //начиная с последнего сеанса в зале,добав время до 23:59
                if((arrForTime.length > 0) && (arrForTime[arrForTime.length - 1] + checkFilmDuration) < 1439) {
                    resultForTime.push(arrForTime[arrForTime.length - 1]);
                } else {
                    arrForTime.length = 0;
                    resultForTime.push(0);
                }
                
                //формир разметку
                for(let i = 0; i < resultForTime.length; i++) {
                    //переводим минуты в часы
                    let reversHour = Math.floor(Number(resultForTime[i]) / 60);
                    let reversMunut = Number(resultForTime[i]) - (reversHour * 60);
                    if(reversMunut < 10) {
                        resultMin = ":0" + reversMunut; 
                    } else {
                        resultMin = ":" + reversMunut;
                    }
                    if(reversHour < 10) {
                        resultHour = "0" + reversHour; 
                    } else {
                        resultHour = reversHour;
                    }
                    result = resultHour + resultMin;
                    
                    e.target.insertAdjacentHTML('beforeend', `<option class="option_addseans name_of_time" data-id="">${result}</option>`);
                } 
                checkedTime = e.target.options[0].text;
            }
        })
           

        //выбор времени
        timeNameSeanse.addEventListener('change', (e) => { 
            checkedTime = e.target.options[e.target.selectedIndex].text;
        })

        //клик добавить сеанс на страницу
        btnAdds.addEventListener('click', () => {
            localStorage.setItem('checkedIdHall', `${checkedIdHall}`);
            localStorage.setItem('checkedIdfilm', `${checkedIdfilm}`);
            localStorage.setItem('checkedTime', `${checkedTime}`);
            localStorage.setItem('checkedIdfilmName', `${checkedIdfilmName}`);
            localStorage.setItem('seanseOpen', 'was open');
            contSeans.classList.remove("container__addfilm_active");
            //очищаем форму
            formSeans.reset();

        })
         
        //клик по отмене
        cancelSeanse.addEventListener('click', () => {
            inpChip.value = "";
            inpVip.value = "";
            controller.abort();
        })

        //клик по крестику
        btnCloseSeanse.addEventListener('click', () => {
            //удаляем старую разметку
            hallNameSeanse.length = 0;
            filmNameSeanse.length = 0;
            contSeans.classList.remove("container__addfilm_active");
        })
    })//fetch
