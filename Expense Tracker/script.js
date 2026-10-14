// ========================================
// SPENDLY - EXPENSE TRACKER
// ========================================


// ========================================
// ELEMENTS
// ========================================

const transactionForm = document.getElementById("transaction-form");

const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");

const balanceDisplay = document.getElementById("balance");
const incomeDisplay = document.getElementById("income");
const expensesDisplay = document.getElementById("expenses");

const typeOptions = document.querySelectorAll(".type-option");

const navLinks = document.querySelectorAll(".nav-link");

const emptyState = document.querySelector(".empty-state");

const transactionsCard =
    document.querySelector(".transactions-card");

const formCard =
    document.querySelector(".form-card");

const breakdownCard =
    document.querySelector(".breakdown-card");

const budgetCard =
    document.querySelector(".budget-card");

const bottomGrid =
    document.querySelector(".bottom-grid");

const dashboardGrid =
    document.querySelector(".dashboard-grid");

const addButton =
    document.querySelector(".add-btn");

const emptyButton =
    document.querySelector(".empty-btn");

const viewButton =
    document.querySelector(".view-btn");

const budgetButton =
    document.querySelector(".budget-btn");

const settingsButton =
    document.querySelector(".settings-btn");


// ========================================
// DATA
// ========================================

let transactions = [];

let transactionType = "expense";

let budget = 0;


// ========================================
// SIDEBAR NAVIGATION
// ========================================

navLinks.forEach((link, index) => {

    link.addEventListener("click", function(event) {

        event.preventDefault();


        // Remove active from every link

        navLinks.forEach(nav => {
            nav.classList.remove("active");
        });


        // Make clicked link active

        link.classList.add("active");


        // Determine which page was clicked

        switch(index) {

            case 0:
                showDashboard();
                break;

            case 1:
                showTransactions();
                break;

            case 2:
                showCategories();
                break;

            case 3:
                showSettings();
                break;

        }

    });

});


// ========================================
// DASHBOARD
// ========================================

function showDashboard() {

    document.querySelector(".eyebrow").textContent =
        "Dashboard";

    dashboardGrid.style.display = "grid";

    bottomGrid.style.display = "grid";

}


// ========================================
// TRANSACTIONS
// ========================================

function showTransactions() {

    document.querySelector(".eyebrow").textContent =
        "Transactions";

    dashboardGrid.style.display = "grid";

    bottomGrid.style.display = "none";


    // Scroll to transactions

    transactionsCard.scrollIntoView({
        behavior: "smooth"
    });

}


// ========================================
// CATEGORIES
// ========================================

function showCategories() {

    document.querySelector(".eyebrow").textContent =
        "Categories";


    // Keep the transaction section visible

    dashboardGrid.style.display = "grid";

    bottomGrid.style.display = "grid";


    breakdownCard.scrollIntoView({
        behavior: "smooth"
    });

}


// ========================================
// SETTINGS
// ========================================

function showSettings() {

    document.querySelector(".eyebrow").textContent =
        "Settings";


    dashboardGrid.style.display = "none";

    bottomGrid.style.display = "none";


    alert("Settings page coming soon.");

}


// ========================================
// TRANSACTION TYPE
// ========================================

typeOptions.forEach(button => {

    button.addEventListener("click", function() {

        // Remove active from both

        typeOptions.forEach(option => {
            option.classList.remove("active");
        });


        // Activate clicked button

        button.classList.add("active");


        // Store selected type

        transactionType =
            button.dataset.type;


        // Change form depending on type

        updateTransactionForm();

    });

});


// ========================================
// UPDATE FORM
// ========================================

function updateTransactionForm() {

    const categoryGroup =
        categoryInput.closest(".form-group");


    if (transactionType === "income") {

        // Hide category

        categoryGroup.style.display = "none";


        // Remove category requirement

        categoryInput.required = false;


        // Change placeholder

        descriptionInput.placeholder =
            "e.g. Allowance";


    } else {

        // Show category

        categoryGroup.style.display = "block";


        // Category required for expenses

        categoryInput.required = true;


        // Restore placeholder

        descriptionInput.placeholder =
            "e.g. Groceries";

    }

}


// ========================================
// ADD TRANSACTION
// ========================================

transactionForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const description =
        descriptionInput.value.trim();

    const amount =
        Number(amountInput.value);

    const category =
        categoryInput.value;


    // Validation

    if (description === "") {

        alert("Please enter a description.");

        return;

    }


    if (isNaN(amount) || amount <= 0) {

        alert("Please enter a valid amount.");

        return;

    }


    if (
        transactionType === "expense" &&
        category === ""
    ) {

        alert("Please select a category.");

        return;

    }


    // Create transaction object

    const transaction = {

        id: Date.now(),

        description: description,

        amount: amount,

        category:
            transactionType === "expense"
                ? category
                : null,

        type: transactionType

    };


    // Add to array

    transactions.push(transaction);


    // Update everything

    updateDashboard();

    renderTransactions();

    updateBreakdown();


    // Reset form

    transactionForm.reset();


    // Return to expense

    transactionType = "expense";


    typeOptions.forEach(option => {
        option.classList.remove("active");
    });


    document
        .querySelector('[data-type="expense"]')
        .classList.add("active");


    updateTransactionForm();

});


// ========================================
// UPDATE DASHBOARD
// ========================================

function updateDashboard() {

    let income = 0;

    let expenses = 0;


    transactions.forEach(transaction => {

        if (transaction.type === "income") {

            income += transaction.amount;

        } else {

            expenses += transaction.amount;

        }

    });


    const balance =
        income - expenses;


    balanceDisplay.textContent =
        formatMoney(balance);

    incomeDisplay.textContent =
        formatMoney(income);

    expensesDisplay.textContent =
        formatMoney(expenses);

}


