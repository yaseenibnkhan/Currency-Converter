const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const btn = document.querySelector("form button")
const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "PKR") {
            newOption.selected = "selected"
        }
        select.append(newOption);
    };

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

};



const updateExchangeRate = async () => {
    let amount = document.querySelector("form input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const fromCode = fromCurr.value.toLowerCase();
    const toCode = toCurr.value.toLowerCase();


    const URL = `${BASE_URL}/${fromCode}.json`;

    try {
        let response = await fetch(URL);
        
        if (!response.ok) throw new Error("Network response was not ok");

        let data = await response.json();
        
        // Data access karne ka sahi tarika
        let rate = data[fromCode][toCode];
        
        let finalAmount = (amtVal * rate).toFixed(2);
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
        
    } catch (error) {
        msg.innerText = "Error: API Response nahi mil rahi.";
        console.error("Fetch Error:", error);
    }
};

window.addEventListener("load", () => {
    updateExchangeRate();
});

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
    
});