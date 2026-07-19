console.log('%c> build log', 'color:#D9944A; font-family:monospace; font-size:14px; font-weight:bold;');
console.log('%c> compiling five_years_of_us.js... done', 'color:#F3EEE4; font-family:monospace;');
console.log('%c> tests passed: 1825/1825', 'color:#F3EEE4; font-family:monospace;');
console.log('%c> known bugs: 0. known blessings: countless.', 'color:#D9944A; font-family:monospace;');
console.log('%c> ps. i knew you would check here. love you.', 'color:#D9944A; font-family:monospace; font-style:italic;');

document.body.style.overflow = 'hidden';

const bootLines = [
  "$ ./us.exe --run",
  "",
  "> compiling five years of us...",
  "> resolving dependency: hinge@2021... installed",
  "> resolving dependency: unusual_skills.prompt... found",
  "> 1,825 days loaded",
  "> bugs found: 0 (still looking)",
  "> status: soulmate.exe running successfully"
];

function typeLines(el, lines, speed, onDone) {
  let lineIndex = 0, charIndex = 0;
  function step() {
    if (lineIndex >= lines.length) { if (onDone) onDone(); return; }
    const currentLine = lines[lineIndex];
    if (charIndex === 0) {
      const p = document.createElement('div');
      p.className = 'boot-line';
      el.appendChild(p);
    }
    const lastLine = el.lastElementChild;
    lastLine.textContent = currentLine.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex >= currentLine.length) {
      lineIndex++; charIndex = 0;
      setTimeout(step, 200);
    } else {
      setTimeout(step, 18);
    }
  }
  step();
}

function dismissBoot() {
  const boot = document.getElementById('boot-screen');
  boot.classList.add('fade-out');
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', onBootKey);
  boot.removeEventListener('click', dismissBoot);
}
function onBootKey(e) {
  if (e.key === 'Enter') dismissBoot();
}

document.addEventListener('DOMContentLoaded', () => {
  const bootLinesEl = document.getElementById('boot-lines');
  const bootPrompt = document.getElementById('boot-prompt');
  const bootScreen = document.getElementById('boot-screen');

  typeLines(bootLinesEl, bootLines, 18, () => {
    bootPrompt.style.display = 'block';
    document.addEventListener('keydown', onBootKey);
    bootScreen.addEventListener('click', dismissBoot);
  });

  setupDragCard();
  onemonthSetup();
  revealOnce(".fullbleed-caption");
  revealOnce("#fiveyears p");
  setupVersionTag();
});

function typeText(element, text, speed) {
  return new Promise((resolve) => {
    element.classList.add("typing");
    let i = 0;
    const interval = setInterval(() => {
      element.textContent = text.slice(0, i + 1);
      i++;
      if (i === text.length) {
        clearInterval(interval);
        element.classList.remove("typing");
        resolve();
      }
    }, speed);
  });
}

function revealOnce(selector, threshold = 0.4) {
  const el = document.querySelector(selector);
  if (!el) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        el.classList.add("visible");
        observer.disconnect();
      }
    });
  }, { threshold });
  observer.observe(el);
}

function setupDragCard() {
  const card = document.querySelector('.drag-card');
  const afterContent = document.querySelector('.beginning-after');
  const replyText = document.querySelector('.reply-text');
  if (!card) return;
  let startX = 0, currentX = 0, dragging = false, resolved = false;

  function onDown(e) {
    if (resolved) return;
    dragging = true;
    startX = (e.touches ? e.touches[0].clientX : e.clientX);
    card.style.transition = 'none';
  }
  function onMove(e) {
    if (!dragging || resolved) return;
    const clientX = (e.touches ? e.touches[0].clientX : e.clientX);
    currentX = clientX - startX;
    card.style.transform = `translateX(${currentX}px) rotate(${currentX / 15}deg)`;
  }
  function onUp() {
    if (!dragging || resolved) return;
    dragging = false;
    if (Math.abs(currentX) > 120) {
      resolved = true;
      const dir = currentX > 0 ? 1 : -1;
      card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
      card.style.transform = `translateX(${dir * 600}px) rotate(${dir * 25}deg)`;
      card.style.opacity = '0';
      setTimeout(() => {
        afterContent.classList.add('visible');
        typeText(replyText, replyText.dataset.text, 35);
      }, 300);
    } else {
      card.style.transition = 'transform 0.4s ease';
      card.style.transform = 'translateX(0) rotate(0)';
    }
    currentX = 0;
  }

  card.addEventListener('mousedown', onDown);
  card.addEventListener('touchstart', onDown, {passive:true});
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, {passive:true});
  window.addEventListener('mouseup', onUp);
  window.addEventListener('touchend', onUp);
}

function onemonthSetup() {
  const onemonthSection = document.getElementById("onemonth");
  if (!onemonthSection) return;
  let played = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !played) {
        played = true;
        const dateMorph = document.querySelector(".date-morph");
        const line = document.querySelector(".onemonth-line");
        const photo = document.querySelector(".onemonth-photo");
        setTimeout(() => dateMorph.classList.add("flip"), 600);
        setTimeout(() => line.classList.add("visible"), 1800);
        setTimeout(() => photo.classList.add("visible"), 2600);
      }
    });
  }, { threshold: 0.4 });
  observer.observe(onemonthSection);
}

function setupVersionTag() {
  const versionMap = { hero: 'v1.0', beginning: 'v1.0', june19: 'v1.1', onemonth: 'v1.2', fiveyears: 'v1.3' };
  const tag = document.getElementById('version-tag');
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && versionMap[entry.target.id]) {
        tag.textContent = versionMap[entry.target.id];
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => observer.observe(s));
}