// ========================================
// RENDER TRANSACTIONS
// ========================================

function renderTransactions() {

    const oldList =
        document.querySelector(".transaction-list");


    if (oldList) {
        oldList.remove();
    }


    if (transactions.length === 0) {

        emptyState.style.display = "flex";

        return;

    }


    emptyState.style.display = "none";


    const list =
        document.createElement("div");

    list.className =
        "transaction-list";


    const reversed =
        [...transactions].reverse();


    reversed.forEach(transaction => {

        const item =
            document.createElement("div");

        item.className =
            "transaction-item";


        const sign =
            transaction.type === "income"
                ? "+"
                : "-";


        const amountClass =
            transaction.type === "income"
                ? "transaction-income"
                : "transaction-expense";


        const categoryText =
            transaction.category
                ? capitalize(transaction.category)
                : "Income";


        item.innerHTML = `

            <div class="transaction-info">

                <div class="transaction-icon">
                    ${getCategoryIcon(transaction.category)}
                </div>

                <div>

                    <h4>
                        ${transaction.description}
                    </h4>

                    <p>
                        ${categoryText}
                    </p>

                </div>

            </div>


            <div class="transaction-right">

                <span class="${amountClass}">
                    ${sign}${formatMoney(transaction.amount)}
                </span>

                <button
                    class="delete-btn"
                    data-id="${transaction.id}"
                >
                    ×
                </button>

            </div>

        `;


        list.appendChild(item);

    });


    transactionsCard.appendChild(list);


    // Delete buttons

    document
        .querySelectorAll(".delete-btn")
        .forEach(button => {

            button.addEventListener("click", function() {

                const id =
                    Number(button.dataset.id);


                transactions =
                    transactions.filter(transaction =>
                        transaction.id !== id
                    );


                updateDashboard();

                renderTransactions();

                updateBreakdown();

            });

        });

}


// ========================================
// SPENDING BREAKDOWN
// ========================================

function updateBreakdown() {

    const breakdownEmpty =
        document.querySelector(".breakdown-empty");


    const expenses =
        transactions.filter(transaction =>
            transaction.type === "expense"
        );


    if (expenses.length === 0) {

        breakdownEmpty.innerHTML = `

            <div class="chart-placeholder">
                <span>₱</span>
            </div>

            <p>
                Your spending breakdown will
                appear here.
            </p>

        `;

        return;

    }


    // Calculate category totals

    const categories = {};


    expenses.forEach(transaction => {

        if (!categories[transaction.category]) {

            categories[transaction.category] = 0;

        }


        categories[transaction.category] +=
            transaction.amount;

    });


    // Build breakdown

    let html = "";


    Object.entries(categories).forEach(
        ([category, amount]) => {

            html += `

                <div class="breakdown-row">

                    <span>
                        ${getCategoryIcon(category)}
                        ${capitalize(category)}
                    </span>

                    <strong>
                        ${formatMoney(amount)}
                    </strong>

                </div>

            `;

        }
    );


    breakdownEmpty.innerHTML = html;

}


// ========================================
// BUDGET
// ========================================

budgetButton.addEventListener("click", setBudget);

settingsButton.addEventListener("click", setBudget);


function setBudget() {

    const value =
        prompt("Enter your monthly budget:");


    if (value === null) {
        return;
    }


    const amount =
        Number(value);


    if (isNaN(amount) || amount <= 0) {

        alert("Please enter a valid budget.");

        return;

    }


    budget = amount;


    updateBudget();

}


function updateBudget() {

    const budgetEmpty =
        document.querySelector(".budget-empty");


    const expenses =
        transactions
            .filter(transaction =>
                transaction.type === "expense"
            )
            .reduce(
                (total, transaction) =>
                    total + transaction.amount,
                0
            );


    const percentage =
        Math.min(
            (expenses / budget) * 100,
            100
        );


    budgetEmpty.innerHTML = `

        <div class="budget-progress">

            <div class="budget-top">

                <span>
                    ${formatMoney(expenses)}
                </span>

                <span>
                    ${formatMoney(budget)}
                </span>

            </div>


            <div class="budget-bar">

                <div
                    class="budget-fill"
                    style="width: ${percentage}%"
                ></div>

            </div>


            <p>
                ${Math.round(percentage)}%
                of your budget used
            </p>

        </div>

    `;

}


// ========================================
// ADD BUTTON
// ========================================

addButton.addEventListener("click", function() {

    formCard.scrollIntoView({
        behavior: "smooth"
    });


    descriptionInput.focus();

});


// ========================================
// EMPTY STATE BUTTON
// ========================================

emptyButton.addEventListener("click", function() {

    formCard.scrollIntoView({
        behavior: "smooth"
    });


    descriptionInput.focus();

});


// ========================================
// VIEW ALL
// ========================================

viewButton.addEventListener("click", function() {

    transactionsCard.scrollIntoView({
        behavior: "smooth"
    });

});


// ========================================
// HELPERS
// ========================================

function formatMoney(amount) {

    return "₱" +
        amount.toLocaleString("en-PH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

}


function capitalize(text) {

    if (!text) {
        return "";
    }

    return text.charAt(0).toUpperCase()
        + text.slice(1);

}


function getCategoryIcon(category) {

    const icons = {

        food: "🍔",

        transportation: "🚗",

        shopping: "🛍️",

        bills: "📄",

        entertainment: "🎮",

        health: "❤️",

        other: "📌"

    };


    return icons[category] || "💰";

}


// ========================================
// INITIAL STATE
// ========================================

updateTransactionForm();

updateDashboard();
