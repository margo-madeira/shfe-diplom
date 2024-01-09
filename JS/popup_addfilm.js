const btnClose = document.querySelector(".close_popup");
const btnAddsFilm = document.querySelector(".save__film");
const btnPoster = document.querySelector(".poster_add");
const btnCancel = document.querySelector(".cancel");
const filmContainer = document.querySelector(".film");
const formAddfilm = document.querySelector(".form_addfilm");
let fileName;
const filmName = document.querySelector(".filmname");
const filmDuration = document.querySelector(".filmtime");
const filmDescription = document.querySelector(".description");
const filmOrigin = document.querySelector(".origin");
const fildsAddfilm = document.querySelector(".filds_addfilm");
signal.addEventListener('abort', () => console.log("отмена!"));

//клик по крестик
btnClose.addEventListener('click', () => {
    filmContainer.classList.remove("container__addfilm_active");
})

//выбор файла
document.querySelector(".poster_add").onchange = function() {

    let size = this.files[0].size; // размер в байтах
    let fileExtension = ['png']; // допустимые типы файлов

    if(3000000 < size) {
        alert("не верный формат!");
    } else if (fileExtension == 1) {
        alert("превышение размера");
    } else {
        fileName = this.value.split("\\");
        fileName[fileName.length - 1];
        return fileName;
    }
}


//клик по добавить на страницу
btnAddsFilm.addEventListener('click', () => {
    localStorage.setItem('filmName', `${filmName.value}`);
    localStorage.setItem('filmDuration', `${filmDuration.value}`);
    localStorage.setItem('filmDescription', `${filmDescription.value}`);
    localStorage.setItem('filmOrigin', `${filmOrigin.value}`);
    localStorage.setItem('poster', `${fileName}`);
    
    localStorage.setItem('filmOpen', 'was open');
    filmContainer.classList.remove("container__addfilm_active");
})

//клик отменить
btnCancel.addEventListener('click', () => {
    formAddfilm.reset();
    controller.abort();
})

