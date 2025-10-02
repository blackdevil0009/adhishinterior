// ===== Smooth Scroll for Navigation =====
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

// ===== Header Animation on Scroll =====
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.background = "rgba(0,0,0,0.8)";
    header.style.padding = "10px";
    header.style.transition = "0.5s";
  } else {
    header.style.background = "rgba(255,255,255,0.05)";
    header.style.padding = "20px";
  }
});

// ===== Card Reveal Animation =====
const cards = document.querySelectorAll(".card");

function revealCards() {
  const triggerBottom = window.innerHeight * 0.85;
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < triggerBottom) {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
      card.style.transition = "all 0.8s ease-out";
    }
  });
}

window.addEventListener("scroll", revealCards);
revealCards(); // Run initially

// ===== Contact Form Handling (Demo) =====
const form = document.getElementById("contactForm");
const responseMsg = document.getElementById("response");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // Simulated success message
  responseMsg.innerHTML = `<p style="color:cyan; font-weight:bold;">🚀 Thank you ${name}! We received your message. Bhaiya will contact you soon. 📩</p>`;

  // Clear form
  form.reset();
});
