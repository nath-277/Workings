function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('main-content');
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('collapsed');
}

function addToOrders(name, price, dailyProfit, imgUrl) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    let walletBalance = parseInt(localStorage.getItem('walletBalance')) || 1000; // Default wallet balance

    if (walletBalance >= price) {
        walletBalance -= price;
        orders.push({ name, price, dailyProfit, imgUrl });
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
            <h2 class="no-order-text">No available order
            <button class="go-on-btn"><a href="../index.html">Go On</a></button></h2>
        `;
    } else {
        orderContent.innerHTML = orders.map((order, index) => `
            <div class="order-item">
                <img src="${order.imgUrl}" alt="${order.name}" class="order-img">
                <div class="order-details">
                    <h3>${order.name}</h3>
                    <p>Price: ₦${order.price}</p>
                    <p>Daily Profit: ₦${order.dailyProfit}</p>
                </div>
                <button class="cancel-btn" onclick="cancelOrder(${index})">Cancel Order</button>
            </div>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    displayOrders();
});


document.addEventListener('DOMContentLoaded', function() {
    displayOrders();
});
