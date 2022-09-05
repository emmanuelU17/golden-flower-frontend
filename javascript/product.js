import { GETAPI, GETIMAGEAPI, getQSelector } from "../javascript/utils.js";

const productBtnContainer = getQSelector(".btn-container");
const productsSection = getQSelector(".products-section");


window.addEventListener("DOMContentLoaded", function() {
    displayAllProductFromAPI(GETAPI);
});

function displayAllProductFromAPI(url) {
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        displayFood(data);
        displayFoodButtons(data);
    }).catch((error) => {
        console.log(error);
    });
}

function displayFood(data) {
    var display = data.map((item) => {
        return `<div class="products-section-body">
                <img src="${GETIMAGEAPI}${item.id}" class="photo">
                <div class="products-section-details">
                    <header>
                        <h4>${item.name}</h4>
                        <h4 class="price">${item.category}</h4>
                    </header>
                    <p>${item.description}</p>
                </div>
            </div>`;
    }).join("");
    productsSection.innerHTML = display;
}

function displayFoodButtons(p) {
    const categories = p.reduce(function(values, item) {
            if (!values.includes(item.category)) {
                values.push(item.category);
            }
            return values;
        }, ["all"]);

    const categoryButtons = categories.map(function (category) {
                return `
                        <div class="btn-container" >
                            <button type="button" class="product-btn" data-id=${category}>${category}</button>
                        </div>
                `;
            }).join("");

    productBtnContainer.innerHTML = categoryButtons;

    const filterButtons = productBtnContainer.querySelectorAll(".product-btn");
    filterButtons.forEach(function(btn) {
                    btn.addEventListener("click", function(e) {
                        const category = e.currentTarget.dataset.id;
                        var menuCategory = p.filter(function(menuItem){
                            if(menuItem.category === category) {
                                return menuItem;
                            }
                        });
                        if(category === "all") {
                            displayFood(p);
                        } else {
                            displayFood(menuCategory);
                        }
                    });
                });

}
