document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("fade-out"), 1600);
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

/* The Beginning */
const beginningSection = document.getElementById("beginning");
let beginningPlayed = false;
const beginningObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !beginningPlayed) {
      beginningPlayed = true;
      const prompt = document.querySelector(".prompt-text");
      const replyBubble = document.querySelector(".reply-bubble");
      const reply = document.querySelector(".reply-text");
      const photo = document.querySelector(".beginning-photo");
      typeText(prompt, prompt.dataset.text, 25)
        .then(() => new Promise((r) => setTimeout(r, 500)))
        .then(() => { replyBubble.classList.add("visible"); return typeText(reply, reply.dataset.text, 35); })
        .then(() => setTimeout(() => photo.classList.add("visible"), 400));
    }
  });
}, { threshold: 0.4 });
if (beginningSection) beginningObserver.observe(beginningSection);

/* June 19th */
revealOnce(".fullbleed-caption");

/* One Month Later */
const onemonthSection = document.getElementById("onemonth");
let onemonthPlayed = false;
const onemonthObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !onemonthPlayed) {
      onemonthPlayed = true;
      const dateMorph = document.querySelector(".date-morph");
      const line = document.querySelector(".onemonth-line");
      const photo = document.querySelector(".onemonth-photo");
      setTimeout(() => dateMorph.classList.add("flip"), 600);
      setTimeout(() => line.classList.add("visible"), 1800);
      setTimeout(() => photo.classList.add("visible"), 2600);
    }
  });
}, { threshold: 0.4 });
if (onemonthSection) onemonthObserver.observe(onemonthSection);

/* Five Years */
revealOnce("#fiveyears p");
