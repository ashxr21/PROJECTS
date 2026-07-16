let balance = 0;
const balanceEl = document.getElementById("balance-el");
const amountEl = document.getElementById("amount-el");
const depositBtn = document.getElementById("deposit-btn");
const historyList = document.getElementById("history-list");

depositBtn.addEventListener("click", deposit);

function deposit() {
    const amount = Number(amountEl.value);
    if (amount <= 0){
        alert("Please enter a valid amount.");
        return;
    }

    balance += amount;
    balanceEl.textContent = `$${balance}`;

    const transaction = document.createElement("li");
    transaction.textContent = `💰Deposited $${amount.toFixed(0)}`;
    historyList.prepend(transaction);

    amountInput.value = "";
}

function withdraw() {
    const amount = Number(amountEl.value);
    if (amount <= 0 || amount > balance) {
        alert("Insufficient Balance.");
        return;
    }

    balance -= amount;
    balanceEl.textContent = `$${balance}`;

    const transaction = document.createElement("li");
    transaction.textContent = `💸Withdrew $${amount.toFixed(1)}`;
    historyList.prepend(transaction);

    amountEl.value = "";
}
