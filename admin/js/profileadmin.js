// Get Data From Localstorage
const token =sessionStorage.getItem('jwtTokenAdmin');
// Get Elements
function adminData(){
    let dataUser = decodeToken(token);
    document.getElementById("username").value = dataUser.name;
    document.getElementById("email").value = dataUser.email;
    document.getElementById("role").value = dataUser.role;
}

adminData();

function decodeToken(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}