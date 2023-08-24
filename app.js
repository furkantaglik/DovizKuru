const firstCurrency = document.querySelector("#firstCurrencyOption");
const secondCurrency = document.querySelector("#secondCurrencyOption");
const amount = document.querySelector("#amount");
const resultInput = document.querySelector("#result");

runEventListener();

function runEventListener() {
    document.addEventListener("DOMContentLoaded", pageLoaded);
    amount.addEventListener("input", () => {
        exchange(amount.value, firstCurrency.value, secondCurrency.value);
    });
    firstCurrency.addEventListener("input", () => {
        exchange(amount.value, firstCurrency.value, secondCurrency.value);
    });
    secondCurrency.addEventListener("input", () => {
        exchange(amount.value, firstCurrency.value, secondCurrency.value);
    });
}

async function pageLoaded() {
    const result = await (await fetch("https://api.freecurrencyapi.com/v1/latest?apikey=hil9Hb1ZuVZCNb9fm51E97Cjiygp1cNZhn74cAzV")).json();
    const currencies = Object.keys(result.data);

    for (let currency of currencies) {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        firstCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        secondCurrency.appendChild(option2);
    }

    firstCurrency.value = "USD";
    secondCurrency.value = "TRY";
    amount.value = "";

    exchange(amount.value, firstCurrency.value, secondCurrency.value);
}

async function exchange(amount, firstCurrency, secondCurrency) {
    const url = await (await fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=hil9Hb1ZuVZCNb9fm51E97Cjiygp1cNZhn74cAzV&base_currency=${firstCurrency}`)).json();
    console.log(amount * url.data[secondCurrency]);

    let result = amount * url.data[secondCurrency];
    showUI(result);
}


async function showUI(result) {
    resultInput.value = result;
}