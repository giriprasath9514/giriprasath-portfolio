// 1. Typing effect in the hero section
const words = ["IoT & Cyber Security", "AI & Machine Learning", "Web Development", "Problem Solving"];
let w = 0, c = 0, deleting = false;
const typingEl = document.getElementById("typing");

function type() {
  const word = words[w];
  typingEl.textContent = deleting ? word.slice(0, c--) : word.slice(0, c++);

  let speed = deleting ? 50 : 100;
  if (!deleting && c > word.length) { deleting = true; speed = 1400; }
  else if (deleting && c < 0) { deleting = false; w = (w + 1) % words.length; c = 0; speed = 400; }
  setTimeout(type, speed);
}
type();

// 2. Reveal sections + animate skill bars when scrolled into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      entry.target.querySelectorAll(".fill").forEach((bar) => {
        bar.style.width = bar.dataset.width;
      });
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// 3. Scroll progress bar at the top
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const percent = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  document.getElementById("scrollBar").style.width = percent + "%";
});

// 4. 3D tilt effect on project cards
document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`;
  });
  card.addEventListener("mouseleave", () => { card.style.transform = ""; });
});

// 5. Footer year
document.getElementById("year").textContent = new Date().getFullYear();
