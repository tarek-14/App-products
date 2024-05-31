let email = document.querySelector("#email")
let password = document.querySelector("#password")
let getEmail = localStorage.getItem("email")
let getPassword = localStorage.getItem("password")
let logInBtn = document.querySelector("#logInBtn")

logInBtn.addEventListener("click", function (e) {
    e.preventDefault()
    if (email.value == "" || password.value == "") {
        alert("Please Enter Data")
    } else if (email.value.trim() === getEmail.trim() && password.value.trim() === getPassword.trim()) {
        setTimeout(() => {
            window.location = "../html/index.html"
        }, 1000)
    }else{
        alert("The username or password is wrong ")
    }
})
