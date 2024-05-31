// URL API
const GET_ALL_OFFERS = 'http://127.0.0.1:8000/api/admin/all_offers';

const checkOutButton = document.getElementById('checkOut');
const footerTable = document.querySelectorAll('.tablefooternone');
const nameI = document.getElementById('nameInput');
const phone = document.getElementById('phoneInput');
const email = document.getElementById('emailInput');
const address = document.getElementById('addressInput');
const governorates = document.getElementById('selectedGon');
const jwtToken = sessionStorage.getItem('jwtToken');

let promoCode = 0;

// Storage Data
let listItems = getDataLocal();

// Get Data From Local Storage
function getDataLocal() {
  const products = JSON.parse(localStorage.getItem('products'));
  return products === null ? [] : products;
}

// Set Data In local Storage
function setDataLocal(products) {
  localStorage.setItem('products', JSON.stringify(products));
}

// Set user data order In local Storage
function setUserDataLocal(userData) {
  localStorage.setItem('userDataOrder', JSON.stringify(userData));
}

// Create All Products
function CreateProducts() {
  listItems.forEach((product) => createProduct(product));
}

// Create Product
function createProduct(product) {
  let body = document.getElementById('body-table');
  // Create Element tr
  let tr = document.createElement('tr');
  // Add Attributes [Id]
  tr.setAttribute('id', product.id);
  tr.setAttribute('class', 'mb-3');
  // Content Element
  tr.innerHTML = `
    <td>${product.title}, ${product.size}  ${
    product.color === 'none' ? '' : ',color: ' + product.color
  }</td>
    <td><input type="number" id="${
      product.id
    }" class="quantityNew" min="1" value="${product.quantity}"></td>
    <td class="priceproduct none" id="priceproduct">${product.discount}</td>
    <td><button id="${product.id}" class="remove">X</button></td>
`;
  body.appendChild(tr);
  let footerTable = document.querySelectorAll('.footerNone');

  let quantityNew = document.querySelectorAll('.quantityNew');
  quantityNew.forEach((numberNew) => {
    numberNew.addEventListener('change', (e) => {
      listItems.forEach((element) => {
        if (element.id === +e.target.getAttribute('id')) {
          element.quantity = +e.target.value;
        }
      });
      setDataLocal(listItems);
      let total = listItems
        .map((e) => +e.quantity * +e.discount)
        .reduce((acc, ele) => acc + ele);
      let totalPrice = document.getElementById('subtotal');
      totalPrice.innerHTML = 'EGP ' + total;
      document.getElementById('totalPrice').innerHTML =
        'EGP ' + ((total + 60 - (total + 60) * (promoCode / 100)) > 1000 ? (total + 60 - (total + 60) * (promoCode / 100))  - 5 : (total + 60 - (total + 60) * (promoCode / 100)));
    });
  });

  // In Case Delete Element
  let remove = document.querySelectorAll('.remove');
  remove.forEach((item) => {
    item.addEventListener('click', () => {
      listItems = listItems.filter(
        (element) => element.id !== +item.getAttribute('id')
      );
      [...body.children].forEach((element) => {
        if (+element.getAttribute('id') === +item.getAttribute('id')) {
          element.remove();
        }
      });
      setDataLocal(listItems);
      let totalPrice = document.getElementById('subtotal');
      if (listItems.length === 0) {
        totalPrice.innerHTML = 'EGP ' + '0';
        footerTable.forEach((e) => e.classList.add('tablefooternone'));
        checkOutButton.classList.add('checkNone');
      } else {
        let total = listItems
          .map((e) => +e.quantity * +e.discount)
          .reduce((acc, ele) => acc + ele);
        totalPrice.innerHTML = 'EGP ' + total;
        document.getElementById('totalPrice').innerHTML =
          'EGP ' + ((total + 60 - (total + 60) * (promoCode / 100)) > 1000 ? (total + 60 - (total + 60) * (promoCode / 100))  - 5 : (total + 60 - (total + 60) * (promoCode / 100)));
        checkOutButton.classList.remove('checkNone');
      }
    });
  });
}

CreateProducts();

let totalPrice = document.getElementById('subtotal');
let total = listItems.map((e) => +e.quantity * +e.discount);
total = total.length === 0 ? 0 : total.reduce((acc, ele) => acc + ele);
if (total > 0) {
  footerTable.forEach((e) => e.classList.remove('tablefooternone'));
  checkOutButton.classList.remove('checkNone');
  document.getElementById('totalPrice').innerHTML =
    'EGP ' + ((total + 60 - (total + 60) * (promoCode / 100)) > 1000 ? (total + 60 - (total + 60) * (promoCode / 100))  - 5 : (total + 60 - (total + 60) * (promoCode / 100)));
} else {
  checkOutButton.classList.add('checkNone');
  footerTable.forEach((e) => e.classList.add('tablefooternone'));
}

  totalPrice.innerHTML = 'EGP ' + total;

