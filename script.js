
const AUTHOR = "Дубограй Анастасія, ФЕМП група 5-9з";
const currency = "₴";
const tours = [
  {id:"t1", uaName:"Тур у Карпати (3 дні)", enName:"Carpathians Trip (3 days)", price:3500, img:"https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=60"},
  {id:"t2", uaName:"Сонячна Туреччина (7 днів)", enName:"Sunny Turkey (7 days)", price:9800, img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60"},
  {id:"t3", uaName:"Екскурсія до Львова (2 дні)", enName:"Lviv City Tour (2 days)", price:2400, img:"https://images.unsplash.com/photo-1549887534-4a8b26b5d6d8?auto=format&fit=crop&w=800&q=60"},
  {id:"t4", uaName:"Вікенд у Тбілісі (4 дні)", enName:"Tbilisi Weekend (4 days)", price:5200, img:"https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=60"},
  {id:"t5", uaName:"Пляжний відпочинок — Єгипет (6 днів)", enName:"Egypt Beach Holiday (6 days)", price:8700, img:"https://images.unsplash.com/photo-1505765051653-0b0f3b3f7c8b?auto=format&fit=crop&w=800&q=60"}
];

let lang = localStorage.getItem("site_lang") || "ua";

const texts = {
  "site_title": {ua:"Мандрівка мрії", en:"Dream Journey"},
  "home_welcome": {ua:"Ласкаво просимо у «Мандрівка мрії»", en:"Welcome to 'Dream Journey'"},
  "home_sub": {ua:"Обирай тури, мрій та подорожуй! Ми організуємо твою пригоду.", en:"Choose tours, dream and travel! We'll organize your adventure."},
  "book": {ua:"Забронювати", en:"Book"},
  "guests": {ua:"Кількість осіб", en:"Number of guests"},
  "date": {ua:"Дата", en:"Date"},
  "total": {ua:"Вартість", en:"Total"},
  "close": {ua:"Закрити", en:"Close"},
  "confirm": {ua:"Підтвердити бронь", en:"Confirm booking"}
};

function t(key){ return texts[key] ? texts[key][lang] : key; }

function applyTexts(){
  document.querySelectorAll("[data-i18]").forEach(el=>{
    const k = el.getAttribute("data-i18");
    if(texts[k]) el.innerText = texts[k][lang];
  });
  document.querySelectorAll(".author-name").forEach(el=> el.innerText = AUTHOR);
  document.querySelectorAll(".site-title").forEach(el=> el.innerText = (lang==="ua")?texts.site_title.ua:texts.site_title.en);
}

function renderTours(){
  const grid = document.getElementById("tours-grid");
  if(!grid) return;
  grid.innerHTML = "";
  tours.forEach(tr=>{
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${tr.img}" alt="${tr.uaName}">
      <h3>${lang==="ua"?tr.uaName:tr.enName}</h3>
      <div class="price">${tr.price} ${currency}</div>
      <p class="small">` + (lang==="ua"?"Чудова подорож та змістовна програма.":"Great trip with an exciting program.") + `</p>
      <div style="margin-top:10px;"><button class="button" onclick="openBooking('${tr.id}')">${t('book')}</button></div>`;
    grid.appendChild(card);
  });
}

function openBooking(tourId){
  const tour = tours.find(t=>t.id===tourId);
  if(!tour) return;
  document.getElementById("modal-title").innerText = (lang==="ua"?tour.uaName:tour.enName);
  document.getElementById("modal-price").innerText = tour.price + " " + currency;
  document.getElementById("modal-tourid").value = tour.id;
  document.getElementById("booking-modal").style.display = "flex";
  calculateModalTotal();
}

function closeModal(){ document.getElementById("booking-modal").style.display = "none"; }

function calculateModalTotal(){
  const id = document.getElementById("modal-tourid").value;
  const tour = tours.find(t=>t.id===id);
  const guests = parseInt(document.getElementById("modal-guests").value) || 1;
  const total = tour.price * guests;
  document.getElementById("modal-total").innerText = total + " " + currency;
  return total;
}

function confirmBooking(){
  const id = document.getElementById("modal-tourid").value;
  const tour = tours.find(t=>t.id===id);
  const guests = parseInt(document.getElementById("modal-guests").value) || 1;
  const date = document.getElementById("modal-date").value || "—";
  const total = calculateModalTotal();
  const summary = {tour: (lang==="ua"?tour.uaName:tour.enName), guests, date, total};
  localStorage.setItem("last_booking", JSON.stringify(summary));
  alert((lang==="ua"?"Бронювання збережено!":"Booking saved!") + "\n" + JSON.stringify(summary));
  closeModal();
}

function toggleLang(){
  lang = (lang==="ua")?"en":"ua";
  localStorage.setItem("site_lang", lang);
  applyTexts();
  renderTours();
  document.querySelectorAll(".lang-toggle").forEach(b=> b.innerText = (lang==="ua")?"EN":"UA");
}

document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll(".lang-toggle").forEach(b=> {
    b.innerText = (lang==="ua")?"EN":"UA";
    b.addEventListener("click", toggleLang);
  });
  applyTexts();
  renderTours();
  // modal events
  document.getElementById("modal-close").addEventListener("click", closeModal);
  document.getElementById("modal-guests").addEventListener("input", calculateModalTotal);
  document.getElementById("modal-date").addEventListener("change", calculateModalTotal);
  document.getElementById("modal-confirm").addEventListener("click", confirmBooking);
});
