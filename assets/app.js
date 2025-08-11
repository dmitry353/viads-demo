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
    }

    // Initialize language switcher
    function initializeLanguageSwitcher() {
        const languageSelect = document.querySelector('.language-switcher');
        
        if (!languageSelect) return;

        // Set current language based on URL
        const currentLang = getCurrentLanguage();
        languageSelect.value = currentLang;

        // Handle language change
        languageSelect.addEventListener('change', function(e) {
            const newLang = e.target.value;
            const currentFormat = getCurrentFormat();
            
            if (newLang && newLang !== currentLang) {
                const newUrl = `/${newLang}/${currentFormat}`;
                window.location.href = newUrl;
            }
        });
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

    // Call footer year update
    updateFooterYear();

})();
