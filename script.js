document.addEventListener('DOMContentLoaded', function() {
    // Add animation to elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all position elements
    document.querySelectorAll('.position').forEach(position => {
        observer.observe(position);
        
        // Add click event to expand/collapse details
        position.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
    });
    
    // Add hover effect to profile image
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05) rotate(5deg)';
        });
        
        profileImg.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Add typing effect to the main heading
    const heading = document.querySelector('h1');
    if (heading) {
        const text = heading.textContent;
        heading.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }
});

// Add some CSS animations
document.head.insertAdjacentHTML('beforeend', `
<style>
    .position {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease;
    }
    
    .position.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .position.expanded {
        padding: 2rem;
        background-color: #f0f7ff;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .profile {
        animation: fadeIn 1s ease;
    }
</style>
`);
