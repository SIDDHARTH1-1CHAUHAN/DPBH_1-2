// const site = windows.location.hostname
// console.log(site)
// Define the HTML and CSS for the floating button

const floatingButtonHTML = `
<div id="floating-button">
  <img id="my-floating-button" src="${chrome.runtime.getURL('owl.png')}">
</div>
`;

const floatingButtonCSS = `
#floating-button {
  position: fixed;
  bottom: 20px;
  right:20px;
  z-index: 9999;
}
#my-floating-button {
  width: 50px; /* Adjust width and height as needed */
  height: 50px;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}
.Floating_Message{
    position: fixed;
    bottom: 70px;
    right:40px;
    height: 80px;
    width: 155px;
    background-color: #DBDBDB;
    border-radius:5px;
    font-size:15px;
    padding: 6px;
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

    var displaydiv = document.createElement('div');
    displaydiv.innerHTML = "Scanning...";

    const floatingButton = document.getElementById('my-floating-button');
    displaydiv.classList.add("Floating_Message")
    floatingButtonContainer.parentNode.insertBefore(displaydiv, floatingButtonContainer);

    (async ()=> {
        // console.log("WORKS");
        const response = await fetch("http://127.0.0.1:5000/data");
        const dark_patterns = await response.json();
        let check=dark_patterns.detected;
        let string;
        if(check===true){
            string="Dark Pattern Detected. \n Click on me to highlight. ";
        }
        else{
            string="No Dark Pattern Detected"
        }
        displaydiv.innerHTML=string
        floatingButton.addEventListener('click', () => {
            for(i in dark_patterns.result){
                let text=dark_patterns.result[i][0];
                let selector=dark_patterns.result[i][1].slice(0,-6);
                let type=dark_patterns.result[i][3];
                console.log(text+" "+selector+" "+type+"\n");
                Change_CSS(selector,text,type);
            }
        });

    })();
    // Add event listener to the button

}

injectFloatingButton();

// console.log("Injected to script: ")
// alert("WORKS")

function Change_CSS(x,y,z) {
    const Add_Custom_Style = css => document.head.appendChild(document.createElement("style")).innerHTML = css
    // let Selector = "span.a-badge-text";
    Add_Custom_Style(`
            .DPBH {
                background-color: #A5FFD6 !important;
            }
            .DPBH:hover .DP-Type{
                display:inline ;
            }
            .DP-Type{
                z-index:99;
                position:absolute;
                display:none;
                margin-left:50px;
                color:white;
                font-size: 16px;
                padding: 10px;
                background-color:#FFA69E;
                border-radius:4px;
            }
        `)
    // alert("Content script is working")
    Selector = document.querySelectorAll(x)
    for (var i = 0, len = Selector.length; i < len; i++) {
        console.log(Selector[i].innerText)
        if (Selector[i].innerText == y) {
            console.log(Selector[i])
            Selector[i].classList.add("DPBH")

            const newNode = document.createElement("div");
            const textNode = document.createTextNode(z);
            newNode.appendChild(textNode);
            newNode.classList.add("DP-Type")
            const list = document.getElementById("myList");
            Selector[i].insertBefore(newNode, Selector[i].children[0]);
        }

    }

}