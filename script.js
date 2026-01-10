const menuData = [
  { cat:"Çorbalar", name:"Mercimek Çorbası", price:100 },
  { cat:"Çorbalar", name:"Kelle Çorbası", price:150 },

  { cat:"Izgara Çeşitleri", name:"Sultanahmet Köfte Porsiyon", price:400 },
  { cat:"Izgara Çeşitleri", name:"Sultanahmet Köfte Ekmek Arası", price:350 },
  { cat:"Izgara Çeşitleri", name:"Tavuk Şiş Porsiyon", price:250 },
  { cat:"Izgara Çeşitleri", name:"Tavuk Şiş Dürüm", price:225 },
  { cat:"Izgara Çeşitleri", name:"Tavuk Kanat Porsiyon", price:250 },
  { cat:"Izgara Çeşitleri", name:"Izgarada Balık Porsiyon", price:400 },

  { cat:"Lahmacun ve Pideler", name:"Lahmacun", price:100 },
  { cat:"Lahmacun ve Pideler", name:"Karışık Pide", price:300 },
  { cat:"Lahmacun ve Pideler", name:"Kıymalı Pide", price:250 },
  { cat:"Lahmacun ve Pideler", name:"Kıymalı Kaşarlı Pide", price:250 },
  { cat:"Lahmacun ve Pideler", name:"Pizza", price:200 },

  { cat:"Tatlılar ve Çiğ Köfte", name:"Sütlaç", price:130 },
  { cat:"Tatlılar ve Çiğ Köfte", name:"Kabak Tatlısı", price:120 },
  { cat:"Tatlılar ve Çiğ Köfte", name:"Pasta Çeşitleri (Dilim)", price:100 },
  { cat:"Tatlılar ve Çiğ Köfte", name:"Çiğ Köfte (Porsiyon)", price:100 },

  { cat:"İçecekler", name:"Yayık Ayran", price:35 },
  { cat:"İçecekler", name:"Limonata", price:30 },
  { cat:"İçecekler", name:"Osmanlı Şerbeti", price:30 },
  { cat:"İçecekler", name:"Elvan Gazoz", price:35 }
];

let cart = {};

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  let currentCat = "";
  let body;

  menuData.forEach((item, i) => {
    if(item.cat !== currentCat){
      currentCat = item.cat;
      const h = document.createElement("h2");
      h.className = "cat";
      h.innerHTML = `${currentCat} <span>▼</span>`;
      h.onclick = () => h.nextElementSibling.classList.toggle("open");

      body = document.createElement("div");
      body.className = "cat-body open";

      menu.appendChild(h);
      menu.appendChild(body);
    }

    body.innerHTML += `
      <div class="row">
        <div>
          <div class="name">${item.name}</div>
          <div class="price">${item.price} TL</div>
        </div>
        <div class="qty">
          <button onclick="changeQty(${i},-1)">−</button>
          <span id="q${i}">0</span>
          <button onclick="changeQty(${i},1)">+</button>
        </div>
      </div>
    `;
  });
});

function changeQty(i, d){
  const name = menuData[i].name;
  cart[name] = (cart[name] || 0) + d;
  if(cart[name] <= 0) delete cart[name];
  document.getElementById("q"+i).innerText = cart[name] || 0;
  renderTotal();
}

function renderTotal(){
  let t = 0;
  for(let k in cart){
    const p = menuData.find(x => x.name === k);
    t += p.price * cart[k];
  }
  document.getElementById("total").innerText = t;
}

function sendOrder(){
  if(!personName.value || !tableNo.value || Object.keys(cart).length === 0){
    alert("Eksik bilgi");
    return;
  }

  const data = new URLSearchParams();
  data.append("person", personName.value);
  data.append("table", tableNo.value);
  data.append("note", orderNote.value || "-");
  data.append("items", JSON.stringify(cart));
  data.append("total", total.innerText + " TL");

  fetch("https://script.google.com/macros/s/AKfycbwm-S1B-61VyNBLqE5umFf3gr8aEShet7hWUVZK1O8wcw7Wes9f6TLKm6yo-ojCfnhZ/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: data
  })
  .then(() => {
    msg.innerText = "Siparişiniz alınmıştır.";
    personName.value = "";
    tableNo.value = "";
    orderNote.value = "";
    cart = {};
    document.querySelectorAll("[id^='q']").forEach(e => e.innerText = "0");
    total.innerText = "0";
  })
  .catch(() => {
    alert("Sipariş gönderilemedi");
  });
}
