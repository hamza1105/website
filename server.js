const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Serve static files
app.use(express.static(path.join(__dirname, './')));

// In-memory data storage (in production, use a database)
let providers = [
    {
        id: 1,
        name: "Dr. Marie Dubois",
        specialty: "Cardiologue",
        location: "Paris, 8ème arrondissement",
        rating: 4.8,
        category: "doctors",
        icon: "fas fa-user-md",
        available: true,
        email: "dr.dubois@example.com",
        phone: "+33 1 42 65 43 21"
    },
    {
        id: 2,
        name: "Me. Jean Martin",
        specialty: "Avocat en Droit Civil",
        location: "Lyon, Centre-ville",
        rating: 4.6,
        category: "lawyers",
        icon: "fas fa-gavel",
        available: true,
        email: "jean.martin@example.com",
        phone: "+33 4 72 34 56 78"
    },
    {
        id: 3,
        name: "Centre Beauté Élégance",
        specialty: "Soins Esthétiques",
        location: "Marseille, Vieux-Port",
        rating: 4.7,
        category: "beauty",
        icon: "fas fa-spa",
        available: true,
        email: "contact@elegance-beaute.fr",
        phone: "+33 4 91 23 45 67"
    },
    {
        id: 4,
        name: "Dr. Sophie Laurent",
        specialty: "Dermatologue",
        location: "Bordeaux, Centre",
        rating: 4.9,
        category: "doctors",
        icon: "fas fa-user-md",
        available: true,
        email: "dr.laurent@example.com",
        phone: "+33 5 56 78 90 12"
    },
    {
        id: 5,
        name: "Me. Pierre Durand",
        specialty: "Avocat en Droit Commercial",
        location: "Toulouse, Capitole",
        rating: 4.5,
        category: "lawyers",
        icon: "fas fa-gavel",
        available: true,
        email: "pierre.durand@example.com",
        phone: "+33 5 61 23 45 67"
    },
    {
        id: 6,
        name: "Fitness Pro Gym",
        specialty: "Salle de Sport",
        location: "Nice, Promenade",
        rating: 4.4,
        category: "gyms",
        icon: "fas fa-dumbbell",
        available: true,
        email: "contact@fitnesspro.fr",
        phone: "+33 4 93 45 67 89"
    },
    {
        id: 7,
        name: "Dr. Marie Dubois",
        specialty: "Cardiologue",
        location: "Lyon, Part-Dieu",
        rating: 4.8,
        category: "doctors",
        icon: "fas fa-heartbeat",
        available: true,
        email: "dr.dubois@example.com",
        phone: "+33 4 78 90 12 34"
    },
    {
        id: 8,
        name: "Dr. Thomas Moreau",
        specialty: "Dentiste",
        location: "Paris, 8ème arrondissement",
        rating: 4.6,
        category: "doctors",
        icon: "fas fa-tooth",
        available: true,
        email: "dr.moreau@example.com",
        phone: "+33 1 42 34 56 78"
    },
    {
        id: 9,
        name: "Me. Claire Bernard",
        specialty: "Avocate en Droit de la Famille",
        location: "Bordeaux, Saint-Michel",
        rating: 4.7,
        category: "lawyers",
        icon: "fas fa-users",
        available: true,
        email: "claire.bernard@example.com",
        phone: "+33 5 56 90 12 34"
    },
    {
        id: 10,
        name: "Institut de Beauté Zen",
        specialty: "Soins du Visage",
        location: "Toulouse, Carmes",
        rating: 4.5,
        category: "beauty",
        icon: "fas fa-spa",
        available: true,
        email: "contact@zen-beaute.fr",
        phone: "+33 5 61 45 67 89"
    },
    {
        id: 11,
        name: "Power Gym Center",
        specialty: "Musculation",
        location: "Marseille, Canebière",
        rating: 4.3,
        category: "gyms",
        icon: "fas fa-dumbbell",
        available: true,
        email: "contact@powergym.fr",
        phone: "+33 4 91 67 89 01"
    },
    {
        id: 12,
        name: "Dr. Antoine Petit",
        specialty: "Ophtalmologue",
        location: "Nice, Cimiez",
        rating: 4.9,
        category: "doctors",
        icon: "fas fa-eye",
        available: true,
        email: "dr.petit@example.com",
        phone: "+33 4 93 78 90 12"
    },
    {
        id: 13,
        name: "Me. Lucie Martin",
        specialty: "Avocate en Droit Pénal",
        location: "Lyon, Bellecour",
        rating: 4.4,
        category: "lawyers",
        icon: "fas fa-gavel",
        available: true,
        email: "lucie.martin@example.com",
        phone: "+33 4 78 12 34 56"
    },
    {
        id: 14,
        name: "Salon de Coiffure Moderne",
        specialty: "Coiffure & Coloration",
        location: "Paris, Champs-Élysées",
        rating: 4.6,
        category: "beauty",
        icon: "fas fa-cut",
        available: true,
        email: "contact@moderne-coiffure.fr",
        phone: "+33 1 45 67 89 01"
    },
    {
        id: 15,
        name: "CrossFit Elite",
        specialty: "CrossFit & Fitness",
        location: "Bordeaux, Chartrons",
        rating: 4.8,
        category: "gyms",
        icon: "fas fa-dumbbell",
        available: true,
        email: "contact@crossfit-elite.fr",
        phone: "+33 5 56 78 90 12"
    }
];

let bookings = [];
let users = [];

// API Routes

