"use strict";
//* Getting HTML elements
const togglePrefix = document.getElementById("TogglePrefix");
const prefix = document.getElementById("Prefix");
const toggleSulfix = (document.getElementById("ToggleSulfix"));
const sulfix = document.getElementById("Sulfix");
const separator = document.getElementById("Separator");
const symbolCheck = document.getElementById("Symbols");
const letterCheck = document.getElementById("Letters");
const numberCheck = document.getElementById("Numbers");
const lengthInput = document.getElementById("Length");
const generatePasswordBtn = (document.getElementById("GeneratePassword"));
const passwordBox = document.getElementById("PasswordBox");
const copyBtn = document.getElementById("Copy");
//* Functions
function updateSelectState() {
    if (separator)
        separator.disabled = !((togglePrefix === null || togglePrefix === void 0 ? void 0 : togglePrefix.checked) || (toggleSulfix === null || toggleSulfix === void 0 ? void 0 : toggleSulfix.checked));
}
const getLetterCase = () => {
    const lowerCase = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    const upperCase = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    return { lowerCase, upperCase };
};
const getNumbers = () => {
    return Math.floor(Math.random() * 10).toString();
};
const getSymbols = () => {
    const symbols = "(){}[]=<>|/,.:;!$%¨&*+'~^";
    return symbols[Math.floor(Math.random() * symbols.length)];
};
const generateCustomHashPassword = () => {
    let password = "";
    let hashLength = 0;
    if (lengthInput) {
        hashLength = +(lengthInput === null || lengthInput === void 0 ? void 0 : lengthInput.value);
    }
    const generators = [];
    if (symbolCheck === null || symbolCheck === void 0 ? void 0 : symbolCheck.checked)
        generators.push(() => getSymbols());
    if (letterCheck === null || letterCheck === void 0 ? void 0 : letterCheck.checked)
        generators.push(() => getLetterCase().upperCase, () => getLetterCase().lowerCase);
    if (numberCheck === null || numberCheck === void 0 ? void 0 : numberCheck.checked)
        generators.push(() => getNumbers());
    for (let i = 0; i < hashLength; i = i + generators.length) {
        generators.forEach(() => {
            const randomValue = generators[Math.floor(Math.random() * generators.length)];
            password += randomValue();
        });
    }
    const prefixValue = prefix === null || prefix === void 0 ? void 0 : prefix.value.trim();
    const sulfixValue = sulfix === null || sulfix === void 0 ? void 0 : sulfix.value.trim();
    const separatorValue = (separator === null || separator === void 0 ? void 0 : separator.value.trim()) || "";
    if ((togglePrefix === null || togglePrefix === void 0 ? void 0 : togglePrefix.checked) && prefixValue)
        password = `${prefixValue}${separatorValue}${password}`;
    if ((toggleSulfix === null || toggleSulfix === void 0 ? void 0 : toggleSulfix.checked) && sulfixValue)
        password = `${password}${separatorValue}${sulfixValue}`;
    if (passwordBox) {
        passwordBox.style.display = "flex";
        passwordBox.querySelector("h4").innerText = password;
    }
};
const errorMessage = (message) => {
    const errorBox = document.getElementById("ErrorBox");
    if (errorBox) {
        errorBox.querySelector("h4").innerText = message;
        errorBox.style.display = "flex";
        setTimeout(() => {
            errorBox.style.display = "none";
        }, 3000);
    }
};
//* Providing events
togglePrefix === null || togglePrefix === void 0 ? void 0 : togglePrefix.addEventListener("change", (event) => {
    updateSelectState();
    if (prefix) {
        prefix.disabled = !event.target.checked;
    }
});
toggleSulfix === null || toggleSulfix === void 0 ? void 0 : toggleSulfix.addEventListener("change", (event) => {
    updateSelectState();
    if (sulfix) {
        sulfix.disabled = !event.target.checked;
    }
});
try {
    generatePasswordBtn === null || generatePasswordBtn === void 0 ? void 0 : generatePasswordBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if ((togglePrefix === null || togglePrefix === void 0 ? void 0 : togglePrefix.checked) && !(prefix === null || prefix === void 0 ? void 0 : prefix.value)) {
            errorMessage("Se deseja um prefixo, preencha o campo!");
            return;
        }
        if ((toggleSulfix === null || toggleSulfix === void 0 ? void 0 : toggleSulfix.checked) && !(sulfix === null || sulfix === void 0 ? void 0 : sulfix.value)) {
            errorMessage("Se deseja um sulfixo, preencha o campo!");
            return;
        }
        if (!(symbolCheck === null || symbolCheck === void 0 ? void 0 : symbolCheck.checked) &&
            !(letterCheck === null || letterCheck === void 0 ? void 0 : letterCheck.checked) &&
            !(numberCheck === null || numberCheck === void 0 ? void 0 : numberCheck.checked)) {
            errorMessage("Escolha pelo menos uma opção entre símbolos, números ou letras");
            return;
        }
        if (!(lengthInput === null || lengthInput === void 0 ? void 0 : lengthInput.value)) {
            errorMessage("Defina um tamanho para a criptografia da senha!");
            return;
        }
        generateCustomHashPassword();
    });
}
catch (err) {
    console.log(err);
}
copyBtn === null || copyBtn === void 0 ? void 0 : copyBtn.addEventListener("click", (e) => {
    var _a;
    const password = (_a = passwordBox === null || passwordBox === void 0 ? void 0 : passwordBox.querySelector("h4")) === null || _a === void 0 ? void 0 : _a.innerText;
    console.log(password, copyBtn);
    navigator.clipboard.writeText(password);
});
