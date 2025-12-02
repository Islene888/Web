/**
 * Seed Data Script for Movie Collection
 * Run this script to populate the MockAPI with initial movie data
 *
 * Usage:
 * 1. Open this file in a browser console, OR
 * 2. Run with Node.js: node seed-data.js (requires node-fetch)
 *
 * IMPORTANT: Before running, make sure to:
 * 1. Create your MockAPI project at https://mockapi.io/
 * 2. Update the API_ENDPOINT in this file and app.js
 */

// MockAPI endpoint - Update this to match your API
const API_ENDPOINT = 'https://692e4cce91e00bafccd36e10.mockapi.io/api/v1/movie';

// Initial movie data - 12 movies with 6 properties each
const initialMovies = [
    {
        title: "The Shawshank Redemption",
        director: "Frank Darabont",
        year: "1994",
        genre: "Drama",
        duration: "142",
        rating: "9.3",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    },
    {
        title: "The Dark Knight",
        director: "Christopher Nolan",
        year: "2008",
        genre: "Action",
        duration: "152",
        rating: "9.0",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice."
    },
    {
        title: "Inception",
        director: "Christopher Nolan",
        year: "2010",
        genre: "Sci-Fi",
        duration: "148",
        rating: "8.8",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O."
    },
    {
        title: "Pulp Fiction",
        director: "Quentin Tarantino",
        year: "1994",
        genre: "Crime",
        duration: "154",
        rating: "8.9",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption."
    },
    {
        title: "The Matrix",
        director: "Lana Wachowski",
        year: "1999",
        genre: "Sci-Fi",
        duration: "136",
        rating: "8.7",
        description: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free."
    },
    {
        title: "Forrest Gump",
        director: "Robert Zemeckis",
        year: "1994",
        genre: "Drama",
        duration: "142",
        rating: "8.8",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man with a low IQ."
    },
    {
        title: "Spirited Away",
        director: "Hayao Miyazaki",
        year: "2001",
        genre: "Animation",
        duration: "125",
        rating: "8.6",
        description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits where humans are changed into beasts."
    },
    {
        title: "Parasite",
        director: "Bong Joon-ho",
        year: "2019",
        genre: "Thriller",
        duration: "132",
        rating: "8.5",
        description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan."
    },
    {
        title: "The Godfather",
        director: "Francis Ford Coppola",
        year: "1972",
        genre: "Crime",
        duration: "175",
        rating: "9.2",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son."
    },
    {
        title: "Interstellar",
        director: "Christopher Nolan",
        year: "2014",
        genre: "Sci-Fi",
        duration: "169",
        rating: "8.6",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival as Earth becomes uninhabitable."
    },
    {
        title: "The Grand Budapest Hotel",
        director: "Wes Anderson",
        year: "2014",
        genre: "Comedy",
        duration: "99",
        rating: "8.1",
        description: "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years."
    },
    {
        title: "Get Out",
        director: "Jordan Peele",
        year: "2017",
        genre: "Horror",
        duration: "104",
        rating: "7.7",
        description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point."
    }
];

// Function to seed the database
async function seedDatabase() {
    console.log('Starting to seed database...');
    console.log(`API Endpoint: ${API_ENDPOINT}`);

    let successCount = 0;
    let errorCount = 0;

    for (const movie of initialMovies) {
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(movie)
            });

            if (response.ok) {
                const result = await response.json();
                console.log(`✓ Added: ${movie.title} (ID: ${result.id || 'auto-generated'})`);
                successCount++;
            } else {
                console.error(`✗ Failed to add: ${movie.title} - Status: ${response.status}`);
                errorCount++;
            }
        } catch (error) {
            console.error(`✗ Error adding ${movie.title}:`, error.message);
            errorCount++;
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log('\n--- Seeding Complete ---');
    console.log(`Success: ${successCount} movies`);
    console.log(`Errors: ${errorCount} movies`);
    console.log('\nYou can now open index.html to view your movie collection!');
}

// Run the seed function
// For browser: Just paste this entire file in the console
// For Node.js: Uncomment the line below and run with node-fetch installed
seedDatabase();
