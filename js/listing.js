// Load and display single listing
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
            <div class="loading-detail">
                <h3>Listing not found</h3>
                <p><a href="index.html">← Back to listings</a></p>
            </div>
        `;
        return;
    }
    
    displayListing(house);
}

function displayListing(house) {
    const content = document.getElementById('listingContent');
    
    content.innerHTML = `
        <div class="listing-header">
            <h1 class="listing-title">${house.title}</h1>
            <p class="listing-location">📍 ${house.locationName}</p>
        </div>
        
        <div class="image-gallery">
            ${house.image ? 
                `<img src="${house.image}" alt="${house.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                 <div class="image-placeholder" style="display: none;">🏠 No Image Available</div>` :
                `<div class="image-placeholder">🏠 No Image Available</div>`
            }
            <div class="price-badge">
                ₦${house.price.toLocaleString()}
                <span>per year</span>
            </div>
        </div>
        
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

// Modal Functions
function openContactModal(whatsapp, phone) {
    const modal = document.getElementById('contactModal');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const phoneBtn = document.getElementById('phoneBtn');
    
    // Set WhatsApp link
    const message = encodeURIComponent("Hi! I saw your house listing on RentDirect and I'm interested. Is it still available?");
    whatsappBtn.href = `https://wa.me/${whatsapp}?text=${message}`;
    
    // Set Phone link
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