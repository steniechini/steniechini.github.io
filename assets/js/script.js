// script.js - Versão Limpa e Estática (Boho Celestial)

document.addEventListener('DOMContentLoaded', function() {
    initVisitorCounter();
    // initDotoriSystem(); // Se quiser, adicione o sistema de Cristais de volta
    initMusicPlayer();
    initCurrentYear();
});

// =============================================
// Contador de Visitantes
// =============================================

function initVisitorCounter() {
    let count = localStorage.getItem('visitCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitCount', count);
    
    const counterElement = document.getElementById('counter'); // Certifique-se que o id 'counter' existe no HTML
    if(counterElement) {
        counterElement.textContent = count;
    }
    // Lógica para Dotori (Cristais) se você mantiver
    // if (count % 5 === 0) {
    //     addDotori(1); 
    // }
}

// =============================================
// Player de Música
// =============================================

function initMusicPlayer() {
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    
    if(!musicToggle || !bgMusic) return;

    const musicState = localStorage.getItem('musicState');
    
    if (musicState === 'on') {
        bgMusic.play().catch(e => console.log("Autoplay bloqueado - clique para tocar"));
        musicToggle.textContent = '♪';
        musicToggle.classList.add('playing');
    } else {
        bgMusic.pause();
        musicToggle.textContent = '✕';
        musicToggle.classList.remove('playing');
    }
    
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            this.textContent = '♪';
            this.classList.add('playing');
            localStorage.setItem('musicState', 'on');
        } else {
            bgMusic.pause();
            this.textContent = '✕';
            this.classList.remove('playing');
            localStorage.setItem('musicState', 'off');
        }
    });
}

// =============================================
// Utilidades (Ano Atual)
// =============================================

function initCurrentYear() {
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// // Funções de Dotori/Cristais (Descomente se quiser usar no HTML)
// function initDotoriSystem() { /* ... */ }
// function addDotori(amount) { /* ... */ }
// function updateDotoriDisplay() { /* ... */ }