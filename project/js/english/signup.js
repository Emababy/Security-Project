let name = document.getElementById('name');
let email = document.getElementById('email');
let phone = document.getElementById('phone');
let password = document.getElementById('password');
let address = document.getElementById('address');
let conPassword = document.getElementById('conPassword');
let buttonSubmit = document.getElementById('buttonSubmit');


buttonSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    if (
        name.value.trim() &&
        email.value.trim() &&
        phone.value.trim() &&
        password.value.trim() &&
        address.value.trim() &&
        password.value.trim() === conPassword.value.trim()
    ) {
        const formData = new FormData();
        formData.append('name', name.value );
        formData.append('email', email.value)
        formData.append('phone', phone.value)
        formData.append('password', password.value)
        formData.append('address', address.value)
        fetch('http://127.0.0.1:8000/api/uesr_register', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.status==201) {
                    sessionStorage.setItem('jwtToken', data.data.token);
                    localStorage.setItem("sign_done", JSON.stringify(true));
                    window.location.href = 'products.html'
                }else{
                    console.log(email);
                    alert('Try use another email.');
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
});


new WOW().init();


