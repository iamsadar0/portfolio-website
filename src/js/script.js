'use strict'
const hamburger = document.querySelector(".hamburger"),
    menu = document.querySelector(".menu"),
    closeElem = document.querySelector(".menu__close");

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
})


const percent = document.querySelectorAll('.parameters__item-percent'),
    scales = document.querySelectorAll('.parameters__item-value');

percent.forEach((item, i) => {
    scales[i].style.width = item.innerHTML;
});

