function fetchPhotos() {
    const url = "https://jsonplaceholder.typicode.com/photos?_limit=6";

    axios.get(url).then(res =>{
        displayPhotos(res.data);
        console.log(res.data)
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

        divCard.addEventListener("click", () => osservaImmagine(photo.url));    
    })
}

function osservaImmagine(image){
    const openImage = document.createElement("div");
    openImage.classList.add("card");
    openImage.classList.add("apertura");

    const imageOpened = document.createElement("img");
    imageOpened.src = image;
    openImage.append(imageOpened)

    document.body.appendChild(openImage)

    openImage.addEventListener("click", () =>{
        openImage.remove()
    });
}
window.onload = fetchPhotos;