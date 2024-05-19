function simulateClick(element) {
    if (element) {
        element.click();
    }
}

function checkAndClickProducts() {
    let index = 0;
    let productElement = document.getElementById(`product${index}`);
    let foundGreenPrice = false;

    while (productElement) {
        if (productElement.classList.contains("unlocked") && productElement.classList.contains("enabled")) {
            let priceElement = productElement.querySelector('.price');

            if (priceElement && priceElement.style.color === 'rgb(0, 255, 0)') {
                simulateClick(productElement);
                foundGreenPrice = true;
            }
        }

        index++;
        productElement = document.getElementById(`product${index}`);
    }

    if (!foundGreenPrice) {
        index = 0;
        productElement = document.getElementById(`product${index}`);

        while (productElement) {
            if (productElement.classList.contains("unlocked") && productElement.classList.contains("enabled")) {
                let priceElement = productElement.querySelector('.price');

                if (priceElement && priceElement.style.color === 'rgb(255, 255, 0)') {
                    simulateClick(productElement);
                }
            }

            index++;
            productElement = document.getElementById(`product${index}`);
        }
    }
}

function clickBigCookie() {
    const bigCookie = document.evaluate('//*[@id="bigCookie"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    simulateClick(bigCookie);
}

setInterval(checkAndClickProducts, 100);

const clickInterval = 1;
setInterval(clickBigCookie, clickInterval);

javascript: (function () {   Game.LoadMod('https://cookiemonsterteam.github.io/CookieMonster/dist/CookieMonster.js'); })();
