//Get token from local storage
const token =sessionStorage.getItem('jwtTokenAdmin');
// URL API
const ADD_PRODUCT = 'http://127.0.0.1:8000/api/admin/add_product';
const GET_DATA_CATEGORY = 'http://127.0.0.1:8000/api/admin/all_categories';

// Get Elements Form 
let productName = document.getElementById("productname"),
    description = document.getElementById("description"),
    price = document.getElementById("price"),
    submit = document.getElementById("submit"),
    fileInput = document.querySelector('input[type="url"]'),
    draggableList = document.getElementById("draggable-list"),
    size = document.getElementById("size"),
    discount = document.getElementById("discount"),
    tablePrice = document.getElementById("tablePrice"),
    andSizeAndPrice = document.getElementById("andSizeAndPrice"),
    colors = document.getElementById("colors"),
    colorName = document.getElementById("colorName"),
    addColor = document.getElementById("addColor"),
    addImage = document.getElementById("addImage"),
    stock = document.getElementById("stock"),
    categories = document.getElementById("categories"),
    colorInput = document.getElementById("color");

let categoryValue;

categories.addEventListener("change", (e) => {
    categoryValue = e.target.value;
});

let listColor = [];


addColor.addEventListener('click', function (e) {
    if (colorName.value.trim() && colorInput.value.trim()) {
        listColor.push(colorName.value + " | " + colorInput.value);
        // listColorArabic.push(colorNameArabic.value + " | " + colorInput.value);


        let tr = document.createElement("tr");
        tr.setAttribute("id", countIndex);
        tr.innerHTML = `
                    <td scope="col">${colorName.value}</td>
                    <td scope="col"  style="background-color:${colorInput.value};"></td>
                    <td scope="col">
                        <button class="deleteColor delete me-2" data-colorId=${countIndex}>delete</button>
                    </td>
            `
        colors.append(tr)
        countIndex++;
        document.querySelectorAll('.deleteColor').forEach((element, index) => {
            element.addEventListener('click', () => {
                document.getElementById(element.getAttribute("data-colorId")).remove();
                listColor = listColor.filter((value, i) => i !== index);
                // listColorArabic = listColorArabic.filter((value, i) => i !== index);
            })
        })
        colorName.value = '';
        // colorNameArabic.value = '';
    }
})


let listSize = [];
let listPrice = [];
let listDiscount = [];

let countIndex = 0;

andSizeAndPrice.addEventListener('click', function (e) {
    if (price.value.trim() && size.value.trim() && discount.value.trim()) {
        listSize.push(size.value);
        listPrice.push(price.value);
        listDiscount.push(discount.value);

        let tr = document.createElement("tr");
        tr.setAttribute("id", countIndex);
        tr.innerHTML = `
                    <td scope="col">${size.value}</td>
                    <td scope="col">${price.value}</td>
                    <td scope="col">${discount.value}</td>
                    <td scope="col">
                        <button class="delete deletePrice me-2" data-id=${countIndex}>delete</button>
                    </td>
            `
        tablePrice.append(tr)
        countIndex++;
        document.querySelectorAll('.deletePrice').forEach((element, index) => {
            element.addEventListener('click', () => {
                document.getElementById(element.getAttribute("data-id")).remove();
                listSize = listSize.filter((value, i) => i !== index);
                listPrice = listPrice.filter((value, i) => i !== index);
                listDiscount = listDiscount.filter((value, i) => i !== index);
            })
        })

        size.value = '';
        price.value = '';
        discount.value = '';
    }
})


addImage.addEventListener('click', function (e) {
    // Add To List
    if (fileInput.value.trim()) {
        listImages.push(fileInput.value);
        fileInput.value = '';
        draggableList.innerHTML = ''
        createList();
    }
})



// ADD Categories
fetch(GET_DATA_CATEGORY,{
    headers: {
        'Authorization': `Bearer ${token}`
    }
}).then(
    (result) => result.json()
).then(
    (dataApi) => {
        dataAll = dataApi.data;
        categories.innerHTML = `
        <option selected>Categories</option>
        ${dataAll.map((category) => `
        <option value=${category.category_id}>${category.category_name}</option>
        `
        ).join(" ")}
    `
    }
)




// // Send DATA
// document.getElementById('submit').addEventListener('submit', function (e) {
//     e.preventDefault(); // Prevent the default form submission

//     const formData = new FormData();
//     formData.append('title', productName.value);
//     formData.append('description', description.value);
//     formData.append('discount', JSON.stringify(listDiscount));
//     formData.append('price', JSON.stringify(listPrice));
//     formData.append('size', JSON.stringify(listSize));
//     formData.append('stock', stock.value);
//     formData.append('color', JSON.stringify(listColor));
//     formData.append('category_id', categoryValue);
//     formData.append('images', JSON.stringify(listImages));
//     formData.append('token', token);

//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', ADD_PRODUCT, true);
//     xhr.send(formData);
// });
// Assuming productName, description, stock, categoryValue, token, listDiscount, listPrice, listSize, listColor, and listImages are defined elsewhere in your code.

document.getElementById('submit').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    const formData = new FormData();
    formData.append('title', productName.value);
    formData.append('description', description.value);
    formData.append('discount', JSON.stringify(listDiscount));
    formData.append('price', JSON.stringify(listPrice));
    formData.append('size', JSON.stringify(listSize));
    formData.append('stock', stock.value);
    formData.append('color', JSON.stringify(listColor));
    formData.append('category_id', categoryValue);
    formData.append('images', JSON.stringify(listImages));
    formData.append('token', token);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', ADD_PRODUCT, true);
    xhr.onload = function () {
        if (xhr.status === 201) {
            // Alert success message
            alert('Product added successfully!');
            window.location.href = 'addProducts.html'
        } else {
            // Handle other status codes if needed
            alert('Failed to add product. Please try again.');
        }
    };
    xhr.send(formData);
});




let listImages = [];


// Storage List Items
let listItems = [];



createList();

// Insert Items in draggable List in Dom
function createList() {
    listImages
        .map(element => ({ value: element, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(element => element.value)
        .forEach((person, index) => {
            // Create Element li
            let li = document.createElement("li");
            // Set Attribute in li
            li.setAttribute("data-index", index);
            li.setAttribute("id", countIndex);

            li.innerHTML = `
            <span class="number" > ${index + 1}</span>
                <div class="draggable" draggable="true">
                <img src=${person} alt="" width="150" height='150px'>
                </div>
                <button class="number deleteImage delete " style="border-radius: 0px;"  data-id=${countIndex}>Delete</button>

                `
            // Add li in draggable List
            draggableList.appendChild(li)
            countIndex++;
        });
        document.querySelectorAll('.deleteImage').forEach((element, index) => {
        element.addEventListener('click', () => {
            document.getElementById(element.getAttribute("data-id")).remove();
            listImages = listImages.filter((value, i) => i !== index);
        })
    })
}








