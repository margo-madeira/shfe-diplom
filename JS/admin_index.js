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
      const arrayConfig = [];
    
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
            confStepChair[j].firstElementChild.src = '../images/adm__chair1.png';        
          }
          if(confStepChair[j].dataset.id === "standart") {
            confStepChair[j].firstElementChild.src = '../images/adm__chair.png';        
          }
          if(confStepChair[j].dataset.id === "disabled") {
            confStepChair[j].firstElementChild.src = '../images/adm__chair2.png';        
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
                arrForRow[j].insertAdjacentHTML('beforeend', `<div class="conf-step__chair" data-id="disabled"><img src="../images/adm__chair2.png" class=""></div>`);
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
                arrForChair[j].firstElementChild.src = '../images/adm__chair.png';
                arrForChair[j].dataset.id = "standart";
                arrayConfig[numbOfRow - 1][numbOfPlace - 1] = "standart";
              }else if(arrForChair[j].dataset.id === "standart") {
                arrForChair[j].firstElementChild.src = '../images/adm__chair1.png';
                arrForChair[j].dataset.id = "vip";
                arrayConfig[numbOfRow - 1][numbOfPlace - 1] = "vip";
              }else if(arrForChair[j].dataset.id === "vip") {
                arrForChair[j].firstElementChild.src = '../images/adm__chair2.png';
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
          let obj = {
            array: arrayConfig
          }
          const params = new FormData();
          params.set('rowCount', `${rows.value}`);
          params.set('placeCount', `${places.value}`);
          params.set('config', JSON.strigify(obj));

          fetch( `https://shfe-diplom.neto-server.ru/hall/${hallConfId}`, {
          method: 'POST',
          body: params 
          })
              .then( response => response.json())
              .then( function(data) { 
                console.log( data );
                location.reload();
              })
            })//сохр
          })//закр inp
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

      //клик по схранить
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

      if(localStorage.getItem('filmOpen') === 'was open') {  
        //забираем данные о новом фильме
        let filmsName = localStorage.getItem('filmName');
        let filmsDuration = localStorage.getItem('filmDuration');
        let filmsDescription = localStorage.getItem('filmDescription');
        let filmsOrigin = localStorage.getItem('filmOrigin');
        let poster = localStorage.getItem('poster');
        
        //разметка для нового фильма
        let checkFilm;
        if(filmList.children.length < 5){
          countOfFilms++;//для фона
        filmList.insertAdjacentHTML('beforeend', `<div draggable="true" class="adm_film bg_${countOfFilms}" data-id="">
                    <img src="${poster}" alt="постер" class="adm_film-img">
                    <div class="adm_film-info">
                        <p class="adm_film-name">${filmsName}</p>
                        <p class="adm_film-timer">${filmsDuration}</p>
                    </div>
                    <button class="delete_film"></button>
                    </div>`);
        } else {
          countOfFilms = 1;
          filmList.insertAdjacentHTML('beforeend', `<div draggable="true" class="adm_film bg_${countOfFilms}" data-id="">
                    <img src="${poster}" alt="постер" class="adm_film-img">
                    <div class="adm_film-info">
                        <p class="adm_film-name">${filmsName}</p>
                        <p class="adm_film-timer">${filmsDuration}</p>
                    </div>
                    <button class="delete_film"></button>
                    </div>`);
          countOfFilms++;
        }
        
        checkFilm = 1;
        //очищаем хранилище
        localStorage.removeItem('filmName');
        localStorage.removeItem('filmDuration');
        localStorage.removeItem('filmDescription');
        localStorage.removeItem('filmOrigin');
        localStorage.removeItem('poster');
        localStorage.removeItem('filmOpen');
      }


      //разметка залов
      for(let i = 0; i < data.result.halls.length; i++) {
        timeLineList.insertAdjacentHTML('beforeend', `
          <div class="conf-step__seances-hall" data-id="${data.result.halls[i].id}">
          <p class="time-line_hall">${data.result.halls[i].hall_name}</p>
          <div class="conf-step__seances-timeline"></div>
          </div>`);
      }

      const confStepSeancesHall = Array.from(document.querySelectorAll(".conf-step__seances-hall"));
      let arrr = [];
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
      const arrTime = Array.from(document.querySelectorAll(".movie-start"));

      //кнопки удалить фильм
      let filmId;
      filmList.addEventListener('click', (e) => {
        
        if(e.target.classList.contains("delete_film")) {
          location.reload();
          filmId = e.target.closest("adm_film").dataset.id;  
        } else {
          return;
        }
      }) 


      //перетаскивание
      const line = Array.from(document.querySelectorAll(".conf-step__seances-timeline"));
      const hiddenDelete = document.querySelector(".hidden_delete");
      const wrapSeans = document.querySelector(".del_seans");

      //добав сеанса
      for(let i = 0; i < line.length; i++) {
        line[i].addEventListener('dragover', (evt) => {
            // Разрешаем сбрасывать элементы в эту область
            evt.preventDefault();
          });

          line[i].addEventListener('drop', (evt) => {
            evt.preventDefault();
            containerSeans.classList.add("container__addfilm_active");
          })

        //удал сеанса
        let nameFilmLine;
        let activeEl;
        let seanceId;
          line[i].addEventListener('dragstart', (evt) => {//работает
            evt.preventDefault();           
            hiddenDelete.classList.add("show"); 
            if(evt.target.classList.contains("conf-step__seances-movie")) {
              nameFilmLine = evt.target.firstElementChild.textContent;
              activeEl = evt.target;
              seanceId = evt.target.lastElementChild.dataset.id;
            }
            if(evt.target.classList.contains("seances-movie-tittle")) {
              nameFilmLine = evt.target.textContent;
              activeEl = evt.target.closest("conf-step__seances-movie");
              seanceId = evt.target.closest("conf-step__seances-movie").lastElementChild.dataset.id;
            } 
            localStorage.setItem('name', nameFilmLine); 
            console.log('начало'); 
          })
      }
      hiddenDelete.addEventListener('dragover', (evt) => {//не раб
        evt.preventDefault();  
        const isMoveable = activeEl.classList.contains('conf-step__seances-movie');
        if (!isMoveable) {
          return;
        }
        console.log('over');
      }) 

      hiddenDelete.addEventListener('drop', (evt) => {//не раб
        evt.preventDefault();
        hiddenDelete.classList.remove("show");
        deleteSeances.classList.add("container__addfilm_active");
        console.log('drop');

        //удаляем фильм из ленты
        if(localStorage.getItem('remove') === 'yes') {
          activeEl.remove();
          localStorage.removeItem('name');
        }
      })


        //добавление сеанса на страницу
        if(localStorage.getItem('seanseOpen') === 'was open') {
          
          //забираем данные о новом сеансе
          let checkedsIdHall = localStorage.getItem('checkedIdHall');
          let checkedsIdfilm = localStorage.getItem('checkedIdfilm');
          let checkedsTime = localStorage.getItem('checkedTime');
          let checkedIdfilmName = localStorage.getItem('checkedIdfilmName');

          //разметка для нового сеанса

          //фон сеансу
          for(let i = 0; i < arrAdmFilm.length; i++) {
            if(Number(arrAdmFilm[i].dataset.id) === Number(checkedsIdfilm)) {
              searchClass = arrAdmFilm[i].className.slice(9);
            }
          }

          let checkSeans;
          for(let i = 0; i < confStepSeancesHall.length; i++) {
            if(Number(checkedsIdHall) === Number(confStepSeancesHall[i].dataset.id)) {
              confStepSeancesHall[i].lastElementChild.insertAdjacentHTML('beforeend', `
                <div draggable="true" class="conf-step__seances-movie ${searchClass}" data-id="${checkedsIdfilm}">
                  <p class="seances-movie-tittle">${checkedIdfilmName}</p>
                  <div class="movie-start" data-id="">${checkedsTime}</div>
                </div>`);
                checkSeans = 1;
            }
          }
        
          //очищаем хранилище
          localStorage.removeItem('checkedIdHall');
          localStorage.removeItem('checkedIdfilm');
          localStorage.removeItem('checkedTime');
          localStorage.removeItem('checkedTime');
        }


        //клик по сохранить сеансы 
        btnFilmSeanseSave.addEventListener('click', (e) => {

          //удаление фильма из системы
          if(filmId === true) {
          fetch( `https://shfe-diplom.neto-server.ru/film/${filmId}`, {
                  method: 'DELETE',
              })
                  .then( response => response.json())
                  .then(function(data) {
                    console.log( data );
                    location.reload();
                  })
          }

          //добавление фильма в систему
          if(checkFilm ===  1) {
            const formData = new FormData();
            formData.set('filmName', `${filmsName}`);
            formData.set('filmDuration', `${filmsDuration}`);
            formData.set('filmDescription', `${filmsDescription}`);
            formData.set('filmOrigin', `${filmsOrigin}`);
            formData.set('filePoster', `${poster}`);
          
              fetch( 'https://shfe-diplom.neto-server.ru/film',{
                  method: 'POST',
                  body: formData
              })
                  .then( response => response.json())
                  .then( function(data) {
                      location.reload();
                      console.log(data);  
              })
            }

          //добавление сеанса в систему
          if(checkSeans === 1) {

          const params = new FormData();
          params.set('seanceHallid', `${checkedsIdHall}`);
          params.set('seanceFilmid', `${checkedsIdfilm}`);
          params.set('seanceTime', `${checkedsTime}`);
                        
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


          //удаление сеанса из системы
          if(seanceId === true) {
          fetch( `https://shfe-diplom.neto-server.ru/seance/${seanceId}`, {
            method: 'DELETE',
          })
            .then( response => response.json())
            .then(function(data) {
              console.log( data );
              location.reload();
            })
          }
          
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
