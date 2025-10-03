# Vallejo Public Library Website - Assignment 2 Documentation

## Website Sitemap

```
Vallejo Public Library Website
│
├── Homepage (index.html)
│   ├── Library address and hours
│   ├── Library card application form
│   ├── Contact email
│   └── Latest news section
│
├── Book Catalog (catalog.html)
│   ├── Search functionality
│   ├── Book list with availability
│   └── Links to book details
│
└── Book Detail Page (book_detail.html)
    ├── Complete book information
    ├── Availability status
    └── Book reservation form
```

## Book Reservation Process Flowchart

```
START
│
▼
User visits book detail page
│
▼
Is book available? ─── NO ──→ Show "Currently unavailable"
│                              │
│                              ▼
YES                           END
│
▼
User clicks "Reserve Book"
│
▼
Is user logged in? ─── NO ──→ Show login form
│                              │
│                              ▼
YES                           User enters library card & PIN
│                              │
▼                              ▼
Check user account status ←─── Validate credentials
│
▼
Is account in good standing? ─── NO ──→ Show account issues
│                                        │
│                                        ▼
YES                                     END
│
▼
Process reservation
│
▼
Update book status to "Reserved"
│
▼
Send confirmation to user
│
▼
User picks up book at library
│
▼
END
```

## Website Features

### Semantic HTML Elements Used:
- `<header>` - Page headers with navigation
- `<nav>` - Navigation menus
- `<main>` - Main content areas
- `<section>` - Content sections
- `<article>` - Book details
- `<form>` - User input forms
- `<table>` - Book catalog data
- `<footer>` - Page footers

### Required Information Included:
- Library address and opening hours
- Library card application form
- Email address for inquiries
- Latest news section
- Complete book catalog
- Book details with copy counts
- Book reservation system