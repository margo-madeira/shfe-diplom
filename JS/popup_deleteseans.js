const closeDelSeans = document.querySelector(".close_del_seans");
const containerDelSeans = document.querySelector(".delete__seances");
const labelFilm = document.querySelector(".label_delete__seanse");
let nameOfFilms = localStorage.getItem('name');
const delSeans = document.querySelector(".del_seans");
const delSeansCancel = document.querySelector(".del_seans_cancel");
let checkDel;

//клик по крестику
closeDelSeans.addEventListener("click", () => {
    containerDelSeans.classList.remove("container__addfilm_active");
})

//клик по удалить
labelFilm.textContent = nameOfFilms;
delSeans.addEventListener('click', () => {
    checkDel = 'yes';
    localStorage.setItem('remove', checkDel);
    containerDelSeans.classList.remove("container__addfilm_active");
    localStorage.removeItem('name');
})

//клик по отмене
delSeansCancel.addEventListener('click', () => {
    containerDelSeans.classList.remove("container__addfilm_active");
})
