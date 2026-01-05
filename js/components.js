// UI Components for KeyAnime

class Components {
    constructor() {
        this.utils = utils;
        this.api = api;
    }

    // Create Anime Card
    createAnimeCard(anime, options = {}) {
        const isFavorite = this.utils.isFavorite(anime.animeId);
        const watchBtnText = anime.episodes ? `Tonton Eps ${anime.episodes}` : 'Tonton';
        
        return `
            <div class="anime-card" data-anime-id="${anime.animeId}">
                <div class="card-image">
                    <img src="${this.utils.getImageUrl(anime.poster)}" 
                         alt="${anime.title}"
                         loading="lazy">
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
                        ${this.utils.truncateText(anime.title, 40)}
                    </h3>
                    ${anime.season ? `
                        <div class="card-subtitle">${anime.season}</div>
                    ` : ''}
                    <div class="card-actions">
                        <button class="card-btn watch" data-action="watch" data-anime-id="${anime.animeId}">
                            <i class="fas fa-play"></i>
                            ${watchBtnText}
                        </button>
                        <button class="card-btn detail" data-action="detail" data-anime-id="${anime.animeId}">
                            <i class="fas fa-info-circle"></i>
                            Detail
                        </button>
                    </div>
                    <div class="card-actions" style="margin-top: 8px;">
                        <button class="card-btn ${isFavorite ? 'watch' : 'detail'}" 
                                data-action="favorite" 
                                data-anime-id="${anime.animeId}"
                                style="flex: none; padding: 8px 12px;">
                            <i class="fas fa-heart${isFavorite ? '' : '-broken'}"></i>
                        </button>
                    </div>
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
                         loading="lazy">
                </div>
                <div class="result-content">
                    <h3 class="result-title">${anime.title}</h3>
                    <div class="result-meta">
                        <span>${anime.status || ''}</span>
                        ${anime.score ? `<span>⭐ ${anime.score}</span>` : ''}
                    </div>
                    <div class="result-genres">
                        ${anime.genreList ? anime.genreList.slice(0, 3).map(genre => 
                            `<span class="genre-tag">${genre.title}</span>`
                        ).join('') : ''}
                    </div>
                    <div class="result-actions">
                        <button class="btn watch" data-action="watch" data-anime-id="${anime.animeId}">
                            <i class="fas fa-play"></i> Tonton
                        </button>
                        <button class="btn ${isFavorite ? 'watch' : 'detail'}" 
                                data-action="favorite" 
                                data-anime-id="${anime.animeId}">
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
                <div class="episode-number">${episode.title}</div>
                <div class="episode-info">
                    <div class="episode-title">Episode ${episode.title}</div>
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
            <div class="schedule-day">
                <h4>${day.title}</h4>
                <div class="schedule-list">
                    ${day.animeList.map(anime => `
                        <div class="schedule-item">
                            <a href="#/anime/${anime.animeId}">${anime.title}</a>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Create Hero Slider
    createHeroSlider(slides) {
        if (!slides || slides.length === 0) return '';
        
        const slidesHtml = slides.map((slide, index) => `
            <div class="hero-slide ${index === 0 ? 'active' : ''}" 
                 style="background-image: url('${this.utils.getImageUrl(slide.poster)}')">
                <div class="hero-content">
                    <h2 class="hero-title">${slide.title}</h2>
                    <p class="hero-subtitle">Episode ${slide.episodes} • ${slide.latestReleaseDate || ''}</p>
                    <button class="btn-play" data-anime-id="${slide.animeId}">
                        <i class="fas fa-play"></i> Tonton Sekarang
                    </button>
                </div>
            </div>
        `).join('');

        return `
            <div class="hero-section">
                ${slidesHtml}
            </div>
        `;
    }

    // Create Anime Detail Page
    createAnimeDetail(anime) {
        const isFavorite = this.utils.isFavorite(anime.animeId);
        
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
                             class="poster-img">
                        <div class="poster-overlay">
                            <button class="btn-play" data-action="play-first" data-anime-id="${anime.animeId}">
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
                            ${anime.status ? `<span><i class="fas fa-circle"></i> ${anime.status}</span>` : ''}
                        </div>
                        
                        ${anime.genreList ? `
                            <div class="detail-genres">
                                ${anime.genreList.map(genre => `
                                    <a href="#/genre/${genre.genreId}" class="genre-tag">${genre.title}</a>
                                `).join('')}
                            </div>
                        ` : ''}
                        
                        ${anime.synopsis?.paragraphList?.length > 0 ? `
                            <div class="detail-synopsis">
                                <h6>Sinopsis</h6>
                                <p>${anime.synopsis.paragraphList.join(' ')}</p>
                            </div>
                        ` : ''}
                        
                        <div class="detail-actions" style="margin-top: 20px; display: flex; gap: 10px;">
                            <button class="card-btn watch" data-action="play-first" data-anime-id="${anime.animeId}" style="flex: 2;">
                                <i class="fas fa-play"></i> Tonton
                            </button>
                            <button class="card-btn ${isFavorite ? 'watch' : 'detail'}" 
                                    data-action="favorite" 
                                    data-anime-id="${anime.animeId}"
                                    style="flex: 1;">
                                <i class="fas fa-heart${isFavorite ? '' : '-broken'}"></i>
                            </button>
                        </div>
                    </div>
                    
                    ${anime.episodeList?.length > 0 ? `
                        <div class="detail-episodes">
                            <div class="episodes-header">
                                <h5>Daftar Episode</h5>
                            </div>
                            <div class="episodes-grid">
                                ${anime.episodeList.map(ep => this.createEpisodeCard(ep, anime.animeId)).join('')}
                            </div>
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
                                <button class="quality-btn ${index === 1 ? 'active' : ''}" 
                                        data-quality="${quality.title.trim()}"
                                        data-server-index="0">
                                    ${quality.title.trim()}
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
                                    ${quality.urlList.map((url, idx) => `
                                        <a href="${url.url}" 
                                           class="download-btn" 
                                           target="_blank" 
                                           rel="noopener noreferrer">
                                            <i class="fas fa-download"></i>
                                            ${url.title}
                                        </a>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="episode-navigation" style="margin-top: 20px;">
                    ${anime.hasPrevEpisode ? `
                        <a href="#/watch/${anime.prevEpisode.episodeId}" class="card-btn detail">
                            <i class="fas fa-arrow-left"></i> Episode Sebelumnya
                        </a>
                    ` : ''}
                    ${anime.hasNextEpisode ? `
                        <a href="#/watch/${anime.nextEpisode.episodeId}" class="card-btn watch" style="margin-top: 10px;">
                            Episode Selanjutnya <i class="fas fa-arrow-right"></i>
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Create Empty State
    createEmptyState(message = 'Tidak ada data', icon = 'fas fa-inbox') {
        return `
            <div class="empty-state">
                <div class="empty-icon">
                    <i class="${icon}"></i>
                </div>
                <h5>${message}</h5>
                <p>Coba cari dengan kata kunci yang berbeda</p>
            </div>
        `;
    }

    // Create Error Page
    createErrorPage(message = 'Terjadi kesalahan') {
        return `
            <div class="error-page">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Oops!</h2>
                <p>${message}</p>
                <button class="btn watch" onclick="window.history.back()">
                    <i class="fas fa-arrow-left"></i> Kembali
                </button>
            </div>
        `;
    }

    // Load More Button
    createLoadMoreButton(hasNextPage, onClick) {
        if (!hasNextPage) return '';
        
        return `
            <div class="load-more">
                <button class="btn watch" id="loadMoreBtn">
                    <i class="fas fa-spinner fa-spin" style="display: none;"></i>
                    <span>Muat Lebih Banyak</span>
                </button>
            </div>
        `;
    }
}

// Export components instance
const components = new Components();