# Homework 8 - Movie Collection CRUD App

A simple web application that manages a movie collection using a REST API (Beeceptor).

## Features

- **Homepage (index.html)**: Displays all movies in a responsive grid layout
- **Detail Page (detail.html)**: Shows complete information for a selected movie
- **Create Page (create.html)**: Form to add new movies with validation

## Setup Instructions

### Step 1: Create Your Beeceptor Endpoint

1. Go to [https://beeceptor.com/](https://beeceptor.com/)
2. Click "Create Endpoint" or enter a unique name
3. Your endpoint will be: `https://your-name.beeceptor.com`

### Step 2: Update the API URL

1. Open `app.js`
2. Change the `API_BASE_URL` to your Beeceptor endpoint:
   ```javascript
   const API_BASE_URL = 'https://your-name.beeceptor.com';
   ```
3. Also update the same URL in `seed-data.js`

### Step 3: Seed Initial Data

You need to add initial movies to your API. Choose one method:

**Option A: Using Browser Console**
1. Open any of the HTML files in your browser
2. Open Developer Tools (F12) → Console
3. Copy and paste the entire contents of `seed-data.js`
4. Press Enter to run

**Option B: Using the Seed Page**
1. Open `seed.html` in your browser
2. Click "Seed Database"
3. Wait for all 12 movies to be added

### Step 4: Run the Application

1. Open `index.html` in your browser
2. You should see all the movies loaded from the API
3. Click on any movie to view details
4. Click "Add New Movie" to create a new movie

## File Structure

```
homework8/
├── index.html       # Homepage - lists all movies
├── detail.html      # Movie detail page
├── create.html      # Form to create new movies
├── styles.css       # Shared styles for all pages
├── app.js           # API functions (fetch, create, etc.)
├── seed-data.js     # Script to populate initial data
├── seed.html        # Helper page to seed data
└── README.md        # This file
```

## Movie Properties (6+ elements)

Each movie has the following properties:
1. **title** - Movie title
2. **director** - Director name
3. **year** - Release year
4. **genre** - Movie genre
5. **duration** - Runtime in minutes
6. **rating** - Rating out of 10
7. **description** - Brief plot description

## API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/movies` | Get all movies |
| GET | `/api/movies/:id` | Get single movie |
| POST | `/api/movies` | Create new movie |

## Form Validation

The create form validates:
- **Title**: Required, max 100 characters
- **Director**: Required, 2-100 characters
- **Year**: Required, between 1888-2030
- **Duration**: Required, 1-1000 minutes
- **Genre**: Required, select from dropdown
- **Rating**: Required, 1-10
- **Description**: Required, 10-500 characters

## Technologies Used

- HTML5 (semantic elements)
- CSS3 (Flexbox, Grid, responsive design)
- JavaScript (ES6+, Fetch API)
- Beeceptor (Mock REST API)

## Browser Compatibility

Works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Notes

- Beeceptor may have rate limits on free tier
- Data persists on Beeceptor until manually deleted or endpoint expires
- Make sure to create your own Beeceptor endpoint before testing
