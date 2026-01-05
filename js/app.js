// Main Application
class KeyAnimeApp {
    constructor() {
        this.init();
    }

    init() {
        // Initialize router
        Router.init();
        
        // Initialize theme
        Utils.initTheme();
        
        // Handle offline/online status
        window.addEventListener('online', () => {
            Utils.showToast('Koneksi internet kembali', 'success');
        });
        
        window.addEventListener('offline', () => {
            Utils.showToast('Anda sedang offline', 'error');
        });
        
        // Handle service worker for PWA
        this.registerServiceWorker();
        
        // Handle install prompt
        this.handleInstallPrompt();
        
        // Handle visibility change
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('App minimized');
            } else {
                console.log('App active');
            }
        });
        
        // Add global error handler
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
        });
        
        // Log app start
        console.log('KeyAnime v2.0 Mobile initialized');
    }

    // Register service worker for PWA
    async registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('ServiceWorker registered:', registration);
            } catch (error) {
                console.error('ServiceWorker registration failed:', error);
            }
        }
    }

    // Handle PWA install prompt
    handleInstallPrompt() {
        let deferredPrompt;
        
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later
            deferredPrompt = e;
            
            // Show install button (optional)
            this.showInstallButton();
        });
        
        window.addEventListener('appinstalled', () => {
            console.log('PWA installed');
            deferredPrompt = null;
        });
    }

    // Show install button (optional)
    showInstallButton() {
        // You can add an install button to your UI here
        // Example: 
        // const installButton = document.createElement('button');
        // installButton.textContent = 'Install App';
        // installButton.addEventListener('click', () => this.installApp());
        // document.body.appendChild(installButton);
    }

    // Install app
    installApp(deferredPrompt) {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted install');
                } else {
                    console.log('User dismissed install');
                }
                deferredPrompt = null;
            });
        }
    }

    // Check for updates
    checkForUpdates() {
        // You can implement update checking logic here
        // For example, check version from server
        const currentVersion = '2.0';
        // Fetch latest version from server and compare
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading overlay after 1.5 seconds
    setTimeout(() => {
        Utils.hideLoading();
    }, 1500);
    
    // Start the app
    window.app = new KeyAnimeApp();
});

// Make functions globally available
window.Components = Components;
window.Utils = Utils;
window.Router = Router;
window.API = API;