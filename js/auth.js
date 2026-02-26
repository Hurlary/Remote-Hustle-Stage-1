// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('rentdirect_user');
    return user ? JSON.parse(user) : null;
}

// Handle Registration
function handleRegister(event) {
    event.preventDefault();
    
    const user = {
        id: Date.now(),
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        userType: document.getElementById('userType').value,
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('rentdirect_user', JSON.stringify(user));
    window.location.href = 'account.html';
}

// Handle Login
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    
    const user = {
        id: Date.now(),
        fullName: email.split('@')[0],
        email: email,
        userType: 'landlord',
        loggedInAt: new Date().toISOString()
    };
    
    localStorage.setItem('rentdirect_user', JSON.stringify(user));
    
    // Check for redirect
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    
    window.location.href = redirect || 'account.html';
}

// Logout
function logout() {
    localStorage.removeItem('rentdirect_user');
    window.location.href = 'index.html';
}

// Update Header Auth Buttons
function updateHeaderAuth() {
    const user = checkAuth();
    const authContainer = document.getElementById('headerAuth');
    
    if (!authContainer) return;
    
    if (user) {
        // User logged in
        authContainer.innerHTML = `
            <span style="color: var(--text-dark); font-weight: 600;">👤 ${user.fullName}</span>
            <a href="account.html" style="padding: 10px 20px; background: var(--text-dark); color: var(--primary); text-decoration: none; border-radius: 8px; font-weight: 600;">My Account</a>
            <button onclick="logout()" style="padding: 10px 20px; background: transparent; border: 2px solid var(--text-dark); color: var(--text-dark); border-radius: 8px; cursor: pointer; font-weight: 600;">Logout</button>
        `;
    } else {
        // User not logged in
        authContainer.innerHTML = `
            <a href="login.html" style="padding: 10px 24px; border: 2px solid var(--text-dark); color: var(--text-dark); text-decoration: none; border-radius: 8px; font-weight: 600;">Login</a>
            <a href="register.html" style="padding: 10px 24px; background: var(--text-dark); color: var(--primary); text-decoration: none; border-radius: 8px; font-weight: 600;">Sign Up</a>
        `;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateHeaderAuth();
});