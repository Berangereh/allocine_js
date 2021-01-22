const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const displaydiv = document.getElementById("display");
const OMDbAPIbase = "http://www.omdbapi.com/?apikey=8d015e8b"

let Movielist;
let OMDbAPI;
// personnalisation de l'url
function changeAPi(input) {
    OMDbAPI = OMDbAPIbase+"&s="+input
}

// on va chercher l'array avec le rsltt de la recherche
function getMovielist(OMDbAPI) {
    displaydiv.innerHTML=""

    fetch(OMDbAPI, {
        method: "GET"
    })

    .then((response) => response.json())
    .then((item) => {
        Movielist = item
        console.log(Movielist)

        for(let i=0;i < 10; i++){
            newDisplay(i);
        };
    })
}

// on va chercher les diff elements

function printPoster(i) {
    document.querySelector(`#image${i}`).src = Movielist.Search[i].Poster
}

function printTitle(i) {
    document.querySelector(`#title${i}`).innerHTML = Movielist.Search[i].Title
}

function printDate(i) {
    document.querySelector(`#date${i}`).innerHTML = Movielist.Search[i].Year
}

// function printDescription(i) {
//     document.querySelector(`#description${i}`).innerHTML = "Movielist.Search[i].Year"
// }

// crea des cards en fct du nb dispo
function newDisplay(i){
    displaydiv.innerHTML+=`
    <div class="card inline-poster" >
        <img id="image${i}">
        <div class="card-body">
            <h5 id="title${i}" class="card-title"></h5>
            <p id="date${i}" class="card-text"></p>
            <button id="knowmore" type="button" class="btn btn-primary">En savoir plus</button>
        </div>
    </div>`
    printPoster(i);
    printTitle(i);
    printDate(i);

// transitions de cards

    // Detect request animation frame
    var scroll = window.requestAnimationFrame ||
    // IE Fallback
    function(callback){ window.setTimeout(callback, 1000/60)};
    var elementsToShow = document.querySelectorAll('.card'); 

    function loop() {

    Array.prototype.forEach.call(elementsToShow, function(element){
    if (isElementInViewport(element)) {
    element.classList.add('is-visible');
    } else {
    element.classList.remove('is-visible');
    }
    });

    scroll(loop);
    }

    // Call the loop for the first time
    loop();

    // Helper function from: http://stackoverflow.com/a/7557433/274826
    function isElementInViewport(el) {
    // special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
    }
    var rect = el.getBoundingClientRect();
    return (
    (rect.top <= 0
    && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
    }

// pop up / modal

    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("knowmore");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }


    


}

// au submit
searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const inputValue = searchInput.value;
    console.log(inputValue);
    changeAPi(inputValue);
    getMovielist(OMDbAPI);
});
  

