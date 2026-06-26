const toggleSwitch = document.querySelector('#checkbox');
const currentTheme = localStorage.getItem('theme');
const img = document.querySelector('.left__body-section_img');
const passwordInput = document.querySelector("#input_password input");
const confrimPassInput = document.querySelector("#input_confrimPassword input");
const passEye = document.querySelector("#input_password .see__password");
const confrimPassEye = document.querySelector("#input_confrimPassword .see__password");


function updateThemeImage(theme){
    const src = (theme === "dark") ?"./signUp-page-student__pictures/left-page-dark.jpg" :"./signUp-page-student__pictures/left-page.jpg";
    img.setAttribute("src",src);
}

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeImage(currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
    if(currentTheme === 'dark'){
        
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // ذخیره در حافظه
        updateThemeImage("dark");

    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); // ذخیره در حافظه
        updateThemeImage("light");
    }    
}

toggleSwitch.addEventListener('change', switchTheme, false);

passEye.addEventListener("click",(e)=>{
    e.preventDefault;
   const type = (passwordInput.getAttribute("type") === "password") ? "text" : "password";
   passwordInput.setAttribute("type",type);
})

confrimPassEye.addEventListener("click",(e)=>{
    e.preventDefault;
   const type = (confrimPassInput.getAttribute("type") === "password") ? "text" : "password";
   confrimPassInput.setAttribute("type",type);
})