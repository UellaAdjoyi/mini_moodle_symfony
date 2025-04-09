// Fonction améliorée pour afficher une popup
function showPopup(type) {
    const popup = document.getElementById(`${type}-popup`);

    // Réinitialisation des animations
    const popupContent = popup.querySelector('.popup');
    popupContent.style.animation = 'none';
    popupContent.offsetHeight; // Force reflow
    popupContent.style.animation = null;

    popup.style.display = 'flex';

    // Animation progressive
    requestAnimationFrame(() => {
        popup.style.opacity = '1';
        popup.querySelector('.popup').classList.add('active');
    });

    // Animation spéciale pour les erreurs
    if (type === 'error') {
        popup.querySelector('.popup').classList.add('shake');
        setTimeout(() => {
            popup.querySelector('.popup').classList.remove('shake');
        }, 800);
    }

    // Effet de focus
    document.body.style.overflow = 'hidden';
}

// Fonction améliorée pour fermer une popup
function closePopup(type) {
    const popup = document.getElementById(`${type}-popup`);
    popup.style.opacity = '0';
    popup.querySelector('.popup').classList.remove('active');

    setTimeout(() => {
        popup.style.display = 'none';
        document.body.style.overflow = '';
    }, 400);
}

// Fonction pour simuler une action avec retour visuel
function proceedAction() {
    const confirmPopup = document.getElementById('confirm-popup');
    const confirmContent = confirmPopup.querySelector('.popup');

    // Animation de sortie
    confirmContent.style.transform = 'scale(0.95) translateY(0)';
    confirmContent.style.opacity = '0';

    setTimeout(() => {
        closePopup('confirm');
        setTimeout(() => {
            showPopup('success');
        }, 300);
    }, 300);
}


// Gestionnaire d'événements pour la fermeture en cliquant à l'extérieur
document.querySelectorAll('.popup-container').forEach(container => {
    container.addEventListener('click', (e) => {
        if (e.target === container) {
            const type = container.id.replace('-popup', '');
            closePopup(type);
        }
    });
});


// Gestion des touches du clavier
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const visiblePopup = document.querySelector('.popup-container[style*="flex"]');
        if (visiblePopup) {
            const type = visiblePopup.id.replace('-popup', '');
            closePopup(type);
        }
    }
});

