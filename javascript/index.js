import {getQSelector} from "../javascript/utils.js"

const body = getQSelector(".body");
const text = getQSelector(".third-section-body h1");
const navContainer = getQSelector(".nav-container");
const openBtn = getQSelector(".openBtn");
const navLinks = getQSelector(".navbar-links");

const navContainerHeight = navContainer.getBoundingClientRect().height;

window.addEventListener("DOMContentLoaded", function(){
    slideNav();
    date();
});

// date
function date(){
    var year = new Date().getFullYear();
    document.querySelector(".year").innerHTML = year;
}

// Display nav links on click of button
function slideNav(){
    body.style.marginTop = `${navContainerHeight}px`;
    openBtn.addEventListener("click", function(){
        openBtn.classList.toggle("toggle");
        navLinks.classList.toggle("nav-bar-active");
        navLinks.style.top = `${navContainerHeight}px`;
        body.classList.toggle("move-body");
    });
}