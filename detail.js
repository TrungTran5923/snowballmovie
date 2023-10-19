const url = new URL(window.location.href);
const movieID = url.searchParams.get("idmovie");
const type = url.searchParams.get("type");
const movieBox = document.querySelector(".movie-box");
if (type == "tv") {
    document.querySelector(".review").style.display = "none";
}

async function showDetailMovie() {
    let url = `https://api.themoviedb.org/3/${type}/${movieID}?api_key=${API_KEY}`;
    const data = await getData(url);
    console.log(data);
    let keys = Object.keys(data.genres);
    let genre = "";
    for (let key in data.genres) {
        genre += data.genres[key].name + ",";
    }

    movieBox.innerHTML = ` <div class="movie-background">
        <img src="https://image.tmdb.org/t/p/w300${data.backdrop_path}" alt="" />
    </div>
    <div class="movie-detail">
        <div class="movie-poster">
            <img src="https://image.tmdb.org/t/p/w300${data.poster_path}" alt="" />
        </div>
        <div class="detail">
            <div class="title"><h3>${type == "movie" ? data.original_title : data.original_name}</h3></div>
            <div class="detail-content">
                <div class="date"><p>${type == "movie" ? data.release_date : data.first_air_date}</p></div>
                <div class="type"><p>${genre.substr(0, genre.length - 1)}</p></div>
                <div class="duration">
                    <i class="fa-regular fa-clock"></i>
                    <p>${type == "movie" ? data.runtime : data.number_of_episodes}</p>
                </div>
            </div>
            <div class="detail-content">
                <div class="rating">
                    <div class="score"><p>${data.vote_average}%</p></div>
                    <p>User score</p>
                </div>
                <div class="trailer" style="display:${type == "movie" ? "block" : "none"}">
                    <button onclick="showTrailer(${data.id})">
                        <i class="fa-solid fa-play"></i>
                        <p>Play Trailer</p>
                    </button>
                </div>
            </div>
            <div class="detail-content tagline" style="display:${type == "movie" ? "block" : "none"}">
                <p>${data.tagline}</p>
            </div>
            <div class="overview" style="display:${type == "movie" ? "block" : "none"}">
                <p>Overview</p>
                <p>
                    ${data.overview}
                </p>
            </div>
        </div>
    </div>`;
}
showDetailMovie();
// show popup
const popup = document.querySelector(".popup");
async function showTrailer(id) {
    popup.classList.add("active");
    const url = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}`;
    const data = await getData(url);
    data.results.forEach((element) => {
        if (element.type == "Trailer") {
            popup.innerHTML = ` <div class="popup-card">
            <div class="card-title">
                <p>Trailer</p>
                <i class="fa-solid fa-xmark close" onclick="closeTrailer()" ></i>
            </div>
            <div class="card-video">
                <iframe src="https://www.youtube.com/embed/${element.key}"> </iframe>
            </div>
        </div>`;
        }
    });
}
function closeTrailer(paams) {
    popup.classList.remove("active");
    document.querySelector(".card-video").innerHTML = "";
}
popup.addEventListener("click", function (e) {
    if (e.currentTarget == e.target) {
        popup.classList.remove("active");
        document.querySelector(".card-video").innerHTML = "";
    }
});
//show cast
async function showListCast() {
    const listCast = document.querySelector(".list-actor");
    const url = `https://api.themoviedb.org/3/${type}/${movieID}/credits?api_key=${API_KEY}`;
    const data = await getData(url);
    // console.log(data);
    data.cast.forEach((element) => {
        listCast.innerHTML += `<div class="actor-card" onclick="showDetailPeople(${element.id})" >
        <div class="actor-poster">
            <img src="https://image.tmdb.org/t/p/w200/${element.profile_path}" alt="" />
        </div>
        <div class="actor-info">
            <div class="actor-name">
                <h3>${element.name}</h3>
            </div>
            <div class="actor-role">
                <p>${element.character}</p>
            </div>
        </div>
    </div>`;
    });
}
showListCast();

//show review
async function showReview() {
    let listReview = document.querySelector(".list-review");
    const url = `https://api.themoviedb.org/3/${type}/${movieID}/reviews?api_key=${API_KEY}`;

    const data = await getData(url);
    console.log(data);
    data.results.forEach((element) => {
        listReview.innerHTML += `<div class="review-card">
        <div class="avatar">
            <img src="${element.author_details.avatar_path}" alt="" />
        </div>
        <div class="review-content">
            <div class="title">
                <i class="fa-solid fa-user"></i>
                <p>${element.author}</p>
            </div>
            <div class="subtitle">
                <p>Written by <span>${element.author}</span> on <span>${element.created_at}</span></p>
            </div>
            <p class="text-feed">
            ${element.content}
            </p>
            <p onclick="showMore(event)" class="showmore">Show More</p>
        </div>
    </div>`;
    });
    if (data.results.length == 0) {
        document.querySelector(".review").style.display = "none";
    }
}
showReview();

function showMore(event) {
    let parent = event.target.parentElement;
    parent.querySelector(".text-feed").classList.toggle("active");
    event.target.innerHTML = event.target.innerHTML == "Show More" ? "Hide" : "Show More";
}
