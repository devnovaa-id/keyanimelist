// API Configuration
const API_CONFIG = {
    BASE_URL: 'https://api.ryzumi.vip/api/otakudesu',
    DEFAULT_HEADERS: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

// API Service
class APIService {
    constructor() {
        this.cache = new Map();
        this.cacheDuration = 5 * 60 * 1000; // 5 minutes cache
    }

    // Generic fetch method with caching
    async fetch(endpoint, options = {}) {
        const url = `${API_CONFIG.BASE_URL}${endpoint}`;
        const cacheKey = url + JSON.stringify(options);
        
        // Check cache
        const cached = this.cache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
            return cached.data;
        }

        try {
            Utils.showLoading();
            const response = await fetch(url, {
                headers: API_CONFIG.DEFAULT_HEADERS,
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            // Cache the response
            this.cache.set(cacheKey, {
                data,
                timestamp: Date.now()
            });

            return data;
        } catch (error) {
            console.error('API Error:', error);
            Utils.showToast(`Error: ${error.message}`, 'error');
            throw error;
        } finally {
            Utils.hideLoading();
        }
    }

    // Get anime list
    async getAnimeList(params = {}) {
        const { type = '', genre = '', search = '', page = 1 } = params;
        let endpoint = '/anime';
        const queryParams = new URLSearchParams();
        
        if (type) queryParams.append('type', type);
        if (genre) queryParams.append('genre', genre);
        if (search) queryParams.append('search', search);
        if (page > 1) queryParams.append('page', page);
        
        if (queryParams.toString()) {
            endpoint += `?${queryParams.toString()}`;
        }
        
        return this.fetch(endpoint);
    }

    // Get anime details
    async getAnimeInfo(slug) {
        return this.fetch(`/anime-info?slug=${encodeURIComponent(slug)}`);
    }

    // Get episode data
    async getEpisodeData(slug) {
        return this.fetch(`/anime/episode?slug=${encodeURIComponent(slug)}`);
    }

    // Get genres
    async getGenres() {
        return this.fetch('/genre');
    }

    // Get schedule
    async getSchedule() {
        return this.fetch('/jadwal');
    }

    // Get batch download links
    async getBatchDownload(slug) {
        return this.fetch(`/download/batch?slug=${encodeURIComponent(slug)}`);
    }

    // Get iframe URL
    async getIframeUrl(content, nonce) {
        return this.fetch(`/get-iframe?content=${encodeURIComponent(content)}&nonce=${encodeURIComponent(nonce)}`);
    }

    // Get nonce
    async getNonce() {
        return this.fetch('/nonce');
    }

    // Search anime
    async searchAnime(query, type = 'complete') {
        return this.fetch(`/anime?type=${type}&search=${encodeURIComponent(query)}`);
    }

    // Clear cache for specific endpoint
    clearCache(endpoint) {
        for (const [key] of this.cache) {
            if (key.includes(endpoint)) {
                this.cache.delete(key);
            }
        }
    }

    // Clear all cache
    clearAllCache() {
        this.cache.clear();
    }
}

// Create global API instance
const API = new APIService();