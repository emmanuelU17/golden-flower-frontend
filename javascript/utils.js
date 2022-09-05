export const GETAPI = "http://localhost:8080/unsecured/api/v1/products";
export const GETIMAGEAPI = "http://localhost:8080/unsecured/api/v1/get/image/";
export const GETAPRODUCTAPI = "http://localhost:8080/secured/api/v2/product/";
export let POSTAPI = "http://localhost:8080/secured/api/v2/addNew";
export const PUTURL = "http://localhost:8080/secured/api/v2/edit/";
export const DELETEURL = "http://localhost:8080/secured/api/v2/delete/";


export function getQSelector(querySelector) {
    const element = document.querySelector(querySelector);
    if (element) {
        return element;
    } else {
        return Error("invalid tag");
    }
}

export function getQSelectorAll(querySelectorAll) {
    const element = document.querySelectorAll(querySelectorAll);
    if (element) {
        return element;
    } else {
        return Error("invalid tag");
    }
}
