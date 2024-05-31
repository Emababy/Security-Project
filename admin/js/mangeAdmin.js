//Get the token from local storage
const token =sessionStorage.getItem('jwtTokenAdmin');

// URL API
const All_Admins = 'http://127.0.0.1:8000/api/admin/all_admins';
const ADD_Admin = 'http://127.0.0.1:8000/api/admin/add_admin';
const DELETE_ADMIN = 'http://127.0.0.1:8000/api/admin/delete_admin';

// GET Elements
let nameCategory = document.getElementById("nameCategory");
let bodyTable = document.getElementById("tableBody");
let submit = document.getElementById("submit");


// Create Function Call DATA from Api
function callData() {
    // Call DATA From Api
    fetch(All_Admins).then(
        
        (result) => result.json()
    ).then(
        (dataApi) => {
            // Call function  Show Admins
            ShowAdmins(dataApi.data)
        }
    )
}


// Show Admins
function ShowAdmins(data) {
    bodyTable.innerHTML = ''
    // Add Admins In Dom
    data.forEach((admin,index) => {
        let tr = document.createElement("tr");
        tr.setAttribute('id', admin.id);
        tr.innerHTML = `
                        <td scope="col">${admin.name}</td>
                        <td scope="col">${admin.email}</td>
                        <td scope="col">${admin.role}</td>
                        <td scope="col">
                        <button class="deleteColor delete me-2" data-colorId=${admin.id}>delete</button>
                        </td>
                `
        bodyTable.append(tr)
    });

document.querySelectorAll(".deleteColor").forEach(button => {
    button.addEventListener('click', (e) => {
        swal({
            title: "Are you sure you want to delete this category?",
            text: "This decision will lead to the deletion of products also related to this category",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                const formData = new FormData();
                formData.append('id', button.getAttribute("data-colorId"));
                formData.append('token', token);
                const xhr = new XMLHttpRequest();
                xhr.open('POST', DELETE_ADMIN, true);
                xhr.addEventListener('load', function () {
                    if (xhr.status === 200) {
                        const response = JSON.parse(xhr.responseText);
                            swal("The Admin has been deleted", {
                                icon: "success",
                            });
                            document.getElementById(button.getAttribute("data-colorId")).remove();
                            callData();
                    }else {
                            swal("You are not allowed to do this", {
                                icon: "error",
                            });
                        }
                });
                xhr.send(formData);
            } 
        });
    });
});
}


// Call Function calData
callData();


// Send DATA To API
// Send DATA To API
submit.addEventListener('submit', function (e) {
    if (username.value.trim()) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', username.value);
        formData.append('email', email.value);
        formData.append('password', password.value);
        formData.append('role', this.role.value); // Fix typo and adjust this line
        formData.append('token', token);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', ADD_Admin, true);
        xhr.addEventListener('load', function () {
            if (xhr.status === 201) {
                    swal("A new Admin has been added successfully", "", "success");
                    callData();
                    username.value = '';
                    email.value = '';
                    password.value = '';
                    role.value = '';
            } else {
                // Handle non-200 status code (e.g., server error)
                swal("Server error. Please try again later or try different email", "", "error");
            }
        });
        xhr.send(formData);
    }
});


// const log = JSON.parse(localStorage.getItem("log"));

// if(log !== true) {
//     window.location.href = 'index.html'
// }

