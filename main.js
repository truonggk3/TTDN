const toggle = document.querySelectorAll(".toggle");

toggle.forEach(function (button) {
  button.addEventListener("click", function () {
    const box = this.closest(".side-uk"); // tìm phần tử cha .box
    const menu = box.querySelector(".side-twin"); // tìm ul con trong .box đó
    menu.classList.toggle("show"); // bật/tắt hiển thị ul con
    this.classList.toggle("active-block"); // đổi màu nền
  });
});
const slides = document.querySelectorAll(".transition-img");
const dots = document.querySelectorAll(".dot");
const container = document.querySelector(".transition-container");
let currentIndex = 0;
let autoSlide;
let startX = 0;
let endX = 0;

function updateDots() {
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

function showSlide(index) {
  if (index >= slides.length) currentIndex = 0;
  else if (index < 0) currentIndex = slides.length - 1;
  else currentIndex = index;

  // Slide container is shifted horizontally by currentIndex
  container.style.transform = `translateX(-${currentIndex * 100}%)`;
  updateDots();
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
    restartAutoSlide();
  });
});

document.addEventListener("touchstart", (e) => (startX = e.touches[0].clientX));
document.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  if (startX > endX + 50) showSlide(currentIndex + 1);
  if (startX < endX - 50) showSlide(currentIndex - 1);
  restartAutoSlide();
});

document.addEventListener("mousedown", (e) => (startX = e.clientX));
document.addEventListener("mouseup", (e) => {
  endX = e.clientX;
  if (startX > endX + 50) showSlide(currentIndex + 1);
  if (startX < endX - 50) showSlide(currentIndex - 1);
  restartAutoSlide();
});

function startAutoSlide() {
  autoSlide = setInterval(() => showSlide(currentIndex + 1), 10000);
}

function restartAutoSlide() {
  clearInterval(autoSlide);
  startAutoSlide();
}

startAutoSlide();
