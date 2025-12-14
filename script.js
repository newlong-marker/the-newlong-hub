document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Welcome Screen Animation ---
    const welcomeScreen = document.getElementById('welcome-screen');
    setTimeout(() => {
        welcomeScreen.classList.add('hidden');
    }, 1500); // 1.5s delay for animation to play

    // --- 2. Automatic Image Slider ---
    const slider = document.getElementById('auto-slider');
    const dotsContainer = document.getElementById('slider-dots');
    const slides = document.querySelectorAll('.slide');
    let currentIndex = 0;
    const totalSlides = slides.length;
    const slideInterval = 5000; // 5 seconds

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dot.addEventListener('click', () => {
            goToSlide(i);
        });
        dotsContainer.appendChild(dot);
    }
    const dots = document.querySelectorAll('.dot');

    function goToSlide(index) {
        currentIndex = index;
        slider.style.transform = `translateX(-${currentIndex * 100 / totalSlides}%)`;
        
        // Update dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }

    // Auto-run the slider
    setInterval(nextSlide, slideInterval);


    // --- 3. WhatsApp Order System ---
    const whatsappButtons = document.querySelectorAll('.whatsapp-order-btn');
    const whatsappNumber = '917630808203'; // Northeast India placeholder number

    whatsappButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productName = e.currentTarget.dataset.name;
            const productPrice = e.currentTarget.dataset.price;
            
            // Auto-generated message format (URL Encoded)
            const message = `Hello THE NEWLONG HUB, I want to order this product:\nProduct Name: ${productName}\nPrice: ₹${productPrice}`;
            const encodedMessage = encodeURIComponent(message);
            
            // Construct the WhatsApp link
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Open in a new tab
            window.open(whatsappLink, '_blank');
        });
    });


    // --- 4. Category Filtering ---
    const categoryLinks = document.querySelectorAll('.category-nav a, .mobile-nav a');
    const productCards = document.querySelectorAll('.product-card');
    const productGrid = document.getElementById('product-grid');

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default hash behavior
            const category = e.currentTarget.dataset.category;
            
            // Simple filtering logic
            productCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Scroll to the product grid section
            productGrid.scrollIntoView({ behavior: 'smooth' });
            
            // Close mobile menu if open
            if(mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
        });
    });

    // --- 5. Dynamic Search Functionality ---
    const searchInput = document.getElementById('product-search');

    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        
        productCards.forEach(card => {
            const name = card.querySelector('.product-name').textContent.toLowerCase();
            const desc = card.querySelector('.short-desc').textContent.toLowerCase();
            const category = card.dataset.category.toLowerCase();
            
            if (name.includes(searchTerm) || desc.includes(searchTerm) || category.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });


    // --- 6. Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    mobileMenuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside (simple check)
    document.addEventListener('click', (e) => {
        if (!mobileNav.contains(e.target) && !mobileMenuToggle.contains(e.target) && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }
    });

    // --- 7. Signup / Login Modal & Tabs UI (Frontend Only) ---
    const authModal = document.getElementById('auth-modal');
    const loginLink = document.getElementById('login-link');
    const mobileLoginLink = document.getElementById('mobile-login-link');
    const closeBtn = authModal.querySelector('.close-btn');
    const tabButtons = authModal.querySelectorAll('.tab-btn');
    const authForms = authModal.querySelectorAll('.auth-form');
    const switchTabLinks = authModal.querySelectorAll('.switch-tab-link');

    // Open Modal
    function openAuthModal() {
        authModal.style.display = 'block';
        if(mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }
    }
    loginLink.addEventListener('click', openAuthModal);
    mobileLoginLink.addEventListener('click', openAuthModal);

    // Close Modal
    closeBtn.addEventListener('click', () => {
        authModal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.style.display = 'none';
        }
    });

    // Tab Switching Logic
    function switchTab(tabName) {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        authForms.forEach(form => form.classList.remove('active-form'));

        const activeBtn = authModal.querySelector(`.tab-btn[data-tab="${tabName}"]`);
        const activeForm = document.getElementById(`${tabName}-form`);

        if (activeBtn) activeBtn.classList.add('active');
        if (activeForm) activeForm.classList.add('active-form');
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            switchTab(e.target.dataset.tab);
        });
    });

    switchTabLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(e.target.dataset.tab);
        });
    });

    // --- 8. Frontend Validation (UI Level) ---
    
    function validateForm(e) {
        // Simple UI validation - does not submit or contact a server
        e.preventDefault(); 
        const form = e.target.closest('form');
        const isSignup = form.id === 'signup-form';
        let isValid = true;
        
        // Clear previous errors
        form.querySelectorAll('.validation-error').forEach(err => err.textContent = '');

        if (isSignup) {
            // Full Name
            const fullname = document.getElementById('signup-fullname');
            if (fullname.value.trim().length < 3) {
                document.getElementById('signup-fullname-error').textContent = 'Full Name must be at least 3 characters.';
                isValid = false;
            }

            // State
            const state = document.getElementById('signup-state');
            if (state.value === "") {
                document.getElementById('signup-state-error').textContent = 'Please select your state.';
                isValid = false;
            }

            // Contact (Simple check for non-empty)
            const contact = document.getElementById('signup-contact');
            if (contact.value.trim() === '') {
                document.getElementById('signup-contact-error').textContent = 'Phone Number or Email is required.';
                isValid = false;
            }
            
            // Password
            const password = document.getElementById('signup-password');
            const confirmPassword = document.getElementById('signup-confirm-password');
            if (password.value.length < 8) {
                document.getElementById('signup-password-error').textContent = 'Password must be at least 8 characters.';
                isValid = false;
            } else if (password.value !== confirmPassword.value) {
                document.getElementById('signup-confirm-password-error').textContent = 'Passwords do not match.';
                isValid = false;
            }

            if (isValid) {
                alert("Signup successful (Frontend only)!");
                authModal.style.display = 'none';
                form.reset();
            }
        } else {
            // Login (Simple check for non-empty)
            const loginEmailPhone = document.getElementById('login-email-phone');
            const loginPassword = document.getElementById('login-password');
            if (loginEmailPhone.value.trim() === '') {
                document.getElementById('login-email-error').textContent = 'Email or Phone is required.';
                isValid = false;
            }
            if (loginPassword.value.trim() === '') {
                document.getElementById('login-password-error').textContent = 'Password is required.';
                isValid = false;
            }

            if (isValid) {
                alert("Login successful (Frontend only)! Welcome back.");
                authModal.style.display = 'none';
                form.reset();
            }
        }
        return false;
    }
    
    // Attach validation listeners
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    
    signupForm.querySelector('form').addEventListener('submit', validateForm);
    loginForm.querySelector('form').addEventListener('submit', validateForm);
});