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
                    mobileSearch.classList.remove('active');
                    
                    // Navigate to search page
                    router.navigateTo('/search', { q: query });
                    
                    // Clear input
                    searchInput.value = '';
                } else {
                    utils.showToast('Masukkan minimal 3 karakter', 'error');
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