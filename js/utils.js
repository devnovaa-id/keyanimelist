// Utility functions for KeyAnime

class Utils {
    constructor() {
        this.baseURL = 'https://anim-api.devnova.icu/otakudesu';
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.theme = localStorage.getItem('theme') || 'dark';
        this.initTheme();
    }

    // Theme Management
    initTheme() {
        if (this.theme === 'light') {
            document.body.classList.add('light-mode');
            document.querySelector('#themeToggle i').className = 'fas fa-sun';
        }
    }

    toggleTheme() {
        if (this.theme === 'dark') {
            this.theme = 'light';
            document.body.classList.add('light-mode');
            document.querySelector('#themeToggle i').className = 'fas fa-sun';
        } else {
            this.theme = 'dark';
            document.body.classList.remove('light-mode');
            document.querySelector('#themeToggle i').className = 'fas fa-moon';
        }
        localStorage.setItem('theme', this.theme);
    }

    // Loading Management
    showLoading() {
        document.getElementById('loading-overlay').style.display = 'flex';
    }

    hideLoading() {
        document.getElementById('loading-overlay').style.display = 'none';
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

        const container = document.querySelector('.toast-container') || this.createToastContainer();
        container.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        }, 5000);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => toast.remove(), 300);
        });
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
            this.setItem('favorites', favorites);
            this.showToast('Ditambahkan ke favorit', 'success');
            return true;
        }
        return false;
    }

    removeFromFavorites(animeId) {
        const favorites = this.getItem('favorites') || [];
        const filtered = favorites.filter(fav => fav.animeId !== animeId);
        this.setItem('favorites', filtered);
        this.showToast('Dihapus dari favorit', 'success');
        return true;
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
    }

    getHistory() {
        return this.getItem('watchHistory') || [];
    }

    // URL Helper
    getImageUrl(url) {
        if (!url) return 'https://via.placeholder.com/300x450?text=No+Image';
        return url;
    }

    // Format Date
    formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    // Truncate Text
    truncateText(text, maxLength = 100) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
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
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Check Mobile
    isMobile() {
        return window.innerWidth <= 768;
    }

    // Get Query Parameter
    getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    // Set Query Parameter
    setQueryParam(name, value) {
        const urlParams = new URLSearchParams(window.location.search);
        if (value) {
            urlParams.set(name, value);
        } else {
            urlParams.delete(name);
        }
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
    }
}

// Export utils instance
const utils = new Utils();