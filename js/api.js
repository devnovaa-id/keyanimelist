// API Service for KeyAnime

class APIService {
    constructor() {
        this.baseURL = 'https://anim-api.devnova.icu/otakudesu';
        this.cache = new Map();
        this.cacheDuration = 5 * 60 * 1000; // 5 minutes
    }

    // Generic fetch method with caching
    async fetch(endpoint, options = {}) {
        const cacheKey = endpoint;
        const cached = this.cache.get(cacheKey);
        
        // Return cached data if not expired
        if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
            console.log('Cache hit:', endpoint);
            return cached.data;
        }

        try {
            utils.showLoading();
            const url = `${this.baseURL}${endpoint}`;
            console.log('Fetching:', url);
            
            const response = await fetch(url, {
                ...options,
                headers: {
                    'Accept': 'application/json',
                    ...options.headers
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            // Cache the response
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });
            
            return data;
        } catch (error) {
            console.error('API Error:', error);
            utils.showToast('Gagal memuat data. Silakan coba lagi.', 'error');
            return {
                error: true,
                message: error.message || 'Gagal memuat data'
            };
        } finally {
            utils.hideLoading();
        }
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
        console.log('Cache cleared');
        return true;
    }

    // Home Page
    async getHome() {
        return await this.fetch('/home');
    }

    // Schedule
    async getSchedule() {
        return await this.fetch('/schedule');
    }

    // All Anime
    async getAllAnime(page = 1) {
        return await this.fetch(`/anime?page=${page}`);
    }

    // All Genres
    async getGenres() {
        return await this.fetch('/genre');
    }

    // Ongoing Anime
    async getOngoing(page = 1) {
        const data = await this.fetch(`/ongoing?page=${page}`);
        
        // Ensure pagination data exists
        if (data.data && !data.pagination) {
            const itemsPerPage = 24;
            data.pagination = {
                currentPage: page,
                hasNextPage: true,
                totalPages: page + 1,
                totalItems: (page + 1) * itemsPerPage
            };
        }
        
        return data;
    }

    // Completed Anime
    async getCompleted(page = 1) {
        const data = await this.fetch(`/completed?page=${page}`);
        
        // Ensure pagination data exists
        if (data.data && !data.pagination) {
            const itemsPerPage = 24;
            data.pagination = {
                currentPage: page,
                hasNextPage: true,
                totalPages: page + 1,
                totalItems: (page + 1) * itemsPerPage
            };
        }
        
        return data;
    }

    // Search Anime
    async searchAnime(query, page = 1) {
        if (!query || query.trim() === '') {
            return { 
                data: { animeList: [] }, 
                pagination: {
                    currentPage: 1,
                    hasNextPage: false,
                    totalPages: 1,
                    totalItems: 0
                }
            };
        }
        return await this.fetch(`/search?q=${encodeURIComponent(query.trim())}&page=${page}`);
    }

    // Anime by Genre
    async getAnimeByGenre(genreId, page = 1) {
        return await this.fetch(`/genre/${genreId}?page=${page}`);
    }

    // Anime Detail
    async getAnimeDetail(animeId) {
        return await this.fetch(`/anime/${animeId}`);
    }

    // Episode Detail
    async getEpisodeDetail(episodeId) {
        return await this.fetch(`/episode/${episodeId}`);
    }

    // Batch Detail
    async getBatchDetail(batchId) {
        return await this.fetch(`/batch/${batchId}`);
    }

    // Server Video
    async getServerVideo(serverId) {
        return await this.fetch(`/server/${serverId}`);
    }

    // Get video URL from episode data
    async getVideoUrl(episodeData, quality = '480p', serverIndex = 0) {
        try {
            // If direct streaming URL is available
            if (episodeData?.data?.details?.defaultStreamingUrl) {
                return episodeData.data.details.defaultStreamingUrl;
            }

            const qualityList = episodeData?.data?.details?.server?.qualityList;
            if (!qualityList || qualityList.length === 0) {
                return null;
            }

            // Try to find the requested quality
            const qualityData = qualityList.find(q => 
                q.title && q.title.toLowerCase().includes(quality.toLowerCase())
            );
            
            // Fallback to first available quality
            const targetQuality = qualityData || qualityList[0];
            
            if (targetQuality?.serverList?.length > 0) {
                const server = targetQuality.serverList[serverIndex] || targetQuality.serverList[0];
                if (server?.serverId) {
                    const serverData = await this.getServerVideo(server.serverId);
                    return serverData?.data?.details?.url || null;
                }
            }
            
            return null;
        } catch (error) {
            console.error('Error getting video URL:', error);
            return null;
        }
    }

    // Get recommended anime
    async getRecommendations(animeId) {
        return await this.fetch(`/recommendations/${animeId}`);
    }

    // Get popular anime
    async getPopular(page = 1) {
        return await this.fetch(`/popular?page=${page}`);
    }
}

// Export API instance
const api = new APIService();