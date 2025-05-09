document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    (function() {
        // Replace "your_user_id" with your actual EmailJS user ID
        emailjs.init("hEpQkF0JhxPgVw98f");
    })();
    
    // Add animation to elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all position elements
    document.querySelectorAll('.position').forEach(position => {
        observer.observe(position);
        
        // Add click event to expand/collapse details
        position.addEventListener('click', function() {
            // Close any other expanded positions
            document.querySelectorAll('.position.expanded').forEach(expandedPosition => {
                if (expandedPosition !== this) {
                    expandedPosition.classList.remove('expanded');
                }
            });
            
            this.classList.toggle('expanded');
        });
    });
    
    // Add hover effect to profile image with subtle rotation
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.05) rotate(5deg)';
            this.style.boxShadow = '0 0 30px rgba(157, 78, 221, 0.5)';
        });
        
        profileImg.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 20px rgba(157, 78, 221, 0.3)';
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
    
    // Animate the purple blobs
    const blobs = document.querySelectorAll('.purple-blob');
    blobs.forEach((blob, index) => {
        // Set different animation for each blob
        blob.style.animation = `pulse ${5 + index}s infinite ease-in-out`;
        
        // Add subtle movement on mouse move
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) / (20 + index * 10);
            const moveY = (e.clientY - window.innerHeight / 2) / (20 + index * 10);
            
            blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Contact form submission with EmailJS
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show sending status
            formStatus.textContent = "Sending...";
            formStatus.style.color = "var(--primary-color)";
            formStatus.style.display = "block";
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Prepare template parameters
            const templateParams = {
                from_name: name,
                from_email: email,
                message: message,
                to_email: "arjundixit3508@gmail.com"
            };
            
            // Send email using EmailJS
            emailjs.send('service_vhzyhl9', 'template_ap7m1j8', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    formStatus.textContent = "Message sent successfully!";
                    formStatus.style.color = "#4CAF50";
                    contactForm.reset();
                    
                    // Clear success message after 5 seconds
                    setTimeout(() => {
                        formStatus.style.display = "none";
                    }, 5000);
                }, function(error) {
                    console.log('FAILED...', error);
                    formStatus.textContent = "Failed to send message. Please try again.";
                    formStatus.style.color = "#F44336";
                });
        });
    }
});

// Add dynamic cursor effect
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Add this CSS for the cursor and form status
document.head.insertAdjacentHTML('beforeend', `
<style>
    .cursor {
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: rgba(157, 78, 221, 0.3);
        pointer-events: none;
        transform: translate(-50%, -50%);
        z-index: 9999;
        transition: transform 0.1s ease;
    }
    
    a:hover ~ .cursor,
    button:hover ~ .cursor {
        transform: translate(-50%, -50%) scale(1.5);
        background-color: rgba(157, 78, 221, 0.5);
    }
    
    .form-status {
        margin-top: 1rem;
        font-weight: 500;
        display: none;
    }
    
    .position {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-left 0.3s ease;
    }
    
    .position.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .position.expanded {
        padding: 2rem;
        background-color: rgba(30, 30, 30, 0.95);
        border-left: 3px solid var(--primary-color);
    }
    
    @keyframes pulse {
        0% { transform: scale(1); opacity: 0.7; }
        50% { transform: scale(1.05); opacity: 0.9; }
        100% { transform: scale(1); opacity: 0.7; }
    }
    
    .profile {
        animation: fadeIn 1s ease;
    }
</style>
`);
