const menuData = [
  { cat:"Çorbalar", name:"Mercimek Çorbası", price:100 },
  { cat:"Çorbalar", name:"Paça Çorbası", price:150 },

  { cat:"Ana Yemekler", name:"Sultanahmet Köfte", price:400 },
  { cat:"Ana Yemekler", name:"Tavuk Şiş", price:250 },

  { cat:"Pideler", name:"Lahmacun", price:100 },
  { cat:"Pideler", name:"Kaşarlı Pide", price:250 },

  { cat:"Tatlılar", name:"Sütlaç", price:200 },
  { cat:"İçecekler", name:"Ayran", price:35 }
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  let cat = "";

  menuData.forEach((i, idx) => {
    if(i.cat !== cat){
      cat = i.cat;
      menu.innerHTML += `<h2>${cat}</h2>`;
    }
    menu.innerHTML += `
      <div class="product">
        <h3>${i.name}</h3>
        <p>${i.price} TL</p>
        <button onclick="addToCart(${idx})">Ekle</button>
      </div>`;
  });
});

function addToCart(i){
  cart.push(menuData[i]);
  renderCart();
}

function addSupport(){
  cart.push({ name:"Talebe İkram Bedeli", price:250 });
  renderCart();
}

function renderCart(){
  let total = 0;
  const box = document.getElementById("cart");
  box.innerHTML = "";
  cart.forEach(i=>{
    total += i.price;
    box.innerHTML += `<p>${i.name} - ${i.price} TL</p>`;
  });
  document.getElementById("total").innerText = total;
}

function sendOrder(){
  if(cart.length === 0) {
    alert("Sepet boş");
    return;
  }

  const foods = cart.filter(i=>i.name!=="Talebe İkram Bedeli")
                     .map(i=>i.name)
                     .join(", ");

  const support = cart.filter(i=>i.name==="Talebe İkram Bedeli").length;

  document.getElementById("f_table").value =
    document.getElementById("tableNo").value;

  document.getElementById("f_foods").value = foods || "-";
  document.getElementById("f_support").value =
    support ? support*250 + " TL" : "-";
  document.getElementById("f_total").value =
    document.getElementById("total").innerText + " TL";

  document.getElementById("orderForm").submit();

  document.getElementById("msg").innerText =
    "Sipariş mutfağa iletildi ✓";
  
  cart = [];
  renderCart();
}
