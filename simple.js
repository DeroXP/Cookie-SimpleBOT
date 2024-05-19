// this uses cookie monster to get best options and then simulates clicking best option and also does automactic cookie clicks which cannot make it go faster, since idk
function simulateClick(element) {
    if (element) {
        element.click();
    }
}

function checkAndClickProductsByColor(color) {
    let index = 0;
    let productElement = document.getElementById(`product${index}`);
    let bestProduct = null;

    while (productElement) {
        if (productElement.classList.contains("unlocked") && productElement.classList.contains("disabled")) {
            let priceElement = productElement.querySelector('.price');

            if (priceElement && priceElement.style.color === color) {
                bestProduct = productElement;
            }
        }

        index++;
        productElement = document.getElementById(`product${index}`);
    }

    if (bestProduct && bestProduct.classList.contains("enabled")) {
        simulateClick(bestProduct);
        return true;
    }

    return false;
}

function checkAndClickProducts() {
    let found = checkAndClickProductsByColor('rgb(0, 255, 0)');

    if (!found) {
        found = checkAndClickProductsByColor('rgb(255, 255, 0)');
    }

    if (!found) {
        found = checkAndClickProductsByColor('rgb(255, 127, 0)');
    }

    if (!found) {
        checkAndClickProductsByColor('rgb(255, 0, 0)');
    }
}

function clickBigCookie() {
    const bigCookie = document.evaluate('//*[@id="bigCookie"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    simulateClick(bigCookie);
}

document.addEventListener("click", function() {
    setInterval(checkAndClickProducts, 100);

    const clickInterval = 1;
    setInterval(clickBigCookie, clickInterval);
});

javascript: (function () {   Game.LoadMod('https://cookiemonsterteam.github.io/CookieMonster/dist/CookieMonster.js'); })();
