function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
}

function addToOrders(name, price, dailyProfit) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let walletBalance = parseInt(localStorage.getItem('walletBalance')) || 100000; // Default wallet balance

    if (walletBalance >= price) {
        walletBalance -= price;
        orders.push({ name, price, dailyProfit });
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('walletBalance', walletBalance);
        document.getElementById('wallet-balance').textContent = walletBalance;
        alert('Order added successfully!');
    } else {
        alert('Insufficient wallet balance!');
    }
}

function cancelOrder(index) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let walletBalance = parseInt(localStorage.getItem('walletBalance')) || 100000; // Default wallet balance

    const order = orders[index];
    if (order) {
        walletBalance += order.price;
        orders.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('walletBalance', walletBalance);
        document.getElementById('wallet-balance').textContent = walletBalance;
        location.reload(); // Refresh the page to update the order list
    }
}

document.addEventListener('DOMContentLoaded', function() {
    let walletBalance = parseInt(localStorage.getItem('walletBalance')) || 100000; // Default wallet balance
    document.getElementById('wallet-balance').textContent = walletBalance;
});
