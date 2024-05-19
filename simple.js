// this uses cookie monster to get best options and then simulates clicking best option and also does automactic cookie clicks which cannot make it go faster, since idk
// Throttle function to limit how often a function can be called
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

const bigCookie = document.getElementById("bigCookie");
let productElements = [];
for (let i = 0; document.getElementById(`product${i}`); i++) {
    productElements.push(document.getElementById(`product${i}`));
}

const throttledClickBigCookie = throttle(() => simulateClick(bigCookie), 100);
const throttledCheckAndClickProducts = throttle(checkAndClickProducts, 1000);

function simulateClick(element) {
    if (element) {
        element.click();
    }
}

// Define the colors in order of priority
const colors = ['rgb(0, 255, 0)', 'rgb(255, 255, 0)', 'rgb(255, 127, 0)', 'rgb(255, 0, 0)'];

function checkAndClickProductsByColor() {
    for (let color of colors) {
        let bestProduct = null;

        for (let productElement of productElements) {
            if (productElement.classList.contains("unlocked") && productElement.classList.contains("disabled")) {
                let priceElement = productElement.querySelector('.price');

                if (priceElement && priceElement.style.color === color) {
                    bestProduct = productElement;
                }
            }
        }

        if (bestProduct && bestProduct.classList.contains("enabled")) {
            simulateClick(bestProduct);
            return true;
        }
    }

    return false;
}

function checkAndClickProducts() {
    let found = checkAndClickProductsByColor();

    if (!found) {
        setTimeout(checkAndClickProducts, 1000);
    }
}

function clickBigCookie() {
    throttledClickBigCookie();
}

document.addEventListener("click", function() {
    setInterval(throttledCheckAndClickProducts, 1000);
    setInterval(throttledClickBigCookie, 100);
});

javascript: (function () {   Game.LoadMod('https://cookiemonsterteam.github.io/CookieMonster/dist/CookieMonster.js'); })();
