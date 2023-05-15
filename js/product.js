const WEB_FRUITS_PRODUCTS = "web_fruits_products";
const WEB_FRUITS_DETAIL_PRODUCT = "web_fruits_detail_product";

const productsElement = document.querySelectorAll(".product-item");

function getParent(element, selector) {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}
Array.from(productsElement).forEach((product) => {
    product.onclick = (e) => {
        let target = e.target;
        target = getParent(target, ".product-item");
        console.log(target);
        const imgElement = target.querySelector(".card-img-top");
        const titleElement = target.querySelector(".card-title");
        const priceElement = target.querySelector(".card-price");

        const src = imgElement.getAttribute("src");
        const title = titleElement.innerText;
        const price = priceElement.innerText;
        const data = {
            src,
            title,
            price,
        };
        localStorage.setItem(WEB_FRUITS_DETAIL_PRODUCT, JSON.stringify(data));
        console.log(data);
        // Redirect to detailFruit
    };
});
