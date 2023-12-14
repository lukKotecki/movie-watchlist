const searchContainer = document.getElementById('search-container')
const mainSection = document.getElementById('main-section')
const mainPlaceholder = document.getElementById('main-placeholder')
const movieList = document.getElementById('movie-list')
const movieTitle = document.getElementsByName('movie-title')[0]
const myMovieList = document.getElementById('my-movie-list')

function getDataFromOMDb(title){

    // console.log(title.split(' ').join('+'))
    // console.log(title.replace(/ /g, '+'))
   
    fetch(`http://www.omdbapi.com/?apikey=8d939b35&s=${title.split(' ').join('+')}`)
        .then(res => {
            if(!res.ok){
                throw Error("Something went wrong")
            }else{
                return res.json()
            }
        })
        .then(data =>{
            if(data.Response==="True"){
                renderDataToMainSection(data)
            }else{
                mainPlaceholder.textContent = 'Unable to find what you’re looking for. Please try another search.'     
                throw Error("Didnt find any movie")
            }
        }).catch(e => {
            console.error("ERROR: "+e.message) 
            clearMainSection();   

    })
}

function renderDataToMainSection(data){
    console.log(data)
    mainPlaceholder.style.display = 'none'
    let movieElements = ''

    data.Search.forEach((movie,i) => {
        //mainSection.textContent += movie.Title
        // console.log(data)
        movieElements += `
        <li class="movie-element">
            <img src="${data.Search[i].Poster}">
            <h3>${data.Search[i].Title} <span><i class="fa-solid fa-star"></i> ${data.Search[i].Year}</span></h3> 
            <div class="movie-element-info">
                <p>117 min</p> 
                <p>Action, Darama, Sci-fi</p>
                <button id="${data.Search[i].imdbID}"><i class="fa-solid fa-circle-plus"></i> Watchlist</button>
            </div>
            <p>A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.</p>
        </li>`
        
    });

    movieList.innerHTML = movieElements

}

if(movieList){
    movieList.addEventListener('click',e=>{
        e.preventDefault()
        console.log(e.target.id)
        if (e.target.id.length){
            console.log(e.target.id)
            addMovieIdToLocalStorage(e.target.id)
            }else{
            console.log('złe id bo wynosi '+e.target.id.length)
        }
    })
}

searchContainer.addEventListener('submit',e=>{
    e.preventDefault()
    if(movieTitle.value){
        getDataFromOMDb(movieTitle.value)
    } 
})

function clearMainSection(){
    movieList.textContent = ''
    mainPlaceholder.style.display = 'block'
}


function addMovieIdToLocalStorage(movie){

    if(localStorage.getItem('movieId')){
        if(localStorage.getItem('movieId').split(' ').includes(movie)){
            console.log("Ten film już dodano")
        }else{
            localStorage.setItem('movieId', localStorage.getItem('movieId')+" "+movie)
        }
    }else{
        localStorage.setItem('movieId', movie)
    }

}

function renderMyWatchlist(){
    let myWatchist = localStorage.getItem('movieId').split(' ')
    console.log(myWatchist)




    if(myWatchist[0]){
        console.log(myWatchist.length)
        mainPlaceholder.style.display = 'none'

        myMovieList.innerHTML = ''
        myWatchist.forEach((movie,i) => {

            fetch(`http://www.omdbapi.com/?apikey=8d939b35&i=${movie}`)
                .then(res =>res.json())
                .then(data =>{
                    myMovieList.innerHTML += `
                    <li class="movie-element">
                        <img src="${data.Poster}">
                        <h3>${data.Title} <span><i class="fa-solid fa-star"></i> ${data.Year}</span></h3> 
                        <div class="movie-element-info">
                            <p>117 min</p> 
                            <p>Action, Darama, Sci-fi</p>
                            <button id="${movie}"><i class="fa-solid fa-circle-minus"></i> Remove</button>
                        </div>
                        <p>A blade runner must pursue and terminate four replicants who stole a ship in space, and have returned to Earth to find their creator.</p>
                    </li>`
                    console.log(data)
                })

        });

    }else{
        myMovieList.innerHTML = ''
        mainPlaceholder.style.display = 'block'
    }



}


if(myMovieList){
    renderMyWatchlist()

    myMovieList.addEventListener('click',e=>{
        if(e.target.id){
            console.log(e.target.id)

            let myWatchist = localStorage.getItem('movieId').split(' ')

            console.log(myWatchist)

            myWatchist = myWatchist.filter(idToRemove => idToRemove !== e.target.id)
            

            console.log([...myWatchist])
            localStorage.setItem('movieId', [...myWatchist].join(' '))
            renderMyWatchlist();

            console.log(...myWatchist)
            console.log('Kliknieto remove')
        }
    })

}



