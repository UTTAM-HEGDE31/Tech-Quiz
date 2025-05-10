// Check if user is logged in
function checkAuthStatus() {
    const user = JSON.parse(localStorage.getItem('user'));
    const authButtons = document.getElementById('auth-buttons');
    const userProfile = document.getElementById('user-profile');
    const userName = document.getElementById('user-name');

    if (user && user.isLoggedIn) {
        // User is logged in
        authButtons.classList.add('d-none');
        userProfile.classList.remove('d-none');
        userName.textContent = user.name || user.email;
    } else {
        // User is not logged in
        authButtons.classList.remove('d-none');
        userProfile.classList.add('d-none');
    }
}

// Handle logout
function handleLogout() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        user.isLoggedIn = false;
        localStorage.setItem('user', JSON.stringify(user));
    }
    window.location.href = 'index.html';
}

// Toggle dropdown menu
function toggleDropdown() {
    const dropdownMenu = document.querySelector('.dropdown-menu');
    dropdownMenu.classList.toggle('show');
}

// Close dropdown when clicking outside
function closeDropdown(event) {
    const dropdown = document.querySelector('.dropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    if (!dropdown.contains(event.target)) {
        dropdownMenu.classList.remove('show');
    }
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check auth status
    checkAuthStatus();

    // Add click event listener to user profile button
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) {
        userDropdown.addEventListener('click', (e) => {
            e.preventDefault();
            toggleDropdown();
        });
    }

    // Add click event listener to logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', closeDropdown);
}); 