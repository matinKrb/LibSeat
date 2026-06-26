const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme');
const loginBanner = document.querySelector(".login-banner__img-img");
const adminRoleTab = document.querySelector("#admin-roleTab");
const studentRoleTab = document.querySelector("#student-roleTab");
const studentForm = document.querySelector(".login-form__student");
const adminForm = document.querySelector(".login-form__admin");
const passwordInputStudent = document.querySelector(".password-student");
const togglePasswordStudent = document.querySelector(".input-eye-student");
const passwordInputAdmin = document.querySelector(".password-admin");
const togglePasswordAdmin = document.querySelector(".input-eye-admin");



function updateThemeImage(theme) {
    if (!loginBanner) return;

    loginBanner.src = (theme === 'dark') ? "./Images/login-banner-dark.png" : "./Images/login-banner.jpg";
}


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



// پیاده سازی تغییر بین فرم ها و دکمه های اکتیو
adminRoleTab.addEventListener("click",(e)=>{
    e.preventDefault;
    studentRoleTab.classList.remove("role-tab__active");
    adminRoleTab.classList.add("role-tab__active");
    studentForm.classList.remove("login-form__active");
    adminForm.classList.add("login-form__active");

});

studentRoleTab.addEventListener("click",(e)=>{
    e.preventDefault;
    adminRoleTab.classList.remove("role-tab__active");
    studentRoleTab.classList.add("role-tab__active");
    adminForm.classList.remove("login-form__active");
    studentForm.classList.add("login-form__active");
});

//پیاده سازی قابلیت مشاهده پسورد


togglePasswordStudent.addEventListener("click",()=>{
    const type = (passwordInputStudent.getAttribute("type") === "password") ? "text" : "password";
    passwordInputStudent.setAttribute("type",type);
});

togglePasswordAdmin.addEventListener("click",()=>{
    const type = (passwordInputAdmin.getAttribute("type") === "password") ? "text" : "password";
    passwordInputAdmin.setAttribute("type",type);
});