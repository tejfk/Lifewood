document.addEventListener('DOMContentLoaded', () => {

    // --- Page Body Class ---
    const body = document.body;
    if (window.location.pathname.includes('Contact.html')) {
        body.classList.add('contact-page');
    }

    // --- AOS Initialization ---
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        disable: 'mobile'
    });

    // --- Sticky Header ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('no-scroll'); // Prevent scrolling when menu is open
        });
    }
    
    // --- Accordion Logic (FAQ) ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            const answer = item.querySelector('.faq-answer');
            
            button.classList.toggle('open');
            
            if (button.classList.contains('open')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });

    // --- Accordion Logic (Services) ---
    const serviceLearnMoreButtons = document.querySelectorAll('.service-item-card .btn-learn-more');
    serviceLearnMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.service-item-card');
            const details = card.querySelector('.service-item-details');
            const detailsContent = card.querySelector('.service-item-details-content');

            button.classList.toggle('open');
            details.classList.toggle('open');
            
            if (details.classList.contains('open')) {
                if (!detailsContent) {
                    const contentP = details.querySelector('p');
                    if (contentP) {
                        const wrapper = document.createElement('div');
                        wrapper.className = 'service-item-details-content';
                        wrapper.appendChild(contentP);
                        details.appendChild(wrapper);
                        details.style.maxHeight = wrapper.scrollHeight + "px";
                    }
                } else {
                     details.style.maxHeight = detailsContent.scrollHeight + "px";
                }
            } else {
                details.style.maxHeight = '0';
            }
        });
    });

    // --- Page Loader & Transitions ---
    const pageLoader = document.querySelector('.page-loader');
    if (pageLoader) {
        // The animation starts automatically via CSS.
        // We listen for when the animation is complete to hide the element entirely.
        pageLoader.addEventListener('animationend', () => {
            pageLoader.style.display = 'none';
        });
    }

    const allLinks = document.querySelectorAll('a[href]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = this.getAttribute('target');
            
            if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:') && target !== '_blank' && href.endsWith('.html')) {
                e.preventDefault();
                document.body.classList.add('is-transitioning');
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            this.querySelectorAll('.form-group.error').forEach(group => group.classList.remove('error'));
            
            const name = this.querySelector('#name');
            const email = this.querySelector('#email');
            const subject = this.querySelector('#subject');
            const message = this.querySelector('#message');

            if (name.value.trim() === '') {
                showError(name, 'Full Name is required.');
                isValid = false;
            }
            if (!validateEmail(email.value)) {
                showError(email, 'Please enter a valid email address.');
                isValid = false;
            }
            if (subject.value.trim() === '') {
                showError(subject, 'Subject cannot be empty.');
                isValid = false;
            }
            if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters long.');
                isValid = false;
            }

            if (isValid) {
                const successMsg = document.getElementById('form-success');
                successMsg.textContent = 'Thank you! Your message has been sent successfully.';
                successMsg.style.display = 'block';
                this.reset();
                setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
            }
        });

        function showError(input, message) {
            const formGroup = input.parentElement;
            formGroup.classList.add('error');
            const errorMsg = formGroup.querySelector('.error-message');
            errorMsg.textContent = message;
        }

        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
    }
});