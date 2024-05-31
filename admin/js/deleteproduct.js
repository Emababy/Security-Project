//Get the token from local storage
const token =sessionStorage.getItem('jwtTokenAdmin');
// URL API
const SHOW_PRODUCT = "http://127.0.0.1:8000/api/admin/show_product/"
const DELTE_PRODUCT = `http://127.0.0.1:8000/api/admin/delete_product`;

// Get Element
let inputSearch = document.getElementById("searchProduct");
let buttonSearch = document.getElementById("buttonSearch");
let showProduct = document.getElementById("showProduct");

// Call Product 
buttonSearch.addEventListener('click', () => {
    fetch(`${SHOW_PRODUCT}${+inputSearch.value}`)
        .then((res) => res.json())
        .then((data) => {
            showProduct.innerHTML = ''
            // In Case Fount Or Not fount
            if (data.status === 404) {
                showProduct.innerHTML = `
                    <h1 class="text-center" style="color: red;">NOT FOUNT !</h1>
                    `
            } else {
                showProduct.innerHTML = `
                    <h3 style = "color: var(--primary-color);" > Product Id: <span style="color: #333;">${data.data.product_id}</span> </h3>
                    <h3 style="color: var(--primary-color);">Name Product: <span style="color: #333;">${data.data.product_name}</span></h3>
                    <h3 style="color: var(--primary-color);">Category : <span style="color: #333;">${data.data.category_name}</span></h3>
                    <button class="buttonDelete" id="buttonDelete">Delete</button>
            `
                // DELETE product
                document.getElementById("buttonDelete").addEventListener("click", (e) => {
                    swal({
                        title: "Are you sure you want to delete this Product ?",
                        text: "",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    })
                        .then((willDelete) => {
                            if (willDelete) {
                                swal("This product  have been deleted", {
                                    icon: "success",
                                });
                                const formData = new FormData();
                                formData.append('id', data.data.product_id);
                                formData.append('token', token);
                                const xhr = new XMLHttpRequest();
                                xhr.open('POST', DELTE_PRODUCT, true);
                                xhr.send(formData);
                                showProduct.innerHTML = '';
                                
                            } else {
                                swal("The deletion command has been undone");
                            }
                        });

                })
            }
        })

})


// const log = JSON.parse(localStorage.getItem("log"));

// if(log !== true) {
//     window.location.href = 'index.html'
// }
