document.getElementById("goBackbtn").addEventListener("click", goBack);
function goBack() {
    window.location.href = 'subscribe.html';
}
const subscriptions = JSON.parse(localStorage.getItem('subscriptions.json')) || [];
function addSubscription(name, date, cycle, email, cost) {
    const purchaseDate = new Date(date);
    const currentDate = new Date();
    const monthsBetween = (currentDate.getFullYear() - purchaseDate.getFullYear()) * 12 + currentDate.getMonth() - purchaseDate.getMonth();
    const adjustedCost = Math.floor(monthsBetween / cycle) * cost;
    const subscription = {
        name,
        date,
        cycle,
        email,
        cost: adjustedCost 
    };

    subscriptions.push(subscription);
    localStorage.setItem('subscriptions.json', JSON.stringify(subscriptions));
}


document.getElementById("subscriptionForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById('subscriptionName').value;
    const date = document.getElementById('purchaseDate').value;
    const cycle = document.getElementById('renewalCycle').value;
    const email = document.getElementById('email').value;
    const cost = document.getElementById('cost').value;
    addSubscription(name, date, cycle, email, cost);
    document.getElementById('subscriptionName').value = '';
    document.getElementById('purchaseDate').value = '';
    document.getElementById('renewalCycle').value = '';
    document.getElementById('email').value = '';
    document.getElementById('cost').value = '';

    alert('Subscription added successfully!');
});
