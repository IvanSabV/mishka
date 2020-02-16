var orderButton = document.querySelector('.features__button');
var orderIcon = document.querySelectorAll('.item__icon');

var cartPopup = document.querySelector('.cart-add');
var cartDialog = cartPopup.querySelector('.cart-add__wrapper');

var catalogList = document.querySelector('.catalog__list');

if(orderButton) {
  orderButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    cartPopup.classList.remove('cart-add--closed');
  });
} else {
  for (var i = 0; i < orderIcon.length; i++) {
    orderIcon[i].onclick = function() {
      cartPopup.classList.remove('cart-add--closed');
    };
  }
}

cartPopup.addEventListener('click', function (evt) {
  evt.preventDefault();
  cartPopup.classList.add('cart-add--closed');
});

cartDialog.addEventListener('click', function (evt) {
  evt.stopImmediatePropagation();
});


var navMain = document.querySelector('.nav-main');
var navIcon = document.querySelector('.nav-main__icon');

navMain.classList.remove('nav-main--nojs');

navIcon.addEventListener('click', function() {
  if (navMain.classList.contains('nav-main--closed')) {
    navMain.classList.remove('nav-main--closed');
    navMain.classList.add('nav-main--opened');
  } else {
    navMain.classList.add('nav-main--closed');
    navMain.classList.remove('nav-main--opened');
  }
});
