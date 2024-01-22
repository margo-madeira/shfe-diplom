const btnAddHall = document.querySelector(".add_hall");
const containerAddHall = document.querySelector(".hall");
const btnAddFilm = document.querySelector(".adm_add-film");
const addFilm = document.querySelector(".film");
const hallList = document.querySelector(".hall-list");
const btnDeleteHall = Array.from(document.querySelectorAll(".btn_remove"));
const hallConfigList = document.querySelector(".ul_hall__config");
const rows = document.getElementById("rows");
const places = document.getElementById("places");
const btnDeleteConfig = document.querySelector(".delete_config__btn");
const btnSaveConfig = document.querySelector(".save_config__btn");
const ulHallPrice = document.querySelector(".ul_hall__price");
const installPrice = document.querySelector(".install_price");
const inpChip = document.querySelector(".chip");
const inpVip = document.querySelector(".vip");
const deleteBtnPrice = document.querySelector(".delete_price__btn");
const saveBtnPrice = document.querySelector(".save_price__btn");
const filmList = document.querySelector(".film__list");
const admFilm = document.querySelectorAll(".adm_film");
const timeLineList = document.querySelector(".time-line__list");
let controller = new AbortController();
let signal = controller.signal;
signal.addEventListener('abort', () => console.log("отмена!"));
let counClick = 0;
const admschemeTap = document.querySelector(".adm_scheme-tap");
const containerSeans = document.querySelector(".seans");
const ulHallOpen = document.querySelector(".ul_hall__open");
const btnOpen = document.getElementById("btn_open");
const openSellBtn = document.getElementById("open__sell_btn");
const btnFilmSeanseSave = document.querySelector(".save_seanse_film");
const deleteFilmSeanse = document.querySelector(".delete_film_seanse");
const deleteSeances = document.querySelector(".delete__seances");

//popup доб зала
const inp = document.querySelector(".row__text");
const btnAdd = document.querySelector(".btn__add_hall");
const btnRemove = document.querySelector(".btn__white");
const closeBtn = document.querySelector(".close_popup_seans");
const form = document.querySelector(".form_addfilm");
const addHall = document.querySelector(".hall");

//popup доб фильм
const btnClose = document.querySelector(".close_popup");
const btnAddsFilm = document.querySelector(".save__film");
const btnCancel = document.querySelector(".cancel");
const filmContainer = document.querySelector(".film");
const formAddfilm = document.querySelector(".form_addfilm");
let file;
const filmName = document.querySelector(".filmname");
const filmDuration = document.querySelector(".filmtime");
const filmDescription = document.querySelector(".description");
const filmOrigin = document.querySelector(".origin");

//popup доб сеанс
const btnCloseSeanse = document.querySelector(".close__addfilm_seanse");
const contSeans = document.querySelector(".seans");
const formSeans = document.querySelector(".form_addfilm_seans");
const cancelSeanse = document.querySelector(".btn__addfilm_cancel");
const filmNameSeanse = document.querySelector(".select__addseans_film");
const hallNameSeanse = document.querySelector(".select__addseans_hall");
const timeNameSeanse = document.querySelector('.select_time');
const btnAdds = document.querySelector(".btn__addfilm_adds");
let arrr = [];//дублирует все сеансы
let arrForTime = [];
let checkFilmDuration;
let resultForTime = [];
let diffrens;
let result;
let checkedIdHall;
let checkedIdfilm;
let checkedTime;
let countOfTime = 0;
let timeCount = 1;
let resultHour;
let resultMin;
let checkedIdfilmName;
let searchDuration;
let firstSeans;
let firstSeansInMin;

//popup удал сеанса
const closeDelSeans = document.querySelector(".close_del_seans");
const containerDelSeans = document.querySelector(".delete__seances");
const labelFilm = document.querySelector(".label_delete__seanse");
let nameOfFilms = localStorage.getItem('name');
const delSeans = document.querySelector(".del_seans");
const delSeansCancel = document.querySelector(".del_seans_cancel");
let checkDel;

//клик по закрыть в popup зал
closeBtn.addEventListener('click', () => {
  addHall.classList.remove("container__addfilm_active");  
})
//клик отменить в popup зал
btnRemove.addEventListener('click', () => {
  controller.abort();
  form.reset();
})

