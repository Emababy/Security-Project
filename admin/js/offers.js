//Get the token from local storage
const token =sessionStorage.getItem('jwtTokenAdmin');
// URL API
const GET_ALL_OFFERS = "http://127.0.0.1:8000/api/admin/all_offers";
const ADD_OFFERS = 'http://127.0.0.1:8000/api/admin/add_offer';


// Get Elements
let promo = document.getElementById("promo");
let startDate = document.getElementById("startDate");
let endDate = document.getElementById("endDate");
let discount = document.getElementById("discount");
let bodyTable = document.getElementById("bodyTable");

// Create Function Call DATA from Api
function callData() {
    // Call DATA From Api
    fetch(GET_ALL_OFFERS).then(
        (result) => result.json()
    ).then(
        (dataApi) => {
            dataAll = dataApi.data;
            showPromoCode(dataAll)
        }
    )


    // Show Offers
    function showPromoCode(data) {
        bodyTable.innerHTML = ''
        // Add Product In Dom
        data.forEach((user, index) => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
                        <td scope="col">${user.promocode}</td>
                        <td scope="col">${user.discount}</td>
                        <td scope="col">${user.started_at}</td>
                        <td scope="col">${user.expired_at}</td>
                `
            bodyTable.append(tr)
        });
    }

}

// Call Function callData
callData();


// Send DATA To API
submit.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('promocode', promo.value);
    formData.append('started_at', startDate.value);
    formData.append('expired_at', endDate.value);
    formData.append('discount', discount.value);
    formData.append('token', token);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', ADD_OFFERS , true);
    xhr.send(formData);
    swal("Promo code added successfully", "", "success");
    callData();
    promo.value = '';
    startDate.value = '';
    endDate.value = '';
    discount.value = '';
});





// const log = JSON.parse(localStorage.getItem("log"));

// if(log !== true) {
//     window.location.href = 'index.html'
// }
