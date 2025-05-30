'use strict';
var isRequesting = false;
var model = 'ChatGPT';

chrome.runtime.onMessage.addListener(function (request, _, sendResponse) {
  if (request.action === 'scrape') {
    scrape();
  }
  sendResponse({ success: true });
  return true;
});

async function scrape() {
  const htmlDoc = document.documentElement.innerHTML;

  if (htmlDoc) {
    isRequesting = true;

    if (isRequesting) {
      const apiUrl = `https://your-api-url.com/api/`;
      const bodyContent = new FormData();
      const headers = {};

      bodyContent.append(
        'htmlDoc',
        new Blob([document.documentElement.innerHTML], { type: 'text/plain; charset=utf-8' })
      );

      fetch(apiUrl, {
        method: 'POST',
        headers,
        body: bodyContent,
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
          return res.json();
        })
        .then((obj) => {
          window.open(obj.url, '_blank');
        })
        .catch((err) => {
          isRequesting = false;
          alert(`Error saving conversation: ${err.message}`);
        });
    }

    setTimeout(() => {
      isRequesting = false;
    }, 2000);
  }
}
