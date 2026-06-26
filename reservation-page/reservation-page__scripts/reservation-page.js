const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme');
const menuToggle = document.querySelector('.menu-toggle');
const hamburgerMenu = document.querySelector(".hamburger-menu");
const filterStatusBtns = document.querySelectorAll(".fliterStatus-btn");
const filterTimeBtns = document.querySelectorAll(".fliterTime-btn");
const mobileFiltersBtn = document.querySelector(".mobileFilters-btn");
const mobileMenuCloseBtn = document.querySelector(".mobileFilters-menu__head-closeBtn");
const mobileMenuSubmitBtn = document.querySelector(".mobileFilters-menu__submitBtn");
const backDrop = document.querySelector(".backDrop");
const mobileFiltersMenu = document.querySelector(".mobileFilters-menu");





menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('open');
    hamburgerMenu.classList.toggle('hamburger-menu--active');
    backDrop.classList.toggle("backDrop--show");
    
});

// ۲. بررسی اینکه آیا قبلاً تمی در حافظه ذخیره شده است یا خیر
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

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
    } else {
        // حالت روشن
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); // ذخیره در حافظه
    }    
}

// ۴. گوش دادن به تغییرات دکمه
toggleSwitch.addEventListener('change', switchTheme, false);


//تنظیم حالت اکتیو برای دکمه های فیلتر بر اساس وضعیت
filterStatusBtns.forEach(filterStatusBtn => {
    filterStatusBtn.addEventListener("click",()=>{
        filterStatusBtns.forEach(statusBtn => {
            if(statusBtn.classList.contains("fliterStatus-btn--active")){
                statusBtn.classList.remove("fliterStatus-btn--active");
            }
        });
        filterStatusBtn.classList.add("fliterStatus-btn--active");
    });
});

//تنظیم حالت اکتیو برای دکمه های فیلتر بر اساس زمان
filterTimeBtns.forEach(filterTimeBtn => {
    filterTimeBtn.addEventListener("click",()=>{
        filterTimeBtns.forEach(timeBtn => {
            if(timeBtn.classList.contains("fliterTime-btn--active")){
                timeBtn.classList.remove("fliterTime-btn--active");
            }
        })
        filterTimeBtn.classList.add("fliterTime-btn--active");
    })
})



//پیاده سازی منوی فیلترها در تبلت و موبایل



mobileFiltersBtn.addEventListener("click",()=>{
    backDrop.classList.add("backDrop--show");
    mobileFiltersMenu.classList.add("mobileFilters-menu--show");
})

mobileMenuCloseBtn.addEventListener("click",()=>{
    mobileFiltersMenu.classList.remove("mobileFilters-menu--show");
    backDrop.classList.remove("backDrop--show");
})

mobileMenuSubmitBtn.addEventListener("click",()=>{
    mobileFiltersMenu.classList.remove("mobileFilters-menu--show");
    backDrop.classList.remove("backDrop--show");
})