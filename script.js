// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Typing Effect Data
const texts = [
    '&gt; Initializing Saad_Dev.sys...',
    '&gt; Full Stack Developer',
    '&gt; Game Developer',
    '&gt; Network Engineer',
    '&gt; System: Ready'
];

let index = 0;
let charIndex = 0;
let isDeleting = false;
const typingElement = document.getElementById('typing-text');

function typeEffect() {
    const currentText = texts[index];
    
    if (isDeleting) {
        typingElement.innerHTML = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.innerHTML = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        index = (index + 1) % texts.length;
        setTimeout(typeEffect, 500);
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

// Start animations after load
window.onload = function() {
    setTimeout(typeEffect, 500);
};

// Floating Elements Animation
const floats = document.querySelectorAll('.floating-element');
floats.forEach((el, i) => {
    gsap.to(el, {
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        rotation: Math.random() * 20 - 10,
        duration: Math.random() * 10 + 10,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });
});

// Parallax Scroll for Floating Elements
gsap.utils.toArray('.floating-element').forEach((el, i) => {
    gsap.to(el, {
        y: -200 * (i + 1),
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    });
});

// Progress Bars Animation
gsap.utils.toArray('.project-card').forEach((card) => {
    const progress = card.dataset.progress;
    const progressBar = card.querySelector('.progress-fill');
    
    ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        onEnter: () => {
            gsap.to(progressBar, {
                width: progress + '%',
                duration: 1.5,
                ease: 'power2.out'
            });
        }
    });
});

// Terminal Commands Logic
const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const command = terminalInput.value;
        handleCommand(command);
        terminalInput.value = '';
    }
});

function handleCommand(cmd) {
    const output = document.createElement('div');
    output.className = 'text-gray-400 mt-2';
    
    switch(cmd.toLowerCase()) {
        case 'help':
            output.innerHTML = `
                <div class="text-green-400">Available commands:</div>
                <div class="grid grid-cols-2 gap-2 mt-2">
                    <div class="text-cyan-400">help</div><div class="text-gray-400">- Show this help</div>
                    <div class="text-cyan-400">contact</div><div class="text-gray-400">- Show contact info</div>
                    <div class="text-cyan-400">social</div><div class="text-gray-400">- Show social links</div>
                    <div class="text-cyan-400">clear</div><div class="text-gray-400">- Clear terminal</div>
                </div>
            `;
            break;
        case 'contact':
            output.innerHTML = `
                <div class="text-purple-400">📧 Email: saad@dev.eg</div>
                <div class="text-purple-400">📱 Phone: +20 XXX XXX XXXX</div>
                <div class="text-purple-400">💬 Discord: saad.dev</div>
            `;
            break;
        case 'social':
            output.innerHTML = `
                <div class="text-cyan-400">🔵 Facebook: @saad.dev</div>
                <div class="text-red-400">🔴 YouTube: @saad.dev</div>
                <div class="text-gray-400">⚫ GitHub: @saad.dev</div>
            `;
            break;
        case 'clear':
            terminalOutput.innerHTML = '';
            output.innerHTML = '<div class="text-green-400">&gt; Terminal cleared</div>';
            break;
        default:
            output.innerHTML = `<div class="text-red-400">Command not found: ${cmd}. Type 'help' for available commands.</div>`;
    }
    
    terminalOutput.appendChild(output);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

// Smooth Scroll Functions
function scrollToProjects() {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
}

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}