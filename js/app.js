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
                sidebarMenu.classList.remove('active');
                sidebarBackdrop.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        if (sidebarBackdrop) {
            sidebarBackdrop.addEventListener('click', () => {
                sidebarMenu.classList.remove('active');
                sidebarBackdrop.classList.remove('active');
                document.body.style.overflow = '';
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
                
                if (query) {
                    // Close mobile search if open
                    mobileSearch.classList.remove('active');
                    
                    // Navigate to search page
                    router.navigateTo('/search', { q: query });
                    
                    // Clear input
                    searchInput.value = '';
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
                    sidebarMenu.classList.remove('active');
                    sidebarBackdrop.classList.remove('active');
                    document.body.style.overflow = '';
                    
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
            if (sidebarMenu.classList.contains('active')) {
                sidebarMenu.classList.remove('active');
                sidebarBackdrop.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Close search if open
            if (mobileSearch.classList.contains('active')) {
                mobileSearch.classList.remove('active');
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Escape key
            if (e.key === 'Escape') {
                // Close sidebar
                if (sidebarMenu.classList.contains('active')) {
                    sidebarMenu.classList.remove('active');
                    sidebarBackdrop.classList.remove('active');
                    document.body.style.overflow = '';
                }
                
                // Close search
                if (mobileSearch.classList.contains('active')) {
                    mobileSearch.classList.remove('active');
                }
            }
            
            // Search shortcut (Ctrl+K or Cmd+K)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (!mobileSearch.classList.contains('active')) {
                    mobileSearch.classList.add('active');
                    document.getElementById('search-input').focus();
                }
            }
        });

        // Load more button
        document.addEventListener('click', (e) => {
            if (e.target.id === 'loadMoreBtn' || e.target.closest('#loadMoreBtn')) {
                const btn = e.target.closest('#loadMoreBtn') || e.target;
                const spinner = btn.querySelector('.fa-spinner');
                const text = btn.querySelector('span');
                
                if (spinner && text) {
                    spinner.style.display = 'inline-block';
                    text.textContent = 'Memuat...';
                    btn.disabled = true;
                    
                    // Simulate load more (will be handled by router)
                    setTimeout(() => {
                        spinner.style.display = 'none';
                        text.textContent = 'Muat Lebih Banyak';
                        btn.disabled = false;
                    }, 1000);
                }
            }
        });

        // Infinite scroll (for mobile)
        let isScrolling = false;
        window.addEventListener('scroll', () => {
            if (isScrolling) return;
            
            isScrolling = true;
            setTimeout(() => {
                const scrollPosition = window.innerHeight + window.scrollY;
                const pageHeight = document.documentElement.scrollHeight;
                
                // Load more when 80% scrolled
                if (scrollPosition >= pageHeight * 0.8) {
                    const loadMoreBtn = document.getElementById('loadMoreBtn');
                    if (loadMoreBtn && !loadMoreBtn.disabled) {
                        loadMoreBtn.click();
                    }
                }
                
                isScrolling = false;
            }, 200);
        });

        // PWA features
        this.setupPWA();
    }

    setupPWA() {
        // Register service worker for PWA
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').catch(error => {
                    console.log('Service Worker registration failed:', error);
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
            
            // Show custom install button
            this.showInstallPrompt();
        });

        // Handle app installed
        window.addEventListener('appinstalled', () => {
            utils.showToast('Aplikasi berhasil diinstal!', 'success');
            deferredPrompt = null;
        });
    }

    showInstallPrompt() {
        // You can add a custom install button in your UI
        // and trigger the prompt when clicked:
        // deferredPrompt.prompt();
        // Then listen for the user's choice
    }

    hideLoading() {
        setTimeout(() => {
            document.getElementById('loading-overlay').style.opacity = '0';
            setTimeout(() => {
                document.getElementById('loading-overlay').style.display = 'none';
            }, 300);
        }, 1000);
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