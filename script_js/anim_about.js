// Gestion de l'effet de flou sur la navbar au scroll
document.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (nav) {
        if (window.scrollY > 20) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
    }
});


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

    // Gestion du clic sur le diplôme TOIEC
    const toiecDiplome = document.getElementById('diplome-toiec');
    if (toiecDiplome) {
        toiecDiplome.addEventListener('click', () => {
            window.open('https://www.etsglobal.org/fr/en/digital-score-report/CA91F43797D3A78D1EF9499E7AB4446F97090EA5785C01AE808D22AA5D84B0BEMHFkUitMa0d3S2t2bDdvWVlPTmQ0Uk96VHJIRG1Rb2o5TWcwNFNqZjdjc3Bzdi8y', '_blank');
        });
    }

    // Gestion du clic sur la certification Azure
    const AzureCertif = document.getElementById('diplome-azure');
    if (AzureCertif) {
        AzureCertif.addEventListener('click', () => {
            window.open('https://www.credly.com/badges/dcbdefa6-3b1a-4727-86cd-1b4766d44279/linked_in_profile', '_blank');
        });
    }

    // Gestion du clic sur la certification AWS
    const AwsCertif = document.getElementById('diplome-aws');
    if (AwsCertif) {
        AwsCertif.addEventListener('click', () => {
            window.open('https://www.credly.com/badges/185fbba3-e0e8-4fa8-b936-565d8af8847e/public_url', '_blank');
        });
    }
});
