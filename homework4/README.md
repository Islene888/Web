# Homework 4: Responsive Vallejo Public Library Website

## Project Overview
This is a responsive website implementation for the Vallejo Public Library, built upon the HTML structure from Assignment 2 and the design specifications from Assignment 3. The website is fully responsive and supports mobile, tablet, and desktop devices.

## File Structure
```
homework4/
├── README.md                    # Project documentation
└── responsive_website/          # Responsive website files
    ├── index.html              # Homepage (required file)
    ├── catalog.html            # Book catalog page
    ├── book_detail.html        # Book details page
    └── styles.css              # Unified responsive CSS file
```

## Features

### HTML Page Functionality
1. **index.html (Homepage)**
   - Library address and opening hours
   - Library card application form
   - Contact information
   - Latest news section
   - Library services list

2. **catalog.html (Book Catalog)**
   - Book search functionality
   - Category and availability filtering
   - Complete book listing
   - Book availability status

3. **book_detail.html (Book Details)**
   - Complete book information
   - Stock quantity and availability
   - Book reservation form

### Responsive Design Features

#### Mobile Devices (< 768px)
- Single column layout
- Vertical navigation menu
- Touch-optimized button sizes
- 16px font size to prevent iOS zoom
- Optimized table display

#### Tablet Devices (768px - 1023px)
- Two-column grid layout
- Horizontal navigation menu
- Moderate font sizes
- Balanced spacing

#### Desktop Devices (≥ 1024px)
- Three-column grid layout
- Enhanced hover effects
- Large fonts and spacious layout
- Professional design aesthetic

#### Large Screen Devices (≥ 1440px)
- Maximum container width of 1400px
- Larger fonts and spacing
- Optimized large screen experience

## Design Implementation

### Color Scheme (Based on Assignment 3 Design Document)
- **Primary Blue**: #2E5A87 (Headers, navigation, primary buttons)
- **Secondary Green**: #4A7C59 (Links, success states, secondary elements)
- **Accent Gold**: #D4A574 (Accent buttons, highlights, call-to-action)
- **Neutral Gray**: #F5F5F5 (Backgrounds, card containers, dividers)
- **Dark Text**: #333333 (All body text)

### Typography Design (Google Fonts)
- **Primary Font**: Open Sans (Body text, forms, buttons)
- **Heading Font**: Merriweather (Headings, emphasis text)
- **Font Hierarchy**:
  - H1: 2.5rem (2rem on mobile)
  - H2: 2rem (1.5rem on mobile)
  - H3: 1.5rem (1.25rem on mobile)
  - Body: 1rem

### Accessibility Features
- WCAG AA contrast standards (≥4.5:1)
- Semantic HTML structure
- Keyboard navigation support
- High contrast mode support
- Reduced motion mode support
- Readable for ages 6-90

## Technical Implementation

### CSS Features
- CSS Custom Properties (CSS Variables)
- Flexbox and Grid layouts
- Mobile-first responsive design
- Smooth transitions and hover effects
- Print style optimization

### Browser Compatibility
- Full support for modern browsers
- Progressive enhancement design
- Graceful degradation handling

## Testing Documentation

### Device Testing
✅ iPhone (375px)
✅ Android phones (360px)
✅ iPad (768px)
✅ Small laptops (1024px)
✅ Desktop monitors (1440px)
✅ Large displays (1920px+)

### Functionality Testing
✅ All navigation links work properly
✅ Form elements respond correctly
✅ Images and content don't distort
✅ Text is readable on all devices
✅ Touch targets are adequate (44px+)

## Usage Instructions

1. **Local Preview**:
   ```bash
   cd homework4/responsive_website
   # Open index.html in your browser
   ```

2. **Testing Responsiveness**:
   - Use browser developer tools to switch devices
   - Or resize the browser window
   - Test all three pages

3. **Verify Navigation**:
   - Click all navigation links
   - Ensure proper page transitions
   - Test form submissions (though they won't actually process)

## Assignment Requirements Compliance

### ✅ HTML Requirements
- [x] Three HTML files (index.html, catalog.html, book_detail.html)
- [x] Based on Assignment 2 HTML structure
- [x] Semantic HTML tags
- [x] All required content and functionality

### ✅ CSS Requirements
- [x] Single CSS file controlling all pages
- [x] Based on Assignment 3 design specifications
- [x] At least three responsive breakpoints
- [x] Professional quality visual design

### ✅ Responsive Requirements
- [x] Mobile device optimization (<768px)
- [x] Tablet device optimization (768px-1024px)
- [x] Desktop device optimization (>1024px)
- [x] Content readable and functional at all sizes

### ✅ Technical Requirements
- [x] No spelling errors
- [x] All links work properly
- [x] No broken navigation
- [x] Images and content don't distort
- [x] Uses open source resources and fonts

## Copyright Notice
- **Fonts**: Google Fonts (Open Sans, Merriweather) - Open source license
- **Content**: Original writing, appropriate for library website needs
- **Code**: Original implementation, following best practices

---

**Assignment Status**: ✅ Complete
**Last Updated**: October 10, 2024
**Author**: Ella