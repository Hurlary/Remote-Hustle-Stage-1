// ============================================
// SAMPLE HOUSE DATA
// ============================================
const sampleHouses = [
    {
        id: 1,
        title: "Spacious 2 Bedroom Apartment",
        location: "yaba",
        locationName: "Yaba, Lagos",
        price: 350000,
        bedrooms: 2,
        bathrooms: 2,
        features: ["Parking", "Security", "Water"],
        image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400",
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400"],
        contactName: "Mr. Ade",
        contactPhone: "08012345678",
        contactWhatsapp: "2348012345678",
        description: "Clean 2 bedroom flat close to university. Direct owner, no agent fee. Spacious living room with modern fittings."
    },
    {
        id: 2,
        title: "Self-Contained Studio",
        location: "ikeja",
        locationName: "Ikeja, Lagos",
        price: 180000,
        bedrooms: 1,
        bathrooms: 1,
        features: ["Prepaid Meter", "Fenced", "POP Ceiling"],
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
        images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400"],
        contactName: "Mrs. Okon",
        contactPhone: "08087654321",
        contactWhatsapp: "2348087654321",
        description: "Affordable self-contained for working professional. Close to major bus stops and markets."
    },
    {
        id: 3,
        title: "3 Bedroom Duplex",
        location: "lekki",
        locationName: "Lekki Phase 1",
        price: 750000,
        bedrooms: 3,
        bathrooms: 3,
        features: ["Pool", "Gym", "24/7 Power", "Security"],
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400",
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400"],
        contactName: "Mr. Johnson",
        contactPhone: "07011223344",
        contactWhatsapp: "2347011223344",
        description: "Luxury duplex in gated estate. Direct from owner. Perfect for families."
    },
    {
        id: 4,
        title: "1 Bedroom Mini Flat",
        location: "lagos",
        locationName: "Lagos Island",
        price: 250000,
        bedrooms: 1,
        bathrooms: 1,
        features: ["Water Heater", "Kitchen Cabinets"],
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400",
        images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400"],
        contactName: "Alhaji Musa",
        contactPhone: "08033334444",
        contactWhatsapp: "2348033334444",
        description: "Compact mini flat in central location. Close to business district."
    }
];

// ============================================
// LOCATION NAMES
// ============================================
const locationNames = {
    'abia': 'Abia',
    'adamawa': 'Adamawa',
    'akwa-ibom': 'Akwa Ibom',
    'anambra': 'Anambra',
    'bauchi': 'Bauchi',
    'bayelsa': 'Bayelsa',
    'benue': 'Benue',
    'borno': 'Borno',
    'cross-river': 'Cross River',
    'delta': 'Delta',
    'ebonyi': 'Ebonyi',
    'edo': 'Edo',
    'ekiti': 'Ekiti',
    'enugu': 'Enugu',
    'gombe': 'Gombe',
    'imo': 'Imo',
    'jigawa': 'Jigawa',
    'kaduna': 'Kaduna',
    'kano': 'Kano',
    'katsina': 'Katsina',
    'kebbi': 'Kebbi',
    'kogi': 'Kogi',
    'kwara': 'Kwara',
    'lagos': 'Lagos',
    'nasarawa': 'Nasarawa',
    'niger': 'Niger',
    'ogun': 'Ogun',
    'ondo': 'Ondo',
    'osun': 'Osun',
    'oyo': 'Oyo',
    'plateau': 'Plateau',
    'rivers': 'Rivers',
    'sokoto': 'Sokoto',
    'taraba': 'Taraba',
    'yobe': 'Yobe',
    'zamfara': 'Zamfara',
    'fct': 'FCT (Abuja)'
};

// ============================================
// INITIALIZE DATA
// ============================================
function initializeData() {
    const stored = localStorage.getItem('rentdirect_houses');
    
    if (!stored) {
        localStorage.setItem('rentdirect_houses', JSON.stringify(sampleHouses));
        return sampleHouses;
    }
    
    const parsed = JSON.parse(stored);
    
    // Migrate old data format to new format
    const migrated = parsed.map(h => {
        if (!h.images && h.image) {
            return { ...h, images: [h.image] };
        }
        return h;
    });
    
    if (JSON.stringify(parsed) !== JSON.stringify(migrated)) {
        localStorage.setItem('rentdirect_houses', JSON.stringify(migrated));
    }
    
    return migrated;
}

