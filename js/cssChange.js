document.addEventListener('DOMContentLoaded', function() {
    const headerButton = document.querySelector('.header-button');
    if (headerButton) {
        headerButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(5deg)';
            this.style.backgroundColor = '#ff0000';
            this.style.color = '#fff';
            this.style.fontWeight = '900';
            this.style.textShadow = '0 0 10px #fff';
            this.style.boxShadow = '0 0 20px #ff0000';
            this.style.transition = 'all 0.2s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
        });

        headerButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.backgroundColor = '#f1c40f';
            this.style.color = '#000';
            this.style.fontWeight = 'normal';
            this.style.textShadow = 'none';
            this.style.boxShadow = 'none';
        });

        headerButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            this.style.transform = 'scale(1.5)';
            this.style.backgroundColor = '#ff0000';
            this.style.boxShadow = '0 0 0 20px rgba(255, 0, 0, 0.4)';
            
            for (let i = 0; i < 10; i++) {
                createParticle(this.getBoundingClientRect().left + this.offsetWidth/2, 
                             this.getBoundingClientRect().top + this.offsetHeight/2);
            }
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.backgroundColor = '#f1c40f';
                this.style.boxShadow = 'none';
            }, 500);
            
            document.querySelector('.order-form').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    const logoImg = document.querySelector('.logo-img');
    const header = document.querySelector('.header');
    
    if (logoImg && header) {
        let lastScroll = 0;
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.scrollY;
            
            if (currentScroll > lastScroll) {
                logoImg.style.transform = `translateX(${Math.min(currentScroll/2, 200)}px) rotate(${currentScroll/10}deg)`;
                logoImg.style.filter = `hue-rotate(${currentScroll/5}deg) brightness(1.5)`;
                logoImg.style.transition = 'all 0.1s linear';
            } 
            else {
                logoImg.style.transform = `translateX(0) rotate(0deg)`;
                logoImg.style.filter = 'none';
            }
            
            const opacity = Math.min(currentScroll / 200, 0.8);
            header.style.background = `linear-gradient(to bottom, 
                rgba(41, 128, 185, ${1-opacity}), 
                rgba(44, 62, 80, ${opacity}))`;
            
            lastScroll = currentScroll;
        });
    }

    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '10px';
        particle.style.height = '10px';
        particle.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.zIndex = '1000';
        
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;
        const lifetime = 1000 + Math.random() * 500;
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        
        const animate = () => {
            posX += Math.cos(angle) * velocity;
            posY += Math.sin(angle) * velocity;
            opacity -= 0.01;
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        requestAnimationFrame(animate);
    }

    const serviceBlocks = document.querySelectorAll('.service-block');
    serviceBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-20px)';
            this.style.boxShadow = '0 20px 30px rgba(0,0,0,0.3)';
            this.style.zIndex = '10';
            this.style.background = `linear-gradient(45deg, 
                hsl(${Math.random()*360}, 80%, 80%), 
                hsl(${Math.random()*360}, 80%, 80%))`;
            this.style.transition = 'all 0.3s ease-out';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = 'none';
            this.style.zIndex = '1';
            this.style.background = 'white';
        });
    });
});