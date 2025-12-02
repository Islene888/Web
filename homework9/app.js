/**
 * Movie Collection App - API Functions
 * Uses MockAPI.io for data persistence
 *
 * IMPORTANT: You need to create your own MockAPI project
 * 1. Go to https://mockapi.io/ and sign up (free)
 * 2. Create a new project
 * 3. Create a resource called "movies"
 * 4. Copy your endpoint URL and paste it below
 */

// MockAPI endpoint
const API_ENDPOINT = 'https://692e4cce91e00bafccd36e10.mockapi.io/api/v1/movie';

/**
 * Fetch all movies from the API
 * @returns {Promise<Array>} Array of movie objects
 */
async function fetchMovies() {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
}

/**
 * Fetch a single movie by ID
 * @param {string|number} id - The movie ID
 * @returns {Promise<Object>} Movie object
 */
async function fetchMovieById(id) {
    try {
        const response = await fetch(`${API_ENDPOINT}/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching movie ${id}:`, error);
        throw error;
    }
}

/**
 * Create a new movie
 * @param {Object} movieData - The movie data to create
 * @returns {Promise<Object>} Created movie object
 */
async function createMovie(movieData) {
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(movieData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating movie:', error);
        throw error;
    }
}

/**
 * Update an existing movie
 * @param {string|number} id - The movie ID
 * @param {Object} movieData - The updated movie data
 * @returns {Promise<Object>} Updated movie object
 */
async function updateMovie(id, movieData) {
    try {
        const response = await fetch(`${API_ENDPOINT}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(movieData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error updating movie ${id}:`, error);
        throw error;
    }
}

/**
 * Delete a movie
 * @param {string|number} id - The movie ID
 * @returns {Promise<void>}
 */
async function deleteMovie(id) {
    try {
        const response = await fetch(`${API_ENDPOINT}/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error deleting movie ${id}:`, error);
        throw error;
    }
}