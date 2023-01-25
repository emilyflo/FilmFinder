// checking if local port is working

// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}!`);
// });


// search functionality

const APIKey = '693d22766b2841128aa7ef6feee4aeb5'
const searchBox = document.querySelector('.search-box')
const searchText = document.querySelector('.search-text')

function submitForm () {
searchBox.addEventListener('submit', function(e) {
    e.preventDefault()
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIKey}&query=${searchText.value}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer',
                'Content-Type': 'application/json,charset:utf-8'}
    })
    .then((res) => res.json())
    .then((data) => {
        let outputDiv = document.getElementById('films');
        let results = data.results

        // clear the previous search if there was a previous search
        while (outputDiv.firstChild) {
            outputDiv.removeChild(outputDiv.firstChild)
        }

        // let the user know if their search yielded no results
        if (results.length === 0) {
            const noResults = document.createTextNode("Your film wasn't found in the library.")
            outputDiv.appendChild(noResults)
            console.log
        }

        // a successful search will be displayed on the page with divs created for each item and its related attributes
        else {
            for (let result of results) {
                console.log(result)
                const filmCard = document.createElement('div')
            filmCard.classList.add('film-card')
            filmCard.innerHTML = `

            <div class="film-image">
            <img src="https://image.tmdb.org/t/p/original/${result.poster_path}"/>
            </div>

            <div class="film-title">
                <h2>${result.title}</h2>
            </div>

            <div class="film-release-date">
                <p>Released: ${result.release_date}</p>
            </div>
            
            <div class="film-synopsis">
            <p>${result.overview}</p>
            </div>

                `
                outputDiv.appendChild(filmCard)
            }
        }

        // clear out the search bar after searching
        searchBox.reset();
    })
})
}