const select = document.querySelectorAll(".currency");
const btn = document.getElementById("btn");
const currSource = document.getElementById("sourceCurrency");
const currDestination = document.getElementById("destinationCurrency");
const conversionRate = document.getElementById("conversionRate");
const sourceInput = document.getElementById("sourceInput");
const destinationInput = document.getElementById("destinationInput");
const timeStamp = document.getElementById("timeStamp")

function getRate(convert = false) {
  fetch(`https://www.floatrates.com/daily/${currSource.value}.json`)
    .then((res) => res.json())
    .then((data) => {
      const destinationVal = currDestination.value;
      const rate = data[destinationVal.toLowerCase()].rate.toFixed(2);
      conversionRate.innerHTML = `1 ${currSource.value} = ${rate} ${destinationVal}`;
      timeStamp.innerHTML = `Last Converted: ${new Date().toLocaleString()}`

      if (convert && !isNaN(parseFloat(sourceInput.value))) {
        destinationInput.value = parseFloat(sourceInput.value) * rate;
      }
    });
}

fetch("https://api.frankfurter.app/currencies")
  .then((data) => data.json())
  .then((data) => {
    display(data);
    getRate();
  });

function display(data) {
  const entries = Object.entries(data);
  const source = "GBP";
  const destination = "USD";

  for (var i = 0; i < entries.length; i++) {
    select[0].innerHTML +=
      entries[i][0] === source
        ? `<option selected value="${entries[i][0]}">${entries[i][0]}</Option>`
        : `<option value="${entries[i][0]}">${entries[i][0]}</Option>`;
    select[1].innerHTML +=
      entries[i][0] === destination
        ? `<option selected value="${entries[i][0]}">${entries[i][0]}</Option>`
        : `<option value="${entries[i][0]}">${entries[i][0]}</Option>`;
  }
}

btn.addEventListener("click", () => {
  let sourceCurrency = currSource.value;
  let destinationCurrency = currDestination.value;

  if (sourceCurrency === destinationCurrency) {
    alert("Please choose a different currency");
    return;
  }
  getRate(true);
});

currSource.addEventListener("change", () => {
  getRate();
});
