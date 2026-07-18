document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => {
    loader.classList.add("fade-out");
  }, 1600);
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

const beginningSection = document.getElementById("beginning");
let beginningPlayed = false;

const beginningObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !beginningPlayed) {
      beginningPlayed = true;
      const prompt = document.querySelector(".chat-line.prompt");
      const reply = document.querySelector(".chat-line.reply");
      const photo = document.querySelector(".beginning-photo");

      typeText(prompt, prompt.dataset.text, 25)
        .then(() => new Promise((r) => setTimeout(r, 500)))
        .then(() => typeText(reply, reply.dataset.text, 35))
        .then(() => setTimeout(() => photo.classList.add("visible"), 400));
    }
  });
}, { threshold: 0.4 });

if (beginningSection) beginningObserver.observe(beginningSection);
