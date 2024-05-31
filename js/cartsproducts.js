let favBox = document.querySelector('.favorite')
let favItems = JSON.parse(localStorage.getItem('favorite'))
let proInCart = localStorage.getItem("items")
let allProducts  = document.querySelector(".selectPro")
let seleTitle = document.querySelector(".selected-title")
let fovTitle = document.querySelector(".favorite-title")
let total = document.querySelector("#total")

if(proInCart){
    let item =JSON.parse(proInCart)
    drowProduct(item)
}else{
    seleTitle.style.display = "none" 
    total.innerHTML = "0";
}

function drowProduct(products) {
    let x = products.map((item) => {
      return `
        <div class="card p-3 pb-2 mt-2  col-6 col-md-4 col-lg-3 proUser m-auto">
          <img src="${item.imgUrl}" style="border-radius:20px; width: 100%;  height: 120px;"  >
          <div class="card-body fw-bold">
              Name :${item.name}<br>
              category : ${item.category}<br>
              Price : ${item.price} $<br>
          </div>
          <div class="ms-2" style="display:flex ; justify-content: space-between;">
          <input type="number" value="1" min="1" id="quantity-${item.id} name="quantity"
           onmouseenter="currnet(event)" onchange="refrish(${item.price},event)" class="cart-quantity">
              <button href="#" class="btn btn-danger col-lg-ps-4 col-lg-pe-4 pt-2 pb-2 " 
              id="${item.id}" onclick='removeCart(${item.id})'>Remove from cart</button>

          </div>
        </div> <!-- card -->
           `
    })
    allProducts.innerHTML = x.join("")
    calculateTotal(products)
    
  }
// //////////////////////// total price
let z;
function currnet(e){
  z = e.target.value
}
function refrish(price,e){
  let d = e.target.value
  if(d > z){
    let x = +total.innerHTML
    x = x + +price
    total.innerHTML = `${x}`;
    z = e.target.value
  }else{
    let x = +total.innerHTML
    x = x - +price
    total.innerHTML = `${x}`;
    z = e.target.value
  }
}

  function calculateTotal(products) {
    let totalPrice = 0;
  
    products.forEach((item) => {
      totalPrice += +item.price ;
    });
    total.innerHTML = `${totalPrice}`;
  }

// ////////////////////// remove product
  function removeCart(itemId) {
    let proInCart = JSON.parse(localStorage.getItem("items"));
    const index = proInCart.findIndex((item) => item.id === itemId);
    if (index!== -1) {
      proInCart.splice(index, 1);
      localStorage.setItem("items", JSON.stringify(proInCart));
      drowProduct(proInCart);
    }
  }

function drawFav() {
    favBox.innerHTML = '';
    for (let i in favItems) {
        favBox.innerHTML += `
        <div class="   col-6 col-md-4 col-lg-3 fovUser m-auto">
            <img src="${favItems[i].imgUrl}" alt="${favItems[i].name}" >
            <div class="card-body d-flex ">
                <div class="card-text">
                    <p>Product : ${favItems[i].name}</p> 
                    <p>Category : ${favItems[i].category}</p>
                </div> <!-- Card text -->
                <a href="#" ><i class="fas fa-heart text-danger"  onclick='removeFavourite(${favItems[i].id})'  style="backgound-color: red;"></i></a>
            </div> <!-- Card body -->
        </div>
        `
    }
}
drawFav()

function removeFavourite(id) {
    let index = favItems.findIndex((x) => {
        return x.id == id
    })

    favItems.splice(index, 1)
    localStorage.setItem('favorite', JSON.stringify(favItems))
    console.log(favItems)

    addEventListener('click', (e) => e.preventDefault())
    drawFav()
}


// ///////// end project





