const url = new URL(window.location.href);
const idPeople = url.searchParams.get("people");
async function showPeopleInfo() {
    let infoPeople = document.querySelector(".people-info-title");
    let infoPersonal = document.querySelector(".people-image");
    let moviePeople = document.querySelector(".list-movie");
    const url = ` https://api.themoviedb.org/3/person/${idPeople}?api_key=${API_KEY}`;
    const urlMovie = `https://api.themoviedb.org/3/person/${idPeople}/movie_credits?api_key=${API_KEY}`;
    const data = await getData(url);

    const dataMovie = await getData(urlMovie);
    console.log(dataMovie);
    infoPersonal.innerHTML = ` 
    <img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data.profile_path}" alt="" />
    <div class="personal-info">
    <h2>Personal Info</h2>
    <div class="personal-content">
        <h5>Known for:</h5>
        <p>${data.known_for_department}</p>
    </div>
    <div class="personal-content">
        <h5>Popularity:</h5>
        <p>${data.popularity}</p>
    </div>
    <div class="personal-content">
        <h5>Birthday:</h5>
        <p>${data.birthday}</p>
    </div>
    <div class="personal-content">
        <h5>Place of Birth:</h5>
        <p>${data.place_of_birth}</p>
    </div>
    <div class="personal-content">
        <h5>Also known as:</h5>
        <p>${data.also_known_as}</p>
    </div></div>`;
    infoPeople.innerHTML = ` <div class="name">
    <h3>${data.name}</h3>
</div>
<div class="bio">
    <h4>Biography:</h4>
    <p>${data.biography}</p>
</div> `;
    dataMovie.cast.forEach((element) => {
        moviePeople.innerHTML += `<div class="movie-card" >
        <div class="movie-poster">
        <a href="movie_detail.html?idmovie=${element.id}&type=movie"><img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2/${element.poster_path}" alt="" /></a>
        </div>
        <div class="movie-info">
            <div class="movie-title">
                <h3>${element.original_title}</h3>
            </div>
            <div class="movie-subtitle">
                <p class="date">${element.release_date}</p>
                <div class="rating">
                    <i class="fa-solid fa-star"></i>
                    <p>${element.vote_average}</p>
                </div>
            </div>
        </div>
    </div>`;
    });
}
showPeopleInfo();
