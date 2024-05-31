
// URL API
const GET_ALL_ORDERS = `http://127.0.0.1:8000/api/user/all_orders`;

// WOW Js
new WOW().init();

// Get Data from Local Storage
let dataUser = JSON.parse(localStorage.getItem("userData"));
let products = JSON.parse(localStorage.getItem("products"));

document.getElementById("count").innerHTML = products === null ? 0 : products.length;

// Call DATA From Api
fetch(GET_ALL_ORDERS , {
    method: 'Get',
    headers: {
        'Authorization': `Bearer ${dataUser.token}`
    }
}).then(res => res.json())
    .then(data => {
        let dataAll = data.data;
        dataAll.forEach(data => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                        <th>${data.order_id}</th>
                        <td>
                            <ul>
                                ${data.order_details.map((order, index) => ` <li>
                                ${order}
                            </li>
                            `).join(" ")}
                            </ul>
                        </td>
                        <td>${data.price}</td>
`
            document.getElementById("tableBody").append(tr)
        })
    })