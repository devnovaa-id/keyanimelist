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
            return cached.data;
        }

        try {
            utils.showLoading();
            const response = await fetch(`${this.baseURL}${endpoint}`, options);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
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
                message: 'Gagal memuat data'
            };
        } finally {
            utils.hideLoading();
        }
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
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
            return { data: { animeList: [] }, pagination: null };
        }
        return await this.fetch(`/search?q=${encodeURIComponent(query)}&page=${page}`);
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
            const qualityList = episodeData?.data?.details?.server?.qualityList;
            if (!qualityList) {
                return episodeData?.data?.details?.defaultStreamingUrl || null;
            }

            const qualityData = qualityList.find(q => q.title.includes(quality));
            if (!qualityData) {
                // Fallback to first quality
                const firstQuality = qualityList[0];
                if (firstQuality?.serverList?.length > 0) {
                    const serverId = firstQuality.serverList[0].serverId;
                    const serverData = await this.getServerVideo(serverId);
                    return serverData?.data?.details?.url || null;
                }
                return null;
            }

            const server = qualityData.serverList[serverIndex];
            if (!server) {
                return null;
            }

            const serverData = await this.getServerVideo(server.serverId);
            return serverData?.data?.details?.url || null;
        } catch (error) {
            console.error('Error getting video URL:', error);
            return null;
        }
    }
}

// Export API instance
const api = new APIService();