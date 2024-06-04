
let allProducts = document.querySelector(".allProducts")
let cartProducts = document.querySelector(".cart")
let selectProducts = []
let favorite = []
// Faction display of products on the html page
function showPro() {
  let x = products.map((item) => {
    return `
      <div class="card p-3 pb-2 mt-2  col-6 col-md-4 col-lg-3 ">
        <img src="${item.imgUrl}" alt=" This is a ${item.name} product">
        <hr class="mb-0">
        <div class="card-body fw-bold">
            Name :${item.name}<br>
            Price : ${item.price} $<br>
            category : ${item.category}<br>
        </div>
        <div class="ms-2" style="display:flex ; justify-content: space-between;">
            <button href="#" class="btn btn-primary col-lg-ps-4 col-lg-pe-4 pt-2 pb-2 addToCart" 
            id="${item.idf}" onclick='addItems(${item.id})'>Add to cart
             <i class="fa-solid fa-cart-plus"></i></button>
            <a href="#"><i onclick ="addFavorite(${item.id})" id="${item.id}" style="color:gray" class="fa-solid fa-heart fs-3 me-3 mt-2 text-end"></i></a>
        </div>
      </div> <!-- card -->
      `
  })
  let allProducts = document.querySelector(".allProducts")
  allProducts.innerHTML = x.join("")
}
showPro()
////////// add items to cart ////////////////////////
function addItems(id) {
  let countPro = document.getElementById("countPro");
  let selectItemsAddCart = document.querySelector("#selectItems");
  if (localStorage.getItem("email")) {
    let choosenItem = products.find((item) => item.id === id);
    let existingItem = selectProducts.find((item) => item.id === id);
    
    if (existingItem) {
      alert("This product already exists in the cart.");
     return;
             
    }
    // /////// How to display selected items in a cart
    selectItemsAddCart.innerHTML += `
      <div class="cart-box">
          <img src="${choosenItem.imgUrl}" class="cart-img">
          <div class="detail-box">
            <div class="cart-product-title">${choosenItem.name}</div>            
            </div>
          <i class="fa-solid fa-trash-can cart-remove" onclick="removeCart(${choosenItem.id}) "></i>
       </div>`;

       selectProducts.push(choosenItem);
    localStorage.setItem("items", JSON.stringify(selectProducts));
    countPro.innerHTML = selectProducts.length;
  
  } else {
    setTimeout(() => {
      location.assign("login.html");
    }, 500);
  }
}

//////////////////////////////// Remove items to cart
function removeCart(id) {
  let selectItemsAddCart = document.querySelector("#selectItems");
  let cartBox = selectItemsAddCart.querySelector(`.cart-box img[src="${products.find((item) => item.id === id).imgUrl}"]`).parentElement;
  cartBox.remove();
  let index = selectProducts.findIndex((item) => item.id === id);
  if (index !== -1) {
    selectProducts.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(selectProducts));
  }
  let countPro = document.getElementById("countPro");
  countPro.innerHTML = selectProducts.length;
}
///////////// open and off cart 
function opencart() {
  if (cartProducts.innerHTML != "") {
    if (cartProducts.style.display == "none") {
      cartProducts.style.display = "block"
    } else {
      cartProducts.style.display = "none"
    }
  }
}
// /////////////// view selected product user
function viewSelectUser() {
  if (localStorage.getItem('email')) {
    location.assign('cartsproducts.html')
  } else {
    setTimeout(() => {
      location.assign('login.html')
    }, 500)
  }
}
///////////  search >>> placeholder
let searchMood = 'Title';
function getSearchMood(id) {
  let search = document.getElementById('search')
  if (id == 'searchTitle') {
    searchMood = 'Title'
  } else {
    searchMood = 'Category'
  }
  search.placeholder = 'Search By ' + searchMood;
  search.focus()
  search.value = ''
  showPro()
}
// ///////////////// Outpot Search
function searchPro(value) {
  var searchedProductsHTML = ''
  if (search.placeholder != "Search By Category") {
    let searchedProducts = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase()))
    var searchedProductsHTML = searchedProducts.map((item) => {
      return `
      <div class="card p-3 pb-2 mt-2  col-6 col-md-4 col-lg-3 ">
        <img src="${item.imgUrl}" >
        <hr class="mb-0">
        <div class="card-body fw-bold">
          Name :${item.name}<br>
          Price : ${item.price} $<br>
          category : ${item.category}<br>
        </div>
        <div class="ms-2" style="display:flex ; justify-content: space-between;">
          <a href="#" class="btn btn-primary col-lg-ps-4 col-lg-pe-4 pt-2 pb-2">Add to cart <i class="fa-solid fa-cart-plus"></i></a>
          <a href="#"><i class="fa-solid fa-heart fs-3 me-3 mt-2 text-secondary text-end"></i></a>
        </div>
      </div><!-- card -->
    `
    })
  } else {
    let searchedProducts = products.filter((item) =>
      item.category.toLowerCase().includes(value.toLowerCase()))
    var searchedProductsHTML = searchedProducts.map((item) => {
      return `
        <div class="card p-3 pb-2 mt-2  col-6 col-md-4 col-lg-3 ">
          <img src="${item.imgUrl}" >
          <hr class="mb-0">
          <div class="card-body fw-bold">
            Name :${item.name}<br>
            Price : ${item.price} $<br>
            category : ${item.category}<br>
          </div>
          <div class="ms-2" style="display:flex ; justify-content: space-between;">
            <a href="#" class="btn btn-primary col-lg-ps-4 col-lg-pe-4 pt-2 pb-2">Add to cart <i class="fa-solid fa-cart-plus"></i></a>
            <a href="#"><i class="fa-solid fa-heart fs-3 me-3 mt-2 text-secondary text-end"></i></a>
          </div>
        </div><!-- card -->
      `
    })
  }
  allProducts.innerHTML = searchedProductsHTML.join("");
}
// /////////////// add & remove favorite 
function addFavorite(id,e) {
  addEventListener('click', (e) => e.preventDefault())
  const ele = document.getElementById(id)
  console.log(ele)
  if (localStorage.getItem('email')) {
    if (ele.style.color == 'red') {
      ele.style.color = 'gray'
      favorite.splice(favorite.findIndex(() => {
        return favorite.id == id/1;
      }), 1)
      localStorage.setItem('favorite', JSON.stringify(favorite));
    } else {
      ele.style.color = 'red'
      favorite.push(products[id])
      localStorage.setItem('favorite', JSON.stringify(favorite));
    }
  } else {
    setTimeout(() => {
      location.assign('login.html')
    }, 500)
  }
}
/////////////////// end project


