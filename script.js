
class PortfolioSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = 2;
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        
        this.init();
        this.setupEventListeners();
        this.startAutoSlide();
    }
    
    init() {
        // Initialize first slide
        this.updateSlides();
        this.animateSkillBars();
    }
    
    setupEventListeners() {
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });
        
        // Arrow navigation
        this.prevBtn.addEventListener('click', () => {
            this.previousSlide();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Touch/swipe support
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe(startX, startY, endX, endY);
        });
        
        
        
        // Social icons hover effects
        const socialIcons = document.querySelectorAll('.social-icons a');
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                icon.style.transform = 'translateY(-3px) scale(1.1)';
            });
            
            icon.addEventListener('mouseleave', () => {
                icon.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    handleSwipe(startX, startY, endX, endY) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;
        
        // Check if horizontal swipe is more significant than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                this.previousSlide();
            } else {
                this.nextSlide();
            }
        }
    }
    
    goToSlide(slideIndex) {
        this.currentSlide = slideIndex;
        this.updateSlides();
        this.resetAutoSlide();
        
        // Animate skill bars when entering skills slide
        if (slideIndex === 1) {
            setTimeout(() => {
                this.animateSkillBars();
            }, 300);
        }
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlides();
        this.resetAutoSlide();
        
        if (this.currentSlide === 1) {
            setTimeout(() => {
                this.animateSkillBars();
            }, 300);
        }
    }
    
    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlides();
        this.resetAutoSlide();
        
        if (this.currentSlide === 1) {
            setTimeout(() => {
                this.animateSkillBars();
            }, 300);
        }
    }
    
    updateSlides() {
        // Update slides
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev');
            
            if (index === this.currentSlide) {
                slide.classList.add('active');
            } else if (index < this.currentSlide) {
                slide.classList.add('prev');
            }
        });
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        
        // Add slide entrance animation
        const activeSlide = this.slides[this.currentSlide];
        activeSlide.style.animation = 'slideIn 0.6s ease-out';
        
        setTimeout(() => {
            activeSlide.style.animation = '';
        }, 600);
    }
    
    animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.width = width;
            }, index * 200 + 100);
        });
    }
    
    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 8000); // Change slide every 8 seconds
    }
    
    resetAutoSlide() {
        clearInterval(this.autoSlideInterval);
        this.startAutoSlide();
    }
    
    
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .profile-card > * {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .profile-card > *:nth-child(1) { animation-delay: 0.1s; }
    .profile-card > *:nth-child(2) { animation-delay: 0.2s; }
    .profile-card > *:nth-child(3) { animation-delay: 0.3s; }
    .profile-card > *:nth-child(4) { animation-delay: 0.4s; }
    .profile-card > *:nth-child(5) { animation-delay: 0.5s; }
    
    .project-item {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .project-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
    }
    
    .skill-item {
        transition: transform 0.3s ease;
    }
    
    .skill-item:hover {
        transform: translateX(10px);
    }
`;
document.head.appendChild(style);

// Initialize the portfolio slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioSlider();
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Add console message
    console.log('🎉 Portofolio Muhammad Arjun Najwa berhasil dimuat!');
    console.log('📱 Gunakan keyboard (←/→), mouse, atau touch untuk navigasi');
});

// Add some interactive easter eggs
let clickCount = 0;
document.addEventListener('click', () => {
    clickCount++;
    if (clickCount === 10) {
        console.log('🎊 Wow! Anda sangat aktif mengeksplorasi portofolio ini!');
        
        // Add a fun effect
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
        document.body.style.background = `linear-gradient(135deg, ${colors[Math.floor(Math.random() * colors.length)]}, ${colors[Math.floor(Math.random() * colors.length)]})`;
        
        setTimeout(() => {
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        }, 3000);
        
        clickCount = 0;
    }
});
