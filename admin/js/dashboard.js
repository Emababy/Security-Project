//Get the token from local storage
const token =sessionStorage.getItem('jwtTokenAdmin');
// URL API
const GET_ALL_ORDERS = 'http://127.0.0.1:8000/api/admin/paid_orders';
const GET_ALL_USERS = 'http://127.0.0.1:8000/api/admin/all_users';
const GET_ALL_PRODUCTS = 'http://127.0.0.1:8000/api/admin/all_products';
const CASH_ORDERS = 'http://127.0.0.1:8000/api/admin/cash_orders';

function totalOrder() {
  // Total Orders
  fetch(GET_ALL_ORDERS,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
    .then((result) => result.json())
    .then((dataApi) => {
      dataAll = dataApi.data;
      let count = 0;
      dataAll.forEach((element) => count++);
      document.getElementById('totalOrders').innerHTML = count;
      let totalPrice =
        count === 0
          ? 0
          : dataAll
              .map((element) => +element.price)
              .reduce((acc, ele) => acc + ele);
      document.getElementById('totalPrice').innerHTML = '$' + totalPrice;
    });
}

totalOrder();

// Total Users
fetch(GET_ALL_USERS,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
  .then((result) => result.json())
  .then((dataApi) => {
    let count = dataApi.data.count;
    document.getElementById('totalUsers').innerHTML = count;
  });

// Total Products
fetch(GET_ALL_PRODUCTS,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
  .then((result) => result.json())
  .then((dataApi) => {
    dataAll = dataApi.data;
    let count = 0;
    dataAll.forEach((element) => count++);
    document.getElementById('totalProduct').innerHTML = count;
  });

let bodyTable = document.getElementById('bodyTable');

fetch(GET_ALL_PRODUCTS,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
  .then((result) => result.json())
  .then((dataApi) => {
    dataAll = dataApi.data;
    // Call Function DataShow [TARGET: Add Data In Dom]
    let dataReverse = dataAll.reverse();
    dataReverse = dataReverse.map((element, index) => {
      if (index < 4) {
        return element;
      }
    });
    showProducts(dataReverse);
  });

// Show Products
function showProducts(data) {
  bodyTable.innerHTML = '';
  // Add Product In Dom
  data.forEach((product, index) => {
    let tr = document.createElement('tr');
    tr.innerHTML = `
                        <td scope="col">${product.product_name}</td>
                        <td scope="col">${product.category_name}</td>
                        <td scope="col">${product.stock}</td>
                        <td scope="col">
                        <ul>
                        ${product.price
                          .map(
                            (price) => `
                        <li>${price}</li>
                        `
                          )
                          .join(' ')}
                        </ul>
                        </td>
                        <td scope="col">
                        <ul>
                        ${product.discount
                          .map(
                            (discount) => `
                        <li>${discount}</li>
                        `
                          )
                          .join(' ')}
                        </ul>
                        </td>
                `;
    bodyTable.append(tr);
  });
}

fetch(CASH_ORDERS,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
  .then((result) => result.json())
  .then((dataApi) => {
    console.log(dataApi);
    dataAll = dataApi.data;
    let listOrders = document.getElementById('listOrders');

    dataAll.forEach((element) => {
      let div = document.createElement('div');
      div.setAttribute('class', 'order');
      div.setAttribute('id', element.order_id);
      let arr = element.details[0].split(',');
      console.log(arr);
      div.innerHTML = `  
                <div>
                    <h4>User information</h4>
                    <p class="show">${element.user}</p>
                </div>
                <h4>Order Details</h4>
                <div class="row show">
                ${element.details
                  .map(
                    (ele, index) =>
                      `
                    <div class="col-lg-4 mt-3 mt-md-0">
                        <div>
                            <h3>Order : ${index + 1}</h3>
                            <p class="mb-1">Product Name : <span>${
                              ele.split(',')[0]
                            }</span></p>
                            <p class="mb-1">Product Size : <span>${
                              ele.split(',')[1]
                            }</span></p>
                            <p class="mb-1">Product  Color : <span>${
                              ele.split(',')[2]
                            }</span></p>
                            <p class="mb-1">Product  Price : <span>${
                              ele.split(',')[3]
                            }</span></p>
                            <p class="mb-1">Product Quantity : <span>${
                              ele.split(',')[4]
                            }</span></p>
                        </div>
                    </div>
                    `
                  )
                  .join(' ')}
                </div>
                <div class="col-lg-4 mt-3 mt-md-0">
                    <div>
                        <h4>Payment Details</h4>
                        <p class="mb-1">Total Price : <span>${
                          element.price
                        }</span></p>
                        <p class="mb-1">Promocode : <span>${
                          element.promocode
                        }</span></p>
                        <p class="mb-1">Paid Method : <span>${
                          element.paid_method
                        }</span></p>
                    </div>
                </div>
                <div class="buttons mt-2 d-block ms-auto" style="width: fit-content;">
                    <button class="accept" data-idAccept=${
                      element.order_id
                    } >Accept</button>
                    <button class="rejected" data-idRejected=${
                      element.order_id
                    }>rejected</button>
                </div>
            `;
      listOrders.append(div);
    });
    document.querySelectorAll('.accept').forEach((element) => {
      element.addEventListener('click', () => {
        let id = element.getAttribute('data-idAccept');
        const formData = new FormData();
        formData.append('id', id);
        formData.append('token', token);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8000/api/admin/accept_order', true);
        xhr.send(formData);
        document.getElementById(id).remove();
        totalOrder();
      });
    });

    document.querySelectorAll('.rejected').forEach((element) => {
      element.addEventListener('click', () => {
        let id = element.getAttribute('data-idRejected');
        const formData = new FormData();
        formData.append('id', id);
        formData.append('token', token);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://127.0.0.1:8000/api/admin/reject_order', true);
        xhr.send(formData);
        document.getElementById(id).remove();
        totalOrder();
      });
    });
  });

// const log = JSON.parse(localStorage.getItem("log"));

// if(log !== true) {
//     window.location.href = 'index.html'
// }
