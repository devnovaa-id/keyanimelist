//index.html

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>KeyAnime - Anime Streaming Premium</title>
    <meta name="author" content="this.key@devnova.icu">
    <meta name="description" content="Streaming anime premium dengan kualitas tinggi">
    
    <!-- Stylesheets -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/responsive.css">
    <link rel="icon" href="assets/favicon.ico" type="image/x-icon">
    
    <!-- Mobile App Meta -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="theme-color" content="#1a1a2e">
    <meta name="apple-mobile-web-app-title" content="KeyAnime">
</head>
<body class="mobile-app">
    <!-- Loading Overlay -->
    <div id="loading-overlay" class="mobile-loading">
        <div class="key-loader">
            <div class="key-icon">
                <img src="asset/icon.png" alt="KeyAnime Icon" style="width: 120px; height: 50px;">
            </div>
            <div class="loading-subtext">by this.key@devnova.icu</div>
        </div>
    </div>

    <!-- Navigation -->
    <nav class="navbar navbar-dark fixed-top mobile-nav" aria-label="Navigasi utama">
        <div class="container-fluid">
            <div class="nav-header">
                <button class="nav-toggler" type="button" id="menuToggle" aria-label="Buka menu">
                    <i class="fas fa-bars"></i>
                </button>
                <a class="navbar-brand" href="#/" aria-label="Beranda KeyAnime">
                    <img src="asset/icon.png" alt="KeyAnime Icon" style="width: 120px; height: 50px;">
                </a>
                <div class="nav-actions">
                    <button class="nav-btn" id="searchToggle" aria-label="Cari anime">
                        <i class="fas fa-search"></i>
                    </button>
                    <button class="nav-btn" id="themeToggle" aria-label="Ubah tema">
                        <i class="fas fa-moon"></i>
                    </button>
                </div>
            </div>
            
            <!-- Search Bar Mobile -->
            <div class="mobile-search" id="mobileSearch">
                <form class="search-form" id="search-form" role="search">
                    <div class="input-group">
                        <input type="text" class="form-control" id="search-input" 
                               placeholder="Cari anime..." aria-label="Masukan pencarian anime">
                        <button class="btn btn-primary" type="submit" aria-label="Kirim pencarian">
                            <i class="fas fa-search"></i>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </nav>

    <!-- Sidebar Menu -->
    <div class="sidebar-menu" id="sidebarMenu">
        <div class="sidebar-header">
            <h5><img src="asset/icon.png" alt="KeyAnime Icon" style="width: 120px; height: 50px;"></h5>
            <button class="close-sidebar" id="closeMenu" aria-label="Tutup menu">
                <i class="fas fa-times"></i>
            </button>
        </div>
        <div class="sidebar-content">
            <div class="user-info">
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="user-details">
                    <div class="user-name">Anime Lover</div>
                    <div class="user-status">Premium Member</div>
                </div>
            </div>
            
            <ul class="sidebar-nav" role="navigation">
                <li>
                    <a href="#/" class="active">
                        <i class="fas fa-home"></i> Beranda
                    </a>
                </li>
                <li>
                    <a href="#/ongoing">
                        <i class="fas fa-play-circle"></i> Ongoing
                    </a>
                </li>
                <li>
                    <a href="#/complete">
                        <i class="fas fa-check-circle"></i> Complete
                    </a>
                </li>
                <li>
                    <a href="#/genre">
                        <i class="fas fa-tags"></i> Genre
                    </a>
                </li>
                <li>
                    <a href="#/schedule">
                        <i class="fas fa-calendar-alt"></i> Jadwal
                    </a>
                </li>
                <li>
                    <a href="#/favorites">
                        <i class="fas fa-heart"></i> Favorit
                    </a>
                </li>
                <li>
                    <a href="#/history">
                        <i class="fas fa-history"></i> History
                    </a>
                </li>
            </ul>
            
            <div class="sidebar-footer">
                <div class="developer-info">
                    <i class="fas fa-code"></i>
                    <span>this.key@devnova.icu</span>
                </div>
                <div class="version">v2.0 Mobile</div>
            </div>
        </div>
    </div>
    
    <!-- Sidebar Backdrop -->
    <div class="sidebar-backdrop" id="sidebarBackdrop"></div>

    <!-- Main Content -->
    <main class="container-fluid" id="app-content" aria-live="polite">
        <!-- Content will be loaded here dynamically -->
    </main>

    <!-- Bottom Navigation -->
    <nav class="bottom-nav" aria-label="Navigasi bawah">
        <a href="#/" class="bottom-nav-item active">
            <i class="fas fa-home"></i>
            <span>Home</span>
        </a>
        <a href="#/ongoing" class="bottom-nav-item">
            <i class="fas fa-fire"></i>
            <span>Trending</span>
        </a>
        <a href="#/search" class="bottom-nav-item">
            <i class="fas fa-search"></i>
            <span>Search</span>
        </a>
        <a href="#/favorites" class="bottom-nav-item">
            <i class="fas fa-heart"></i>
            <span>Fav</span>
        </a>
        <a href="#/profile" class="bottom-nav-item">
            <i class="fas fa-user"></i>
            <span>Profile</span>
        </a>
    </nav>

    <!-- Video Player Modal -->
    <div class="modal fade" id="videoModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="videoTitle">Video Player</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="video-container" id="videoPlayerContainer">
                        <div class="loading-video">
                            <i class="fas fa-spinner fa-spin"></i>
                            <p>Memuat video...</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/utils.js"></script>
    <script src="js/api.js"></script>
    <script src="js/components.js"></script>
    <script src="js/router.js"></script>
    <script src="js/app.js"></script>
</body>
</html>

//css/responsive.css

/* Extra Small Devices (Portrait Phones) */
@media (max-width: 576px) {
    :root {
        --mobile-padding: 10px;
        --card-radius: 12px;
    }
    
    .mobile-grid .anime-card {
        width: 48%;
    }
    
    .card-image {
        aspect-ratio: 2/3;
    }
    
    .hero-section {
        min-height: 25vh;
        max-height: 250px;
    }
    
    .hero-title {
        font-size: 1rem;
    }
    
    .hero-subtitle {
        font-size: 0.8rem;
    }
    
    .bottom-nav span {
        display: none;
    }
    
    .bottom-nav i {
        font-size: 1.4rem;
    }
    
    .detail-poster {
        min-height: 35vh;
        max-height: 300px;
    }
    
    .episode-number {
        width: 35px;
        height: 35px;
        font-size: 0.8rem;
    }
    
    .card-btn {
        font-size: 0.75rem;
        padding: 8px;
    }
}

/* Small Devices (Landscape Phones) */
@media (min-width: 577px) and (max-width: 768px) {
    .mobile-grid .anime-card {
        width: 48%;
    }
    
    .card-image {
        aspect-ratio: 2/3;
    }
    
    .hero-section {
        min-height: 35vh;
        max-height: 300px;
    }
    
    .detail-poster {
        min-height: 40vh;
        max-height: 350px;
    }
    
    .sidebar-menu {
        width: 280px;
        left: -280px;
    }
    
    .sidebar-menu.active {
        left: 0;
    }
}

