console.log('%c> build log', 'color:#D9944A; font-family:monospace; font-size:14px; font-weight:bold;');
console.log('%c> compiling five_years_of_us.js... done', 'color:#F3EEE4; font-family:monospace;');
console.log('%c> tests passed: 1825/1825', 'color:#F3EEE4; font-family:monospace;');
console.log('%c> known bugs: 0. known blessings: countless.', 'color:#D9944A; font-family:monospace;');
console.log('%c> ps. i knew you would check here. love you.', 'color:#D9944A; font-family:monospace; font-style:italic;');

document.body.style.overflow = 'hidden';

const bootLines = [
  "$ ./us.exe --run",
  "",
  "> compiling five years of Appy & Momo ...",
  "> resolving dependency: hinge@2021... installed",
  "> resolving dependency: right_swipe... found",
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
  document.querySelectorAll(".fullbleed-caption").forEach(el => revealOnceEl(el));
  revealOnce(".spiderman-line");
  revealOnce(".spiderman-photo");
  setupClickReveal();
  setupHardYears();
  setupMilestones();
  setupCounter();
  setupFinaleContinue();
  setupFinaleSequence();
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

function revealOnceEl(el, threshold = 0.4) {
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

function revealOnce(selector, threshold = 0.4) {
  document.querySelectorAll(selector).forEach(el => revealOnceEl(el, threshold));
}

function setupClickReveal() {
  document.querySelectorAll('.click-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('revealed'));
  });
}

function setupHardYears() {
  const section = document.getElementById('hardyears');
  if (!section) return;
  let played = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !played) {
        played = true;
        document.querySelector('.hardyears-line').classList.add('visible');
      }
    });
  }, { threshold: 0.25 });
  observer.observe(section);
}

function setupMilestones() {
  document.querySelectorAll('#milestones .achievement, #milestones .achievement-pair').forEach((el, i) => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), i * 100);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(el);
  });
}

function setupCounter() {
  const el = document.getElementById('live-counter');
  if (!el) return;
  const start = new Date('2021-07-19T00:00:00');
  function tick() {
    const now = new Date();
    let diff = Math.floor((now - start) / 1000);
    const days = Math.floor(diff / 86400); diff -= days * 86400;
    const hours = Math.floor(diff / 3600); diff -= hours * 3600;
    const mins = Math.floor(diff / 60); diff -= mins * 60;
    const secs = diff;
    el.textContent = `${days}d ${String(hours).padStart(2,'0')}h ${String(mins).padStart(2,'0')}m ${String(secs).padStart(2,'0')}s`;
  }
  tick();
  setInterval(tick, 1000);
}

function setupFinaleSequence() {
  const section = document.getElementById('finale');
  if (!section) return;
  let played = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !played) {
        played = true;
        const lines = document.querySelectorAll('.letter-line');
        const counter = document.querySelector('.counter-block');
        const signoff = document.querySelector('.finale-signoff');
        const cont = document.querySelector('.finale-continue');
        let delay = 400;
        lines.forEach((line) => {
          setTimeout(() => line.classList.add('visible'), delay);
          delay += 2200;
        });
        delay += 800;
        setTimeout(() => counter.classList.add('visible'), delay);
        delay += 1400;
        setTimeout(() => signoff.classList.add('visible'), delay);
        delay += 1200;
        setTimeout(() => cont.classList.add('visible'), delay);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(section);
}

function setupFinaleContinue() {
  const btn = document.querySelector('.finale-yes');
  if (!btn) return;
  btn.addEventListener('click', function() {
    document.getElementById('version-tag').textContent = 'v6.0';
    this.textContent = 'installing year six...';
    this.style.pointerEvents = 'none';
  });
}

function setupDragCard() {
  const card = document.querySelector('.drag-card');
  const afterContent = document.querySelector('.beginning-after');
  const replyText = document.querySelector('.reply-text');
  const likeStamp = document.querySelector('.stamp-like');
  const nopeStamp = document.querySelector('.stamp-nope');
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
    const ratio = Math.min(Math.abs(currentX) / 120, 1);
    likeStamp.style.opacity = currentX > 0 ? ratio : 0;
    nopeStamp.style.opacity = currentX < 0 ? ratio : 0;
  }
  function onUp() {
    if (!dragging || resolved) return;
    dragging = false;
    if (currentX > 120) {
      resolved = true;
      card.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
      card.style.transform = `translateX(600px) rotate(25deg)`;
      card.style.opacity = '0';
      setTimeout(() => {
        afterContent.classList.add('visible');
        typeText(replyText, replyText.dataset.text, 35);
      }, 300);
    } else {
      card.style.transition = 'transform 0.4s ease';
      card.style.transform = 'translateX(0) rotate(0)';
      likeStamp.style.opacity = 0;
      nopeStamp.style.opacity = 0;
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
        const photos = document.querySelectorAll(".onemonth-photo");
        setTimeout(() => dateMorph.classList.add("flip"), 600);
        setTimeout(() => line.classList.add("visible"), 1800);
        setTimeout(() => { if (photos[0]) photos[0].classList.add("visible"); }, 2600);
        setTimeout(() => { if (photos[1]) photos[1].classList.add("visible"); }, 3400);
        setTimeout(() => { if (photos[2]) photos[2].classList.add("visible"); }, 4200);
      }
    });
  }, { threshold: 0.4 });
  observer.observe(onemonthSection);
}

function setupVersionTag() {
  const versionMap = {
    hero: 'v1.0', beginning: 'v1.0', june19: 'v1.1', onemonth: 'v1.2',
    spiderman: 'v1.3', dressedforthebit: 'v1.4', milestones: 'v1.5',
    family: 'v1.6', terrace: 'v1.7', frontrow: 'v1.8',
    littlethings: 'v1.9', vrindavan: 'v2.0', finale: 'v2.1'
  };
  const tag = document.getElementById('version-tag');
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target.id === 'hardyears') {
        tag.style.opacity = '0';
      } else {
        tag.style.opacity = '0.7';
        if (versionMap[entry.target.id]) tag.textContent = versionMap[entry.target.id];
      }
    });
  }, { threshold: 0.5 });
  sections.forEach(s => observer.observe(s));
}
