// UI Components for KeyAnime

class Components {
    constructor() {
        this.utils = utils;
        this.api = api;
    }

    // Create Anime Card
    createAnimeCard(anime, options = {}) {
        // Gunakan slug jika animeId tidak ada
        const animeId = anime.animeId || anime.slug || anime.id;
        console.log('Creating card for animeId:', animeId); // Debug
        
        const isFavorite = this.utils.isFavorite(animeId);
        const watchBtnText = 'Tonton Eps 1'; // SELALU TAMPILKAN KE EPISODE 1
        const showType = options.showType !== false;
        const compact = options.compact || false;
        
        return `
            <div class="anime-card" data-anime-id="${animeId}">
                <div class="card-image">
                    <img src="${this.utils.getImageUrl(anime.poster)}" 
                         alt="${anime.title}"
                         loading="lazy"
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 450\"%3E%3Crect width=\"300\" height=\"450\" fill=\"%231a1a2e\"/%3E%3Ctext x=\"150\" y=\"200\" font-family=\"Arial\" font-size=\"16\" fill=\"%23ffffff\" text-anchor=\"middle\"%3EKeyAnime%3C/text%3E%3Ctext x=\"150\" y=\"230\" font-family=\"Arial\" font-size=\"12\" fill=\"%23FF4081\" text-anchor=\"middle\"%3ENo Image%3C/text%3E%3C/svg%3E'">
                    ${anime.episodes ? `<div class="episode-badge">${anime.episodes}</div>` : ''}
                    ${anime.score ? `
                        <div class="rating-badge">
                            <i class="fas fa-star"></i>
                            <span>${anime.score}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="card-content">
                    <h3 class="card-title" title="${anime.title}">
                        ${this.utils.truncateText(anime.title, compact ? 30 : 40)}
                    </h3>
                    ${showType && anime.season ? `
                        <div class="card-subtitle">${anime.season}</div>
                    ` : ''}
                    <div class="card-actions">
                        <button class="card-btn watch" data-action="watch" data-anime-id="${animeId}">
                            <i class="fas fa-play"></i>
                            ${compact ? '' : watchBtnText}
                        </button>
                        <button class="card-btn detail" data-action="detail" data-anime-id="${animeId}">
                            <i class="fas fa-info-circle"></i>
                            ${compact ? '' : 'Detail'}
                        </button>
                    </div>
                    ${!compact ? `
                    <div class="card-actions" style="margin-top: 8px;">
                        <button class="card-btn ${isFavorite ? 'watch' : 'detail'}" 
                                data-action="favorite" 
                                data-anime-id="${animeId}"
                                style="flex: none; padding: 8px 12px; width: 100%;">
                            <i class="fas fa-heart${isFavorite ? '' : '-broken'}"></i>
                            ${isFavorite ? 'Favorit' : 'Tambah Favorit'}
                        </button>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Create Search Result Item
    createSearchResultItem(anime) {
        const isFavorite = this.utils.isFavorite(anime.animeId);
        
        return `
            <a href="#/anime/${anime.animeId}" class="result-item">
                <div class="result-image">
                    <img src="${this.utils.getImageUrl(anime.poster)}" 
                         alt="${anime.title}"
                         loading="lazy"
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 450\"%3E%3Crect width=\"300\" height=\"450\" fill=\"%231a1a2e\"/%3E%3Ctext x=\"150\" y=\"200\" font-family=\"Arial\" font-size=\"16\" fill=\"%23ffffff\" text-anchor=\"middle\"%3EKeyAnime%3C/text%3E%3Ctext x=\"150\" y=\"230\" font-family=\"Arial\" font-size=\"12\" fill=\"%23FF4081\" text-anchor=\"middle\"%3ENo Image%3C/text%3E%3C/svg%3E'">
                </div>
                <div class="result-content">
                    <h3 class="result-title">${anime.title}</h3>
                    <div class="result-meta">
                        ${anime.status ? `<span>${anime.status}</span>` : ''}
                        ${anime.score ? `<span>⭐ ${anime.score}</span>` : ''}
                        ${anime.type ? `<span>${anime.type}</span>` : ''}
                    </div>
                    <div class="result-genres" style="display: flex; flex-wrap: wrap; gap: 5px; margin: 10px 0;">
                        ${anime.genreList ? anime.genreList.slice(0, 3).map(genre => 
                            `<span class="genre-tag" style="font-size: 0.75rem; padding: 4px 8px;">${genre.title}</span>`
                        ).join('') : ''}
                    </div>
                    <div class="result-actions" style="display: flex; gap: 10px; margin-top: 10px;">
                        <button class="btn watch" data-action="watch" data-anime-id="${anime.animeId}" style="padding: 8px 15px; font-size: 0.85rem;">
                            <i class="fas fa-play"></i> Tonton
                        </button>
                        <button class="btn ${isFavorite ? 'watch' : 'detail'}" 
                                data-action="favorite" 
                                data-anime-id="${anime.animeId}"
                                style="padding: 8px 15px; font-size: 0.85rem;">
                            <i class="fas fa-heart${isFavorite ? '' : '-broken'}"></i>
                        </button>
                    </div>
                </div>
            </a>
        `;
    }

    // Create Episode Card
    createEpisodeCard(episode, animeId) {
        return `
            <a href="#/watch/${episode.episodeId}" class="episode-card" data-episode-id="${episode.episodeId}">
                <div class="episode-number">${episode.episodeNumber || episode.title || '?'}</div>
                <div class="episode-info">
                    <div class="episode-title">Episode ${episode.title || episode.episodeNumber || '?'}</div>
                    <div class="episode-date">${animeId}</div>
                </div>
                <div class="episode-play">
                    <i class="fas fa-play"></i>
                </div>
            </a>
        `;
    }

    // Create Genre Chip
    createGenreChip(genre, active = false) {
        return `
            <a href="#/genre/${genre.genreId}" class="chip ${active ? 'active' : ''}">
                <i class="fas fa-tag"></i>
                ${genre.title}
            </a>
        `;
    }

    // Create Schedule Day
    createScheduleDay(day) {
        return `
            <div class="schedule-day" style="background: var(--card-bg); border-radius: var(--card-radius); padding: 15px; margin-bottom: 15px;">
                <h4 style="margin-bottom: 10px; color: var(--primary-color); display: flex; align-items: center; gap: 10px;">
                    <i class="fas fa-calendar-day"></i> ${day.title}
                </h4>
                <div class="schedule-list">
                    ${day.animeList?.map(anime => `
                        <div class="schedule-item" style="padding: 10px; border-bottom: 1px solid rgba(255,255,255,0.1);">
                            <a href="#/anime/${anime.animeId}" style="color: var(--light-color); text-decoration: none; display: block;">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <div style="width: 40px; height: 40px; border-radius: 5px; overflow: hidden; flex-shrink: 0;">
                                        <img src="${this.utils.getImageUrl(anime.poster)}" alt="${anime.title}" style="width: 100%; height: 100%; object-fit: cover;">
                                    </div>
                                    <div>
                                        <div style="font-weight: 500; font-size: 0.9rem;">${anime.title}</div>
                                        ${anime.time ? `<div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">${anime.time}</div>` : ''}
                                    </div>
                                </div>
                            </a>
                        </div>
                    `).join('') || '<div style="padding: 10px; color: rgba(255,255,255,0.5);">Tidak ada jadwal</div>'}
                </div>
            </div>
        `;
    }

    // Create Hero Slider
    createHeroSlider(slides) {
        if (!slides || slides.length === 0) return '';
        
        const slidesHtml = slides.map((slide, index) => `
            <div class="hero-slide ${index === 0 ? 'active' : ''}" 
                 style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('${this.utils.getImageUrl(slide.poster)}')">
                <div class="hero-content">
                    <h2 class="hero-title">${slide.title}</h2>
                    <p class="hero-subtitle">${slide.episodes ? `Episode ${slide.episodes}` : ''} ${slide.latestReleaseDate ? `• ${slide.latestReleaseDate}` : ''}</p>
                    <button class="btn-play" data-anime-id="${slide.animeId}" data-action="watch">
                        <i class="fas fa-play"></i> Tonton Sekarang
                    </button>
                </div>
            </div>
        `).join('');

        return `
            <div class="hero-section" id="heroCarousel">
                ${slidesHtml}
            </div>
        `;
    }

    // Create Anime Detail Page
    createAnimeDetail(anime) {
        // Gunakan slug jika animeId tidak ada
        const animeId = anime.animeId || anime.slug || anime.id;
        console.log('Creating detail for animeId:', animeId); // Debug
        
        const isFavorite = this.utils.isFavorite(animeId);
        
        // Urutkan episode berdasarkan nomor episode (ascending) dan ambil episode 1
        let sortedEpisodes = [];
        let firstEpisodeId = null;
        
        if (anime.episodeList?.length > 0) {
            // Urutkan episode berdasarkan nomor episode
            sortedEpisodes = [...anime.episodeList].sort((a, b) => {
                const getEpisodeNumber = (ep) => {
                    if (ep.episodeNumber) {
                        return parseInt(ep.episodeNumber);
                    }
                    // Coba ekstrak angka dari title, misal "Episode 1"
                    const match = ep.title?.match(/Episode\s*(\d+)/i);
                    if (match) {
                        return parseInt(match[1]);
                    }
                    // Coba ekstrak dari slug
                    const slugMatch = ep.slug?.match(/episode-(\d+)/i);
                    if (slugMatch) {
                        return parseInt(slugMatch[1]);
                    }
                    return 0;
                };
                const numA = getEpisodeNumber(a);
                const numB = getEpisodeNumber(b);
                return numA - numB;
            });
            
            console.log('Sorted episodes:', sortedEpisodes);
            
            // Ambil episode pertama setelah diurutkan (Episode 1)
            const firstEpisode = sortedEpisodes[0];
            firstEpisodeId = firstEpisode.episodeId || firstEpisode.slug || `episode-1`;
            console.log('First episode ID:', firstEpisodeId);
        }
        
        return `
            <div class="mobile-detail-page">
                <div class="detail-header">
                    <button class="back-btn" onclick="window.history.back()">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <h4>Detail Anime</h4>
                </div>
                
                <div class="anime-detail-mobile">
                    <div class="detail-poster">
                        <img src="${this.utils.getImageUrl(anime.poster)}" 
                             alt="${anime.title}" 
                             class="poster-img"
                             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 450\"%3E%3Crect width=\"300\" height=\"450\" fill=\"%231a1a2e\"/%3E%3Ctext x=\"150\" y=\"200\" font-family=\"Arial\" font-size=\"16\" fill=\"%23ffffff\" text-anchor=\"middle\"%3E${encodeURIComponent(anime.title)}%3C/text%3E%3Ctext x=\"150\" y=\"230\" font-family=\"Arial\" font-size=\"12\" fill=\"%23FF4081\" text-anchor=\"middle\"%3ENo Image%3C/text%3E%3C/svg%3E'">
                        <div class="poster-overlay">
                            <button class="btn-play" data-action="play-first" data-anime-id="${animeId}" data-first-episode="${firstEpisodeId}">
                                <i class="fas fa-play"></i> Tonton Sekarang
                            </button>
                        </div>
                    </div>
                    
                    <div class="detail-info">
                        <h1 class="detail-title">${anime.title}</h1>
                        
                        ${anime.score ? `
                            <div class="detail-rating">
                                <i class="fas fa-star"></i>
                                <span>${anime.score}</span>
                            </div>
                        ` : ''}
                        
                        <div class="detail-meta">
                            ${anime.type ? `<span><i class="fas fa-tv"></i> ${anime.type}</span>` : ''}
                            ${anime.episodes ? `<span><i class="fas fa-list-ol"></i> ${anime.episodes} Episode</span>` : ''}
                            ${anime.duration ? `<span><i class="fas fa-clock"></i> ${anime.duration}</span>` : ''}
                            ${anime.status ? `<span><i class="fas fa-circle" style="color: ${anime.status === 'Ongoing' ? '#00ff00' : '#ff4081'};"></i> ${anime.status}</span>` : ''}
                        </div>
                        
                        ${anime.genreList ? `
                            <div class="detail-genres">
                                ${anime.genreList.map(genre => `
                                    <a href="#/genre/${genre.genreId || genre.slug}" class="genre-tag">${genre.title}</a>
                                `).join('')}
                            </div>
                        ` : ''}
                        
                        ${anime.synopsis?.paragraphList?.length > 0 ? `
                            <div class="detail-synopsis">
                                <h6>Sinopsis</h6>
                                <p>${anime.synopsis.paragraphList.join(' ')}</p>
                            </div>
                        ` : anime.description ? `
                            <div class="detail-synopsis">
                                <h6>Sinopsis</h6>
                                <p>${anime.description}</p>
                            </div>
                        ` : ''}
                        
                        <div class="detail-actions" style="margin-top: 20px; display: flex; gap: 10px;">
                            <button class="card-btn watch" data-action="play-first" data-anime-id="${animeId}" data-first-episode="${firstEpisodeId}" style="flex: 2;">
                                <i class="fas fa-play"></i> Tonton
                            </button>
                            <button class="card-btn ${isFavorite ? 'watch' : 'detail'}" 
                                    data-action="favorite" 
                                    data-anime-id="${animeId}"
                                    style="flex: 1;">
                                <i class="fas fa-heart${isFavorite ? '' : '-broken'}"></i>
                            </button>
                        </div>
                    </div>
                    
                    ${sortedEpisodes.length > 0 ? `
                        <div class="detail-episodes">
                            <div class="episodes-header">
                                <h5>Daftar Episode (${sortedEpisodes.length})</h5>
                            </div>
                            <div class="episodes-grid">
                                ${sortedEpisodes.map(ep => {
                                    const episodeId = ep.episodeId || ep.slug || `episode-${ep.episodeNumber || 1}`;
                                    return this.createEpisodeCard(ep, animeId);
                                }).join('')}
                            </div>
                            <!-- TOMBOL LIHAT SEMUA EPISODE DIHAPUS -->
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Create Watch Page
    createWatchPage(episodeData) {
        const anime = episodeData?.data?.details;
        if (!anime) return '<div class="error-page">Episode tidak ditemukan</div>';
        
        return `
            <div class="mobile-watch-page">
                <div class="watch-header">
                    <button class="back-btn" onclick="window.history.back()">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <h5>${anime.title || 'Menonton...'}</h5>
                </div>
                
                <div class="video-container" id="videoPlayerContainer">
                    <div class="loading-video">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Memuat video...</p>
                    </div>
                </div>
                
                ${anime.server?.qualityList ? `
                    <div class="quality-selector">
                        <h6>Pilih Kualitas</h6>
                        <div class="quality-buttons" id="qualityButtons">
                            ${anime.server.qualityList.map((quality, index) => `
                                <button class="quality-btn ${index === 0 ? 'active' : ''}" 
                                        data-quality="${quality.title?.trim() || '480p'}"
                                        data-server-index="0">
                                    ${quality.title?.trim() || '480p'}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${anime.download?.qualityList ? `
                    <div class="download-section">
                        <h6>Download Episode</h6>
                        ${anime.download.qualityList.map(quality => `
                            <div class="quality-download">
                                <div class="quality-title">${quality.title}</div>
                                <div class="download-buttons">
                                    ${quality.urlList?.map((url, idx) => `
                                        <a href="${url.url}" 
                                           class="download-btn" 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           onclick="event.stopPropagation();">
                                            <i class="fas fa-download"></i>
                                            ${url.title || 'Download'}
                                        </a>
                                    `).join('') || ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="episode-navigation" style="margin-top: 20px; display: flex; flex-direction: column; gap: 10px;">
                    ${anime.hasPrevEpisode ? `
                        <a href="#/watch/${anime.prevEpisode?.episodeId}" class="card-btn detail">
                            <i class="fas fa-arrow-left"></i> Episode Sebelumnya
                        </a>
                    ` : ''}
                    ${anime.hasNextEpisode ? `
                        <a href="#/watch/${anime.nextEpisode?.episodeId}" class="card-btn watch">
                            Episode Selanjutnya <i class="fas fa-arrow-right"></i>
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Create Pagination
    createPagination(currentPage, totalPages, baseRoute) {
        if (totalPages <= 1) return '';
        
        const pages = [];
        const maxVisible = 5;
        
        // Calculate visible page range
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = startPage + maxVisible - 1;
        
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        // Build pagination HTML
        return `
            <div class="pagination-container" style="
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                margin: 30px 0;
                flex-wrap: wrap;
            ">
                <!-- Previous Button -->
                ${currentPage > 1 ? `
                    <a href="${baseRoute}?page=${currentPage - 1}" class="pagination-btn prev" style="
                        padding: 10px 15px;
                        background: var(--card-bg);
                        border-radius: 8px;
                        color: var(--light-color);
                        text-decoration: none;
                        border: 1px solid var(--card-border);
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        font-size: 0.9rem;
                        transition: all 0.3s ease;
                    ">
                        <i class="fas fa-chevron-left"></i> Sebelumnya
                    </a>
                ` : ''}
                
                <!-- First Page -->
                ${startPage > 1 ? `
                    <a href="${baseRoute}?page=1" class="pagination-btn" style="
                        padding: 10px 15px;
                        background: var(--card-bg);
                        border-radius: 8px;
                        color: var(--light-color);
                        text-decoration: none;
                        border: 1px solid var(--card-border);
                        font-size: 0.9rem;
                        transition: all 0.3s ease;
                    ">1</a>
                    ${startPage > 2 ? '<span style="color: var(--light-color); opacity: 0.5; padding: 0 5px;">...</span>' : ''}
                ` : ''}
                
                <!-- Page Numbers -->
                ${Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => `
                    <a href="${baseRoute}?page=${page}" 
                       class="pagination-btn ${page === currentPage ? 'active' : ''}" 
                       style="
                        padding: 10px 15px;
                        background: ${page === currentPage ? 'var(--primary-color)' : 'var(--card-bg)'};
                        border-radius: 8px;
                        color: ${page === currentPage ? 'white' : 'var(--light-color)'};
                        text-decoration: none;
                        border: 1px solid ${page === currentPage ? 'var(--primary-color)' : 'var(--card-border)'};
                        font-size: 0.9rem;
                        font-weight: ${page === currentPage ? 'bold' : 'normal'};
                        transition: all 0.3s ease;
                        min-width: 40px;
                        text-align: center;
                    ">
                        ${page}
                    </a>
                `).join('')}
                
                <!-- Last Page -->
                ${endPage < totalPages ? `
                    ${endPage < totalPages - 1 ? '<span style="color: var(--light-color); opacity: 0.5; padding: 0 5px;">...</span>' : ''}
                    <a href="${baseRoute}?page=${totalPages}" class="pagination-btn" style="
                        padding: 10px 15px;
                        background: var(--card-bg);
                        border-radius: 8px;
                        color: var(--light-color);
                        text-decoration: none;
                        border: 1px solid var(--card-border);
                        font-size: 0.9rem;
                        transition: all 0.3s ease;
                    ">${totalPages}</a>
                ` : ''}
                
                <!-- Next Button -->
                ${currentPage < totalPages ? `
                    <a href="${baseRoute}?page=${currentPage + 1}" class="pagination-btn next" style="
                        padding: 10px 15px;
                        background: var(--card-bg);
                        border-radius: 8px;
                        color: var(--light-color);
                        text-decoration: none;
                        border: 1px solid var(--card-border);
                        display: flex;
                        align-items: center;
                        gap: 5px;
                        font-size: 0.9rem;
                        transition: all 0.3s ease;
                    ">
                        Selanjutnya <i class="fas fa-chevron-right"></i>
                    </a>
                ` : ''}
            </div>
        `;
    }

    // Create Empty State
    createEmptyState(message = 'Tidak ada data', icon = 'fas fa-inbox', submessage = '') {
        return `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="${icon}"></i>
                </div>
                <h5>${message}</h5>
                ${submessage ? `<p>${submessage}</p>` : ''}
            </div>
        `;
    }

    // Create Error Page
    createErrorPage(message = 'Terjadi kesalahan', retryAction = null) {
        return `
            <div class="error-page">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Oops!</h2>
                <p>${message}</p>
                <div style="display: flex; gap: 10px; justify-content: center; margin-top: 20px;">
                    <button class="btn watch" onclick="window.history.back()">
                        <i class="fas fa-arrow-left"></i> Kembali
                    </button>
                    ${retryAction ? `
                        <button class="btn detail" onclick="${retryAction}">
                            <i class="fas fa-redo"></i> Coba Lagi
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Create Load More Button
    createLoadMoreButton(hasNextPage, onClick) {
        if (!hasNextPage) return '';
        
        return `
            <div class="load-more">
                <button class="btn watch" id="loadMoreBtn" onclick="${onClick}">
                    <i class="fas fa-spinner fa-spin" style="display: none;"></i>
                    <span>Muat Lebih Banyak</span>
                </button>
            </div>
        `;
    }

    // Initialize carousel
    initCarousel() {
        utils.initCarousel('heroCarousel');
    }
}

// Export components instance
const components = new Components();