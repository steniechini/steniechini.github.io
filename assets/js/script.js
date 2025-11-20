// script.js - Versão Whimsical Gothic (Estática)

document.addEventListener('DOMContentLoaded', function() {
    initVisitorCounter();
    initDotoriSystem(); // Sistema de Cristais
    initMusicPlayer();  // Player de música
    initCurrentYear();
});

// =============================================
// Contador de Visitantes
// =============================================

function initVisitorCounter() {
    // Tenta pegar o número salvo ou começa do 0
    let count = localStorage.getItem('visitCount') || 0;
    count = parseInt(count) + 1;
    
    // Salva o novo número
    localStorage.setItem('visitCount', count);
    
    // Atualiza na tela se o elemento existir
    const counterElement = document.getElementById('counter');
    if(counterElement) {
        counterElement.textContent = count;
    }
    
    // Dá um cristal a cada 5 visitas
    if (count % 5 === 0) {
        addDotori(1);
    }
}

// =============================================
// Sistema de Cristais (Antigo Dotori)
// =============================================

function initDotoriSystem() {
    let dotori = localStorage.getItem('dotori');
    
    // Se for a primeira vez, começa com 50 cristais
    if (dotori === null) {
        dotori = 50; 
        localStorage.setItem('dotori', dotori);
    }
    updateDotoriDisplay();
}

// Função para adicionar cristais
function addDotori(amount) {
    let dotori = parseInt(localStorage.getItem('dotori')) || 0;
    dotori += amount;
    localStorage.setItem('dotori', dotori);
    updateDotoriDisplay();
    
    console.log(`Você ganhou ${amount} cristais!`);
}

// Atualiza o número no rodapé
function updateDotoriDisplay() {
    const dotori = parseInt(localStorage.getItem('dotori')) || 0;
    const display = document.getElementById('dotori');
    if(display) {
        display.textContent = dotori;
    }
}

// =============================================
// Player de Música
// =============================================

function initMusicPlayer() {
    // Procura pelos elementos no HTML
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    
    // Se não tiver botão de música no HTML, a função para aqui para não dar erro
    if(!musicToggle || !bgMusic) return;

    // Verifica se estava tocando antes
    const musicState = localStorage.getItem('musicState');
    
    if (musicState === 'on') {
        bgMusic.play().catch(e => console.log("Autoplay bloqueado - clique para tocar"));
        musicToggle.textContent = '♪'; // Ícone de música tocando
        musicToggle.classList.add('playing');
    } else {
        bgMusic.pause();
        musicToggle.textContent = '✕'; // Ícone de música parada
        musicToggle.classList.remove('playing');
    }
    
    // Evento de clique no botão
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
// Utilidades
// =============================================

function initCurrentYear() {
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}