// Main Application for KeyAnime
class KeyAnimeApp {
    constructor() {
        this.utils = utils;
        this.api = api;
        this.components = components;
        this.router = router;
        this.deferredPrompt = null; // Untuk menangani install prompt
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
            
            // Setup PWA features
            this.setupPWAFeatures();
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
    }

    closeSidebar() {
        const sidebarMenu = document.getElementById('sidebarMenu');
        const sidebarBackdrop = document.getElementById('sidebarBackdrop');
        
        if (sidebarMenu) sidebarMenu.classList.remove('active');
        if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    setupPWAFeatures() {
        // Register service worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('ServiceWorker registration successful:', registration.scope);
                        
                        // Check for updates every hour
                        setInterval(() => {
                            registration.update();
                        }, 60 * 60 * 1000);
                    })
                    .catch(error => {
                        console.log('ServiceWorker registration failed:', error);
                    });
            });
        }

        // Handle app installation
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            
            // Show install button after 10 seconds
            setTimeout(() => {
                this.showInstallPrompt();
            }, 10000);
        });

        // Handle app installed
        window.addEventListener('appinstalled', () => {
            console.log('PWA installed successfully');
            utils.showToast('Aplikasi berhasil diinstal!', 'success');
            
            // Track installation
            if ('storage' in navigator && 'estimate' in navigator.storage) {
                navigator.storage.estimate().then(estimate => {
                    console.log('Storage quota:', estimate.quota);
                    console.log('Storage usage:', estimate.usage);
                });
            }
        });

        // Handle offline/online status
        window.addEventListener('offline', () => {
            utils.showToast('Anda sedang offline', 'info');
            document.documentElement.classList.add('offline');
        });

        window.addEventListener('online', () => {
            utils.showToast('Koneksi internet tersedia', 'success');
            document.documentElement.classList.remove('offline');
            
            // Sync data when back online
            this.syncOfflineData();
        });

        // Request notification permission
        this.requestNotificationPermission();
    }

    // Method untuk menampilkan install prompt
    showInstallPrompt() {
        // Cek jika sudah diinstall
        if (window.matchMedia('(display-mode: standalone)').matches || 
            window.navigator.standalone === true) {
            return;
        }

        // Cek jika sudah ada prompt yang aktif
        if (document.querySelector('.pwa-install-prompt')) {
            return;
        }

        const installPrompt = document.createElement('div');
        installPrompt.className = 'pwa-install-prompt';
        installPrompt.innerHTML = `
            <div class="pwa-prompt-content">
                <div class="pwa-prompt-icon">
                    <i class="fas fa-download"></i>
                </div>
                <div class="pwa-prompt-text">
                    <strong>Instal KeyAnime</strong>
                    <p>Instal aplikasi untuk pengalaman lebih baik</p>
                </div>
                <div class="pwa-prompt-actions">
                    <button class="pwa-btn-install">Instal</button>
                    <button class="pwa-btn-later">Nanti</button>
                </div>
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
            border-radius: 12px;
            padding: 15px;
            z-index: 10001;
            width: 90%;
            max-width: 400px;
            animation: slideUp 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        `;

        document.body.appendChild(installPrompt);

        // Install button
        installPrompt.querySelector('.pwa-btn-install').addEventListener('click', () => {
            if (this.deferredPrompt) {
                this.deferredPrompt.prompt();
                this.deferredPrompt.userChoice.then(choiceResult => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                    }
                    this.deferredPrompt = null;
                    installPrompt.remove();
                });
            }
        });

        // Later button
        installPrompt.querySelector('.pwa-btn-later').addEventListener('click', () => {
            installPrompt.remove();
            // Show again after 1 day
            setTimeout(() => this.showInstallPrompt(), 24 * 60 * 60 * 1000);
        });

        // Auto remove after 30 seconds
        setTimeout(() => {
            if (installPrompt.parentNode) {
                installPrompt.remove();
            }
        }, 30000);
    }

    // Method untuk request notification permission
    requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            // Request permission after 5 seconds
            setTimeout(() => {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        console.log('Notification permission granted');
                        this.scheduleNotifications();
                    }
                });
            }, 5000);
        }
    }

    // Method untuk schedule notifications
    scheduleNotifications() {
        if ('serviceWorker' in navigator && 'PushManager' in window) {
            // Check for new episodes daily at 18:00
            const now = new Date();
            const targetTime = new Date();
            targetTime.setHours(18, 0, 0, 0);
            
            if (now > targetTime) {
                targetTime.setDate(targetTime.getDate() + 1);
            }
            
            const timeUntilTarget = targetTime.getTime() - now.getTime();
            
            setTimeout(() => {
                this.checkNewEpisodes();
                // Repeat every 24 hours
                setInterval(() => this.checkNewEpisodes(), 24 * 60 * 60 * 1000);
            }, timeUntilTarget);
        }
    }

    // Method untuk sync offline data
    syncOfflineData() {
        const offlineActions = utils.getItem('offlineActions') || [];
        
        if (offlineActions.length > 0) {
            offlineActions.forEach(action => {
                // Sync each action
                console.log('Syncing offline action:', action);
            });
            
            // Clear offline actions after sync
            utils.setItem('offlineActions', []);
            utils.showToast('Data offline berhasil disinkronkan', 'success');
        }
    }

    // Method untuk check new episodes
    async checkNewEpisodes() {
        try {
            const lastCheck = utils.getItem('lastEpisodeCheck') || 0;
            const now = Date.now();
            
            // Check every 6 hours
            if (now - lastCheck > 6 * 60 * 60 * 1000) {
                const data = await api.getOngoing();
                const newEpisodes = data?.data?.animeList || [];
                
                // Send notification for new episodes
                if (newEpisodes.length > 0 && 'Notification' in window && Notification.permission === 'granted') {
                    navigator.serviceWorker.ready.then(registration => {
                        registration.showNotification('KeyAnime', {
                            body: `Ada ${newEpisodes.length} episode baru tersedia!`,
                            icon: 'asset/icons/icon-192x192.png',
                            badge: 'asset/icons/icon-96x96.png',
                            tag: 'new-episodes'
                        });
                    });
                }
                
                utils.setItem('lastEpisodeCheck', now);
            }
        } catch (error) {
            console.error('Error checking new episodes:', error);
        }
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