const url = new URL(window.location.href);
const type = url.searchParams.get("type");
const genreId = url.searchParams.get("id");
const genre = url.searchParams.get("name");
const btnShowmore = document.querySelector(".body button");
const listMovie = document.querySelector(".list-movie");
console.log(type);

async function showListMovie() {
    let dataList = "";
    if (!genreId) {
        dataList = await getData(`https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&page=1`);
    } else {
        dataList = await getData(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
        document.querySelector("#genre").innerHTML = genre;
    }
    renderData(dataList, listMovie);
    console.log(listMovie);
    console.log(dataList);
}
showListMovie();
let page = 1;
btnShowmore.addEventListener("click", async function () {
    page++;
    const data = await getData(`https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&page=${page}`);
    renderData(data, listMovie);
});
if (type == "tv") {
    document.querySelector(".banner-content h2").innerHTML = "TV SHOWS";
} else {
    document.querySelector(".banner-content h2").innerHTML = "MOVIE";
}
