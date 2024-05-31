let firstName = document.querySelector("#firstName")
let lastName = document.querySelector("#lastName")
let email = document.querySelector("#email")
let password1 = document.querySelector("#password1")
let password2 = document.querySelector("#password2")
let submit = document.querySelector("#submit")

submit.addEventListener("click", function (e) {
    e.preventDefault()
    if (firstName.value === "" || lastName.value === "" ||
        email.value === "" || password1.value === "" || password2.value === "") {
        alert("Please enter data")
    }else
     if (password1.value !== password2.value){
        alert("Password does not match")
    }
    else {
        localStorage.setItem("firstName", firstName.value);
        localStorage.setItem("email", email.value);
        localStorage.setItem("password", password1.value);
        setTimeout(() => {
            // window.location = "login.html"
            location.assign('login.html')
        },1500)
    }
})