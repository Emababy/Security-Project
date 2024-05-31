const URL = 'http://127.0.0.1:8000';

const productsLocal = JSON.parse(localStorage.getItem('products'));

/*User Data ordered*/
const userData = JSON.parse(localStorage.getItem('userDataOrder'));
/*Get user data from local storage to access the token*/
const UserLogged = JSON.parse(localStorage.getItem("userData"));

let listItems = productsLocal;

let option = 'card';

let radio = document.querySelectorAll('.radio');

radio.forEach((ele) => {
  ele.addEventListener('change', (event) => {
    option = event.target.value;
  });
});

// Click Button Check Out
document.getElementById('checkoutFinal').addEventListener('click', () => {
  if (option === 'card') {
    integration_id = 2456978;
    frameId = '436037';
    firstStep();
  } else if (option === 'valu') {
    integration_id = 2928191;
    frameId = '686450';
    firstStep();
  } else {
    SendProduct(listItems, userData.token);
  }
});

let frameId;
let integration_id;

function dataApi() {
  let list = [];
  listItems.forEach((item) => {
    let x = {
      name: item.title,
      amount_cents: String(item.discount) * 100,
      description: item.title + item.size + item.price + item.color,
      quantity: String(item.quantity),
    };
    list.push(x);
  });
  return list;
}

// Paymob
const API =
  'ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TWpRNE16VTJMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkubGZuaWhkenk1OWdiYjhpYnBib20zT2R3WEQ1ZUVQYU9HbkZmOTd3Sjh0YXF0MVlTNGlvZjhEWlJfNVB0eFJVYXRPNWF5ZkdJaWY3d3hHUnAyeml6VFE='; // your api here

async function firstStep() {
  let data = {
    api_key: API,
  };

  let request = await fetch('https://accept.paymob.com/api/auth/tokens', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  let response = await request.json();

  let token = response.token;

  secondStep(token);
}

async function secondStep(token) {
  let data = {
    auth_token: token,
    delivery_needed: 'false',
    amount_cents:
      (listItems
        .map((e) => +e.quantity * +e.discount)
        .reduce((acc, ele) => acc + ele) +
        60) *
        (1 - (listItems[0].promoValue ? listItems[0].promoValue : 0) / 100) ===
      60
        ? '0'
        : (listItems
            .map((e) => +e.quantity * +e.discount)
            .reduce((acc, ele) => acc + ele) +
            60) *
          (1 - (listItems[0].promoValue ? listItems[0].promoValue : 0) / 100) *
          100,
    currency: 'EGP',
    items: dataApi(),
  };

  let request = await fetch('https://accept.paymob.com/api/ecommerce/orders', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  let response = await request.json();

  let id = response.id;

  thirdStep(token, id);
}

async function thirdStep(token, id) {
  let data = {
    auth_token: token,
    amount_cents:
      (listItems
        .map((e) => +e.quantity * +e.discount)
        .reduce((acc, ele) => acc + ele) +
        60) *
        (1 - (listItems[0].promoValue ? listItems[0].promoValue : 0) / 100) ===
      60
        ? '0'
        : (listItems
            .map((e) => +e.quantity * +e.discount)
            .reduce((acc, ele) => acc + ele) +
            60) *
          (1 - (listItems[0].promoValue ? listItems[0].promoValue : 0) / 100) *
          100,
    expiration: 3600,
    order_id: `${id}`,
    billing_data: {
      apartment: '803',
      email: userData.email,
      floor: '42',
      first_name: userData.name,
      street: userData.addres,
      building: '8028',
      phone_number: userData.phone,
      shipping_method: 'PKG',
      postal_code: '01898',
      city: userData.governorate,
      country: 'CR',
      last_name: userData.name,
      state: 'Utah',
    },
    currency: 'EGP',
    integration_id: integration_id,
  };

  let request = await fetch(
    'https://accept.paymob.com/api/acceptance/payment_keys',
    {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }
  );

  let response = await request.json();

  let TheToken = response.token;

  cardPayment(TheToken);
}

async function cardPayment(token) {
  let iframURL = `https://accept.paymob.com/api/acceptance/iframes/${frameId}?payment_token=${token}`;
  window.location = iframURL;
}

function SendProduct(listItems) {
  const ordersDetails = [];
  const products = [];

  listItems.forEach((item) => {
    ordersDetails.push(
      `${item.title}, ${item.size}, ${item.color}, ${item.discount}, ${item.quantity}`
    );
    products.push({ product_id: item.productId, amount: item.quantity });
  });

  let totalPrice =
    listItems
      .map((e) => +e.quantity * +e.discount)
      .reduce((acc, ele) => acc + ele) + 60;

  totalPrice =
    totalPrice -
    totalPrice *
      ((listItems[0].promoValue ? listItems[0].promoValue : 0) / 100);

  const orderData = {
    order_details: JSON.stringify(ordersDetails),
    total_price: totalPrice > 1000 ? totalPrice - 5 : totalPrice,
    paid_method: 'cash',
    products: products,
    ...userData,
  };

  listItems[0].promoName && (orderData.promocode = listItems[0].promoName);

  sendOrder(orderData);
}

/************************************ Handle Paymob status after payment *************************************/
const currentHref = window.location.href;
const queryParams = currentHref.split('?')[1];
const searchParams = new URLSearchParams(queryParams);

/************************************ Handle Paymob status after payment *************************************/

async function sendOrder(orderData) {
  // try {
  //   const response = await fetch(`${URL}/api/user/make_order`, {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${UserLogged.token}`,
  //       'Content-Type': 'application/json; charset=UTF-8',
  //     },
  //     body: JSON.stringify(orderData),
  //   });
  //     listItems = [];
  //     localStorage.setItem('products', JSON.stringify(listItems));
  //     localStorage.removeItem('userDataOrder');
  //     swal(
  //       'successfully Ordered',
  //       'Well, you will be contacted.',
  //       'success'
  //     ).then(() => {
  //       window.location = 'products.html';
  //     });
  // } catch (error) {
  //   swal('Error', 'An error occurred. Please try again later.', 'error');
  // }
  try {
    fetch(`${URL}/api/user/make_order`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('jwtToken')}`,
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(orderData),
    })
    .then(() => {
        listItems = [];
        localStorage.setItem('products', JSON.stringify(listItems));
        localStorage.removeItem('userDataOrder');
        window.location = 'products.html';
    })
    .catch((error) => {
      listItems = [];
      localStorage.setItem('products', JSON.stringify(listItems));
      localStorage.removeItem('userDataOrder');
      window.location = 'products.html';
    });
} catch (error) {
    swal('Error', 'An error fadifuhakfoccurred. Please try again later.', 'error');
}

}

async function getPaymentStatus(paymentData) {
  try {
    const response = await fetch(`${URL}/api/user/pay_details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();

    if (data.status !== 200) {
      swal(
        `${data.message}!`,
        'Go back to products page and make another order.',
        'error'
      ).then(() => {
        window.location.replace('./products.html');
      });
    } else {
      return data;
    }
  } catch (error) {
    swal(
      'Error',
      'Server error, contact with us to confirm your order',
      'error'
    );
  }
}
