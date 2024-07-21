var aosGo = document.createElement("script");

function openNav() {
    document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

function initGTM() {
    console.log("GTM initialized");
    // Inizializza Google Tag Manager qui se necessario
}

function initGTMOnEvent(e) {
    console.log("GTM event triggered");
    initGTM();
    e.currentTarget.removeEventListener(e.type, initGTMOnEvent);
}

aosGo.text = "AOS.init();";
document.body.appendChild(aosGo);

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed");
    AOS.init();

    // Funzione per impostare un cookie
    function setCookie(name, value, minutes) {
        let expires = "";
        if (minutes) {
            const date = new Date();
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
        console.log(`Cookie ${name} set with value ${value}`);
    }

    // Funzione per ottenere un cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Verifica se il cookie di consenso è già stato impostato
    const cookiesAccepted = getCookie("cookiesAccepted");
    console.log(`cookiesAccepted: ${cookiesAccepted}`);
    if (cookiesAccepted !== "true") {
        var cookieConsent = document.getElementById("cookieConsent");
        if (cookieConsent) {
            console.log("Displaying cookie consent banner");
            cookieConsent.style.display = "block";
            document.getElementById("acceptCookies").addEventListener("click", function() {
                setCookie("cookiesAccepted", "true", 10); // Imposta il cookie per 10 minuti
                cookieConsent.style.display = "none";
            });
        } else {
            console.log("Cookie consent element not found");
        }
    }
});

document.addEventListener("scroll", initGTMOnEvent);
document.addEventListener("mousemove", initGTMOnEvent);
document.addEventListener("touchstart", initGTMOnEvent);
document.addEventListener("click", initGTMOnEvent);
document.addEventListener("contextmenu", initGTMOnEvent);
document.addEventListener("mousedown", initGTMOnEvent);
document.addEventListener("touchcancel", initGTMOnEvent);
document.addEventListener("keydown", initGTMOnEvent);
window.addEventListener("resize", initGTMOnEvent);
