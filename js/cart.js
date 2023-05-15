$(document).ready(() => {
    const products =
        JSON.parse(localStorage.getItem("web_fruits_products")) || [];
    const cartProducts = document.getElementById("cart-products");
    if (products.length > 0) {
        $("#form-pay").show();
        $("#no-cart").hide();
        // render cart
        products.forEach((product, index) => {
            // td sum
            const tdSum = document.createElement("td");
            tdSum.classList.add("d-none");
            tdSum.classList.add("d-lg-table-cell");
            tdSum.classList.add("td-sum");

            const spanSum = document.createElement("span");
            spanSum.classList.add("sum");
            spanSum.classList.add("col-center");
            spanSum.innerText = `000`;

            tdSum.appendChild(spanSum);
            // td Price
            const tdPrice = document.createElement("td");
            tdPrice.classList.add("d-none");
            tdPrice.classList.add("d-lg-table-cell");
            tdPrice.classList.add("td-price");
            const spanPrice = document.createElement("span");
            spanPrice.classList.add("price");
            spanPrice.classList.add("col-center");
            spanPrice.innerText = `${product.price}`;

            tdPrice.appendChild(spanPrice);
            // td count
            const tdCount = document.createElement("td");
            const productCount = document.createElement("div");
            productCount.classList.add("product__count");
            productCount.classList.add("col-center");

            const input = document.createElement("input");
            input.classList.add("count-input");
            input.setAttribute("type", "number");
            input.setAttribute("name", "count-input");
            input.setAttribute("id", `product-count-${index + 1}`);
            input.setAttribute("step", "1");
            input.setAttribute("min", "1");
            input.setAttribute("value", `${product.count}`);
            const downBtn = document.createElement("button");
            downBtn.classList.add("down-btn");
            downBtn.innerText = "-";
            const upBtn = document.createElement("button");
            upBtn.innerText = "+";
            upBtn.classList.add("up-btn");

            productCount.appendChild(downBtn);
            productCount.appendChild(input);
            productCount.appendChild(upBtn);
            tdCount.appendChild(productCount);

            // td
            const td = document.createElement("td");
            const img = document.createElement("img");
            img.setAttribute("src", product.src);
            img.setAttribute("alt", product.title);

            const h2 = document.createElement("h2");
            h2.classList.add("product-title");
            h2.classList.add("d-inline-block");

            h2.innerText = `${product.title}`;

            const itemImg = document.createElement("div");
            itemImg.classList.add("cart-product-item__img");
            itemImg.classList.add("d-flex");
            itemImg.classList.add("align-items-center");

            const span = document.createElement("span");
            span.classList.add("d-flex");
            span.classList.add("d-lg-none");

            const count = document.createElement("span");
            count.classList.add("count");
            count.innerText = `${product.count}`;

            const muti = document.createElement("span");
            muti.classList.add("muti");
            muti.innerText = `x`;

            const price = document.createElement("span");
            price.classList.add("price");
            price.innerText = `${product.price}`;

            const wrap = document.createElement("div");
            wrap.classList.add("product-wrap");
            wrap.appendChild(h2);
            wrap.appendChild(span);

            span.appendChild(count);
            span.appendChild(muti);
            span.appendChild(price);

            itemImg.appendChild(img);
            itemImg.appendChild(wrap);

            td.appendChild(itemImg);

            // th
            const th = document.createElement("th");
            th.classList.add("d-none");
            th.classList.add("d-lg-table-cell");
            th.setAttribute("scope", "row");
            const thSpan = document.createElement("span");
            thSpan.classList.add("col-center");
            thSpan.innerText = `${index + 1}`;
            th.appendChild(thSpan);
            // tr
            const tr = document.createElement("tr");
            tr.classList.add("cart-product-item");

            // delete product
            const button = document.createElement("button");
            const icon = document.createElement("i");
            icon.classList.add("ti-trash");
            button.classList.add("delete-product-btn");
            button.appendChild(icon);

            tr.appendChild(th);
            tr.appendChild(td);
            tr.appendChild(tdCount);
            tr.appendChild(tdPrice);
            tr.appendChild(tdSum);
            tr.appendChild(button);
            cartProducts.appendChild(tr);
        });
    } else {
        $("#form-cart").hide();
        $("#no-cart").show();
        console.log("empty");
    }

    function convertToNumber(string) {
        const number = string.split(".").join("");
        return Number.parseInt(number);
    }
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    // render sum
    let tmpSum = 0;
    const sums = $(".sum");
    console.log({ sums });
    [...sums].forEach((sum, index) => {
        const parent = getParent(sum, ".cart-product-item");
        const count = products[index].count;
        const price = parent.querySelector(".price").innerText;
        console.log({ price });
        const result = convertToNumber(price) * Number.parseInt(count);
        console.log({ result });
        tmpSum += result;
        const intlSum = result.toLocaleString("it-IT", {
            style: "currency",
            currency: "VND",
        });
        console.log({ intlSum });
        sum.innerText = `${intlSum}`;
    });

    const tmpSumElement = document.querySelector(".tmp-sum");
    const intlTmpSum = tmpSum.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
    });
    tmpSumElement.innerText = `${intlTmpSum}`;
    const cost = document.querySelector(".cost").innerText;

    const total = tmpSum - Number.parseInt(cost);
    const intlTotal = total.toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
    });

    const totalElement = document.querySelector(".total");
    totalElement.innerText = `${intlTotal}`;

    const costElement = document.querySelector(".cost");
    const intlCost = Number.parseInt(cost).toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
    });
    costElement.innerText = `${intlCost}`;
    // btns
    const downBtns = $(".down-btn");
    [...downBtns].forEach((downBtn, index) => {
        downBtn.onclick = () => {
            document.querySelector(`#product-count-${index + 1}`).stepDown();
        };
    });
    const upBtns = $(".up-btn");
    [...upBtns].forEach((upBtn, index) => {
        upBtn.onclick = () => {
            document.querySelector(`#product-count-${index + 1}`).stepUp();
        };
    });

    // delete product
    const deleteBtns = document.querySelectorAll(".delete-product-btn");

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
    handleDeleteProduct([...deleteBtns]);
    // edit product
    const inputs = document.querySelectorAll(".count-input");
    const newCount = [];
    const editBtn = document.querySelector(".edit-product-btn");
    editBtn.onclick = () => {
        [...inputs].forEach((input, index) => {
            newCount[index] = input.value;
        });
        const newProducts = products.map((product, index) => ({
            ...product,
            count: newCount[index],
        }));
        localStorage.setItem(
            "web_fruits_products",
            JSON.stringify(newProducts)
        );
        document.location.reload();
    };
});
