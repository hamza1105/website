// Global variables
let currentLanguage = 'fr';
let providers = [];
let bookings = [];
let currentStep = 1;
let selectedCategory = null;
let selectedProvider = null;
let allProviders = [];
const API_BASE_URL = 'http://localhost:3000/api';

// Language translations
const translations = {
    fr: {
        searchPlaceholder: "Rechercher un professionnel...",
        searchButton: "Rechercher",
        bookAppointment: "Réserver un Rendez-vous",
        fullName: "Nom complet",
        email: "Email",
        phone: "Téléphone",
        date: "Date",
        time: "Heure",
        reason: "Motif",
        reasonPlaceholder: "Décrivez brièvement le motif de votre rendez-vous...",
        confirmBooking: "Confirmer la Réservation",
        bookingSuccess: "Réservation confirmée avec succès!",
        bookingError: "Erreur lors de la réservation. Veuillez réessayer.",
        loading: "Chargement...",
        noResults: "Aucun résultat trouvé",
        filterBy: "Filtrer par",
        allCategories: "Toutes les catégories",
        doctors: "Médecins",
        lawyers: "Avocats",
        beauty: "Centres de Beauté",
        gyms: "Salles de Sport"
    },
    en: {
        searchPlaceholder: "Search for a professional...",
        searchButton: "Search",
        bookAppointment: "Book an Appointment",
        fullName: "Full Name",
        email: "Email",
        phone: "Phone",
        date: "Date",
        time: "Time",
        reason: "Reason",
        reasonPlaceholder: "Briefly describe the reason for your appointment...",
        confirmBooking: "Confirm Booking",
        bookingSuccess: "Booking confirmed successfully!",
        bookingError: "Error during booking. Please try again.",
        loading: "Loading...",
        noResults: "No results found",
        filterBy: "Filter by",
        allCategories: "All Categories",
        doctors: "Doctors",
        lawyers: "Lawyers",
        beauty: "Beauty Centers",
        gyms: "Gyms"
    },
    ar: {
        searchPlaceholder: "البحث عن محترف...",
        searchButton: "بحث",
        bookAppointment: "حجز موعد",
        fullName: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        date: "التاريخ",
        time: "الوقت",
        reason: "السبب",
        reasonPlaceholder: "اشرح بإيجاز سبب موعدك...",
        confirmBooking: "تأكيد الحجز",
        bookingSuccess: "تم تأكيد الحجز بنجاح!",
        bookingError: "خطأ أثناء الحجز. يرجى المحاولة مرة أخرى.",
        loading: "جاري التحميل...",
        noResults: "لم يتم العثور على نتائج",
        filterBy: "تصفية حسب",
        allCategories: "جميع الفئات",
        doctors: "أطباء",
        lawyers: "محامون",
        beauty: "مراكز التجميل",
        gyms: "صالات رياضية"
    }
};

// Sample providers data
const sampleProviders = [
    {
        id: 1,
        name: "Dr. Marie Dubois",
        specialty: "Cardiologue",
        location: "Paris, 8ème arrondissement",
        rating: 4.8,
        category: "doctors",
        icon: "fas fa-user-md",
        available: true
    },
    {
        id: 2,
        name: "Me. Jean Martin",
        specialty: "Avocat en Droit Civil",
        location: "Lyon, Centre-ville",
        rating: 4.6,
        category: "lawyers",
        icon: "fas fa-gavel",
        available: true
    },
    {
        id: 3,
        name: "Centre Beauté Élégance",
        specialty: "Soins Esthétiques",
        location: "Marseille, Vieux-Port",
        rating: 4.7,
        category: "beauty",
        icon: "fas fa-spa",
        available: true
    },
    {
        id: 4,
        name: "Dr. Sophie Laurent",
        specialty: "Dermatologue",
        location: "Bordeaux, Centre",
        rating: 4.9,
        category: "doctors",
        icon: "fas fa-user-md",
        available: true
    },
    {
        id: 5,
        name: "Me. Pierre Durand",
        specialty: "Avocat en Droit Commercial",
        location: "Toulouse, Capitole",
        rating: 4.5,
        category: "lawyers",
        icon: "fas fa-gavel",
        available: true
    },
    {
        id: 6,
        name: "Fitness Pro Gym",
        specialty: "Salle de Sport",
        location: "Nice, Promenade",
        rating: 4.4,
        category: "gyms",
        icon: "fas fa-dumbbell",
        available: true
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupLanguageSwitcher();
    setupSearchFunctionality();
    setupBookingModal();
    loadProviders();
    setupSmoothScrolling();
    setupAnimations();
    
    // Detect current page and filter providers accordingly
    detectPageAndFilter();
}

// Detect current page and filter providers by category
function detectPageAndFilter() {
    const currentPage = window.location.pathname;
    let category = null;
    
    if (currentPage.includes('medecins.html')) {
        category = 'doctors';
    } else if (currentPage.includes('avocats.html')) {
        category = 'lawyers';
    } else if (currentPage.includes('beaute.html')) {
        category = 'beauty';
    } else if (currentPage.includes('sport.html')) {
        category = 'gyms';
    }
    
    if (category) {
        // Filter providers by category after they are loaded
        setTimeout(() => {
            filterProvidersByCategory(category);
        }, 100);
    }
}

// Language switching functionality
function setupLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function switchLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    // Update all translatable elements
    const translatableElements = document.querySelectorAll('[data-fr], [data-en], [data-ar]');
    
    translatableElements.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            element.textContent = translation;
        }
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-fr-placeholder], [data-en-placeholder], [data-ar-placeholder]');
    
    placeholderElements.forEach(element => {
        const placeholder = element.getAttribute(`data-${lang}-placeholder`);
        if (placeholder) {
            element.placeholder = placeholder;
        }
    });
    
    // Update form labels and buttons
    updateFormTranslations(lang);
    
    // Update search functionality
    updateSearchTranslations(lang);
}

