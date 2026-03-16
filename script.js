// =========================
// Typing Animation
// =========================
let words = ["Website Developer", "UI Designer", "Creative Coder", "Apk Developer"];
let wordIndex = 0, charIndex = 0, deleting = false;

function typingEffect() {
  const display = document.getElementById("typing");
  const currentWord = words[wordIndex];

  if (deleting) {
    display.textContent = currentWord.substring(0, charIndex--);
  } else {
    display.textContent = currentWord.substring(0, charIndex++);
  }

  if (!deleting && charIndex === currentWord.length + 1) {
    deleting = true;
    setTimeout(typingEffect, 1000);
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  setTimeout(typingEffect, deleting ? 60 : 120);
}

typingEffect();


// =========================
// Project Modal / Lightbox
// =========================
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalCaption = document.getElementById("modal-caption");
const closeBtn = document.getElementsByClassName("close")[0];

document.querySelectorAll(".project-img").forEach(img => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    modalCaption.textContent = img.alt;
  });
});

closeBtn.onclick = () => modal.style.display = "none";
modal.onclick = (e) => { if (e.target === modal) modal.style.display = "none"; }


// =========================
// Canvas Shatter (Optional)
// =========================
const canvas = document.getElementById("canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  canvas.width = 320; canvas.height = 320;
  let pieces = [];
  let imgShatter = new Image();
  imgShatter.crossOrigin = "anonymous";
  imgShatter.src = ""; // Put image source here if desired

  imgShatter.onload = function() { createPieces(); animate(); }

  function createPieces() {
    pieces = [];
    const size = 8;
    for (let y = 0; y < 300; y += size) {
      for (let x = 0; x < 300; x += size) {
        pieces.push({
          x, y,
          originX: x,
          originY: y,
          vx: (Math.random()-0.5)*10,
          vy: (Math.random()-0.5)*10
        });
      }
    }
  }

  let scatter = false;
  setInterval(() => { scatter = !scatter; }, 3000);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(piece => {
      if (scatter) {
        piece.x += piece.vx; piece.y += piece.vy;
      } else {
        piece.x += (piece.originX - piece.x) * 0.08;
        piece.y += (piece.originY - piece.y) * 0.08;
      }
      ctx.drawImage(imgShatter, piece.originX, piece.originY, 8, 8, piece.x, piece.y, 8, 8);
    });
    requestAnimationFrame(animate);
  }
}


// =========================
// Flip "View Projects" Button
// =========================
const flipBtn = document.getElementById("flip-button");
setInterval(() => { flipBtn.classList.toggle("flipped"); }, 6000);
flipBtn.addEventListener("click", () => {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
});


// =========================
// Project Cards Fade-In
// =========================
const projectCards = document.querySelectorAll(".project-card");

function revealProjects() {
  const triggerBottom = window.innerHeight * 0.85;
  projectCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) card.classList.add("visible");
  });
}

// Run on scroll and on page load
window.addEventListener("scroll", revealProjects);
window.addEventListener("load", revealProjects);