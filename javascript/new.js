import {GETAPI, GETIMAGEAPI, GETAPRODUCTAPI, POSTAPI, getQSelector, getQSelectorAll, DELETEURL} from "../javascript/utils.js";

const allProductDiv = getQSelector(".diplay-every-roduct-dynamically");
const form = getQSelector("#new-product");
const erroMessage = getQSelector("#errorMessage");

window.addEventListener("DOMContentLoaded", function() {
    displayAllProducts(GETAPI);
    addNewProduct(POSTAPI);
});

const displayAllProducts = (GETURL) => {
    fetch(GETURL).then((response) => {
        return response.json();
    }).then((data) => {
        const output = data.map((value) => {
            return `
                <tr>
                <td id="count" >${value.id}</td>
                <td> <img src="${GETIMAGEAPI}${value.id}" class="photo" alt=""> </td>
                <td> ${value.name} </td>
                <td>${value.category}</td>
                <td>${value.description}</td>
                <td>
                    <button class="btn btn-primary edit" role="button" data-editid=${value.id}> Edit </button>
                    /
                    <button class="btn btn-danger delete" role="button" data-deleteid=${value.id} > Delete </button>
                </td>
                </tr>
            `;}).join("");
            allProductDiv.innerHTML = output;
            updateClick();
            deleteClick();

    }).catch((error) => {
        console.log(error);
    });
}; 

const addNewProduct = (POSTAPI) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formD = new FormData(form);

        fetch(POSTAPI, {
            method: "POST",
            body: formD
        }).then(async (response) => {
            if (response.ok) {
                window.location.reload();
                return response.json();
            }
            const body = await response.json();
            throw new Error(body.message);
        }).catch((error) => {
            erroMessage.innerHTML = error.message;
        });
    });

};

const updateClick = () => {
    const editBtns = getQSelectorAll(".edit");
    editBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const currentClicked = e.currentTarget.dataset.editid;
            const api = GETAPRODUCTAPI + currentClicked;

            fetch(api).then((response) => {
                return response.json();
            }).then((data) => {
                /**
                 * Local storage to export json to another page
                 */
                sessionStorage.setItem("DATA", JSON.stringify(data));
                window.location.href = "../static/edit.html"
            });
        });
    });
};


const deleteClick = () => {
    const deleteBtns = getQSelectorAll(".delete");
    deleteBtns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const currentClicked = e.currentTarget.dataset.deleteid
            const api = DELETEURL + currentClicked;

            fetch(api, {
                method: "DELETE"
            }).then((response) => {
                if (response.ok) {
                    window.location.reload();
                }
            })
        });
    });
};
