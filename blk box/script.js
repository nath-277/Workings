const balanceDisplay = document.getElementById('balance');
const rechargeButton = document.getElementById('recharge');
const stockTableBody = document.getElementById('stockTableBody');
const transactionList = document.getElementById('transactionList');

// Sample stock data (you'll need to fetch real data from an API)
const stocks = [
    { company: 'Apple', price: 175, dailyProfit: 5, totalReturns: 20 },
    { company: 'Microsoft', price: 300, dailyProfit: 10, totalReturns: 30 },
    { company: 'Google', price: 250, dailyProfit: 8, totalReturns: 25 }
];

// Load initial balance
let balance = 1000;
balanceDisplay.textContent = '₦' + balance;

// Function to display stock data
function displayStocks() {
    stockTableBody.innerHTML = ''; // Clear previous data

    stocks.forEach(stock => {
        const row = document.createElement('tr');

        const companyCell = document.createElement('td');
        companyCell.textContent = stock.company;
        row.appendChild(companyCell);

        const priceCell = document.createElement('td');
        priceCell.textContent = '₦' + stock.price;
        row.appendChild(priceCell);

        const dailyProfitCell = document.createElement('td');
        dailyProfitCell.textContent = '₦' + stock.dailyProfit;
        row.appendChild(dailyProfitCell);

        const totalReturnsCell = document.createElement('td');
        totalReturnsCell.textContent = '₦' + stock.totalReturns;
        row.appendChild(totalReturnsCell);

        const actionCell = document.createElement('td');
        const buyButton = document.createElement('button');
        buyButton.textContent = 'Buy';
        buyButton.addEventListener('click', () => {
            // Handle buying stock logic here
        });
        actionCell.appendChild(buyButton);
        row.appendChild(actionCell);

        stockTableBody.appendChild(row);
    });
}

// Function to display transaction history
function displayTransactions() {
    transactionList.innerHTML = ''; // Clear previous data

    // Example transactions (you'll need to fetch real data)
    const transactions = [
        { type: 'Buy', company: 'Apple', amount: 100, date: '2023-07-28' },
        { type: 'Sell', company: 'Microsoft', amount: 50, date: '2023-07-27' }
    ];

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.textContent = `${transaction.type} ${transaction.company} - ₦${transaction.amount} (${transaction.date})`;
        transactionList.appendChild(listItem);
    });
}

// Load initial data
displayStocks();
displayTransactions();

// Recharge functionality
rechargeButton.addEventListener('click', () => {
    // Prompt user for recharge amount
    const rechargeAmount = prompt("Enter recharge amount:");

    // Validate input
    if (!isNaN(rechargeAmount) && rechargeAmount > 0) {
        balance += parseFloat(rechargeAmount);
        balanceDisplay.textContent = '₦' + balance;
        alert("Recharge successful!");
    } else {
        alert("Invalid recharge amount.");
    }
});