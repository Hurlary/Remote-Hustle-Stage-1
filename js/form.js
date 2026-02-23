function saveListing(event) {
    event.preventDefault();
    
    // Check if user is logged in
    const user = checkAuth();
    
    // Get form values...
    // [existing code]
    
    // Create new house object - add user info if logged in
    const newHouse = {
        id: Date.now(),
        // ... existing fields ...
        listedBy: user ? user.email : 'guest',
        listedAt: new Date().toISOString()
    };
    
    // ... rest of save code
}

// ============================================
// SAVE NEW LISTING
// ============================================
function saveListing(event) {
    event.preventDefault();
    
    // Get form values
    const title = document.getElementById('title').value.trim();
    const location = document.getElementById('location').value;
    const price = parseInt(document.getElementById('price').value);
    const bedrooms = parseInt(document.getElementById('bedrooms').value);
    const bathrooms = parseInt(document.getElementById('bathrooms').value);
    const image = document.getElementById('image').value.trim();
    const description = document.getElementById('description').value.trim();
    const contactName = document.getElementById('contactName').value.trim();
    const contactPhone = document.getElementById('contactPhone').value.trim();
    const contactWhatsapp = document.getElementById('contactWhatsapp').value.trim();
    
    // Get selected features
    const featureCheckboxes = document.querySelectorAll('.checkbox-group input:checked');
    const features = Array.from(featureCheckboxes).map(cb => cb.value);
    
    // Get location name
    const locationNames = {
        'lagos-island': 'Lagos Island',
        'ikeja': 'Ikeja, Lagos',
        'yaba': 'Yaba, Lagos',
        'lekki': 'Lekki, Lagos',
        'abuja': 'Abuja',
        'other': 'Other Location'
    };
    
    // Create new house object
    const newHouse = {
        id: Date.now(), // Unique ID based on timestamp
        title: title,
        location: location,
        locationName: locationNames[location] || location,
        price: price,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        features: features,
        image: image || "https://via.placeholder.com/400x300?text=No+Image",
        contactName: contactName,
        contactPhone: contactPhone,
        contactWhatsapp: contactWhatsapp,
        description: description
    };
    
    // Get existing houses
    const existingHouses = JSON.parse(localStorage.getItem('rentdirect_houses')) || [];
    
    // Add new house
    existingHouses.push(newHouse);
    
    // Save back to localStorage
    localStorage.setItem('rentdirect_houses', JSON.stringify(existingHouses));
    
    // Show success modal
    document.getElementById('successModal').style.display = 'block';
    
    // Reset form
    document.getElementById('listingForm').reset();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}