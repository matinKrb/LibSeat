// ۱. انتخاب المان‌های مورد نیاز
const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme');
const menuToggle = document.querySelector('.menu-toggle');
const hamburgerMenu = document.querySelector(".hamburger-menu");
const headerImg = document.querySelector(".header-content_image-img");
const items = document.querySelectorAll('.faq-item');
const backDrop = document.querySelector(".backDrop");
const faqBtn = document.querySelector("#faq-btn");
const contactBtn = document.querySelector("#contact-btn");
const aboutBtn = document.querySelector("#about-btn");
const mobileFaqBtn = document.querySelector("#mobile-faqBtn");
const mobileContactBtn = document.querySelector("#mobile-contactBtn");
const mobileAboutBtn = document.querySelector("#mobile-aboutBtn");







function updateThemeImage(theme) {
    if (!headerImg) return;

    headerImg.src = (theme === 'dark') ? "./main-page__pictures/main-page-banner-dark.png" : "./main-page__pictures/header-light.png";
}

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    hamburgerMenu.classList.toggle('hamburger-menu--active');
    backDrop.classList.toggle("backDrop--show");
});

// ۲. بررسی اینکه آیا قبلاً تمی در حافظه ذخیره شده است یا خیر
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeImage(currentTheme);

    // اگر تم ذخیره شده دارک بود، چک‌باکس را تیک بزن که دکمه هم در حالت دارک بماند
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

// ۳. عملکرد دکمه هنگام کلیک
function switchTheme(e) {
    if (e.target.checked) {
        // حالت تیره
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // ذخیره در حافظه
        updateThemeImage('dark');
    } else {
        // حالت روشن
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); // ذخیره در حافظه
        updateThemeImage('light');
    }    
}

// ۴. گوش دادن به تغییرات دکمه
toggleSwitch.addEventListener('change', switchTheme, false);


/* بخش FAQ */
items.forEach((item) => {
    item.addEventListener('toggle', () => {
        if (item.open) {
            items.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.open = false;
                }
            });
        }
    });
});


faqBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    
    document.getElementById("faq-section").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
});

contactBtn.addEventListener("click",(e)=>{
    e.preventDefault();

    document.getElementById("footer").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
})

aboutBtn.addEventListener("click",(e)=>{
    e.preventDefault();

    document.getElementById("footer").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
})

mobileFaqBtn.addEventListener("click",(e)=>{
    e.preventDefault();

    menuToggle.classList.remove('open');
    hamburgerMenu.classList.remove('hamburger-menu--active');
    backDrop.classList.remove("backDrop--show");

    document.getElementById("faq-section").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
})

mobileContactBtn.addEventListener("click",(e)=>{
    e.preventDefault();

    menuToggle.classList.remove('open');
    hamburgerMenu.classList.remove('hamburger-menu--active');
    backDrop.classList.remove("backDrop--show");

    document.getElementById("footer").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
})

mobileAboutBtn.addEventListener("click",(e)=>{
    e.preventDefault();

    menuToggle.classList.remove('open');
    hamburgerMenu.classList.remove('hamburger-menu--active');
    backDrop.classList.remove("backDrop--show");

    document.getElementById("footer").scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
})