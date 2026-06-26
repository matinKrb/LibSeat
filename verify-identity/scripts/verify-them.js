// ========================================
// LibSeat Verify Identity Manager
// ========================================

const VerifyIdentityManager = (() => {

    // ==================== DOM Elements ====================

    const toggleSwitch = document.querySelector('#checkbox');
    const bannerImage = document.querySelector('.banner__img img');

    const passwordToggles = document.querySelectorAll('.input-eye');

    const verificationInputs = document.querySelectorAll(
        '.verification-code__input'
    );

    const resendBtn = document.getElementById('resendBtn');
    const timerElement = document.getElementById('timer');

    // ==================== Constants ====================

    const THEME_KEY = 'libseat-theme';
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';

    const THEME_IMAGES = {
        light: './Images/verify-identity.jpg',
        dark: './Images/verify-identity-dark.jpg'
    };

    // ==================== Theme ====================

    function updateBannerImage(theme) {

        if (!bannerImage) return;

        bannerImage.src =
            THEME_IMAGES[theme] ||
            THEME_IMAGES.light;
    }

    function applyTheme(theme) {

        const isDark = theme === DARK_THEME;

        document.body.classList.toggle(
            'dark-theme',
            isDark
        );

        if (toggleSwitch) {
            toggleSwitch.checked = isDark;
        }

        updateBannerImage(theme);
    }

    function saveTheme(theme) {
        localStorage.setItem(
            THEME_KEY,
            theme
        );
    }

    function getSavedTheme() {
        return localStorage.getItem(
            THEME_KEY
        );
    }

    function getSystemTheme() {

        return window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches
            ? DARK_THEME
            : LIGHT_THEME;
    }

    function switchTheme(e) {

        const theme = e.target.checked
            ? DARK_THEME
            : LIGHT_THEME;

        applyTheme(theme);
        saveTheme(theme);
    }

    function syncThemeAcrossTabs(e) {

        if (
            e.key === THEME_KEY &&
            e.newValue
        ) {
            applyTheme(e.newValue);
        }
    }

    function handleSystemThemeChange(e) {

        if (!getSavedTheme()) {

            applyTheme(
                e.matches
                    ? DARK_THEME
                    : LIGHT_THEME
            );
        }
    }

    function initTheme() {

        const savedTheme =
            getSavedTheme();

        const initialTheme =
            savedTheme ||
            getSystemTheme();

        applyTheme(initialTheme);

        if (toggleSwitch) {
            toggleSwitch.addEventListener(
                'change',
                switchTheme
            );
        }

        window.addEventListener(
            'storage',
            syncThemeAcrossTabs
        );

        const mediaQuery =
            window.matchMedia(
                '(prefers-color-scheme: dark)'
            );

        if (mediaQuery.addEventListener) {

            mediaQuery.addEventListener(
                'change',
                handleSystemThemeChange
            );

        } else {

            mediaQuery.addListener(
                handleSystemThemeChange
            );
        }
    }

    // ==================== Password Toggle ====================

    function togglePasswordVisibility(button) {

        const wrapper =
            button.closest(
                '.form-input-wrapper'
            );

        const input =
            wrapper.querySelector(
                'input'
            );

        if (!input) return;

        const isPassword =
            input.type === 'password';

        input.type =
            isPassword
                ? 'text'
                : 'password';

        button.classList.toggle(
            'is-visible'
        );

        button.setAttribute(
            'aria-label',
            isPassword
                ? 'مخفی کردن رمز عبور'
                : 'نمایش رمز عبور'
        );
    }

    function initPasswordToggles() {

        passwordToggles.forEach(
            button => {

                button.addEventListener(
                    'click',
                    e => {

                        e.preventDefault();

                        togglePasswordVisibility(
                            button
                        );
                    }
                );
            }
        );
    }

    // ==================== OTP ====================

    function handleOTPInput(e) {

        const input = e.target;

        input.value =
            input.value.replace(
                /\D/g,
                ''
            );

        if (input.value.length === 1) {

            input.classList.add(
                'filled'
            );

            const nextInput =
                document.querySelector(
                    `[data-index="${
                        Number(
                            input.dataset.index
                        ) + 1
                    }"]`
                );

            if (nextInput) {
                nextInput.focus();
            }
        }
    }

    function handleOTPKeydown(e) {

        const input = e.target;

        if (
            e.key === 'Backspace' &&
            !input.value
        ) {

            const prevInput =
                document.querySelector(
                    `[data-index="${
                        Number(
                            input.dataset.index
                        ) - 1
                    }"]`
                );

            if (prevInput) {

                prevInput.focus();

                prevInput.value = '';

                prevInput.classList.remove(
                    'filled'
                );
            }
        }

        if (
            e.key === 'Backspace' &&
            input.value
        ) {
            input.classList.remove(
                'filled'
            );
        }
    }

    function handleOTPPaste(e) {

        e.preventDefault();

        const pastedData =
            e.clipboardData.getData(
                'text'
            );

        const digits =
            pastedData
                .replace(/\D/g, '')
                .slice(0, 6)
                .split('');

        verificationInputs.forEach(
            (input, index) => {

                input.value =
                    digits[index] || '';

                if (digits[index]) {

                    input.classList.add(
                        'filled'
                    );

                } else {

                    input.classList.remove(
                        'filled'
                    );
                }
            }
        );

        if (digits.length) {

            verificationInputs[
                digits.length - 1
            ].focus();
        }
    }

    function initOTPInputs() {

        verificationInputs.forEach(
            input => {

                input.addEventListener(
                    'input',
                    handleOTPInput
                );

                input.addEventListener(
                    'keydown',
                    handleOTPKeydown
                );

                input.addEventListener(
                    'paste',
                    handleOTPPaste
                );
            }
        );

        if (
            verificationInputs.length
        ) {
            verificationInputs[0].focus();
        }
    }

    // ==================== Resend Timer ====================

    let countdownInterval;
    let countdownSeconds = 56;

    function formatTime(seconds) {

        const min = Math.floor(
            seconds / 60
        );

        const sec =
            seconds % 60;

        return `(${min}:${sec
            .toString()
            .padStart(2, '0')})`;
    }

    function startCountdown() {

        if (
            !resendBtn ||
            !timerElement
        )
            return;

        clearInterval(
            countdownInterval
        );

        resendBtn.disabled = true;

        countdownSeconds = 56;

        timerElement.textContent =
            formatTime(
                countdownSeconds
            );

        countdownInterval =
            setInterval(() => {

                countdownSeconds--;

                timerElement.textContent =
                    formatTime(
                        countdownSeconds
                    );

                if (
                    countdownSeconds <= 0
                ) {

                    clearInterval(
                        countdownInterval
                    );

                    resendBtn.disabled = false;

                    timerElement.textContent =
                        '';
                }

            }, 1000);
    }

    function handleResendCode() {

        console.log(
            'OTP resent'
        );

        // TODO:
        // فراخوانی API ارسال مجدد کد

        startCountdown();
    }

    function initResendTimer() {

        if (
            !resendBtn ||
            !timerElement
        )
            return;

        resendBtn.addEventListener(
            'click',
            handleResendCode
        );

        startCountdown();
    }

    // ==================== Init ====================

    function init() {

        initTheme();

        initPasswordToggles();

        initOTPInputs();

        initResendTimer();

        console.log(
            '✅ Verify Identity Manager initialized'
        );
    }

    return {
        init,
        applyTheme
    };

})();

// ========================================
// DOM Ready
// ========================================

document.addEventListener(
    'DOMContentLoaded',
    () => {
        VerifyIdentityManager.init();
    }
);