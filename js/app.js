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
        contactName: "Mr. Johnson",
        contactPhone: "07011223344",
        contactWhatsapp: "2347011223344",
        description: "Luxury duplex in gated estate. Direct from owner. Perfect for families."
    },
    {
        id: 4,
        title: "1 Bedroom Mini Flat",
        location: "lagos-island",
        locationName: "Lagos Island",
        price: 250000,
        bedrooms: 1,
        bathrooms: 1,
        features: ["Water Heater", "Kitchen Cabinets"],
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400",
        contactName: "Alhaji Musa",
        contactPhone: "08033334444",
        contactWhatsapp: "2348033334444",
        description: "Compact mini flat in central location. Close to business district."
    }
];

// ============================================
// INITIALIZE DATA
// ============================================
function initializeData() {
    // Check if we already have data in localStorage
    const stored = localStorage.getItem('rentdirect_houses');
    
    if (!stored) {
        // First time - save sample data
        localStorage.setItem('rentdirect_houses', JSON.stringify(sampleHouses));
        return sampleHouses;
    }
    
    // Return stored data
    return JSON.parse(stored);
}

// Global houses array
let houses = initializeData();

// ============================================
// DISPLAY FUNCTIONS
// ============================================
function displayHouses(housesToShow) {
    const grid = document.getElementById('listingsGrid');
    const count = document.getElementById('listingCount');
    
    if (!grid) return; // Only run on index page
    
    count.textContent = `(${housesToShow.length})`;
    
    if (housesToShow.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <h4>No houses found</h4>
                <p>Try different filters or <a href="add-listing.html">add a listing</a>.</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = housesToShow.map(house => `
        <div class="house-card" onclick="viewHouse(${house.id})">
            <div class="house-image">
                <img src="${house.image}" alt="${house.title}" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
            </div>
            <div class="house-info">
                <div class="house-price">₦${house.price.toLocaleString()}/year</div>
                <h4>${house.title}</h4>
                <p class="house-location">📍 ${house.locationName}</p>
                <div class="house-features">
                    <span>🛏️ ${house.bedrooms} bed</span>
                    <span>🚿 ${house.bathrooms} bath</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// FILTER FUNCTIONS
// ============================================
function filterHouses() {
    const location = document.getElementById('locationFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    
    // Refresh houses from localStorage
    houses = JSON.parse(localStorage.getItem('rentdirect_houses')) || sampleHouses;
    
    let filtered = houses;
    
    // Filter by location
    if (location) {
        filtered = filtered.filter(h => h.location === location);
    }
    
    // Filter by price
    if (priceRange) {
        if (priceRange === '0-200000') {
            filtered = filtered.filter(h => h.price <= 200000);
        } else if (priceRange === '200000-500000') {
            filtered = filtered.filter(h => h.price > 200000 && h.price <= 500000);
        } else if (priceRange === '500000+') {
            filtered = filtered.filter(h => h.price > 500000);
        }
    }
    
    displayHouses(filtered);
}

// ============================================
// NAVIGATION
// ============================================
function viewHouse(id) {
    localStorage.setItem('rentdirect_viewing', id);
    window.location.href = 'listing.html';
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Only run on index page
    if (document.getElementById('listingsGrid')) {
        displayHouses(houses);
    }
});