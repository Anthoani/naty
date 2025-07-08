// Contador de tempo juntos
document.addEventListener('DOMContentLoaded', function() {
    // Data de início do relacionamento (2 meses atrás a partir de hoje)
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 2);
    
    function updateCounter() {
        const now = new Date();
        const diff = Math.abs(now - startDate);
        
        // Cálculo de dias, horas, minutos e segundos
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // Atualização dos elementos no DOM
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
    
    // Atualiza o contador a cada segundo
    updateCounter();
    setInterval(updateCounter, 1000);
    
    // Animação de digitação para a carta
    const text = document.getElementById('typed-text');
    const originalHTML = text.innerHTML;
    text.innerHTML = '';
    
    let i = 0;
    const typingSpeed = 30; // velocidade de digitação em ms
    
    function typeWriter() {
        if (i < originalHTML.length) {
            text.innerHTML += originalHTML.charAt(i);
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Inicia a animação de digitação quando a seção estiver visível
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    typeWriter();
                }, 500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(text);
    
    // Criação dos corações flutuantes
    const floatingHeartsContainer = document.querySelector('.floating-hearts');
    
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        // Estilo aleatório para cada coração
        const size = Math.random() * 20 + 10;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 5 + 5;
        
        heart.style.cssText = `
            position: absolute;
            bottom: -100px;
            left: ${left}%;
            width: ${size}px;
            height: ${size * 0.9}px;
            background-color: rgba(232, 74, 95, ${Math.random() * 0.5 + 0.3});
            transform: rotate(-45deg);
            animation: floatUp ${animationDuration}s linear forwards;
        `;
        
        // Criação das partes arredondadas do coração
        heart.innerHTML = `
            <div style="
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: inherit;
                top: -50%;
                left: 0;
            "></div>
            <div style="
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: inherit;
                top: 0;
                right: -50%;
            "></div>
        `;
        
        floatingHeartsContainer.appendChild(heart);
        
        // Remove o coração após a animação
        setTimeout(() => {
            heart.remove();
        }, animationDuration * 1000);
    }
    
    // Cria corações a cada 300ms
    setInterval(createHeart, 300);
    
    // Adiciona animação para os corações flutuantes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(-45deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-${window.innerHeight}px) rotate(-45deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Animação de fade-in para as seções
    const sections = document.querySelectorAll('section');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        fadeObserver.observe(section);
    });
});
