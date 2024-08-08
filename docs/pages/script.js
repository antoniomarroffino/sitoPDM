var aosGo = document.createElement("script");

function openNav() {
    document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.height = "0%";
}

function initGTM() {
    console.log("GTM initialized");
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
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Verifica se il cookie di consenso è già stato impostato
    const cookiesAccepted = getCookie("cookiesAccepted");
    console.log(`cookiesAccepted: ${cookiesAccepted}`);
    if (cookiesAccepted === "true") {
        console.log("Cookie consent has already been accepted. Hiding the cookie banner.");
        document.getElementById('cookieConsent').style.display = 'none';
    } else {
        console.log("Cookie consent not accepted yet. Displaying the cookie banner.");
        document.getElementById('cookieConsent').style.display = 'block';
    }

    // Mostra il pannello delle preferenze quando si clicca su "Scopri di più e personalizza"
    document.getElementById('showCookieConsent').addEventListener('click', function (event) {
        event.preventDefault(); // Previene l'azione predefinita del link
        document.getElementById('preferencesPanel').style.display = 'flex';
    });

    // Chiude il pannello delle preferenze quando si clicca sulla "X"
    document.getElementById('closePreferencesPanel').addEventListener('click', function () {
        document.getElementById('preferencesPanel').style.display = 'none';
    });

    // Gestione clic sui bottoni del pannello delle preferenze
    document.getElementById('acceptAll').addEventListener('click', function () {
        setCookie("cookiesAccepted", "true", 10);
        document.getElementById('preferencesPanel').style.display = 'none';
        document.getElementById('cookieConsent').style.display = 'none';
    });

    document.getElementById('rejectAll').addEventListener('click', function () {
        setCookie("cookiesAccepted", "false", 10);
        document.getElementById('preferencesPanel').style.display = 'none';
        document.getElementById('cookieConsent').style.display = 'none';
    });

    // Gestione clic sul pulsante "Rifiuta" nel cookie banner
    document.getElementById('rejectCookies').addEventListener('click', function () {
        setCookie("cookiesAccepted", "false", 10);
        document.getElementById('cookieConsent').style.display = 'none';
    });

    // Gestione clic sul pulsante "Accetta" nel cookie banner
    document.getElementById('acceptCookies').addEventListener('click', function () {
        setCookie("cookiesAccepted", "true", 10);
        document.getElementById('cookieConsent').style.display = 'none';
    });
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


const images = document.querySelectorAll('.clickable-img');

// Seleziona gli elementi del lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');

// Aggiungi un listener per ciascuna immagine
images.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'block';
        lightboxImg.src = img.src;
    });
});

// Chiudi il lightbox quando si clicca sulla "x"
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Chiudi il lightbox quando si clicca fuori dall'immagine
lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) {
        lightbox.style.display = 'none';
    }
});