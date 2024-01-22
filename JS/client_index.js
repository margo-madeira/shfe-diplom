const menuList = document.querySelector(".menu-list");
const arrowItem = document.querySelector(".right");
const btnIndex = document.querySelector(".btn__index");
const menuListItem = document.querySelectorAll(".menu-list-item");
const menuListItemArr = Array.from(menuListItem);
const today = document.querySelector(".today");
let currentDate = new Date();
let count = 1;
const revers = document.querySelector(".revers");
let checkedDate = currentDate.getDate();
let checkedmonth;
let searchMonth;

let days = [
    'Пн,',
    'Вт,',
    'Ср,',
    'Чт,',
    'Пт,',
    'Сб,',
    'Вс,'
  ];



let currentDay = currentDate.getDay();
let counter = 0;

//вычисляет кол дней в месяце
let dayOFMonth;
function dayOFMonths(){ 
  let month = currentDate.getMonth();
  let fullYear = currentDate.getFullYear();
  let date1 = new Date(fullYear, month, 1);
  let date2;
  //если это последний месяц года
  if(month === 11) {
    date2 = new Date(fullYear + 1, 0, 1);
  } else {
    date2 = new Date(fullYear, month + 1, 1);
  }
  dayOFMonth = Math.round((date2 - date1) / 1000 / 3600 / 24);
  console.log(dayOFMonth);
  return dayOFMonth;
}
dayOFMonths();

//проставляет сегодняшнюю дату
if(currentDay > 0) {
  today.lastElementChild.textContent = days[`${currentDay - 1}`] + currentDate.getDate();
} else  {
  today.lastElementChild.textContent = days[6] + currentDate.getDate();
}

//при клике переходит на авторизацию
btnIndex.addEventListener('click', () => {
  document.location='./admin_login.html';
})

//проставляет дни недели
function dayOfMenu() {
  for(let i = 0; i < menuListItemArr.length; i++) {
    for(let j = `${currentDay}`; j < days.length; j++) {
      if(counter < 5) {
        menuListItemArr[`${i + counter}`].firstElementChild.textContent = `${days[j]}`;
        counter++;
          if(days[j] === 'Вс,') {
            j = -1;
          }
        } else {
          return;
          }
    }
  }
}
dayOfMenu();

//проставляет дату остальным элементам
//от сегодн даты
for(let i = 0; i < menuListItemArr.length; i++) { 
  if((Number(currentDate.getDate()) + count) <= dayOFMonth) {
    menuListItemArr[i].lastElementChild.textContent = Number(currentDate.getDate()) + count;
    count++; 
    checkedmonth = currentDate.getMonth(); 
  } else {
    break;
  }
}
//со след месяца
let anotherCount = 1;
for(let i = count - 1; i < menuListItemArr.length; i++) {
  menuListItemArr[i].lastElementChild.textContent = anotherCount;
  anotherCount++;
  checkedmonth = currentDate.getMonth() + 1;
}

//простав checkedDate у today
today.addEventListener('click', () => {
  checkedDate = currentDate.getDate();
  for(let i = 0; i < menuListItemArr.length; i++) {
      menuListItemArr[i].classList.remove("menu-list-item__checked");
      menuListItemArr[i].classList.add("menu-list-item");
      menuListItemArr[i].firstElementChild.classList.remove("text-menu__bold");
      menuListItemArr[i].lastElementChild.classList.remove("text-menu__bold");
    }
})

//при клике на элемент выделяет жирным
for(let i = 0; i < menuListItemArr.length; i++) {
  menuListItemArr[i].addEventListener('click', () => {
    menuListItemArr[i].classList.add("menu-list-item__checked");
    menuListItemArr[i].classList.remove("menu-list-item");
    menuListItemArr[i].firstElementChild.classList.add("text-menu__bold");
    menuListItemArr[i].lastElementChild.classList.add("text-menu__bold");
    
    if(menuListItemArr[i].classList.contains("menu-list-item__checked")) {
      checkedDate = menuListItemArr[i].lastElementChild.textContent;
      localStorage.setItem('checkedDate', checkedDate);
    }

    for(let j = 0; j < menuListItemArr.length; j++) {
      if(j!== i){
        if(menuListItemArr[j].classList.contains("menu-list-item__checked")) {
          menuListItemArr[j].classList.remove("menu-list-item__checked");
          menuListItemArr[j].firstElementChild.classList.remove("text-menu__bold");
          menuListItemArr[j].lastElementChild.classList.remove("text-menu__bold");
          menuListItemArr[j].classList.add("menu-list-item");
          menuListItemArr[j].firstElementChild.classList.add("text-menu");
          menuListItemArr[j].lastElementChild.classList.add("text-menu");

        }
      }
    }
  })
}

let months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]
searchMonth = months[checkedmonth];

//закрашивает выходные дни
for(let i = 0; i < menuListItemArr.length; i++) {
  if((menuListItemArr[i].firstElementChild.textContent === "Сб,") || (menuListItemArr[i].firstElementChild.textContent === "Вс,")) {
    menuListItemArr[i].firstElementChild.classList.add("menu__weekend");
    menuListItemArr[i].lastElementChild.classList.add("menu__weekend");
    } 
}
if((today.lastElementChild.textContent.includes("Сб,")) || (today.lastElementChild.textContent.includes("Вс,"))) {
  today.lastElementChild.classList.add("menu__weekend");
}

