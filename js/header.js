let sign = document.querySelector("#links")
let welcome = document.querySelector("#welcome")
let cart = document.querySelector(".cart-select")
let user = document.querySelector("#user-name")
let logOut = document.querySelector("#logOut")

if(localStorage.getItem("email")){
    const cart = document.querySelector('.cart-select')
    sign.remove()
    cart.style.display = "flex"
    welcome.style.display = "flex"
    user.innerHTML = localStorage.getItem("firstName")
}
///////////////// log out function
function out(){
    localStorage.clear()
    setTimeout(()=>{
        window.location="login.html"
    }, 1500)
}