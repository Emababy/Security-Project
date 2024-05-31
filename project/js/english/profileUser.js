// URL API
const GET_ALL_ORDERS = `http://127.0.0.1:8000/api/user/all_orders`;
// WOW Js
new WOW().init();
// Get Data From Localstorage
let dataUser = JSON.parse(localStorage.getItem("userData"));
let products = JSON.parse(localStorage.getItem("products"));
let jwtToken = sessionStorage.getItem('jwtToken')
var decodedToken = decodeToken(jwtToken);
document.getElementById("count").innerHTML = products === null ? 0 : products.length;
// Get Elements
document.getElementById("name").value = decodedToken.name;
document.getElementById("email").value = decodedToken.email;
document.getElementById("location").value = decodedToken.address;
document.getElementById("phone").value = decodedToken.phone;
// Call DATA From Api
fetch(GET_ALL_ORDERS , {
    method: 'Get',
    headers: {
        'Authorization': `Bearer ${jwtToken}`
    }
}).then(res => res.json())
    .then(data => {
        let dataAll = data.data;
        let count = 0;
        dataAll.forEach(element => {
            count++;
        });
        document.getElementById("totalOrders").value = count;
        document.getElementById("totalSales").value = count === 0 ? 0 : dataAll.map(e => +e.price).reduce((acc, ele) => acc + ele);
    })

    function decodeToken(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}