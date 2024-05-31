
// URL API
const UPDATE_DATA = 'http://127.0.0.1:8000/api/user/update';

// WOW Js
new WOW().init();

// Get Elements
let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let locationInput = document.getElementById("location");
let phoneInput = document.getElementById("phone");


// Get DATA From localstorage
let products = JSON.parse(localStorage.getItem("products"));
let dataUser = JSON.parse(localStorage.getItem("userData"));


document.getElementById("count").innerHTML = products === null ? 0 : products.length;

nameInput.value = dataUser.name;
emailInput.value = dataUser.email;
locationInput.value = dataUser.address;
phoneInput.value = dataUser.phone;


document.getElementById("updateData").addEventListener("click", (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('token', dataUser.token);
    formData.append('name', nameInput.value);
    formData.append('phone', phoneInput.value)
    formData.append('address', locationInput.value)
    fetch(UPDATE_DATA, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${dataUser.token}`
        },
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 201) {
                let token = dataUser.token;
                localStorage.setItem("userData", JSON.stringify({ token , ...data.data}));
                window.location.reload();
            }
        })
        .catch(error => {
            console.log(error);
        });
})

