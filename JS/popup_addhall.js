const inp = document.querySelector(".row__text");
const btnAdd = document.querySelector(".btn__add_hall");
const btnRemove = document.querySelector(".btn__white");
const closeBtn = document.querySelector(".close_popup_seans");
const form = document.querySelector(".form_addfilm");
const addHall = document.querySelector(".hall");

signal.addEventListener('abort', () => console.log("отмена!"));

//клик по добавить
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
})//обр

//клик по закрыть
closeBtn.addEventListener('click', () => {
    addHall.classList.remove("container__addfilm_active");  
})

//клик отменить
btnRemove.addEventListener('click', () => {
    controller.abort();
    form.reset();
})