//клик по добавить зал
btnAdd.addEventListener('click', (e) => {
  const formData = new FormData();
  formData.set('hallName', `${inp.value}`)
  if(inp.value.trim()) {
    fetch( 'https://shfe-diplom.neto-server.ru/hall',{
      method: 'POST',
      body: formData
    })
      .then( response => response.json())
      .then( function(data) {
        console.log(data);  
        hallList.insertAdjacentHTML('beforeend', `<div class="remove_hall">
          <div class="hall-list_numb" data-id="${data.result.halls.id}">
          <div class="def">- </div>
          <div class="adm_hall-number">${inp.value}</div>
          </div>
          <button class="btn_remove"></button>
          </div>`);

        inp.value = "";
        containerAddHall.classList.remove('container__addfilm_active');
        location.reload();
      })
  }    
})

//переход на popup
btnAddHall.addEventListener('click', () => {
    containerAddHall.classList.add('container__addfilm_active');
})

//заполнение листа залов и др
fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
  .then( response => response.json())
  .then( function(data) {
      console.log(data);
      for(let i = 0; i < data.result.halls.length; i++) {

        //разметка под удаление зала
        hallList.insertAdjacentHTML('beforeend', `<div class="remove_hall">
                <div class="hall-list_numb" data-id="${data.result.halls[i].id}">
                    <div class="def">- </div>
                    <div class="adm_hall-number">${data.result.halls[i].hall_name}</div>
                </div>
                <button class="btn_remove"></button>
            </div>`);

        //разметка для зал config
        hallConfigList.insertAdjacentHTML('afterbegin', `<li class="hall_item hall_item__config" data-id="${data.result.halls[i].id}">${data.result.halls[i].hall_name}</li>`);
        
        //разметка для зала цен
        ulHallPrice.insertAdjacentHTML('afterbegin', `<li class="hall_item hall_item__price" data-id="${data.result.halls[i].id}">${data.result.halls[i].hall_name}</li>`)
     
        //разметка для зала открытий
        ulHallOpen.insertAdjacentHTML('afterbegin', `<li class="hall_item hall_item__open" data-id="${data.result.halls[i].id}">${data.result.halls[i].hall_name}</li>`)
      }

      let countOfFilms = 0;
      //разметка под фильмы
      for(let i = 0; i < data.result.films.length; i++) {
        countOfFilms++;//для фона
        if(countOfFilms < 6){
          filmList.insertAdjacentHTML('beforeend', `<div draggable="true" class="adm_film bg_${countOfFilms}" data-id=${data.result.films[i].id}>
              <img src="${data.result.films[i].film_poster}" alt="постер" class="adm_film-img">
              <div class="adm_film-info">
                  <p class="adm_film-name">${data.result.films[i].film_name}</p>
                  <p class="adm_film-timer">${data.result.films[i].film_duration}</p>
              </div>
              <button class="delete_film"></button>
              </div>`);
        } else {
          countOfFilms = 1;
          filmList.insertAdjacentHTML('beforeend', `<div draggable="true" class="adm_film bg_${countOfFilms}" data-id=${data.result.films[i].id}>
              <img src="${data.result.films[i].film_poster}" alt="постер" class="adm_film-img">
              <div class="adm_film-info">
                  <p class="adm_film-name">${data.result.films[i].film_name}</p>
                  <p class="adm_film-timer">${data.result.films[i].film_duration}</p>
              </div>
              <button class="delete_film"></button>
              </div>`);
          countOfFilms++;
        }
      }

      //клик по удалить зал
      hallList.addEventListener('click', (e) => {
        if(e.target.classList.contains("btn_remove")) {
          let halllId = e.target.previousElementSibling.dataset.id;
          fetch( `https://shfe-diplom.neto-server.ru/hall/${halllId}`, {
             method: 'DELETE',
          })
            .then( response => response.json())
            .then( function(data) {
              console.log( data );
              location.reload();
            })
        } else {
          return;
        }
      }) 

      //изменяет конфигурацию
      let arrayConfig = [];   
      const hallItemConfig = Array.from(document.querySelectorAll(".hall_item__config"));
      for(let i = 0; i < hallItemConfig.length; i++) {
        hallItemConfig[i].addEventListener('click', () => {
          counClick++;
          hallItemConfig[i].classList.add("hall_item_checked");
          hallItemConfig[i].classList.remove("hall_item");
          let hallConfId = hallItemConfig[i].dataset.id;
          for(let j = 0; j < hallItemConfig.length; j++) {
            if(j !== i) {
              hallItemConfig[j].classList.remove("hall_item_checked");
              hallItemConfig[j].classList.add("hall_item");
            }
          }     
      
        //загружаем картинку
        let indHall = data.result.halls.findIndex(hall => hall.id === Number(hallConfId));
        //удаляем старую разметку
        admschemeTap.removeChild(admschemeTap.firstElementChild);

        admschemeTap.insertAdjacentHTML('beforeend', `<div class="scheme_of_hall"></div>`);
        const schemeOfHall = document.querySelector('.scheme_of_hall');
        data.result.halls[indHall].hall_config.forEach(element => {
          schemeOfHall.insertAdjacentHTML('beforeend', `<div class="conf-step__row"></div>`);
        });

        const confStepRow = Array.from(document.querySelectorAll(".conf-step__row"));

        for(let j = 0; j < confStepRow.length; j++) {
          for(let k = 0; k < data.result.halls[indHall].hall_config[0].length; k++) {
            confStepRow[j].insertAdjacentHTML('beforeend', `<div class="conf-step__chair" data-id="${data.result.halls[indHall].hall_config[j][k]}"><img src="" class=""></div>`);
          }
        }//закр циклы

        const confStepChair = Array.from(document.querySelectorAll(".conf-step__chair"));

        for(let j = 0; j < confStepChair.length; j++) {
          if(confStepChair[j].dataset.id === "vip") {
            confStepChair[j].firstElementChild.src = './images/adm__chair1.png';        
          }
          if(confStepChair[j].dataset.id === "standart") {
            confStepChair[j].firstElementChild.src = './images/adm__chair.png';        
          }
          if(confStepChair[j].dataset.id === "disabled") {
            confStepChair[j].firstElementChild.src = './images/adm__chair2.png';        
          } 
        }
   
        //вводится новое значение рядов
        places.addEventListener('input', () => {
        
          if(rows.value.trim() && places.value.trim()) {
            //удалить старую разметку
            admschemeTap.removeChild(admschemeTap.firstElementChild);
            confStepRow.length = 0;

            admschemeTap.insertAdjacentHTML('beforeend', `<div class="scheme_of_hall"></div>`);
            for(let j = 0; j < rows.value; j++) {
              const schemeOfHall = document.querySelector(".scheme_of_hall") ;
              schemeOfHall.insertAdjacentHTML('beforeend', `<div class="conf-step__row"></div>`);
              arrayConfig.push(new Array());
            }
            
            const arrForRow = Array.from(document.querySelectorAll(".conf-step__row"));
            for(let j = 0; j < arrForRow.length; j++) {
              for(let k = 0; k < places.value; k++){
                arrForRow[j].insertAdjacentHTML('beforeend', `<div class="conf-step__chair" data-id="disabled"><img src="./images/adm__chair2.png" class=""></div>`);
                arrayConfig[j].push("disabled");
              }
            }
          }

        //при клике по схеме мест
        const arrForChair = Array.from(document.querySelectorAll(".conf-step__chair"));
        for(let j = 0; j < arrForChair.length; j++) {
          arrForChair[j].addEventListener('click', () => {
            function changeColor() {
              
              let numbOfRow = Math.ceil((j + 1) / places.value);
              let numbOfPlace = (j + 1) - (places.value * (numbOfRow - 1));
            
              if(arrForChair[j].dataset.id === "disabled") {
                arrForChair[j].firstElementChild.src = './images/adm__chair.png';
                arrForChair[j].dataset.id = "standart";
                arrayConfig[numbOfRow - 1][numbOfPlace - 1] = "standart";
              }else if(arrForChair[j].dataset.id === "standart") {
                arrForChair[j].firstElementChild.src = './images/adm__chair1.png';
                arrForChair[j].dataset.id = "vip";
                arrayConfig[numbOfRow - 1][numbOfPlace - 1] = "vip";
              }else if(arrForChair[j].dataset.id === "vip") {
                arrForChair[j].firstElementChild.src = './images/adm__chair2.png';
                arrForChair[j].dataset.id = "disabled";
                arrayConfig[numbOfRow - 1][numbOfPlace - 1] = "disabled";
              }
            }//ф
            changeColor();         
          })//клик по месту
        }

        //клик по отмена в конфиг
        btnDeleteConfig.addEventListener('click', () => {
          rows.value = "";
          places.value = "";
          admschemeTap.removeChild(schemeOfHall);
          confStepRow.length = 0;
          arrForRow.length = 0;
          controller.abort();
        })

        //клик по сoхранить
        btnSaveConfig.addEventListener('click', () => {
          console.log(arrayConfig);
          const params = new FormData();
          params.set('rowCount', `${rows.value}`);
          params.set('placeCount', `${places.value}`);
          params.set('config', JSON.stringify(arrayConfig));//не работает

          fetch( `https://shfe-diplom.neto-server.ru/hall/${hallConfId}`, {
          method: 'POST',
          body: params 
          })
              .then( response => response.json())
              .then( function(data) { 
                console.log( data );
                location.reload();
              })
            })
          })
        })//клик по залу
      }//цикл conf



      //изменение стоимости
      let hallPriceId;
      const hallItemPrice = Array.from(document.querySelectorAll(".hall_item__price"));
      for(let i = 0; i < hallItemPrice.length; i++) {
        hallItemPrice[i].addEventListener('click', () => {

            hallPriceId = hallItemPrice[i].dataset.id;
            hallItemPrice[i].classList.add("hall_item_checked");
            hallItemPrice[i].classList.remove("hall_item");
            for(let j = 0; j < hallItemPrice.length; j++) {
              if(j !== i) {
                hallItemPrice[j].classList.remove("hall_item_checked");
                hallItemPrice[j].classList.add("hall_item");
              }
            }
            const params = new FormData();
            installPrice.addEventListener('change', () => {

            if(inpChip.value.trim()) { 
              priceStandart = inpChip.value; 
              params.set('priceStandart', `${priceStandart}`);
            }  
            if(inpVip.value.trim()) {
              priceVip = inpVip.value;
              params.set('priceVip', `${priceVip}`);
            }   

      //клик по сoхранить
      saveBtnPrice.addEventListener('click', () => {
      fetch( `https://shfe-diplom.neto-server.ru/price/${hallPriceId}`, {
          method: 'POST',
          body: params 
      })
        .then( response => response.json())
        .then( function(data) {
          console.log( data );
          inpChip.value = "";
           inpVip.value = "";
        })
      })
      //клик по отменить
      deleteBtnPrice.addEventListener('click', () => {
      inpChip.value = "";
      inpVip.value = "";
      controller.abort();
      })
    })//ввод в поле
  })
}




      //блок СЕТКА СЕАНСОВ

      //клик на добавить фильм
      btnAddFilm.addEventListener('click', () => {
        addFilm.classList.add('container__addfilm_active');
      })
    
      //клик по крестик
      btnClose.addEventListener('click', () => {
          filmContainer.classList.remove("container__addfilm_active");
      })

      //выбор файла poster
      document.querySelector(".poster_add").onchange = function() {
          let size = this.files[0].size; // размер в байтах
          let fileExtension = ['png']; // допустимые типы файлов
          if(3000000 < size) {
              alert("не верный формат!");
          } else if (fileExtension == 1) {
              alert("превышение размера");
          } else {
              file = this.files[0];           
          }
      }

      //клик по добавить фильм на страницу и на сервер
      btnAddsFilm.addEventListener('click', () => {
         const formData = new FormData();
         formData.set('filmName', `${filmName.value}`);
         formData.set('filmDuration', `${filmDuration.value}`);
         formData.set('filmDescription', `${filmDescription.value}`);
         formData.set('filmOrigin', `${filmOrigin.value}`);
         formData.set('filePoster', file);
       
        fetch( 'https://shfe-diplom.neto-server.ru/film',{
          method: 'POST',
          body: formData
        })
          .then( response => response.json())
          .then( function(data) {
            console.log(data);  
            filmContainer.classList.remove("container__addfilm_active");  
            location.reload();
          })
      })

      //кнопки удалить фильм
      let filmId;
      filmList.addEventListener('click', (e) => {
        
        if(e.target.classList.contains("delete_film")) {
          filmId = e.target.closest(".adm_film").dataset.id;
          fetch( `https://shfe-diplom.neto-server.ru/film/${filmId}`, {
             method: 'DELETE',
          })
            .then( response => response.json())
            .then( function(data) {
              console.log( data );
              location.reload();
            })
        } else {
          return;
        }
      }) 
        
      //клик отменить в popup 
      btnCancel.addEventListener('click', () => {
        formAddfilm.reset();
        controller.abort();
      })      

      //разметка залов time line
      for(let i = 0; i < data.result.halls.length; i++) {
        timeLineList.insertAdjacentHTML('beforeend', `
          <div class="conf-step__seances-hall" data-id="${data.result.halls[i].id}">
          <p class="time-line_hall">${data.result.halls[i].hall_name}</p>
          <div class="conf-step__seances-timeline"></div>
          </div>`);
      }
      const confStepSeancesHall = Array.from(document.querySelectorAll(".conf-step__seances-hall"));
      
      for(let i = 0; i < data.result.seances.length; i++) {
        arrr.push(data.result.seances[i]);
      }

      arrr.sort(function(a, b) {
        return a.seance_time.replace(':', '') - b.seance_time.replace(':', '');
      });

      //разметка фильмов в таймлайн
      for(let i = 0; i < arrr.length; i++) {
        let indFilm = data.result.films.findIndex(el => el.id === Number(arrr[i].seance_filmid));
        for(let j = 0; j < confStepSeancesHall.length; j++) {
          if(Number(arrr[i].seance_hallid) === Number(confStepSeancesHall[j].dataset.id)) {

            confStepSeancesHall[j].lastElementChild.insertAdjacentHTML('beforeend', `
              <div draggable="true" class="conf-step__seances-movie" data-id="${data.result.films[indFilm].id}">
                <p class="seances-movie-tittle">${data.result.films[indFilm].film_name}</p>
                <div class="movie-start" data-id="${arrr[i].id}">${arrr[i].seance_time}</div>
              </div>`);
          } 
        }
      }//1цикл 

      let searchClass;
      const arrAdmFilm = Array.from(document.querySelectorAll(".adm_film"));
      const movieArr = Array.from(document.querySelectorAll(".conf-step__seances-movie"));
      //добав фон фильмам в лене
      for(let i = 0; i < arrAdmFilm.length; i++) {
        for(let j = 0; j < movieArr.length; j++) {
          if(Number(arrAdmFilm[i].dataset.id) === Number(movieArr[j].dataset.id)) {
            searchClass = arrAdmFilm[i].className.slice(9);
            movieArr[j].classList.add(searchClass);
          }
        }
      }

        //добавление сеанса на страницу popup
           
        //выбор зала
        hallNameSeanse.addEventListener('change', (e) => {
            timeNameSeanse.length = 0;
            resultForTime.length = 0; 
            arrForTime.length = 0;       
            targetHall = Number(e.target.options[e.target.selectedIndex].dataset.id);   
        })
   
        //выбор фильма
        filmNameSeanse.addEventListener('change', (e) => { 
            timeNameSeanse.length = 0;
            resultForTime.length = 0;
            arrForTime.length = 0;
            targetFilm = Number(e.target.options[e.target.selectedIndex].dataset.id);
            checkedIdfilmName = e.target.options[e.target.selectedIndex].text;
            for(let i = 0; i < data.result.films.length; i++) {
                if(data.result.films[i].id === Number(targetFilm)) {
                    checkFilmDuration = Number(data.result.films[i].film_duration);//продолж выбран фильма
                }
            }
        })

        //клик время
        timeNameSeanse.addEventListener('focus', (e) => { 
          //сортируем массив сеансов по времени
        let arrSort = [];//массив всех сеансов во всех залах
        for(let i = 0; i < data.result.seances.length; i++) {
            arrSort.push(data.result.seances[i]);
        }
        arrSort.sort(function(a, b) {
            return a.seance_time.replace(':', '') - b.seance_time.replace(':', '');
        });
        console.log(arrSort);
            if(filmNameSeanse.value.trim() && hallNameSeanse.value.trim()) {
                timeNameSeanse.length = 0;  
                resultForTime.length = 0;
                arrForTime.length = 0; 
                countOfTime = 0;
                let countOfSeans = 0;
                for(let i = 0; i < arrSort.length; i++) { 
                    for(j = 0; j < data.result.films.length; j++) {

                        if(Number(arrSort[i].seance_hallid) === Number(targetHall)) {//ищем зал
                          //время первого сеанса в заданном зале
                          if(countOfSeans === 0){
                            firstSeans = arrSort[i].seance_time.split(':', [2]);
                            firstSeansInMin = Number(firstSeans[0]) * 60 + Number(firstSeans[1]);
                            countOfSeans++;
                          }             
                            if(Number(arrSort[i].seance_filmid) === Number(data.result.films[j].id)) {//ищем фильм
                                searchDuration = data.result.films[j].film_duration;//продолжительн фильма 
                                //считаем свободное время
                                let hourAndMinutes = arrSort[i].seance_time.split(':', [2]);
                                let inMinutes = Number(hourAndMinutes[0]) * 60 + Number(hourAndMinutes[1]);                                
                                let searchTime = inMinutes + Number(searchDuration);
                                arrForTime.push(searchTime);//массив свободного времени
                                console.log(arrForTime);

                                if(arrForTime.length > 1) {
                                    //находим разницу м/у каждой парой в массиве времени
                                    for(let k = countOfTime; k < arrForTime.length; k++) {
                                        countOfTime++;
                                        diffrens = inMinutes - arrForTime[k];
                                        if(diffrens >= checkFilmDuration) {
                                          resultForTime.push(arrForTime[k]);//массив доступного времени для брони
                                          while(diffrens >= (checkFilmDuration + (60 * timeCount))) {
                                            resultForTime.push(arrForTime[k] + (60 * timeCount));
                                            timeCount++;
                                          } 
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
                console.log(resultForTime);
                 
                //доб время с 00 до первого сеанса
                let numb = 0;
                if(arrForTime.length > 0) {
                  while((firstSeansInMin - Number(checkFilmDuration)) > numb) {
                    resultForTime.push(numb);
                    numb = numb + 60;//отсчитывает каждый час
                  } 
                } else {//если в зале ни одного сеанса
                  //arrForTime.length = 0;
                  while((numb + Number(checkFilmDuration)) < 1439) {
                    resultForTime.push(numb);
                    numb = numb + 60;
                  }
                } 
                //начиная с последнего сеанса в зале,добав время до 23:59
                if((arrForTime.length > 0) && (arrForTime[arrForTime.length - 1] + Number(checkFilmDuration)) < 1439) {
                  resultForTime.push(arrForTime[arrForTime.length - 1]);
                }  
                console.log(resultForTime);
                //сортируем по возраст времени
                resultForTime.sort(function(a, b) {
                  return a - b;
                });
                
                //формир разметку времени в select
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
            localStorage.setItem('targetHall', `${targetHall}`);
            localStorage.setItem('targetFilm', `${targetFilm}`);
            localStorage.setItem('checkedTime', `${checkedTime}`);
            localStorage.setItem('checkedIdfilmName', `${checkedIdfilmName}`);
            localStorage.setItem('countAdd', 'add');
            contSeans.classList.remove("container__addfilm_active");
            formSeans.reset();
        })

        let idCheckedFilm;
        let targetTime;
        let checkedIdHall;
        function addSeans() {
          idCheckedFilm = localStorage.getItem('targetFilm');
          let checkedNameFilm = localStorage.getItem('checkedIdfilmName');
          targetTime = localStorage.getItem('checkedTime');
          checkedIdHall = localStorage.getItem('targetHall');

          //разметка для нового сеанса

          //фон сеансу
          for(let i = 0; i < arrAdmFilm.length; i++) {
            if(Number(arrAdmFilm[i].dataset.id) === Number(idCheckedFilm)) {
              searchClass = arrAdmFilm[i].className.slice(9);
            }
          }
          
          let nextElInd;
          for(let i = 0; i < confStepSeancesHall.length; i++) {
            if(Number(checkedIdHall) === Number(confStepSeancesHall[i].dataset.id)) {
              if(confStepSeancesHall[i].lastElementChild.children.length > 0) {
                for(let j = 0; j < confStepSeancesHall[i].lastElementChild.children.length; j++) {
                if(confStepSeancesHall[i].lastElementChild.children[j].lastElementChild.textContent.split(':', [1]) > targetTime.split(':', [1])) {
                  nextElInd = confStepSeancesHall[i].lastElementChild.children[j];//необх инд для нового сеанса
                  break;
                }
              }
              nextElInd.insertAdjacentHTML('beforebegin', `
                <div draggable="true" class="conf-step__seances-movie ${searchClass}" data-id="${idCheckedFilm}">
                  <p class="seances-movie-tittle">${checkedNameFilm}</p>
                  <div class="movie-start" data-id="00">${targetTime}</div>
                </div>`);
              } else {//если зал пустой
                confStepSeancesHall[i].lastElementChild.insertAdjacentHTML('beforeend', `
                <div draggable="true" class="conf-step__seances-movie ${searchClass}" data-id="${idCheckedFilm}">
                  <p class="seances-movie-tittle">${checkedNameFilm}</p>
                  <div class="movie-start" data-id="00">${targetTime}</div>
                </div>`);
                
              }
            }
          } 
        }//фун
        if(localStorage.getItem('countAdd') === 'add') {
          addSeans();
          localStorage.removeItem('countAdd');
        }
         
        //клик по отмене popup доб сеанса
        cancelSeanse.addEventListener('click', () => {
            inpChip.value = "";
            inpVip.value = "";
            controller.abort();
            hallNameSeanse.length = 0;
            filmNameSeanse.length = 0;
            timeNameSeanse.length = 0;  
            resultForTime.length = 0;
            arrForTime.length = 0;
            countOfTime = 0;
        })

        //клик по крестику popup доб сеанса
        btnCloseSeanse.addEventListener('click', () => {
            //удаляем старую разметку
            hallNameSeanse.length = 0;
            filmNameSeanse.length = 0;
            timeNameSeanse.length = 0;  
            resultForTime.length = 0;
            arrForTime.length = 0;
            countOfTime = 0;
            contSeans.classList.remove("container__addfilm_active");
        })


        //ПЕРЕТАСКИВАНИЕ
      const line = Array.from(document.querySelectorAll(".conf-step__seances-timeline"));
      const hiddenDelete = document.querySelector(".hidden_delete");
      let targetFilm;
      let targetHall;

      //добав сеанса на страницу
      filmList.addEventListener('dragstart', (evt) => {
        targetFilm = evt.target.dataset.id;//выбранный фильм
      })

      for(let i = 0; i < line.length; i++) {
        line[i].addEventListener('dragover', (evt) => {
            // Разрешаем сбрасывать элементы в эту область
            evt.preventDefault();
          });

          line[i].addEventListener('drop', (evt) => {
            evt.preventDefault();
            targetHall = evt.target.closest('.conf-step__seances-hall').dataset.id;
           
            containerSeans.classList.add("container__addfilm_active");
            //формируем разметку select фильмов
            for(let j = 0; j < data.result.films.length; j++) {
              filmNameSeanse.insertAdjacentHTML('beforeend', `<option class="option_addseans name_of_film" data-id="${data.result.films[j].id}">${data.result.films[j].film_name}</option>`);
              if(Number(data.result.films[j].id) === Number(targetFilm)) {
                filmNameSeanse.value = data.result.films[j].film_name;
                checkedIdfilmName = filmNameSeanse.value;
                checkFilmDuration = Number(data.result.films[j].film_duration);//продолж выбран фильма
              }
            } 
            //формир разметку select залов
            for(let j = 0; j < data.result.halls.length; j++) {
              hallNameSeanse.insertAdjacentHTML('beforeend', `<option class="option_addseans name_of_hall" data-id="${data.result.halls[j].id}">${data.result.halls[j].hall_name}</option>`);
              if(Number(data.result.halls[j].id) === Number(targetHall)) {
                hallNameSeanse.value = data.result.halls[j].hall_name;
              }
            }
          })
      }//цикл

      //удал сеанса со страницы
      let nameFilmLine;
      let activeEl;
      for(let i = 0; i < movieArr.length; i++){     
        movieArr[i].addEventListener('dragstart', () => {          
        hiddenDelete.classList.add("show"); 
        activeEl = movieArr[i];
        nameFilmLine = movieArr[i].firstElementChild.textContent;
        seanceId = movieArr[i].dataset.id;
        localStorage.setItem('name', nameFilmLine); 
      })     
      }//цикл   

      hiddenDelete.addEventListener('dragover', (evt) => {
        evt.preventDefault();         
      }) 

      hiddenDelete.addEventListener('drop', (evt) => {
        evt.preventDefault();
        hiddenDelete.classList.remove("show");
        deleteSeances.classList.add("container__addfilm_active");
        labelFilm.textContent = nameFilmLine;

        //клик по удалить
        delSeans.addEventListener('click', () => {       
          containerDelSeans.classList.remove("container__addfilm_active");
          activeEl.remove();
          localStorage.removeItem('name');
      })      
      })
        //клик по крестику в удал сеанса
        closeDelSeans.addEventListener("click", () => {
            containerDelSeans.classList.remove("container__addfilm_active");
            localStorage.removeItem('name'); 
        })
     
        //клик по отмене в удал сеанса
        delSeansCancel.addEventListener('click', () => {
            containerDelSeans.classList.remove("container__addfilm_active");
        })


        //клик по сохранить сеансы на основ стр

        //добавление сеанса в систему
        btnFilmSeanseSave.addEventListener('click', (e) => {
          const movieArr = Array.from(document.querySelectorAll(".conf-step__seances-movie"));
          console.log(movieArr);
          for(let i = 0; i < movieArr.length; i++) {
            if(movieArr[i].lastElementChild.dataset.id === '00') {
              movieArr[i].lastElementChild.dataset.id = '';
              const params = new FormData();
              params.set('seanceHallid', `${movieArr[i].closest('.conf-step__seances-hall').dataset.id}`);
              params.set('seanceFilmid', `${movieArr[i].dataset.id}`);
              params.set('seanceTime', `${movieArr[i].lastElementChild.textContent}`);
                            
              fetch( `https://shfe-diplom.neto-server.ru/seance`, {
                method: 'POST',
                body: params 
              })
                .then( response => response.json())
                .then( function(data) { 
                  console.log( data );
                  location.reload();
                })
              }
            }
  

          //удаление сеанса из системы 
        function equal() {
          for(let i = 0; i < arrr.length; i++) {
            for(let j = 0; j < movieArr.length; j++) {
              if(arrr[i].id === Number(movieArr[j].lastElementChild.dataset.id)) {//нашелся
                j = 0;
                break;
              } else if(Number(j) === Number(movieArr.length - 1)) {
                  console.log(arrr[i].id);
                  fetch( `https://shfe-diplom.neto-server.ru/seance/${arrr[i].id}`, {
                  method: 'DELETE',
                })
                  .then( response => response.json())
                  .then(function(data) {
                    console.log( data );
                    location.reload();
                  })
                }        
              }           
          }
        }
        equal();      
      })//по сохр сеанс


      //клик по отмене сеансов
      deleteFilmSeanse.addEventListener('click', () => {
        controller.abort();
      })

 

    //закрытие продаж
    btnOpen.textContent = 'Открыть продажу билетов';
    const hallItemOpen = Array.from(document.querySelectorAll(".hall_item__open"));
    let hallOpenId;
    let serchIndOpen;
      //клик по залу
        for(let i = 0; i < hallItemOpen.length; i++) {
          hallItemOpen[i].addEventListener('click', () => {
            hallItemOpen[i].classList.add("hall_item_checked");
            hallItemOpen[i].classList.remove("hall_item");
            hallOpenId = hallItemOpen[i].dataset.id;
            for(let j = 0; j < hallItemOpen.length; j++) {
              if(j !== i) {
                hallItemOpen[j].classList.remove("hall_item_checked");
                hallItemOpen[j].classList.add("hall_item");
              }
            }

        let indif;
        //открыт ли выбранный зал
        for(let j = 0; j < data.result.halls.length; j++) {
          if(data.result.halls[j].id === Number(hallOpenId)) {
            indif = data.result.halls[j].hall_open;
          }
        }
        if(indif === 0) {
          btnOpen.textContent = 'Открыть продажу билетов';
          serchIndOpen = 1;
        } else {
          btnOpen.textContent = 'Приостановить продажу билетов'
          serchIndOpen = 0;
        }
      
      //клик по кнопке
      openSellBtn.addEventListener('click', () => {
     
        const params = new FormData()
        params.set('hallOpen', `${serchIndOpen}`)
        fetch( `https://shfe-diplom.neto-server.ru/open/${hallOpenId}`, {
              method: 'POST',
              body: params 
        })
            .then( response => response.json())
            .then( function(data) { 
              console.log( data )
              if(indif === 1) {
                btnOpen.textContent = 'Открыть продажу билетов';  
              } else {
                btnOpen.textContent = 'Приостановить продажу билетов';
              }
            })
          })
        })//клик по залу
      }
    
})//fetch get
