/* ----------------------------------------------------------
   Animation Formule 1 en arrière-plan
   ---------------------------------------------------------- */
function spawnF1Car() {
    const container = document.getElementById('f1-container');
    if (!container) return; // Sécurité si on n'est pas sur la page d'accueil

    const car = document.createElement('img');
    // Image de F1 8-bit (Data URI pour que ça marche direct, vous pouvez remplacer par un chemin de fichier)
    car.src = "./file/test.png";
    
    car.classList.add('f1-car');

    // Calculer les zones sûres pour éviter le contenu central (.main)
    const mainContent = document.querySelector('.main');
    const nav = document.querySelector('.nav');
    const footer = document.querySelector('.footer');
    let randomTop;

    if (mainContent && nav && footer) {
        const mainRect = mainContent.getBoundingClientRect();
        const navRect = nav.getBoundingClientRect();
        const footerRect = footer.getBoundingClientRect();
        
        const carHeight = 40; // Hauteur approx de la voiture
        const safetyMargin = 10; // Marge de sécurité

        // Zone 1 : Entre la Nav et le Main
        const topZoneMin = navRect.bottom + safetyMargin;
        const topZoneMax = mainRect.top - carHeight - safetyMargin;
        
        // Zone 2 : Entre le Main et le Footer
        const bottomZoneMin = mainRect.bottom + safetyMargin;
        const bottomZoneMax = footerRect.top - carHeight - safetyMargin;

        // Vérifier si les zones sont utilisables (hauteur positive)
        const validTop = (topZoneMax - topZoneMin) > 20;
        const validBottom = (bottomZoneMax - bottomZoneMin) > 20;

        if (validTop && validBottom) {
            // Si les deux zones sont dispos, on choisit au hasard
            randomTop = Math.random() > 0.5 
                ? topZoneMin + Math.random() * (topZoneMax - topZoneMin) 
                : bottomZoneMin + Math.random() * (bottomZoneMax - bottomZoneMin);
        } else if (validTop) {
            randomTop = topZoneMin + Math.random() * (topZoneMax - topZoneMin);
        } else if (validBottom) {
            randomTop = bottomZoneMin + Math.random() * (bottomZoneMax - bottomZoneMin);
        } else {
            // Si pas de place, on met hors écran pour ce tour
            randomTop = -200; 
        }
    } else {
        randomTop = Math.random() * (window.innerHeight - 40);
    }

    car.style.top = randomTop + 'px';

    // Vitesse aléatoire (entre 3s et 8s pour traverser l'écran)
    const randomDuration = Math.random() * 5 + 3;
    
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

    // Relancer une nouvelle voiture après un délai aléatoire (entre 2s et 6s)
    setTimeout(spawnF1Car, Math.random() * 4000 + 2000);
}

// Lancer la première voiture
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(spawnF1Car, 1000); // Attendre 1s avant la première voiture
});