let houses = initializeData();
let currentHouses = [...houses];

// ============================================
// DISPLAY FUNCTIONS
// ============================================
function displayHouses(housesToShow) {
    const grid = document.getElementById('listingsGrid');
    const count = document.getElementById('listingCount');
    
    if (!grid) return;
    
    count.textContent = `(${housesToShow.length})`;
    
    if (housesToShow.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>No houses found</h3>
                <p>Try different search terms or filters</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = housesToShow.map((house, index) => {
        const mainImage = house.images && house.images.length > 0 
            ? house.images[0] 
            : house.image || "https://via.placeholder.com/400x300?text=RentDirect&bg=ffcab2&fg=1e1a18";
        
        const photoCount = house.images && house.images.length > 1 
            ? house.images.length 
            : 0;
        
        return `
        <div class="house-card fade-in" onclick="viewHouse(${house.id})" style="animation-delay: ${index * 0.1}s">
            <div class="house-image">
                <img src="${mainImage}" 
                     alt="${house.title}" 
                     onerror="this.src='https://via.placeholder.com/400x300?text=RentDirect&bg=ffcab2&fg=1e1a18'"
                     loading="lazy">
                ${photoCount > 1 ? `<span class="photo-count">📷 ${photoCount}</span>` : ''}
            </div>
            <div class="house-info">
                <div class="house-price">₦${house.price.toLocaleString()}/year</div>
                <h4>${highlightMatch(house.title)}</h4>
                <p class="house-location">📍 ${highlightMatch(house.locationName)}</p>
                <div class="house-features">
                    <span>🛏️ ${house.bedrooms} bed</span>
                    <span>🚿 ${house.bathrooms} bath</span>
                    ${house.features.includes('Security') ? '<span>🔒 Secure</span>' : ''}
                </div>
            </div>
        </div>
    `}).join('');
}

function highlightMatch(text) {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput || !searchInput.value) return text;
    
    const search = searchInput.value.toLowerCase();
    if (!search) return text;
    
    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(regex, '<mark style="background: var(--primary); padding: 2px 4px; border-radius: 4px;">$1</mark>');
}

// ============================================
// SEARCH & FILTER
// ============================================
function liveSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchTerm) {
        currentHouses = [...houses];
        displayHouses(currentHouses);
        return;
    }
    
    currentHouses = houses.filter(house => 
        house.title.toLowerCase().includes(searchTerm) ||
        house.locationName.toLowerCase().includes(searchTerm) ||
        house.features.some(f => f.toLowerCase().includes(searchTerm)) ||
        house.description.toLowerCase().includes(searchTerm)
    );
    
    displayHouses(currentHouses);
}

function filterHouses() {
    const location = document.getElementById('locationFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    
    houses = JSON.parse(localStorage.getItem('rentdirect_houses')) || sampleHouses;
    
    let filtered = houses;
    
    if (location) {
        filtered = filtered.filter(h => h.location === location);
    }
    
    if (priceRange) {
        if (priceRange === '0-200000') {
            filtered = filtered.filter(h => h.price <= 200000);
        } else if (priceRange === '200000-500000') {
            filtered = filtered.filter(h => h.price > 200000 && h.price <= 500000);
        } else if (priceRange === '500000+') {
            filtered = filtered.filter(h => h.price > 500000);
        }
    }
    
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(house => 
            house.title.toLowerCase().includes(searchTerm) ||
            house.locationName.toLowerCase().includes(searchTerm)
        );
    }
    
    currentHouses = filtered;
    displayHouses(currentHouses);
}

// ============================================
// NAVIGATION
// ============================================
function viewHouse(id) {
    const card = event.currentTarget;
    card.style.transform = 'scale(0.98)';
    
    setTimeout(() => {
        localStorage.setItem('rentdirect_viewing', id);
        window.location.href = 'listing.html';
    }, 150);
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('listingsGrid')) {
        displayHouses(houses);
    }
});