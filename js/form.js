// ============================================
// PROTECT ADD LISTING PAGE - LOGIN REQUIRED
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const user = localStorage.getItem('rentdirect_user');
    
    // If not logged in, redirect to login
    if (!user) {
        alert('Please login to add a listing.');
        window.location.href = 'login.html?redirect=add-listing.html';
        return;
    }
});

// ============================================
// PHOTO PREVIEW FUNCTIONS
// ============================================

// Preview photo as user types
function previewPhoto(num, url) {
    const previewDiv = document.getElementById(`preview${num}`);
    const previewImg = previewDiv.querySelector('img');
    
    if (!url) {
        previewDiv.style.display = 'none';
        return;
    }
    
    previewImg.src = url;
    previewImg.onerror = function() {
        this.src = 'https://via.placeholder.com/400x300?text=Invalid+Image&bg=ffcab2&fg=1e1a18';
    };
    previewDiv.style.display = 'block';
}

// Get all photos array
function getPhotos() {
    const photos = [];
    const img1 = document.getElementById('image1').value.trim();
    const img2 = document.getElementById('image2').value.trim();
    const img3 = document.getElementById('image3').value.trim();
    
    if (img1) photos.push(img1);
    if (img2) photos.push(img2);
    if (img3) photos.push(img3);
    
    return photos;
}

function saveListing(event) {
    event.preventDefault();
    
    // Get logged in user
    const userData = JSON.parse(localStorage.getItem('rentdirect_user') || '{}');
    
    // Redirect if not logged in
    if (!userData.email) {
        alert('Please login to add a listing.');
        window.location.href = 'login.html';
        return;
    }
    
    // Get form values
    const title = document.getElementById('title').value.trim();
    const location = document.getElementById('location').value;
    const price = parseInt(document.getElementById('price').value);
    const bedrooms = parseInt(document.getElementById('bedrooms').value);
    const bathrooms = parseInt(document.getElementById('bathrooms').value);
    const description = document.getElementById('description').value.trim();
    const contactName = document.getElementById('contactName').value.trim();
    const contactPhone = document.getElementById('contactPhone').value.trim();
    const contactWhatsapp = document.getElementById('contactWhatsapp').value.trim();
    
    // Get photos
    const photos = getPhotos();
    
    // Get selected features
    const featureCheckboxes = document.querySelectorAll('.checkbox-group input:checked');
    const features = Array.from(featureCheckboxes).map(cb => cb.value);
    
    // Location names
    const locationNames = {
        'abia': 'Abia', 'adamawa': 'Adamawa', 'akwa-ibom': 'Akwa Ibom', 'anambra': 'Anambra',
        'bauchi': 'Bauchi', 'bayelsa': 'Bayelsa', 'benue': 'Benue', 'borno': 'Borno',
        'cross-river': 'Cross River', 'delta': 'Delta', 'ebonyi': 'Ebonyi', 'edo': 'Edo',
        'ekiti': 'Ekiti', 'enugu': 'Enugu', 'gombe': 'Gombe', 'imo': 'Imo',
        'jigawa': 'Jigawa', 'kaduna': 'Kaduna', 'kano': 'Kano', 'katsina': 'Katsina',
        'kebbi': 'Kebbi', 'kogi': 'Kogi', 'kwara': 'Kwara', 'lagos': 'Lagos',
        'nasarawa': 'Nasarawa', 'niger': 'Niger', 'ogun': 'Ogun', 'ondo': 'Ondo',
        'osun': 'Osun', 'oyo': 'Oyo', 'plateau': 'Plateau', 'rivers': 'Rivers',
        'sokoto': 'Sokoto', 'taraba': 'Taraba', 'yobe': 'Yobe', 'zamfara': 'Zamfara',
        'fct': 'FCT (Abuja)'
    };
    
    // Create new house object
    const newHouse = {
        id: Date.now(),
        title: title,
        location: location,
        locationName: locationNames[location] || location,
        price: price,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        features: features,
        images: photos,
        image: photos[0] || "https://via.placeholder.com/400x300?text=RentDirect&bg=ffcab2&fg=1e1a18",
        contactName: contactName,
        contactPhone: contactPhone,
        contactWhatsapp: contactWhatsapp,
        description: description,
        // CRITICAL: Link to user email for dashboard
        listedBy: userData.email,
        listedByName: userData.fullName,
        listedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const existingHouses = JSON.parse(localStorage.getItem('rentdirect_houses')) || [];
    existingHouses.push(newHouse);
    localStorage.setItem('rentdirect_houses', JSON.stringify(existingHouses));
    
    // Show success
    document.getElementById('successModal').style.display = 'block';
    document.getElementById('listingForm').reset();
    
    // Hide all previews
    for (let i = 1; i <= 3; i++) {
        const preview = document.getElementById(`preview${i}`);
        if (preview) preview.style.display = 'none';
    }
}