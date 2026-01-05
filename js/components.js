// UI Components
class Components {
    // Create anime card
    static createAnimeCard(anime) {
        const isFavorite = Utils.isFavorite(anime.slug);
        const episodeText = anime.eps ? anime.eps[0] || 'Unknown' : 'Unknown';
        const rating = anime.rate ? anime.rate[0] || 'N/A' : 'N/A';
        
        return `
            <div class="anime-card" data-slug="${anime.slug}">
                <div class="card-image">
                    <img 
                        src="${anime.gambar || 'assets/placeholder.jpg'}" 
                        alt="${anime.judul}"
                        loading="lazy"
                        onerror="this.src='assets/placeholder.jpg'"
                    >
                    ${episodeText !== 'Unknown' ? `<div class="episode-badge">${episodeText}</div>` : ''}
                    ${rating !== 'N/A' ? `
                        <div class="rating-badge">
                            <i class="fas fa-star"></i>
                            <span>${rating}</span>
                        </div>
                    ` : ''}
                </div>
                <div class="card-content">
                    <h3 class="card-title">${Utils.truncateText(anime.judul, 50)}</h3>
                    <div class="card-subtitle">Episode: ${episodeText}</div>
                    <div class="card-actions">
                        <button class="card-btn watch" onclick="Router.navigateTo('watch', '${anime.slug}')">
                            <i class="fas fa-play"></i> Tonton
                        </button>
                        <button class="card-btn detail" onclick="Router.navigateTo('detail', '${anime.slug}')">
                            <i class="fas fa-info-circle"></i> Detail
                        </button>
                        <button class="card-btn ${isFavorite ? 'favorite' : ''}" onclick="Components.toggleFavorite('${anime.slug}', this)">
                            <i class="fas ${isFavorite ? 'fa-heart' : 'fa-heart-o'}"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Create episode card
    static createEpisodeCard(episode, animeSlug) {
        const episodeNumber = episode.judul.match(/Episode\s+(\d+)/i)?.[1] || '?';
        return `
            <a href="#/watch?slug=${animeSlug}&ep=${episode.slug}" class="episode-card" data-episode-slug="${episode.slug}">
                <div class="episode-number">${episodeNumber}</div>
                <div class="episode-info">
                    <div class="episode-title">${Utils.truncateText(episode.judul, 60)}</div>
                    <div class="episode-date">${Utils.formatDate(episode.tanggal)}</div>
                </div>
                <div class="episode-play">
                    <i class="fas fa-play"></i>
                </div>
            </a>
        `;
    }

    // Create genre chip
    static createGenreChip(genre, active = false) {
        return `
            <a href="#/genre?name=${genre.slug}" class="chip ${active ? 'active' : ''}">
                <i class="fas fa-tag"></i>
                ${genre.judul}
            </a>
        `;
    }

    // Create search result item
    static createSearchResult(anime) {
        const rating = anime.rate ? anime.rate[0] || 'N/A' : 'N/A';
        return `
            <div class="result-item" data-slug="${anime.slug}">
                <div class="result-image">
                    <img 
                        src="${anime.gambar || 'assets/placeholder.jpg'}" 
                        alt="${anime.judul}"
                        loading="lazy"
                        onerror="this.src='assets/placeholder.jpg'"
                    >
                </div>
                <div class="result-content">
                    <h4 class="result-title">${anime.judul}</h4>
                    <div class="result-meta">
                        <span>Episode: ${anime.eps ? anime.eps[0] || 'Unknown' : 'Unknown'}</span>
                        <span class="result-rating">
                            <i class="fas fa-star"></i> ${rating}
                        </span>
                    </div>
                    <div class="result-actions">
                        <button class="btn btn-primary" onclick="Router.navigateTo('watch', '${anime.slug}')">
                            <i class="fas fa-play"></i> Tonton
                        </button>
                        <button class="btn btn-secondary" onclick="Router.navigateTo('detail', '${anime.slug}')">
                            <i class="fas fa-info"></i> Detail
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // Create schedule day
    static createScheduleDay(day) {
        const animeItems = day.anime.map(anime => `
            <div class="schedule-item" onclick="Router.navigateTo('detail', '${anime.slug}')">
                <div class="schedule-anime-title">${anime.judul}</div>
                <button class="schedule-action" onclick="event.stopPropagation(); Router.navigateTo('watch', '${anime.slug}')">
                    <i class="fas fa-play"></i>
                </button>
            </div>
        `).join('');

        return `
            <div class="schedule-day">
                <h5>${day.hari}</h5>
                <div class="schedule-list">
                    ${animeItems}
                </div>
            </div>
        `;
    }

    // Create download button
    static createDownloadButton(quality, links, episodeTitle) {
        const qualityButtons = links.map(link => `
            <a href="${link.href}" target="_blank" class="download-btn" onclick="Utils.showToast('Mengunduh ${quality} - ${link.nama}')">
                <i class="fas fa-download"></i> ${link.nama}
            </a>
        `).join('');

        return `
            <div class="quality-title">${episodeTitle} - ${quality}</div>
            <div class="download-buttons">
                ${qualityButtons}
            </div>
        `;
    }

    // Toggle favorite
    static toggleFavorite(slug, button) {
        const favorites = Utils.getStorage('favorites') || [];
        const isFavorite = favorites.some(fav => fav.slug === slug);
        
        if (isFavorite) {
            Utils.removeFavorite(slug);
            if (button) {
                button.innerHTML = '<i class="fas fa-heart-o"></i>';
                button.classList.remove('favorite');
            }
        } else {
            const anime = {
                slug,
                judul: button?.closest('.anime-card')?.querySelector('.card-title')?.textContent || '',
                gambar: button?.closest('.anime-card')?.querySelector('img')?.src || ''
            };
            Utils.addFavorite(anime);
            if (button) {
                button.innerHTML = '<i class="fas fa-heart"></i>';
                button.classList.add('favorite');
            }
        }
        
        // Refresh favorites page if active
        if (Router.currentPage === 'favorites') {
            Router.loadPage();
        }
    }

    // Render hero section
    static async renderHeroSection() {
        try {
            const animeList = await API.getAnimeList({ type: 'ongoing', page: 1 });
            if (animeList.length > 0) {
                const featured = animeList.slice(0, 3);
                let heroHTML = '';
                
                featured.forEach((anime, index) => {
                    heroHTML += `
                        <div class="hero-slide ${index === 0 ? 'active' : ''}" 
                             style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('${anime.gambar}')">
                            <div class="hero-content">
                                <h2 class="hero-title">${anime.judul}</h2>
                                <p class="hero-subtitle">Tonton sekarang!</p>
                                <button class="btn-play" onclick="Router.navigateTo('detail', '${anime.slug}')">
                                    <i class="fas fa-play"></i> Tonton Sekarang
                                </button>
                            </div>
                        </div>
                    `;
                });
                
                const heroSection = document.querySelector('.hero-section');
                if (heroSection) {
                    heroSection.innerHTML = heroHTML;
                    
                    // Auto slide
                    let currentSlide = 0;
                    setInterval(() => {
                        const slides = heroSection.querySelectorAll('.hero-slide');
                        slides[currentSlide].classList.remove('active');
                        currentSlide = (currentSlide + 1) % slides.length;
                        slides[currentSlide].classList.add('active');
                    }, 5000);
                }
            }
        } catch (error) {
            console.error('Error loading hero section:', error);
        }
    }

    // Render genre chips
    static async renderGenreChips(activeGenre = '') {
        try {
            const genres = await API.getGenres();
            const chipsContainer = document.querySelector('.category-chips');
            if (chipsContainer) {
                const chipsHTML = genres.map(genre => 
                    this.createGenreChip(genre, genre.slug === activeGenre)
                ).join('');
                chipsContainer.innerHTML = chipsHTML;
            }
        } catch (error) {
            console.error('Error loading genres:', error);
        }
    }

    // Render video player
    static async renderVideoPlayer(episodeSlug, animeTitle = '') {
        const container = document.getElementById('videoPlayerContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="loading-video">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Memuat video...</p>
            </div>
        `;

        try {
            // Get episode data
            const episodeData = await API.getEpisodeData(episodeSlug);
            
            // Get nonce for iframe
            const nonceData = await API.getNonce();
            
            // Get iframe URL (using first mirror)
            const mirror = episodeData.mirror?.m480p?.[0] || episodeData.mirror?.m720p?.[0];
            if (mirror && nonceData.data) {
                const iframeData = await API.getIframeUrl(mirror.content, nonceData.data);
                
                container.innerHTML = `
                    <iframe 
                        src="${iframeData.iframe}" 
                        allowfullscreen
                        frameborder="0"
                        scrolling="no"
                        referrerpolicy="strict-origin-when-cross-origin"
                    ></iframe>
                `;
                
                // Update title
                const titleElement = document.getElementById('videoTitle');
                if (titleElement && animeTitle) {
                    titleElement.textContent = `${animeTitle} - ${episodeData.judul}`;
                }
                
                // Store in history
                const animeSlug = episodeSlug.split('-episode-')[0];
                const animeInfo = await API.getAnimeInfo(animeSlug + '-sub-indo');
                if (animeInfo) {
                    Utils.addHistory(animeInfo, {
                        slug: episodeSlug,
                        judul: episodeData.judul
                    });
                }
            } else {
                container.innerHTML = `
                    <div class="no-video">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h5>Video tidak tersedia</h5>
                        <p>Coba gunakan link download di bawah</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading video:', error);
            container.innerHTML = `
                <div class="no-video">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h5>Gagal memuat video</h5>
                    <p>${error.message}</p>
                </div>
            `;
        }
    }

    // Render download section
    static async renderDownloadSection(slug) {
        try {
            const batchData = await API.getBatchDownload(slug);
            const container = document.querySelector('.download-section');
            
            if (container && batchData.length > 0) {
                let html = '<h6><i class="fas fa-download"></i> Download Batch</h6>';
                
                // Group by episode
                batchData.forEach((episode, index) => {
                    html += `<h6 class="mt-3">${episode.judul}</h6>`;
                    
                    // Add quality options
                    if (episode.download.d360pmp4?.length > 0) {
                        html += this.createDownloadButton('360p MP4', episode.download.d360pmp4, episode.judul);
                    }
                    if (episode.download.d480pmp4?.length > 0) {
                        html += this.createDownloadButton('480p MP4', episode.download.d480pmp4, episode.judul);
                    }
                    if (episode.download.d720pmp4?.length > 0) {
                        html += this.createDownloadButton('720p MP4', episode.download.d720pmp4, episode.judul);
                    }
                });
                
                container.innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading download links:', error);
        }
    }
}