let countOfClick = 0;
let countRevers = 0;
//клик по стрелке
arrowItem.addEventListener('click', () => {
  countOfClick++;
  today.firstElementChild.textContent = '<';
  today.lastElementChild.textContent = '';
  today.firstElementChild.classList.add("arrow_text");
  today.classList.add("arrow_item");
  revers.classList.remove("today");

  //меняет числа
  for(let i = 0; i < menuListItemArr.length; i++) { 
    if(Number(menuListItemArr[i].lastElementChild.textContent) !== dayOFMonth) {
      menuListItemArr[i].lastElementChild.textContent = Number(menuListItemArr[i].lastElementChild.textContent) + 1; 
    } else {
      menuListItemArr[i].lastElementChild.textContent = '1';
    }
  }

  //меняет дни недели
  let indOfEl = 0;
  function removeDay() {
      for(let i = 0; i < menuListItemArr.length; i++) {
        for( let j = 0; j < days.length; j++) {
          if(indOfEl < menuListItemArr.length) {//не больше,чем кол элементов
          if( menuListItemArr[i + indOfEl].firstElementChild.textContent === `${days[j]}`) {//ищем в массиве дней

            if(menuListItemArr[i + indOfEl].firstElementChild.textContent !== 'Вс,') {
              menuListItemArr[i + indOfEl].firstElementChild.textContent = days[j + 1]; 
              indOfEl++; 
            } else {
              menuListItemArr[i + indOfEl].firstElementChild.textContent = days[0];
              indOfEl++;
              j = -1;               
            }
          }
        } else {//усл
          return;
        }
      }//цикл по дням
    }//осн цикл 
  }//фун
  removeDay();

  //закрашивает выходные дни
  for(let i = 0; i < menuListItemArr.length; i++) {
    if((menuListItemArr[i].firstElementChild.textContent === "Сб,") || (menuListItemArr[i].firstElementChild.textContent === "Вс,")) {
      menuListItemArr[i].firstElementChild.classList.add("menu__weekend");
      menuListItemArr[i].lastElementChild.classList.add("menu__weekend");
    } else {
      menuListItemArr[i].firstElementChild.classList.remove("menu__weekend");
      menuListItemArr[i].lastElementChild.classList.remove("menu__weekend");
    }
  }
})


//клик по реверсной стрелке
revers.addEventListener('click', () => {
  countRevers++;
  //меняет числа
  function a() {
    if(countRevers <= countOfClick) {
  
      for(let i = 0; i < menuListItemArr.length; i++) { 
        if(Number(menuListItemArr[i].lastElementChild.textContent) !== 1){
        menuListItemArr[i].lastElementChild.textContent = Number(menuListItemArr[i].lastElementChild.textContent) - 1; 
        } else {
          menuListItemArr[i].lastElementChild.textContent = dayOFMonth;
        }
      }
    }

    if(countRevers > countOfClick) {
      return;
    }

    if(countRevers === countOfClick) {
      revers.firstElementChild.textContent = 'Сегодня';
      if(currentDay > 0){
        revers.lastElementChild.textContent = days[`${currentDay - 1}`] + currentDate.getDate();
      } else {
        revers.lastElementChild.textContent = days[6] + currentDate.getDate();
      }
      revers.firstElementChild.classList.remove("arrow_text");
      revers.classList.remove("arrow_item");
      revers.classList.add("today");
      today.classList.remove("revers");
    }
  }
  a();

  //меняет дни недели
  function reversDay() {
    if(countRevers <= countOfClick) {
      for(let i = 0; i < menuListItemArr.length; i++) {
        for( let j = 0; j < days.length; j++) {
          if( menuListItemArr[i].firstElementChild.textContent === days[j]) {

            if(menuListItemArr[i].firstElementChild.textContent !== 'Пн,') {
            menuListItemArr[i].firstElementChild.textContent = days[j - 1];
            break;
              } else {
                menuListItemArr[i].firstElementChild.textContent = days[6];
                break;
              }
          }
        }//цикл по дням
      }//осн цикл
    }
    if(countRevers > countOfClick) {
      return;
    }  
  }
  reversDay();
  

  //закрашивает выходные дни
  for(let i = 0; i < menuListItemArr.length; i++) {
    if((menuListItemArr[i].firstElementChild.textContent === "Сб,") || (menuListItemArr[i].firstElementChild.textContent === "Вс,")) {
      menuListItemArr[i].firstElementChild.classList.add("menu__weekend");
      menuListItemArr[i].lastElementChild.classList.add("menu__weekend");
      } else {
        menuListItemArr[i].firstElementChild.classList.remove("menu__weekend");
       menuListItemArr[i].lastElementChild.classList.remove("menu__weekend");
      }
  }
})//обраб

localStorage.setItem('searchMonth', searchMonth);