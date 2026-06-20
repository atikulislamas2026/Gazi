let hero = document.getElementById("hero");
let mid = document.getElementById("mid");

let h = 0;
let m = 0;

/* HERO SLIDER */
if (hero) {
  setInterval(() => {
    h++;
    if (h >= hero.children.length) h = 0;
    hero.style.transform = `translateX(-${h * 100}%)`;
  }, 3000);
}

/* MID SLIDER */
if (mid) {
  setInterval(() => {
    m++;
    if (m >= mid.children.length) m = 0;
    mid.style.transform = `translateX(-${m * 100}%)`;
  }, 3500);
}

/* COUNTER */
function count(id, val) {
  let el = document.getElementById(id);
  if (!el) return;

  let i = 0;
  let step = val / 100;

  let t = setInterval(() => {
    i += step;

    if (i >= val) {
      i = val;
      clearInterval(t);
    }

    el.innerText = Math.floor(i) + "+";
  }, 20);
}



/* =========================
   WHATSAPP ORDER SYSTEM (UPGRADED)
========================= */

function sendWhatsApp(){

  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let country = document.getElementById("country").value;

  if(!name || !phone){
    alert("Please fill all fields");
    return;
  }

  /* LOADING SHOW */
  let loading = document.getElementById("loading");
  if(loading){
    loading.style.display = "flex";
  }

  let message =
`🔥 New Order Request

👤 Name: ${name}
📞 Phone: ${phone}
🌍 Country: ${country}

Please confirm my order.`;

  let whatsappNumber = "8801880566448"; // 👉 এখানে তোমার নাম্বার দিবে

  let url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  setTimeout(() => {

    /* LOADING HIDE */
    if(loading){
      loading.style.display = "none";
    }

    /* OPEN WHATSAPP */
    window.open(url, "_blank");

    /* TOAST MESSAGE */
    let toast = document.getElementById("toast");
    if(toast){
      toast.classList.add("show");

      setTimeout(() => {
        toast.classList.remove("show");
      }, 3000);
    }

  }, 1200);
}

/* LOAD SLIDER FROM ADMIN */
let savedImages = JSON.parse(localStorage.getItem("sliderImages"));

if(savedImages && savedImages.length > 0){
  let hero = document.getElementById("hero");
  let mid = document.getElementById("mid");

  if(hero){
    hero.innerHTML = "";
    savedImages.forEach(img=>{
      let image = document.createElement("img");
      image.src = img;
      hero.appendChild(image);
    });
  }

  if(mid){
    mid.innerHTML = "";
    savedImages.forEach(img=>{
      let image = document.createElement("img");
      image.src = img;
      mid.appendChild(image);
    });
  }
}

function animateCounter(id, target, speed = 20) {
  const el = document.getElementById(id);
  if (!el) return;

  let current = 0;
  const step = target / 100;

  const timer = setInterval(() => {
    current += step;

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    el.innerText = Math.floor(current) + "+";
  }, speed);
}

window.addEventListener("load", () => {

  setTimeout(() => animateCounter("c1", 12000, 15), 300);
  setTimeout(() => animateCounter("c2", 7500, 15), 900);
  setTimeout(() => animateCounter("c3", 5300, 15), 1500);

});


import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

async function loadSlider() {

  const snap = await getDoc(doc(db, "site", "slider"));

  if (!snap.exists()) return;

  const d = snap.data();

  let hero = document.getElementById("hero");
  let mid = document.getElementById("mid");

  if (hero) {
    hero.innerHTML = `
      <img src="${d.hero1}">
      <img src="${d.hero2}">
      <img src="${d.hero3}">
    `;
  }

  if (mid) {
    mid.innerHTML = `
      <img src="${d.mid1}">
      <img src="${d.mid2}">
      <img src="${d.mid3}">
    `;
  }
}

loadSlider();



let index = 0;

function autoSlide() {
  const hero = document.querySelector(".track");

  if (!hero || hero.children.length === 0) return;

  index++;

  if (index >= hero.children.length) {
    index = 0;
  }

  hero.style.transform = 'translateX(-${index * 100}%)';
}

setInterval(autoSlide, 3000);

