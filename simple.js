// this uses cookie monster to get best options and then simulates clicking best option and also does automactic cookie clicks which cannot make it go faster, since idk
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

function debounce(func, delay) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

const bigCookie = document.getElementById("bigCookie");
let productElements = Array.from(document.querySelectorAll('[id^="product"]'));

const throttledClickBigCookie = throttle(() => simulateClick(bigCookie), 100);

function simulateClick(element) {
    if (element) {
        element.click();
    }
}

const colors = ['rgb(0, 255, 0)', 'rgb(255, 255, 0)', 'rgb(255, 127, 0)', 'rgb(255, 0, 0)'];

function checkAndClickProductsByColor() {
    for (let color of colors) {
        let bestProduct = null;

        for (let productElement of productElements) {
            if (productElement.classList.contains("unlocked") && productElement.classList.contains("disabled")) {
                let priceElement = productElement.querySelector('.price');

                if (priceElement && priceElement.style.color === color) {
                    if (!bestProduct || parseInt(priceElement.textContent) < parseInt(bestProduct.querySelector('.price').textContent)) {
                        bestProduct = productElement;
                    }
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

const debouncedCheckAndClickProducts = debounce(checkAndClickProductsByColor, 1000);

function checkAndClickProducts() {
    if (!debouncedCheckAndClickProducts()) {
        setTimeout(checkAndClickProducts, 1000);
    }
}

function clickBigCookie() {
    throttledClickBigCookie();
}

document.addEventListener("click", function() {
    requestAnimationFrame(function loop() {
        throttledClickBigCookie();
        requestAnimationFrame(loop);
    });
    setInterval(checkAndClickProducts, 5000);
});

javascript: (function () {   Game.LoadMod('https://cookiemonsterteam.github.io/CookieMonster/dist/CookieMonster.js'); })();
