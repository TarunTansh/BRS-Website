// Tab switching functionality for "How it works" section
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Handle image fallback for jpg/jpeg extensions in media gallery
document.addEventListener('DOMContentLoaded', function() {
    const mediaImages = document.querySelectorAll('.media-image');

    mediaImages.forEach(img => {
        img.addEventListener('error', function() {
            // If .jpg fails, try .jpeg
            if (this.src.endsWith('.jpg')) {
                this.src = this.src.replace('.jpg', '.jpeg');
            }
            // If .jpeg also fails, keep the broken image as-is
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const mediaGallery = document.querySelector('.media-gallery');
    const infographicTrigger = document.querySelector('.upskilling-infographic-trigger');

    if (!mediaGallery && !infographicTrigger) {
        return;
    }

    const lightbox = document.createElement('div');
    lightbox.className = 'media-lightbox';
    lightbox.hidden = true;
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Media image preview');
    lightbox.innerHTML = '<button class="media-lightbox-close" type="button" aria-label="Close image preview">&times;</button><img class="media-lightbox-image" alt="">';
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.media-lightbox-image');
    const closeButton = lightbox.querySelector('.media-lightbox-close');
    let previouslyFocusedElement = null;
    const closeLightbox = function() {
        lightbox.hidden = true;
        document.body.style.overflow = '';
        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
            previouslyFocusedElement = null;
        }
    };

    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox || event.target.classList.contains('media-lightbox-close')) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && !lightbox.hidden) {
            closeLightbox();
        }
    });

    const openLightbox = function(image) {
        previouslyFocusedElement = document.activeElement;
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt;
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
        closeButton.focus();
    };

    if (mediaGallery) {
        mediaGallery.addEventListener('click', function(event) {
            const image = event.target.closest('.media-image');

            if (image && mediaGallery.contains(image)) {
                openLightbox(image);
            }
        });

        mediaGallery.querySelectorAll('.media-image').forEach(function(image) {
            image.tabIndex = 0;
            image.addEventListener('keydown', function(event) {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openLightbox(image);
                }
            });
        });
    }

    if (infographicTrigger) {
        infographicTrigger.addEventListener('click', function() {
            openLightbox(infographicTrigger.querySelector('img'));
        });
    }
});
