// URL API
const SEND_MESSAGE = 'http://127.0.0.1:8000/api/user/Contact_Us';

// USER SIGNIN OR NOT
const status = JSON.parse(localStorage.getItem("sign_done"));

// IN CASE NOT SIGN
const header1 = `
<div class="container">
    <div class="logo">
        <a href="./index.html">
            <img src="./images/logo/logo.png" alt="">
        </a>
    </div>
    <div class="btn-group mb-3 smallNone" role="group">
        <button type="button" class="language dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="./images/language-icon/united-states-of-america.png"> EN
        </button>
        <ul class="dropdown-menu">
            <li class="arabic"><a href="./homeArabic.html"><img src="./images/language-icon/egypt.png">
                    AR</a> </li>
            <li> <a href="./index.html"><img src="./images/language-icon/united-states-of-america.png">
                    EN</a> </li>
        </ul>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 ">
            <li class="nav-item">
                <a class="nav-link " aria-current="page" href="./index.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link " aria-current="page" href="./products.html">Products</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="./contact.html">Contact Us</a>
            </li>
        </ul>
        <div class="btn-group mb-3 bigNone" role="group">
            <button type="button" class="language dropdown-toggle" data-bs-toggle="dropdown"
                aria-expanded="false">
                <img src="./images/language-icon/united-states-of-america.png"> EN
            </button>
            <ul class="dropdown-menu">
                <li class="arabic"><a href="./contact_arabic.html"><img src="./images/language-icon/egypt.png">
                        AR</a> </li>
                <li> <a href="./index.html"><img src="./images/language-icon/united-states-of-america.png">
                        EN</a> </li>
            </ul>
        </div>
        <a href="./cart.html" class="icon" id="cartIcon">
            <span class="count" id="count">0</span>
            <i class="fa-solid fa-cart-plus"></i>
        </a>
        <a href="./signup.html" class="signup">Sign Up</a>
    </div>
</div>
`
// IN CASE  SIGN
const header2 = `
<div class="container">
    <div class="logo">
        <a href="./products.html">
            <img src="./images/logo/logo.png" alt="">
        </a>
    </div>
    <div class="btn-group mb-3 smallNone" role="group">
        <button type="button" class="language dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="./images/language-icon/united-states-of-america.png"> EN
        </button>
        <ul class="dropdown-menu">
            <li class="arabic"><a href="./homeArabic.html"><img src="./images/language-icon/egypt.png">
                    AR</a> </li>
            <li> <a href="./index.html"><img src="./images/language-icon/united-states-of-america.png">
                    EN</a> </li>
        </ul>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0 ">
            <li class="nav-item">
                <a class="nav-link " aria-current="page" href="./index.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="./products.html">Products</a>
            </li>
            <li class="nav-item">
                <a class="nav-link active" href="./contact.html">Contact Us</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./profileUser.html">My Account</a>
            </li>
        </ul>
        <div class="btn-group mb-3 bigNone" role="group">
            <button type="button" class="language dropdown-toggle" data-bs-toggle="dropdown"
                aria-expanded="false">
                <img src="./images/language-icon/united-states-of-america.png"> EN
            </button>
            <ul class="dropdown-menu">
                <li class="arabic"><a href="./contact_arabic.html"><img src="./images/language-icon/egypt.png">
                        AR</a> </li>
                <li> <a href="./index.html"><img src="./images/language-icon/united-states-of-america.png">
                        EN</a> </li>
            </ul>
        </div>
        <a href="./cart.html" class="icon" id="cartIcon">
            <span class="count" id="count">0</span>
            <i class="fa-solid fa-cart-plus"></i>
        </a>
    </div>
</div>
`

if (status !== true) {
    document.getElementById('nav').innerHTML = header1;
} else {
    document.getElementById('nav').innerHTML = header2;
}



// Get Products For Count 
let products = JSON.parse(localStorage.getItem("products"));

//Define Count 
document.getElementById("count").innerHTML = products === null ? 0 : products.length;

// GET Elements
let email = document.getElementById("email"),
    phone = document.getElementById("phone"),
    message = document.getElementById("message"),
    name = document.getElementById("name");


// SEND MESSAGE
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name.value);
    formData.append('email', email.value);
    formData.append('phone', phone.value);
    formData.append('message', message.value);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', SEND_MESSAGE, true);
    xhr.send(formData);
    swal("Your message has been sent", "You will be answered as soon as possible", "success");
    name.value = ''
    email.value = ''
    phone.value = ''
    message.value = ''
});