let object = {
    "Search": [
        {
            "Title": "Batman Begins",
            "Year": "2005",
            "imdbID": "tt0372784",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
        },
        {
            "Title": "The Batman",
            "Year": "2022",
            "imdbID": "tt1877830",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BM2MyNTAwZGEtNTAxNC00ODVjLTgzZjUtYmU0YjAzNmQyZDEwXkEyXkFqcGdeQXVyNDc2NTg3NzA@._V1_SX300.jpg"
        },
        {
            "Title": "Batman v Superman: Dawn of Justice",
            "Year": "2016",
            "imdbID": "tt2975590",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
        },
        {
            "Title": "Batman",
            "Year": "1989",
            "imdbID": "tt0096895",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BZWQ0OTQ3ODctMmE0MS00ODc2LTg0ZTEtZWIwNTUxOGExZTQ4XkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg"
        },
        {
            "Title": "Batman Returns",
            "Year": "1992",
            "imdbID": "tt0103776",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg"
        },
        {
            "Title": "Batman & Robin",
            "Year": "1997",
            "imdbID": "tt0118688",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMGQ5YTM1NmMtYmIxYy00N2VmLWJhZTYtN2EwYTY3MWFhOTczXkEyXkFqcGdeQXVyNTA2NTI0MTY@._V1_SX300.jpg"
        },
        {
            "Title": "Batman Forever",
            "Year": "1995",
            "imdbID": "tt0112462",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDdjYmFiYWEtYzBhZS00YTZkLWFlODgtY2I5MDE0NzZmMDljXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
        },
        {
            "Title": "The Lego Batman Movie",
            "Year": "2017",
            "imdbID": "tt4116284",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMTcyNTEyOTY0M15BMl5BanBnXkFtZTgwOTAyNzU3MDI@._V1_SX300.jpg"
        },
        {
            "Title": "Batman: The Animated Series",
            "Year": "1992–1995",
            "imdbID": "tt0103359",
            "Type": "series",
            "Poster": "https://m.media-amazon.com/images/M/MV5BOTM3MTRkZjQtYjBkMy00YWE1LTkxOTQtNDQyNGY0YjYzNzAzXkEyXkFqcGdeQXVyOTgwMzk1MTA@._V1_SX300.jpg"
        },
        {
            "Title": "Batman v Superman: Dawn of Justice (Ultimate Edition)",
            "Year": "2016",
            "imdbID": "tt18689424",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BOTRlNWQwM2ItNjkyZC00MGI3LThkYjktZmE5N2FlMzcyNTIyXkEyXkFqcGdeQXVyMTEyNzgwMDUw._V1_SX300.jpg"
        }
    ],
    "totalResults": "558",
    "Response": "True"
}



let movie = {
    "Title": "Blade of the Immortal",
    "Year": "2017",
    "Rated": "R",
    "Released": "03 Nov 2017",
    "Runtime": "140 min",
    "Genre": "Action, Drama, Fantasy",
    "Director": "Takashi Miike",
    "Writer": "Hiroaki Samura, Tetsuya Oishi",
    "Actors": "Takuya Kimura, Hana Sugisaki, Sôta Fukushi",
    "Plot": "Cursed with a life of immortality, a samurai is tasked by a young girl to help avenge the death of her father. Based on the manga series by Hiroaki Samura.",
    "Language": "Japanese",
    "Country": "Japan, United Kingdom, South Korea",
    "Awards": "1 win & 10 nominations",
    "Poster": "https://m.media-amazon.com/images/M/MV5BYzIwYmJlMjktMzJiMy00YmQzLThmNWYtNWY3NGViZjc4MzYwXkEyXkFqcGdeQXVyNDQxNjcxNQ@@._V1_SX300.jpg",
    "Ratings": [
        {
            "Source": "Internet Movie Database",
            "Value": "6.7/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "87%"
        },
        {
            "Source": "Metacritic",
            "Value": "72/100"
        }
    ],
    "Metascore": "72",
    "imdbRating": "6.7",
    "imdbVotes": "19,168",
    "imdbID": "tt5084170",
    "Type": "movie",
    "DVD": "08 Nov 2017",
    "BoxOffice": "$150,532",
    "Production": "N/A",
    "Website": "N/A",
    "Response": "True"
}















const unsortedArray = [1,5,2,6,8,4,6,11,4,5,66,3,0,1,1,-1,1]

function sortArray(arrayToSort){
    let sortedArray =[]
    let min =0;

    for(let number of arrayToSort){
        min>number ? min = number : min
    }

    // for (let i=0;i<arrayToSort.length;i++){
        for(let j=0;j<arrayToSort.length;j++){
            //if(arrayToSort[j]==min)
                //console.log(arrayToSort[j])
            
        }
    // }

    return sortedArray
}

//console.log(sortArray(unsortedArray))



