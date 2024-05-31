// URL API
const GET_ALL_PRODUCTS = 'http://127.0.0.1:8000/api/user/products';

/******************/
const urlString = new URL(window.location.href);
const urlParams = urlString.searchParams;
const productCat = urlParams.get('category');
/******************/

// USER SIGNIN OR NOT
const status = JSON.parse(localStorage.getItem('sign_done'));

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
            <li class="arabic"><a href="./products_arabic.html"><img src="./images/language-icon/egypt.png">
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
                <a class="nav-link active" aria-current="page" href="./products.html">Products</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./contact.html">Contact Us</a>
            </li>
        </ul>
        <div class="btn-group mb-3 bigNone" role="group">
            <button type="button" class="language dropdown-toggle" data-bs-toggle="dropdown"
                aria-expanded="false">
                <img src="./images/language-icon/united-states-of-america.png"> EN
            </button>
            <ul class="dropdown-menu">
                <li class="arabic"><a href="./products_arabic.html"><img src="./images/language-icon/egypt.png">
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
`;
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
            <li class="arabic"><a href="./products_arabic.html"><img src="./images/language-icon/egypt.png">
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
                <a class="nav-link active" aria-current="page" href="./products.html">Products</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./contact.html">Contact Us</a>
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
                <li class="arabic"><a href="./products_arabic.html"><img src="./images/language-icon/egypt.png">
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
`;

if (status !== true) {
  document.getElementById('nav').innerHTML = header1;
} else {
  document.getElementById('nav').innerHTML = header2;
}

// Get Elements
let categories = document.getElementById('categories');
let boxesProducts = document.getElementById('boxes');
let iconSearch = document.getElementById('iconSearch');

// Get Products For Count
let products = JSON.parse(localStorage.getItem('products'));

//Define Count
document.getElementById('count').innerHTML =
  products === null ? 0 : products.length;

// Call Date
fetch(GET_ALL_PRODUCTS)
  .then((result) => result.json())
  .then((dataApi) => {
    dataAll = dataApi.data;
    showCategories(dataAll);

    let isCatExist = false;
    if (productCat) {
      if (
        dataAll.filter((product) => product.category_name === productCat)
          .length > 0
      ) {
        isCatExist = true;
      }
    }

    if (isCatExist) {
      newData = dataAll.filter(
        (product) => product.category_name === productCat
      );
      showProducts(newData);
    } else {
      showProducts(dataAll);
    }

    document.getElementById('apply').addEventListener('click', () => {
      choose.length === 0
        ? showProducts(dataAll)
        : showProducts(dataAll, choose);
    });

    document.getElementById('search').addEventListener('input', (e) => {
      searchProduct(dataAll, e.target.value);
    });

    iconSearch.addEventListener('click', (e) => {
      search.value = '';
      showProducts(dataAll);
    });
  });

let choose = [];

// Show Categories
function showCategories(data) {
  // Create Div
  data.forEach((element, index) => {
    let div = document.createElement('div');
    div.setAttribute('class', 'form-check');
    div.setAttribute('category_id', element.category_id);
    div.innerHTML = `
        <input class="form-check-input" type="checkbox" value=${element.category_name} id=${index}>
        <label class="form-check-label" for=${index}>
        ${element.category_name}
        </label> 
        `;
    categories.appendChild(div);
  });

  let checkInput = document.querySelectorAll('input[type="checkbox"]');

  checkInput.forEach((element) => {
    element.addEventListener('change', (e) => {
      if (choose.length === 0) {
        choose.push(e.target.value);
      } else {
        var check = choose.filter((ele) => ele !== e.target.value);
        choose.length === check.length
          ? choose.push(e.target.value)
          : (choose = check);
      }
    });
  });
}

// Show Products
function showProducts(data, choose = '') {
  boxesProducts.innerHTML = '';
  // Add Product In Dom
  data.forEach((product, index) => {
    if (choose === '') {
      addProduct(product);
    } else {
      choose.forEach((target) => {
        if (product.category_name === target) {
          addProduct(product);
        }
      });
    }
  });
}

// Add Product
function addProduct(product) {
  product.products.forEach((element) => {
    // create div
    let div = document.createElement('div');
    // Add class
    div.setAttribute('class', 'col-lg-5 mb-3');
    div.setAttribute('data-id', element.product_id);
    div.innerHTML = `
                <div class="box" data-product="box" data-category=${element.category_id} data-productId=${element.product_id}>
                    <div class="overflow-hidden">
                        <div class="image overflow-hidden" id="card" data-id="${element.id}">
                            <img src=${element.images[0]} class="card-img-top">
                        </div>
                        <div class="card-body">
                            <div class="title mb-2">
                                <h5>${element.product_name}</h5>
                            </div>
                            <div class="buttons">
                                <p class="price d-flex"><span class="me-1">EGP</span><span>${element.discount[0]}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                `;
    boxesProducts.appendChild(div);

    // Storage [category_id , product_id ] In LocalStorage untill Call product Details
    let allBoxes = document.querySelectorAll('[data-product="box"]');
    allBoxes.forEach((element) => {
      element.addEventListener('click', (e) => {
        let category_id = element.getAttribute('data-category');
        let product_id = element.getAttribute('data-productId');
        // Set Data From Local Storage
        localStorage.setItem(
          'productDetails',
          JSON.stringify({ category_id: category_id, product_id: product_id })
        );
        // Go To Location Product Details
        location.href = `product.html?id=${product_id}`;
      });
    });
  });
}

// Search Product
function searchProduct(dataAll, value) {
  boxesProducts.innerHTML = '';
  if (value === '') {
    showProducts(dataAll);
  } else {
    dataAll.forEach((product, index) => {
      product.products.forEach((element) => {
        if (element.product_name.toUpperCase().includes(value.toUpperCase())) {
          // create div
          let div = document.createElement('div');
          // Add class
          div.setAttribute('class', 'col-lg-5 mb-3');
          div.setAttribute('data-id', element.product_id);
          div.innerHTML = `
                            <div class="box" data-product="box" data-category=${element.category_id} data-productId=${element.product_id}>
                                <div class="overflow-hidden">
                                    <div class="image overflow-hidden" id="card" data-id="${element.id}">
                                        <img src=${element.images[0]} class="card-img-top">
                                    </div>
                                    <div class="card-body">
                                        <div class="title mb-2">
                                            <h5>${element.product_name}</h5>
                                        </div>
                                        <div class="buttons">
                                            <p class="price d-flex"><span class="me-1">EGP</span><span>${element.discount[0]}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `;
          boxesProducts.appendChild(div);
        }
      });
    });
  }
}
