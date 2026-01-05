// Router for KeyAnime

class Router {
    constructor() {
        this.routes = {};
        this.currentPath = '';
        this.utils = utils;
        this.api = api;
        this.components = components;
        this.currentPage = {};
        this.init();
    }

    init() {
        // Define routes
        this.routes = {
            '/': this.renderHome.bind(this),
            '/ongoing': this.renderOngoing.bind(this),
            '/complete': this.renderComplete.bind(this),
            '/genre': this.renderGenres.bind(this),
            '/genre/:id': this.renderGenreAnime.bind(this),
            '/schedule': this.renderSchedule.bind(this),
            '/search': this.renderSearch.bind(this),
            '/favorites': this.renderFavorites.bind(this),
            '/history': this.renderHistory.bind(this),
            '/anime/:id': this.renderAnimeDetail.bind(this),
            '/watch/:id': this.renderWatch.bind(this),
            '/profile': this.renderProfile.bind(this)
        };

        // Handle initial load
        window.addEventListener('DOMContentLoaded', () => {
            this.handleRoute();
        });

        // Handle hash changes
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });

        // Handle back button
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });
    }

    // Get current route from hash
    getRouteFromHash() {
        const hash = window.location.hash.substring(1);
        if (!hash) return '/';
        
        // Remove query params for route matching
        const route = hash.split('?')[0];
        return route || '/';
    }

    // Get query params from hash
    getQueryParams() {
        const hash = window.location.hash.substring(1);
        const queryString = hash.split('?')[1];
        if (!queryString) return {};
        
        const params = new URLSearchParams(queryString);
        const result = {};
        for (const [key, value] of params) {
            result[key] = value;
        }
        return result;
    }

    // Extract params from route
    extractParams(routePattern, path) {
        const patternParts = routePattern.split('/');
        const pathParts = path.split('/');
        const params = {};

        for (let i = 0; i < patternParts.length; i++) {
            if (patternParts[i].startsWith(':')) {
                const paramName = patternParts[i].substring(1);
                params[paramName] = pathParts[i] || '';
            }
        }

        return params;
    }

    // Find matching route
    findMatchingRoute(path) {
        // Exact match
        if (this.routes[path]) {
            return {
                handler: this.routes[path],
                params: {}
            };
        }

        // Param match
        for (const route in this.routes) {
            if (route.includes(':')) {
                const routePattern = route.split('/');
                const pathParts = path.split('/');
                
                if (routePattern.length === pathParts.length) {
                    let match = true;
                    const params = {};
                    
                    for (let i = 0; i < routePattern.length; i++) {
                        if (routePattern[i].startsWith(':')) {
                            const paramName = routePattern[i].substring(1);
                            params[paramName] = pathParts[i];
                        } else if (routePattern[i] !== pathParts[i]) {
                            match = false;
                            break;
                        }
                    }
                    
                    if (match) {
                        return {
                            handler: this.routes[route],
                            params: params
                        };
                    }
                }
            }
        }

        // No match
        return null;
    }

    // Handle route
    async handleRoute() {
        const path = this.getRouteFromHash();
        const queryParams = this.getQueryParams();
        const route = this.findMatchingRoute(path);

        // Update active nav
        this.updateActiveNav(path);

        if (route) {
            try {
                await route.handler(route.params, queryParams);
            } catch (error) {
                console.error('Route error:', error);
                this.renderError('Terjadi kesalahan saat memuat halaman');
            }
        } else {
            this.renderError('Halaman tidak ditemukan');
        }
    }

    // Update active navigation
    updateActiveNav(path) {
        // Update sidebar
        const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === path || (href === '/' && path === '/')) {
                link.classList.add('active');
            }
        });

        // Update bottom nav
        const bottomNavLinks = document.querySelectorAll('.bottom-nav-item');
        bottomNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            
            // Special handling for bottom nav
            if (href === '/' && path === '/') {
                link.classList.add('active');
            } else if (href === 'ongoing' && path.startsWith('/ongoing')) {
                link.classList.add('active');
            } else if (href === 'search' && path.startsWith('/search')) {
                link.classList.add('active');
            } else if (href === 'favorites' && path.startsWith('/favorites')) {
                link.classList.add('active');
            } else if (href === 'profile' && path.startsWith('/profile')) {
                link.classList.add('active');
            }
        });
    }

    // Navigate to route
    navigateTo(path, queryParams = {}) {
        let url = `#${path}`;
        
        if (Object.keys(queryParams).length > 0) {
            const params = new URLSearchParams(queryParams);
            url += `?${params.toString()}`;
        }
        
        window.location.hash = url;
    }

    // Render error page
    renderError(message) {
        const content = document.getElementById('app-content');
        content.innerHTML = components.createErrorPage(message);
    }

    // Route handlers
    async renderHome() {
        this.currentPage = { type: 'home', data: null };
        const content = document.getElementById('app-content');
        content.innerHTML = components.utils.generateSkeletonCards(6);

        try {
            const data = await api.getHome();
            
            if (data.error) {
                content.innerHTML = components.createErrorPage('Gagal memuat halaman beranda');
                return;
            }

            let html = '';
            
            // Hero slider with ongoing anime
            if (data.data?.ongoing?.animeList) {
                const heroSlides = data.data.ongoing.animeList.slice(0, 5);
                html += components.createHeroSlider(heroSlides);
            }

            // Ongoing section
            html += `
                <div class="section-header">
                    <h4><i class="fas fa-fire"></i> Sedang Tayang</h4>
                    <a href="#/ongoing" class="see-all">Lihat Semua</a>
                </div>
                <div class="mobile-grid" id="ongoingList">
                    ${data.data?.ongoing?.animeList?.slice(0, 12).map(anime => 
                        components.createAnimeCard(anime)
                    ).join('') || ''}
                </div>
            `;

            // Completed section
            html += `
                <div class="section-header" style="margin-top: 30px;">
                    <h4><i class="fas fa-check-circle"></i> Selesai Tayang</h4>
                    <a href="#/complete" class="see-all">Lihat Semua</a>
                </div>
                <div class="mobile-grid" id="completedList">
                    ${data.data?.completed?.animeList?.slice(0, 12).map(anime => 
                        components.createAnimeCard({ ...anime, episodes: anime.episodes || '?' })
                    ).join('') || ''}
                </div>
            `;

            content.innerHTML = html;
            this.attachCardEventListeners();
        } catch (error) {
            console.error('Home render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat halaman beranda');
        }
    }

    async renderOngoing(params = {}, query = {}) {
        const page = parseInt(query.page) || 1;
        this.currentPage = { type: 'ongoing', page, data: null };
        
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="page-header">
                <h4><i class="fas fa-fire"></i> Anime Sedang Tayang</h4>
            </div>
            ${components.utils.generateSkeletonCards(6)}
        `;

        try {
            const data = await api.getOngoing(page);
            
            if (data.error) {
                content.innerHTML = components.createErrorPage('Gagal memuat anime ongoing');
                return;
            }

            if (!data.data?.animeList?.length) {
                content.innerHTML = components.createEmptyState('Tidak ada anime ongoing');
                return;
            }

            let html = `
                <div class="page-header">
                    <h4><i class="fas fa-fire"></i> Anime Sedang Tayang</h4>
                </div>
                <div class="mobile-grid" id="ongoingList">
                    ${data.data.animeList.map(anime => 
                        components.createAnimeCard(anime)
                    ).join('')}
                </div>
            `;

            // Add pagination
            if (data.pagination?.hasNextPage) {
                html += components.createLoadMoreButton(true, () => {
                    this.navigateTo('/ongoing', { page: page + 1 });
                });
            }

            content.innerHTML = html;
            this.attachCardEventListeners();
        } catch (error) {
            console.error('Ongoing render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat anime ongoing');
        }
    }

    async renderComplete(params = {}, query = {}) {
        const page = parseInt(query.page) || 1;
        this.currentPage = { type: 'complete', page, data: null };
        
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="page-header">
                <h4><i class="fas fa-check-circle"></i> Anime Selesai</h4>
            </div>
            ${components.utils.generateSkeletonCards(6)}
        `;

        try {
            const data = await api.getCompleted(page);
            
            if (data.error) {
                content.innerHTML = components.createErrorPage('Gagal memuat anime selesai');
                return;
            }

            if (!data.data?.animeList?.length) {
                content.innerHTML = components.createEmptyState('Tidak ada anime selesai');
                return;
            }

            let html = `
                <div class="page-header">
                    <h4><i class="fas fa-check-circle"></i> Anime Selesai</h4>
                </div>
                <div class="mobile-grid" id="completedList">
                    ${data.data.animeList.map(anime => 
                        components.createAnimeCard({ ...anime, episodes: anime.episodes || '?' })
                    ).join('')}
                </div>
            `;

            // Add pagination
            if (data.pagination?.hasNextPage) {
                html += components.createLoadMoreButton(true, () => {
                    this.navigateTo('/complete', { page: page + 1 });
                });
            }

            content.innerHTML = html;
            this.attachCardEventListeners();
        } catch (error) {
            console.error('Complete render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat anime selesai');
        }
    }

    async renderGenres() {
        this.currentPage = { type: 'genres', data: null };
        
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="page-header">
                <h4><i class="fas fa-tags"></i> Semua Genre</h4>
            </div>
            <div class="category-chips" style="justify-content: flex-start; flex-wrap: wrap;">
                ${Array(12).fill().map(() => `
                    <div class="chip skeleton" style="width: 100px; height: 40px;"></div>
                `).join('')}
            </div>
        `;

        try {
            const data = await api.getGenres();
            
            if (data.error) {
                content.innerHTML = components.createErrorPage('Gagal memuat genre');
                return;
            }

            if (!data.data?.genreList?.length) {
                content.innerHTML = components.createEmptyState('Tidak ada genre');
                return;
            }

            const html = `
                <div class="page-header">
                    <h4><i class="fas fa-tags"></i> Semua Genre</h4>
                </div>
                <div class="category-chips" style="justify-content: flex-start; flex-wrap: wrap;">
                    ${data.data.genreList.map(genre => 
                        components.createGenreChip(genre)
                    ).join('')}
                </div>
            `;

            content.innerHTML = html;
        } catch (error) {
            console.error('Genres render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat genre');
        }
    }

    async renderGenreAnime(params, query = {}) {
        const page = parseInt(query.page) || 1;
        const { id } = params;
        this.currentPage = { type: 'genre', id, page, data: null };
        
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="page-header">
                <h4><i class="fas fa-tag"></i> Genre</h4>
            </div>
            ${components.utils.generateSkeletonCards(6)}
        `;

        try {
            const data = await api.getAnimeByGenre(id, page);
            
            if (data.error) {
                content.innerHTML = components.createErrorPage('Gagal memuat anime genre');
                return;
            }

            if (!data.data?.animeList?.length) {
                content.innerHTML = components.createEmptyState('Tidak ada anime untuk genre ini');
                return;
            }

            let html = `
                <div class="page-header">
                    <h4><i class="fas fa-tag"></i> ${id.charAt(0).toUpperCase() + id.slice(1)}</h4>
                </div>
                <div class="mobile-grid" id="genreList">
                    ${data.data.animeList.map(anime => 
                        components.createAnimeCard(anime)
                    ).join('')}
                </div>
            `;

            // Add pagination
            if (data.pagination?.hasNextPage) {
                html += components.createLoadMoreButton(true, () => {
                    this.navigateTo(`/genre/${id}`, { page: page + 1 });
                });
            }

            content.innerHTML = html;
            this.attachCardEventListeners();
        } catch (error) {
            console.error('Genre anime render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat anime genre');
        }
    }

    async renderSchedule() {
        this.currentPage = { type: 'schedule', data: null };
        
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="page-header">
                <h4><i class="fas fa-calendar-alt"></i> Jadwal Tayang</h4>
            </div>
            ${Array(7).fill().map(() => `
                <div class="schedule-day skeleton" style="height: 200px; margin-bottom: 20px;"></div>
            `).join('')}
        `;

        try {
            const data = await api.getSchedule();
            
            if (data.error) {
                content.innerHTML = components.createErrorPage('Gagal memuat jadwal');
                return;
            }

            if (!data.data?.scheduleList?.length) {
                content.innerHTML = components.createEmptyState('Tidak ada jadwal');
                return;
            }

            const html = `
                <div class="page-header">
                    <h4><i class="fas fa-calendar-alt"></i> Jadwal Tayang</h4>
                </div>
                ${data.data.scheduleList.map(day => 
                    components.createScheduleDay(day)
                ).join('')}
            `;

            content.innerHTML = html;
        } catch (error) {
            console.error('Schedule render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat jadwal');
        }
    }

    async renderSearch(params = {}, query = {}) {
        const searchQuery = query.q || '';
        this.currentPage = { type: 'search', query: searchQuery, data: null };
        
        const content = document.getElementById('app-content');
        
        let html = `
            <div class="mobile-search-page">
                <div class="search-header">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" 
                               id="searchInput" 
                               placeholder="Cari anime..." 
                               value="${searchQuery}"
                               autocomplete="off">
                        ${searchQuery ? `
                            <button class="clear-search" id="clearSearch">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
                <div id="searchResults">
        `;

        if (searchQuery) {
            html += components.utils.generateSkeletonCards(3);
        } else {
            html += components.createEmptyState('Masukkan kata kunci pencarian', 'fas fa-search');
        }

        html += `</div></div>`;
        content.innerHTML = html;

        // Setup search input
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');
        
        if (searchInput) {
            searchInput.focus();
            
            // Debounced search
            const debouncedSearch = utils.debounce((value) => {
                if (value.trim()) {
                    this.navigateTo('/search', { q: value });
                }
            }, 500);
            
            searchInput.addEventListener('input', (e) => {
                const value = e.target.value;
                if (clearSearch) {
                    clearSearch.style.display = value ? 'block' : 'none';
                }
                debouncedSearch(value);
            });
            
            // Enter key search
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const value = e.target.value.trim();
                    if (value) {
                        this.navigateTo('/search', { q: value });
                    }
                }
            });
        }
        
        if (clearSearch) {
            clearSearch.addEventListener('click', () => {
                searchInput.value = '';
                searchInput.focus();
                clearSearch.style.display = 'none';
                this.navigateTo('/search');
            });
        }

        // Perform search if query exists
        if (searchQuery) {
            try {
                const data = await api.searchAnime(searchQuery);
                
                const resultsContainer = document.getElementById('searchResults');
                if (!resultsContainer) return;
                
                if (data.error) {
                    resultsContainer.innerHTML = components.createErrorPage('Gagal melakukan pencarian');
                    return;
                }

                if (!data.data?.animeList?.length) {
                    resultsContainer.innerHTML = components.createEmptyState('Tidak ditemukan anime dengan kata kunci tersebut');
                    return;
                }

                resultsContainer.innerHTML = `
                    <div class="search-results">
                        ${data.data.animeList.map(anime => 
                            components.createSearchResultItem(anime)
                        ).join('')}
                    </div>
                `;

                this.attachCardEventListeners();
            } catch (error) {
                console.error('Search render error:', error);
                const resultsContainer = document.getElementById('searchResults');
                if (resultsContainer) {
                    resultsContainer.innerHTML = components.createErrorPage('Gagal melakukan pencarian');
                }
            }
        }
    }

    async renderFavorites() {
        this.currentPage = { type: 'favorites', data: null };
        
        const content = document.getElementById('app-content');
        const favorites = utils.getItem('favorites') || [];
        
        if (favorites.length === 0) {
            content.innerHTML = `
                <div class="page-header">
                    <h4><i class="fas fa-heart"></i> Favorit</h4>
                </div>
                ${components.createEmptyState('Belum ada anime favorit', 'fas fa-heart-broken')}
            `;
            return;
        }

        content.innerHTML = `
            <div class="page-header">
                <h4><i class="fas fa-heart"></i> Favorit (${favorites.length})</h4>
            </div>
            <div class="mobile-grid" id="favoritesList">
                ${favorites.map(fav => 
                    components.createAnimeCard({
                        animeId: fav.animeId,
                        title: fav.title,
                        poster: fav.poster,
                        episodes: 'Favorit'
                    })
                ).join('')}
            </div>
        `;

        this.attachCardEventListeners();
    }

    async renderHistory() {
        this.currentPage = { type: 'history', data: null };
        
        const content = document.getElementById('app-content');
        const history = utils.getHistory();
        
        if (history.length === 0) {
            content.innerHTML = `
                <div class="page-header">
                    <h4><i class="fas fa-history"></i> Riwayat</h4>
                </div>
                ${components.createEmptyState('Belum ada riwayat tontonan', 'fas fa-history')}
            `;
            return;
        }

        // Group by anime
        const grouped = {};
        history.forEach(item => {
            if (!grouped[item.animeId]) {
                grouped[item.animeId] = {
                    ...item,
                    lastWatched: item.watchedAt,
                    watchCount: 1
                };
            } else {
                grouped[item.animeId].watchCount++;
                if (new Date(item.watchedAt) > new Date(grouped[item.animeId].lastWatched)) {
                    grouped[item.animeId].lastWatched = item.watchedAt;
                }
            }
        });

        const historyList = Object.values(grouped).sort((a, b) => 
            new Date(b.lastWatched) - new Date(a.lastWatched)
        );

        content.innerHTML = `
            <div class="page-header">
                <h4><i class="fas fa-history"></i> Riwayat (${historyList.length})</h4>
            </div>
            <div class="mobile-grid" id="historyList">
                ${historyList.map(item => 
                    components.createAnimeCard({
                        animeId: item.animeId,
                        title: item.title,
                        poster: item.poster,
                        episodes: `Ditonton ${item.watchCount}x`
                    })
                ).join('')}
            </div>
        `;

        this.attachCardEventListeners();
    }

    async renderAnimeDetail(params) {
        const { id } = params;
        this.currentPage = { type: 'anime-detail', id, data: null };
        
        const content = document.getElementById('app-content');
        content.innerHTML = components.utils.generateSkeletonCards(1);

        try {
            const data = await api.getAnimeDetail(id);
            
            if (data.error) {
                content.innerHTML = components.createErrorPage('Gagal memuat detail anime');
                return;
            }

            if (!data.data?.details) {
                content.innerHTML = components.createErrorPage('Anime tidak ditemukan');
                return;
            }

            const detail = data.data.details;
            content.innerHTML = components.createAnimeDetail(detail);
            
            // Add to history
            utils.addToHistory(detail);
            
            this.attachCardEventListeners();
        } catch (error) {
            console.error('Anime detail render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat detail anime');
        }
    }

    async renderWatch(params) {
        const { id } = params;
        this.currentPage = { type: 'watch', id, data: null };
        
        const content = document.getElementById('app-content');
        content.innerHTML = components.utils.generateSkeletonCards(1);

        try {
            const data = await api.getEpisodeDetail(id);
            
            if (data.error) {
                content.innerHTML = components.createErrorPage('Gagal memuat episode');
                return;
            }

            if (!data.data?.details) {
                content.innerHTML = components.createErrorPage('Episode tidak ditemukan');
                return;
            }

            const episode = data.data.details;
            content.innerHTML = components.createWatchPage(data);
            
            // Load video
            await this.loadVideoPlayer(episode);
            
            // Add to history
            const animeData = {
                animeId: episode.animeId,
                title: episode.title,
                poster: '' // We don't have poster in episode data
            };
            utils.addToHistory(animeData, {
                episodeId: id,
                title: episode.title.split('Episode')[1]?.trim() || 'Episode'
            });
            
            this.attachCardEventListeners();
        } catch (error) {
            console.error('Watch render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat episode');
        }
    }

    async renderProfile() {
        this.currentPage = { type: 'profile', data: null };
        
        const favorites = utils.getItem('favorites') || [];
        const history = utils.getHistory();
        
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="mobile-detail-page">
                <div class="detail-header">
                    <h4><i class="fas fa-user"></i> Profil</h4>
                </div>
                
                <div class="anime-detail-mobile">
                    <div class="detail-poster" style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));">
                        <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                            <div class="user-avatar" style="width: 100px; height: 100px; font-size: 2.5rem;">
                                <i class="fas fa-user"></i>
                            </div>
                        </div>
                    </div>
                    
                    <div class="detail-info">
                        <h1 class="detail-title">Anime Lover</h1>
                        
                        <div class="detail-meta">
                            <span><i class="fas fa-crown"></i> Premium Member</span>
                            <span><i class="fas fa-calendar"></i> Bergabung 2024</span>
                        </div>
                        
                        <div class="stats-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
                            <div class="stat-card" style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 10px; text-align: center;">
                                <div style="font-size: 1.5rem; color: var(--primary-color);">
                                    <i class="fas fa-heart"></i>
                                </div>
                                <div style="font-size: 1.8rem; font-weight: bold; margin: 5px 0;">${favorites.length}</div>
                                <div style="font-size: 0.8rem; opacity: 0.7;">Favorit</div>
                            </div>
                            <div class="stat-card" style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 10px; text-align: center;">
                                <div style="font-size: 1.5rem; color: var(--accent-color);">
                                    <i class="fas fa-history"></i>
                                </div>
                                <div style="font-size: 1.8rem; font-weight: bold; margin: 5px 0;">${history.length}</div>
                                <div style="font-size: 0.8rem; opacity: 0.7;">Ditonton</div>
                            </div>
                        </div>
                        
                        <div class="detail-synopsis">
                            <h6>Pengaturan</h6>
                            <div class="settings-list">
                                <button class="episode-card" onclick="utils.toggleTheme()">
                                    <div class="episode-number">
                                        <i class="fas fa-${utils.theme === 'dark' ? 'moon' : 'sun'}"></i>
                                    </div>
                                    <div class="episode-info">
                                        <div class="episode-title">Tema ${utils.theme === 'dark' ? 'Gelap' : 'Terang'}</div>
                                        <div class="episode-date">Ubah tampilan aplikasi</div>
                                    </div>
                                    <div class="episode-play">
                                        <i class="fas fa-toggle-${utils.theme === 'dark' ? 'on' : 'off'}"></i>
                                    </div>
                                </button>
                                
                                <button class="episode-card" onclick="api.clearCache(); utils.showToast('Cache dibersihkan', 'success')">
                                    <div class="episode-number">
                                        <i class="fas fa-broom"></i>
                                    </div>
                                    <div class="episode-info">
                                        <div class="episode-title">Bersihkan Cache</div>
                                        <div class="episode-date">Hapus data sementara</div>
                                    </div>
                                    <div class="episode-play">
                                        <i class="fas fa-chevron-right"></i>
                                    </div>
                                </button>
                                
                                <button class="episode-card" onclick="if(confirm('Hapus semua riwayat?')){localStorage.removeItem('watchHistory'); utils.showToast('Riwayat dihapus', 'success'); router.handleRoute();}">
                                    <div class="episode-number">
                                        <i class="fas fa-trash"></i>
                                    </div>
                                    <div class="episode-info">
                                        <div class="episode-title">Hapus Riwayat</div>
                                        <div class="episode-date">Bersihkan riwayat tontonan</div>
                                    </div>
                                    <div class="episode-play">
                                        <i class="fas fa-chevron-right"></i>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Video player loading
    async loadVideoPlayer(episodeData) {
        const container = document.getElementById('videoPlayerContainer');
        if (!container) return;

        try {
            // Get video URL
            const videoUrl = await api.getVideoUrl({ data: { details: episodeData } }, '480p', 0);
            
            if (!videoUrl) {
                container.innerHTML = `
                    <div class="no-video">
                        <i class="fas fa-video-slash"></i>
                        <p>Video tidak tersedia</p>
                        <p>Silakan coba server atau kualitas lain</p>
                    </div>
                `;
                return;
            }

            // Create iframe for video
            container.innerHTML = `
                <iframe src="${videoUrl}" 
                        allowfullscreen 
                        scrolling="no" 
                        frameborder="0" 
                        webkitallowfullscreen 
                        mozallowfullscreen></iframe>
            `;

            // Setup quality buttons
            const qualityButtons = document.querySelectorAll('.quality-btn');
            qualityButtons.forEach(btn => {
                btn.addEventListener('click', async () => {
                    // Update active button
                    qualityButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    // Get new video URL
                    const quality = btn.dataset.quality;
                    const serverIndex = parseInt(btn.dataset.serverIndex) || 0;
                    const newVideoUrl = await api.getVideoUrl({ data: { details: episodeData } }, quality, serverIndex);
                    
                    if (newVideoUrl) {
                        container.innerHTML = `
                            <iframe src="${newVideoUrl}" 
                                    allowfullscreen 
                                    scrolling="no" 
                                    frameborder="0" 
                                    webkitallowfullscreen 
                                    mozallowfullscreen></iframe>
                        `;
                    }
                });
            });

        } catch (error) {
            console.error('Video load error:', error);
            container.innerHTML = `
                <div class="no-video">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Gagal memuat video</p>
                    <p>Silakan coba lagi nanti</p>
                </div>
            `;
        }
    }

    // Attach event listeners to cards
    attachCardEventListeners() {
        // Watch buttons
        document.querySelectorAll('[data-action="watch"], [data-action="play-first"]').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const animeId = btn.dataset.animeId;
                if (!animeId) return;
                
                // Get anime detail to get first episode
                try {
                    const data = await api.getAnimeDetail(animeId);
                    if (data.data?.details?.episodeList?.length > 0) {
                        const firstEpisode = data.data.details.episodeList[0];
                        this.navigateTo(`/watch/${firstEpisode.episodeId}`);
                    } else {
                        this.navigateTo(`/anime/${animeId}`);
                    }
                } catch (error) {
                    console.error('Error getting first episode:', error);
                    this.navigateTo(`/anime/${animeId}`);
                }
            });
        });

        // Detail buttons
        document.querySelectorAll('[data-action="detail"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const animeId = btn.dataset.animeId;
                if (animeId) {
                    this.navigateTo(`/anime/${animeId}`);
                }
            });
        });

        // Favorite buttons
        document.querySelectorAll('[data-action="favorite"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const animeId = btn.dataset.animeId;
                const card = btn.closest('.anime-card, .result-item');
                
                if (animeId) {
                    if (utils.isFavorite(animeId)) {
                        utils.removeFromFavorites(animeId);
                        btn.innerHTML = '<i class="fas fa-heart-broken"></i>';
                        btn.classList.remove('watch');
                        btn.classList.add('detail');
                    } else {
                        utils.addToFavorites({
                            animeId: animeId,
                            title: card.querySelector('.card-title, .result-title')?.textContent || 'Anime',
                            poster: card.querySelector('img')?.src || ''
                        });
                        btn.innerHTML = '<i class="fas fa-heart"></i>';
                        btn.classList.remove('detail');
                        btn.classList.add('watch');
                    }
                }
            });
        });

        // Anime cards click
        document.querySelectorAll('.anime-card').forEach(card => {
            const animeId = card.dataset.animeId;
            if (animeId) {
                card.addEventListener('click', (e) => {
                    // Don't trigger if clicked on a button
                    if (!e.target.closest('button')) {
                        this.navigateTo(`/anime/${animeId}`);
                    }
                });
            }
        });
    }
}

// Export router instance
const router = new Router();