/* Tablets */
@media (min-width: 769px) and (max-width: 992px) {
    .mobile-grid .anime-card {
        width: 32%;
    }
    
    .card-image {
        aspect-ratio: 2/3;
    }
    
    .hero-section {
        min-height: 40vh;
        max-height: 350px;
    }
    
    .sidebar-menu {
        width: 320px;
        left: -320px;
    }
    
    .sidebar-menu.active {
        left: 0;
    }
    
    .bottom-nav {
        max-width: 600px;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 25px 25px 0 0;
        bottom: 20px;
        height: 65px;
        background: rgba(13, 13, 26, 0.8);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .bottom-nav span {
        display: block;
        font-size: 0.75rem;
    }
    
    .detail-poster {
        min-height: 45vh;
        max-height: 400px;
    }
    
    .episode-card {
        padding: 18px;
    }
}

/* Desktop - 2 Column Layout */
@media (min-width: 993px) {
    body.mobile-app {
        padding-top: 70px;
        padding-bottom: 0;
        max-width: 1400px;
        margin: 0 auto;
        background: linear-gradient(135deg, var(--dark-color) 0%, #151530 100%);
    }
    
    .mobile-grid {
        justify-content: flex-start;
        gap: 2%;
    }
    
    .mobile-grid .anime-card {
        width: 23.5%; /* 4 columns for desktop */
    }
    
    .card-image {
        aspect-ratio: 2/3;
    }
    
    .hero-section {
        min-height: 50vh;
        max-height: 500px;
    }
    
    .bottom-nav {
        display: none;
    }
    
    /* Desktop sidebar stays visible */
    .sidebar-menu {
        width: 280px;
        left: 0;
        background: rgba(13, 13, 26, 0.9);
        backdrop-filter: blur(30px);
        z-index: 1000;
    }
    
    .sidebar-backdrop {
        display: none !important;
    }
    
    .nav-toggler {
        display: none;
    }
    
    .mobile-nav {
        left: 280px;
        width: calc(100% - 280px);
        background: rgba(13, 13, 26, 0.8);
    }
    
    main.container-fluid {
        margin-left: 280px;
        padding: 25px;
        width: calc(100% - 280px);
        min-height: calc(100vh - 70px);
    }
    
    .detail-poster {
        min-height: 50vh;
        max-height: 600px;
    }
    
    .video-container {
        max-height: 70vh;
    }
    
    /* Hover effects only for desktop */
    .anime-card:hover .card-content {
        transform: translateY(0);
    }
    
    .search-results .result-item:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px var(--shadow-color);
    }
}

/* Ultra Wide Screens */
@media (min-width: 1400px) {
    body.mobile-app {
        max-width: 1600px;
        box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
    }
    
    .mobile-grid .anime-card {
        width: 18%; /* 5 columns for ultra-wide */
    }
    
    .hero-section {
        min-height: 60vh;
        max-height: 600px;
    }
    
    .detail-poster {
        min-height: 60vh;
        max-height: 700px;
    }
    
    .sidebar-menu {
        width: 300px;
    }
    
    .mobile-nav {
        left: 300px;
        width: calc(100% - 300px);
    }
    
    main.container-fluid {
        margin-left: 300px;
        width: calc(100% - 300px);
    }
}

/* Dark/Light Mode Support */
@media (prefers-color-scheme: light) {
    body.mobile-app.light-mode {
        --dark-color: #FFFFFF;
        --light-color: #000000;
        --card-bg: rgba(0, 0, 0, 0.05);
        --card-border: rgba(0, 0, 0, 0.1);
        --shadow-color: rgba(0, 0, 0, 0.1);
    }
    
    .mobile-app.light-mode .mobile-nav,
    .mobile-app.light-mode .sidebar-menu,
    .mobile-app.light-mode .bottom-nav {
        background: rgba(255, 255, 255, 0.95);
        border-color: rgba(0, 0, 0, 0.1);
        color: var(--light-color);
    }
    
    .mobile-app.light-mode .search-form input {
        color: var(--light-color);
        background: rgba(0, 0, 0, 0.05);
    }
    
    .mobile-app.light-mode .anime-card,
    .mobile-app.light-mode .schedule-day,
    .mobile-app.light-mode .result-item {
        background: var(--card-bg);
        color: var(--light-color);
    }
    
    .mobile-app.light-mode .card-subtitle,
    .mobile-app.light-mode .detail-synopsis p {
        color: rgba(0, 0, 0, 0.7);
    }
    
    .mobile-app.light-mode .skeleton {
        background: linear-gradient(90deg, 
            rgba(0, 0, 0, 0.05) 25%, 
            rgba(0, 0, 0, 0.1) 50%, 
            rgba(0, 0, 0, 0.05) 75%);
    }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .anime-card:hover,
    .result-item:hover,
    .schedule-item:hover,
    .episode-card:hover {
        transform: none;
    }
    
    .key-icon {
        animation: none;
    }
}

/* High Contrast */
@media (prefers-contrast: high) {
    :root {
        --primary-color: #FF0000;
        --secondary-color: #0000FF;
        --accent-color: #00FF00;
    }
    
    .anime-card {
        border: 2px solid var(--primary-color);
    }
    
    .card-btn,
    .btn-play,
    .download-btn {
        border: 2px solid currentColor;
    }
    
    .mobile-nav,
    .bottom-nav {
        border: 2px solid var(--primary-color);
    }
}

/* Touch Device Optimizations */
@media (hover: none) and (pointer: coarse) {
    .card-btn,
    .nav-toggler,
    .nav-btn,
    .chip,
    .episode-card,
    .schedule-item,
    .result-item,
    .download-btn,
    .quality-btn {
        min-height: 44px; /* Minimum touch target size */
    }
    
    .card-btn {
        padding: 12px 8px;
    }
    
    .quality-btn,
    .download-btn {
        padding: 12px 15px;
    }
    
    /* Larger hit areas for mobile */
    .nav-toggler,
    .nav-btn,
    .back-btn {
        width: 48px;
        height: 48px;
    }
    
    .bottom-nav-item {
        padding: 12px;
    }
    
    /* Remove hover effects on touch devices */
    .anime-card:hover {
        transform: none;
    }
    
    .card-btn:hover,
    .nav-btn:hover {
        background: none;
    }
}

/* Foldable Devices */
@media (max-width: 280px) {
    .mobile-grid .anime-card {
        width: 100%;
    }
    
    .card-image {
        aspect-ratio: 2/3;
    }
    
    .hero-section {
        min-height: 20vh;
        max-height: 180px;
    }
    
    .detail-poster {
        min-height: 30vh;
        max-height: 250px;
    }
    
    .bottom-nav i {
        font-size: 1.2rem;
    }
    
    .card-btn {
        flex-direction: column;
        padding: 6px;
        font-size: 0.7rem;
    }
    
    .card-btn i {
        margin-bottom: 2px;
    }
}

/* Landscape orientation */
@media (orientation: landscape) and (max-height: 500px) {
    .mobile-nav {
        height: 50px;
    }
    
    .nav-header {
        height: 50px;
    }
    
    .hero-section {
        min-height: 50vh;
    }
    
    .bottom-nav {
        height: 50px;
    }
    
    body.mobile-app {
        padding-top: 50px;
        padding-bottom: 50px;
    }
    
    main.container-fluid {
        min-height: calc(100vh - 100px);
    }
}

/* Print Styles */
@media print {
    .mobile-nav,
    .sidebar-menu,
    .bottom-nav,
    .card-btn,
    .btn-play,
    .episode-play,
    .schedule-action,
    .video-container,
    .quality-selector,
    .download-section,
    .sidebar-backdrop {
        display: none !important;
    }
    
    body.mobile-app {
        background: white;
        color: black;
        padding: 0;
        margin: 0;
        font-size: 12pt;
    }
    
    .anime-card,
    .schedule-day,
    .result-item,
    .anime-detail-mobile {
        break-inside: avoid;
        border: 1px solid #ccc;
        box-shadow: none;
        background: white !important;
        color: black !important;
        margin-bottom: 15px;
    }
    
    a {
        color: black;
        text-decoration: underline;
    }
    
    .card-image img {
        filter: grayscale(100%);
    }
    
    main.container-fluid {
        padding: 20px;
        width: 100%;
        margin: 0;
    }
}

/* Animation performance optimizations */
@media (prefers-reduced-motion: no-preference) {
    .anime-card,
    .result-item,
    .episode-card {
        will-change: transform;
    }
}

/* Very high DPI screens */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .mobile-nav,
    .sidebar-menu,
    .bottom-nav {
        backdrop-filter: blur(40px);
    }
}

