let getPhotos = [];
let tracking = 0;

function fetchPhotos() {
    const url = "https://jsonplaceholder.typicode.com/photos?_limit=6";

    axios.get(url).then(res =>{
        displayPhotos(res.data);
        getPhotos = res.data;
        console.log(res.data)
        console.log(getPhotos)
    })
}

function displayPhotos(photos){
    const libreria = document.getElementById("card-container");
    
    photos.forEach(photo =>{
        const divCard = document.createElement("div");
        divCard.classList.add("card")
        // pin
        const pinDiv = document.createElement("div");
        pinDiv.classList.add("pin");
        const pinImg = document.createElement("img");
        pinImg.src = "img/pin.svg";
        pinImg.classList.add("pin-obj");
        pinDiv.appendChild(pinImg);
        divCard.appendChild(pinDiv);
        // img
        const immagine = document.createElement("img");
        console.log(photo.url);
        immagine.src = photo.url;
        divCard.appendChild(immagine);
        //descrizione immagine
        const descrizione = document.createElement("figcaption")
        descrizione.textContent = photo.title.charAt(0).toUpperCase()+photo.title.slice(1);
        divCard.append(descrizione)

        libreria.appendChild(divCard)

        divCard.addEventListener("click", () => osservaImmagine(photo.url,photo.id));    
    })
}

function osservaImmagine(image,index){
    tracking = index;
    const sfondo = document.createElement("div");
    sfondo.classList.add("apertura");
    console.log("ciao")
    const openImage = document.createElement("div");
    openImage.classList.add("box-temporaneo");
    sfondo.appendChild(openImage);
    console.log(openImage);
    const arrowRightDiv = document.createElement("div");
    arrowRightDiv.classList.add("arrows-right")
    
    const arrowRight = document.createElement("i");
    arrowRight.classList.add("fa-solid");
    arrowRight.classList.add("fa-arrow-right");
    arrowRightDiv.appendChild(arrowRight)

    openImage.appendChild(arrowRightDiv)

    const arrowLeftDiv = document.createElement("div");
    arrowLeftDiv.classList.add("arrows-left")
    
    const arrowLeft = document.createElement("i");
    arrowLeft.classList.add("fa-solid");
    arrowLeft.classList.add("fa-arrow-left");
    arrowLeftDiv.appendChild(arrowLeft)

    openImage.appendChild(arrowLeftDiv)

    const imageOpened = document.createElement("img");
    imageOpened.src = image;
    openImage.appendChild(imageOpened)

    document.body.appendChild(sfondo)
    
    console.log(tracking)

    arrowRightDiv.addEventListener("click", (event) => { 
        event.stopPropagation();
        showNextImage(imageOpened);
    });
    arrowLeftDiv.addEventListener("click", (event) => {
        event.stopPropagation();
        showPreviousImage(imageOpened);
    });
    

    sfondo.addEventListener("click", () =>{
        sfondo.remove()
    });
}

function showNextImage(image){
    tracking += 1
    if(tracking >= getPhotos.length){
        tracking = 0;
    }
    const immagineDopo = getPhotos[tracking].url;
    image.src = immagineDopo
}
function showPreviousImage(image){
    console.log(tracking)
    if(tracking === 0){
        tracking += getPhotos.length-1;
        console.log(tracking)
    }else{
        tracking -= 1
    }
    const immagineDopo = getPhotos[tracking-1].url;
    image.src = immagineDopo
}
window.onload = fetchPhotos;