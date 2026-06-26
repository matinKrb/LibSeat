// ========================================
// Theme Manager - LibSeat Forgot Password
// ========================================

const ThemeManager = (() => {
    // DOM Elements
    const toggleSwitch = document.querySelector('#checkbox');
    const bannerImage = document.querySelector('.banner__img img');
    
    // Constants
    const THEME_KEY = 'libseat-theme';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';
    
    // Image paths
    const THEME_IMAGES = {
        light: './Images/forgot-pass.jpg',
        dark: './Images/forgot-pass-dark.jpg'
    };

    /**
     * تغییر عکس بنر بر اساس تم
     */
    function updateBannerImage(theme) {
        if (!bannerImage) return;
        
        const imagePath = THEME_IMAGES[theme] || THEME_IMAGES.light;
        bannerImage.src = imagePath;
    }

    /**
     * اعمال تم به صفحه
     */
    function applyTheme(theme) {
        const isDark = theme === DARK_THEME;
        
        // تغییر کلاس body
        document.body.classList.toggle('dark-theme', isDark);
        
        // تنظیم وضعیت چک‌باکس
        if (toggleSwitch) {
            toggleSwitch.checked = isDark;
        }
        
        // تغییر عکس بنر
        updateBannerImage(theme);
    }

    /**
     * ذخیره تم در localStorage
     */
    function saveTheme(theme) {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (error) {
            console.warn('Unable to save theme preference:', error);
        }
    }

    /**
     * دریافت تم ذخیره شده
     */
    function getSavedTheme() {
        try {
            return localStorage.getItem(THEME_KEY);
        } catch (error) {
            console.warn('Unable to load theme preference:', error);
            return null;
        }
    }

    /**
     * دریافت تم پیش‌فرض سیستم
     */
    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return DARK_THEME;
        }
        return LIGHT_THEME;
    }

    /**
     * تغییر تم هنگام کلیک روی دکمه
     */
    function switchTheme(e) {
        const theme = e.target.checked ? DARK_THEME : LIGHT_THEME;
        applyTheme(theme);
        saveTheme(theme);
    }

    /**
     * همگام‌سازی تم بین تب‌های مختلف
     */
    function syncThemeAcrossTabs(e) {
        if (e.key === THEME_KEY && e.newValue) {
            applyTheme(e.newValue);
        }
    }

    /**
     * پاسخ به تغییرات تم سیستم
     */
    function handleSystemThemeChange(e) {
        // فقط اگر کاربر تم دستی انتخاب نکرده باشد
        if (!getSavedTheme()) {
            const theme = e.matches ? DARK_THEME : LIGHT_THEME;
            applyTheme(theme);
        }
    }

    /**
     * راه‌اندازی اولیه
     */
    function init() {
        if (!toggleSwitch) {
            console.warn('Theme toggle switch not found');
            return;
        }

        // دریافت تم (ذخیره شده یا پیش‌فرض سیستم)
        const savedTheme = getSavedTheme();
        const initialTheme = savedTheme || getSystemTheme();
        
        // اعمال تم اولیه
        applyTheme(initialTheme);

        // افزودن event listener به دکمه تغییر تم
        toggleSwitch.addEventListener('change', switchTheme);

        // همگام‌سازی بین تب‌ها
        window.addEventListener('storage', syncThemeAcrossTabs);

        // گوش دادن به تغییرات تم سیستم
        if (window.matchMedia) {
            const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // برای مرورگرهای قدیمی‌تر
            if (systemThemeQuery.addListener) {
                systemThemeQuery.addListener(handleSystemThemeChange);
            } else {
                // روش جدید
                systemThemeQuery.addEventListener('change', handleSystemThemeChange);
            }
        }

        console.log('✅ Theme Manager initialized');
    }

    // Public API
    return {
        init,
        applyTheme,
        getCurrentTheme: () => document.body.classList.contains('dark-theme') ? DARK_THEME : LIGHT_THEME
    };
})();

// ========================================
// Initialize on DOM Ready
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
});