function updateFormTranslations(lang) {
    const form = document.getElementById('bookingForm');
    if (!form) return;
    
    const labels = form.querySelectorAll('label');
    const submitBtn = form.querySelector('.submit-btn');
    const textarea = form.querySelector('textarea');
    
    labels.forEach((label, index) => {
        const fieldNames = ['fullName', 'email', 'phone', 'date', 'time', 'reason'];
        if (fieldNames[index]) {
            label.textContent = translations[lang][fieldNames[index]];
        }
    });
    
    if (submitBtn) {
        submitBtn.textContent = translations[lang].confirmBooking;
    }
    
    if (textarea) {
        textarea.placeholder = translations[lang].reasonPlaceholder;
    }
}

function updateSearchTranslations(lang) {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        searchInput.placeholder = translations[lang].searchPlaceholder;
    }
    
    if (searchBtn) {
        searchBtn.textContent = translations[lang].searchButton;
    }
}

// Search functionality
function setupSearchFunctionality() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            filterProviders(query);
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.toLowerCase();
            filterProviders(query);
        });
    }
}

async function filterProviders(query) {
    try {
        const response = await fetch(`${API_BASE_URL}/providers?search=${encodeURIComponent(query)}`);
        const result = await response.json();
        
        if (result.success) {
            displayProviders(result.data);
        } else {
            // Fallback to client-side filtering
            const filteredProviders = providers.filter(provider => 
                provider.name.toLowerCase().includes(query) ||
                provider.specialty.toLowerCase().includes(query) ||
                provider.location.toLowerCase().includes(query)
            );
            displayProviders(filteredProviders);
        }
    } catch (error) {
        console.error('Error filtering providers:', error);
        // Fallback to client-side filtering
        const filteredProviders = providers.filter(provider => 
            provider.name.toLowerCase().includes(query) ||
            provider.specialty.toLowerCase().includes(query) ||
            provider.location.toLowerCase().includes(query)
        );
        displayProviders(filteredProviders);
    }
}

// Providers functionality
async function loadProviders() {
    try {
        const response = await fetch(`${API_BASE_URL}/providers`);
        const result = await response.json();
        
        if (result.success) {
            providers = result.data;
            displayProviders(providers);
        } else {
            console.error('Error loading providers:', result.message);
            // Fallback to sample data
            providers = sampleProviders;
            displayProviders(providers);
        }
    } catch (error) {
        console.error('Error loading providers:', error);
        // Fallback to sample data
        providers = sampleProviders;
        displayProviders(providers);
    }
}

