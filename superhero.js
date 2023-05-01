const publicKey = "6d5531421ed0b0e35a6fc3e371720590";
const privateKey = "2661418eddb8e49ed0a2f03445feac32a712d46e";
const ts = new Date().getTime();
const hash = CryptoJS.MD5(`${ts}${privateKey}${publicKey}`).toString(); 


const superheroName = document.getElementById("superhero-name");
const superheroImage = document.getElementById("superhero-image");
const superheroBio = document.getElementById("superhero-bio");
const comicsList = document.getElementById("comics-list");
const eventsList = document.getElementById("events-list");
const seriesList = document.getElementById("series-list");
const storiesList = document.getElementById("stories-list");

//receiving id from homepage
const superheroId = new URLSearchParams(window.location.search).get(
    "id"
  );
  

fetch(
  `https://gateway.marvel.com:443/v1/public/characters/${superheroId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
)
  .then((response) => response.json())
  .then((data) => {
    const superhero = data.data.results[0];

    //Superhero name,image and description
    superheroName.innerText = superhero.name;
    superheroImage.src = `${superhero.thumbnail.path}.${superhero.thumbnail.extension}`;
    superheroBio.innerText = superhero.description;

    // Display comics list
    superhero.comics.items.forEach((comic) => {
      const comicItem = document.createElement("li");
      comicItem.innerText = comic.name;
      comicsList.appendChild(comicItem);
    });

    // Display events list
    superhero.events.items.forEach((event) => {
      const eventItem = document.createElement("li");
      eventItem.innerText = event.name;
      eventsList.appendChild(eventItem);
    });

    // Display series list
    superhero.series.items.forEach((series) => {
      const seriesItem = document.createElement("li");
      seriesItem.innerText = series.name;
      seriesList.appendChild(seriesItem);
    });

    // Display stories list
    superhero.stories.items.forEach((story) => {
      const storyItem = document.createElement("li");
      storyItem.innerText = story.name;
      storiesList.appendChild(storyItem);
    });
    
  })
  .catch((error) => {
    console.error(error);
  });