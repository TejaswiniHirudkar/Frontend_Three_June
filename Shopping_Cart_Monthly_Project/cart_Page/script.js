let users = JSON.parse(sessionStorage.getItem("loggedUser"))
let prof = document.getElementById('profile')
prof.textContent = users.fstName



let cartitems = JSON.parse(localStorage.getItem('cartprod'));
console.log(cartitems);
let parent = document.getElementById('items-cont')
let cartitm = document.querySelector('.cartitems')
let ttlprc = document.querySelector('.ttlprc')
window.addEventListener("load", renderData(cartitems));



function renderData(data) {
    console.log("render data", data);
    let ttl = 0;
    for (let i = 0; i < data.length; i++) {
      data.id = i;
      let curCard = data[i];
      console.log();
      let card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
     <img src=${curCard.image} alt="tshirt" />
     <div class="content">
         <div class="cont">
            <div class="prflx">
               <div class="prices">Price : ${curCard.price}</div>
               <div class="sub-div">
                   <div class="rating">${curCard.rating.rate}</div>
               </div>
            </div>
            <div class="prflx">
               <div style="color:${curCard.color}" class="color">Color : ${curCard.color}</div>
               <div class="sub-div">
                     <div class="size">${curCard.size}</div>
               </div>
               </div>
               <p class="titles">${curCard.title}</p>
           </div>
           <button type="button" id='addcart-${curCard.id}' class="add-cart" onclick="myFunction(${curCard.id})">Remove from Cart</button>
           <div id="addRemove-${curCard.id}" class="addToCart">
           <button type="button" onclick="incre(${curCard.id})" id="addmore-${curCard.id}" class="add" style="cursor: pointer;">Add More...</button>
           <button type="button" onclick="decre(${curCard.id})" id="remove-${curCard.id}" class= "remove" style="cursor: pointer;">Remove</button>
           <div id="qty-${curCard.id}" class = "qty">Qty: 1</div>
         </div>      
     </div>`;
    //  -------------------------------- check list   ---------------------------------
    let addeditem = document.createElement("div");
    addeditem.className = 'addedcartitem';
    let curprice = curCard.price * curCard.qtt;
    ttl += curprice;
    addeditem.innerHTML = `
       <div class="qtt">${curCard.qtt}</div>
       <div class="cat">${curCard.category}</div>
       <div class="prc">${curprice}</div>
    `;
    ttlprc.textContent = parseInt(ttl);
    cartitm.appendChild(addeditem);
    
     parent.appendChild(card)
    }
  }