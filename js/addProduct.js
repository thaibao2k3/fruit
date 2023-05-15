$(document).ready(function () {
    const notice = document.querySelector(".header__cart-notice");
    const count = document.getElementById("product-count");

    const imgNoCart = document.querySelector(".header__cart-list--no-cart-img");
    const msgNoCart = document.querySelector(".header__cart-list--no-cart-msg");

    const headingCart = document.querySelector(".header__cart-heading");
    const listItemCart = document.querySelector(".header__cart-list-item");

    const products =
        JSON.parse(localStorage.getItem("web_fruits_products")) || [];

    // /update notice
    function updateCart() {
        // console.log("upodating");
        notice.innerText = products.length;
        if (products.length > 0) {
            // console.log(products);
            imgNoCart.classList.add("d-none");
            msgNoCart.classList.add("d-none");

            headingCart.classList.remove("d-none");
            listItemCart.classList.remove("d-none");
            // ending reset

            // render product item
            products.forEach((product) => {
                const li = document.createElement("li");
                li.classList.add("header__cart-item");

                const img = document.createElement("img");
                img.setAttribute("src", product.src);
                img.setAttribute("alt", product.title);
                img.classList.add("header__cart-img");

                const itemInfo = document.createElement("div");
                itemInfo.classList.add("header__cart-item-info");

                const itemHead = document.createElement("div");
                itemHead.classList.add("header__cart-item-head");

                const h5 = document.createElement("h5");
                h5.classList.add("header__cart-item-name");
                h5.innerText = `${product.title}`;

                const itemWrap = document.createElement("div");
                itemWrap.classList.add("header__cart-item-wrap");

                const cartPrice = document.createElement("span");
                cartPrice.classList.add("header__cart-price");
                cartPrice.innerText = `${product.price}`;

                const cartMuti = document.createElement("span");
                cartMuti.classList.add("header__cart-muti");
                cartMuti.innerText = "x";

                const cartQnt = document.createElement("span");
                cartQnt.classList.add("header__cart-qnt");
                cartQnt.innerText = `${product.count}`;

                const itemBody = document.createElement("div");
                itemBody.classList.add("header__cart-item-body");

                const itemRemove = document.createElement("span");
                itemRemove.classList.add("header__cart-item-remove");
                itemRemove.innerText = "Xóa";

                itemWrap.appendChild(cartPrice);
                itemWrap.appendChild(cartMuti);
                itemWrap.appendChild(cartQnt);
                itemHead.appendChild(h5);
                itemHead.appendChild(itemWrap);

                itemBody.appendChild(itemRemove);

                itemInfo.appendChild(itemHead);
                itemInfo.appendChild(itemBody);

                li.appendChild(img);

                li.appendChild(itemInfo);
                listItemCart.appendChild(li);
            });
        } else {
            // console.log("empty");
            imgNoCart.classList.remove("d-none");
            msgNoCart.classList.remove("d-none");

            headingCart.classList.add("d-none");
            listItemCart.classList.add("d-none");
        }
    }
    updateCart();
    $("#liveToastBtn").click(() => {
        //dom
        $(".toast").toast("show");
        //logic
        const currentProduct = JSON.parse(
            localStorage.getItem("web_fruits_detail_product")
        );
        // remove old
        const items = document.querySelectorAll(".header__cart-item");
        Array.from(items).forEach((item) => item.remove());
        // simple check exist
        const check = products.findIndex(
            (product) => product.title === currentProduct.title
        );
        if (check >= 0) {
            products[check] = {
                ...currentProduct,
                count: count.value,
            };
        } else {
            products.push({
                ...currentProduct,
                count: count.value,
            });
        }
        console.log(check);
        console.log(products);
        localStorage.setItem("web_fruits_products", JSON.stringify(products));

        // /update notice
        updateCart();
    });

    // deleteProduct
    const deleteText = document.querySelectorAll(".header__cart-item-remove");

    const handleDeleteProduct = (array = []) => {
        array.forEach((deleteBtn, index) => {
            deleteBtn.onclick = () => {
                products.splice(index, 1);
                localStorage.setItem(
                    "web_fruits_products",
                    JSON.stringify(products)
                );
                document.location.reload();
            };
        });
    };
    handleDeleteProduct([...deleteText]);
});