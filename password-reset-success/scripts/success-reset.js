// success-reset.js

document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // 1. THEME TOGGLE FUNCTIONALITY
    // ============================================
    const themeToggle = document.getElementById('checkbox');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    // If there's a saved theme, apply it
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            themeToggle.checked = true;
        }
    } else {
        // If no saved preference, check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            htmlElement.setAttribute('data-theme', 'dark');
            themeToggle.checked = true;
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // ============================================
    // 2. LOGIN BUTTON FUNCTIONALITY
    // ============================================
    const loginBtn = document.getElementById('loginBtn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            // Redirect to login page (update the URL as needed)
            window.location.href = './login.html';
        });
        
        // Add keyboard support (Enter key)
        loginBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // ============================================
    // 3. SUCCESS ANIMATION (OPTIONAL ENHANCEMENT)
    // ============================================
    // Ensure checkmark animation plays on page load
    const checkmark = document.querySelector('.success-icon-check');
    if (checkmark) {
        // Reset animation if it needs to replay
        checkmark.style.animation = 'none';
        requestAnimationFrame(() => {
            checkmark.style.animation = 'checkDraw 0.3s ease-in-out 0.4s both';
        });
    }
    
    // ============================================
    // 4. ADDITIONAL: HOVER SOUND EFFECT (OPTIONAL)
    // ============================================
    // Uncomment below if you want to add subtle sound feedback
    /*
    const btn = document.querySelector('.success-btn');
    btn?.addEventListener('mouseenter', () => {
        // Play a subtle click sound if needed
    });
    */
    
    // ============================================
    // 5. CONSOLE LOG FOR DEBUGGING (REMOVE IN PRODUCTION)
    // ============================================
    console.log('✅ Password reset success page loaded.');
    console.log(`🌓 Current theme: ${htmlElement.getAttribute('data-theme') || 'light'}`);
});