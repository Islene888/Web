# Movie Collection CRUD Application - Homework 9

This application demonstrates a **complete CRUD (Create, Read, Update, Delete)** movie collection system using REST API integration.

## 🎯 Assignment Completion

This assignment extends Homework 8 with the following new features:

### ✅ Edit Functionality
- **Edit buttons** on homepage for each movie
- **Edit page** (`edit.html`) with pre-filled forms
- Form data populated from API using movie ID
- Updates existing movie data via PUT request
- Form validation identical to create page

### ✅ Delete Functionality
- **Delete buttons** on homepage for each movie
- **Confirmation dialog** before deletion ("Are you sure?")
- Sends DELETE request to API
- Homepage automatically refreshes after deletion
- Proper error handling and user feedback

### ✅ Technical Requirements Met
- **Semantic HTML** structure throughout
- **Acceptable CSS** styling for user-friendly interface
- **fetch() API** used for all HTTP requests
- **No static data** - all content fetched from API
- **Working as-is** - files can be downloaded and opened locally

## 🚀 Features

### Complete CRUD Operations
1. **Create** - Add new movies via `create.html`
2. **Read** - View all movies on `index.html` and details on `detail.html`
3. **Update** - Edit movies via `edit.html` (**NEW**)
4. **Delete** - Remove movies with confirmation (**NEW**)

### User Interface
- Clean, responsive design
- Form validation with error messages
- Loading states and error handling
- Confirmation dialogs for destructive actions
- Character count for description field

## 📁 File Structure

```
homework9/
├── index.html          # Homepage with movie grid (+ Edit/Delete buttons)
├── create.html         # Add new movie form
├── edit.html           # Edit existing movie form (NEW)
├── detail.html         # Individual movie details
├── app.js             # API functions (CRUD operations)
├── styles.css         # Complete styling (+ button styles)
├── seed.html          # Utility to populate API with test data
├── seed-data.js       # Sample movie data
└── README.md          # This documentation
```

## 🔧 API Configuration

**Backend**: Beeceptor Mock API
- **Base URL**: `https://ella-movie-collection.beeceptor.com`
- **Endpoint**: `/api/movies`

### API Operations
```javascript
GET    /api/movies     // Fetch all movies
GET    /api/movies/:id // Fetch single movie
POST   /api/movies     // Create new movie
PUT    /api/movies/:id // Update movie (NEW)
DELETE /api/movies/:id // Delete movie (NEW)
```

## 📱 How to Use

### For Testing/Grading
1. Download all files to local directory
2. Open `index.html` in any modern browser
3. **Test Edit**: Click "Edit" button on any movie → modify data → submit
4. **Test Delete**: Click "Delete" button → confirm in dialog → movie removed
5. All operations work with the live API endpoint

### Movie Management
- **Browse**: Homepage shows all movies in responsive grid
- **View Details**: Click "View Details" on any movie
- **Add New**: Click "Add New Movie" button
- **Edit Existing**: Click "Edit" button on any movie card
- **Delete**: Click "Delete" button → confirm → movie removed

## 🎨 New UI Elements

### Edit Buttons
- Orange-colored edit buttons on each movie card
- Links to `edit.html?id=MOVIE_ID`
- Form automatically populates with existing data

### Delete Buttons
- Red-colored delete buttons on each movie card
- JavaScript confirmation dialog with movie title
- Automatic refresh after successful deletion

### Action Button Layout
```html
<div class="movie-actions">
    <a href="detail.html?id=1" class="btn btn-view">View Details</a>
    <a href="edit.html?id=1" class="btn btn-edit">Edit</a>
    <button onclick="confirmDelete('1', 'Movie Title')" class="btn btn-delete">Delete</button>
</div>
```

## ✨ Implementation Highlights

### Edit Form (`edit.html`)
- Fetches existing movie data on page load
- Pre-fills all form fields with current values
- Same validation as create form
- Updates character count for description
- Shows loading states during data fetch

### Delete Confirmation
```javascript
function confirmDelete(movieId, movieTitle) {
    if (confirm(`Are you sure you want to delete "${movieTitle}"?\n\nThis action cannot be undone.`)) {
        // Proceed with deletion
    }
}
```

### Error Handling
- Network request failures show user-friendly messages
- Form validation prevents invalid data submission
- Loading states during API calls
- Success confirmations after operations

## 🌐 Browser Compatibility

- **Modern browsers** with fetch API support
- **Responsive design** for mobile and desktop
- **No external dependencies** required
- **Local file support** - works without web server

## 📝 Academic Context

**Course**: Web Development
**Assignment**: Homework 9 - Complete CRUD Application
**Objective**: Extend Homework 8 with Edit and Delete functionality

This project demonstrates:
- Complete REST API integration
- Form handling and validation
- User experience best practices
- Semantic HTML and CSS
- Modern JavaScript (ES6+)
- Responsive web design principles