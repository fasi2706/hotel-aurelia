
// ======================================
// HOTEL AURELIA - JAVASCRIPT
// ======================================


// 1. BILDERGALERIE

const galerieBilder = document.querySelectorAll(".galerie-bild");
const lightbox = document.getElementById("lightbox");
const lightboxBild = document.querySelector(".lightbox-image");
const schliessenButton = document.querySelector(".lightbox-close");

let vorherigerFokus = null;

if (lightbox && lightboxBild && schliessenButton) {

    galerieBilder.forEach(function(button) {

        button.addEventListener("click", function() {

            const bild = button.querySelector("img");

            if (!bild) return;

            vorherigerFokus = document.activeElement;

            lightboxBild.src = bild.src;
            lightboxBild.alt = bild.alt;

            lightbox.classList.add("aktiv");
            lightbox.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";
            schliessenButton.focus();

        });

    });

    function lightboxSchliessen() {

        lightbox.classList.remove("aktiv");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (vorherigerFokus) {
            vorherigerFokus.focus();
        }

        lightboxBild.removeAttribute("src");
    }

    schliessenButton.addEventListener(
        "click",
        lightboxSchliessen
    );

    lightbox.addEventListener("click", function(event) {

        if (event.target === lightbox) {
            lightboxSchliessen();
        }

    });

    document.addEventListener("keydown", function(event) {

        if (!lightbox.classList.contains("aktiv")) {
            return;
        }

        if (event.key === "Escape") {
            lightboxSchliessen();
        }

        if (event.key === "Tab") {
            event.preventDefault();
            schliessenButton.focus();
        }

    });

}


// 2. KONTAKTFORMULAR

const kontaktFormular = document.getElementById("kontakt-formular");
const formularErfolg = document.getElementById("formular-erfolg");

if (kontaktFormular && formularErfolg) {

    kontaktFormular.addEventListener("submit", function(event) {

        // Verhindert das echte Absenden
        event.preventDefault();

        // Zeigt die Demo-Bestätigung
        formularErfolg.hidden = false;

        // Leert die Eingabefelder
        kontaktFormular.reset();

    });

}

// ======================================
// 3. MOBILE NAVIGATION
// ======================================

const menuToggle = document.querySelector(".menu-toggle");
const hauptmenu = document.getElementById("hauptmenu");

if (menuToggle && hauptmenu) {

    menuToggle.addEventListener("click", function() {

        // Menü ein- oder ausblenden
        hauptmenu.classList.toggle("aktiv");

        // Button animieren
        menuToggle.classList.toggle("aktiv");

        // Prüfen, ob das Menü geöffnet ist
        const istOffen = hauptmenu.classList.contains("aktiv");

        menuToggle.setAttribute(
            "aria-expanded",
            String(istOffen)
        );

        menuToggle.setAttribute(
            "aria-label",
            istOffen ? "Menü schließen" : "Menü öffnen"
        );

    });

    // Menü nach Klick auf einen Link schließen
    const menuLinks = hauptmenu.querySelectorAll("a");

    menuLinks.forEach(function(link) {

        link.addEventListener("click", function() {

            hauptmenu.classList.remove("aktiv");
            menuToggle.classList.remove("aktiv");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Menü öffnen");

        });

    });

    // Menü mit Escape schließen
    document.addEventListener("keydown", function(event) {

        if (
            event.key === "Escape" &&
            hauptmenu.classList.contains("aktiv")
        ) {
            hauptmenu.classList.remove("aktiv");
            menuToggle.classList.remove("aktiv");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Menü öffnen");
            menuToggle.focus();
        }

    });

}
