class Movie {
    constructor(url, apikey) {
        this.url = url;
        this.apikey = apikey;
     
    }
    searchForMovieWithTitle(title){
        const fetchMovieData = async () => {
            const response = await axios.get(this.url, {
                params : {
                   apikey : this.apikey,
                   s : title
                }
            })

            if(response.data.Error ){
                return [{Error : "No Movies with Search Term  "}]
            }

            return response.data.Search;
          
        }
        return fetchMovieData();
    }

    
    debounce (inputMethod, delay){
        let timerid;
        return  (...args) => {
            if(timerid){
                clearTimeout(timerid);
            }
            timerid = setTimeout(() => {
                inputMethod(...args)
            }, delay);
        }
    }
}



