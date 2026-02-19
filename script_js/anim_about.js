document.addEventListener('DOMContentLoaded', () => {
    const mailBtn = document.getElementById('btn-copy-mail');
    const mailText = document.getElementById('text-mail');
    const email = "mike.leveleux@gmail.com";

    if (mailBtn && mailText) {
        mailBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Empêche le comportement par défaut du lien (remonter en haut de page)

            // Copie l'email dans le presse-papier
            navigator.clipboard.writeText(email).then(() => {
                // Feedback visuel : on change le texte
                const originalText = mailText.textContent;
                mailText.textContent = "Copié !";
                
                // On remet le texte original après 2 secondes
                setTimeout(() => {
                    mailText.textContent = originalText;
                }, 2000);
            });
        });
    }
});
