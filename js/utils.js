// Utility functions
class Utils {
    // Show loading overlay
    static showLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) loadingOverlay.style.display = 'flex';
    }

    // Hide loading overlay
    static hideLoading() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) loadingOverlay.style.display = 'none';
    }

    // Show toast notification
    static showToast(message, type = 'info', duration = 3000) {
        const toastContainer = document.querySelector('.toast-container') || this.createToastContainer();
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        toastContainer.appendChild(toast);

        // Auto remove
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        });

        return toast;
    }

    // Create toast container if not exists
    static createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }

    // Format date
    static formatDate(dateString) {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    // Truncate text
    static truncateText(text, maxLength = 100) {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }

    // Debounce function
    static debounce(func, wait) {
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

    // Get current page from hash
    static getCurrentPage() {
        const hash = window.location.hash;
        if (!hash || hash === '#/') return 'home';
        return hash.replace('#/', '').split('?')[0];
    }

    // Get query parameters
    static getQueryParams() {
        const hash = window.location.hash;
        const queryString = hash.includes('?') ? hash.split('?')[1] : '';
        const params = new URLSearchParams(queryString);
        return Object.fromEntries(params.entries());
    }

    // Set query parameters
    static setQueryParams(params) {
        const currentParams = this.getQueryParams();
        const newParams = { ...currentParams, ...params };
        const queryString = new URLSearchParams(newParams).toString();
        const page = this.getCurrentPage();
        return `#/${page}${queryString ? '?' + queryString : ''}`;
    }

    // Update URL without reload
    static updateURL(params) {
        const newHash = this.setQueryParams(params);
        window.location.hash = newHash;
    }

    // Check if mobile
    static isMobile() {
        return window.innerWidth <= 768;
    }

    // Generate skeleton loading
    static generateSkeletonCards(count = 12) {
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

    // Sanitize HTML
    static sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    }

    // Store in localStorage
    static setStorage(key, value) {
        try {
            localStorage.setItem(`keyanime_${key}`, JSON.stringify(value));
        } catch (e) {
            console.error('LocalStorage error:', e);
        }
    }

    // Get from localStorage
    static getStorage(key) {
        try {
            const item = localStorage.getItem(`keyanime_${key}`);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('LocalStorage error:', e);
            return null;
        }
    }

    // Remove from localStorage
    static removeStorage(key) {
        try {
            localStorage.removeItem(`keyanime_${key}`);
        } catch (e) {
            console.error('LocalStorage error:', e);
        }
    }

    // Add to favorites
    static addFavorite(anime) {
        const favorites = this.getStorage('favorites') || [];
        const exists = favorites.find(fav => fav.slug === anime.slug);
        if (!exists) {
            favorites.push({
                ...anime,
                addedAt: new Date().toISOString()
            });
            this.setStorage('favorites', favorites);
            this.showToast('Ditambahkan ke favorit', 'success');
            return true;
        }
        this.showToast('Sudah ada di favorit', 'info');
        return false;
    }

    // Remove from favorites
    static removeFavorite(slug) {
        const favorites = this.getStorage('favorites') || [];
        const newFavorites = favorites.filter(fav => fav.slug !== slug);
        this.setStorage('favorites', newFavorites);
        this.showToast('Dihapus dari favorit', 'success');
        return true;
    }

    // Check if in favorites
    static isFavorite(slug) {
        const favorites = this.getStorage('favorites') || [];
        return favorites.some(fav => fav.slug === slug);
    }

    // Add to history
    static addHistory(anime, episode = null) {
        const history = this.getStorage('history') || [];
        const historyItem = {
            anime,
            episode,
            watchedAt: new Date().toISOString()
        };

        // Remove if already exists
        const newHistory = history.filter(item => 
            !(item.anime.slug === anime.slug && item.episode?.slug === episode?.slug)
        );

        // Add to beginning
        newHistory.unshift(historyItem);

        // Keep only last 50 items
        if (newHistory.length > 50) {
            newHistory.pop();
        }

        this.setStorage('history', newHistory);
    }

    // Get history
    static getHistory() {
        return this.getStorage('history') || [];
    }

    // Clear history
    static clearHistory() {
        this.removeStorage('history');
        this.showToast('Riwayat dibersihkan', 'success');
    }

    // Theme management
    static initTheme() {
        const theme = this.getStorage('theme') || 'dark';
        this.setTheme(theme);
    }

    static setTheme(theme) {
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(`${theme}-mode`);
        this.setStorage('theme', theme);
        
        // Update theme toggle icon
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }

    static toggleTheme() {
        const currentTheme = this.getStorage('theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
}