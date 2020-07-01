const dragAndDrop = () => {
  const productsItem = document.querySelectorAll(".products__item"),
    cart = document.querySelector(".cart");
  let draggedItem = null,
    draggedItemCopy = null;

  const dragStart = function () {
    draggedItem = this;
    draggedItemCopy = draggedItem.cloneNode(true);
    draggedItemCopy.classList.add("products__item_new");
    console.log("start");
  };

  const dragEnd = function () {
    cart.classList.remove("hovered");
    console.log("end");
  };

  const dragOver = function (event) {
    event.preventDefault();
  };
  const dragEnter = function (event) {
    event.preventDefault();
    this.classList.add("hovered");
  };
  const dragLeave = function () {
    this.classList.remove("hovered");
  };
  const dragDrop = function () {
    console.log("drop");
    this.append(draggedItemCopy);
    removeFromCart();
  };

  cart.addEventListener("dragover", dragOver);
  cart.addEventListener("dragenter", dragEnter);
  cart.addEventListener("dragleave", dragLeave);
  cart.addEventListener("drop", dragDrop);

  productsItem.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragend", dragEnd);
  });
};

const removeFromCart = function () {
  const itemInCart = document.querySelectorAll(".products__item_new"),
    productsWrap = document.querySelector(".products__wrap"),
    itemsQuantity = document.querySelector(".cart__header-items span");

  let draggedItemInCard = null;

  const dragStartNew = function () {
    draggedItemInCard = this;
    console.log("startFrom");
  };
  const dragEndNew = function () {
    console.log("endFrom");
    calcItems();
    totalPrice();
  };
  const dragOverFrom = function (event) {
    event.preventDefault();
  };
  const dragEnterFrom = function (event) {
    event.preventDefault();
  };
  const dragLeaveFrom = function () {
    // this.classList.remove("hovered");
  };
  const dragDropFrom = function () {
    console.log("drop");
    draggedItemInCard.remove();
  };

  productsWrap.addEventListener("dragover", dragOverFrom);
  productsWrap.addEventListener("dragenter", dragEnterFrom);
  productsWrap.addEventListener("dragleave", dragLeaveFrom);
  productsWrap.addEventListener("drop", dragDropFrom);

  itemInCart.forEach((item) => {
    item.addEventListener("dragstart", dragStartNew);
    item.addEventListener("dragend", dragEndNew);
  });

  const calcItems = () => {
    const itemInCartNew = document.querySelectorAll(".products__item_new");
    itemsQuantity.textContent = itemInCartNew.length;
  };
  calcItems();

  const totalPrice = () => {
    const totalCost = document.querySelector(".cart__header-total span"),
      cost = document.querySelectorAll(
        ".products__item_new>.products__price>span"
      );
    let total = 0;

    cost.forEach((item) => {
      total += +item.textContent;
    });

    totalCost.textContent = total;
  };
  totalPrice();

  const clearCart = () => {
    const totalCost = document.querySelector(".cart__header-total span");

    document
      .querySelector(".cart__header-clear")
      .addEventListener("click", () => {
        itemsQuantity.textContent = 0;
        totalCost.textContent = 0;
        itemInCart.forEach((item) => {
          item.remove();
        });
      });
  };
  clearCart();
};

const budget = () => {
  const inputBudget = document.querySelector(".cart__header-budget"),
    formCart = document.querySelector(".budget"),
    productPrices = document.querySelectorAll(".products__item_new > .products__price > span");
  let total = 0;

  productPrices.forEach((item) => {
    total += +item.textContent;
  });

  formCart.addEventListener("submit", (event) => {
    event.preventDefault();
    let userBudget = inputBudget.value;
  });
};
budget();

const loadContent = async (url, callback) => {
  await fetch(url)
    .then((response) => response.json())
    .then((json) => createElement(json.products));

  callback();
};

function createElement(array) {
  const productsWrap = document.querySelector(".products__wrap");

  array.forEach(function (item) {
    let card = document.createElement("div");

    card.setAttribute("draggable", "true");
    card.classList.add("products__item");
    card.innerHTML = `
        <div class="products__img-wrap">
          <img class="products__img" src="${item.img}" alt="drive">
        </div>
        <div class="products__title">
          ${item.title}
        </div>
        <div class="products__price">
          <span>${item.price}</span> S
        </div>
      `;
    productsWrap.appendChild(card);
  });
}

loadContent("js/products.json", dragAndDrop);
