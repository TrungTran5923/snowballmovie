const header = document.querySelector(".header");
const footer = document.querySelector(".footer");
const API_KEY = "e9e9d8da18ae29fc430845952232787c";

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
});
// Render Header Footer
function renderHeader() {
    header.innerHTML = ` <div class="logo">
    <a href="index.html"><img src="img/movielogo.png" alt="" /></a>
</div>
<div class="menu">
    <ul>
        <li><a href="index.html">HOME</a></li>
        <li><a href="movie.html?type=movie">MOVIES</a></li>
        <li><a href="movie.html?type=tv">TV SHOWS</a></li>
        <li><a href="people.html">PEOPLE</a></li>
        <li>
            <a href="">GENRE</a>
            <div class="submenu">
                <ul>
                   
                </ul>
            </div>
        </li>
    </ul>
</div>
<div class="search">
    <div class="search-input">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" placeholder="Search Movies" />
    </div>
    <div class="search-movie">    
    </div>
</div>
<div class="menu-button"></div>`;
}
renderHeader();

function renderFooter() {
    footer.innerHTML = `<div class="container">
    <div class="top">
        <div class="logo"><img src="img/movielogo.png" alt="" /></div>
        <div class="menu">
            <ul>
                <li><a href="">HOME</a></li>
                <li><a href="movie.html">MOVIES</a></li>
                <li><a href="">TV SHOWS</a></li>
                <li><a href="">ACTORS</a></li>
            </ul>
        </div>
    </div>
    <div class="bot">
        <div class="copyright">
            <p>@ 2023 SnowBall. All Rights Reserved</p>
        </div>
        <div class="social">
            <i class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-youtube"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-twitter"></i>
        </div>
    </div>
</div>`;
}
renderFooter();
//fetch data
async function getData(url) {
    let promise = await fetch(url);
    let data = await promise.json();
    return data;
}
// Render data
function renderData(data, box) {
    data.results.forEach((element) => {
        box.innerHTML += ` <div class="movie-card">
     <div class="movie-poster">
     <a href="movie_detail.html?idmovie=${element.id}&type=${element.name ? "tv" : "movie"}"><img src="https://image.tmdb.org/t/p/w300${element.poster_path}" alt="" /></a>
     </div>
     <div class="movie-info">
         <div class="movie-title">
             <h3>${!element.title ? element.name : element.title}</h3>
         </div>
         <div class="movie-subtitle">
             <p class="date">${!element.release_date ? element.first_air_date : element.release_date}</p>
             <div class="rating">
                 <i class="fa-solid fa-star"></i>
                 <p>${element.vote_average}</p>
             </div>
         </div>
     </div>
 </div>`;
    });
}
async function showListGenre() {
    const dataGenre = await getData(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
    const submenu = document.querySelector(".submenu ul");
    dataGenre.genres.forEach((element) => {
        submenu.innerHTML += `<li><a href="movie.html?type=movie&id=${element.id}&name=${element.name}">${element.name}</a></li>`;
    });
}
showListGenre();
//show detail movie
function showDetail(idMovie) {
    window.location.href = `movie_detail.html?idmovie=${idMovie}`;
}

//show detail people
function showDetailPeople(idPeople) {
    window.location.href = `people_detail.html?people=${idPeople}`;
}
//search
const searchInput = document.querySelector(".search-input input");
let searchList = document.querySelector(".search-movie");
async function showSearchMovie(data) {
    searchList.classList.add("active");
    searchList.innerHTML = "";
    data.results.forEach((element) => {
        searchList.innerHTML += `<ul>
        <li>
            <a href="movie_detail.html?idmovie=${element.id}&type=movie">
            <div class="movie-poster" >
            <img src="https://image.tmdb.org/t/p/w300${element.poster_path}" alt="" />
                
            </div>
            <div class="movie-name">
                <h5>${element.original_title}</h5>
                <p>${element.release_date}</p>
            </div>
            </a>
        </li> 
    </ul>`;
    });
}
searchInput.addEventListener("input", async function () {
    if (!searchInput.value) {
        searchList.classList.remove("active");
    } else {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchInput.value}`;
        const data = await getData(url);
        console.log(data);
        showSearchMovie(data);
    }
});
const menuBtn = document.querySelector(".menu-button");
menuBtn.addEventListener("click", function () {
    document.querySelector(".menu").classList.toggle("active");
});
