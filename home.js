async function showMovieHome(url) {
    const boxNowplaying = document.querySelector("#nowplay");
    const dataNowplay = await getData(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=1`);
    console.log(dataNowplay);
    renderData(dataNowplay, boxNowplaying);
    const boxUpcoming = document.querySelector("#upcoming");
    const dataUpcoming = await getData(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1 `);
    renderData(dataUpcoming, boxUpcoming);
    const boxToprate = document.querySelector("#toprate");
    const dataToprate = await getData(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1`);
    renderData(dataToprate, boxToprate);
    const boxTvseries = document.querySelector("#tvpopular");
    const dataTvseries = await getData(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=1`);
    renderData(dataTvseries, boxTvseries);
}
showMovieHome();

// const watchBtn = document.querySelector(".banner-content button");
// watchBtn.addEventListener("click", function () {
//     window.location.href = "movie.html";
// });
