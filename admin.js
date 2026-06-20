import { db } from "./firebase.js";
import {
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

/* ================= IMGBB API ================= */
const IMGBB_API = "076a0c2833bc97e16b8296a3d8ec5f04";


import { auth } from "./firebase.js";

import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
/* ================= LOGIN ================= */
window.login = async function () {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {

    await setPersistence(auth, browserSessionPersistence);

    await signInWithEmailAndPassword(auth, email, password);

    alert("Login Success ✔️");

  } catch (err) {
    alert("Login Failed: " + err.message);
  }
};
/* ================= AUTO LOGIN CHECK ================= */
onAuthStateChanged(auth, (user) => {

  const loginBox = document.getElementById("loginBox");
  const loginTitle = document.getElementById("loginTitle");
  const dashboard = document.getElementById("dashboard");

  if (user) {
    loginBox.style.display = "none";
    loginTitle.style.display = "none";
    dashboard.style.display = "block";
  } else {
    loginBox.style.display = "block";
    loginTitle.style.display = "block";
    dashboard.style.display = "none";
  }
});

/* ================= LOGOUT (optional) ================= */
window.logout = async function () {
  await signOut(auth);
};




/* ================= PREVIEW SYSTEM ================= */
function preview(inputId, imgId) {
  const input = document.getElementById(inputId);
  const img = document.getElementById(imgId);

  input.addEventListener("change", (e) => {
    if (e.target.files[0]) {
      img.src = URL.createObjectURL(e.target.files[0]);
    }
  });
}

window.onload = () => {
  preview("hero1File", "hero1Preview");
  preview("hero2File", "hero2Preview");
  preview("hero3File", "hero3Preview");

  preview("mid1File", "mid1Preview");
  preview("mid2File", "mid2Preview");
  preview("mid3File", "mid3Preview");

  document.getElementById("uploadBtn").addEventListener("click", uploadImages);
};

/* ================= IMGBB UPLOAD ================= */
async function uploadToImgBB(file) {

  if (!file) throw new Error("No file selected");

  const form = new FormData();
  form.append("image", file);

  try {
    const res = await fetch(
      "https://api.imgbb.com/1/upload?key=076a0c2833bc97e16b8296a3d8ec5f04",
      {
        method: "POST",
        body: form
      }
    );

    const data = await res.json();

    console.log("IMG RESPONSE:", data);

    if (!data.success) {
      throw new Error(data.error?.message || "Upload failed");
    }

    return data.data.url;

  } catch (err) {
    console.error("NETWORK ERROR:", err);
    throw new Error("Network blocked or failed to fetch");
  }
}
/* ================= UPLOAD SYSTEM ================= */
async function uploadImages() {
  try {
    console.log("UPLOAD STARTED");

    const data = {};

    if (hero1File.files[0]) data.hero1 = await uploadToImgBB(hero1File.files[0]);
    if (hero2File.files[0]) data.hero2 = await uploadToImgBB(hero2File.files[0]);
    if (hero3File.files[0]) data.hero3 = await uploadToImgBB(hero3File.files[0]);

    if (mid1File.files[0]) data.mid1 = await uploadToImgBB(mid1File.files[0]);
    if (mid2File.files[0]) data.mid2 = await uploadToImgBB(mid2File.files[0]);
    if (mid3File.files[0]) data.mid3 = await uploadToImgBB(mid3File.files[0]);

    await updateDoc(doc(db, "site", "slider"), data);

    alert("Upload Successful ✔️");
  } catch (err) {
    console.error(err);
    alert("Upload Failed: " + err.message);
  }
}