function displayProviders(providersToShow) {
    const providersGrid = document.getElementById('providersGrid');
    if (!providersGrid) return;
    
    providersGrid.innerHTML = '';
    
    if (providersToShow.length === 0) {
        providersGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>${translations[currentLanguage].noResults}</p>
            </div>
        `;
        return;
    }
    
    providersToShow.forEach(provider => {
        const providerCard = createProviderCard(provider);
        providersGrid.appendChild(providerCard);
    });
}

function createProviderCard(provider) {
    const card = document.createElement('div');
    card.className = 'provider-card';
    card.innerHTML = `
        <div class="provider-image">
            <i class="${provider.icon}"></i>
        </div>
        <div class="provider-info">
            <h3 class="provider-name">${provider.name}</h3>
            <p class="provider-specialty">${provider.specialty}</p>
            <p class="provider-location">
                <i class="fas fa-map-marker-alt"></i> ${provider.location}
            </p>
            <div class="provider-rating">
                <div class="stars">
                    ${generateStars(provider.rating)}
                </div>
                <span>${provider.rating}/5</span>
            </div>
            <div class="provider-actions">
                <button class="book-btn" onclick="openBookingModal(${provider.id})">
                    ${translations[currentLanguage].bookAppointment}
                </button>
                <a href="profile-template.html?id=${provider.id}" class="btn btn-secondary btn-sm" data-fr="Voir Profil" data-en="View Profile" data-ar="عرض الملف الشخصي">Voir Profil</a>
            </div>
        </div>
    `;
    
    return card;
}

function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Booking modal functionality
function setupBookingModal() {
    const modal = document.getElementById('bookingModal');
    const closeBtn = modal.querySelector('.close');
    const bookingForm = document.getElementById('bookingForm');
    
    // Close modal when clicking on X
    closeBtn.addEventListener('click', closeBookingModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeBookingModal();
        }
    });
    
    // Handle form submission
    bookingForm.addEventListener('submit', handleBookingSubmission);
}

function openBookingModal(providerId) {
    const modal = document.getElementById('bookingModal');
    const provider = providers.find(p => p.id === providerId);
    
    if (provider) {
        // Store the provider ID for form submission
        modal.setAttribute('data-provider-id', providerId);
        
        // Update modal title with provider name
        const modalTitle = modal.querySelector('h2');
        modalTitle.textContent = `${translations[currentLanguage].bookAppointment} - ${provider.name}`;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Reset form
    const form = document.getElementById('bookingForm');
    form.reset();
}

function handleBookingSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const providerId = parseInt(form.closest('.modal').getAttribute('data-provider-id'));
    
    const booking = {
        id: Date.now(),
        providerId: providerId,
        customerName: formData.get('name') || form.querySelector('input[type="text"]').value,
        email: formData.get('email') || form.querySelector('input[type="email"]').value,
        phone: formData.get('phone') || form.querySelector('input[type="tel"]').value,
        date: formData.get('date') || form.querySelector('input[type="date"]').value,
        time: formData.get('time') || form.querySelector('input[type="time"]').value,
        reason: formData.get('reason') || form.querySelector('textarea').value,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    // Simulate API call
    submitBooking(booking);
}

async function submitBooking(booking) {
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.innerHTML = `<span class="loading"></span> ${translations[currentLanguage].loading}`;
    submitBtn.disabled = true;
    
    try {
        const response = await fetch(`${API_BASE_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(booking)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Store booking locally as well
            bookings.push(booking);
            localStorage.setItem('bookings', JSON.stringify(bookings));
            
            // Show success message
            showMessage(translations[currentLanguage].bookingSuccess, 'success');
            
            // Close modal
            closeBookingModal();
            
            // Update providers list
            loadProviders();
        } else {
            showMessage(result.message || translations[currentLanguage].bookingError, 'error');
        }
    } catch (error) {
        console.error('Error submitting booking:', error);
        showMessage(translations[currentLanguage].bookingError, 'error');
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at top of body
    document.body.insertBefore(messageDiv, document.body.firstChild);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 5000);
}

// Smooth scrolling
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animations
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards and provider cards
    const cards = document.querySelectorAll('.service-card, .provider-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Service buttons functionality
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('service-btn')) {
        const category = e.target.closest('.service-card').querySelector('h3').textContent.toLowerCase();
        filterProvidersByCategory(category);
        
        // Scroll to providers section
        const providersSection = document.getElementById('providers');
        providersSection.scrollIntoView({ behavior: 'smooth' });
    }
});

function filterProvidersByCategory(category) {
    let filteredProviders;
    
    switch(category.toLowerCase()) {
        case 'médecins':
        case 'doctors':
        case 'أطباء':
        case 'doctors':
            filteredProviders = providers.filter(p => p.category === 'doctors');
            break;
        case 'avocats':
        case 'lawyers':
        case 'محامون':
        case 'lawyers':
            filteredProviders = providers.filter(p => p.category === 'lawyers');
            break;
        case 'centres de beauté':
        case 'beauty centers':
        case 'مراكز التجميل':
        case 'beauty':
            filteredProviders = providers.filter(p => p.category === 'beauty');
            break;
        case 'salles de sport':
        case 'gyms':
        case 'صالات رياضية':
        case 'gyms':
            filteredProviders = providers.filter(p => p.category === 'gyms');
            break;
        default:
            filteredProviders = providers;
    }
    
    displayProviders(filteredProviders);
}

