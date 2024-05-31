//Get the token from local storage
const token =sessionStorage.getItem('jwtTokenAdmin');
// URL API
const GET_ALL_MESSAGES = `http://127.0.0.1:8000/api/admin/all_messages`;
const DELETE_MESSAGE = `http://127.0.0.1:8000/api/admin/delete_message`;
// Get Element
let showMessages = document.getElementById("showMessages");

// Call Product 
function callData() {
    fetch(GET_ALL_MESSAGES)
        .then((res) => res.json())
        .then((dataAPi) => {
            let dataALL = dataAPi.data.messages;
            showMessages.innerHTML = ''
            // In Case Fount Or Not fount
            if (dataAPi.data.count === 0) {
                showMessages.innerHTML = `
                    <h5>There are no messages</h5>
                    `
            } else {
                // Call Function ShowMessages 
                showMessagess(dataALL);
            }
        })
}

// ADD Messages In Dom
function showMessagess(data) {
    data.forEach(message => {
        // Create Div
        let div = document.createElement('div');
        div.setAttribute("class", "message");
        div.setAttribute("id", message.id);
        div.innerHTML = `
        <h5>Name : <span>${message.name}</span></h5>
        <h5>Email: <span>${message.email}</span></h5>
        <h5>Phone : <span>${message.phone}</span></h5>
        <h5>Message : <span>${message.message}</span></h5>
        <Button class="answered" id=${message.id}>answered</Button>        
        `
        showMessages.append(div);
    });

    // DELETE message
    document.querySelectorAll(".answered").forEach(element => {
        element.addEventListener("click", (e) => {
            const formData = new FormData();
            formData.append('id', element.getAttribute("id"));  
            formData.append('token', token);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', DELETE_MESSAGE , true);
            xhr.send(formData);
            callData();
        })
    })
}


callData();



// const log = JSON.parse(localStorage.getItem("log"));

// if(log !== true) {
//     window.location.href = 'index.html'
// }