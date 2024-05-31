//Get the token from local storage
const token =sessionStorage.getItem('jwtTokenAdmin');
// URL API
const UPDATE_PRODUCT = 'http://127.0.0.1:8000/api/admin/update_product';
const GET_DATA_CATEGORY = 'http://127.0.0.1:8000/api/admin/all_categories';
const Get_PRODUCT = 'http://127.0.0.1:8000/api/admin/show_product/'


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
    colorInput = document.getElementById("color"),
    inputSearch = document.getElementById("searchProduct"),
    buttonSearch = document.getElementById("buttonSearch");


let listColor = [];
let listSize = [];
let listPrice = [];
let listDiscount = [];
let listImages = [];
let categoryValue;

let countIndex = 0;

// ADD Categories
buttonSearch.addEventListener('click', () => {
    fetch(`${Get_PRODUCT}${inputSearch.value}`).then(
        (result) => result.json()
    ).then(
        (dataApi) => {
            if (dataApi.status === 200) {
                document.getElementById('error').innerHTML = ''
                showProduct(dataApi.data);
            }else {
                document.getElementById('error').innerHTML = 'NOT FOUND !'
            }
        }
    )
})


function showProduct(data) {
    productName.value = data.product_name;
    description.value = data.description;
    stock.value = data.stock;
    listImages = data.image;
    createList();
    data.price.forEach((element, index) => {
        listSize.push(data.size[index]);
        listPrice.push(data.price[index]);
        listDiscount.push(data.discount[index]);

        let tr = document.createElement("tr");
        tr.setAttribute("id", countIndex);
        tr.innerHTML = `
                        <td scope="col">${data.size[index]}</td>
                        <td scope="col">${data.price[index]}</td>
                        <td scope="col">${data.discount[index]}</td>
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
    })
    data.color.forEach((element, index) => {

        listColor.push(element.split("|")[1] + " | " + element.split("|")[0]);

        let tr = document.createElement("tr");
        tr.setAttribute("id", countIndex);
        tr.innerHTML = `
                    <td scope="col">${element.split("|")[0]}</td>
                    <td scope="col"  style="background-color:${element.split("|")[0]};"></td>
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
            })
        })
    })
    document.getElementById("nameCate").value = data.category_name;
    fetch(GET_DATA_CATEGORY).then(
        (result) => result.json()
    ).then(
        (dataApi) => {
            dataApi.data.forEach((element) => {
                if (element.category_name === data.category_name) {
                    categoryValue = element.category_name;
                }
            });
        }
    )
}

categories.addEventListener("change", (e) => {
    categoryValue = e.target.value;
    console.log(categoryValue)
    fetch(GET_DATA_CATEGORY).then(
        (result) => result.json()
    ).then(
        (dataApi) => {
            dataApi.data.forEach((element) => {
                console.log(element.category_id)

                if (element.category_id === +categoryValue) {
                    console.log(categoryValue)

                    document.getElementById("nameCate").value = element.category_name;
                }
            });
        }
    )

});


addColor.addEventListener('click', function (e) {
    if (colorName.value.trim() && colorInput.value.trim()) {
        listColor.push(colorName.value + " | " + colorInput.value);

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
            })
        })
        colorName.value = '';
    }
})



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




// Send DATA
document.getElementById('submitButton').addEventListener('click', () => {
    submit.addEventListener('submit', function (e) {
        const formData = new FormData();
        formData.append('id', inputSearch.value);
        formData.append('title', productName.value);
        formData.append('description', description.value);
        formData.append('discount', JSON.stringify(listDiscount));
        formData.append('price', JSON.stringify(listPrice));
        formData.append('size', JSON.stringify(listSize));
        formData.append('stock', stock.value);
        formData.append('color', JSON.stringify(listColor));;
        formData.append('category_id', categoryValue);
        formData.append('images', JSON.stringify(listImages));
        formData.append('token', token);
        const xhr = new XMLHttpRequest();
        xhr.open('POST', UPDATE_PRODUCT, true);
        xhr.send(formData);
    });
})


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








