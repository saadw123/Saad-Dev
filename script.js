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



// تعديل الـ Parallax ليكون أخف في الموبايل
const isMobile = window.innerWidth < 768;

gsap.utils.toArray('.floating-element').forEach((el, i) => {
    gsap.to(el, {
        y: isMobile ? -50 * (i + 1) : -200 * (i + 1), // حركة أقل في الموبايل
        ease: 'none',
        scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom bottom',
            scrub: true
        }
    });
});



function initMatrixBackground() {
    const canvas = document.getElementById('matrix-canvas');
    const ctx = canvas.getContext('2d');

    // جعل الكانفاس يملأ الشاشة بالكامل
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // الحروف المستخدمة (يمكنك إضافة حروف عربية أو رموز برمجية)
    const characters = "0101010101SaadDev🔥<>/{}[];:+-*&%$#@!".split("");
    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // مصفوفة لتتبع موقع السقوط لكل عمود
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        // رسم مستطيل شفاف جداً فوق الرسم القديم لخلق تأثير "الذيل" (Trail)
        ctx.fillStyle = "rgba(5, 5, 5, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#00ffff"; // لون الكود (السماوي الخاص ببراندك)
        ctx.font = fontSize + "px 'Fira Code'";

        for (let i = 0; i < drops.length; i++) {
            // اختيار حرف عشوائي
            const text = characters[Math.floor(Math.random() * characters.length)];
            
            // رسم الحرف
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // إعادة الحرف للأعلى إذا وصل لنهاية الشاشة أو بشكل عشوائي
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // تحديث الأبعاد عند تغيير حجم الشاشة
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    setInterval(draw, 33); // سرعة السقوط
}

// أضف الاستدعاء داخل window.onload القديم
window.onload = () => {
    setTimeout(typeEffect, 800);
    initFloatingElements();
    initProgressBars();
    initMatrixBackground(); // <--- الاستدعاء الجديد هنا
};
