document.addEventListener('DOMContentLoaded', () => {
    const avatar = document.getElementById('interactive-avatar');
    const bubble = document.getElementById('avatar-chat-bubble');

    if (avatar && bubble) {
        avatar.addEventListener('click', () => {
            // Toggle the chat bubble
            bubble.classList.toggle('show');
            
            // If it's shown, automatically hide it after 4 seconds
            if (bubble.classList.contains('show')) {
                setTimeout(() => {
                    bubble.classList.remove('show');
                }, 4000);
            }
        });
    }

    // Auto-scroll for scrolling grids (Projects and Certificates)
    const grids = document.querySelectorAll('.certificates-grid, .projects-grid');
    
    grids.forEach(grid => {
        let scrollSpeed = 2; // Increased speed (pixels per frame)
        let scrollDirection = 1; // 1 for right, -1 for left
        let scrollAnimation;

        function autoScroll() {
            grid.scrollLeft += scrollSpeed * scrollDirection;
            
            // If it hits the right edge, reverse direction
            if (grid.scrollLeft >= (grid.scrollWidth - grid.clientWidth) - 2) {
                scrollDirection = -1;
            } 
            // If it hits the left edge, reverse direction
            else if (grid.scrollLeft <= 0) {
                scrollDirection = 1;
            }
            
            scrollAnimation = requestAnimationFrame(autoScroll);
        }

        // Only animate when in view to save performance
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                if (!grid.dataset.scrolling) {
                    grid.dataset.scrolling = "true";
                    scrollAnimation = requestAnimationFrame(autoScroll);
                }
            } else {
                if (grid.dataset.scrolling) {
                    grid.dataset.scrolling = "";
                    cancelAnimationFrame(scrollAnimation);
                }
            }
        });
        
        observer.observe(grid);
        observer.observe(grid);
    });

    // Contact Form Logic
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get values from form
            const nameInput = contactForm.querySelector('input[type="text"]').value;
            const emailInput = contactForm.querySelector('input[type="email"]').value;
            const purposeInputs = contactForm.querySelectorAll('input[type="text"]');
            const purposeInput = purposeInputs.length > 1 ? purposeInputs[1].value : 'Contact from Portfolio';
            const messageInput = contactForm.querySelector('textarea').value;
            
            // Construct mailto link
            const subject = encodeURIComponent(`${purposeInput} - from ${nameInput}`);
            const body = encodeURIComponent(`${messageInput}\n\n---\nSender Email: ${emailInput}\nSender Name: ${nameInput}`);
            
            // Trigger email client
            window.location.href = `mailto:chennuboinashanmukh@gmail.com?subject=${subject}&body=${body}`;
            
            // Reset form
            contactForm.reset();
        });
    }
});
