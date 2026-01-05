// Utility functions for KeyAnime

class Utils {
    constructor() {
        this.baseURL = 'https://anim-api.devnova.icu/otakudesu';
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.theme = localStorage.getItem('theme') || 'dark';
        this.initTheme();
        this.carouselInterval = null;
    }

    // Theme Management
    initTheme() {
        if (this.theme === 'light') {
            document.body.classList.add('light-mode');
            const themeIcon = document.querySelector('#themeToggle i');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
        }
    }

    toggleTheme() {
        if (this.theme === 'dark') {
            this.theme = 'light';
            document.body.classList.add('light-mode');
            const themeIcon = document.querySelector('#themeToggle i');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
        } else {
            this.theme = 'dark';
            document.body.classList.remove('light-mode');
            const themeIcon = document.querySelector('#themeToggle i');
            if (themeIcon) {
                themeIcon.className = 'fas fa-moon';
            }
        }
        localStorage.setItem('theme', this.theme);
    }

    // Loading Management
    showLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
            overlay.style.opacity = '1';
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }
    }

    // Toast Notifications
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        let container = document.querySelector('.toast-container');
        if (!container) {
            container = this.createToastContainer();
        }
        container.appendChild(toast);

        // Auto remove after 5 seconds
        const removeToast = () => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode === container) {
                    container.removeChild(toast);
                }
                // Remove container if empty
                if (container.children.length === 0) {
                    container.remove();
                }
            }, 300);
        };

        const timeoutId = setTimeout(removeToast, 5000);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(timeoutId);
            removeToast();
        });

        return toast;
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }

    // Local Storage Management
    setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('LocalStorage error:', e);
            this.showToast('Gagal menyimpan data', 'error');
            return false;
        }
    }

    getItem(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('LocalStorage error:', e);
            return null;
        }
    }

    // Favorites Management
    addToFavorites(anime) {
        const favorites = this.getItem('favorites') || [];
        if (!favorites.some(fav => fav.animeId === anime.animeId)) {
            favorites.push({
                animeId: anime.animeId,
                title: anime.title,
                poster: anime.poster,
                addedAt: new Date().toISOString()
            });
            if (this.setItem('favorites', favorites)) {
                this.showToast('Ditambahkan ke favorit', 'success');
                return true;
            }
        }
        return false;
    }

    removeFromFavorites(animeId) {
        const favorites = this.getItem('favorites') || [];
        const filtered = favorites.filter(fav => fav.animeId !== animeId);
        if (this.setItem('favorites', filtered)) {
            this.showToast('Dihapus dari favorit', 'success');
            return true;
        }
        return false;
    }

    isFavorite(animeId) {
        const favorites = this.getItem('favorites') || [];
        return favorites.some(fav => fav.animeId === animeId);
    }

    // Watch History Management
    addToHistory(anime, episode = null) {
        const history = this.getItem('watchHistory') || [];
        
        // Remove if already exists
        const filtered = history.filter(item => 
            !(item.animeId === anime.animeId && item.episodeId === (episode?.episodeId || 'main'))
        );
        
        const historyItem = {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            episodeId: episode?.episodeId || 'main',
            episodeTitle: episode?.title || 'Detail',
            watchedAt: new Date().toISOString()
        };
        
        // Add to beginning and keep only last 100 items
        filtered.unshift(historyItem);
        if (filtered.length > 100) {
            filtered.length = 100;
        }
        
        this.setItem('watchHistory', filtered);
        return true;
    }

    getHistory() {
        return this.getItem('watchHistory') || [];
    }

    // URL Helper
    getImageUrl(url) {
        if (!url || url === 'default.jpg' || url === '') {
            return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"%3E%3Crect width="300" height="450" fill="%231a1a2e"/%3E%3Ctext x="150" y="200" font-family="Arial" font-size="16" fill="%23ffffff" text-anchor="middle"%3EKeyAnime%3C/text%3E%3Ctext x="150" y="230" font-family="Arial" font-size="12" fill="%23FF4081" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
        }
        if (url.startsWith('http')) {
            return url;
        }
        return `${this.baseURL}${url.startsWith('/') ? '' : '/'}${url}`;
    }

    // Format Date
    formatDate(dateString) {
        if (!dateString) return '-';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '-';
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        } catch {
            return '-';
        }
    }

    // Truncate Text
    truncateText(text, maxLength = 100) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    // Generate Skeleton Loading
    generateSkeletonCards(count = 6) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `
                <div class="anime-card skeleton">
                    <div class="card-image skeleton-image"></div>
                    <div class="card-content">
                        <div class="skeleton-line"></div>
                        <div class="skeleton-line short"></div>
                        <div class="skeleton-buttons">
                            <div class="skeleton-button"></div>
                            <div class="skeleton-button"></div>
                        </div>
                    </div>
                </div>
            `;
        }
        return html;
    }

    // Generate Skeleton for Search Results
    generateSearchSkeleton(count = 3) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `
                <div class="result-item skeleton">
                    <div class="result-image skeleton-image" style="width: 80px; height: 100px;"></div>
                    <div class="result-content" style="flex: 1;">
                        <div class="skeleton-line" style="width: 70%;"></div>
                        <div class="skeleton-line short" style="width: 50%;"></div>
                        <div class="skeleton-buttons" style="margin-top: 10px;">
                            <div class="skeleton-button" style="width: 80px;"></div>
                            <div class="skeleton-button" style="width: 40px;"></div>
                        </div>
                    </div>
                </div>
            `;
        }
        return html;
    }

    // Error Handler
    handleError(error, message = 'Terjadi kesalahan') {
        console.error(error);
        this.showToast(message, 'error');
        return {
            error: true,
            message: message
        };
    }

    // Scroll to Top
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Debounce Function
    debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const context = this;
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Check Mobile
    isMobile() {
        return window.innerWidth <= 768;
    }

    // Carousel Management
    initCarousel(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const slides = container.querySelectorAll('.hero-slide');
        if (slides.length <= 1) return;

        // Clear existing interval
        if (this.carouselInterval) {
            clearInterval(this.carouselInterval);
        }

        let currentSlide = 0;
        
        // Function to show specific slide
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                const dot = container.querySelector(`.hero-dot[data-index="${i}"]`);
                if (dot) dot.classList.remove('active');
            });
            slides[index].classList.add('active');
            const activeDot = container.querySelector(`.hero-dot[data-index="${index}"]`);
            if (activeDot) activeDot.classList.add('active');
            currentSlide = index;
        };

        // Function for next slide
        const nextSlide = () => {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        };

        // Create dots if they don't exist
        if (!container.querySelector('.hero-dots')) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'hero-dots';
            dotsContainer.style.cssText = `
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 8px;
                z-index: 10;
            `;

            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = `hero-dot ${index === 0 ? 'active' : ''}`;
                dot.dataset.index = index;
                dot.innerHTML = '•';
                dot.style.cssText = `
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: none;
                    background: ${index === 0 ? 'var(--primary-color)' : 'rgba(255,255,255,0.5)'};
                    color: transparent;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0;
                    font-size: 0;
                `;
                dot.addEventListener('click', () => {
                    showSlide(index);
                    resetInterval();
                });
                dotsContainer.appendChild(dot);
            });

            container.appendChild(dotsContainer);
        }

        // Function to reset interval
        const resetInterval = () => {
            if (this.carouselInterval) {
                clearInterval(this.carouselInterval);
            }
            this.carouselInterval = setInterval(nextSlide, 5000);
        };

        // Start auto rotation
        resetInterval();

        // Pause on hover
        container.addEventListener('mouseenter', () => {
            if (this.carouselInterval) {
                clearInterval(this.carouselInterval);
            }
        });

        container.addEventListener('mouseleave', () => {
            resetInterval();
        });

        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            if (this.carouselInterval) {
                clearInterval(this.carouselInterval);
            }
        });

        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            resetInterval();
        });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(prevIndex);
                }
            }
        };
    }

    // Cleanup function
    cleanup() {
        if (this.carouselInterval) {
            clearInterval(this.carouselInterval);
            this.carouselInterval = null;
        }
    }
}

// Export utils instance
const utils = new Utils();