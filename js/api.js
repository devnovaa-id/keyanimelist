// API Service for KeyAnime - New API Version

class APIService {
    constructor() {
        this.baseURL = 'https://api.devnova.icu/api/otakudesu/v2';
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
            console.log('Fetching from new API:', url);
            
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
            
            const result = await response.json();
            
            // New API structure: { success, data }
            if (!result.success) {
                throw new Error('API returned unsuccessful response');
            }
            
            // Return the data part from new API structure
            const data = result.data;
            
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
        utils.showToast('Cache dibersihkan', 'success');
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
        return await this.fetch(`/ongoing?page=${page}`);
    }

    // Completed Anime
    async getCompleted(page = 1) {
        return await this.fetch(`/completed?page=${page}`);
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
        console.log('Fetching anime detail for:', animeId);
        return await this.fetch(`/anime/${animeId}`);
    }

    // Episode Detail
    async getEpisodeDetail(episodeId) {
        console.log('Fetching episode detail for:', episodeId);
        const decodedId = decodeURIComponent(episodeId);
        return await this.fetch(`/episode/${decodedId}`);
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
            // New API structure: episodeData contains data property
            const details = episodeData?.data?.details;
            
            // If direct streaming URL is available
            if (details?.defaultStreamingUrl) {
                console.log('Using direct streaming URL:', details.defaultStreamingUrl);
                return details.defaultStreamingUrl;
            }

            const qualityList = details?.server?.qualityList;
            if (!qualityList || qualityList.length === 0) {
                console.log('No quality list available');
                return null;
            }

            // Try to find the requested quality
            const qualityData = qualityList.find(q => 
                q.title && q.title.toLowerCase().includes(quality.toLowerCase())
            );
            
            // Fallback to first available quality
            const targetQuality = qualityData || qualityList[0];
            console.log('Target quality:', targetQuality);
            
            if (targetQuality?.serverList?.length > 0) {
                const server = targetQuality.serverList[serverIndex] || targetQuality.serverList[0];
                console.log('Selected server:', server);
                
                if (server?.serverId) {
                    const serverData = await this.getServerVideo(server.serverId);
                    const url = serverData?.data?.details?.url || null;
                    console.log('Video URL found:', url);
                    return url;
                }
            }
            
            console.log('No video URL found');
            return null;
        } catch (error) {
            console.error('Error getting video URL:', error);
            return null;
        }
    }

    // Get recommendations (placeholder - if API has it)
    async getRecommendations(animeId) {
        try {
            const data = await this.getAnimeDetail(animeId);
            return {
                data: {
                    recommendedAnimeList: data?.data?.details?.recommendedAnimeList || []
                }
            };
        } catch (error) {
            console.error('Error getting recommendations:', error);
            return { data: { recommendedAnimeList: [] } };
        }
    }
}

// Export API instance
const api = new APIService();