/* Small height devices */
@media (max-height: 600px) {
    .hero-section {
        min-height: 25vh;
    }
    
    .detail-poster {
        min-height: 35vh;
    }
    
    .sidebar-content {
        max-height: 80vh;
    }
}

//css/style.css

/* Reset & Base Styles */
:root {
    --primary-color: #FF4081;
    --secondary-color: #536DFE;
    --accent-color: #00BCD4;
    --dark-color: #0D0D1A;
    --light-color: #FFFFFF;
    --card-bg: rgba(255, 255, 255, 0.08);
    --card-border: rgba(255, 255, 255, 0.1);
    --shadow-color: rgba(0, 0, 0, 0.3);
    
    /* Mobile Variables */
    --mobile-padding: 12px;
    --card-radius: 16px;
    --bottom-nav-height: 60px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body.mobile-app {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: var(--dark-color);
    color: var(--light-color);
    min-height: 100vh;
    padding-top: 60px;
    padding-bottom: 70px;
    overflow-x: hidden;
    line-height: 1.5;
}

/* Loading Overlay Mobile */
#loading-overlay.mobile-loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--dark-color);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.key-loader {
    text-align: center;
}

.key-icon {
    font-size: 4rem;
    color: var(--primary-color);
    margin-bottom: 20px;
    animation: pulse 2s infinite;
}

.loading-text {
    font-size: 2rem;
    font-weight: 700;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 5px;
}

.loading-subtext {
    font-size: 0.9rem;
    color: var(--accent-color);
    opacity: 0.8;
}

@keyframes pulse {
    0%, 100% { 
        transform: scale(1); 
        opacity: 1;
    }
    50% { 
        transform: scale(1.1); 
        opacity: 0.8;
    }
}

/* Mobile Navigation */
.mobile-nav {
    background: rgba(13, 13, 26, 0.95);
    backdrop-filter: blur(20px);
    height: 60px;
    padding: 0 var(--mobile-padding);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    z-index: 1000;
}

.nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
}

.nav-toggler, .nav-btn {
    background: transparent;
    border: none;
    color: var(--light-color);
    font-size: 1.2rem;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    cursor: pointer;
}

.nav-toggler:hover, .nav-btn:hover {
    background: rgba(255, 255, 255, 0.1);
}

.nav-toggler:active, .nav-btn:active {
    transform: scale(0.95);
}

.navbar-brand {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-decoration: none;
}

.nav-actions {
    display: flex;
    gap: 8px;
}

.mobile-search {
    padding: 10px 0;
    display: none;
    animation: slideDown 0.3s ease;
}

.mobile-search.active {
    display: block;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.search-form .input-group {
    border-radius: 25px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.search-form input {
    background: transparent;
    border: none;
    color: var(--light-color);
    padding: 12px 20px;
    width: 100%;
    font-size: 0.95rem;
}

.search-form input:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--primary-color);
}

.search-form input::placeholder {
    color: rgba(255, 255, 255, 0.5);
}

.search-form button {
    background: var(--primary-color);
    border: none;
    border-radius: 0 25px 25px 0;
    padding: 0 20px;
    color: white;
    transition: background 0.3s ease;
}

.search-form button:hover {
    background: #E91E63;
}

/* Sidebar Menu */
.sidebar-menu {
    position: fixed;
    top: 0;
    left: -300px;
    width: 300px;
    height: 100vh;
    background: rgba(13, 13, 26, 0.98);
    backdrop-filter: blur(30px);
    z-index: 10000;
    transition: left 0.3s ease;
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
}

.sidebar-menu.active {
    left: 0;
    box-shadow: 5px 0 30px rgba(0, 0, 0, 0.4);
}

.sidebar-header {
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
}

.sidebar-header h5 {
    margin: 0;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.close-sidebar {
    background: transparent;
    border: none;
    color: var(--light-color);
    font-size: 1.2rem;
    cursor: pointer;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
}

.close-sidebar:hover {
    background: rgba(255, 255, 255, 0.1);
}

.sidebar-content {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
}

.user-info {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    flex-shrink: 0;
}

.user-name {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 3px;
}

.user-status {
    font-size: 0.85rem;
    color: var(--accent-color);
    opacity: 0.8;
}

.sidebar-nav {
    list-style: none;
    padding: 15px 0;
    flex: 1;
}

.sidebar-nav li {
    margin: 2px 0;
}

.sidebar-nav a {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px 20px;
    color: var(--light-color);
    text-decoration: none;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    font-size: 0.95rem;
}

.sidebar-nav a:hover,
.sidebar-nav a.active {
    background: rgba(255, 255, 255, 0.05);
    border-left-color: var(--primary-color);
    color: var(--primary-color);
    padding-left: 25px;
}

.sidebar-nav i {
    width: 20px;
    text-align: center;
    font-size: 1.1rem;
}

.sidebar-footer {
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    text-align: center;
    flex-shrink: 0;
}

.developer-info {
    color: var(--accent-color);
    font-size: 0.9rem;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

.version {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);
}

/* Sidebar Backdrop */
.sidebar-backdrop {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(3px);
    z-index: 9999;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.sidebar-backdrop.active {
    display: block;
    opacity: 1;
}

/* Main Content */
main.container-fluid {
    padding: var(--mobile-padding);
    animation: slideUp 0.4s ease;
    min-height: calc(100vh - 130px);
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Mobile Anime Grid */
.mobile-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 4%;
    justify-content: flex-start;
}

.mobile-grid .anime-card {
    width: 48%;
    margin-bottom: 16px;
    background: var(--card-bg);
    border-radius: var(--card-radius);
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid var(--card-border);
    position: relative;
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.anime-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px var(--shadow-color);
    border-color: var(--primary-color);
}

.card-image {
    position: relative;
    width: 100%;
    aspect-ratio: 2/3;
    overflow: hidden;
}

.card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.anime-card:hover .card-image img {
    transform: scale(1.05);
}

.episode-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background: var(--primary-color);
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    backdrop-filter: blur(5px);
    z-index: 2;
}

.rating-badge {
    position: absolute;
    bottom: 10px;
    left: 10px;
    background: rgba(0, 0, 0, 0.8);
    color: #FFD700;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    gap: 5px;
    backdrop-filter: blur(5px);
    z-index: 2;
}

.card-content {
    padding: 12px;
}

.card-title {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 8px;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 2.6em;
}

.card-subtitle {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card-actions {
    display: flex;
    gap: 8px;
}

.card-btn {
    flex: 1;
    padding: 10px;
    border-radius: 8px;
    border: none;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-height: 44px;
}

.card-btn.watch {
    background: var(--primary-color);
    color: white;
}

.card-btn.detail {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.card-btn:hover {
    opacity: 0.9;
    transform: translateY(-2px);
}

.card-btn:active {
    transform: scale(0.98);
}

/* Bottom Navigation */
.bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: var(--bottom-nav-height);
    background: rgba(13, 13, 26, 0.95);
    backdrop-filter: blur(20px);
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    z-index: 1000;
}

.bottom-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    transition: all 0.3s ease;
    padding: 10px;
    flex: 1;
    font-size: 0.7rem;
}

.bottom-nav-item i {
    font-size: 1.2rem;
    margin-bottom: 4px;
}

.bottom-nav-item span {
    font-weight: 600;
}

.bottom-nav-item.active {
    color: var(--primary-color);
    transform: translateY(-3px);
}

/* Hero Section Mobile */
.hero-section {
    position: relative;
    min-height: 30vh;
    max-height: 400px;
    border-radius: var(--card-radius);
    overflow: hidden;
    margin-bottom: 20px;
}

.hero-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 1s ease;
}

