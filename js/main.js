$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText){
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=025e3cdf8216ddfbab451196d0b3b290&query='+searchText)
    .then((response) => {
        console.log(response);
        let movies = response.data.results;
        let output = '';
        $.each(movies, (index, movie) => {
            output += `
                <div class="col-md-3">
                    <div class ="well text-center">
                    <img src="${'https://image.tmdb.org/t/p/w500/'+movie.poster_path}">
                        <h5>${movie.original_title}</h5>
                        <a onClick="movieSelected('${movie.vote_average}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>
            `;
        });

        $('#movies').html(output);
    })
    .catch((err) => {
        console.log();
    });
}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=025e3cdf8216ddfbab451196d0b3b290')
    .then((response) => {
        console.log(response);
        let movie = response.data;

        let output =`
            <div class="row">
                <div class="col-md-4>
                    <img src="${'https://image.tmdb.org/t/p/w500/'+movie.poster_path}" class=thumbnail>
                </div>
                <div class="col-md-8>
                    <h2>${movie.original_title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item><strong>Genre:</strong>${movie.genres}<li/>
                        <li class="list-group-item><strong>Released:</strong>${movie.release_date}<li/>
                        <li class="list-group-item><strong>Rated:</strong>${movie.vote_average}<li/>
                        <li class="list-group-item><strong>Imdb Rating:</strong>${movie.imdb_id}<li/>
                        <li class="list-group-item><strong>Director:</strong>${movie.Director}<li/>
                        <li class="list-group-item><strong>Writer:</strong>${movie.Writer}<li/>
                        <li class="list-group-item><strong>Actors:</strong>${movie.Actors}<li/>

                    </ul>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
                    <a href="index.html" class="btn btn-default>Go Back To Search</a>
                </div>
            </div>
        `;
        $('#movie').html(output);
    })
    .catch((err) => {
        console.log();
    });
}