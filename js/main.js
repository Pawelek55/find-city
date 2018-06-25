const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

var cities = [];

fetch(endpoint)
    .then(blob => blob.json())
    .then(data => cities.push(...data))

function findMatches(wordToMatch, cities){
    return cities.filter(place => {
       let regex = new RegExp(wordToMatch, 'gi');
       return place.city.match(regex) || place.state.match(regex)
    });
};

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function findPlaces(){
    let matchArray = findMatches(this.value, cities);
    let html = matchArray.map(place => {
        let regex = new RegExp(this.value, 'gi');
        let cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`)
        let stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`)
        return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population"><sup>${numberWithCommas(place.population)}</sup></span>
        </li>
        `;
    }).join('');
    suggestion.innerHTML = html;
}


let searchInput = document.querySelector('.search');
let suggestion = document.querySelector('.stripes');

searchInput.addEventListener('change', findPlaces);
searchInput.addEventListener('keyup', findPlaces);