.hero-slide.active {
    opacity: 1;
}

.hero-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.9));
    color: white;
}

.hero-title {
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 5px;
}

.hero-subtitle {
    font-size: 0.9rem;
    opacity: 0.9;
    margin-bottom: 10px;
}

/* Category Chips */
.category-chips {
    display: flex;
    overflow-x: auto;
    gap: 10px;
    padding: 10px 0;
    margin-bottom: 20px;
    scrollbar-width: none;
    padding-bottom: 5px;
}

.category-chips::-webkit-scrollbar {
    display: none;
}

.chip {
    padding: 12px 20px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 25px;
    white-space: nowrap;
    color: var(--light-color);
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid transparent;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    flex-shrink: 0;
}

.chip.active,
.chip:hover {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
    transform: translateY(-2px);
}

/* Section Headers */
.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0 15px 0;
}

.section-header h4 {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.1rem;
    margin: 0;
}

.see-all {
    font-size: 0.85rem;
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
}

.see-all:hover {
    text-decoration: underline;
}

/* Page Headers */
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.page-header h4 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0;
}

/* Detail Page */
.mobile-detail-page {
    padding-bottom: 20px;
}

.detail-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
}

.back-btn {
    background: transparent;
    border: none;
    color: var(--light-color);
    font-size: 1.2rem;
    cursor: pointer;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
}

.back-btn:hover {
    background: rgba(255, 255, 255, 0.1);
}

.anime-detail-mobile {
    background: var(--card-bg);
    border-radius: var(--card-radius);
    overflow: hidden;
}

.detail-poster {
    position: relative;
    width: 100%;
    min-height: 40vh;
    max-height: 500px;
    overflow: hidden;
}

.poster-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.poster-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    display: flex;
    justify-content: center;
}

.btn-play {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 15px 40px;
    border-radius: 25px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: all 0.3s ease;
    min-height: 50px;
}

.btn-play:hover {
    background: #E91E63;
    transform: translateY(-2px);
}

.btn-play:active {
    transform: scale(0.98);
}

.detail-info {
    padding: 20px;
}

.detail-title {
    font-size: 1.3rem;
    font-weight: 700;
    margin-bottom: 15px;
    line-height: 1.3;
}

.detail-rating {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #FFD700;
    margin-bottom: 15px;
    font-size: 1.1rem;
}

.detail-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 20px;
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
}

.detail-meta span {
    display: flex;
    align-items: center;
    gap: 5px;
}

.detail-genres {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
}

.genre-tag {
    background: rgba(255, 255, 255, 0.1);
    padding: 8px 15px;
    border-radius: 15px;
    font-size: 0.85rem;
    transition: background 0.3s ease;
}

.genre-tag:hover {
    background: rgba(255, 255, 255, 0.2);
}

.detail-synopsis {
    margin-top: 20px;
}

.detail-synopsis h6 {
    font-size: 1rem;
    margin-bottom: 10px;
    color: var(--primary-color);
}

.detail-synopsis p {
    font-size: 0.9rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.8);
}

.detail-episodes {
    margin-top: 20px;
    padding: 0 20px 20px;
}

.episodes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.episodes-header h5 {
    margin: 0;
    font-size: 1.1rem;
}

.episodes-grid {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.episode-card {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 15px;
    text-decoration: none;
    color: var(--light-color);
    transition: all 0.3s ease;
    min-height: 70px;
}

.episode-card:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
}

.episode-number {
    width: 40px;
    height: 40px;
    background: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.9rem;
    margin-right: 15px;
    flex-shrink: 0;
}

.episode-info {
    flex: 1;
}

.episode-title {
    font-size: 0.95rem;
    font-weight: 500;
    margin-bottom: 5px;
}

.episode-date {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
}

.episode-play {
    color: var(--primary-color);
    font-size: 1.2rem;
    padding: 10px;
}

/* Watch Page */
.mobile-watch-page {
    padding-bottom: 20px;
}

.watch-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.watch-header h5 {
    margin: 0;
    flex: 1;
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.4;
}

.video-container {
    width: 100%;
    background: #000;
    border-radius: 10px;
    overflow: hidden;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
}

.loading-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
}

.loading-video i {
    font-size: 2rem;
    margin-bottom: 10px;
}

.no-video {
    padding: 40px 20px;
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
}

.no-video i {
    font-size: 3rem;
    color: var(--accent-color);
    margin-bottom: 15px;
}

/* Quality Selector */
.quality-selector {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
}

.quality-selector h6 {
    font-size: 1rem;
    margin-bottom: 15px;
    color: var(--primary-color);
}

.quality-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.quality-btn {
    padding: 12px 20px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    color: var(--light-color);
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
    min-height: 44px;
}

.quality-btn.active,
.quality-btn:hover {
    background: var(--primary-color);
    border-color: var(--primary-color);
}

.quality-btn:active {
    transform: scale(0.98);
}

/* Download Section */
.download-section {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
}

.download-section h6 {
    font-size: 1rem;
    margin-bottom: 15px;
    color: var(--primary-color);
}

.quality-title {
    font-size: 0.95rem;
    margin: 15px 0 10px 0;
    color: var(--accent-color);
}

.download-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.download-btn {
    padding: 12px 15px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    color: var(--light-color);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.85rem;
    transition: all 0.3s ease;
    min-height: 44px;
}

.download-btn:hover {
    background: var(--primary-color);
    transform: translateY(-2px);
}

/* Search Page */
.mobile-search-page {
    padding: 10px;
}

.search-header {
    margin-bottom: 20px;
}

.search-box {
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 25px;
    padding: 12px 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.search-box i {
    color: rgba(255, 255, 255, 0.5);
    margin-right: 10px;
}

.search-box input {
    background: transparent;
    border: none;
    color: var(--light-color);
    width: 100%;
    font-size: 1rem;
}

.search-box input:focus {
    outline: none;
}

.clear-search {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    font-size: 1rem;
    padding: 5px;
    border-radius: 50%;
}

.clear-search:hover {
    background: rgba(255, 255, 255, 0.1);
}

/* Search Results */
.search-results {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.result-item {
    display: flex;
    gap: 15px;
    background: var(--card-bg);
    border-radius: var(--card-radius);
    padding: 15px;
    text-decoration: none;
    color: var(--light-color);
    transition: all 0.3s ease;
}

.result-item:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateX(5px);
}

.result-image {
    width: 80px;
    height: 100px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
}

.result-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.result-content {
    flex: 1;
}

.result-title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 8px;
    line-height: 1.3;
}

