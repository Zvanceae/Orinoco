let template = (data) => `
<div class="card" style=" width: 250px; margin-top: 2rem;">
<img src="" class="card-img-top imageContainer img-thumbnail" alt="">
 <h5 class="card-title">${data.productTitle}</h5>
 <h8 class="card-text">Price: $${data.price}</h8>
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
const zip = document.getElementById("zip");
const cname = document.getElementById("cname");
const ccnum = document.getElementById("ccnum");
const expdate = document.getElementById("ExpDate");
const cvv = document.getElementById("cvv");
const error = document.getElementById("error");


form.addEventListener('submit', (e) => {
  //Name
  let messages = []
  if (fname.value === '' || fname.value == null) {
    messages.push('Name is required')
  }
  //Email
  let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if(!email.value.match(mailformat))
  {
    messages.push("You have entered an invalid email address!")
  }
  //Name on card
  if (cname.value === '' || cname.value == null) {
    messages.push('Name on card is required')
  }
  //Card number
  let cardformat = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  if(!ccnum.value.match(cardformat))
  {
    messages.push("You have entered an invalid card number!")
  }
  //Exp date
  let expiredate = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  if(!expdate.value.match(expiredate))
  {
    messages.push("You have entered an incorect expiry date!")
  }
  //CVV
  let cardcvv = /^[0-9]{3,4}$/;
  if(!cvv.value.match(cardcvv))
  {
    messages.push("You have entered an invalid CVV card number!")
  }
  //Message display
  if (messages.length > 0) {
    e.preventDefault()
    error.innerText = messages.join('\n ')
  }
});

