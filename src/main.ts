//* Getting HTML elements
const togglePrefix = document.getElementById(
    "TogglePrefix"
) as HTMLInputElement | null;
const prefix = <HTMLInputElement | null>document.getElementById("Prefix");

const toggleSulfix = <HTMLInputElement | null>(
    document.getElementById("ToggleSulfix")
);
const sulfix = <HTMLInputElement | null>document.getElementById("Sulfix");
const separator = <HTMLInputElement | null>document.getElementById("Separator");
const symbolCheck = <HTMLInputElement | null>document.getElementById("Symbols");
const letterCheck = <HTMLInputElement | null>document.getElementById("Letters");
const numberCheck = <HTMLInputElement | null>document.getElementById("Numbers");
const lengthInput = <HTMLInputElement | null>document.getElementById("Length");
const generatePasswordBtn = <HTMLInputElement | null>(
    document.getElementById("GeneratePassword")
);
const passwordBox = <HTMLElement | null>document.getElementById("PasswordBox");
const copyBtn = <HTMLElement | null>document.getElementById("Copy");

//* Functions
function updateSelectState() {
    if (separator)
        separator.disabled = !(togglePrefix?.checked || toggleSulfix?.checked);
}

const getLetterCase = () => {
    const lowerCase: string = String.fromCharCode(
        Math.floor(Math.random() * 26) + 97
    );
    const upperCase: string = String.fromCharCode(
        Math.floor(Math.random() * 26) + 65
    );

    return { lowerCase, upperCase };
};

const getNumbers = (): string => {
    return Math.floor(Math.random() * 10).toString();
};

const getSymbols = (): string => {
    const symbols: string = "(){}[]=<>|/,.:;!$%¨&*+'~^";
    return symbols[Math.floor(Math.random() * symbols.length)];
};

const generateCustomHashPassword = () => {
    let password = "";
    let hashLength: number = 0;
    if (lengthInput) {
        hashLength = +lengthInput?.value as unknown as number;
    }

    const generators: any[] = [];

    if (symbolCheck?.checked) generators.push(() => getSymbols());
    if (letterCheck?.checked)
        generators.push(
            () => getLetterCase().upperCase,
            () => getLetterCase().lowerCase
        );
    if (numberCheck?.checked) generators.push(() => getNumbers());

    for (let i: number = 0; i < hashLength; i = i + generators.length) {
        generators.forEach(() => {
            const randomValue =
                generators[Math.floor(Math.random() * generators.length)];
            password += randomValue();
        });
    }

    const prefixValue = prefix?.value.trim();
    const sulfixValue = sulfix?.value.trim();
    const separatorValue = separator?.value.trim() || "";

    if (togglePrefix?.checked && prefixValue)
        password = `${prefixValue}${separatorValue}${password}`;

    if (toggleSulfix?.checked && sulfixValue)
        password = `${password}${separatorValue}${sulfixValue}`;

    if (passwordBox) {
        passwordBox.style.display = "flex";
        passwordBox.querySelector("h4")!.innerText = password;
    }
};

const errorMessage = (message: string) => {
    const errorBox = <HTMLElement | null>document.getElementById("ErrorBox");

    if (errorBox) {
        errorBox.querySelector("h4")!.innerText = message;
        errorBox.style.display = "flex";

        setTimeout(() => {
            errorBox.style.display = "none";
        }, 3000);
    }
};

//* Providing events
togglePrefix?.addEventListener("change", (event) => {
    updateSelectState();
    if (prefix) {
        prefix.disabled = !(event.target as HTMLInputElement).checked;
    }
});
toggleSulfix?.addEventListener("change", (event) => {
    updateSelectState();
    if (sulfix) {
        sulfix.disabled = !(event.target as HTMLInputElement).checked;
    }
});
try {
    generatePasswordBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        if (togglePrefix?.checked && !prefix?.value) {
            errorMessage("Se deseja um prefixo, preencha o campo!");
            return;
        }

        if (toggleSulfix?.checked && !sulfix?.value) {
            errorMessage("Se deseja um sulfixo, preencha o campo!");
            return;
        }

        if (
            !symbolCheck?.checked &&
            !letterCheck?.checked &&
            !numberCheck?.checked
        ) {
            errorMessage(
                "Escolha pelo menos uma opção entre símbolos, números ou letras"
            );
            return;
        }

        if (!lengthInput?.value) {
            errorMessage("Defina um tamanho para a criptografia da senha!");
            return;
        }
        generateCustomHashPassword();
    });
} catch (err: any) {
    console.log(err);
}
copyBtn?.addEventListener("click", (e) => {
    const password = passwordBox?.querySelector("h4")?.innerText;
    console.log(password, copyBtn);
    navigator.clipboard.writeText(password as unknown as string);
});