.result-meta {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 10px;
    display: flex;
    gap: 15px;
}

.result-rating {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #FFD700;
    font-size: 0.9rem;
}

.result-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.result-actions .btn {
    padding: 8px 15px;
    font-size: 0.85rem;
    min-height: 36px;
}

/* Empty State */
.empty-state {
    text-align: center;
    padding: 50px 20px;
    color: rgba(255, 255, 255, 0.5);
}

.empty-icon {
    font-size: 3rem;
    margin-bottom: 20px;
    opacity: 0.5;
}

.empty-state h5 {
    font-size: 1.2rem;
    margin-bottom: 10px;
}

.empty-state p {
    font-size: 0.9rem;
    line-height: 1.5;
}

/* Toast Notifications */
.toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10001;
}

.toast {
    background: rgba(13, 13, 26, 0.9);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 15px 20px;
    margin-bottom: 10px;
    animation: slideIn 0.3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 250px;
    max-width: 300px;
}

.toast.success {
    border-left: 4px solid #00E676;
}

.toast.error {
    border-left: 4px solid #FF4081;
}

.toast.info {
    border-left: 4px solid #536DFE;
}

.toast-icon {
    font-size: 1.2rem;
}

.toast-content {
    flex: 1;
}

.toast-message {
    font-size: 0.9rem;
    line-height: 1.4;
}

.toast-close {
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    font-size: 1rem;
    padding: 5px;
    border-radius: 50%;
}

.toast-close:hover {
    background: rgba(255, 255, 255, 0.1);
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Skeleton Loading */
.skeleton {
    background: linear-gradient(90deg, 
        rgba(255, 255, 255, 0.05) 25%, 
        rgba(255, 255, 255, 0.1) 50%, 
        rgba(255, 255, 255, 0.05) 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: var(--card-radius);
}

.skeleton-image {
    width: 100%;
    height: 200px;
    border-radius: 10px;
}

.skeleton-line {
    height: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    margin-bottom: 10px;
}

.skeleton-line.short {
    width: 60%;
}

.skeleton-buttons {
    display: flex;
    gap: 8px;
    margin-top: 10px;
}

.skeleton-button {
    flex: 1;
    height: 35px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

/* Load More Button */
.load-more {
    text-align: center;
    margin: 30px 0;
}

.load-more .btn {
    padding: 12px 40px;
    border-radius: 25px;
    font-weight: 600;
    min-height: 44px;
}

/* Error Page */
.error-page {
    text-align: center;
    padding: 50px 20px;
}

.error-page i {
    font-size: 4rem;
    color: var(--primary-color);
    margin-bottom: 20px;
}

.error-page h2 {
    font-size: 1.8rem;
    margin-bottom: 15px;
}

.error-page p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 30px;
    line-height: 1.5;
}

/* Modal Video Player */
.modal-content {
    background: var(--dark-color);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-title {
    color: var(--light-color);
}

.btn-close {
    filter: invert(1) grayscale(100%) brightness(200%);
    opacity: 0.7;
}

.btn-close:hover {
    opacity: 1;
}

/* Focus styles for accessibility */
:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
}

/* Scrollbar styling */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}

::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb {
    background: var(--primary-color);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: #E91E63;
}

/* Selection styling */
::selection {
    background-color: var(--primary-color);
    color: white;
}

/* Hero Carousel Dots */
.hero-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;
}

.hero-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    transition: all 0.3s ease;
    padding: 0;
    font-size: 0;
    color: transparent;
}

.hero-dot.active {
    background: var(--primary-color);
    transform: scale(1.2);
}

.hero-dot:hover {
    background: var(--secondary-color);
}

/* Pagination Styles */
.pagination-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 30px 0;
    flex-wrap: wrap;
}

.pagination-btn {
    padding: 10px 15px;
    background: var(--card-bg);
    border-radius: 8px;
    color: var(--light-color);
    text-decoration: none;
    border: 1px solid var(--card-border);
    font-size: 0.9rem;
    transition: all 0.3s ease;
    min-width: 40px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
}

.pagination-btn:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
}

.pagination-btn.active {
    background: var(--primary-color);
    border-color: var(--primary-color);
    color: white;
    font-weight: bold;
}

.pagination-btn.prev,
.pagination-btn.next {
    padding: 10px 20px;
}

/* Search improvements */
.clear-search {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    padding: 3px;
    border-radius: 50%;
    display: none;
}

.clear-search:hover {
    background: rgba(255, 255, 255, 0.1);
}

.search-box {
    position: relative;
}

.clear-search {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    display: none;
}

.clear-search:hover {
    background: rgba(255, 255, 255, 0.1);
}

/* Animation for carousel */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.hero-slide {
    animation: fadeIn 1s ease;
}

/* Better error states */
.error-page {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 40px 20px;
}

.error-page i {
    font-size: 4rem;
    color: var(--primary-color);
    margin-bottom: 20px;
}

.error-page h2 {
    font-size: 1.8rem;
    margin-bottom: 15px;
}

.error-page p {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 30px;
    line-height: 1.5;
    max-width: 400px;
}

/* Toast improvements */
.toast-actions {
    display: flex;
    gap: 10px;
    margin-left: 10px;
}

.toast-btn {
    padding: 5px 15px;
    background: var(--primary-color);
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background 0.3s ease;
}

.toast-btn:hover {
    background: #E91E63;
}

/* Page info */
.page-info {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    gap: 5px;
}

/* Loading improvements */
.loading-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
}

.loading-video i {
    font-size: 2rem;
    margin-bottom: 10px;
}

.no-video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: rgba(255, 255, 255, 0.7);
    padding: 20px;
}

.no-video i {
    font-size: 3rem;
    color: var(--accent-color);
    margin-bottom: 15px;
}

/* Responsive pagination */
@media (max-width: 576px) {
    .pagination-btn {
        padding: 8px 12px;
        font-size: 0.8rem;
        min-width: 35px;
    }
    
    .pagination-btn.prev,
    .pagination-btn.next {
        padding: 8px 15px;
    }
    
    .page-info {
        font-size: 0.8rem;
    }
}

/* Dark mode adjustments */
body.light-mode .pagination-btn {
    background: rgba(0, 0, 0, 0.05);
    color: var(--light-color);
    border-color: rgba(0, 0, 0, 0.1);
}

body.light-mode .pagination-btn:hover {
    background: rgba(0, 0, 0, 0.1);
}

body.light-mode .pagination-btn.active {
    background: var(--primary-color);
    color: white;
}

body.light-mode .hero-dot {
    background: rgba(0, 0, 0, 0.3);
}

body.light-mode .hero-dot.active {
    background: var(--primary-color);
}

/* Profile Page Improvements */
.profile-card {
    animation: fadeIn 0.5s ease;
}

.user-avatar-large {
    animation: pulse 2s infinite;
}

.stat-item {
    transition: all 0.3s ease;
    border: 1px solid transparent;
}

.stat-item:hover {
    border-color: var(--primary-color);
    transform: translateY(-3px);
}

