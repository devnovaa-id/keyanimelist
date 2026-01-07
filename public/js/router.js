// Router for KeyAnime

class Router {
    constructor() {
        this.routes = {};
        this.currentPath = '';
        this.utils = utils;
        this.api = api;
        this.components = components;
        this.currentPage = {};
        this.searchTimeout = null;
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
            result[key] = decodeURIComponent(value);
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

        // Clear search timeout
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = null;
        }

        if (route) {
            try {
                await route.handler(route.params, queryParams);
                this.utils.scrollToTop();
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
            const params = new URLSearchParams();
            for (const [key, value] of Object.entries(queryParams)) {
                params.set(key, encodeURIComponent(value));
            }
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
                content.innerHTML = components.createErrorPage('Gagal memuat halaman beranda', 'router.handleRoute()');
                return;
            }

            // New API structure: data.data contains ongoing and completed
            const homeData = data.data;
            
            let html = '';
            
            // Hero slider with ongoing anime
            if (homeData?.ongoing?.animeList) {
                const heroSlides = homeData.ongoing.animeList.slice(0, 5);
                html += components.createHeroSlider(heroSlides);
            }

            // Ongoing section
            html += `
                <div class="section-header">
                    <h4><i class="fas fa-fire"></i> Sedang Tayang</h4>
                    <a href="#/ongoing" class="see-all">Lihat Semua</a>
                </div>
                <div class="mobile-grid" id="ongoingList">
                    ${homeData?.ongoing?.animeList?.slice(0, 12).map(anime => 
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
                    ${homeData?.completed?.animeList?.slice(0, 12).map(anime => 
                        components.createAnimeCard({ ...anime, episodes: anime.episodes || '?' })
                    ).join('') || ''}
                </div>
            `;

            content.innerHTML = html;
            
            // Initialize carousel
            setTimeout(() => {
                components.initCarousel();
            }, 100);
            
            this.attachCardEventListeners();
        } catch (error) {
            console.error('Home render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat halaman beranda', 'router.handleRoute()');
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
                content.innerHTML = components.createErrorPage('Gagal memuat anime ongoing', 'router.handleRoute()');
                return;
            }

            // New API structure: data.data contains animeList
            const animeData = data.data;
            
            if (!animeData?.animeList?.length) {
                content.innerHTML = components.createEmptyState('Tidak ada anime ongoing', 'fas fa-fire');
                return;
            }

            const totalPages = data.pagination?.totalPages || 1;
            
            let html = `
                <div class="page-header">
                    <h4><i class="fas fa-fire"></i> Anime Sedang Tayang</h4>
                    <div class="page-info" style="font-size: 0.9rem; color: rgba(255,255,255,0.7)">
                        Halaman ${page} dari ${totalPages}
                    </div>
                </div>
                <div class="mobile-grid" id="ongoingList">
                    ${animeData.animeList.map(anime => 
                        components.createAnimeCard(anime)
                    ).join('')}
                </div>
            `;

            // Add pagination
            html += components.createPagination(page, totalPages, '#/ongoing');

