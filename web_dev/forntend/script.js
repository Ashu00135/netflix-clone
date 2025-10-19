// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-menu') && !event.target.closest('.mobile-nav')) {
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
        }
    });

    // Email validation and message
    const emailInput = document.getElementById('email-input');
    const getStarted = document.getElementById('get-started-btn');
    const messageEl = document.getElementById('email-message');
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    if (getStarted && emailInput && messageEl) {
        getStarted.addEventListener('click', function() {
            const v = emailInput.value.trim();
            if (!isValidEmail(v)) {
                messageEl.textContent = 'Please enter a valid email address.';
                messageEl.style.color = '#ffb3b3';
            } else {
                messageEl.textContent = 'Great! We will get you started.';
                messageEl.style.color = '#9be39b';
            }
        });
    }

    // FAQ accordion toggle
    document.querySelectorAll('.faqbox').forEach(box => {
        box.addEventListener('click', function() {
            this.classList.toggle('open');
        });
        // Accessibility
        box.setAttribute('role', 'button');
        box.setAttribute('tabindex', '0');
        box.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.classList.toggle('open');
            }
        });
    });
});