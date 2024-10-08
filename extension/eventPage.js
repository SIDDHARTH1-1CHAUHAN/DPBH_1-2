let link;
let output;

var menuItem = {
  "id": "Checktest",
  "title": "Check for Dark Pattern",
  "contexts": ["selection"]
};

chrome.contextMenus.create(menuItem);

chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId == "Checktest" && clickData.selectionText) {
    (async () => {
      const rawResponse = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'value': clickData.selectionText })
      });
      let content = await rawResponse.json();
      // console.log(content);
      var timestamp = new Date().getTime();
      chrome.notifications.create(
        "notification2" + timestamp,
        {
          type: "basic",
          iconUrl: "images.jpg",
          title: "Dark Pattern Analysis Report",
          message: content.result,
        },
        function () { }
      );
    })();
  }
});

async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab] = await chrome.tabs.query(queryOptions);

  // console.log(tab)
  // notifyMe();
  // const notification= new Notification("Hi there!");
  if (typeof tab == 'undefined') {
  }
  else {
    if (tab.status == "complete") {
      if (link == tab.url) {
        return;
      }
      link = tab.url;
      // console.log(tab.url);
      (async () => {
        const rawResponse = await fetch('http://127.0.0.1:5000/url', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'value': tab.url })
        });
        let content = await rawResponse.json();
        console.log(content.result)
      })();
    }
  }
}

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     // console.log(sender.tab ?
//     //             "from a content script:" + sender.tab.url :
//     //             "from the extension");
//     if (request.greeting === "hello"){
//       var content;
//       content=chrome.tabs.onUpdated.addListener(async function (activeInfo) {
//         // console.log(activeInfo);
//         // console.log("SendResponse")
//         content= await getCurrentTab();
//         return content
//         // chrome.tabs.create({url:"dpbh.html"});
//       });
//       console.log(content);
//       sendResponse({output:"hello"});
//       // sendResponse({farewell:"hello"});
//     }
//   }
// );
// console.log("Background Script")
chrome.tabs.onUpdated.addListener(function (activeInfo) {
  console.log(activeInfo);
  getCurrentTab();
  // chrome.tabs.create({url:"dpbh.html"});
});