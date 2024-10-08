const floatingButtonHTML = `
<div id="floating-button">
  <img id="my-floating-button" src="${chrome.runtime.getURL('owl.png')}">
</div>
<div id="message-box" style="display: none;">
  <p>Dark pattern detected</p>
</div>
`;

const floatingButtonCSS = `
#floating-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
}

#my-floating-button {
  width: 50px; /* Adjust width and height as needed */
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

#message-box {
  position: fixed;
  bottom: 70px; /* Adjust this value to position the box below the floating button */
  right: 20px;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: none; /* Hide the box by default */
}
`;

// Inject the HTML and CSS into the current webpage
function injectFloatingButton() {
  const floatingButtonContainer = document.createElement('div');
  floatingButtonContainer.innerHTML = floatingButtonHTML;
  document.body.appendChild(floatingButtonContainer);

  const floatingButtonStyle = document.createElement('style');
  floatingButtonStyle.textContent = floatingButtonCSS;
  document.head.appendChild(floatingButtonStyle);

  // Add event listener to the button
  const floatingButton = document.getElementById('my-floating-button');
  let messageBoxDisplayed = false;

  floatingButton.addEventListener('click', () => {
    // Handle button click event here
    const messageBox = document.getElementById('message-box');
    messageBox.style.display = messageBox.style.display === 'none' ? 'block' : 'none';
    messageBoxDisplayed = !messageBoxDisplayed;

    if (messageBoxDisplayed) {
      setTimeout(() => {
        messageBox.style.display = 'none';
        messageBoxDisplayed = false;
      }, 5000); // Hide the message box after 5 seconds
    }
  });

  // Automatically display the message box when the user hovers over the button
  floatingButton.addEventListener('mouseover', () => {
    if (!messageBoxDisplayed) {
      const messageBox = document.getElementById('message-box');
      messageBox.style.display = 'block';
      messageBoxDisplayed = true;

      setTimeout(() => {
        messageBox.style.display = 'none';
        messageBoxDisplayed = false;
      }, 5000); // Hide the message box after 5 seconds
    }
  });
}

// Call injectFloatingButton when the extension is loaded
injectFloatingButton();