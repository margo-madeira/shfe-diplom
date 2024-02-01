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
let controller = new AbortController();
let signal = controller.signal;
let counClick = 0;
const admschemeTap = document.querySelector(".adm_scheme-tap");
const ulHallPrice = document.querySelector(".ul_hall__price");
const installPrice = document.querySelector(".install_price");
const inpChip = document.querySelector(".chip");
const inpVip = document.querySelector(".vip");
const deleteBtnPrice = document.querySelector(".delete_price__btn");
const saveBtnPrice = document.querySelector(".save_price__btn");
const ulHallOpen = document.querySelector(".ul_hall__open");
const btnOpen = document.getElementById("btn_open");
const openSellBtn = document.getElementById("open__sell_btn");

//popup доб зала
const inp = document.querySelector(".row__text");
const btnAdd = document.querySelector(".btn__add_hall");
const btnRemove = document.querySelector(".btn__white");
const closeBtn = document.querySelector(".close_popup_seans");
const form = document.querySelector(".form_addfilm");
const addHall = document.querySelector(".hall");

signal.addEventListener('abort', () => console.log("отмена!"));

//клик по закрыть в popup зал
closeBtn.addEventListener('click', () => {
    addHall.classList.remove("container__addfilm_active");  
})
//клик отменить в popup зал
btnRemove.addEventListener('click', (e) => {
  e.preventDefault();
  controller.abort();
  form.reset();
})

//переход на popup
btnAddHall.addEventListener('click', () => {
    containerAddHall.classList.add('container__addfilm_active');
})

//клик по удалить зал
hallList.addEventListener('click', (e) => {
  if(e.target.classList.contains("btn_remove")) {
    let halllId = e.target.previousElementSibling.dataset.id;
    delHall(halllId);
  } else {
      return;
  }
}) 

//заполнение листа залов и др
fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
  .then( response => response.json())
  .then( function(data) {
      console.log(data);
      for(let i = 0; i < data.result.halls.length; i++) {

      //разметка залов под управление
      hallList.insertAdjacentHTML('beforeend', `<div class="remove_hall">
        <div class="hall-list_numb" data-id="${data.result.halls[i].id}">
        <div class="def">- </div>
        <div class="adm_hall-number">${data.result.halls[i].hall_name}</div>
        </div>
        <button class="btn_remove"></button>
        </div>`);

      //разметка для зал config
      hallConfigList.insertAdjacentHTML('beforeend', `<li class="hall_item hall_item__config" data-id="${data.result.halls[i].id}">${data.result.halls[i].hall_name}</li>`);
        
      //разметка для зала цен
      ulHallPrice.insertAdjacentHTML('beforeend', `<li class="hall_item hall_item__price" data-id="${data.result.halls[i].id}">${data.result.halls[i].hall_name}</li>`)
     
      //разметка для зала открытий
      ulHallOpen.insertAdjacentHTML('beforeend', `<li class="hall_item hall_item__open" data-id="${data.result.halls[i].id}">${data.result.halls[i].hall_name}</li>`)
      }

      //клик по добавить зал
      btnAdd.addEventListener('click', (e) => {
        e.preventDefault();
        addHalls(inp.value); 
      })


      //изменяет конфигурацию
      let arrayConfig = []; 
      let hallConfId;  
      const hallItemConfig = Array.from(document.querySelectorAll(".hall_item__config"));
      for(let i = 0; i < hallItemConfig.length; i++) {
        hallItemConfig[0].classList.add("hall_item_checked");
        hallItemConfig[0].classList.remove("hall_item");
        hallConfId = hallItemConfig[0].dataset.id;

        //загружаем картинку
        function addScheme() {
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
          }//закр цикл
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
        }//фун
        addScheme();

        //клик по залу
        hallItemConfig[i].addEventListener('click', () => {
          counClick++;
          hallItemConfig[i].classList.add("hall_item_checked");
          hallItemConfig[i].classList.remove("hall_item");
          hallConfId = hallItemConfig[i].dataset.id;
          for(let j = 0; j < hallItemConfig.length; j++) {
            if(j !== i) {
              hallItemConfig[j].classList.remove("hall_item_checked");
              hallItemConfig[j].classList.add("hall_item");
            }
          }       
          addScheme();
          //очищает поля ввода
          rows.value = "";
          places.value = "";
        })//клик по залу
      }//цикл conf

      //вводится новое значение рядов
      places.addEventListener('input', () => {
        if(rows.value.trim() && places.value.trim()) {
        //удалить старую разметку
          admschemeTap.removeChild(admschemeTap.firstElementChild);
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
          saveConfig(hallConfId, arrayConfig);
          location.reload();
        })
      })
        

      //изменение стоимости
      let hallPriceId;
      const hallItemPrice = Array.from(document.querySelectorAll(".hall_item__price"));
      for(let i = 0; i < hallItemPrice.length; i++) {
        hallItemPrice[0].classList.add("hall_item_checked");
        hallItemPrice[0].classList.remove("hall_item");
        hallPriceId = hallItemPrice[0].dataset.id;

        //отображает стоимость
        function showPrice() {
          for(let j = 0; j < data.result.halls.length; j++) {
            if(data.result.halls[j].id === Number(hallPriceId)) {
              inpChip.value = data.result.halls[j].hall_price_standart;
              inpVip.value = data.result.halls[j].hall_price_vip;
            }
          }
        }
        showPrice();

        //клик по залу
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
          showPrice();
        })

        //клик по сoхранить
        saveBtnPrice.addEventListener('click', () => {
          const params = new FormData();
          if(inpChip.value.trim()) { 
            priceStandart = inpChip.value; 
            params.set('priceStandart', `${priceStandart}`);
          }  
          if(inpVip.value.trim()) {
            priceVip = inpVip.value;
            params.set('priceVip', `${priceVip}`);
          } 
          addPrice(hallPriceId, params);
          location.reload();
        })
        
        //клик по отменить
        deleteBtnPrice.addEventListener('click', () => {
          controller.abort();
        })
      }


      //закрытие продаж
      const hallItemOpen = Array.from(document.querySelectorAll(".hall_item__open"));
      let hallOpenId;
      let serchIndOpen;
      let indif;

      hallItemOpen[0].classList.add("hall_item_checked");
      hallItemOpen[0].classList.remove("hall_item");
      hallOpenId = hallItemOpen[0].dataset.id;
    
      //открыт ли выбранный зал
      for(let j = 0; j < data.result.halls.length; j++) {
        if(data.result.halls[j].id === Number(hallOpenId)) {
          indif = data.result.halls[j].hall_open;//на данный момент
        }
      }
      if(indif === 0) {
        btnOpen.textContent = 'Открыть продажу билетов';
        serchIndOpen = 1;
      } else {
        btnOpen.textContent = 'Приостановить продажу билетов'
        serchIndOpen = 0;
      }

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
          for(let j = 0; j < data.result.halls.length; j++) {
            if(data.result.halls[j].id === Number(hallOpenId)) {
              indif = data.result.halls[j].hall_open;//на данный момент
            }
          }
          if(indif === 0) {
            btnOpen.textContent = 'Открыть продажу билетов';
            serchIndOpen = 1;
          } else {
            btnOpen.textContent = 'Приостановить продажу билетов'
            serchIndOpen = 0;
          }
        })//клик по залу
      }
    
  
      //клик по кнопке
      openSellBtn.addEventListener('click', () => {
        openHalls(serchIndOpen, hallOpenId);
      })

    })//alldata

  