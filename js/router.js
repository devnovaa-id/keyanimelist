// Router for SPA
class Router {
    static currentPage = 'home';
    static currentParams = {};

    // Initialize router
    static init() {
        // Handle hash changes
        window.addEventListener('hashchange', () => this.loadPage());
        
        // Handle initial load
        window.addEventListener('load', () => {
            Utils.initTheme();
            this.loadPage();
            this.setupEventListeners();
        });
        
        // Handle back/forward buttons
        window.addEventListener('popstate', () => this.loadPage());
    }

    // Setup event listeners
    static setupEventListeners() {
        // Menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const closeMenu = document.getElementById('closeMenu');
        const sidebarBackdrop = document.getElementById('sidebarBackdrop');
        
        if (menuToggle) {
            menuToggle.addEventListener('click', () => this.toggleSidebar(true));
        }
        
        if (closeMenu) {
            closeMenu.addEventListener('click', () => this.toggleSidebar(false));
        }
        
        if (sidebarBackdrop) {
            sidebarBackdrop.addEventListener('click', () => this.toggleSidebar(false));
        }

        // Search toggle
        const searchToggle = document.getElementById('searchToggle');
        const mobileSearch = document.getElementById('mobileSearch');
        
        if (searchToggle) {
            searchToggle.addEventListener('click', () => {
                mobileSearch.classList.toggle('active');
                if (mobileSearch.classList.contains('active')) {
                    document.getElementById('search-input').focus();
                }
            });
        }

        // Search form
        const searchForm = document.getElementById('search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('search-input');
                if (input.value.trim()) {
                    this.navigateTo('search', null, { q: input.value.trim() });
                    mobileSearch.classList.remove('active');
                    input.value = '';
                }
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => Utils.toggleTheme());
        }

