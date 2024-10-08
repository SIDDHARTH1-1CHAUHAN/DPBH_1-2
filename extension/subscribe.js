
document.getElementById("addButton").addEventListener("click", redirectToForm);
function redirectToForm() {
    window.location.href = 'add_forms.html';
}


let subscriptions = JSON.parse(localStorage.getItem('subscriptions.json')) || [];

(async () => {
    const response = await fetch('http://127.0.0.1:5000/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({subscriptions})
    });
    let content = await response.json();
    console.log(content);
 })();

function displaySubscriptions() {
    const jsonDataDiv = document.getElementById('jsonData');
    jsonDataDiv.innerHTML = ''; 

    subscriptions.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <div style="display: flex;">
                <div style="flex: 1;">
                    <strong>Name:</strong> ${item.name}<br>
                    <strong>Date:</strong> ${item.date}<br>
                    <strong>Email:</strong> ${item.email}<br>
                    <strong>Cycle:</strong> ${item.cycle}<br>
                    <strong>Amount:</strong> ${item.cost}<br>
                </div>
                <div style="flex: 1; text-align: right;">
                    <img src="netflix.png" alt="Avatar" style="width: 50px; height: 50px; border-radius: 50%; ">
                    <br>
                    <br>
                    <button class="delete-button" data-index="${index}" style="color: white; background-color: red; border: 1px solid transparent; border-radius: 5px;">Delete</button><br><br>
                </div>
            </div>
        `;
        itemDiv.style.margin = '20px 0'; // Adds space above and below each box
        itemDiv.style.padding = '10px';
        itemDiv.style.border = '1px solid #ccc'; // Border
        itemDiv.style.backgroundColor = 'transparent'; // Background color
        itemDiv.style.borderRadius = '10px'; // Border radius
        itemDiv.style.overflow = 'hidden'; // Overflow
        itemDiv.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.1)'; // Shadow effect
        itemDiv.style.transition = 'all 0.3s ease'; // Transition

        jsonDataDiv.appendChild(itemDiv);
    });

    
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            deleteSubscription(index);
            displaySubscriptions(); 
        });
    });
}

function deleteSubscription(index) {
    subscriptions.splice(index, 1);
    localStorage.setItem('subscriptions.json', JSON.stringify(subscriptions));
    displaySubscriptions();
}
displaySubscriptions();
