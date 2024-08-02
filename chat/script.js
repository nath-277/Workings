function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('expanded');
}

function addToOrders(name, price, dailyProfit) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let walletBalance = parseInt(localStorage.getItem('walletBalance')) || 1000; // Default wallet balance

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
    let walletBalance = parseInt(localStorage.getItem('walletBalance')) || 1000; // Default wallet balance

    const order = orders[index];
    if (order) {
        walletBalance += order.price;
        orders.splice(index, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        localStorage.setItem('walletBalance', walletBalance);
        document.getElementById('wallet-balance').textContent = walletBalance;
        displayOrders(); // Refresh the order list without reloading the page
    }
}

function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderContent = document.getElementById('order-content');
    let walletBalance = parseInt(localStorage.getItem('walletBalance')) || 1000;

    document.getElementById('wallet-balance').textContent = walletBalance;

    if (orders.length === 0) {
        orderContent.innerHTML = `
            <img src="https://via.placeholder.com/100" alt="No Order" class="no-order-img">
            <p class="no-order-text">No available order</p>
            <button class="go-on-btn">Go On</button>
        `;
    } else {
        orderContent.innerHTML = orders.map((order, index) => `
            <div class="order-item">
                <img src="https://via.placeholder.com/100" alt="${order.name}" class="order-img">
                <div class="order-details">
                    <p>${order.name}</p>
                    <p>Price: ₦${order.price}</p>
                    <p>Daily Profit: ₦${order.dailyProfit}</p>
                    <button class="cancel-btn" onclick="cancelOrder(${index})">Cancel Order</button>
                </div>
            </div>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayOrders();
});
