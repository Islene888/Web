// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Get references to elements
    const clickBtn = document.getElementById('clickBtn');
    const demoText = document.getElementById('demo');
    const contactForm = document.getElementById('contactForm');

    // Array of different messages to cycle through
    const messages = [
        "Hello! You clicked the button!",
        "Welcome to JavaScript programming!",
        "This is interactive web development!",
        "HTML, CSS, and JavaScript working together!",
        "Great job exploring this webpage!"
    ];

    let messageIndex = 0;

    // Button click event
    clickBtn.addEventListener('click', function() {
        // Change the text content
        demoText.textContent = messages[messageIndex];

        // Add CSS class for animation
        demoText.classList.add('changed');

        // Remove the class after animation
        setTimeout(() => {
            demoText.classList.remove('changed');
        }, 500);

        // Cycle through messages
        messageIndex = (messageIndex + 1) % messages.length;

        // Change button text after first click
        if (clickBtn.textContent === 'Click Me!') {
            clickBtn.textContent = 'Click Again!';
        }
    });

    // Form submission event
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual form submission

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (name && email && message) {
            alert(`Thank you, ${name}! Your message has been received.`);

            // Reset form
            contactForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add some dynamic content
    const aboutSection = document.getElementById('about');
    const currentTime = new Date().toLocaleTimeString();

    // Create a new paragraph element
    const timeInfo = document.createElement('p');
    timeInfo.innerHTML = `<strong>Page loaded at:</strong> ${currentTime}`;
    timeInfo.style.fontStyle = 'italic';
    timeInfo.style.color = '#666';
    timeInfo.style.marginTop = '1rem';

    // Add it to the about section
    aboutSection.appendChild(timeInfo);

    // Console message for developers
    console.log('Welcome to my first web page! JavaScript is working correctly.');
    console.log('This page demonstrates HTML structure, CSS styling, and JavaScript interactivity.');
});