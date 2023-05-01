const publicKey = "6d5531421ed0b0e35a6fc3e371720590";
const privateKey = "2661418eddb8e49ed0a2f03445feac32a712d46e";
const ts = new Date().getTime();
const hash = CryptoJS.MD5(`${ts}${privateKey}${publicKey}`).toString(); 

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
const favoriteList = document.getElementById("favorite-list");
const favoritesButton = document.getElementById("favorites-button");

// Check for favorite superheroes in the local storage
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

//fetching superhero via api
function getSuperheroes(searchQuery) {
fetch(
`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${searchQuery}&ts=${ts}&apikey=${publicKey}&hash=${hash}`
)
.then((response) => response.json())
.then((data) => {
  const superheroes = data.data.results;
  searchResults.innerHTML = "";

  superheroes.forEach((superhero) => {
    const superheroElement = document.createElement("div");
    superheroElement.classList.add("superhero");

    const superheroName = document.createElement("h2");
    superheroName.innerText = superhero.name;

    const favoriteButton = document.createElement("button");
    favoriteButton.innerText = "Favorite";
    favoriteButton.addEventListener("click", () => {
      addToFavorites(superhero);
    });

    superheroElement.appendChild(superheroName);
    superheroElement.appendChild(favoriteButton);

    //  Click event to open respective superhero page 
    superheroName.addEventListener("click", () => {
        window.location.href = `superhero.html?id=${superhero.id}`;
      });
      
    searchResults.appendChild(superheroElement);
  });
})
.catch((error) => {
  console.error(error);
});
}

function addToFavorites(superhero) {
favorites.push(superhero);
localStorage.setItem("favorites", JSON.stringify(favorites));
}

searchInput.addEventListener("input", (event) => {
const searchQuery = event.target.value;
getSuperheroes(searchQuery);
});

