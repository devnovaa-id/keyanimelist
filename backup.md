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
                <i class="fas fa-key"></i>
            </div>
            <div class="loading-text">KeyAnime</div>
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
                    <i class="fas fa-key"></i> KeyAnime
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
            <h5><i class="fas fa-key"></i> KeyAnime</h5>
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