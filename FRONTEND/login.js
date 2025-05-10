document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        // Here you would typically make an API call to your backend
        // For now, we'll simulate a successful login
        const userData = {
            email: email,
            name: email.split('@')[0], // Using email username as display name
            isLoggedIn: true // Add this flag to indicate user is logged in
        };
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Redirect to home page
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
    }
}); 