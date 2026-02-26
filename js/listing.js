// ============================================
// LISTING DETAIL PAGE
// ============================================

let currentImages = [];
let currentImageIndex = 0;

document.addEventListener('DOMContentLoaded', function() {
    const listingId = localStorage.getItem('rentdirect_viewing');
    
    if (!listingId) {
        window.location.href = 'index.html';
        return;
    }
    
    loadListingDetail(parseInt(listingId));
});

function loadListingDetail(id) {
    const houses = JSON.parse(localStorage.getItem('rentdirect_houses')) || [];
    const house = houses.find(h => h.id === id);
    
    if (!house) {
        document.getElementById('listingContent').innerHTML = `
            <div class="loading-detail" style="text-align: center; padding: 4rem;">
                <h3>Listing not found</h3>
                <p>The house may have been removed.</p>
                <p><a href="index.html" style="color: #ffcab2; font-weight: bold;">← Back to all listings</a></p>
            </div>
        `;
        return;
    }
    
    displayListing(house);
}

function displayListing(house) {
    const content = document.getElementById('listingContent');
    
    // Get images array (handle old and new format)
    currentImages = house.images && house.images.length > 0 
        ? house.images 
        : [house.image || "https://via.placeholder.com/400x300?text=RentDirect&bg=ffcab2&fg=1e1a18"];
    
    currentImageIndex = 0;
    
    // Build photo gallery
    let photoGalleryHTML = '';
    
    if (currentImages.length === 1) {
        // Single photo
        photoGalleryHTML = `
            <div class="single-photo">
                <img src="${currentImages[0]}" alt="${house.title}" onerror="this.src='https://via.placeholder.com/400x300?text=RentDirect&bg=ffcab2&fg=1e1a18'">
            </div>
        `;
    } else {
        // Multiple photos with gallery
        photoGalleryHTML = `
            <div class="photo-gallery">
                <div class="main-photo">
                    <img id="mainImage" src="${currentImages[0]}" alt="${house.title}" onerror="this.src='https://via.placeholder.com/400x300?text=RentDirect&bg=ffcab2&fg=1e1a18'">
                    <div class="price-badge">${house.price.toLocaleString()}<span>per year</span></div>
                </div>
                <div class="photo-thumbnails">
                    ${currentImages.map((img, idx) => `
                        <div class="thumbnail ${idx === 0 ? 'active' : ''}" onclick="changeImage(${idx})">
                            <img src="${img}" alt="Photo ${idx + 1}" onerror="this.src='https://via.placeholder.com/400x300?text=RentDirect&bg=ffcab2&fg=1e1a18'">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    content.innerHTML = `
        <div class="listing-header">
            <h1 class="listing-title">${house.title}</h1>
            <p class="listing-location">📍 ${house.locationName}</p>
        </div>
        
        ${photoGalleryHTML}
        
        <div class="info-grid">
            <div class="main-info">
                <div class="info-section">
                    <h3>Description</h3>
                    <p>${house.description || 'No description provided.'}</p>
                </div>
                
                <div class="info-section">
                    <h3>Features</h3>
                    <div class="features-list">
                        <span class="feature-tag">🛏️ ${house.bedrooms} Bedroom${house.bedrooms > 1 ? 's' : ''}</span>
                        <span class="feature-tag">🚿 ${house.bathrooms} Bathroom${house.bathrooms > 1 ? 's' : ''}</span>
                        ${house.features.map(f => `<span class="feature-tag">✓ ${f}</span>`).join('')}
                    </div>
                </div>
                
                <div class="info-section">
                    <h3>Property Details</h3>
                    <p><strong>Listed by:</strong> ${house.contactName}</p>
                    <p><strong>Location:</strong> ${house.locationName}</p>
                    <p><strong>Available:</strong> Immediately</p>
                    ${currentImages.length > 1 ? `<p><strong>Photos:</strong> ${currentImages.length} available</p>` : ''}
                </div>
            </div>
            
            <div class="sidebar">
                <div class="contact-card">
                    <h4>Interested?</h4>
                    <p>Contact ${house.contactName} directly. No agent fees!</p>
                    <button class="btn-contact" onclick="openContactModal('${house.contactWhatsapp}', '${house.contactPhone}')">
                        💬 Contact Now
                    </button>
                </div>
                
                <div class="safety-tips">
                    <h4>⚠️ Safety Tips</h4>
                    <ul>
                        <li>Always inspect the property in person</li>
                        <li>Never pay before seeing the house</li>
                        <li>Meet in public places when possible</li>
                        <li>Verify ownership documents</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// Change main image when thumbnail clicked
function changeImage(index) {
    currentImageIndex = index;
    
    // Update main image
    const mainImg = document.getElementById('mainImage');
    mainImg.src = currentImages[index];
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail').forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === index);
    });
}

// Modal Functions
function openContactModal(whatsapp, phone) {
    const modal = document.getElementById('contactModal');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const phoneBtn = document.getElementById('phoneBtn');
    
    const message = encodeURIComponent("Hi! I saw your house listing on RentDirect and I'm interested. Is it still available?");
    whatsappBtn.href = `https://wa.me/${whatsapp}?text=${message}`;
    phoneBtn.href = `tel:${phone}`;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('contactModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// View house function for account page
function viewHouse(id) {
    localStorage.setItem('rentdirect_viewing', id);
    window.location.href = 'listing.html';
}