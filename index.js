

const newMoviee = new Movie(" http://www.omdbapi.com/", "4bd46d0a");

const image = document.querySelector('.card-img-top')
const title = document.querySelector('.card-title')
// const card = document.querySelector('#summary');

const autocompleteConfig = {
  renderOption : (movie) => {
    const imgsrc = movie.Poster === "N/A"  ? 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg' : movie.Poster  ;
    return `
    <img src="${movie.Poster}" />
    ${movie.Title}
    ${movie.Year}
    `
  },
  
  inputValue : (movie) => {
    return movie.Title;
  },
  MovieObject : newMoviee


}




createAutomCompleteWidget({
    ...autocompleteConfig, 
    root : document.querySelector('#left-autocomplete') ,
    optionSelect(movie){
      document.querySelector(".tutorial").classList.add('is-hidden')
      searchMovieWithID(movie, document.querySelector("#left-summary"), 'left')
    },
})

createAutomCompleteWidget({
  ...autocompleteConfig, 
  root : document.querySelector('#right-autocomplete'),
  optionSelect(movie){
    document.querySelector(".tutorial").classList.add('is-hidden')
    searchMovieWithID(movie, document.querySelector("#right-summary"), 'right')
  },
 
 
})





let leftmovie;
let rightmovie;

async function searchMovieWithID(movie, summaryElement, side){
  const response = await axios.get("http://www.omdbapi.com/", {
      params : {
         apikey : "4bd46d0a",
         i : movie.imdbID
      }
  })
  summaryElement.innerHTML = movieTemplate(response.data)

  if(side === 'left'){
    leftmovie = response.data;
  }else{
    rightmovie = response.data;
  }

  if(leftmovie && rightmovie){
    runComparison();
  }
}


const runComparison = () => {
  const leftSideStats = document.querySelectorAll(
    '#left-summary .notification'
  );
  const rightSideStats = document.querySelectorAll(
    '#right-summary .notification'
  );
 
  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];
 
    const leftSideValue = parseInt(leftStat.dataset.value) // <------ BAD
    const rightSideValue = parseInt(rightStat.dataset.value); // <------ BAD
 
    if (rightSideValue > leftSideValue) {
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    } else {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
    
    }
  });
};





const movieTemplate = (movieDetails) => {
  let count = 0;
  const dollars = parseInt(movieDetails.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
  const metascore = parseFloat(movieDetails.Metascore);
  const imdbRating = parseInt(movieDetails.imdbRating);
  const votes = parseInt(movieDetails.imdbVotes.replace(/,/g, ''))
 
  const awards = movieDetails.Awards.split(' ').reduce((prev, word) => {
    const value = parseInt(word);

    if(isNaN(value)){
      return prev;
    }else{
        return prev + value;
    }
  }, 0)


  return `
  <article class="media">
  <figure class="media-left">
    <p class="image">
      <img src="${movieDetails.Poster}" alt="">
    </p>
  </figure>
  <div class="media-content">
      <div class="content">
        <h1>${movieDetails.Title}</h1>
        <h4>${movieDetails.Genre}</h4>
        <p>${movieDetails.Plot}</p>
      </div>
    </div>
</article>
<article  data-value=${awards} class="notification is-primary">
<p class="title">${movieDetails.Awards}</p>
<p class="subtitle">Awards</p>
</article>

<article data-value=${dollars} class="notification is-primary">
<p class="title">${movieDetails.BoxOffice}</p>
<p class="subtitle">Box Office</p>
</article>
<article  data-value=${metascore} class="notification is-primary">
<p class="title">${movieDetails.Metascore}</p>
<p class="subtitle">Meta score</p>
</article>
<article  data-value=${imdbRating} class="notification is-primary">
<p class="title">${movieDetails.imdbRating}</p>
<p class="subtitle">imdb Rating</p>
</article>

<article  data-value=${votes} class="notification is-primary">
<p class="title">${movieDetails.imdbVotes}</p>
<p class="subtitle">imdb Votes</p>
</article>
  `
}

