function saveListing(event) {
    event.preventDefault();
    
    // Get logged in user
    const user = localStorage.getItem('rentdirect_user');
    const userData = user ? JSON.parse(user) : null;
    
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
    
    // Location names
    const locationNames = {
        'lagos-island': 'Lagos Island',
        'ikeja': 'Ikeja, Lagos',
        'yaba': 'Yaba, Lagos',
        'lekki': 'Lekki, Lagos',
        'abuja': 'Abuja',
        'other': 'Other Location'
    };
    
    // Create new house
    const newHouse = {
        id: Date.now(),
        title: title,
        location: location,
        locationName: locationNames[location] || location,
        price: price,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        features: features,
        image: image || "https://via.placeholder.com/400x300?text=RentDirect&bg=ffcab2&fg=1e1a18",
        contactName: contactName,
        contactPhone: contactPhone,
        contactWhatsapp: contactWhatsapp,
        description: description,
        listedBy: userData ? userData.email : 'guest',
        listedAt: new Date().toISOString()
    };
    
    // Save to localStorage
    const existingHouses = JSON.parse(localStorage.getItem('rentdirect_houses')) || [];
    existingHouses.push(newHouse);
    localStorage.setItem('rentdirect_houses', JSON.stringify(existingHouses));
    
    // Show success
    document.getElementById('successModal').style.display = 'block';
    document.getElementById('listingForm').reset();
}