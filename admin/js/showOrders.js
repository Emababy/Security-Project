
// URL API
const GET_ALL_ORDERS = "http://127.0.0.1:8000/api/admin/paid_orders";
const token = sessionStorage.getItem('jwtTokenAdmin');

// Get Elements
let iconSearch = document.getElementById("iconSearch");
let bodyTable = document.getElementById("bodyTable");

// Call DATA From API
fetch(GET_ALL_ORDERS,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        // Call Function DataShow [TARGET: Add Data In Dom]
        showOrders(dataAll)
        // ADD Count Orders 
        let counter = 0
        dataAll.forEach(e => counter++);
        document.getElementById("numberOfUsers").innerHTML = counter;
        // Search Order
        document.getElementById("search").addEventListener("input", (e) => {
            searchOrders(dataAll, e.target.value);
        })

        // Cancel Seacrh
        iconSearch.addEventListener("click", (e) => {
            search.value = "";
            showOrders(dataAll)
        })
    }
)

// Show Orders
function showOrders(data) {
    bodyTable.innerHTML = ''
    // Add Order In Dom
    data.forEach((order, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
                        <td scope="col">${order.order_id}</td>
                        <td scope="col">${order.user}</td>
                        <td scope="col">
                        <ul>
                        ${order.details.map((details) => `
                        <li>${details}</li>
                        `
                        ).join(" ")}
                        </ul>
                        </td>
                        <td scope="col">${order.price}</td>
                        <td scope="col">${order.ordered_at}</td>
                `
        bodyTable.append(tr)
    });
}

// In Case User Writing In Input Search
function searchOrders(dataAll, value) {
    bodyTable.innerHTML = ''
    if (value === '') {
        showOrders(dataAll);
    } else {
        dataAll.forEach((order, index) => {
            if (order.user.toUpperCase().includes(value.toUpperCase())) {
                let tr = document.createElement("tr");
                tr.innerHTML = `
                <td scope="col">${order.order_id}</td>
                <td scope="col">${order.user}</td>
                <td scope="col">
                <ul>
                ${order.details.map((details) => `
                <li>${details}</li>
                `
                ).join(" ")}
                </ul>
                </td>
                <td scope="col">${order.price}</td>
                <td scope="col">${order.ordered_at}</td>
                `
                bodyTable.append(tr)
            }
        });
    }
}


// const log = JSON.parse(localStorage.getItem("log"));

// if(log !== true) {
//     window.location.href = 'index.html'
// }


