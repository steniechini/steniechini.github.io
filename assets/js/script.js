// script.js - Versão Otimizada para Jekyll
// (A lógica de carregar posts foi removida pois o Jekyll fará isso)

// =============================================
// Configurações Iniciais
// =============================================

// Temas disponíveis
const themes = [
    { name: "pink", mainColor: "#FFB6C1", accentColor: "#FF69B4" },
    { name: "blue", mainColor: "#ADD8E6", accentColor: "#1E90FF" },
    { name: "green", mainColor: "#98FB98", accentColor: "#3CB371" },
    { name: "purple", mainColor: "#D8BFD8", accentColor: "#9370DB" }
];

// Dados de habilidades (Mantido em JS para animação)
const skills = [
    { name: "HTML5", icon: "fab fa-html5", level: 90 },
    { name: "CSS3", icon: "fab fa-ccss3-alt", level: 85 },
    { name: "JavaScript", icon: "fab fa-js", level: 80 },
    { name: "UI/UX", icon: "fas fa-paint-brush", level: 75 },
    { name: "Git", icon: "fab fa-git-alt", level: 80 }
];

// Dados de amigos/Ilchon (Mantido em JS por enquanto)
let friends = [
    { id: 1, name: "Amiga Dev", avatar: "👩‍💻", since: "01/2024", closeness: 3 },
    { id: 2, name: "Colega Design", avatar: "👨‍🎨", since: "03/2024", closeness: 2 },
    { id: 3, name: "Mentor Sênior", avatar: "🧙‍♂️", since: "12/2023", closeness: 4 }
];

// =============================================
// Funções de Inicialização
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializa os componentes visuais e interativos
    initThemeSystem();
    initVisitorCounter();
    initMoodSystem();
    initMusicPlayer();
    initDotoriSystem();
    // loadProjects();  <-- Se quiser usar Jekyll para projetos também, comente esta linha depois
    loadSkills();
    loadFriends();
    // loadDiaryEntries(); <-- REMOVIDO: O Jekyll agora cuida dos posts!
    initCustomCursor();
    initFloatingShapes();
    initNavigation();
    initGlitterEffect();
    initCurrentYear();
    initInteractiveElements();
});

// =============================================
// Sistema de Temas
// =============================================

function initThemeSystem() {
    const savedTheme = localStorage.getItem('portfolioTheme') || 'pink';
    setTheme(savedTheme);

    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            setTheme(theme);
            localStorage.setItem('portfolioTheme', theme);
            addDotori(5);
        });
    });
}

function setTheme(themeName) {
    const theme = themes.find(t => t.name === themeName) || themes[0];
    document.documentElement.style.setProperty('--main-color', theme.mainColor);
    document.documentElement.style.setProperty('--accent-color', theme.accentColor);
    
    document.querySelectorAll('.theme-option').forEach(option => {
        option.classList.remove('active');
        if (option.dataset.theme === themeName) {
            option.classList.add('active');
        }
    });
}

// =============================================
// Contador de Visitantes
// =============================================

function initVisitorCounter() {
    let count = localStorage.getItem('visitCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitCount', count);
    
    const counterElement = document.getElementById('counter');
    if(counterElement) {
        counterElement.textContent = count;
    }
    
    if (count % 5 === 0) {
        addDotori(1);
    }
}

// =============================================
// Sistema de Humor
// =============================================

function initMoodSystem() {
    const savedMood = localStorage.getItem('currentMood') || '😊';
    const moodSelector = document.getElementById('mood-selector');
    const currentMoodDisplay = document.getElementById('current-mood');
    
    if(moodSelector && currentMoodDisplay) {
        moodSelector.value = getMoodValue(savedMood, moodSelector);
        currentMoodDisplay.textContent = savedMood;
        
        moodSelector.addEventListener('change', function() {
            const mood = this.options[this.selectedIndex].text;
            currentMoodDisplay.textContent = mood;
            localStorage.setItem('currentMood', mood);
        });
    }
}

function getMoodValue(moodSymbol, selector) {
    const options = selector.options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].text === moodSymbol) {
            return options[i].value;
        }
    }
    return options[0].value;
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
        // Autoplay geralmente é bloqueado, então tratamos o erro silenciosamente
        bgMusic.play().catch(e => console.log("Autoplay bloqueado - clique para tocar"));
        musicToggle.textContent = '♪ ON';
    } else {
        bgMusic.pause();
        musicToggle.textContent = '♪ OFF';
    }
    
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            this.textContent = '♪ ON';
            localStorage.setItem('musicState', 'on');
        } else {
            bgMusic.pause();
            this.textContent = '♪ OFF';
            localStorage.setItem('musicState', 'off');
        }
        addDotori(1);
    });
}

// =============================================
// Sistema Dotori (Moeda Virtual)
// =============================================

function initDotoriSystem() {
    let dotori = localStorage.getItem('dotori');
    if (dotori === null) {
        dotori = 50; 
        localStorage.setItem('dotori', dotori);
    }
    updateDotoriDisplay();
    
    document.querySelectorAll('section').forEach(section => {
        section.addEventListener('mouseenter', function() {
            if (!this.dataset.visited) {
                addDotori(1);
                this.dataset.visited = 'true';
            }
        });
    });
}

