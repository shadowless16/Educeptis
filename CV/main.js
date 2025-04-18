document.addEventListener('DOMContentLoaded', function() {
    // Color picker functionality
    const colorButtons = document.querySelectorAll('.color-button');
    const primaryElements = document.querySelectorAll('.profile-name, .section-title, .section-card h3');
    const primaryBgElements = document.querySelectorAll('.primary-button');
    const borderElements = document.querySelectorAll('.secondary-button, .experience-item, .experience-dot, .skill-bar');
    
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            document.documentElement.style.setProperty('--primary-color', color);
            
            // Update border pulse animation for profile image
            updateBorderPulseAnimation(color);
        });
    });

    function updateBorderPulseAnimation(color) {
        // Convert hex to RGB for the animation
        const rgb = hexToRgb(color);
        
        // Create a new style element
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
            @keyframes borderPulse {
                0% { box-shadow: 0 0 0 0 rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4); }
                70% { box-shadow: 0 0 0 15px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0); }
                100% { box-shadow: 0 0 0 0 rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0); }
            }
        `;
        
        // Remove any existing animation style
        const existingStyle = document.getElementById('pulse-animation');
        if (existingStyle) {
            existingStyle.remove();
        }
        
        // Add the new style element
        styleElement.id = 'pulse-animation';
        document.head.appendChild(styleElement);
    }

    function hexToRgb(hex) {
        // Remove # if present
        hex = hex.replace('#', '');
        
        // Parse the hex values
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        
        return { r, g, b };
    }

    // Intersection Observer for skill bars
    const skillsSection = document.getElementById('skills-section');
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                });
                // Once the animation is triggered, disconnect the observer
                observer.disconnect();
            }
        });
    }, { threshold: 0.1 });
    
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Add slide-in animation to elements when they come into view
    const animateElements = document.querySelectorAll('.card, .section-card');
    
    const slideObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-in');
                slideObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    animateElements.forEach(element => {
        slideObserver.observe(element);
    });
});