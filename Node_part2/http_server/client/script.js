const $mainBody = document.body.querySelector(".main-body");
const $loader = document.body.querySelector(".loader");
const $buttonPages = document.querySelector(".buttons");
const $productsContainer = document.querySelector(".products");
const $cart = document.querySelector(".cart-list");
const $cartIcon = document.querySelector(".cart");
const $totalItems = document.querySelector(".items");
const $category = document.querySelector(".sidebar");
const $productsCartList = document.querySelector(".products-list");
const $paymentSection = document.querySelector(".payment-section");
const $paymentProdList = document.querySelector(".payment-list");
const $subTotalPrice = document.querySelector(".subtotal");
const $submitPayment = document.querySelector(".pay-form");
const $thankPage = document.querySelector(".thankyou-page");
const $modalWindow = document.querySelector(".modal-window");
const $backToShop = document.querySelector(".back");
const $checkOutProducts = document.querySelector(".buyproducts");

const $inputEmail = document.getElementById("email");
const $inputCard = document.getElementById("cardnumber");
const $inputMonth = document.getElementById("month");
const $inputCvc = document.getElementById("cvc");
const $inputName = document.getElementById("name");
const $paymentForm = document.getElementById("payment");

const $placeholderCart = document.createElement("div");
const $clearFilter = document.createElement("div");
const $checkOutBtn = document.createElement("button");

$clearFilter.classList.add("clear-filter");
$checkOutBtn.classList.add("checkout");
$placeholderCart.classList.add("placeholder-cart");

$checkOutBtn.innerText = "Checkout";
$placeholderCart.innerHTML = '<h2 class="placeholder-text">Empty Cart</h2>';

if (
  JSON.parse(localStorage.getItem("cart")) == null ||
  JSON.parse(localStorage.getItem("products")) == null
) {
  localStorage.setItem("cart", JSON.stringify([]));
  localStorage.setItem("products", JSON.stringify([]));
}

if (JSON.parse(localStorage.getItem("products")).length > 0) {
  $loader.classList.add("disable");
}

function ivaCalc(price) {
  const res = (price / 100) * 22;
  return res;
}

const getProductHTML = ({ title, price, image, id }) => {
  function ivaCalc(price) {
    const res = (price / 100) * 22;
    return res;
  }
  return `<li class="product-card"><img src="${image}"><div class="description"><p class="title_product">${title}</p>
    <p class="price_product">${(price + ivaCalc(price)).toFixed(2)}€</p>
    <button id="${id}" class="buy">Add to Cart</button></li></div>`;
};

const getProductCartHTML = ({ title, price, image }) => {
  
  function ivaCalc(price) {
    const res = (price / 100) * 22;
    return res;
  }

  return `<li class="product-cart"><img src="${image}"><div class="textcard-cart"><p class="title_product">${title}</p>
    <p class="price_product">${(price + ivaCalc(price)).toFixed(2)}€</p></div>
    <button id="${shop._cart.indexOf({ title, price, image })}" class="remove">x</button></li>`;
};

const shop = {
  name: "Edgemonics",
  _products: [],
  _page: 1,
  _per_page: 6,
  _id: 0,
  _totalPages: 0,
  _cart: [],

  get cart() {
    $totalItems.innerText = `${this._cart.length} Items`;
    localStorage.setItem("cart", JSON.stringify(this._cart));
    return this._cart;
  },

  get products() {
    this._cart = JSON.parse(localStorage.getItem("cart"));
    const indexOfLastPost = this._page * this._per_page;
    const indexOfFirstPost = indexOfLastPost - this._per_page;
    this._totalPages = Math.ceil(this._products.length / this._per_page);
    const paginatedProducts = this._products.slice(
      indexOfFirstPost,
      indexOfLastPost
    );
    this._products.map((product, index) => {
      product.id = index;
      return product;
    });
    return paginatedProducts;
  },

  set idValue(id) {
    this._id = id - 1;
  },

  set cartProduct(id) {
    this._cart.push(this._products[id]);
    console.log(id);
    this._cart.map((product, index) => {
      product.id = index;

      return product;
    });
    $totalItems.innerText = `${this._cart.length} Items`;
  },

  clearCart() {
    this._cart = [];
  },

  set products(newProducts) {
    this._products = newProducts;
    this.renderHTML();
    this.renderPagesButton();
    this.renderCartHTML();
  },
  /**
   * @param {string | null} newPage
   */
  set page(newPage) {
    this._page = newPage;
    this.renderHTML();
  },

  set removeItemCart(id) {
    this._cart.splice(id, 1);
  },

  renderHTML() {
    const productsEl = document.querySelector(".products");
    const productsHTML = this.products.map(getProductHTML).join("");
    productsEl.innerHTML = `
            <p>Pagina: ${this._page}</p>
            <ul class="products-ul">${productsHTML}</ul>`;
  },

  renderCartHTML() {
    // const $cart = document.querySelector('.products-list');
    const productsHTML = this.cart.map(getProductCartHTML).join("");

    if (this.cart.length > 0) {
      $cart.appendChild($checkOutBtn);
    }
    if (this.cart.length <= 0) {
      $checkOutBtn.remove();
    }

    function totalPrice(a) {
      
      // a.forEach((value) => {
       
      //   sumPriceIva += value.price + ivaCalc(value.price);
      // });
      let sumPriceIva = a.reduce((acc, next) => acc + (next.price + ivaCalc(next.price)), 0);

      return sumPriceIva.toFixed(2);
    }

    function ivaPrice(a) {
      let sumIva = 0;
      a.forEach((value) => {
       
        sumIva += ivaCalc(value.price);
      });
      return sumIva.toFixed(2);
    }

    function subTotal(a) {
      let sumPrice = 0;
      a.forEach((value) => {
        sumPrice += value.price;
      });
      return sumPrice.toFixed(2);
    }

    $subTotalPrice.innerHTML = `<p class="total">Total: <span class="num-tot">${subTotal(
      this.cart
    )}</span></p>
        <p class="iva">IVA 22%: ${ivaPrice(this.cart)}</p>
        <h4>Subtotal (IVA incl.): 
        <div class="price">
          <div class="euro">€</div>${totalPrice(this.cart)}
        </div>
        </h4>`;
    $productsCartList.innerHTML = `<ul class="list-cart">${productsHTML}</ul>`;
    $paymentProdList.innerHTML = `<ul class="list-cart">${productsHTML}</ul>`;
    $checkOutProducts.innerHTML = `<ul class="list-cart">${productsHTML}</ul>`;
  },

  renderPagesButton() {
    const $paging = document.querySelector(".buttons");
    const btnArray = [];
    for (let i = 1; i <= shop._totalPages; i++) {
      const elBtn = `<button class="btn_pages" id="${i}"><p id="${i}">${i}</p></button>`;
      btnArray.push(elBtn);
      $paging.innerHTML = `${btnArray.join("")}`;
    }
  },
};

