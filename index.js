const searchContainer = document.getElementById('search-container')
const mainSection = document.getElementById('main-section')
const mainPlaceholder = document.getElementById('main-placeholder')


searchContainer.addEventListener('submit',(e)=>{
    e.preventDefault()
    let movieTitle = document.getElementsByName('movie-title')[0].value
    console.log(movieTitle)

    getDataFromOMDb(movieTitle)
})



function getDataFromOMDb(title){

    console.log(title.split(' ').join('+'))
    console.log(title.replace(/ /g, '+'))
   
    fetch(`http://www.omdbapi.com/?apikey=8d939b35&s=${title.split(' ').join('+')}`)
        .then(res => res.json())
        .then(data =>{
            renderDataToMainSection(data)
        })
}

fetch(`http://www.omdbapi.com/?apikey=8d939b35&s=Batman&p=6}`)
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
            throw Error("Didnt find any movie")
        }
    }).catch(e => {console.error("ERROrR: "+e.message)
        
})

function renderDataToMainSection(data){
    console.log(data)


    data.Search.forEach(movie => {
        //mainSection.textContent += movie.Title
    });
    mainPlaceholder.style.display = 'none'

    //mainSection.innerHTML += "cos"

    

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
