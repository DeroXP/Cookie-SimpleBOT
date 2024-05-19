// this uses cookie monster to get best options and then simulates clicking best option and also does automactic cookie clicks which cannot make it go faster, since idk
// function to limit how often a function can be called
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

const colors = ['rgb(0, 255, 0)', 'rgb(255, 255, 0)', 'rgb(255, 127, 0)', 'rgb(255, 0, 0)'];

function checkAndClickProductsByColor() {
    let found = false;
    for (let i = 0; i < colors.length; i++) {
        let color = colors[i];
        let bestProducts = productElements
            .filter(pe => pe.querySelector('.price')?.style.color === color)
            .sort((a, b) => parseInt(a.querySelector('.price').textContent.replace(/,/g, '')) - parseInt(b.querySelector('.price').textContent.replace(/,/g, '')));

        if (bestProducts.length > 0) {
            let bestProduct = bestProducts[0];
            if (bestProduct.classList.contains("enabled")) {
                simulateClick(bestProduct);
                found = true;
                break;
            } else if (bestProduct.classList.contains("disabled")) {
                var checkExist = setInterval(function() {
                    if (bestProduct.classList.contains("enabled")) {
                        simulateClick(bestProduct);
                        found = true;
                        clearInterval(checkExist);
                    }
                }, 1000);
                break;
            }
        }
    }
    return found;
}

function checkAndClickProducts() {
    let found = checkAndClickProductsByColor();

    if (!found) {
        setTimeout(checkAndClickProducts, 5000);
    }
}

function clickBigCookie() {
    throttledClickBigCookie();
}

document.addEventListener("click", function() {
    setInterval(throttledCheckAndClickProducts, 10000);
    setInterval(throttledClickBigCookie, 10);
});

javascript: (function () {   Game.LoadMod('https://cookiemonsterteam.github.io/CookieMonster/dist/CookieMonster.js'); })();
