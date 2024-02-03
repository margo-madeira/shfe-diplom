function delHall(halllId) {
    fetch( `https://shfe-diplom.neto-server.ru/hall/${halllId}`, {
             method: 'DELETE',
          })
            .then( response => response.json())
            .then( function(data) {
              console.log( data );
              location.reload();
            })
}

function addHalls() {
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
}

function saveConfig(hallConfId, arrayConfig) {
    const params = new FormData();
    params.set('rowCount', `${rows.value}`);
    params.set('placeCount', `${places.value}`);
    params.set('config', JSON.stringify(arrayConfig));

    fetch( `https://shfe-diplom.neto-server.ru/hall/${hallConfId}`, {
    method: 'POST',
    body: params 
    })
        .then( response => response.json())
        .then( function(data) { 
          console.log( data );
        })
}

function addPrice(hallPriceId, params) {
    fetch( `https://shfe-diplom.neto-server.ru/price/${hallPriceId}`, {
        method: 'POST',
        body: params 
    })
      .then( response => response.json())
      .then( function(data) {
        console.log( data );
      })
}

function openHalls(serchIndOpen, hallOpenId) {
    const params = new FormData();
    params.set('hallOpen', `${serchIndOpen}`)
    fetch( `https://shfe-diplom.neto-server.ru/open/${hallOpenId}`, {
          method: 'POST',
          body: params 
    })
        .then( response => response.json())
        .then( function(data) { 
          console.log( data );
          location.reload();
        })
           
}

function addFilms(file) {
  const formData = new FormData();
  let numbDuration = Number(filmDuration.value);
        formData.set('filmName', `${filmName.value}`);
        formData.set('filmDuration', numbDuration);
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
           body.classList.remove('hidden');
           location.reload();  
         })
}

function delFilms(filmId) {
  fetch( `https://shfe-diplom.neto-server.ru/film/${filmId}`, {
            method: 'DELETE',
         })
           .then( response => response.json())
           .then( function(data) {
             console.log( data );
             location.reload();
           })
}

function addSeances(params) {                
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

function delSeances(checkSeans) {
  fetch( `https://shfe-diplom.neto-server.ru/seance/${checkSeans}`, {
    method: 'DELETE',
  })
    .then( response => response.json())
    .then(function(data) {
      console.log( data );
      location.reload();
    })
}