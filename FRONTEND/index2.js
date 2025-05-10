document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const loginBtn = document.getElementById('loginBtn');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate loading
        loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Logging in...';
        loginBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Replace with actual login logic
            alert('Login successful! (This is a demo)');
            loginBtn.innerHTML = 'Login';
            loginBtn.disabled = false;
        }, 2000);
    });

    // Add pulse animation to social buttons
    const socialBtns = document.querySelectorAll('.btn-social');
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.animation = 'pulse 0.5s ease';
        });
        btn.addEventListener('animationend', () => {
            btn.style.animation = '';
        });
    });
});