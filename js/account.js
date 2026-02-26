// ============================================
// ACCOUNT DASHBOARD
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Check auth
    const user = JSON.parse(localStorage.getItem('rentdirect_user') || '{}');
    if (!user.email) {
        window.location.href = 'login.html';
        return;
    }
    
    // Update welcome message
    document.getElementById('welcomeName').textContent = `Welcome, ${user.fullName || 'User'}!`;
    
    // Load user's listings
    loadMyListings(user);
});

function loadMyListings(user) {
    const allHouses = JSON.parse(localStorage.getItem('rentdirect_houses')) || [];
    
    // Filter houses by logged-in user's email
    // This ensures users see ONLY their own listings
    const myHouses = allHouses.filter(h => h.listedBy === user.email);
    
    // Update stats
    document.getElementById('listingCount').textContent = myHouses.length;
    document.getElementById('viewCount').textContent = myHouses.length * 12;
    
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
    
    container.innerHTML = myHouses.map(house => {
        const mainImage = house.images && house.images.length > 0 
            ? house.images[0] 
            : house.image;
        
        return `
        <div class="house-card" style="margin-bottom: 1.5rem;">
            <div style="display: grid; grid-template-columns: 150px 1fr auto; gap: 1rem; padding: 1rem; align-items: center;">
                <img src="${mainImage}" style="width: 150px; height: 100px; object-fit: cover; border-radius: 8px;" onerror="this.src='https://via.placeholder.com/400x300?text=RentDirect&bg=ffcab2&fg=1e1a18'">
                <div>
                    <h4>${house.title}</h4>
                    <p style="color: var(--text-light); font-size: 0.9rem;">📍 ${house.locationName}</p>
                    <p style="color: var(--primary-darker); font-weight: bold;">₦${house.price.toLocaleString()}/year</p>
                    <p style="font-size: 0.8rem; color: var(--text-light); margin-top: 0.3rem;">
                        Added: ${new Date(house.listedAt).toLocaleDateString()}
                    </p>
                </div>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <button onclick="viewHouse(${house.id})" class="btn-add" style="font-size: 0.85rem;">View</button>
                    <button onclick="deleteListing(${house.id})" class="btn-logout" style="font-size: 0.85rem;">Delete</button>
                </div>
            </div>
        </div>
    `}).join('');
}

function deleteListing(id) {
    if (!confirm('Are you sure you want to delete this listing?')) return;
    
    const user = JSON.parse(localStorage.getItem('rentdirect_user') || '{}');
    let houses = JSON.parse(localStorage.getItem('rentdirect_houses')) || [];
    
    // Only delete if it belongs to current user
    houses = houses.filter(h => !(h.id === id && h.listedBy === user.email));
    localStorage.setItem('rentdirect_houses', JSON.stringify(houses));
    
    // Reload page
    location.reload();
}

function viewHouse(id) {
    localStorage.setItem('rentdirect_viewing', id);
    window.location.href = 'listing.html';
}