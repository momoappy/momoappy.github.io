:root {
  --ink-black: #0B0B0C;
  --warm-ivory: #F3EEE4;
  --muted-gold: #C9A567;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  background: var(--ink-black);
  color: var(--warm-ivory);
  font-family: 'General Sans', sans-serif;
  overflow-x: hidden;
}

h1, h2, h3 { font-family: 'Fraunces', serif; font-weight: 600; }

#loader {
  position: fixed; inset: 0;
  background: var(--ink-black);
  z-index: 999;
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.8s ease;
}
#loader-line {
  width: 0%; height: 1px;
  background: var(--muted-gold);
  animation: drawLine 1.4s ease forwards;
}
@keyframes drawLine { from { width: 0%; } to { width: 140px; } }
#loader.fade-out { opacity: 0; pointer-events: none; }

#hero {
  position: relative; height: 100vh; width: 100%;
  background-image: url('images/car.jpg');
  background-size: cover;
  background-position: center;
  display: flex; align-items: center;
}
.hero-overlay { position: absolute; inset: 0; background: rgba(11,11,12,0.78); }
.hero-content { position: relative; z-index: 2; padding-left: 8%; max-width: 600px; }
.hero-content h1 {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1.1;
  margin-bottom: 1.2rem;
}
.hero-content p { font-size: 1.1rem; color: var(--muted-gold); }

#scroll-hint {
  position: absolute; bottom: 40px; left: 8%;
  width: 1px; height: 50px;
  background: var(--warm-ivory);
  animation: pulseHint 2s ease-in-out infinite;
}
@keyframes pulseHint {
  0%, 100% { opacity: 0.15; height: 40px; }
  50% { opacity: 0.5; height: 60px; }
}

@media (max-width: 700px) {
  .hero-content { padding-left: 6%; max-width: 90%; }
  .hero-content h1 { font-size: clamp(2rem, 9vw, 3rem); }
}

/* The Beginning */
#beginning {
  min-height: 100vh;
  background: var(--ink-black);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 8%;
  gap: 60px;
}
.beginning-content { max-width: 650px; width: 100%; }
.chat-line {
  font-size: 1.3rem;
  line-height: 1.5;
  margin-bottom: 2rem;
  min-height: 1.5em;
  border-right: 2px solid transparent;
}
.chat-line.prompt { color: var(--warm-ivory); opacity: 0.65; font-style: italic; }
.chat-line.reply { color: var(--muted-gold); font-weight: 500; }
.chat-line.typing { border-right: 2px solid var(--muted-gold); }

.beginning-photo {
  max-width: 380px; width: 100%;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1.2s ease, transform 1.2s ease;
}
.beginning-photo.visible { opacity: 1; transform: translateY(0); }
.beginning-photo img { width: 100%; border-radius: 4px; display: block; }
