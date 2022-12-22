const createAutomCompleteWidget = ({
  root, 
  renderOption,
  optionSelect, 
  inputValue, 
  MovieObject}) => {
    // const root = document.querySelector('.autocomplete');
    root.innerHTML = `
      <label><b>Search</b></label>
      <input class="input"  />
      <div class="dropdown">
        <div class="dropdown-menu">
          <div class="dropdown-content results"></div>
        </div>
      </div>
    `;


const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const resultsWrapper = root.querySelector('.results');

const search = root.querySelector('.input');


const onInput = async event => {
    dropdown.classList.add('is-active')
    const items = await  MovieObject.searchForMovieWithTitle(event.target.value)
    if(!items.length) {
        dropdown.classList.remove('is-active')
        return;
    }
    resultsWrapper.innerHTML = ""

    // List all Movies with Movie Names
        for (let item of items) {
            if(item.Poster === "N/A"){
                item.Poster = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
            }
            const option = document.createElement('a');
            option.classList.add('dropdown-item')
            option.innerHTML = renderOption(item)
            resultsWrapper.appendChild(option);

            // When Movie is Clicked
            option.addEventListener('click', ()=>{
            dropdown.classList.remove('is-active')
            // card.classList.remove('is-hidden')
            input.value = inputValue(item)
            optionSelect(item)
            })
          }
};

document.addEventListener('click' ,  (event) => {
    if(!root.contains(event.target)){
        dropdown.classList.remove('is-active')
    }
})


search.addEventListener('input', newMoviee.debounce(onInput, 500));
    
}