/*********************************** Handle Promocode ***********************************/
const promocode = document.getElementById('inputPassword2');
const applyPromocode = document.getElementById('apply-promo');
const promoMsg = document.querySelector('.promo');

applyPromocode.addEventListener('click', handlePromo);

function handlePromo() {
  promoValue = promocode.value;
  applyPromocode.disabled = false;

  if (listItems.length == 0) {
    applyPromocode.disabled = true;
    return;
  }

  if (promoValue === '') {
    return;
  } else {
    fetch(GET_ALL_OFFERS)
      .then((result) => result.json())
      .then((data) => {
        let check = 0;
        data.data.forEach((element) => {
          if (element.promocode === promoValue) {
            if (Date.now() < new Date(element.expired_at) - 0) {
              promoCode = +element.discount;
              promoMsg.innerHTML = '';
              document.getElementById('totalPrice').innerHTML =
                'EGP ' + ((total + 60 - (total + 60) * (promoCode / 100)) > 1000 ? (total + 60 - (total + 60) * (promoCode / 100))  - 5 : (total + 60 - (total + 60) * (promoCode / 100)));
              promoMsg.style.color = 'black';
              promoMsg.innerHTML = `
                <p>You have used <span>${element.promocode}</span> promocode with discount:</p>
                <span>${element.discount}%</span>
                `;
              applyPromocode.disabled = true;
              listItems.forEach((product) => {
                product.promoValue = element.discount;
                product.promoName = element.promocode;
              });
              setDataLocal(listItems);
            } else {
              promoMsg.style.color = 'red';
              promoMsg.innerHTML = 'This code has expired';
            }
            check++;
          }
        });
        if (check === 0) {
          promoMsg.style.color = 'red';
          promoMsg.innerHTML = 'This code does not exist';
        }
      });
  }
}

/*********************************** User Data ***********************************/
// Storage Values
let nameValue;
let phoneValue;
let emailValue;
let addressValue;
let governoratesValue;

governorates.addEventListener('change', (e) => {
  governoratesValue = e.target.value;
});

checkOutButton.addEventListener('click', () => {
  nameValue = nameI.value;
  phoneValue = phone.value;
  emailValue = email.value;
  addressValue = address.value;

  if (nameValue.trim()) {
    nameI.classList.add('right');
    nameI.classList.remove('wrong');
  } else {
    nameI.classList.add('wrong');
    nameI.classList.remove('right');
  }

  if (phoneValue.trim()) {
    phone.classList.remove('wrong');
    phone.classList.add('right');
  } else {
    phone.classList.add('wrong');
    phone.classList.remove('right');
  }

  if (emailValue.trim()) {
    email.classList.remove('wrong');
    email.classList.add('right');
  } else {
    email.classList.add('wrong');
    email.classList.remove('right');
  }

  if (addressValue.trim()) {
    address.classList.remove('wrong');
    address.classList.add('right');
  } else {
    address.classList.add('wrong');
    address.classList.remove('right');
  }

  if (governoratesValue) {
    governorates.classList.remove('wrong');
    governorates.classList.add('right');
  } else {
    governorates.classList.add('wrong');
    governorates.classList.remove('right');
  }

  if (!validateEmail(emailValue)) {
    email.classList.add('wrong');
    email.classList.remove('right');
  } else {
    email.classList.remove('wrong');
    email.classList.add('right');
  }

  if (!validatePhone(phoneValue)) {
    phone.classList.add('wrong');
    phone.classList.remove('right');
  } else {
    phone.classList.remove('wrong');
    phone.classList.add('right');
  }

  if (
    nameValue.trim() &&
    emailValue.trim() &&
    phoneValue.trim() &&
    addressValue.trim() &&
    governoratesValue
  ) {
    const userData = {
      name: nameValue,
      phone: phoneValue,
      email: emailValue,
      address: addressValue,
      governorate: governoratesValue,
    };
    if(jwtToken){
      setUserDataLocal(userData);
      window.location = './payment.html';
    }else{
      swal('You must log in before checking out', 'Success Payment.', 'error').then(() => {
      window.location.replace('./signin.html');
      });
    }
  }
});

function validateEmail(email) {
  const emailRegex =
    /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^(\+?\d{12}|\d{11})$/;
  return phoneRegex.test(phone);
}