.setting-item:hover {
    background: rgba(255, 255, 255, 0.1) !important;
    border-color: var(--primary-color) !important;
}

.setting-item:active {
    transform: scale(0.98);
}

/* Responsive adjustments for profile */
@media (max-width: 576px) {
    .user-avatar-large {
        width: 60px !important;
        height: 60px !important;
        font-size: 1.5rem !important;
    }
    
    .stat-item {
        padding: 12px !important;
    }
    
    .stat-item div:first-child {
        font-size: 1.5rem !important;
    }
}

//js/api.js

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

//js/app.js

// Main Application for KeyAnime

class KeyAnimeApp {
    constructor() {
        this.utils = utils;
        this.api = api;
        this.components = components;
        this.router = router;
        this.init();
    }

    init() {
        // Initialize when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
            this.hideLoading();
            
            // Check for search query in URL
            const urlParams = new URLSearchParams(window.location.search);
            const searchQuery = urlParams.get('q');
            if (searchQuery) {
                router.navigateTo('/search', { q: searchQuery });
            }
            
            // Setup error handling
            this.setupErrorHandling();
        });
        
        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            this.utils.cleanup();
        });
    }

    setupEventListeners() {
        // Menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const closeMenu = document.getElementById('closeMenu');
        const sidebarMenu = document.getElementById('sidebarMenu');
        const sidebarBackdrop = document.getElementById('sidebarBackdrop');

        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                sidebarMenu.classList.add('active');
                sidebarBackdrop.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        if (closeMenu) {
            closeMenu.addEventListener('click', () => {
                this.closeSidebar();
            });
        }

        if (sidebarBackdrop) {
            sidebarBackdrop.addEventListener('click', () => {
                this.closeSidebar();
            });
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
                const searchInput = document.getElementById('search-input');
                const query = searchInput.value.trim();
                
                if (query && query.length >= 3) {
                    // Close mobile search if open
                    if (mobileSearch) mobileSearch.classList.remove('active');
                    
                    // Navigate to search page
                    router.navigateTo('/search', { q: query });
                    
                    // Clear input
                    searchInput.value = '';
                } else {
                    utils.showToast('Masukkan minimal 3 karakter', 'error');
                }
            });
        }

