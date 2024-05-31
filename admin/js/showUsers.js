// URL API
const GET_ALL_USERS = "http://127.0.0.1:8000/api/admin/all_users";
const token = sessionStorage.getItem('jwtTokenAdmin');

// Get Elements
let iconSearch = document.getElementById("iconSearch");
let bodyTable = document.getElementById("bodyTable");

// Call DATA From API
fetch(GET_ALL_USERS,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        // Call Function DataShow [TARGET: Add Data In Dom]
        showProducts(dataAll)
        // ADD Count Users 
        document.getElementById("numberOfUsers").innerHTML = dataAll.count;
        // Search User
        document.getElementById("search").addEventListener("input", (e) => {
            searchProduct(dataAll, e.target.value);
        })
        // Cancel Seacrh
        iconSearch.addEventListener("click", (e) => {
            search.value = "";
            showProducts(dataAll)
        })
    }
)

// // Show Products
function showProducts(data) {
    bodyTable.innerHTML = ''
    // Add Product In Dom
    data.users.forEach((user, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
                        <td scope="col">${user.name}</td>
                        <td scope="col">${user.email}</td>
                        <td scope="col">${user.phone}</td>
                        <td scope="col">${user.address}</td>
                `
        bodyTable.append(tr)
    });
}

// In Case User Writing In Input Search
function searchProduct(dataAll, value) {
    bodyTable.innerHTML = ''
    if (value === '') {
        showProducts(dataAll);
    } else {
        dataAll.users.forEach((user, index) => {
            if (user.name.toUpperCase().includes(value.toUpperCase())) {
                let tr = document.createElement("tr");
                tr.innerHTML = `
                            <td scope="col">${user.name}</td>
                            <td scope="col">${user.email}</td>
                            <td scope="col">${user.phone}</td>
                            <td scope="col">${user.address}</td>
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

