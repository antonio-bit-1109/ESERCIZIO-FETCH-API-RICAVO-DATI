fetch("https://striveschool-api.herokuapp.com/books")
    .then((booksObj) => {
        if (booksObj.ok) {
            return booksObj.json();
        }
    })

    .then((bigArray) => {
        console.log(bigArray); // ho tra le mani mille mila oggetti
        buildLibrary(bigArray);
        eliminaCarrello();
    })

    .catch((error) => {
        console.log(error);
    });

const buildLibrary = (item) => {
    const row = document.getElementById("riga");

    for (let i = 0; i < item.length; i++) {
        let singleItem = item[i];

        const col = document.createElement("div");
        col.classList.add("col");
        row.appendChild(col);

        col.innerHTML += `
         <div class="card height m-4 main-card">
            <div class="d-flex justify-content-center">
            <img src="${singleItem.img}" class="card-img-top img-h" alt="libro">
            </div>
            <div class="card-body">
               <p class="card-code">codice identificativo: ${singleItem.asin}</p>
               <h5 class="card-title">${singleItem.title}</h5>
               <p class="card-price">Prezzo: ${singleItem.price}🍬</p>
               <p class="card-text">Genere: ${singleItem.category}</p>
               <div class="d-flex gap-3">
                <button class="btn btn-danger erase text-light">Cestina</button>
                <button class="btn btn-success compra-ora aggiunto-carrello">Aggiungi al carrello</button>
               </div>
            </div>
         </div>
       
        `;
    }
    eraseItem();
    buyNow();
};

const eraseItem = () => {
    const eraseButtons = document.querySelectorAll(".erase");
    eraseButtons.forEach((butt) => {
        butt.addEventListener("click", (event) => {
            event.target.closest(".col").remove();
        });
    });
};

const buyNow = () => {
    const arrCart = JSON.parse(localStorage.getItem("carrello")) || [];

    const allBuyButtons = document.querySelectorAll(".compra-ora");
    allBuyButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const book = event.currentTarget.closest(".main-card");
            console.log(book);

            const title = book.querySelector(".card-title").innerHTML;
            console.log(title);

            const prezzo = book.querySelector(".card-price").innerHTML;
            console.log(prezzo);

            const code = book.querySelector(".card-code").innerHTML;
            console.log(code);

            const isDuplicate = arrCart.some((item) => item[0] === title && item[1] === prezzo && item[2] === code);

            if (!isDuplicate) {
                arrCart.push([title, prezzo, code]);
                localStorage.setItem("carrello", JSON.stringify(arrCart));
                console.log(arrCart);
                showCart(arrCart);
                modifyButtonAddToCart(); /*  perchè viene sempre attivata ?? */
            } else {
                alert("Item is already in the cart.");
            }
        });
    });
};

const showCart = (array) => {
    const htmlDiv = document.getElementById("cart-space");
    htmlDiv.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        singleBook = array[i];
        const cassetto = document.createElement("div");
        cassetto.classList.add("m-4");
        cassetto.classList.add("border");
        cassetto.classList.add("p-3");
        cassetto.classList.add("text-light");
        htmlDiv.appendChild(cassetto);
        cassetto.innerHTML = singleBook;
    }
};

const eliminaCarrello = () => {
    const buttonErase = document.getElementById("elimina-carrello");
    const spazioCarrello = document.getElementById("cart-space");
    buttonErase.addEventListener("click", () => {
        localStorage.clear();
        spazioCarrello.innerHTML = "";
    });
};

const modifyButtonAddToCart = () => {
    const allBuyButtons = document.querySelectorAll(".aggiunto-carrello");
    allBuyButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            const currentButton = event.currentTarget;
            currentButton.classList.add("btn-primary");
            currentButton.classList.remove("btn-success");
            currentButton.classList.add("text-light");
            currentButton.innerHTML = "Aggiunto al carrello!!";
            setTimeout(() => {
                currentButton.classList.remove("btn-primary");
                currentButton.classList.add("btn-success");
                currentButton.classList.remove("text-light");
                currentButton.innerHTML = "Aggiungi al carrello";
            }, 1000);
        });
    });
};