// Also handle the search input in navbar (mobile)
const mobileSearchInput = document.getElementById('search-input');
if (mobileSearchInput) {
    mobileSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const query = e.target.value.trim();
            
            if (query && query.length >= 3) {
                // Close mobile search if open
                if (mobileSearch) mobileSearch.classList.remove('active');
                
                // Navigate to search page
                router.navigateTo('/search', { q: query });
                
                // Clear input
                e.target.value = '';
            } else {
                utils.showToast('Masukkan minimal 3 karakter', 'error');
            }
        }
    });
}

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                utils.toggleTheme();
            });
        }

        // Bottom navigation
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const href = item.getAttribute('href');
                if (href) {
                    router.navigateTo(href.substring(1));
                }
            });
        });

        // Sidebar navigation
        document.querySelectorAll('.sidebar-nav a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href) {
                    // Close sidebar
                    this.closeSidebar();
                    
                    // Navigate
                    router.navigateTo(href.substring(1));
                }
            });
        });

        // Video modal close
        const videoModal = document.getElementById('videoModal');
        if (videoModal) {
            videoModal.addEventListener('hidden.bs.modal', () => {
                const iframe = videoModal.querySelector('iframe');
                if (iframe) {
                    iframe.src = iframe.src; // Reload iframe
                }
            });
        }

        // Back button handling
        window.addEventListener('popstate', () => {
            // Close sidebar if open
            this.closeSidebar();
            
            // Close search if open
            if (mobileSearch && mobileSearch.classList.contains('active')) {
                mobileSearch.classList.remove('active');
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Escape key
            if (e.key === 'Escape') {
                this.closeSidebar();
                
                // Close search
                if (mobileSearch && mobileSearch.classList.contains('active')) {
                    mobileSearch.classList.remove('active');
                }
            }
            
            // Search shortcut (Ctrl+K or Cmd+K)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (mobileSearch && !mobileSearch.classList.contains('active')) {
                    mobileSearch.classList.add('active');
                    document.getElementById('search-input').focus();
                }
            }
            
            // Home shortcut (Ctrl+H or Cmd+H)
            if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
                e.preventDefault();
                router.navigateTo('/');
            }
            
            // Toggle theme (Ctrl+T or Cmd+T)
            if ((e.ctrlKey || e.metaKey) && e.key === 't') {
                e.preventDefault();
                utils.toggleTheme();
            }
        });

        // Click outside to close search
        document.addEventListener('click', (e) => {
            const mobileSearch = document.getElementById('mobileSearch');
            const searchToggle = document.getElementById('searchToggle');
            
            if (mobileSearch && mobileSearch.classList.contains('active') && 
                !mobileSearch.contains(e.target) && 
                !searchToggle.contains(e.target)) {
                mobileSearch.classList.remove('active');
            }
        });

        // PWA features
        this.setupPWA();
    }

    closeSidebar() {
        const sidebarMenu = document.getElementById('sidebarMenu');
        const sidebarBackdrop = document.getElementById('sidebarBackdrop');
        
        if (sidebarMenu) sidebarMenu.classList.remove('active');
        if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    setupPWA() {
        // Register service worker for PWA
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }).catch(error => {
                    console.log('ServiceWorker registration failed: ', error);
                });
            });
        }

        // Add to home screen prompt
        let deferredPrompt;
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later
            deferredPrompt = e;
            
            // Show custom install button after 5 seconds
            setTimeout(() => {
                this.showInstallPrompt(deferredPrompt);
            }, 5000);
        });

        // Handle app installed
        window.addEventListener('appinstalled', () => {
            utils.showToast('Aplikasi berhasil diinstal!', 'success');
            deferredPrompt = null;
        });
    }

    showInstallPrompt(deferredPrompt) {
        // Create install prompt
        const installPrompt = document.createElement('div');
        installPrompt.className = 'toast info';
        installPrompt.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-download"></i>
            </div>
            <div class="toast-content">
                <div class="toast-message">Instal KeyAnime untuk pengalaman lebih baik</div>
            </div>
            <div class="toast-actions">
                <button class="toast-btn" id="installBtn">Instal</button>
                <button class="toast-close" id="closeInstall">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        installPrompt.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(13, 13, 26, 0.95);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            padding: 15px;
            z-index: 10001;
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 300px;
            max-width: 90%;
            animation: slideIn 0.3s ease;
        `;
        
        const container = document.querySelector('.toast-container') || this.utils.createToastContainer();
        container.appendChild(installPrompt);
        
        // Install button
        document.getElementById('installBtn').addEventListener('click', () => {
            deferredPrompt.prompt();
            installPrompt.remove();
        });
        
        // Close button
        document.getElementById('closeInstall').addEventListener('click', () => {
            installPrompt.remove();
        });
        
        // Auto remove after 10 seconds
        setTimeout(() => {
            if (installPrompt.parentNode === container) {
                installPrompt.remove();
            }
        }, 10000);
    }

    hideLoading() {
        setTimeout(() => {
            const overlay = document.getElementById('loading-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    overlay.style.display = 'none';
                }, 300);
            }
        }, 800);
    }

    // Global error handler
    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e);
            utils.showToast('Terjadi kesalahan dalam aplikasi', 'error');
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e);
            utils.showToast('Terjadi kesalahan dalam aplikasi', 'error');
        });
        
        // Network status
        window.addEventListener('online', () => {
            utils.showToast('Koneksi internet tersedia', 'success');
        });
        
        window.addEventListener('offline', () => {
            utils.showToast('Koneksi internet terputus', 'error');
        });
    }
}

// Initialize the app
const app = new KeyAnimeApp();

// Make utils, api, components, router globally accessible for debugging
window.utils = utils;
window.api = api;
window.components = components;
window.router = router;
window.app = app;

//js/components.js

// UI Components for KeyAnime

class Components {
    constructor() {
        this.utils = utils;
        this.api = api;
    }

    // Create Anime Card
    createAnimeCard(anime, options = {}) {
        const animeId = anime.animeId || anime.slug || anime.id;
        const isFavorite = this.utils.isFavorite(animeId);
        const watchBtnText = 'Tonton Eps 1';
        const showType = options.showType !== false;
        const compact = options.compact || false;
        
        return `
            <div class="anime-card" data-anime-id="${animeId}">
                <div class="card-image">
                    <img src="${this.utils.getImageUrl(anime.poster)}" 
                         alt="${anime.title}"
                         loading="lazy"
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 300 450\"%3E%3Crect width=\"300\" height=\"450\" fill=\"%231a1a2e\"/%3E%3Ctext x=\"150\" y=\"200\" font-family=\"Arial\" font-size=\"16\" fill=\"%23ffffff\" text-anchor=\"middle\"%3EKeyAnime%3C/text%3E%3Ctext x=\"150\" y=\"230\" font-family=\"Arial\" font-size=\"12\" fill=\"%23FF4081\" text-anchor=\"middle\"%3ENo Image%3C/text%3E%3C/svg%3E'">
                    ${anime.episodes && anime.episodes !== 'Unknown' ? `<div class="episode-badge">${anime.episodes}</div>` : ''}
                    ${anime.score ? `
                        <div class="rating-badge">
                            <i class="fas fa-star"></i>
                            <span>${typeof anime.score === 'string' ? anime.score.replace('Rating : ', '') : anime.score}</span>
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
        const score = typeof anime.score === 'string' ? anime.score.replace('Rating : ', '') : anime.score;
        const status = typeof anime.status === 'string' ? anime.status.replace('Status : ', '') : anime.status;
        
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
                        ${status ? `<span>${status}</span>` : ''}
                        ${score ? `<span>⭐ ${score}</span>` : ''}
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
        const episodeNumber = episode.title || episode.episodeNumber || '?';
        return `
            <a href="#/watch/${episode.episodeId}" class="episode-card" data-episode-id="${episode.episodeId}">
                <div class="episode-number">${episodeNumber}</div>
                <div class="episode-info">
                    <div class="episode-title">Episode ${episodeNumber}</div>
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
                                <div>
                                    <div style="font-weight: 500; font-size: 0.9rem; margin-bottom: 5px;">${anime.title}</div>
                                    ${anime.time ? `<div style="font-size: 0.8rem; color: rgba(255,255,255,0.6);">${anime.time}</div>` : ''}
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
        const animeId = anime.animeId || anime.slug || anime.id;
        const isFavorite = this.utils.isFavorite(animeId);
        
        // Urutkan episode berdasarkan nomor episode (ascending) dan ambil episode 1
        let sortedEpisodes = [];
        let firstEpisodeId = null;
        
        if (anime.episodeList?.length > 0) {
            // Urutkan episode berdasarkan nomor episode
            sortedEpisodes = [...anime.episodeList].sort((a, b) => {
                const getEpisodeNumber = (ep) => {
                    // Coba ambil angka dari title
                    const titleNum = parseInt(ep.title);
                    if (!isNaN(titleNum)) return titleNum;
                    
                    // Coba ekstrak dari title string
                    const match = ep.title?.match(/Episode\s*(\d+)/i) || ep.title?.match(/(\d+)/);
                    if (match) return parseInt(match[1]);
                    
                    // Coba dari episodeId
                    const idMatch = ep.episodeId?.match(/episode-(\d+)/i);
                    if (idMatch) return parseInt(idMatch[1]);
                    
                    return 0;
                };
                return getEpisodeNumber(a) - getEpisodeNumber(b);
            });
            
            // Ambil episode pertama setelah diurutkan (Episode 1)
            const firstEpisode = sortedEpisodes[0];
            firstEpisodeId = firstEpisode.episodeId;
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
                            ${anime.episodes && anime.episodes !== 'Unknown' ? `<span><i class="fas fa-list-ol"></i> ${anime.episodes} Episode</span>` : ''}
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
                                ${sortedEpisodes.map(ep => this.createEpisodeCard(ep, animeId)).join('')}
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
            <div class="pagination-container">
                <!-- Previous Button -->
                ${currentPage > 1 ? `
                    <a href="${baseRoute}?page=${currentPage - 1}" class="pagination-btn prev">
                        <i class="fas fa-chevron-left"></i> Sebelumnya
                    </a>
                ` : ''}
                
                <!-- First Page -->
                ${startPage > 1 ? `
                    <a href="${baseRoute}?page=1" class="pagination-btn">1</a>
                    ${startPage > 2 ? '<span style="color: var(--light-color); opacity: 0.5; padding: 0 5px;">...</span>' : ''}
                ` : ''}
                
                <!-- Page Numbers -->
                ${Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => `
                    <a href="${baseRoute}?page=${page}" 
                       class="pagination-btn ${page === currentPage ? 'active' : ''}">
                        ${page}
                    </a>
                `).join('')}
                
                <!-- Last Page -->
                ${endPage < totalPages ? `
                    ${endPage < totalPages - 1 ? '<span style="color: var(--light-color); opacity: 0.5; padding: 0 5px;">...</span>' : ''}
                    <a href="${baseRoute}?page=${totalPages}" class="pagination-btn">${totalPages}</a>
                ` : ''}
                
                <!-- Next Button -->
                ${currentPage < totalPages ? `
                    <a href="${baseRoute}?page=${currentPage + 1}" class="pagination-btn next">
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

//js/router.js

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

//js/utils.js

// Utility functions for KeyAnime

class Utils {
    constructor() {
        this.currentPage = 1;
        this.itemsPerPage = 20;
        this.theme = localStorage.getItem('theme') || 'dark';
        this.initTheme();
        this.carouselInterval = null;
    }

    // Theme Management
    initTheme() {
        if (this.theme === 'light') {
            document.body.classList.add('light-mode');
            const themeIcon = document.querySelector('#themeToggle i');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
        }
    }

    toggleTheme() {
        if (this.theme === 'dark') {
            this.theme = 'light';
            document.body.classList.add('light-mode');
            const themeIcon = document.querySelector('#themeToggle i');
            if (themeIcon) {
                themeIcon.className = 'fas fa-sun';
            }
        } else {
            this.theme = 'dark';
            document.body.classList.remove('light-mode');
            const themeIcon = document.querySelector('#themeToggle i');
            if (themeIcon) {
                themeIcon.className = 'fas fa-moon';
            }
        }
        localStorage.setItem('theme', this.theme);
    }

    // Loading Management
    showLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
            overlay.style.opacity = '1';
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }
    }

    // Toast Notifications
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        let container = document.querySelector('.toast-container');
        if (!container) {
            container = this.createToastContainer();
        }
        container.appendChild(toast);

        // Auto remove after 5 seconds
        const removeToast = () => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode === container) {
                    container.removeChild(toast);
                }
                // Remove container if empty
                if (container.children.length === 0) {
                    container.remove();
                }
            }, 300);
        };

        const timeoutId = setTimeout(removeToast, 5000);

        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(timeoutId);
            removeToast();
        });

        return toast;
    }

    createToastContainer() {
        const container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }

    // Local Storage Management
    setItem(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('LocalStorage error:', e);
            this.showToast('Gagal menyimpan data', 'error');
            return false;
        }
    }

    getItem(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error('LocalStorage error:', e);
            return null;
        }
    }

    // Favorites Management
    addToFavorites(anime) {
        const favorites = this.getItem('favorites') || [];
        if (!favorites.some(fav => fav.animeId === anime.animeId)) {
            favorites.push({
                animeId: anime.animeId,
                title: anime.title,
                poster: anime.poster,
                addedAt: new Date().toISOString()
            });
            if (this.setItem('favorites', favorites)) {
                this.showToast('Ditambahkan ke favorit', 'success');
                return true;
            }
        }
        return false;
    }

    removeFromFavorites(animeId) {
        const favorites = this.getItem('favorites') || [];
        const filtered = favorites.filter(fav => fav.animeId !== animeId);
        if (this.setItem('favorites', filtered)) {
            this.showToast('Dihapus dari favorit', 'success');
            return true;
        }
        return false;
    }

    isFavorite(animeId) {
        const favorites = this.getItem('favorites') || [];
        return favorites.some(fav => fav.animeId === animeId);
    }

    // Watch History Management
    addToHistory(anime, episode = null) {
        const history = this.getItem('watchHistory') || [];
        
        // Remove if already exists
        const filtered = history.filter(item => 
            !(item.animeId === anime.animeId && item.episodeId === (episode?.episodeId || 'main'))
        );
        
        const historyItem = {
            animeId: anime.animeId,
            title: anime.title,
            poster: anime.poster,
            episodeId: episode?.episodeId || 'main',
            episodeTitle: episode?.title || 'Detail',
            watchedAt: new Date().toISOString()
        };
        
        // Add to beginning and keep only last 100 items
        filtered.unshift(historyItem);
        if (filtered.length > 100) {
            filtered.length = 100;
        }
        
        this.setItem('watchHistory', filtered);
        return true;
    }

    getHistory() {
        return this.getItem('watchHistory') || [];
    }

    // URL Helper
    getImageUrl(url) {
        if (!url || url === 'default.jpg' || url === '') {
            return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450"%3E%3Crect width="300" height="450" fill="%231a1a2e"/%3E%3Ctext x="150" y="200" font-family="Arial" font-size="16" fill="%23ffffff" text-anchor="middle"%3EKeyAnime%3C/text%3E%3Ctext x="150" y="230" font-family="Arial" font-size="12" fill="%23FF4081" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
        }
        if (url.startsWith('http')) {
            return url;
        }
        // Handle relative URLs from new API
        if (url.startsWith('/')) {
            return `https://otakudesu.best${url}`;
        }
        return url;
    }

    // Format Date
    formatDate(dateString) {
        if (!dateString) return '-';
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return '-';
            return date.toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        } catch {
            return '-';
        }
    }

    // Truncate Text
    truncateText(text, maxLength = 100) {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    }

    // Generate Skeleton Loading
    generateSkeletonCards(count = 6) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `
                <div class="anime-card skeleton">
                    <div class="card-image skeleton-image"></div>
                    <div class="card-content">
                        <div class="skeleton-line"></div>
                        <div class="skeleton-line short"></div>
                        <div class="skeleton-buttons">
                            <div class="skeleton-button"></div>
                            <div class="skeleton-button"></div>
                        </div>
                    </div>
                </div>
            `;
        }
        return html;
    }

    // Generate Skeleton for Search Results
    generateSearchSkeleton(count = 3) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += `
                <div class="result-item skeleton">
                    <div class="result-image skeleton-image" style="width: 80px; height: 100px;"></div>
                    <div class="result-content" style="flex: 1;">
                        <div class="skeleton-line" style="width: 70%;"></div>
                        <div class="skeleton-line short" style="width: 50%;"></div>
                        <div class="skeleton-buttons" style="margin-top: 10px;">
                            <div class="skeleton-button" style="width: 80px;"></div>
                            <div class="skeleton-button" style="width: 40px;"></div>
                        </div>
                    </div>
                </div>
            `;
        }
        return html;
    }

    // Error Handler
    handleError(error, message = 'Terjadi kesalahan') {
        console.error(error);
        this.showToast(message, 'error');
        return {
            error: true,
            message: message
        };
    }

    // Scroll to Top
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Debounce Function
    debounce(func, wait, immediate = false) {
        let timeout;
        return function executedFunction(...args) {
            const context = this;
            const later = () => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // Check Mobile
    isMobile() {
        return window.innerWidth <= 768;
    }

    // Carousel Management
    initCarousel(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const slides = container.querySelectorAll('.hero-slide');
        if (slides.length <= 1) return;

        // Clear existing interval
        if (this.carouselInterval) {
            clearInterval(this.carouselInterval);
        }

        let currentSlide = 0;
        
        // Function to show specific slide
        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                const dot = container.querySelector(`.hero-dot[data-index="${i}"]`);
                if (dot) dot.classList.remove('active');
            });
            slides[index].classList.add('active');
            const activeDot = container.querySelector(`.hero-dot[data-index="${index}"]`);
            if (activeDot) activeDot.classList.add('active');
            currentSlide = index;
        };

        // Function for next slide
        const nextSlide = () => {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        };

        // Create dots if they don't exist
        if (!container.querySelector('.hero-dots')) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'hero-dots';
            dotsContainer.style.cssText = `
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                gap: 8px;
                z-index: 10;
            `;

            slides.forEach((_, index) => {
                const dot = document.createElement('button');
                dot.className = `hero-dot ${index === 0 ? 'active' : ''}`;
                dot.dataset.index = index;
                dot.innerHTML = '•';
                dot.style.cssText = `
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: none;
                    background: ${index === 0 ? 'var(--primary-color)' : 'rgba(255,255,255,0.5)'};
                    color: transparent;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 0;
                    font-size: 0;
                `;
                dot.addEventListener('click', () => {
                    showSlide(index);
                    resetInterval();
                });
                dotsContainer.appendChild(dot);
            });

            container.appendChild(dotsContainer);
        }

        // Function to reset interval
        const resetInterval = () => {
            if (this.carouselInterval) {
                clearInterval(this.carouselInterval);
            }
            this.carouselInterval = setInterval(nextSlide, 5000);
        };

        // Start auto rotation
        resetInterval();

        // Pause on hover
        container.addEventListener('mouseenter', () => {
            if (this.carouselInterval) {
                clearInterval(this.carouselInterval);
            }
        });

        container.addEventListener('mouseleave', () => {
            resetInterval();
        });

        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            if (this.carouselInterval) {
                clearInterval(this.carouselInterval);
            }
        });

        container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            resetInterval();
        });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide();
                } else {
                    // Swipe right - previous slide
                    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
                    showSlide(prevIndex);
                }
            }
        };
    }

    // Cleanup function
    cleanup() {
        if (this.carouselInterval) {
            clearInterval(this.carouselInterval);
            this.carouselInterval = null;
        }
    }
}

// Export utils instance
const utils = new Utils();

