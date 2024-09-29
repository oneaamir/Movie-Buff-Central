document.addEventListener('DOMContentLoaded', () => {
    const apiKey = "5cabf66c12b5bb1b1eb69878a78f8d49";
    const apiBaseUrl = "https://api.themoviedb.org/3";
    let movieName = ''; 
    const factButton = document.getElementById('Fact');
    const factDisplay = document.getElementById('fact-display');
    const trailerPlayer = document.getElementById('trailer');
    const playButton = document.getElementById('play');
    const cutButton = document.getElementById('cut');

    // Function to fetch and display a random movie fact or quote
    const getMovieFact = async (movieName) => {
        try {
            const response = await fetch(`${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`);
            const data = await response.json();
            const movieId = data.results[0]?.id;

            if (movieId) {
                const response = await fetch(`${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`);
                const movieData = await response.json();

                const fact = movieData.tagline || "No facts available for this movie.";
                factDisplay.textContent = `Fun Fact: ${fact}`;
                factDisplay.style.display = 'block'; 
            } else {
                factDisplay.textContent = 'Movie not found!';
            }
        } catch (error) {
            console.error('Error fetching the movie fact:', error);
            factDisplay.textContent = 'Error fetching fact!';
        }
    };

    factButton.addEventListener('mouseenter', (event) => {
        event.preventDefault();
        if (movieName) {
            getMovieFact(movieName);
        } else {
            factDisplay.textContent = 'Please select a movie first!';
            factDisplay.style.display = 'block';
        }
    });

    factButton.addEventListener('mouseleave', () => {
        factDisplay.style.display = 'none';
    });

    // When a card is clicked, set the movie name
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault();
            movieName = card.querySelector('h4').textContent;
            console.log(`Selected Movie: ${movieName}`);
        });
    });

    // Play button event listener to trigger trailer fetching
    playButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (movieName) {
            TrailerFetch(movieName);
        } else {
            alert('Please select a movie first!');
        }
    });

    // Cut button event listener to stop the trailer
    cutButton.addEventListener('click', (event) => {
        event.preventDefault();
        trailerPlayer.src = '';
        trailerPlayer.style.display = 'none';
    });

    // Function to fetch and play the trailer
    const TrailerFetch = async (movieName) => {
        try {
            const response1 = await fetch(`${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`);
            const data1 = await response1.json();
            const movieId = data1.results[0]?.id;

            if (movieId) {
                const response = await fetch(`${apiBaseUrl}/movie/${movieId}/videos?api_key=${apiKey}`);
                const data = await response.json();
                const trailer = data.results.find(video => video.type === 'Trailer');

                if (trailer) {
                    const trailerUrl = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
                    trailerPlayer.src = trailerUrl;
                    trailerPlayer.style.display = 'block'; 
                } else {
                    alert('Trailer not found!');
                }
            } else {
                alert('Movie not found!');
            }
        } catch (error) {
            console.error('Error fetching the trailer:', error);
        }
    };
});
