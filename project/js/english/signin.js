// let email = document.getElementById('email');
// let password = document.getElementById('password');
// let buttonSubmit = document.getElementById('buttonSubmit');




// buttonSubmit.addEventListener('click', function (event) {
//     event.preventDefault();
//     if (
//         email.value.trim() &&
//         password.value.trim() 
//     ) {
//         const formData = new FormData();
//         formData.append('email', email.value)
//         formData.append('password',password.value)
//         fetch('http://127.0.0.1:8000/api/user_login', {
//             method: 'POST',
//             body: formData
//         })
//             .then(response => response.json())
//             .then(data => {
//                 if (data.status==200) {
//                     localStorage.setItem("userData", JSON.stringify(data.data));
//                     localStorage.setItem("sign_done", JSON.stringify(true));
//                     window.location.href = 'products.html'
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }
// });


// new WOW().init();

let email = document.getElementById('email');
let password = document.getElementById('password');
let buttonSubmit = document.getElementById('buttonSubmit');

buttonSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    if (
        email.value.trim() &&
        password.value.trim() 
    ) {
        const formData = new FormData();
        formData.append('email', email.value)
        formData.append('password', password.value)
        fetch('http://127.0.0.1:8000/api/user_login', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status == 200 && data.data.token) {
                // Save token in session storage
                sessionStorage.setItem('jwtToken', data.data.token);
                localStorage.setItem("sign_done", JSON.stringify(true));

                // Redirect to dashboard or do something else
                window.location.href = 'products.html';
            } else {
                alert("Invalid email, password or try again later");
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
});

