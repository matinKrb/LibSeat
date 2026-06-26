const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme');
const img = document.querySelector(".img__img");
const image = document.querySelector(".footer__section2__image");
const svg = document.querySelector(".header__img-mobile");
const arrow = document.querySelector(".header__title-svg");

function updateThemeImage(theme){
    if(!img) return;

    if(theme === "light"){
        img.setAttribute("src","./signUp-page__pictures/file_0000000071e071f4b03b856362cd4bc5 1.png");
    }
    if(theme === "light"){
         image.setAttribute("src","./signUp-page__pictures/Frame 335 (1).png");
    }
    if(theme === "light"){
        svg.setAttribute("src","./signUp-page__pictures/arrow-left.png");
    }
    if(theme === "dark"){
        img.setAttribute("src","./signUp-page__pictures/Frame 368.png");
    }
    if(theme === "dark"){
        image.setAttribute("src","./signUp-page__pictures/Frame 335.png");
    }
    if(theme === "dark"){
        svg.setAttribute("src","./signUp-page__pictures/arrow-left (2).png");
    }
}

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeImage(currentTheme);

    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // ذخیره در حافظه
        updateThemeImage('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); // ذخیره در حافظه
        updateThemeImage('light');
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);