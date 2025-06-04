// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dropdown
    const dropdown = document.querySelector('.dropdown-content');
    const toggle = document.querySelector('.dropdown-toggle');
    
    // Only set up dropdown if elements exist
    if (dropdown && toggle) {
        // Initialize dropdown in closed state
        dropdown.style.transform = 'translateX(100%)';
        
        // Set up click event for dropdown toggle
        toggle.addEventListener('click', function() {
            dropdown.classList.toggle('active');
            toggle.classList.toggle('active');
            toggle.querySelector('i').classList.toggle('fa-chevron-left');
            toggle.querySelector('i').classList.toggle('fa-chevron-right');
            
            if (dropdown.classList.contains('active')) {
                dropdown.style.transform = 'translateX(0)';
            } else {
                dropdown.style.transform = 'translateX(100%)';
            }
        });
        
        // Optional: Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.details') && 
                !e.target.closest('.dropdown-toggle') && 
                dropdown.classList.contains('active')) {
                
                dropdown.classList.remove('active');
                toggle.classList.remove('active');
                toggle.querySelector('i').classList.remove('fa-chevron-right');
                toggle.querySelector('i').classList.add('fa-chevron-left');
                dropdown.style.transform = 'translateX(100%)';
            }
        });
    }
    
    // Theme toggle setup
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Footer behavior
    initFooterBehavior();
});

// Theme toggle function
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById("theme-icon");
debugger
    // Get current theme or default to light
    let currentTheme = localStorage.getItem("theme") || "light";

    // Toggle between light and dark
    if (currentTheme === "light") {
        debugger
        body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark"); // Save user preference
        themeIcon.classList.replace("fas fa-moon", "fas fa-sun"); // Change to sun icon
    } else {
        body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        themeIcon.classList.replace("fas fa-sun", " fas fa-moon"); // Change to moon icon
    }
}
document.addEventListener("DOMContentLoaded", function () {
    debugger
    const body = document.body;
    const themeIcon = document.getElementById("theme-icon");
    let savedTheme = localStorage.getItem("theme") || "light";

    // Apply saved theme
    body.setAttribute("data-theme", savedTheme);

    // Set correct icon based on theme
    if (savedTheme === "light") {
        themeIcon.classList.replace("fa-sun", "fa-moon");
    } else {
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }
});
// Initialize footer behavior
function initFooterBehavior() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    
    let isVisible = true; // Track footer visibility
    
    // Create trigger zone at bottom of screen
    const trigger = document.createElement('div');
    trigger.className = 'footer-trigger';
    document.body.appendChild(trigger);
    
    // Hide footer when clicking anywhere on page, BUT ONLY if not at bottom of page
    document.addEventListener('click', function(e) {
        // Check if we're at the bottom of the page
        const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20;
        
        // Don't hide if clicking the footer itself, the trigger, or if at bottom of page
        if (!footer.contains(e.target) && !trigger.contains(e.target) && !isAtBottom) {
            footer.classList.add('hidden');
            isVisible = false;
        }
    });
    
    // Show footer when mouse enters trigger zone
    trigger.addEventListener('mouseenter', function() {
        footer.classList.remove('hidden');
        isVisible = true;
    });
    
    // Handle scroll events to show footer at bottom of page
    window.addEventListener('scroll', function() {
        // Check if we're at the bottom of the page
        const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 20;
        
        if (isAtBottom) {
            // Always show footer at bottom of page
            footer.classList.remove('hidden');
            isVisible = true;
        }
    });
    
    // For touch devices - show footer when touching near bottom
    document.addEventListener('touchmove', function(e) {
        const touch = e.touches[0];
        const windowHeight = window.innerHeight;
        
        if (windowHeight - touch.clientY < 30) { // Within 30px of bottom
            footer.classList.remove('hidden');
            isVisible = true;
        }
    });
    
    // Initialize - make sure the footer is visible at start
    footer.classList.remove('hidden');
}
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
});

document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