// Get all providers
app.get('/api/providers', (req, res) => {
    try {
        const { category, search } = req.query;
        let filteredProviders = [...providers];

        // Filter by category
        if (category && category !== 'all') {
            filteredProviders = filteredProviders.filter(p => p.category === category);
        }

        // Filter by search term
        if (search) {
            const searchTerm = search.toLowerCase();
            filteredProviders = filteredProviders.filter(p => 
                p.name.toLowerCase().includes(searchTerm) ||
                p.specialty.toLowerCase().includes(searchTerm) ||
                p.location.toLowerCase().includes(searchTerm)
            );
        }

        res.json({
            success: true,
            data: filteredProviders,
            total: filteredProviders.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des professionnels',
            error: error.message
        });
    }
});

// Get provider by ID
app.get('/api/providers/:id', (req, res) => {
    try {
        const provider = providers.find(p => p.id === parseInt(req.params.id));
        
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: 'Professionnel non trouvé'
            });
        }

        res.json({
            success: true,
            data: provider
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération du professionnel',
            error: error.message
        });
    }
});

// Create a new booking
app.post('/api/bookings', (req, res) => {
    try {
        const {
            providerId,
            customerName,
            email,
            phone,
            date,
            time,
            reason
        } = req.body;

        // Validation
        if (!providerId || !customerName || !email || !phone || !date || !time) {
            return res.status(400).json({
                success: false,
                message: 'Tous les champs obligatoires doivent être remplis'
            });
        }

        // Check if provider exists
        const provider = providers.find(p => p.id === parseInt(providerId));
        if (!provider) {
            return res.status(404).json({
                success: false,
                message: 'Professionnel non trouvé'
            });
        }

        // Check if the time slot is available
        const existingBooking = bookings.find(b => 
            b.providerId === parseInt(providerId) &&
            b.date === date &&
            b.time === time &&
            b.status !== 'cancelled'
        );

        if (existingBooking) {
            return res.status(409).json({
                success: false,
                message: 'Ce créneau horaire n\'est pas disponible'
            });
        }

        const newBooking = {
            id: Date.now(),
            providerId: parseInt(providerId),
            customerName,
            email,
            phone,
            date,
            time,
            reason: reason || '',
            status: 'pending',
            createdAt: new Date().toISOString(),
            providerName: provider.name
        };

        bookings.push(newBooking);

        res.status(201).json({
            success: true,
            message: 'Réservation créée avec succès',
            data: newBooking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la création de la réservation',
            error: error.message
        });
    }
});

// Get all bookings
app.get('/api/bookings', (req, res) => {
    try {
        const { email, status } = req.query;
        let filteredBookings = [...bookings];

        // Filter by email
        if (email) {
            filteredBookings = filteredBookings.filter(b => b.email === email);
        }

        // Filter by status
        if (status) {
            filteredBookings = filteredBookings.filter(b => b.status === status);
        }

        // Add provider information to bookings
        const bookingsWithProviderInfo = filteredBookings.map(booking => {
            const provider = providers.find(p => p.id === booking.providerId);
            return {
                ...booking,
                provider: provider ? {
                    name: provider.name,
                    specialty: provider.specialty,
                    location: provider.location
                } : null
            };
        });

        res.json({
            success: true,
            data: bookingsWithProviderInfo,
            total: bookingsWithProviderInfo.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des réservations',
            error: error.message
        });
    }
});

// Get booking by ID
app.get('/api/bookings/:id', (req, res) => {
    try {
        const booking = bookings.find(b => b.id === parseInt(req.params.id));
        
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Réservation non trouvée'
            });
        }

        const provider = providers.find(p => p.id === booking.providerId);
        const bookingWithProvider = {
            ...booking,
            provider: provider ? {
                name: provider.name,
                specialty: provider.specialty,
                location: provider.location
            } : null
        };

        res.json({
            success: true,
            data: bookingWithProvider
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération de la réservation',
            error: error.message
        });
    }
});

// Update booking status
app.patch('/api/bookings/:id', (req, res) => {
    try {
        const { status } = req.body;
        const booking = bookings.find(b => b.id === parseInt(req.params.id));
        
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Réservation non trouvée'
            });
        }

        const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Statut invalide'
            });
        }

        booking.status = status;
        booking.updatedAt = new Date().toISOString();

        res.json({
            success: true,
            message: 'Statut de la réservation mis à jour',
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la mise à jour de la réservation',
            error: error.message
        });
    }
});

// Get available time slots for a provider
app.get('/api/providers/:id/availability', (req, res) => {
    try {
        const providerId = parseInt(req.params.id);
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({
                success: false,
                message: 'La date est requise'
            });
        }

        // Get existing bookings for this provider on the specified date
        const existingBookings = bookings.filter(b => 
            b.providerId === providerId &&
            b.date === date &&
            b.status !== 'cancelled'
        );

        // Generate available time slots (9 AM to 6 PM, 1-hour intervals)
        const timeSlots = [];
        for (let hour = 9; hour < 18; hour++) {
            const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
            const isBooked = existingBookings.some(b => b.time === timeSlot);
            
            timeSlots.push({
                time: timeSlot,
                available: !isBooked
            });
        }

        res.json({
            success: true,
            data: {
                date,
                providerId,
                timeSlots
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Erreur lors de la récupération des créneaux disponibles',
            error: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        message: 'RendezVous Pro API is running',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Erreur interne du serveur',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Une erreur est survenue'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 RendezVous Pro server running on port ${PORT}`);
    console.log(`📱 Frontend available at: http://localhost:${PORT}`);
    console.log(`🔧 API available at: http://localhost:${PORT}/api`);
    console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app; 