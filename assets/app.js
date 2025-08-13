// Viads Demo - Application JavaScript

(function() {
    'use strict';

    // Language configuration
    const languages = {
        en: 'English',
        es: 'Español',
        pt: 'Português',
        tr: 'Türkçe'
    };

    // Format configuration
    const formats = {
        'in-page': 'in-page',
        'slider': 'slider',
        'floating': 'floating',
        'banner': 'banner'
    };

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initializeNavigation();
        initializeLanguageSwitcher();
        highlightActiveFormat();
        
        // Debug logging if enabled
        if (window.VIADS_DEBUG === true) {
            logViadsSlotInfo();
        }
    });

    // Initialize navigation functionality
    function initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Let default navigation happen for standard links
                // The active state will be updated on page load
            });
        });
        
        // Initialize mobile dropdown menu
        initializeMobileDropdown();
    }

    // Initialize language switcher
    function initializeLanguageSwitcher() {
        const languageSelect = document.querySelector('.language-switcher');
        
        if (!languageSelect) return;

        // Set current language based on URL
        const currentLang = getCurrentLanguage();
        languageSelect.value = currentLang;

        // Handle language change for both desktop and mobile
        const events = ['change', 'input', 'touchend'];
        
        events.forEach(eventType => {
            languageSelect.addEventListener(eventType, function(e) {
                const newLang = e.target.value;
                const currentFormat = getCurrentFormat();
                
                if (newLang && newLang !== currentLang) {
                    const newUrl = `/${newLang}/${currentFormat}`;
                    window.location.href = newUrl;
                }
            });
        });

        // Additional mobile support - handle click events
        languageSelect.addEventListener('click', function(e) {
            // Prevent default to avoid conflicts
            e.preventDefault();
            // Focus the select to open options
            this.focus();
        });

        // Handle touch events for mobile
        languageSelect.addEventListener('touchstart', function(e) {
            // Ensure the select is interactive on mobile
            this.style.webkitAppearance = 'none';
            this.style.appearance = 'none';
        });

        // Mobile-specific handling
        if ('ontouchstart' in window) {
            // This is a touch device
            languageSelect.addEventListener('touchend', function(e) {
                // Force the select to open on mobile
                setTimeout(() => {
                    this.focus();
                }, 100);
            });
        }

        // Fallback for mobile devices that don't trigger change events properly
        let lastValue = currentLang;
        setInterval(() => {
            if (languageSelect.value !== lastValue) {
                const newLang = languageSelect.value;
                const currentFormat = getCurrentFormat();
                
                if (newLang && newLang !== lastValue) {
                    lastValue = newLang;
                    const newUrl = `/${newLang}/${currentFormat}`;
                    window.location.href = newUrl;
                }
            }
        }, 500);
    }

    // Highlight active format in navigation
    function highlightActiveFormat() {
        const currentFormat = getCurrentFormat();
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(`/${currentFormat}`)) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    // Get current language from URL
    function getCurrentLanguage() {
        const pathSegments = window.location.pathname.split('/').filter(Boolean);
        return pathSegments[0] || 'en';
    }

    // Get current format from URL
    function getCurrentFormat() {
        const pathSegments = window.location.pathname.split('/').filter(Boolean);
        return pathSegments[1] || 'in-page';
    }

    // Debug logging for Viads slot information
    function logViadsSlotInfo() {
        const viadsSlot = document.getElementById('viads-slot');
        
        if (viadsSlot) {
            console.log('Viads Demo: Found #viads-slot element');
            console.log('Data attributes:', {
                format: viadsSlot.getAttribute('data-viads-format'),
                lang: viadsSlot.getAttribute('data-viads-lang'),
                site: viadsSlot.getAttribute('data-viads-site'),
                page: viadsSlot.getAttribute('data-viads-page'),
                position: viadsSlot.getAttribute('data-viads-position')
            });
        } else {
            console.warn('Viads Demo: #viads-slot element not found');
        }

        // Check for secondary slot if on banner page
        const secondarySlot = document.getElementById('viads-slot-secondary');
        if (secondarySlot) {
            console.log('Viads Demo: Found #viads-slot-secondary element');
            console.log('Secondary slot data attributes:', {
                format: secondarySlot.getAttribute('data-viads-format'),
                lang: secondarySlot.getAttribute('data-viads-lang'),
                site: secondarySlot.getAttribute('data-viads-site'),
                page: secondarySlot.getAttribute('data-viads-page'),
                position: secondarySlot.getAttribute('data-viads-position')
            });
        }
    }

    // Utility function to get localized text
    function getLocalizedText(key, lang) {
        const translations = {
            en: {
                'privacy': 'Privacy',
                'terms': 'Terms',
                'copyright': '© Viads'
            },
            es: {
                'privacy': 'Privacidad',
                'terms': 'Términos',
                'copyright': '© Viads'
            },
            pt: {
                'privacy': 'Privacidade',
                'terms': 'Termos',
                'copyright': '© Viads'
            },
            tr: {
                'privacy': 'Gizlilik',
                'terms': 'Şartlar',
                'copyright': '© Viads'
            }
        };
        
        return translations[lang]?.[key] || translations.en[key] || key;
    }

    // Update footer with current year
    function updateFooterYear() {
        const yearElement = document.querySelector('.footer-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // Initialize mobile dropdown menu
    function initializeMobileDropdown() {
        const mobileDropdown = document.querySelector('.mobile-dropdown');
        console.log('Mobile dropdown element:', mobileDropdown); // Debug log
        
        if (!mobileDropdown) {
            console.warn('Mobile dropdown element not found!'); // Debug log
            return;
        }
        
        const toggle = mobileDropdown.querySelector('.mobile-dropdown-toggle');
        const menu = mobileDropdown.querySelector('.mobile-dropdown-menu');
        
        console.log('Toggle button:', toggle); // Debug log
        console.log('Menu:', menu); // Debug log
        
        if (!toggle || !menu) {
            console.warn('Toggle button or menu not found!'); // Debug log
            return;
        }
        
        console.log('Mobile dropdown initialized successfully'); // Debug log
        
        // Toggle dropdown on click
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = mobileDropdown.classList.contains('active');
            console.log('Toggle clicked, current state:', isActive); // Debug log
            
            if (isActive) {
                mobileDropdown.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            } else {
                mobileDropdown.classList.add('active');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileDropdown.contains(e.target)) {
                mobileDropdown.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Close dropdown on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                mobileDropdown.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
        
        // Highlight active format in mobile dropdown
        highlightActiveFormatInMobileDropdown();
    }
    
    // Highlight active format in mobile dropdown
    function highlightActiveFormatInMobileDropdown() {
        const currentFormat = getCurrentFormat();
        const mobileDropdownItems = document.querySelectorAll('.mobile-dropdown-item');
        
        mobileDropdownItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href && href.includes(`/${currentFormat}`)) {
                item.setAttribute('aria-current', 'page');
            } else {
                item.removeAttribute('aria-current');
            }
        });
    }

    // Call footer year update
    updateFooterYear();

})();