shop.products = JSON.parse(localStorage.getItem("products"));

$cartIcon.addEventListener("click", (event) => {
  $cart.classList.toggle("active");
});

$buttonPages.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON" || event.target.tagName === "P") {
    const $button = event.target;
    const newPage = Number($button.id);
    shop.page = newPage;
  }
});

$productsContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    shop.cartProduct = event.target.id;
    if (shop.cart.length > 0) {
      $placeholderCart.remove();
    }
    shop.renderCartHTML();
  }
});

$mainBody.addEventListener("click", (event) => {
  if (
    event.target.className !== ".cart-list" ||
    event.target.classList === ".nav-bar"
  ) {
    $cart.classList.remove("active");
  }
});

$cart.addEventListener("click", (event) => {
  if (event.target.className === "remove") {
    shop.removeItemCart = event.target.id;
    shop.renderCartHTML();
  }

  if (shop.cart.length === 0) {
    $cart.classList.remove("active");

    $cart.append($placeholderCart);
  }

  if (event.target.className === "checkout") {
    $paymentSection.classList.add("active");
    $cart.classList.remove("active");
    console.log("Hai Cliccato pagamento");
  }
});

$paymentProdList.addEventListener("click", (event) => {
  if (event.target.className === "remove") {
    shop.removeItemCart = event.target.id;
    shop.renderCartHTML();
  }
});

$paymentSection.addEventListener("click", (event) => {
  if (event.target.className === "back-btn") {
    $paymentSection.classList.remove("active");
  }
  if (event.target.className === "back-btn-img") {
    $paymentSection.classList.remove("active");
  }
});

$submitPayment.addEventListener("submit", (event) => {
  if (
    $inputEmail.value.length > 0 &&
    $inputCard.value.length > 0 &&
    $inputMonth.value.length > 0 &&
    $inputCvc.value.length > 0 &&
    $inputName.value.length > 0
  ) {
    $paymentSection.classList.remove("active");
    $modalWindow.classList.add("active");
    $thankPage.classList.add("active");
    shop.clearCart();
    localStorage.setItem("cart", JSON.stringify([]));
  }

  event.preventDefault();

  // if (event.target.tagName === 'BUTTON') {

  // }
});

$modalWindow.addEventListener("click", (event) => {
  if (event.target.className === "back") {
    console.log("hai cliccato back to shop");
    location.reload();
  }
});

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    $category.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        shop.products = JSON.parse(localStorage.getItem("products")).filter(
          (element) => element.category === event.target.id
        );
        $clearFilter.innerHTML = "Clear filter";
        $category.append($clearFilter);
        shop.page = 1;
        shop.renderPagesButton();
      }

      if (event.target.className === "clear-filter") {
        event.target.remove();
        shop.products = json;
        shop.renderPagesButton();
      }
    });

    if (JSON.parse(localStorage.getItem("products")).length === 0) {
      shop.products = json;
    }

    localStorage.setItem("products", JSON.stringify(json));
  })
  .finally(() => {
    $loader.classList.add("disable");
  });

fetch("https://fakestoreapi.com/products/categories")
  .then((res) => res.json())
  .then((json) => {
    const $categoriesList = document.querySelector(".categories-ul");
    const category = json
      .map((element) => {
        return `<button class="li-cat" id="${element}">${element}</button>`;
      })
      .join("");
    $categoriesList.innerHTML = `${category}`;
  });
