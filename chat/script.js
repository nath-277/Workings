document.addEventListener('DOMContentLoaded', () => {
    loadOrders();
    updateWalletBalance();
});

function toggleMenu() {
    const menu = document.querySelector('#navbar .menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

function navigateTo(page) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.style.display = 'none');
    document.getElementById(page).style.display = 'block';
}

function placeOrder(name, price, imageUrl) {
    const walletBalanceElem = document.getElementById('wallet-balance');
    let walletBalance = parseFloat(walletBalanceElem.textContent.replace('₦', '').replace(',', ''));

    if (walletBalance >= price) {
        walletBalance -= price;
        walletBalanceElem.textContent = `₦${walletBalance.toLocaleString()}`;

        const order = { name, price, imageUrl };
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        loadOrders();
    } else {
        alert('Insufficient balance.');
    }
}

function loadOrders() {
    const ordersList = document.getElementById('orders-list');
    ordersList.innerHTML = '';

    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.forEach(order => {
        const orderElem = document.createElement('div');
        orderElem.classList.add('order');
        orderElem.innerHTML = `
            <img src="${order.imageUrl}" alt="${order.name}" style="width: 50px; height: 50px;">
            <div>
                <p>${order.name}</p>
                <p>Price: ₦${order.price.toLocaleString()}</p>
                <button onclick="cancelOrder('${order.name}')">Cancel Order</button>
            </div>
        `;
        ordersList.appendChild(orderElem);
    });
}

function cancelOrder(name) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    const orderIndex = orders.findIndex(order => order.name === name);

    if (orderIndex > -1) {
        const order = orders[orderIndex];
        let walletBalance = parseFloat(document.getElementById('wallet-balance').textContent.replace('₦', '').replace(',', ''));
        walletBalance += order.price;
        document.getElementById('wallet-balance').textContent = `₦${walletBalance.toLocaleString()}`;

        orders.splice(orderIndex, 1);
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrders();
    }
}

function updateWalletBalance() {
    const walletBalance = parseFloat(localStorage.getItem('walletBalance')) || 1000;
    document.getElementById('wallet-balance').textContent = `₦${walletBalance.toLocaleString()}`;
}

function showTab(tab) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(t => t.style.display = 'none');
    document.getElementById(tab).style.display = 'block';
}
