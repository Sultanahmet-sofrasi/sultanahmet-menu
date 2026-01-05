/* MENÜ */
const menuData = [

  /* ÇORBALAR */
  { cat:"Çorbalar", name:"Mercimek Çorbası", price:100 },
  { cat:"Çorbalar", name:"Kelle Çorbası", price:150 },

  /* IZGARA ÇEŞİTLERİ */
  { cat:"Izgara Çeşitleri", name:"Sultanahmet Köfte Porsiyon", price:400 },
  { cat:"Izgara Çeşitleri", name:"Sultanahmet Köfte Ekmek Arası", price:350 },
  { cat:"Izgara Çeşitleri", name:"Tavuk Şiş Porsiyon", price:250 },
  { cat:"Izgara Çeşitleri", name:"Tavuk Şiş Dürüm", price:225 },
  { cat:"Izgara Çeşitleri", name:"Tavuk Kanat Porsiyon", price:250 },
  { cat:"Izgara Çeşitleri", name:"Izgarada Balık Porsiyon", price:300 },

  /* LAHMACUN VE PİDELER */
  { cat:"Lahmacun ve Pideler", name:"Lahmacun", price:100 },
  { cat:"Lahmacun ve Pideler", name:"Karışık Pide", price:300 },
  { cat:"Lahmacun ve Pideler", name:"Kıymalı Pide", price:250 },
  { cat:"Lahmacun ve Pideler", name:"Kıymalı Kaşarlı Pide", price:250 },
  { cat:"Lahmacun ve Pideler", name:"Pizza", price:200 },

  /* TATLILAR VE ÇİĞ KÖFTE */
  { cat:"Tatlılar ve Çiğ Köfte", name:"Sütlaç", price:130 },
  { cat:"Tatlılar ve Çiğ Köfte", name:"Kabak Tatlısı", price:120 },
  { cat:"Tatlılar ve Çiğ Köfte", name:"Pasta Çeşitleri (Dilim)", price:100 },
  { cat:"Tatlılar ve Çiğ Köfte", name:"Çiğ Köfte (Porsiyon)", price:100 },

  /* İÇECEKLER */
  { cat:"İçecekler", name:"Yayık Ayran", price:35 },
  { cat:"İçecekler", name:"Limonata", price:30 },
  { cat:"İçecekler", name:"Osmanlı Şerbeti", price:30 },
  { cat:"İçecekler", name:"Elvan Gazoz", price:35 }

];

let cart = []; 
// { name, price, qty }

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  let currentCat = "";

  menuData.forEach((item, i) => {
    if(item.cat !== currentCat){
      currentCat = item.cat;
      menu.innerHTML += `<h2 class="cat">${currentCat}</h2>`;
    }

    menu.innerHTML += `
      <div class="product">
        <div>
          <h3>${item.name}</h3>
          <p>${item.price} TL</p>
        </div>
        <div class="qty-box">
          <button onclick="changeQty(${i}, -1)">−</button>
          <span id="qty-${i}">0</span>
          <button onclick="changeQty(${i}, 1)">+</button>
        </div>
      </div>
    `;
  });
});

/* ➕➖ ADET DEĞİŞTİR */
function changeQty(index, delta){
  const item = menuData[index];
  let found = cart.find(p => p.name === item.name);

  if(!found && delta > 0){
    cart.push({ name:item.name, price:item.price, qty:1 });
  } else if(found){
    found.qty += delta;
    if(found.qty <= 0){
      cart = cart.filter(p => p.name !== item.name);
    }
  }

  document.getElementById("qty-" + index).innerText =
    found ? found.qty : 0;

  renderCart();
}

/* 🤍 DESTEK */
function addSupport(){
  let found = cart.find(p => p.name === "Talebe İkram Bedeli");
  if(found){
    found.qty++;
  } else {
    cart.push({ name:"Talebe İkram Bedeli", price:250, qty:1 });
  }
  renderCart();
}

/* 🧺 SEPET */
function renderCart(){
  const box = document.getElementById("cart");
  box.innerHTML = "";
  let total = 0;

  cart.forEach(p => {
    total += p.price * p.qty;
    box.innerHTML += `
      <p>${p.name} × ${p.qty} = ${p.price * p.qty} TL</p>
    `;
  });

  document.getElementById("total").innerText = total;
}

/* 📤 SİPARİŞ */
function sendOrder(){

  const person = document.getElementById("personName").value.trim();
  const table = document.getElementById("tableNo").value;

  if(!person){
    alert("Siparişi giren kişi zorunlu");
    return;
  }
  if(!table){
    alert("Masa seçiniz");
    return;
  }
  if(cart.length === 0){
    alert("Sepet boş");
    return;
  }

  const foods = cart
    .filter(p => p.name !== "Talebe İkram Bedeli")
    .map(p => `${p.name} (${p.qty})`)
    .join(", ");

  const support = cart.find(p => p.name === "Talebe İkram Bedeli");
  const supportText = support ? (support.qty * 250 + " TL") : "-";

  document.getElementById("f_table").value = table;
  document.getElementById("f_person").value = person;
  document.getElementById("f_foods").value = foods;
  document.getElementById("f_support").value = supportText;
  document.getElementById("f_total").value =
    document.getElementById("total").innerText + " TL";

  document.getElementById("orderForm").submit();

  cart = [];
  renderCart();
  document.querySelectorAll("[id^='qty-']").forEach(e => e.innerText = "0");

  document.getElementById("msg").innerText =
    "Sipariş alındı. Ödeme kasada.";
}
