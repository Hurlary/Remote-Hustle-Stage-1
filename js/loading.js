// Show loading while page loads
document.addEventListener('DOMContentLoaded', function() {
    // Remove any existing loaders
    const existingLoader = document.querySelector('.page-loader');
    if (existingLoader) {
        existingLoader.style.opacity = '0';
        setTimeout(() => existingLoader.remove(), 300);
    }
});