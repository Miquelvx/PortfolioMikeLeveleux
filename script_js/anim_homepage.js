/* ----------------------------------------------------------
   Animation Formule 1 en arrière-plan
   ---------------------------------------------------------- */
function spawnF1Car() {
    const container = document.getElementById('f1-container');
    if (!container) return; // Sécurité si on n'est pas sur la page d'accueil

    // Créer un élément image pour la voiture de F1
    const car = document.createElement('img');
    car.src = "./files/f1_car_pxl.png";
    
    car.classList.add('f1-car');

    const mainContent = document.querySelector('.main'); // Récupère l'élément par sa classe .main
    const nav = document.querySelector('.nav'); // Récupère l'élément par sa classe .nav
    const footer = document.querySelector('.footer'); // Récupère l'élément par sa classe .footer
    let randomTop;

    if (mainContent && nav && footer) {
        const mainRect = mainContent.getBoundingClientRect(); // Récupère coordonnées du contenu principal
        const navRect = nav.getBoundingClientRect(); // Récupère coordonnées de la NavBar
        const footerRect = footer.getBoundingClientRect(); // Récupère coordonnées du Footer
        
        const carHeight = 26; // Hauteur approx de la voiture
        const safetyMargin = 5; // Marge de sécurité

        // Calculer les zones d'apparitions possible pour la voiture

        // Zone 1 : Entre la Nav et le Main
        const topZoneMin = navRect.bottom + safetyMargin;
        const topZoneMax = mainRect.top - carHeight - safetyMargin;
        
        // Zone 2 : Entre le Main et le Footer
        const bottomZoneMin = mainRect.bottom + safetyMargin;
        const bottomZoneMax = footerRect.top - carHeight - safetyMargin;

        // Vérifier si les zones sont utilisables (hauteur positive)
        const validTop = (topZoneMax - topZoneMin) > carHeight;
        const validBottom = (bottomZoneMax - bottomZoneMin) > carHeight;

        // Boucle de sécurité pour éviter les collisions (max 10 tentatives)
        let attempts = 0;
        let safePositionFound = false;

        while (!safePositionFound && attempts < 10) {
            // Choisir aléatoirement une zone valide pour la voiture
            // Cas 1 : Les deux zones sont valides, on choisit aléatoirement entre les deux
            if (validTop && validBottom) {
                randomTop = Math.random() > 0.5 
                    ? topZoneMin + Math.random() * (topZoneMax - topZoneMin) 
                    : bottomZoneMin + Math.random() * (bottomZoneMax - bottomZoneMin);
            // Cas 2 : Seule la zone du haut est valide
            } else if (validTop) {
                randomTop = topZoneMin + Math.random() * (topZoneMax - topZoneMin);
            // Cas 3 : Seule la zone du bas est valide
            } else if (validBottom) {
                randomTop = bottomZoneMin + Math.random() * (bottomZoneMax - bottomZoneMin);
            // Cas 4 : Aucune zone n'est valide
            } else {
                randomTop = -200; 
            }

            // Vérification des collisions avec les voitures existantes
            safePositionFound = true; // On part du principe que c'est bon
            const existingCars = document.querySelectorAll('.f1-car');
            
            existingCars.forEach(existingCar => {
                const existingTop = parseFloat(existingCar.style.top);
                // Si la distance entre la nouvelle voiture et une existante est < hauteur + 10px marge
                if (Math.abs(existingTop - randomTop) < (carHeight + 10)) {
                    safePositionFound = false; // Collision détectée, on recommence
                }
            });
            attempts++;
        }

        // Si après 10 essais on n'a pas trouvé de place ou si randomTop est invalide
        if (!safePositionFound || randomTop === -200) {
            // On annule ce spawn
            setTimeout(spawnF1Car, 2000);
            return;
        }

    } else {
        randomTop = Math.random() * (window.innerHeight - 40);
    }

    car.style.top = randomTop + 'px';

    // Vitesse aléatoire (entre 3s et 7s pour traverser l'écran)
    const randomDuration = Math.random() * 4 + 3;
    
    // Direction aléatoire (50% de chance gauche ou droite)
    if (Math.random() > 0.5) {
        car.style.animation = `drive-right ${randomDuration}s linear infinite`;
    } else {
        car.style.left = '100%'; // Départ à droite de l'écran
        car.style.animation = `drive-left ${randomDuration}s linear infinite`;
    }

    container.appendChild(car);

    // Supprimer la voiture une fois l'animation terminée pour ne pas surcharger la page
    setTimeout(() => {
        car.remove();
    }, randomDuration * 1000);

    // Relancer une nouvelle voiture après un délai aléatoire (entre 4s et 8s)
    setTimeout(spawnF1Car, Math.random() * 6000 + 2000);
}

// Lancer la première voiture
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(spawnF1Car, 1000); // Attendre 1s avant la première voiture
});
