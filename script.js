const darkMode = document.querySelector("#dark-mode");
const body = document.querySelector("body");
const container = document.querySelector("#container");
const amount = document.querySelector("#input-amount");
const result = document.querySelector("#result");
const currencyRate = document.querySelector("#currency-rate");
const from = document.querySelector("#from");
const to = document.querySelector("#to");
const swap = document.querySelector("#swap");
const clearBtn = document.querySelector("#clear-input");

const inputs = document.querySelectorAll("input");
const selects = document.querySelectorAll("select");
const options = document.querySelectorAll("option");

function switchToDarkMode() {
  darkMode.classList.toggle("dark-mode-light");
  body.classList.toggle("dark-mode-body");
  container.classList.toggle("dark-mode-container");
  clearBtn.classList.toggle("dark-mode-clear");
  inputs.forEach((input) => {
    input.classList.toggle("dark-mode-input");
  });
  selects.forEach((select) => {
    select.classList.toggle("dark-mode-select");
  });
}

async function calculateCurrency() {
  const fromValue = from.value;
  const toValue = to.value;

  if (!Number(amount.value)) {
    alert("Input must be number!!!");
    result.innerHTML = "";
    clearBtn.classList.remove("show");
  } else if (amount.value === "") {
    result.innerHTML = "";
    clearBtn.classList.remove("show");
  } else {
    clearBtn.classList.add("show");
    const url = "https://open.er-api.com/v6/latest/";

    try {
      const response = await fetch(url + fromValue);
      if (!response.ok) throw new Error("Fetch Error!");
      const data = await response.json();
      const calculated = amount.value * data.rates[toValue.toUpperCase()];
      result.innerHTML = `💸${
        amount.value
      } ${fromValue.toUpperCase()} = ${calculated.toFixed(
        2
      )} ${toValue.toUpperCase()}`;
    } catch (err) {
      alert("Something went wrong: " + err.message);
    }
  }
}

//Switch to dark mode button
darkMode.addEventListener("click", () => {
  switchToDarkMode();
});

// Debounce timer – waits 500ms after the last keystroke
let debounceTimer;
amount.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    calculateCurrency();
  }, 500);
});

// Swaping currencies after clicking a button
swap.addEventListener("click", async () => {
  result.textContent = "";

  setTimeout(async () => {
    let temp = from.value;
    from.value = to.value;
    to.value = temp;
    await calculateCurrency();
  }, 300);
});

// Cleaning the input after clicking clear button

clearBtn.addEventListener("click", () => {
  amount.value = "";
  result.textContent = "";
  clearBtn.classList.remove("show");
});