function addDotori(amount) {
    let dotori = parseInt(localStorage.getItem('dotori')) || 0;
    dotori += amount;
    localStorage.setItem('dotori', dotori);
    updateDotoriDisplay();
    
    if (amount > 0) {
        showDotoriNotification(`+${amount} Dotori!`);
    }
}

function spendDotori(amount) {
    let dotori = parseInt(localStorage.getItem('dotori')) || 0;
    if (dotori >= amount) {
        dotori -= amount;
        localStorage.setItem('dotori', dotori);
        updateDotoriDisplay();
        return true;
    }
    return false;
}

function updateDotoriDisplay() {
    const dotori = parseInt(localStorage.getItem('dotori')) || 0;
    const display = document.getElementById('dotori');
    if(display) display.textContent = dotori;
}

function showDotoriNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'dotori-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
    }, 1500);
}

// =============================================
// Sistema de Habilidades
// =============================================

function loadSkills() {
    const skillBubbles = document.querySelector('.skill-bubbles');
    if(!skillBubbles) return;
    
    skillBubbles.innerHTML = '';
    
    skills.forEach(skill => {
        const skillBubble = document.createElement('div');
        skillBubble.className = 'skill-bubble';
        skillBubble.innerHTML = `
            <i class="${skill.icon}"></i>
            <span>${skill.name}</span>
            <div class="skill-level" style="width: ${skill.level}%"></div>
        `;
        
        skillBubble.addEventListener('mouseenter', () => {
            skillBubble.title = `Nível: ${skill.level}%`;
        });
        
        skillBubbles.appendChild(skillBubble);
    });
}

// =============================================
// Sistema de Amigos
// =============================================

function loadFriends() {
    const friendGrid = document.querySelector('.friend-grid');
    if(!friendGrid) return;

    friendGrid.innerHTML = '';
    
    friends.forEach(friend => {
        const friendElement = document.createElement('div');
        friendElement.className = 'friend';
        friendElement.innerHTML = `
            <div class="friend-avatar">${friend.avatar}</div>
            <div class="friend-name">${friend.name}</div>
            <div class="friend-since">Desde: ${friend.since}</div>
            <div class="friend-closeness">${'♥'.repeat(friend.closeness)}</div>
        `;
        
        friendElement.addEventListener('click', () => {
            if (spendDotori(3)) {
                friend.closeness = Math.min(friend.closeness + 1, 5);
                loadFriends();
                showDotoriNotification(`+1 proximidade com ${friend.name}!`);
            } else {
                alert("Você precisa de 3 Dotori para aumentar a proximidade!");
            }
        });
        
        friendGrid.appendChild(friendElement);
    });
}

// Botão de adicionar amigo (apenas visual agora, já que não salva no servidor)
const addFriendBtn = document.getElementById('add-friend');
if(addFriendBtn) {
    addFriendBtn.addEventListener('click', function() {
        if (spendDotori(10)) {
            const newFriend = {
                id: friends.length + 1,
                name: `Visitante`,
                avatar: ["👩", "👨", "👽"][Math.floor(Math.random() * 3)],
                since: new Date().toLocaleDateString('pt-BR'),
                closeness: 1
            };
            friends.push(newFriend);
            loadFriends();
            showDotoriNotification("Novo amigo adicionado!");
        } else {
            alert("Você precisa de 10 Dotori para adicionar um novo amigo!");
        }
    });
}

// =============================================
// Efeitos Visuais
// =============================================

function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    if(!cursor) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
    
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-bubble, .friend');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

function initFloatingShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    if(!shapesContainer) return;
    
    // Adiciona algumas formas extras
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement('div');
        shape.className = 'shape';
        
        const shapes = ['circle', 'cloud', 'star', 'heart'];
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        shape.classList.add(shapeType);
        
        const colors = ['pink', 'blue', 'green', 'purple', 'yellow'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        shape.classList.add(color);
        
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.opacity = Math.random() * 0.3 + 0.1;
        shape.style.animationDuration = `${Math.random() * 20 + 10}s`;
        
        shapesContainer.appendChild(shape);
    }
}

function initGlitterEffect() {
    document.addEventListener('click', (e) => {
        // Efeito ao clicar em botões
        if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            for (let i = 0; i < 10; i++) {
                createGlitter(e.clientX, e.clientY);
            }
        }
    });
    
    function createGlitter(x, y) {
        const glitter = document.createElement('div');
        glitter.className = 'glitter';
        glitter.style.left = x + 'px';
        glitter.style.top = y + 'px';
        glitter.style.backgroundColor = ['#FFB6C1', '#ADD8E6', '#98FB98'][Math.floor(Math.random() * 3)];
        
        document.body.appendChild(glitter);
        
        setTimeout(() => {
            glitter.remove();
        }, 1000);
    }
}

function initNavigation() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if(target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initCurrentYear() {
    const yearSpan = document.getElementById('year');
    if(yearSpan) yearSpan.textContent = new Date().getFullYear();
}

function initInteractiveElements() {
    document.querySelectorAll('.cyworld-button').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(2deg)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}