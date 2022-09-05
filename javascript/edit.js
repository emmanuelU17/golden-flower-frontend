import { PUTURL, getQSelector } from "../javascript/utils.js";

var DATA = JSON.parse(sessionStorage.getItem("DATA"));
var form = getQSelector("#edit-product");
var name = getQSelector("#name");
var category = getQSelector("#category");
var description = getQSelector("#description");
const erroMessage = getQSelector("#errorMessage");

var id = DATA.id;
console.log(id);
name.value = DATA.name;
category.value = DATA.category;
description.value = DATA.description;

const submitButton = (PUTURL) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formD = new FormData(form);
        const api = PUTURL + id;
        fetch(api, {
            method: "POST",
            body: formD
        }).then(async (response) => {
            if (response.ok) {
                window.location.href = "../static/new.html"
                return response.json();
            } else {
                const body = await response.json();
                throw new Error(body.message);
            }
        }).catch((error) => {
            erroMessage.innerHTML = error.message
        });
    });

};
submitButton(PUTURL);
