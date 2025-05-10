// document.addEventListener('DOMContentLoaded', function() {
//     const signupForm = document.getElementById('signupForm');
//     const signupBtn = document.getElementById('signupBtn');
//     const togglePassword = document.getElementById('togglePassword');
//     const passwordInput = document.getElementById('password');
//     const strengthBar = document.querySelector('.strength-bar');
//     const strengthText = document.querySelector('.strength-text span');

//     // Password visibility toggle
//     togglePassword.addEventListener('click', function() {
//         const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
//         passwordInput.setAttribute('type', type);
//         this.querySelector('i').classList.toggle('fa-eye-slash');
//     });

//     // Form submission
//     signupForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
        
//         const name = document.getElementById('name').value;
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         const confirmPassword = document.getElementById('confirmPassword').value;
        
//         // Validate passwords match
//         if (password !== confirmPassword) {
//             alert('Passwords do not match!');
//             return;
//         }

//         // Show loading state
//         signupBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating account...';
//         signupBtn.disabled = true;
        
//         try {
//             // Here you would typically make an API call to your backend
//             // For now, we'll simulate a successful signup
//             const userData = {
//                 name: name,
//                 email: email,
//                 isLoggedIn: true, // Add this flag to indicate user is logged in
//                 // In a real application, you would never store the password in localStorage
//                 // This is just for demonstration
//             };
            
//             // Store user data in localStorage
//             localStorage.setItem('user', JSON.stringify(userData));
            
//             // Show success message
//             alert('Account created successfully!');
            
//             // Redirect to home page
//             window.location.href = 'index.html';
//         } catch (error) {
//             console.error('Signup failed:', error);
//             alert('Signup failed. Please try again.');
//             // Reset button state
//             signupBtn.innerHTML = 'Create Account';
//             signupBtn.disabled = false;
//         }
//     });

// });

document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    try {
        // Here you would typically make an API call to your backend
        // For now, we'll simulate a successful signup
        const userData = {
            name: name,
            email: email,
            isLoggedIn: true // Add this flag to indicate user is logged in
        };
        
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Show success message
        alert('Account created successfully!');
        
        // Redirect to home page
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Signup failed:', error);
        alert('Signup failed. Please try again.');
    }
}); 