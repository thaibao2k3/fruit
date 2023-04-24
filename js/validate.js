function Validator(formid, option) {
    const formRules = {};
    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    const validatorRules = {
        noSpaceStart: (value) => {
            return !value.startsWith(" ")
                ? undefined
                : "Không bắt đầu bằng khoảng cách";
        },
        required: (value) => {
            return value.trim() ? undefined : "Vui lòng nhập trường này";
        },
        email: (value) => {
            if (value) {
                const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                return regex.test(value) ? undefined : "Email không hợp lệ";
            }
        },
        min: (min) => {
            return (value) => {
                return value.length >= min
                    ? undefined
                    : `Vui lòng nhập ít nhất ${min} ký tự`;
            };
        },
        matches: (value) => {
            const password = document.getElementById("password").value;
            return value === password
                ? undefined
                : "Mật khẩu nhập lại không chính xác";
        },
    };
    const formElement = document.querySelector(formid);
    if (formElement) {
        const inputs = formElement.querySelectorAll("[name][rules]");
        if (inputs) {
            for (let input of inputs) {
                const rules = input.getAttribute("rules").split("|");
                for (let rule of rules) {
                    const isRuleHasValue = rule.includes(":");
                    let ruleInfo;
                    if (isRuleHasValue) {
                        ruleInfo = rule.split(":");
                        rule = ruleInfo[0];
                    }
                    let ruleFunc = validatorRules[rule];
                    if (isRuleHasValue) {
                        ruleFunc = ruleFunc(ruleInfo[1]);
                    }
                    if (Array.isArray(formRules[input.name])) {
                        formRules[input.name].push(ruleFunc);
                    } else {
                        formRules[input.name] = [ruleFunc];
                    }
                }
                input.onblur = handleValidate;
                input.oninput = handleClearError;
            }
        }
        function handleValidate(event) {
            const target = event.target || event;
            const rules = formRules[target.name];
            let errorMessage;
            for (let rule of rules) {
                errorMessage = rule(target.value);
                if (errorMessage) break;
            }
            if (errorMessage) {
                const formGroup = getParent(target, ".form-group");
                if (formGroup) {
                    formGroup.classList.add("invalid");
                    const message = formGroup.querySelector(".form-message");
                    const check = formGroup.querySelector(".form-check");
                    if (check) {
                        check.style.display = "none";
                    }
                    if (message) {
                        message.innerText = errorMessage;
                    }
                }
                return false;
            } else {
                if (target.value) {
                    const formGroup = getParent(target, ".form-group");
                    if (formGroup) {
                        formGroup.classList.add("valid");
                        const check = formGroup.querySelector(".form-check");
                        if (check) {
                            check.style.display = "block";
                        }
                    }
                    return true;
                } else {
                    return false;
                }
            }
        }
        function handleClearError(event) {
            const formGroup = getParent(event.target, ".form-group");
            if (formGroup.classList.contains("invalid")) {
                formGroup.classList.remove("invalid");
                const message = formGroup.querySelector(".form-message");
                const check = formGroup.querySelector(".form-check");
                if (check) {
                    check.style.display = "none";
                }
                if (message) {
                    message.innerText = "";
                }
            }
        }
        formElement.onsubmit = function (event) {
            event.preventDefault();
            const results = [];
            console.log(event);
            for (let input of inputs) {
                console.log(input);
                let isCheck = handleValidate(input);
                results.push(isCheck);
            }
            if (results.every((result) => result === true)) {
                console.log("all good");
                console.log(event);
                if (option) {
                    window.location.replace(option.replace);
                }
            } else {
                console.log("wrong!!!");
                console.log("do nothing");
            }
        };
    }
}
Validator("#form-sign-in", {
    replace: "../html/fruits.html",
});
Validator("#form-log-in", {
    replace: "../html/fruits.html",
});
Validator("#form-pay");
Validator("#form-search");
Validator("#form-email-footer");
