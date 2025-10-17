// Pizza Registration Form Validation
class PizzaRegistrationValidator {
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.currentYear = new Date().getFullYear();
        this.isSubmitting = false;

        this.initializeForm();
        this.attachEventListeners();
    }

    initializeForm() {
        // Set dynamic max year for birth year input
        const birthYearInput = document.getElementById('birthYear');
        birthYearInput.setAttribute('max', this.currentYear - 1);

        // Update help text with current year
        const helpText = document.createElement('small');
        helpText.className = 'help-text';
        helpText.textContent = `Must be between 1901 and ${this.currentYear - 1}`;
        birthYearInput.parentNode.insertBefore(helpText, birthYearInput.nextSibling);
    }

    attachEventListeners() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        document.getElementById('name').addEventListener('input', () => this.validateName());
        document.getElementById('name').addEventListener('blur', () => this.validateName());

        document.getElementById('birthYear').addEventListener('input', () => this.validateBirthYear());
        document.getElementById('birthYear').addEventListener('blur', () => this.validateBirthYear());

        document.getElementById('password').addEventListener('input', () => this.validatePassword());
        document.getElementById('password').addEventListener('blur', () => this.validatePassword());

        document.getElementById('zipcode').addEventListener('input', () => this.validateZipcode());
        document.getElementById('zipcode').addEventListener('blur', () => this.validateZipcode());

        // US Residence checkbox logic
        document.getElementById('usResident').addEventListener('change', (e) => {
            this.toggleZipcodeField(e.target.checked);
        });

        // Pizza type validation
        const pizzaRadios = document.querySelectorAll('input[name="pizzaType"]');
        pizzaRadios.forEach(radio => {
            radio.addEventListener('change', () => this.validatePizzaType());
        });
    }

    // Name Validation
    validateName() {
        const nameInput = document.getElementById('name');
        const errorDiv = document.getElementById('name-error');
        const value = nameInput.value.trim();

        // Edge cases to check:
        // 1. Empty or whitespace only
        // 2. Less than 3 characters
        // 3. Only special characters/numbers
        // 4. Very long names (reasonable limit)

        if (!value) {
            this.showError(nameInput, errorDiv, 'Name is required');
            return false;
        }

        if (value.length < 3) {
            this.showError(nameInput, errorDiv, 'Name must be at least 3 characters long');
            return false;
        }

        if (value.length > 100) {
            this.showError(nameInput, errorDiv, 'Name is too long (maximum 100 characters)');
            return false;
        }

        // Check for reasonable name format (allow letters, spaces, hyphens, apostrophes)
        const namePattern = /^[a-zA-Z\s\-'\.]+$/;
        if (!namePattern.test(value)) {
            this.showError(nameInput, errorDiv, 'Name can only contain letters, spaces, hyphens, and apostrophes');
            return false;
        }

        // Check for excessive consecutive spaces or special characters
        if (/\s{3,}/.test(value) || /[-'\.]{2,}/.test(value)) {
            this.showError(nameInput, errorDiv, 'Name format is invalid');
            return false;
        }

        this.showSuccess(nameInput, errorDiv);
        return true;
    }

    // Birth Year Validation
    validateBirthYear() {
        const birthYearInput = document.getElementById('birthYear');
        const errorDiv = document.getElementById('birthYear-error');
        const value = birthYearInput.value.trim();

        // Edge cases to check:
        // 1. Empty value
        // 2. Non-numeric input
        // 3. Decimal numbers
        // 4. Negative numbers
        // 5. Zero
        // 6. Future years
        // 7. Too old (before 1901)
        // 8. Very large numbers
        // 9. Leading zeros

        if (!value) {
            this.showError(birthYearInput, errorDiv, 'Birth year is required');
            return false;
        }

        // Check if it's a valid number
        if (!/^\d+$/.test(value)) {
            this.showError(birthYearInput, errorDiv, 'Birth year must be a valid number');
            return false;
        }

        const year = parseInt(value, 10);

        // Check for reasonable bounds
        if (year <= 0) {
            this.showError(birthYearInput, errorDiv, 'Birth year must be a positive number');
            return false;
        }

        if (year < 1901) {
            this.showError(birthYearInput, errorDiv, 'Birth year must be 1901 or later');
            return false;
        }

        if (year >= this.currentYear) {
            this.showError(birthYearInput, errorDiv, `Birth year must be before ${this.currentYear}`);
            return false;
        }

        // Check for unreasonably large numbers
        if (year > 9999) {
            this.showError(birthYearInput, errorDiv, 'Birth year is not valid');
            return false;
        }

        // Check for leading zeros (e.g., "01990")
        if (value !== year.toString()) {
            this.showError(birthYearInput, errorDiv, 'Birth year format is invalid');
            return false;
        }

        this.showSuccess(birthYearInput, errorDiv);
        return true;
    }

    // Zipcode Validation
    validateZipcode() {
        const zipcodeInput = document.getElementById('zipcode');
        const errorDiv = document.getElementById('zipcode-error');
        const usResident = document.getElementById('usResident').checked;
        const value = zipcodeInput.value.trim();

        // Only validate if US resident checkbox is checked
        if (!usResident) {
            this.clearValidation(zipcodeInput, errorDiv);
            return true;
        }

        // Edge cases to check:
        // 1. Empty value (when required)
        // 2. Non-numeric input
        // 3. Less than 5 digits
        // 4. More than 5 digits
        // 5. Negative numbers
        // 6. Decimal numbers
        // 7. Leading/trailing spaces
        // 8. Special characters

        if (!value) {
            this.showError(zipcodeInput, errorDiv, 'ZIP code is required for US residents');
            return false;
        }

        if (!/^\d{5}$/.test(value)) {
            this.showError(zipcodeInput, errorDiv, 'ZIP code must be exactly 5 digits');
            return false;
        }

        // Additional validation for realistic ZIP codes
        const zipNum = parseInt(value, 10);
        if (zipNum < 501 || zipNum > 99950) {
            this.showError(zipcodeInput, errorDiv, 'Please enter a valid US ZIP code');
            return false;
        }

        this.showSuccess(zipcodeInput, errorDiv);
        return true;
    }

    // Password Validation
    validatePassword() {
        const passwordInput = document.getElementById('password');
        const errorDiv = document.getElementById('password-error');
        const value = passwordInput.value;

        // Edge cases to check:
        // 1. Empty password
        // 2. Less than 8 characters
        // 3. Only whitespace
        // 4. Very long passwords (security consideration)

        if (!value) {
            this.showError(passwordInput, errorDiv, 'Password is required');
            return false;
        }

        if (value.length < 8) {
            this.showError(passwordInput, errorDiv, 'Password must be at least 8 characters long');
            return false;
        }

        if (value.length > 128) {
            this.showError(passwordInput, errorDiv, 'Password is too long (maximum 128 characters)');
            return false;
        }

        // Check for only whitespace
        if (/^\s+$/.test(value)) {
            this.showError(passwordInput, errorDiv, 'Password cannot be only spaces');
            return false;
        }

        this.showSuccess(passwordInput, errorDiv);
        return true;
    }

    // Pizza Type Validation
    validatePizzaType() {
        const pizzaRadios = document.querySelectorAll('input[name="pizzaType"]');
        const errorDiv = document.getElementById('pizzaType-error');

        const isSelected = Array.from(pizzaRadios).some(radio => radio.checked);

        if (!isSelected) {
            this.showError(null, errorDiv, 'Please select a pizza preference');
            return false;
        }

        this.clearValidation(null, errorDiv);
        return true;
    }

    // Toggle Zipcode Field
    toggleZipcodeField(show) {
        const zipcodeGroup = document.getElementById('zipcodeGroup');
        const zipcodeInput = document.getElementById('zipcode');
        const zipcodeError = document.getElementById('zipcode-error');

        if (show) {
            zipcodeGroup.style.display = 'block';
            zipcodeGroup.classList.add('show');
            zipcodeGroup.classList.remove('hide');
            zipcodeInput.setAttribute('required', 'required');
        } else {
            zipcodeGroup.classList.add('hide');
            zipcodeGroup.classList.remove('show');
            zipcodeInput.removeAttribute('required');
            this.clearValidation(zipcodeInput, zipcodeError);

            // Hide after animation
            setTimeout(() => {
                if (!document.getElementById('usResident').checked) {
                    zipcodeGroup.style.display = 'none';
                }
            }, 300);
        }
    }

    // Form Submission Handler
    handleSubmit(event) {
        event.preventDefault();

        // Prevent double submission
        if (this.isSubmitting) {
            return;
        }

        // Validate all fields
        const isNameValid = this.validateName();
        const isBirthYearValid = this.validateBirthYear();
        const isZipcodeValid = this.validateZipcode();
        const isPasswordValid = this.validatePassword();
        const isPizzaTypeValid = this.validatePizzaType();

        const isFormValid = isNameValid && isBirthYearValid && isZipcodeValid && isPasswordValid && isPizzaTypeValid;

        if (isFormValid) {
            this.isSubmitting = true;
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Processing...';

            // Simulate processing time
            setTimeout(() => {
                this.showSuccessMessage();
                this.isSubmitting = false;
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 1000);
        } else {
            // Focus on first invalid field
            this.focusFirstError();
        }
    }

    // Show Success Message
    showSuccessMessage() {
        const successMessage = document.getElementById('successMessage');
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth' });

        // Also hide the form for better UX
        this.form.style.opacity = '0.7';
        this.form.style.pointerEvents = 'none';
    }

    // Focus First Error
    focusFirstError() {
        const errorInputs = document.querySelectorAll('input.error');
        if (errorInputs.length > 0) {
            errorInputs[0].focus();
        } else {
            // Check for pizza type error
            const pizzaError = document.getElementById('pizzaType-error');
            if (pizzaError.textContent) {
                document.querySelector('input[name="pizzaType"]').focus();
            }
        }
    }

    // Helper Methods
    showError(input, errorDiv, message) {
        if (input) {
            input.classList.add('error');
            input.classList.remove('valid');
        }
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    showSuccess(input, errorDiv) {
        if (input) {
            input.classList.add('valid');
            input.classList.remove('error');
        }
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }

    clearValidation(input, errorDiv) {
        if (input) {
            input.classList.remove('error', 'valid');
        }
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
}

// Additional Utility Functions for Edge Case Testing
class EdgeCaseTestHelper {
    static testAllEdgeCases() {
        console.log('Running edge case tests...');

        // Test extreme values
        const tests = [
            { field: 'name', value: '', expected: false },
            { field: 'name', value: '   ', expected: false },
            { field: 'name', value: 'AB', expected: false },
            { field: 'name', value: 'John123', expected: false },
            { field: 'name', value: 'John Doe', expected: true },
            { field: 'birthYear', value: '', expected: false },
            { field: 'birthYear', value: '0', expected: false },
            { field: 'birthYear', value: '-1990', expected: false },
            { field: 'birthYear', value: '1900', expected: false },
            { field: 'birthYear', value: '2025', expected: false },
            { field: 'birthYear', value: '1990.5', expected: false },
            { field: 'birthYear', value: '1990', expected: true },
            { field: 'zipcode', value: '1234', expected: false },
            { field: 'zipcode', value: '123456', expected: false },
            { field: 'zipcode', value: 'ABCDE', expected: false },
            { field: 'zipcode', value: '12345', expected: true },
            { field: 'password', value: '', expected: false },
            { field: 'password', value: '1234567', expected: false },
            { field: 'password', value: '        ', expected: false },
            { field: 'password', value: 'password123', expected: true }
        ];

        return tests;
    }
}

// Initialize the validator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PizzaRegistrationValidator();

    // Add development helper
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.edgeCaseTests = EdgeCaseTestHelper.testAllEdgeCases();
        console.log('Edge case tests available in window.edgeCaseTests');
    }
});