// At the TOP of app.js, add this:
// Save sample data to localStorage on first load
if (!localStorage.getItem('rentdirect_houses')) {
    localStorage.setItem('rentdirect_houses', JSON.stringify(houses));
}

// Sample house data (in real app, this comes from localStorage)
let houses = [
    {
        id: 1,
        title: "Spacious 2 Bedroom Apartment",
        location: "yaba",
        locationName: "Yaba, Lagos",
        price: 350000,
        bedrooms: 2,
        bathrooms: 2,
        features: ["Parking", "Security", "Water"],
        image: "https://via.placeholder.com/400x300?text=House+1",
        contactName: "Mr. Ade",
        contactPhone: "08012345678",
        contactWhatsapp: "2348012345678",
        description: "Clean 2 bedroom flat close to university. Direct owner, no agent fee."
    },
    {
        id: 2,
        title: "Self-Contained Studio",
        location: "ikeja",
        locationName: "Ikeja, Lagos",
        price: 180000,
        bedrooms: 1,
        bathrooms: 1,
        features: ["Prepaid Meter", "Fenced"],
        image: "https://via.placeholder.com/400x300?text=House+2",
        contactName: "Mrs. Okon",
        contactPhone: "08087654321",
        contactWhatsapp: "2348087654321",
        description: "Affordable self-contained for working professional."
    },
    {
        id: 3,
        title: "3 Bedroom Duplex",
        location: "lekki",
        locationName: "Lekki Phase 1",
        price: 750000,
        bedrooms: 3,
        bathrooms: 3,
        features: ["Pool", "Gym", "24/7 Power"],
        image: "https://via.placeholder.com/400x300?text=House+3",
        contactName: "Mr. Johnson",
        contactPhone: "07011223344",
        contactWhatsapp: "2347011223344",
        description: "Luxury duplex in gated estate. Direct from owner."
    }
];

// Load houses from localStorage if available
function loadHouses() {
    const stored = localStorage.getItem('rentdirect_houses');
    if (stored) {
        houses = JSON.parse(stored);
    }
    displayHouses(houses);
}

// Display houses in grid
function displayHouses(housesToShow) {
    const grid = document.getElementById('listingsGrid');
    const count = document.getElementById('listingCount');
    
    count.textContent = `(${housesToShow.length})`;
    
    if (housesToShow.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No houses found. Try different filters.</p>';
        return;
    }
    
    grid.innerHTML = housesToShow.map(house => `
        <div class="house-card" onclick="viewHouse(${house.id})">
            <div class="house-image">
                <img src="${house.image}" alt="${house.title}" style="width: 100%; height: 100%; object-fit: cover;">
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

// Filter houses
function filterHouses() {
    const location = document.getElementById('locationFilter').value;
    const priceRange = document.getElementById('priceFilter').value;
    
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

// View single house (redirect to details)
function viewHouse(id) {
    localStorage.setItem('rentdirect_viewing', id);
    window.location.href = 'listing.html';
}

// Initialize
document.addEventListener('DOMContentLoaded', loadHouses);