        // Bottom nav
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const href = item.getAttribute('href');
                if (href) {
                    window.location.hash = href;
                }
            });
        });

        // Sidebar nav
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href) {
                    window.location.hash = href;
                    this.toggleSidebar(false);
                }
            });
        });
    }

    // Toggle sidebar
    static toggleSidebar(show) {
        const sidebar = document.getElementById('sidebarMenu');
        const backdrop = document.getElementById('sidebarBackdrop');
        
        if (show) {
            sidebar.classList.add('active');
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            sidebar.classList.remove('active');
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Load page based on hash
    static async loadPage() {
        this.currentPage = Utils.getCurrentPage();
        this.currentParams = Utils.getQueryParams();
        
        // Update active nav items
        this.updateActiveNav();
        
        // Load page content
        switch (this.currentPage) {
            case 'home':
                await this.loadHomePage();
                break;
            case 'ongoing':
                await this.loadOngoingPage();
                break;
            case 'complete':
                await this.loadCompletePage();
                break;
            case 'genre':
                await this.loadGenrePage();
                break;
            case 'schedule':
                await this.loadSchedulePage();
                break;
            case 'search':
                await this.loadSearchPage();
                break;
            case 'favorites':
                await this.loadFavoritesPage();
                break;
            case 'history':
                await this.loadHistoryPage();
                break;
            case 'detail':
                await this.loadDetailPage();
                break;
            case 'watch':
                await this.loadWatchPage();
                break;
            default:
                await this.loadHomePage();
        }
    }

    // Update active nav items
    static updateActiveNav() {
        // Update sidebar nav
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#/${this.currentPage}` || 
                (href === '#/' && this.currentPage === 'home')) {
                link.classList.add('active');
            }
        });

        // Update bottom nav
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#/${this.currentPage}` || 
                (href === '#/' && this.currentPage === 'home')) {
                item.classList.add('active');
            }
        });
    }

    // Navigate to page
    static navigateTo(page, slug = null, params = {}) {
        let hash = `#/${page}`;
        if (slug) {
            params.slug = slug;
        }
        if (Object.keys(params).length > 0) {
            const queryString = new URLSearchParams(params).toString();
            hash += `?${queryString}`;
        }
        window.location.hash = hash;
    }

    // Load home page
    static async loadHomePage() {
        const content = document.getElementById('app-content');
        content.innerHTML = `
            <div class="home-page">
                <div class="hero-section">
                    <!-- Hero slides will be loaded here -->
                </div>
                
                <div class="category-chips">
                    <!-- Genre chips will be loaded here -->
                </div>
                
                <div class="section-header">
                    <h4><i class="fas fa-fire"></i> Sedang Tayang</h4>
                    <a href="#/ongoing" class="see-all">Lihat Semua</a>
                </div>
                <div class="mobile-grid" id="ongoing-list">
                    ${Utils.generateSkeletonCards(8)}
                </div>
                
                <div class="section-header">
                    <h4><i class="fas fa-check-circle"></i> Anime Selesai</h4>
                    <a href="#/complete" class="see-all">Lihat Semua</a>
                </div>
                <div class="mobile-grid" id="complete-list">
                    ${Utils.generateSkeletonCards(8)}
                </div>
            </div>
        `;

        // Load content
        await Promise.all([
            Components.renderHeroSection(),
            Components.renderGenreChips(),
            this.loadHomeAnimeLists()
        ]);
    }

    // Load anime lists for home page
    static async loadHomeAnimeLists() {
        try {
            // Load ongoing anime
            const ongoingList = await API.getAnimeList({ type: 'ongoing', page: 1 });
            const ongoingContainer = document.getElementById('ongoing-list');
            if (ongoingContainer) {
                ongoingContainer.innerHTML = ongoingList.slice(0, 8)
                    .map(anime => Components.createAnimeCard(anime))
                    .join('');
            }

            // Load complete anime
            const completeList = await API.getAnimeList({ type: 'complete', page: 1 });
            const completeContainer = document.getElementById('complete-list');
            if (completeContainer) {
                completeContainer.innerHTML = completeList.slice(0, 8)
                    .map(anime => Components.createAnimeCard(anime))
                    .join('');
            }
        } catch (error) {
            console.error('Error loading home anime lists:', error);
        }
    }

    // Load ongoing page
    static async loadOngoingPage() {
        const content = document.getElementById('app-content');
        const page = parseInt(this.currentParams.page) || 1;
        
        content.innerHTML = `
            <div class="page-header">
                <h4><i class="fas fa-play-circle"></i> Anime Sedang Tayang</h4>
            </div>
            <div class="mobile-grid" id="anime-list">
                ${Utils.generateSkeletonCards(12)}
            </div>
            <div class="load-more" id="load-more" style="display: none;">
                <button class="btn btn-primary" onclick="Router.loadMore('ongoing')">
                    <i class="fas fa-arrow-down"></i> Muat Lebih Banyak
                </button>
            </div>
        `;

        await this.loadAnimeList('ongoing', page);
    }

    // Load complete page
    static async loadCompletePage() {
        const content = document.getElementById('app-content');
        const page = parseInt(this.currentParams.page) || 1;
        
        content.innerHTML = `
            <div class="page-header">
                <h4><i class="fas fa-check-circle"></i> Anime Selesai</h4>
            </div>
            <div class="mobile-grid" id="anime-list">
                ${Utils.generateSkeletonCards(12)}
            </div>
            <div class="load-more" id="load-more" style="display: none;">
                <button class="btn btn-primary" onclick="Router.loadMore('complete')">
                    <i class="fas fa-arrow-down"></i> Muat Lebih Banyak
                </button>
            </div>
        `;

        await this.loadAnimeList('complete', page);
    }

    // Load genre page
    static async loadGenrePage() {
        const genreName = this.currentParams.name || '';
        const content = document.getElementById('app-content');
        
        content.innerHTML = `
            <div class="page-header">
                <h4><i class="fas fa-tags"></i> Genre${genreName ? `: ${genreName}` : ''}</h4>
            </div>
            ${!genreName ? `
                <div class="category-chips">
                    <!-- Genre chips will be loaded here -->
                </div>
            ` : `
                <div class="mobile-grid" id="anime-list">
                    ${Utils.generateSkeletonCards(12)}
                </div>
                <div class="load-more" id="load-more" style="display: none;">
                    <button class="btn btn-primary" onclick="Router.loadMore('genre', '${genreName}')">
                        <i class="fas fa-arrow-down"></i> Muat Lebih Banyak
                    </button>
                </div>
            `}
        `;

        if (!genreName) {
            await Components.renderGenreChips();
        } else {
            await this.loadAnimeList('complete', 1, genreName);
        }
    }

    // Load schedule page
    static async loadSchedulePage() {
        const content = document.getElementById('app-content');
        
        content.innerHTML = `
            <div class="page-header">
                <h4><i class="fas fa-calendar-alt"></i> Jadwal Tayang</h4>
            </div>
            <div id="schedule-container">
                ${Utils.generateSkeletonCards(7)}
            </div>
        `;

        await this.loadSchedule();
    }

    // Load search page
    static async loadSearchPage() {
        const query = this.currentParams.q || '';
        const content = document.getElementById('app-content');
        
        content.innerHTML = `
            <div class="mobile-search-page">
                <div class="search-header">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input 
                            type="text" 
                            id="search-box-input" 
                            placeholder="Cari anime..." 
                            value="${Utils.sanitizeHTML(query)}"
                            onkeyup="if(event.key === 'Enter') Router.searchAnime()"
                        >
                        ${query ? `<button class="clear-search" onclick="document.getElementById('search-box-input').value = ''"><i class="fas fa-times"></i></button>` : ''}
                    </div>
                </div>
                <div id="search-results">
                    ${query ? Utils.generateSkeletonCards(6) : `
                        <div class="empty-state">
                            <div class="empty-icon">
                                <i class="fas fa-search"></i>
                            </div>
                            <h5>Cari Anime Favoritmu</h5>
                            <p>Masukkan judul anime di kolom pencarian di atas</p>
                        </div>
                    `}
                </div>
            </div>
        `;

        if (query) {
            await this.performSearch(query);
        }
    }

    // Load favorites page
    static async loadFavoritesPage() {
        const content = document.getElementById('app-content');
        const favorites = Utils.getStorage('favorites') || [];
        
        content.innerHTML = `
            <div class="page-header">
                <h4><i class="fas fa-heart"></i> Favorit Saya</h4>
                ${favorites.length > 0 ? `
                    <button class="btn btn-danger" onclick="Router.clearFavorites()">
                        <i class="fas fa-trash"></i> Hapus Semua
                    </button>
                ` : ''}
            </div>
            <div class="mobile-grid" id="favorites-list">
                ${favorites.length > 0 ? 
                    favorites.map(fav => Components.createAnimeCard(fav)).join('') : 
                    `
                    <div class="empty-state" style="width: 100%;">
                        <div class="empty-icon">
                            <i class="fas fa-heart"></i>
                        </div>
                        <h5>Belum ada favorit</h5>
                        <p>Tambahkan anime ke favorit dengan menekan tombol hati pada kartu anime</p>
                    </div>
                    `
                }
            </div>
        `;
    }

    // Load history page
    static async loadHistoryPage() {
        const content = document.getElementById('app-content');
        const history = Utils.getHistory();
        
        content.innerHTML = `
            <div class="page-header">
                <h4><i class="fas fa-history"></i> Riwayat Nonton</h4>
                ${history.length > 0 ? `
                    <button class="btn btn-danger" onclick="Router.clearHistory()">
                        <i class="fas fa-trash"></i> Hapus Semua
                    </button>
                ` : ''}
            </div>
            <div id="history-list">
                ${history.length > 0 ? 
                    history.map((item, index) => this.createHistoryItem(item, index)).join('') : 
                    `
                    <div class="empty-state">
                        <div class="empty-icon">
                            <i class="fas fa-history"></i>
                        </div>
                        <h5>Belum ada riwayat</h5>
                        <p>Riwayat tontonan Anda akan muncul di sini</p>
                    </div>
                    `
                }
            </div>
        `;
    }

    // Load detail page
    static async loadDetailPage() {
        const slug = this.currentParams.slug;
        if (!slug) {
            this.navigateTo('home');
            return;
        }

        const content = document.getElementById('app-content');
        
        content.innerHTML = `
            <div class="mobile-detail-page">
                <div class="detail-header">
                    <button class="back-btn" onclick="window.history.back()">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <h4>Loading...</h4>
                </div>
                <div class="anime-detail-mobile" id="anime-detail">
                    ${Utils.generateSkeletonCards(1)}
                </div>
            </div>
        `;

        await this.loadAnimeDetail(slug);
    }

    // Load watch page
    static async loadWatchPage() {
        const slug = this.currentParams.slug;
        const episode = this.currentParams.ep;
        
        if (!slug) {
            this.navigateTo('home');
            return;
        }

        const content = document.getElementById('app-content');
        
        content.innerHTML = `
            <div class="mobile-watch-page">
                <div class="watch-header">
                    <button class="back-btn" onclick="window.history.back()">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <h5 id="watch-title">Loading...</h5>
                </div>
                <div class="video-container" id="videoPlayerContainer">
                    <div class="loading-video">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Memuat video...</p>
                    </div>
                </div>
                <div class="quality-selector" id="quality-selector">
                    <h6><i class="fas fa-cog"></i> Kualitas Video</h6>
                    <div class="quality-buttons" id="quality-buttons">
                        <!-- Quality buttons will be loaded here -->
                    </div>
                </div>
                <div class="download-section" id="download-section">
                    <!-- Download links will be loaded here -->
                </div>
            </div>
        `;

        await this.loadWatchContent(slug, episode);
    }

    // Load anime list
    static async loadAnimeList(type = 'complete', page = 1, genre = '') {
        const container = document.getElementById('anime-list');
        const loadMoreBtn = document.getElementById('load-more');
        
        try {
            const params = { type, page };
            if (genre) params.genre = genre;
            
            const animeList = await API.getAnimeList(params);
            
            if (container) {
                if (page === 1) {
                    container.innerHTML = animeList.map(anime => Components.createAnimeCard(anime)).join('');
                } else {
                    container.innerHTML += animeList.map(anime => Components.createAnimeCard(anime)).join('');
                }
                
                // Show load more button if there are results
                if (loadMoreBtn && animeList.length > 0) {
                    loadMoreBtn.style.display = 'block';
                }
            }
        } catch (error) {
            console.error('Error loading anime list:', error);
            if (container) {
                container.innerHTML = `
                    <div class="error-page" style="width: 100%;">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h5>Gagal memuat data</h5>
                        <p>${error.message}</p>
                        <button class="btn btn-primary" onclick="Router.loadPage()">
                            <i class="fas fa-redo"></i> Coba Lagi
                        </button>
                    </div>
                `;
            }
        }
    }

    // Load more anime
    static async loadMore(type, genre = '') {
        const currentPage = parseInt(this.currentParams.page) || 1;
        const nextPage = currentPage + 1;
        
        Utils.updateURL({ page: nextPage });
        await this.loadAnimeList(type, nextPage, genre);
    }

    // Load schedule
    static async loadSchedule() {
        const container = document.getElementById('schedule-container');
        
        try {
            const schedule = await API.getSchedule();
            
            if (container) {
                container.innerHTML = schedule.map(day => Components.createScheduleDay(day)).join('');
            }
        } catch (error) {
            console.error('Error loading schedule:', error);
            if (container) {
                container.innerHTML = `
                    <div class="error-page" style="width: 100%;">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h5>Gagal memuat jadwal</h5>
                        <p>${error.message}</p>
                    </div>
                `;
            }
        }
    }

    // Perform search
    static async performSearch(query) {
        const container = document.getElementById('search-results');
        
        try {
            const results = await API.searchAnime(query);
            
            if (container) {
                if (results.length > 0) {
                    container.innerHTML = results.map(anime => Components.createSearchResult(anime)).join('');
                } else {
                    container.innerHTML = `
                        <div class="empty-state">
                            <div class="empty-icon">
                                <i class="fas fa-search"></i>
                            </div>
                            <h5>Tidak ditemukan</h5>
                            <p>Tidak ada hasil untuk "${Utils.sanitizeHTML(query)}"</p>
                        </div>
                    `;
                }
            }
        } catch (error) {
            console.error('Error searching:', error);
            if (container) {
                container.innerHTML = `
                    <div class="error-page" style="width: 100%;">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h5>Gagal melakukan pencarian</h5>
                        <p>${error.message}</p>
                    </div>
                `;
            }
        }
    }

    // Load anime detail
    static async loadAnimeDetail(slug) {
        const container = document.getElementById('anime-detail');
        
        try {
            const animeInfo = await API.getAnimeInfo(slug);
            
            if (container) {
                // Parse metadata
                const metadata = {
                    score: animeInfo.skor ? animeInfo.skor.replace('Skor:', '').trim() : 'N/A',
                    producer: animeInfo.produser ? animeInfo.produser.replace('Produser:', '').trim() : '-',
                    type: animeInfo.tipe ? animeInfo.tipe.replace('Tipe:', '').trim() : '-',
                    status: animeInfo.status ? animeInfo.status.replace('Status:', '').trim() : '-',
                    episodes: animeInfo.totalEpisode ? animeInfo.totalEpisode.replace('Total Episode:', '').trim() : '-',
                    duration: animeInfo.durasi ? animeInfo.durasi.replace('Durasi:', '').trim() : '-',
                    release: animeInfo.rilis ? animeInfo.rilis.replace('Tanggal Rilis:', '').trim() : '-',
                    studio: animeInfo.studio ? animeInfo.studio.replace('Studio:', '').trim() : '-',
                    genre: animeInfo.genre ? animeInfo.genre.replace('Genre:', '').trim() : '-'
                };

                container.innerHTML = `
                    <div class="detail-poster">
                        <img src="${animeInfo.gambar}" alt="${animeInfo.judul}" class="poster-img">
                        <div class="poster-overlay">
                            <button class="btn-play" onclick="Router.navigateTo('watch', '${slug}')">
                                <i class="fas fa-play"></i> Tonton Sekarang
                            </button>
                        </div>
                    </div>
                    <div class="detail-info">
                        <h2 class="detail-title">${animeInfo.judul}</h2>
                        <div class="detail-rating">
                            <i class="fas fa-star"></i>
                            <span>${metadata.score}</span>
                        </div>
                        <div class="detail-meta">
                            <span><i class="fas fa-tv"></i> ${metadata.type}</span>
                            <span><i class="fas fa-flag"></i> ${metadata.status}</span>
                            <span><i class="fas fa-film"></i> ${metadata.episodes} Episode</span>
                            <span><i class="fas fa-clock"></i> ${metadata.duration}</span>
                        </div>
                        <div class="detail-meta">
                            <span><i class="fas fa-calendar"></i> ${metadata.release}</span>
                            <span><i class="fas fa-building"></i> ${metadata.studio}</span>
                        </div>
                        <div class="detail-genres">
                            ${metadata.genre.split(', ').map(g => `
                                <span class="genre-tag">${g}</span>
                            `).join('')}
                        </div>
                        <div class="detail-synopsis">
                            <h6><i class="fas fa-file-alt"></i> Sinopsis</h6>
                            <p>${animeInfo.nama ? animeInfo.nama.replace('Judul:', '').trim() + '. ' : ''}${animeInfo.namaJapan ? animeInfo.namaJapan.replace('Japanese:', '').trim() + '. ' : ''}</p>
                        </div>
                    </div>
                    <div class="detail-episodes">
                        <div class="episodes-header">
                            <h5><i class="fas fa-list"></i> Daftar Episode</h5>
                            ${animeInfo.batch ? `
                                <button class="btn btn-primary" onclick="Router.navigateTo('watch', '${slug}', { ep: '${animeInfo.batch.slug}' })">
                                    <i class="fas fa-download"></i> Batch
                                </button>
                            ` : ''}
                        </div>
                        <div class="episodes-grid" id="episodes-list">
                            ${animeInfo.episodes ? animeInfo.episodes.map(ep => 
                                Components.createEpisodeCard(ep, slug)
                            ).join('') : 'Tidak ada episode'}
                        </div>
                    </div>
                `;
                
                // Update header title
                const header = document.querySelector('.detail-header h4');
                if (header) {
                    header.textContent = animeInfo.judul.split(' (Episode')[0];
                }
            }
        } catch (error) {
            console.error('Error loading anime detail:', error);
            if (container) {
                container.innerHTML = `
                    <div class="error-page" style="width: 100%;">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h5>Gagal memuat detail anime</h5>
                        <p>${error.message}</p>
                        <button class="btn btn-primary" onclick="Router.navigateTo('home')">
                            <i class="fas fa-home"></i> Kembali ke Beranda
                        </button>
                    </div>
                `;
            }
        }
    }

    // Load watch content
    static async loadWatchContent(slug, episodeSlug = null) {
        try {
            // Get anime info
            const animeInfo = await API.getAnimeInfo(slug);
            
            // Update title
            const titleElement = document.getElementById('watch-title');
            if (titleElement && animeInfo) {
                titleElement.textContent = animeInfo.judul.split(' (Episode')[0];
            }
            
            // Determine episode to play
            let episodeToPlay = episodeSlug;
            if (!episodeToPlay && animeInfo.episodes && animeInfo.episodes.length > 0) {
                episodeToPlay = animeInfo.episodes[0].slug;
            }
            
            // Load video player
            if (episodeToPlay) {
                await Components.renderVideoPlayer(episodeToPlay, animeInfo.judul);
            }
            
            // Load quality selector
            await this.loadQualitySelector(slug, animeInfo);
            
            // Load download section
            await Components.renderDownloadSection(slug);
            
        } catch (error) {
            console.error('Error loading watch content:', error);
        }
    }

    // Load quality selector
    static async loadQualitySelector(slug, animeInfo) {
        const container = document.getElementById('quality-buttons');
        if (!container) return;

        // Get episode data for quality options
        try {
            const episodeData = await API.getEpisodeData(animeInfo.episodes?.[0]?.slug || '');
            
            let qualityHTML = '';
            
            if (episodeData.mirror) {
                if (episodeData.mirror.m360p?.length > 0) {
                    qualityHTML += `<button class="quality-btn" onclick="Router.changeQuality('360p')">360p</button>`;
                }
                if (episodeData.mirror.m480p?.length > 0) {
                    qualityHTML += `<button class="quality-btn active" onclick="Router.changeQuality('480p')">480p</button>`;
                }
                if (episodeData.mirror.m720p?.length > 0) {
                    qualityHTML += `<button class="quality-btn" onclick="Router.changeQuality('720p')">720p</button>`;
                }
            }
            
            container.innerHTML = qualityHTML || '<p class="text-muted">Tidak ada opsi kualitas</p>';
        } catch (error) {
            container.innerHTML = '<p class="text-muted">Gagal memuat opsi kualitas</p>';
        }
    }

    // Change quality
    static async changeQuality(quality) {
        // Update active button
        document.querySelectorAll('.quality-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // In a real implementation, this would change the video source
        Utils.showToast(`Mengubah kualitas ke ${quality}...`, 'info');
    }

    // Create history item
    static createHistoryItem(item, index) {
        const timeAgo = this.getTimeAgo(item.watchedAt);
        return `
            <div class="result-item">
                <div class="result-image">
                    <img src="${item.anime.gambar || 'assets/placeholder.jpg'}" alt="${item.anime.judul}">
                </div>
                <div class="result-content">
                    <h4 class="result-title">${item.anime.judul}</h4>
                    <div class="result-meta">
                        <span><i class="fas fa-clock"></i> ${timeAgo}</span>
                        ${item.episode ? `<span>Episode: ${item.episode.judul.split('Episode')[1]?.split(' ')[1] || '?'}</span>` : ''}
                    </div>
                    <div class="result-actions">
                        <button class="btn btn-primary" onclick="Router.navigateTo('${item.episode ? 'watch' : 'detail'}', '${item.anime.slug}'${item.episode ? `, { ep: '${item.episode.slug}' }` : ''})">
                            <i class="fas fa-${item.episode ? 'play' : 'info'}"></i> ${item.episode ? 'Lanjutkan' : 'Detail'}
                        </button>
                        <button class="btn btn-danger" onclick="Router.removeHistoryItem(${index})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Get time ago
    static getTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) {
            return `${diffMins} menit yang lalu`;
        } else if (diffHours < 24) {
            return `${diffHours} jam yang lalu`;
        } else if (diffDays < 30) {
            return `${diffDays} hari yang lalu`;
        } else {
            return date.toLocaleDateString('id-ID');
        }
    }

    // Remove history item
    static removeHistoryItem(index) {
        const history = Utils.getHistory();
        if (index >= 0 && index < history.length) {
            history.splice(index, 1);
            Utils.setStorage('history', history);
            this.loadHistoryPage();
            Utils.showToast('Item dihapus dari riwayat', 'success');
        }
    }

    // Clear favorites
    static clearFavorites() {
        if (confirm('Apakah Anda yakin ingin menghapus semua favorit?')) {
            Utils.removeStorage('favorites');
            this.loadFavoritesPage();
        }
    }

    // Clear history
    static clearHistory() {
        if (confirm('Apakah Anda yakin ingin menghapus semua riwayat?')) {
            Utils.clearHistory();
            this.loadHistoryPage();
        }
    }

    // Search anime from input
    static searchAnime() {
        const input = document.getElementById('search-box-input');
        if (input.value.trim()) {
            this.navigateTo('search', null, { q: input.value.trim() });
        }
    }
}