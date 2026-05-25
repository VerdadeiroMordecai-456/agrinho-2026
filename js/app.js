// TERMINAL LOADER

window.addEventListener("load", () => {

  const loader = document.getElementById("terminal-loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.pointerEvents = "none";
  }, 3000);

});


// DASHBOARD DATA

const humidity = document.getElementById("humidity");
const solar = document.getElementById("solar");
const air = document.getElementById("air");

function randomValue(base, variance) {
  return base + Math.floor(Math.random() * variance);
}

setInterval(() => {

  humidity.innerText =
    `${randomValue(75, 8)}%`;

  solar.innerText =
    `${randomValue(90, 8)}%`;

  air.innerText =
    `${randomValue(95, 5)}%`;

}, 2500);


// CARD HOVER EFFECT

const cards = document.querySelectorAll(".solution-card");

cards.forEach(card => {

  card.addEventListener("mousemove", e => {

    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.background =
      `radial-gradient(circle at ${x}px ${y}px,
      rgba(57,255,20,.15),
      #0d0d0d 40%)`;

  });

});