const favoriteList = document.getElementById("favorite-list");

// Load favorites from local storage
const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

//Display favourite 
function renderFavorites() {
    favoriteList.innerHTML = "";
    favorites.forEach((favorite) => {
      const favoriteItem = document.createElement("li");
      favoriteItem.setAttribute("data-id", favorite.id);
      
      const thumbnail = document.createElement("img");
      thumbnail.setAttribute("src", `${favorite.thumbnail.path}.${favorite.thumbnail.extension}`);
      thumbnail.setAttribute("alt", favorite.name);
      thumbnail.setAttribute("width", "100");
      favoriteItem.appendChild(thumbnail);
      
      const details = document.createElement("div");
      details.classList.add("details");
  
      const name = document.createElement("h2");
      name.innerText = favorite.name;
      details.appendChild(name);
  
      const removeButton = document.createElement("button");
      removeButton.innerText = "Remove";
      removeButton.addEventListener("click", () => {
        removeFromFavorites(favorite);
      });
      details.appendChild(removeButton);
  
      favoriteItem.appendChild(details);
      favoriteItem.appendChild(name);
      favoriteItem.appendChild(details);
      favoriteList.appendChild(favoriteItem);
    });
  }
  
 // Remove favorite from local storage
function removeFromFavorites(favorite) {
   
    const updatedFavorites = favorites.filter(
        (f) => f.id !== favorite.id
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

  favorites.splice(favorites.indexOf(favorite), 1);
    renderFavorites();
}

// Render favorites list
renderFavorites();
