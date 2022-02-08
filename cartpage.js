let template = (data) => `
<div class="card" style=" width: 250px; margin-top: 2rem;">
<img src="" class="card-img-top imageContainer img-thumbnail" alt="">
 <h5 class="card-title">${data.productTitle}</h5>
 <h8 class="card-text">Price: $${data.price}</h8>
 <h8 class="card-text">Colour: ${data.teddyColor}</h8>
 <h8 class="card-text">Qty: ${data.qty}</h8>
 <a href="#" class="btn btn-danger classReme mt-auto">Remove</a>
</div>
`;
let totalEl = document.getElementById('total-el');

let parsedObjs = JSON.parse(localStorage.getItem('cart'));


let total = 0;
parsedObjs.forEach(item => {
  total += parseFloat(item.price)*parseFloat(item.qty);
})
totalEl.textContent += "$" + total;



parsedObjs.forEach(teddy => {
    const parent = document.querySelector('.itemHolder');
    parent.insertAdjacentHTML('afterbegin', template(teddy));
    // Add image as atribut
    const imageContainer = document.querySelector('.imageContainer');
    imageContainer.setAttribute("src", teddy.imageTeddy);
    imageContainer.setAttribute('class', 'img-fluid');
    const rm = document.querySelector('.classReme');
    rm.addEventListener('click', () => {
        let indexElement = parsedObjs.indexOf(teddy);
        parsedObjs.splice(indexElement, 1);
        localStorage.setItem('cart', JSON.stringify(parsedObjs));      
        location.reload();
    })
});

// Input validation
const form = document.getElementById("form");
const fname = document.getElementById("fname");
const email = document.getElementById("email");
const adr = document.getElementById("address");
const city = document.getElementById("city");
const state = document.getElementById("state");
const error = document.getElementById("error");


function redirect (){
  //Name
  let messages = []
  if (fname.value === '' || fname.value == null) {
    messages.push('Name is required')
  }
  //Email
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!email.value.match(mailformat))
  {
    messages.push("You have entered an invalid email address")
  }
  //Address
  if (adr.value === '' || adr.value == null) {
    messages.push('Address is required')
  }
  //City
  if (city.value === '' || city.value == null) {
    messages.push('City is required')
  }
  //State
  if (state.value === '' || state.value == null) {
    messages.push('State is required')
  }
  //Message display
  if (messages.length > 0) {
    error.innerText = messages.join('\n ')
  }
  //Redirect
  else{
    window.location.href = "orderConfirmation.html"
   }
   };

   //Order number
  function orderNumber() {
      let dateStamp = Date.now().toString();
      let orderConfirmation = document.getElementById('orderNo');
      if (localStorage.length > 0) {
      orderConfirmation.innerHTML += `${dateStamp}-${localStorage.length}`;
      } else {
          orderConfirmation.innerHTML = 'Your cart is empty, please select the products you want to purches and then check out'
      };
      localStorage.clear();
  };