            content.innerHTML = html;
            this.attachCardEventListeners();
        } catch (error) {
            console.error('Ongoing render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat anime ongoing', 'router.handleRoute()');
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
                content.innerHTML = components.createErrorPage('Gagal memuat anime selesai', 'router.handleRoute()');
                return;
            }

            // New API structure: data.data contains animeList
            const animeData = data.data;
            
            if (!animeData?.animeList?.length) {
                content.innerHTML = components.createEmptyState('Tidak ada anime selesai', 'fas fa-check-circle');
                return;
            }

            const totalPages = data.pagination?.totalPages || 1;
            
            let html = `
                <div class="page-header">
                    <h4><i class="fas fa-check-circle"></i> Anime Selesai</h4>
                    <div class="page-info" style="font-size: 0.9rem; color: rgba(255,255,255,0.7)">
                        Halaman ${page} dari ${totalPages}
                    </div>
                </div>
                <div class="mobile-grid" id="completedList">
                    ${animeData.animeList.map(anime => 
                        components.createAnimeCard({ ...anime, episodes: anime.episodes || '?' })
                    ).join('')}
                </div>
            `;

            // Add pagination
            html += components.createPagination(page, totalPages, '#/complete');

            content.innerHTML = html;
            this.attachCardEventListeners();
        } catch (error) {
            console.error('Complete render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat anime selesai', 'router.handleRoute()');
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
                content.innerHTML = components.createErrorPage('Gagal memuat genre', 'router.handleRoute()');
                return;
            }

            // New API structure: data.data contains genreList
            const genreData = data.data;
            
            if (!genreData?.genreList?.length) {
                content.innerHTML = components.createEmptyState('Tidak ada genre', 'fas fa-tags');
                return;
            }

            const html = `
                <div class="page-header">
                    <h4><i class="fas fa-tags"></i> Semua Genre</h4>
                </div>
                <div class="category-chips" style="justify-content: flex-start; flex-wrap: wrap;">
                    ${genreData.genreList.map(genre => 
                        components.createGenreChip(genre)
                    ).join('')}
                </div>
            `;

            content.innerHTML = html;
        } catch (error) {
            console.error('Genres render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat genre', 'router.handleRoute()');
        }
    }

    async renderGenreAnime(params, query = {}) {
        const page = parseInt(query.page) || 1;
        const { id } = params;
        this.currentPage = { type: 'genre', id, page, data: null };
        
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="page-header">
                <h4><i class="fas fa-tag"></i> Memuat...</h4>
            </div>
            ${components.utils.generateSkeletonCards(6)}
        `;

        try {
            const data = await api.getAnimeByGenre(id, page);
            
            if (data.error) {
                content.innerHTML = components.createErrorPage('Gagal memuat anime genre', 'router.handleRoute()');
                return;
            }

            // New API structure: data.data contains animeList
            const animeData = data.data;
            
            if (!animeData?.animeList?.length) {
                content.innerHTML = components.createEmptyState(
                    'Tidak ada anime untuk genre ini',
                    'fas fa-tag',
                    'Coba genre lain atau halaman lain'
                );
                return;
            }

            const genreName = id.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            
            const totalPages = data.pagination?.totalPages || 1;
            
            let html = `
                <div class="page-header">
                    <h4><i class="fas fa-tag"></i> ${genreName}</h4>
                    <div class="page-info" style="font-size: 0.9rem; color: rgba(255,255,255,0.7)">
                        Halaman ${page} dari ${totalPages}
                    </div>
                </div>
                <div class="mobile-grid" id="genreList">
                    ${animeData.animeList.map(anime => 
                        components.createAnimeCard(anime)
                    ).join('')}
                </div>
            `;

            // Add pagination
            html += components.createPagination(page, totalPages, `#/genre/${id}`);

            content.innerHTML = html;
            this.attachCardEventListeners();
        } catch (error) {
            console.error('Genre anime render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat anime genre', 'router.handleRoute()');
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
                content.innerHTML = components.createErrorPage('Gagal memuat jadwal', 'router.handleRoute()');
                return;
            }

            // New API structure: data.data contains scheduleList
            const scheduleData = data.data;
            
            if (!scheduleData?.scheduleList?.length) {
                content.innerHTML = components.createEmptyState('Tidak ada jadwal', 'fas fa-calendar-alt');
                return;
            }

            const html = `
                <div class="page-header">
                    <h4><i class="fas fa-calendar-alt"></i> Jadwal Tayang</h4>
                </div>
                ${scheduleData.scheduleList.map(day => 
                    components.createScheduleDay(day)
                ).join('')}
            `;

            content.innerHTML = html;
        } catch (error) {
            console.error('Schedule render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat jadwal', 'router.handleRoute()');
        }
    }

    async renderSearch(params = {}, query = {}) {
        const searchQuery = query.q || '';
        this.currentPage = { type: 'search', query: searchQuery, data: null };
        
        const content = document.getElementById('app-content');
        
        let html = `
            <div class="mobile-search-page">
                <div class="search-header">
                    <form class="search-form" id="search-page-form">
                        <div class="search-box">
                            <i class="fas fa-search"></i>
                            <input type="text" 
                                   id="searchInput" 
                                   placeholder="Cari anime..." 
                                   value="${searchQuery.replace(/"/g, '&quot;')}"
                                   autocomplete="off">
                            ${searchQuery ? `
                                <button type="button" class="clear-search" id="clearSearch">
                                    <i class="fas fa-times"></i>
                                </button>
                            ` : ''}
                            <button type="submit" style="display: none;"></button>
                        </div>
                    </form>
                </div>
                <div id="searchResults">
        `;
    
        if (searchQuery) {
            html += components.utils.generateSearchSkeleton(3);
        } else {
            html += components.createEmptyState(
                'Masukkan kata kunci pencarian',
                'fas fa-search',
                'Tekan Enter untuk mencari'
            );
        }
    
        html += `</div></div>`;
        content.innerHTML = html;
    
        // Setup search form submit
        const searchForm = document.getElementById('search-page-form');
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');
        
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const value = searchInput.value.trim();
                if (value && value.length >= 3) {
                    this.navigateTo('/search', { q: value });
                } else {
                    utils.showToast('Masukkan minimal 3 karakter', 'error');
                }
            });
        }
        
        if (searchInput) {
            // Focus on input
            searchInput.focus();
            
            // Enter key for search
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = e.target.value.trim();
                    if (value && value.length >= 3) {
                        this.navigateTo('/search', { q: value });
                    } else {
                        utils.showToast('Masukkan minimal 3 karakter', 'error');
                    }
                }
            });
            
            // Show/hide clear button
            searchInput.addEventListener('input', (e) => {
                const value = e.target.value.trim();
                if (clearSearch) {
                    clearSearch.style.display = value ? 'block' : 'none';
                }
                
                // Show search hint for short queries
                const resultsContainer = document.getElementById('searchResults');
                if (!value) {
                    resultsContainer.innerHTML = components.createEmptyState(
                        'Masukkan kata kunci pencarian',
                        'fas fa-search',
                        'Tekan Enter untuk mencari'
                    );
                } else if (value.length < 3) {
                    resultsContainer.innerHTML = components.createEmptyState(
                        'Masukkan minimal 3 karakter',
                        'fas fa-search',
                        `Mencari: ${value}`
                    );
                }
            });
        }
        
        if (clearSearch) {
            clearSearch.addEventListener('click', () => {
                searchInput.value = '';
                searchInput.focus();
                clearSearch.style.display = 'none';
                
                // Clear search results
                document.getElementById('searchResults').innerHTML = 
                    components.createEmptyState(
                        'Masukkan kata kunci pencarian',
                        'fas fa-search',
                        'Tekan Enter untuk mencari'
                    );
                
                // Navigate without query
                this.navigateTo('/search');
            });
        }
    
        // Perform search if query exists and has at least 3 characters
        if (searchQuery && searchQuery.length >= 3) {
            await this.performSearchOperation(searchQuery);
        }
    }

    async performSearchOperation(searchQuery) {
        try {
            const data = await api.searchAnime(searchQuery);
            
            const resultsContainer = document.getElementById('searchResults');
            if (!resultsContainer) return;
            
            if (data.error) {
                resultsContainer.innerHTML = components.createErrorPage(
                    'Gagal melakukan pencarian',
                    'router.navigateTo(\'/search\', { q: \'' + searchQuery + '\' })'
                );
                return;
            }
    
            // New API structure: data.data contains animeList
            const searchData = data.data;
            
            if (!searchData?.animeList?.length) {
                resultsContainer.innerHTML = components.createEmptyState(
                    `Tidak ditemukan hasil untuk "${searchQuery}"`,
                    'fas fa-search',
                    'Coba kata kunci yang berbeda'
                );
                return;
            }
    
            resultsContainer.innerHTML = `
                <div style="margin-bottom: 10px; color: rgba(255,255,255,0.7);">
                    <i class="fas fa-info-circle"></i> Ditemukan ${searchData.animeList.length} hasil untuk "${searchQuery}"
                </div>
                <div class="search-results">
                    ${searchData.animeList.map(anime => 
                        components.createSearchResultItem(anime)
                    ).join('')}
                </div>
            `;
    
            this.attachCardEventListeners();
        } catch (error) {
            console.error('Search render error:', error);
            const resultsContainer = document.getElementById('searchResults');
            if (resultsContainer) {
                resultsContainer.innerHTML = components.createErrorPage(
                    'Gagal melakukan pencarian',
                    'router.navigateTo(\'/search\', { q: \'' + searchQuery + '\' })'
                );
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
                ${components.createEmptyState(
                    'Belum ada anime favorit',
                    'fas fa-heart-broken',
                    'Tambahkan anime ke favorit dengan menekan tombol hati'
                )}
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
            <div style="text-align: center; margin: 20px 0;">
                <button class="card-btn detail" onclick="if(confirm('Hapus semua favorit?')){localStorage.removeItem('favorites'); router.handleRoute();}">
                    <i class="fas fa-trash"></i> Hapus Semua Favorit
                </button>
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
                ${components.createEmptyState(
                    'Belum ada riwayat tontonan',
                    'fas fa-history',
                    'Tonton anime untuk melihat riwayat di sini'
                )}
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
            <div style="text-align: center; margin: 20px 0;">
                <button class="card-btn detail" onclick="if(confirm('Hapus semua riwayat?')){localStorage.removeItem('watchHistory'); router.handleRoute();}">
                    <i class="fas fa-trash"></i> Hapus Semua Riwayat
                </button>
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
            const animeId = decodeURIComponent(id);
            const data = await api.getAnimeDetail(animeId);
            
            if (data.error) {
                content.innerHTML = components.createErrorPage('Gagal memuat detail anime', 'window.history.back()');
                return;
            }

            // New API structure: data.data contains details
            const details = data.data?.details;
            
            if (!details) {
                content.innerHTML = components.createErrorPage('Anime tidak ditemukan', 'window.history.back()');
                return;
            }

            // Ensure animeId is available
            if (!details.animeId) {
                details.animeId = animeId;
            }
            
            content.innerHTML = components.createAnimeDetail(details);
            
            // Add to history
            utils.addToHistory(details);
            
            this.attachCardEventListeners();
        } catch (error) {
            console.error('Anime detail render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat detail anime', 'window.history.back()');
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
                content.innerHTML = components.createErrorPage('Gagal memuat episode', 'window.history.back()');
                return;
            }

            // New API structure: data.data contains details
            const episode = data.data?.details;
            
            if (!episode) {
                content.innerHTML = components.createErrorPage('Episode tidak ditemukan', 'window.history.back()');
                return;
            }

            content.innerHTML = components.createWatchPage(data);
            
            // Load video
            await this.loadVideoPlayer(episode);
            
            // Add to history
            const animeData = {
                animeId: episode.animeId,
                title: episode.title,
                poster: episode.poster || ''
            };
            utils.addToHistory(animeData, {
                episodeId: id,
                title: `Episode ${episode.title?.split('Episode')[1]?.trim() || '1'}`
            });
            
            this.attachCardEventListeners();
        } catch (error) {
            console.error('Watch render error:', error);
            content.innerHTML = components.createErrorPage('Gagal memuat episode', 'window.history.back()');
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
                    <button class="back-btn" onclick="window.history.back()">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <h4><i class="fas fa-user"></i> Profil</h4>
                </div>
                
                <div class="anime-detail-mobile" style="margin-top: 10px;">
                    <!-- Profile Card -->
                    <div class="profile-card" style="background: var(--card-bg); border-radius: var(--card-radius); padding: 20px; margin-bottom: 20px;">
                        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                            <div class="user-avatar-large" style="width: 70px; height: 70px; border-radius: 50%; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: white;">
                                <i class="fas fa-user"></i>
                            </div>
                            <div>
                                <h1 style="font-size: 1.3rem; font-weight: 600; margin-bottom: 5px;">Anime Lover</h1>
                                <div style="display: flex; align-items: center; gap: 10px; color: rgba(255,255,255,0.7); font-size: 0.9rem;">
                                    <span><i class="fas fa-crown" style="color: #FFD700;"></i> Premium</span>
                                    <span><i class="fas fa-calendar"></i> Bergabung 2026</span>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Stats Section -->
                        <div class="stats-section" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                            <div class="stat-item" style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 15px; text-align: center;">
                                <div style="font-size: 1.8rem; color: var(--primary-color); font-weight: 600;">${favorites.length}</div>
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7);">Favorit</div>
                            </div>
                            <div class="stat-item" style="background: rgba(255,255,255,0.05); border-radius: 10px; padding: 15px; text-align: center;">
                                <div style="font-size: 1.8rem; color: var(--accent-color); font-weight: 600;">${history.length}</div>
                                <div style="font-size: 0.85rem; color: rgba(255,255,255,0.7);">Ditonton</div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Quick Actions -->
                    <div class="quick-actions" style="background: var(--card-bg); border-radius: var(--card-radius); padding: 20px; margin-bottom: 20px;">
                        <h5 style="font-size: 1rem; color: var(--primary-color); margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-bolt"></i> Aksi Cepat
                        </h5>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="card-btn watch" onclick="router.navigateTo('/favorites')" style="flex: 1; min-width: 120px;">
                                <i class="fas fa-heart"></i> Favorit
                            </button>
                            <button class="card-btn detail" onclick="router.navigateTo('/history')" style="flex: 1; min-width: 120px;">
                                <i class="fas fa-history"></i> Riwayat
                            </button>
                        </div>
                    </div>
                    
                    <!-- Settings Section -->
                    <div class="settings-section" style="background: var(--card-bg); border-radius: var(--card-radius); padding: 20px; margin-bottom: 20px;">
                        <h5 style="font-size: 1rem; color: var(--primary-color); margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                            <i class="fas fa-cog"></i> Pengaturan
                        </h5>
                        
                        <div class="settings-list" style="display: flex; flex-direction: column; gap: 10px;">
                            <button class="setting-item" onclick="utils.toggleTheme()" style="background: rgba(255,255,255,0.05); border: 1px solid var(--card-border); border-radius: 10px; padding: 15px; display: flex; align-items: center; justify-content: space-between; width: 100%; color: var(--light-color); transition: all 0.3s ease;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 36px; height: 36px; border-radius: 8px; background: var(--primary-color); display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-${utils.theme === 'dark' ? 'moon' : 'sun'}"></i>
                                    </div>
                                    <div style="text-align: left;">
                                        <div style="font-weight: 500; font-size: 0.95rem;">Tema ${utils.theme === 'dark' ? 'Gelap' : 'Terang'}</div>
                                        <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Ubah tampilan aplikasi</div>
                                    </div>
                                </div>
                                <i class="fas fa-chevron-right" style="color: rgba(255,255,255,0.5);"></i>
                            </button>
                            
                            <button class="setting-item" onclick="api.clearCache(); utils.showToast('Cache dibersihkan', 'success')" style="background: rgba(255,255,255,0.05); border: 1px solid var(--card-border); border-radius: 10px; padding: 15px; display: flex; align-items: center; justify-content: space-between; width: 100%; color: var(--light-color); transition: all 0.3s ease;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 36px; height: 36px; border-radius: 8px; background: var(--accent-color); display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-broom"></i>
                                    </div>
                                    <div style="text-align: left;">
                                        <div style="font-weight: 500; font-size: 0.95rem;">Bersihkan Cache</div>
                                        <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Hapus data sementara</div>
                                    </div>
                                </div>
                                <i class="fas fa-chevron-right" style="color: rgba(255,255,255,0.5);"></i>
                            </button>
                            
                            <button class="setting-item" onclick="if(confirm('Hapus semua data aplikasi? (favorit, riwayat, dll)')){localStorage.clear(); location.reload();}" style="background: rgba(255,255,255,0.05); border: 1px solid var(--card-border); border-radius: 10px; padding: 15px; display: flex; align-items: center; justify-content: space-between; width: 100%; color: var(--light-color); transition: all 0.3s ease;">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div style="width: 36px; height: 36px; border-radius: 8px; background: #ff4757; display: flex; align-items: center; justify-content: center;">
                                        <i class="fas fa-trash"></i>
                                    </div>
                                    <div style="text-align: left;">
                                        <div style="font-weight: 500; font-size: 0.95rem;">Reset Aplikasi</div>
                                        <div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">Hapus semua data lokal</div>
                                    </div>
                                </div>
                                <i class="fas fa-chevron-right" style="color: rgba(255,255,255,0.5);"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Developer Info -->
                    <div class="developer-info" style="background: var(--card-bg); border-radius: var(--card-radius); padding: 20px; text-align: center;">
                        <div style="color: var(--accent-color); margin-bottom: 10px; display: flex; align-items: center; justify-content: center; gap: 10px; font-size: 0.95rem;">
                            <i class="fas fa-code"></i>
                            <span>this.key@devnova.icu</span>
                        </div>
                        <div style="font-size: 0.85rem; color: rgba(255,255,255,0.5);">
                            KeyAnime v2.0 • Made with <i class="fas fa-heart" style="color: var(--primary-color);"></i> for Anime Lovers
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add hover effects for setting items
        setTimeout(() => {
            document.querySelectorAll('.setting-item').forEach(item => {
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'translateX(5px)';
                    item.style.background = 'rgba(255,255,255,0.08)';
                });
                item.addEventListener('mouseleave', () => {
                    item.style.transform = 'translateX(0)';
                    item.style.background = 'rgba(255,255,255,0.05)';
                });
            });
        }, 100);
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
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
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
                    
                    // Show loading
                    container.innerHTML = `
                        <div class="loading-video">
                            <i class="fas fa-spinner fa-spin"></i>
                            <p>Memuat video...</p>
                        </div>
                    `;
                    
                    // Get new video URL
                    const quality = btn.dataset.quality;
                    const serverIndex = parseInt(btn.dataset.serverIndex) || 0;
                    const newVideoUrl = await api.getVideoUrl({ data: { details: episodeData } }, quality, serverIndex);
                    
                    if (newVideoUrl) {
                        container.innerHTML = `
                            <iframe src="${newVideoUrl}" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowfullscreen 
                                    scrolling="no" 
                                    frameborder="0" 
                                    webkitallowfullscreen 
                                    mozallowfullscreen></iframe>
                        `;
                    } else {
                        container.innerHTML = `
                            <div class="no-video">
                                <i class="fas fa-exclamation-triangle"></i>
                                <p>Gagal memuat video</p>
                                <p>Silakan coba lagi nanti</p>
                            </div>
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
        // Watch buttons - ALWAYS TAKE EPISODE 1
        document.querySelectorAll('[data-action="watch"], [data-action="play-first"]').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const animeId = btn.dataset.animeId;
                const firstEpisodeId = btn.dataset.firstEpisode;
                
                console.log('Watch button clicked, animeId:', animeId, 'firstEpisodeId:', firstEpisodeId);
                
                // If button has firstEpisodeId, use it directly
                if (firstEpisodeId) {
                    this.navigateTo(`/watch/${firstEpisodeId}`);
                    return;
                }
                
                // If not, fetch anime detail and take first episode
                if (!animeId || animeId === 'undefined') {
                    utils.showToast('ID anime tidak valid', 'error');
                    return;
                }
                
                // Show loading
                utils.showLoading();
                
                // Get anime detail to get first episode
                try {
                    const data = await api.getAnimeDetail(animeId);
                    console.log('Anime data for first episode:', data);
                    
                    // New API structure: data.data contains details
                    const details = data.data?.details;
                    
                    if (details?.episodeList?.length > 0) {
                        // Sort episodes to get episode 1
                        const sortedEpisodes = [...details.episodeList].sort((a, b) => {
                            const getEpisodeNumber = (ep) => {
                                const titleNum = parseInt(ep.title);
                                if (!isNaN(titleNum)) return titleNum;
                                
                                const match = ep.title?.match(/Episode\s*(\d+)/i) || ep.title?.match(/(\d+)/);
                                if (match) return parseInt(match[1]);
                                
                                const idMatch = ep.episodeId?.match(/episode-(\d+)/i);
                                if (idMatch) return parseInt(idMatch[1]);
                                
                                return 0;
                            };
                            return getEpisodeNumber(a) - getEpisodeNumber(b);
                        });
                        
                        const firstEpisode = sortedEpisodes[0];
                        console.log('First episode after sorting:', firstEpisode);
                        
                        // Ensure episodeId exists
                        if (firstEpisode.episodeId) {
                            this.navigateTo(`/watch/${firstEpisode.episodeId}`);
                        } else {
                            // Fallback: use slug or other ID
                            const episodeSlug = firstEpisode.slug || `episode-1`;
                            this.navigateTo(`/watch/${episodeSlug}`);
                        }
                    } else {
                        utils.showToast('Episode tidak ditemukan', 'error');
                        this.navigateTo(`/anime/${animeId}`);
                    }
                } catch (error) {
                    console.error('Error getting first episode:', error);
                    utils.showToast('Gagal memuat episode', 'error');
                    this.navigateTo(`/anime/${animeId}`);
                } finally {
                    utils.hideLoading();
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
                        btn.innerHTML = '<i class="fas fa-heart-broken"></i>' + (btn.textContent.includes('Favorit') ? ' Tambah Favorit' : '');
                        btn.classList.remove('watch');
                        btn.classList.add('detail');
                    } else {
                        const title = card.querySelector('.card-title, .result-title')?.textContent || 'Anime';
                        const poster = card.querySelector('img')?.src || '';
                        utils.addToFavorites({
                            animeId: animeId,
                            title: title,
                            poster: poster
                        });
                        btn.innerHTML = '<i class="fas fa-heart"></i>' + (btn.textContent.includes('Favorit') ? ' Favorit' : '');
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

        // Play buttons in hero carousel
        document.querySelectorAll('.btn-play[data-anime-id]').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const animeId = btn.dataset.animeId;
                if (!animeId) return;
                
                utils.showLoading();
                try {
                    const data = await api.getAnimeDetail(animeId);
                    // New API structure: data.data contains details
                    const details = data.data?.details;
                    
                    if (details?.episodeList?.length > 0) {
                        // Sort episodes to get episode 1
                        const sortedEpisodes = [...details.episodeList].sort((a, b) => {
                            const getEpisodeNumber = (ep) => {
                                const titleNum = parseInt(ep.title);
                                if (!isNaN(titleNum)) return titleNum;
                                
                                const match = ep.title?.match(/Episode\s*(\d+)/i) || ep.title?.match(/(\d+)/);
                                if (match) return parseInt(match[1]);
                                
                                const idMatch = ep.episodeId?.match(/episode-(\d+)/i);
                                if (idMatch) return parseInt(idMatch[1]);
                                
                                return 0;
                            };
                            return getEpisodeNumber(a) - getEpisodeNumber(b);
                        });
                        const firstEpisode = sortedEpisodes[0];
                        this.navigateTo(`/watch/${firstEpisode.episodeId}`);
                    } else {
                        this.navigateTo(`/anime/${animeId}`);
                    }
                } catch (error) {
                    console.error('Error getting first episode from carousel:', error);
                    this.navigateTo(`/anime/${animeId}`);
                } finally {
                    utils.hideLoading();
                }
            });
        });
    }
}

// Export router instance
const router = new Router();