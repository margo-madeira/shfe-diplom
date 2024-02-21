const btnAddHall = document.querySelector(".add_hall");
const containerAddHall = document.querySelector(".hall");
const btnAddFilm = document.querySelector(".adm_add-film");
const addFilm = document.querySelector(".film");
const hallList = document.querySelector(".hall-list");
const btnDeleteHall = Array.from(document.querySelectorAll(".btn_remove"));
const hallConfigList = document.querySelector(".ul_hall__config");
const rows = document.getElementById("rows");
const places = document.getElementById("places");
//const btnDeleteConfig = document.querySelector(".del_config__btn");
const btnDelConf = document.querySelector(".del_conf");
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
const btnRemove = document.querySelector(".btn__delete_halls");
const closeBtn = document.querySelector(".close_popup_halls");
const form = document.querySelector(".form_popup");
const addHall = document.querySelector(".hall");

function allForHalls(data) {
  //клик по закрыть в popup зал
  closeBtn.addEventListener('click', () => {
      addHall.classList.remove("container__popup_active");  
      body.classList.remove('hidden');
  })
  //клик отменить в popup зал
  btnRemove.addEventListener('click', (e) => {
    e.preventDefault();
    controller.abort();
    console.log('Download aborted');
    addHall.classList.remove("container__popup_active"); 
    body.classList.remove('hidden');
    form.reset();
  })

  //переход на popup
  btnAddHall.addEventListener('click', () => {
      containerAddHall.classList.add('container__popup_active');
      body.classList.add('hidden');
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
      if(inp.value.trim()) {
        e.preventDefault();
        addHalls(inp.value); 
      } else {
        e.preventDefault();
        alert('заполните поле');
      }
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
        rows.value = confStepRow.length;
        for(let j = 0; j < confStepRow.length; j++) {
          for(let k = 0; k < data.result.halls[indHall].hall_config[0].length; k++) {
            confStepRow[j].insertAdjacentHTML('beforeend', `<div class="conf-step__chair" data-id="${data.result.halls[indHall].hall_config[j][k]}"><img src="" class=""></div>`);
          }
        }//закр цикл
        const confStepChair = Array.from(document.querySelectorAll(".conf-step__chair"));
        places.value = confStepChair.length / rows.value;
          
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
      })//клик по залу
    }//цикл conf

    const containerInp = document.querySelector(".container_inp");
    //вводится новое значение рядов
    containerInp.addEventListener('input', (e) => {
        if(isFinite(rows.value) &&  isFinite(places.value)) {
          if(rows.value.trim() && places.value.trim()) {
            //удалить старую разметку
            admschemeTap.removeChild(admschemeTap.firstElementChild);
            arrayConfig.length = 0;
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
        } else {
          alert('не корректное значение!');
          e.target.value = "";
          return;
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
      btnDelConf.addEventListener('click', () => {
        controller.abort();
        console.log('Download aborted');
        addScheme();
      })
      //клик по сoхранить
      btnSaveConfig.addEventListener('click', () => {
        if((Number(rows.value) !== 0) && (Number(places.value) !== 0)) { 
          saveConfig(hallConfId, arrayConfig);
        } else {
          alert('не может быть нулем');
          return;
        }
      })
    })
        
    //изменение стоимости
    let hallPriceId;
    const hallItemPrice = Array.from(document.querySelectorAll(".hall_item__price"));
    for(let i = 0; i < hallItemPrice.length; i++) {
      hallItemPrice[0].classList.add("hall_item_checked");
      hallItemPrice[0].classList.remove("hall_item");
      hallPriceId = hallItemPrice[0].dataset.id;
    }

    //отображает стоимость
    function showPrice() {
      for(let i = 0; i < data.result.halls.length; i++) {
        if(data.result.halls[i].id === Number(hallPriceId)) {
          inpChip.value = data.result.halls[i].hall_price_standart;
          inpVip.value = data.result.halls[i].hall_price_vip;
          return;
        } 
      }
    }
    showPrice();

    //клик по залу
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
        showPrice();
      })
    }

    //клик по сoхранить
    saveBtnPrice.addEventListener('click', (e) => {
      e.preventDefault();
      const params = new FormData();
      if(inpChip.value.trim() && inpVip.value.trim() && (Number(inpChip.value) !== 0) && (Number(inpVip.value) !== 0)) { 
        if(isFinite(inpChip.value) &&  isFinite(inpVip.value)) {
        priceStandart = inpChip.value; 
        params.set('priceStandart', `${priceStandart}`);
        priceVip = inpVip.value;
        params.set('priceVip', `${priceVip}`);
        addPrice(hallPriceId, params);
        } else {
          alert('не корректное значение');
        return;
        }
      } else {
        alert('введите значение');
        return;
        
      }
    })
        
    //клик по отменить
    deleteBtnPrice.addEventListener('click', () => {
      controller.abort();
      console.log('Download aborted');
    })
      

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
            if( hallItemOpen[i].dataset.change === 'true') {  
              if(data.result.halls[j].hall_open === 0) {
                indif = 1;
              } else {
                indif = 0;
              }
            } else {
              indif = data.result.halls[j].hall_open;//на данный момент
            }
          }
        }
        if(indif === 0) {
          btnOpen.textContent = 'Открыть продажу билетов';
          serchIndOpen = 1;
        } else {
          btnOpen.textContent = 'Приостановить продажу билетов';
          serchIndOpen = 0;
        }  
      })//клик по залу
    }
    
    //клик по кнопке
    openSellBtn.addEventListener('click', () => {
      openHalls(serchIndOpen, hallOpenId);
      if(indif === 0) {
        indif = 1;
      } else {
        indif = 0;
      }
    })
  }