// Load saved bookings from localStorage
function loadSavedBookings() {
    const savedBookings = localStorage.getItem('bookings');
    if (savedBookings) {
        bookings = JSON.parse(savedBookings);
    }
}

// Initialize saved bookings
loadSavedBookings();

// Provider Profile Modal Functions
function showProviderProfileById(providerId) {
    const provider = providers.find(p => p.id === providerId);
    if (provider) {
        showProviderProfile(provider);
    }
}

function showProviderProfile(provider) {
    const modal = document.createElement('div');
    modal.className = 'provider-profile-modal';
    modal.id = 'providerProfileModal';
    
    modal.innerHTML = `
        <div class="provider-profile-content">
            <div class="provider-profile-header">
                <button class="provider-profile-close" onclick="closeProviderProfile()">&times;</button>
                <h3>${provider.name}</h3>
                <p>${provider.specialty}</p>
            </div>
            <div class="provider-profile-body">
                <div class="provider-info-grid">
                    <div class="provider-info-item">
                        <h4 data-fr="Localisation" data-en="Location" data-ar="الموقع">Localisation</h4>
                        <p>${provider.location}</p>
                    </div>
                    <div class="provider-info-item">
                        <h4 data-fr="Note" data-en="Rating" data-ar="التقييم">Note</h4>
                        <p>${provider.rating}/5 ⭐</p>
                    </div>
                    <div class="provider-info-item">
                        <h4 data-fr="Disponibilité" data-en="Availability" data-ar="التوفر">Disponibilité</h4>
                        <p>${provider.available ? 'Disponible' : 'Non disponible'}</p>
                    </div>
                    <div class="provider-info-item">
                        <h4 data-fr="Contact" data-en="Contact" data-ar="اتصل">Contact</h4>
                        <p>${provider.email || 'contact@example.com'}</p>
                    </div>
                </div>
                
                <div class="provider-description">
                    <h4 data-fr="À propos" data-en="About" data-ar="حول">À propos</h4>
                    <p data-fr="Professionnel expérimenté avec plus de 10 ans d'expérience dans son domaine. Spécialisé dans les soins de qualité et l'attention personnalisée." data-en="Experienced professional with over 10 years of experience in their field. Specialized in quality care and personalized attention." data-ar="محترف ذو خبرة مع أكثر من 10 سنوات من الخبرة في مجاله. متخصص في الرعاية عالية الجودة والاهتمام الشخصي.">Professionnel expérimenté avec plus de 10 ans d'expérience dans son domaine. Spécialisé dans les soins de qualité et l'attention personnalisée.</p>
                </div>
                
                <div class="quick-booking-form">
                    <h4 data-fr="Prendre un Rendez-vous Rapide" data-en="Quick Appointment Booking" data-ar="حجز موعد سريع">Prendre un Rendez-vous Rapide</h4>
                    <form id="quickBookingForm">
                        <div class="quick-booking-row">
                            <div class="form-group">
                                <label data-fr="Date" data-en="Date" data-ar="التاريخ">Date</label>
                                <input type="date" id="quickDate" required>
                            </div>
                            <div class="form-group">
                                <label data-fr="Heure" data-en="Time" data-ar="الوقت">Heure</label>
                                <select id="quickTime" required>
                                    <option value="" data-fr="Sélectionnez" data-en="Select" data-ar="اختر">Sélectionnez</option>
                                    <option value="09:00">09:00</option>
                                    <option value="10:00">10:00</option>
                                    <option value="11:00">11:00</option>
                                    <option value="14:00">14:00</option>
                                    <option value="15:00">15:00</option>
                                    <option value="16:00">16:00</option>
                                    <option value="17:00">17:00</option>
                                </select>
                            </div>
                        </div>
                        <div class="quick-booking-row full-width">
                            <div class="form-group">
                                <label data-fr="Nom complet" data-en="Full Name" data-ar="الاسم الكامل">Nom complet</label>
                                <input type="text" id="quickName" required>
                            </div>
                        </div>
                        <div class="quick-booking-row">
                            <div class="form-group">
                                <label data-fr="Email" data-en="Email" data-ar="البريد الإلكتروني">Email</label>
                                <input type="email" id="quickEmail" required>
                            </div>
                            <div class="form-group">
                                <label data-fr="Téléphone" data-en="Phone" data-ar="الهاتف">Téléphone</label>
                                <input type="tel" id="quickPhone" required>
                            </div>
                        </div>
                        <div class="quick-booking-row full-width">
                            <div class="form-group">
                                <label data-fr="Raison" data-en="Reason" data-ar="السبب">Raison</label>
                                <textarea id="quickReason" rows="3" placeholder="Décrivez brièvement la raison de votre rendez-vous..." data-fr="Décrivez brièvement la raison de votre rendez-vous..." data-en="Briefly describe the reason for your appointment..." data-ar="صف بإيجاز سبب موعدك..."></textarea>
                            </div>
                        </div>
                        <div class="quick-booking-actions">
                            <button type="submit" class="btn-quick-book" data-fr="Confirmer le Rendez-vous" data-en="Confirm Appointment" data-ar="تأكيد الموعد">Confirmer le Rendez-vous</button>
                            <button type="button" class="btn-quick-cancel" onclick="closeProviderProfile()" data-fr="Annuler" data-en="Cancel" data-ar="إلغاء">Annuler</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'flex';
    
    // Setup form submission
    document.getElementById('quickBookingForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitQuickBooking(provider);
    });
    
    // Update translations
    updateModalTranslations(currentLanguage);
}

function closeProviderProfile() {
    const modal = document.getElementById('providerProfileModal');
    if (modal) {
        modal.remove();
    }
}

function submitQuickBooking(provider) {
    const formData = {
        providerId: provider.id,
        providerName: provider.name,
        category: provider.category,
        date: document.getElementById('quickDate').value,
        time: document.getElementById('quickTime').value,
        reason: document.getElementById('quickReason').value,
        firstName: document.getElementById('quickName').value.split(' ')[0] || '',
        lastName: document.getElementById('quickName').value.split(' ').slice(1).join(' ') || '',
        email: document.getElementById('quickEmail').value,
        phone: document.getElementById('quickPhone').value,
        address: ''
    };
    
    // Submit booking
    fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showQuickBookingSuccess(formData);
        } else {
            alert('Erreur lors de la réservation: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erreur lors de la réservation');
    });
}

function showQuickBookingSuccess(bookingData) {
    const modal = document.getElementById('providerProfileModal');
    if (modal) {
        modal.innerHTML = `
            <div class="provider-profile-content">
                <div class="provider-profile-header">
                    <button class="provider-profile-close" onclick="closeProviderProfile()">&times;</button>
                    <h3 data-fr="Réservation Confirmée!" data-en="Booking Confirmed!" data-ar="تم تأكيد الحجز!">Réservation Confirmée!</h3>
                    <p data-fr="Votre rendez-vous a été réservé avec succès" data-en="Your appointment has been successfully booked" data-ar="تم حجز موعدك بنجاح">Votre rendez-vous a été réservé avec succès</p>
                </div>
                <div class="provider-profile-body">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <div class="booking-summary">
                        <div class="summary-item">
                            <strong>Professionnel:</strong> ${bookingData.providerName}
                        </div>
                        <div class="summary-item">
                            <strong>Date:</strong> ${bookingData.date} à ${bookingData.time}
                        </div>
                        <div class="summary-item">
                            <strong>Nom:</strong> ${bookingData.firstName} ${bookingData.lastName}
                        </div>
                        <div class="summary-item">
                            <strong>Email:</strong> ${bookingData.email}
                        </div>
                    </div>
                    <div class="quick-booking-actions">
                        <button class="btn-quick-book" onclick="closeProviderProfile()" data-fr="Fermer" data-en="Close" data-ar="إغلاق">Fermer</button>
                    </div>
                </div>
            </div>
        `;
    }
}

function updateModalTranslations(lang) {
    const modal = document.getElementById('providerProfileModal');
    if (!modal) return;
    
    const elements = modal.querySelectorAll('[data-fr]');
    elements.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        if (translation) {
            element.textContent = translation;
        }
    });
}

// Booking page variables

// Booking page functions
function nextStep() {
    if (currentStep === 1 && !selectedCategory) {
        alert('Veuillez sélectionner une catégorie');
        return;
    }
    
    if (currentStep === 2 && !selectedProvider) {
        alert('Veuillez sélectionner un professionnel');
        return;
    }
    
    if (currentStep < 4) {
        document.getElementById(`step${currentStep}`).classList.remove('active');
        currentStep++;
        document.getElementById(`step${currentStep}`).classList.add('active');
        
        if (currentStep === 2) {
            filterProvidersForBooking('');
        }
    }
}

function prevStep() {
    if (currentStep > 1) {
        document.getElementById(`step${currentStep}`).classList.remove('active');
        currentStep--;
        document.getElementById(`step${currentStep}`).classList.add('active');
    }
}

function initializeBookingPage() {
    // Load all providers
    fetchProvidersForBooking();
    
    // Set up category selection
    setupCategorySelection();
    
    // Set up provider search
    setupProviderSearch();
}

function fetchProvidersForBooking() {
    fetch('/api/providers')
        .then(response => response.json())
        .then(data => {
            allProviders = data;
        })
        .catch(error => {
            console.error('Error fetching providers:', error);
        });
}

function setupCategorySelection() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            categoryCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to selected card
            this.classList.add('active');
            
            // Store selected category
            selectedCategory = this.dataset.category;
        });
    });
}

function setupProviderSearch() {
    const searchInput = document.getElementById('providerSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterProvidersForBooking(this.value);
        });
    }
}

function filterProvidersForBooking(searchTerm) {
    const filteredProviders = allProviders.filter(provider => {
        const matchesCategory = !selectedCategory || provider.category === selectedCategory;
        const matchesSearch = !searchTerm || 
            provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
            provider.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        return matchesCategory && matchesSearch;
    });
    
    displayProvidersForBooking(filteredProviders);
}

function displayProvidersForBooking(providers) {
    const grid = document.getElementById('providersGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    providers.forEach(provider => {
        const providerCard = document.createElement('div');
        providerCard.className = 'provider-card';
        providerCard.onclick = () => selectProvider(provider);
        
        providerCard.innerHTML = `
            <div class="provider-icon">
                <i class="${provider.icon}"></i>
            </div>
            <div class="provider-info">
                <h4>${provider.name}</h4>
                <p class="specialty">${provider.specialty}</p>
                <p class="location"><i class="fas fa-map-marker-alt"></i> ${provider.location}</p>
                <div class="rating">
                    <i class="fas fa-star"></i>
                    <span>${provider.rating}</span>
                </div>
            </div>
            <div class="provider-status ${provider.available ? 'available' : 'unavailable'}">
                <i class="fas fa-${provider.available ? 'check' : 'times'}"></i>
            </div>
        `;
        
        grid.appendChild(providerCard);
    });
}

function selectProvider(provider) {
    // Remove active class from all provider cards
    document.querySelectorAll('.provider-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to selected provider card
    event.target.closest('.provider-card').classList.add('active');
    
    selectedProvider = provider;
}

function submitBookingForm(bookingData) {
    fetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showSuccessModal(bookingData);
        } else {
            alert('Erreur lors de la réservation: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Erreur lors de la réservation');
    });
}

function showSuccessModal(bookingData) {
    const summary = document.getElementById('bookingSummary');
    if (summary) {
        summary.innerHTML = `
            <div class="summary-item">
                <strong>Professionnel:</strong> ${bookingData.providerName}
            </div>
            <div class="summary-item">
                <strong>Date:</strong> ${bookingData.date} à ${bookingData.time}
            </div>
            <div class="summary-item">
                <strong>Nom:</strong> ${bookingData.firstName} ${bookingData.lastName}
            </div>
            <div class="summary-item">
                <strong>Email:</strong> ${bookingData.email}
            </div>
        `;
    }
    
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function goToHome() {
    window.location.href = 'index.html';
}

// Function to redirect to category pages
function redirectToCategory(category) {
    let pageUrl = '';
    
    switch(category) {
        case 'doctors':
            pageUrl = 'medecins.html';
            break;
        case 'lawyers':
            pageUrl = 'avocats.html';
            break;
        case 'beauty':
            pageUrl = 'beaute.html';
            break;
        case 'gyms':
            pageUrl = 'sport.html';
            break;
        default:
            pageUrl = 'index.html';
    }
    
    window.location.href = pageUrl;
}

// Export functions for potential backend integration
window.appFunctions = {
    switchLanguage,
    openBookingModal,
    filterProviders,
    submitBooking,
    showProviderProfile,
    showProviderProfileById,
    closeProviderProfile,
    getBookings: () => bookings,
    getProviders: () => providers,
    nextStep,
    prevStep,
    initializeBookingPage,
    submitBookingForm,
    closeSuccessModal,
    goToHome,
    redirectToCategory
}; 