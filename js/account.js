// ============================================
// ACCOUNT DASHBOARD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Check auth
    const user = checkAuth();
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Update welcome message
    document.getElementById('welcomeName').textContent = `Welcome, ${user.fullName}!`;
    
    // Load user's listings
    loadMyListings(user);
});

function loadMyListings(user) {
    const allHouses = JSON.parse(localStorage.getItem('rentdirect_houses')) || [];
    
    // For soft auth, we'll show houses where contact email matches
    // In real app, this would filter by user_id
    const myHouses = allHouses.filter(h => 
        h.contactPhone === user.phone || 
        h.contactName.includes(user.fullName.split(' ')[0])
    );
    
    // Update stats
    document.getElementById('listingCount').textContent = myHouses.length;
    document.getElementById('viewCount').textContent = myHouses.length * 12; // Fake view count
    
    // Display listings
    const container = document.getElementById('myListings');
    
    if (myHouses.length === 0) {
        container.innerHTML = `
            <div class="empty-listings">
                <div class="empty-listings-icon">🏠</div>
                <h3>No listings yet</h3>
                <p>You haven't added any properties. Start by adding your first listing!</p>
                <a href="add-listing.html" class="btn-add">Add Your First House</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = myHouses.map(house => `
        <div class="house-card" style="margin-bottom: 1.5rem;">
            <div style="display: grid; grid-template-columns: 150px 1fr auto; gap: 1rem; padding: 1rem;">
                <img src="${house.image}" style="width: 150px; height: 100px; object-fit: cover; border-radius: 8px;">
                <div>
                    <h4>${house.title}</h4>
                    <p style="color: var(--text-light); font-size: 0.9rem;">📍 ${house.locationName}</p>
                    <p style="color: var(--primary-darker); font-weight: bold;">₦${house.price.toLocaleString()}/year</p>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <button onclick="viewHouse(${house.id})" class="btn-add" style="font-size: 0.85rem;">View</button>
                    <button onclick="deleteListing(${house.id})" class="btn-logout" style="font-size: 0.85rem;">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
}

function deleteListing(id) {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    
    let houses = JSON.parse(localStorage.getItem('rentdirect_houses')) || [];
    houses = houses.filter(h => h.id !== id);
    localStorage.setItem('rentdirect_houses', JSON.stringify(houses));
    
    // Reload page
    location.reload();
}
// Add this function to account.js
function viewHouse(id) {
    localStorage.setItem('rentdirect_viewing', id);
    window.location.href = 'listing.html';
}