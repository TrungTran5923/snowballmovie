// list people
let listPeople = document.querySelector(".list-movie");
let page = 1;
async function showListPeople() {
    let listPeople = document.querySelector(".list-movie");
    const url = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=${page}`;
    const data = await getData(url);
    console.log(data);
    data.results.forEach((element) => {
        listPeople.innerHTML += `<div class="movie-card" onclick="showDetailPeople(${element.id})">
        <div class="movie-poster">
            <img src="https://image.tmdb.org/t/p/w500/${element.profile_path}" alt="" />
        </div>
        <div class="movie-info">
            <div class="movie-title">
                <h3>${element.name}</h3>
            </div>
            <div class="movie-subtitle">
                <i class="fa-solid fa-star"></i>
                <p>Popularities:</p>
                <p>${element.popularity}</p>
            </div>
        </div>
    </div>`;
    });
}
showListPeople();

document.querySelector(".body button").addEventListener("click", async function () {
    page++;
    const url = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=${page}`;
    const data = await getData(url);
    console.log(data);
    data.results.forEach((element) => {
        listPeople.innerHTML += `<div class="movie-card" onclick="showDetailPeople(${element.id})">
        <div class="movie-poster">
            <img src="https://image.tmdb.org/t/p/w500/${element.profile_path}" alt="" />
        </div>
        <div class="movie-info">
            <div class="movie-title">
                <h3>${element.name}</h3>
            </div>
            <div class="movie-subtitle">
                <i class="fa-solid fa-star"></i>
                <p>Popularities:</p>
                <p>${element.popularity}</p>
            </div>
        </div>
    </div>`;
    });
});
