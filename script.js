const API_LINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ff749249c28aaf7a8728340b82e4daa6&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=ff749249c28aaf7a8728340b82e4daa6&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(API_LINK);

function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.results);
            main.innerHTML = ''; // Clear previous results before displaying new ones
            data.results.forEach(element => {
                const div_card = document.createElement('div');
                div_card.classList.add('card');
                const div_row = document.createElement('div');
                div_row.classList.add('row');
                const div_column = document.createElement('div');
                div_column.classList.add('column');
                const image = document.createElement('img');
                image.classList.add('thumbnail');
                image.alt = element.title; // Add alt attribute for better accessibility
                const title = document.createElement('h3');
                title.classList.add('title'); // Use class instead of id for multiple elements
                const center = document.createElement('center');

                title.textContent = element.title;
                image.src = IMG_PATH + element.poster_path;

                center.appendChild(image);
                div_card.appendChild(center);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);
                
                main.appendChild(div_row);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchItem = search.value.trim(); // Trim whitespace from the input

    if (searchItem) {
        returnMovies(SEARCHAPI + encodeURIComponent(searchItem)); // Encode the search query to handle special characters
        // search.value = ""; // Clear the input field
    }
});
