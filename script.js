document.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        const cardss = document.querySelector('.cards');
        cardss.style.opacity = '.7'; 
    }, 2000);

    setTimeout(() => {
        const home = document.querySelector('.homepage');
        home.style.opacity = '0'; 
    }, 2000);

    const apiKey = "5cabf66c12b5bb1b1eb69878a78f8d49";
    const apiBaseUrl = "https://api.themoviedb.org/3";

    // Function to fetch movie details based on the movie name
    async function fetchMovieDetails(movieName, backgroundImage) {
        const searchUrl = `${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`;

        try {
            const response = await fetch(searchUrl);
            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                throw new Error("No movie found with that name.");
            }

            const movieDetails = data.results[0];
            updateContent(movieDetails);
            updateHeaderBackground(backgroundImage); 

        } catch (error) {
            console.error("Error fetching movie details:", error.message);
        }
    }

    // Function to update the content area with movie details
    function updateContent(movieDetails) {
        const titleElement = document.getElementById('title');
        const descriptionElement = document.querySelector('.content p'); 
        const genreElement = document.getElementById('gen');
        const yearElement = document.querySelector('.detail h4'); 
        const ratingElement = document.getElementById('rate');

        titleElement.textContent = movieDetails.title; 
        descriptionElement.textContent = movieDetails.overview; 
        genreElement.textContent = movieDetails.genre_ids.join(', '); 
        yearElement.textContent = new Date(movieDetails.release_date).getFullYear(); 
        ratingElement.innerHTML = `<span>IMDB</span><i class="bi bi-star">${movieDetails.vote_average}</i>`; 
    }

    // Function to update header background
    function updateHeaderBackground(imageUrl) {
        const header = document.querySelector('header'); 
        header.style.backgroundImage = `url('${imageUrl}')`;
        header.style.backgroundSize = 'cover'; 
        header.style.backgroundPosition = 'center'; 
    }

    // Add click event listeners to the movie cards
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault(); 
            const movieName = card.querySelector('h4').textContent; 
           
            const detailSection = document.querySelector('.detail');
            detailSection.style.display = 'flex'; 
             
            const home = document.querySelector('.homepage');
            home.style.display = 'none';

            const backgroundImage = card.querySelector('.poster').src; 
            fetchMovieDetails(movieName, backgroundImage); 
        });
    });
});
