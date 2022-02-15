const teddySingle = localStorage.getItem("teddy_key");
let url = new URL('http://localhost:3000/api/teddies/' + teddySingle);

const productTitle = document.querySelector('.product-title');
const description = document.querySelector('.description');
const price = document.querySelector('.price');
const imageTeddy = document.querySelector('.imageTeddy');



fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        data.colors.forEach(div => {

            var opt = document.createElement("option");
        
            // Add an Option object to Drop Down/List Box
            document.getElementById("colorsDropdown").options.add(opt);
            // Assign text and value to Option object
            opt.text = div;
            opt.value = div;
        });
        productTitle.textContent = data.name;
        description.textContent = data.description;
        price.textContent = '$' + data.price;
        imageTeddy.setAttribute("src", data.imageUrl);
        imageTeddy.setAttribute('class', 'img-fluid');

        
    // Cart page
        let storageTeddy = localStorage.getItem('teddy_key');
        let items = [];

        let addToCart = document.querySelector('.btn');
        let quantity = document.querySelector('.form-control');
        var selectedColor = document.getElementById("colorsDropdown");

        addToCart.addEventListener('click', () => {
            if (quantity.value > 0) {
                let objectToCart = {
                    teddyKey: storageTeddy,
                    qty: quantity.value,
                    productTitle: productTitle.textContent,
                    price: data.price,
                    imageTeddy: data.imageUrl,
                    teddyColor: selectedColor.options[selectedColor.selectedIndex].text
                };

                // Local storage
                let productCart = JSON.parse(localStorage.getItem("cart"));

      //Check if the product is the same    
      if (productCart) {
        const resultFind = productCart.find(
          (element) => element.teddyKey === storageTeddy && element.teddyColor === selectedColor.options[selectedColor.selectedIndex].text);
        if (resultFind) {
          let newProductQuantity = parseInt(objectToCart.qty) + parseInt(resultFind.qty);
          resultFind.qty = newProductQuantity;
          localStorage.setItem("cart", JSON.stringify(productCart));
          console.log(productCart);
        } else {
          productCart.push(objectToCart);
          localStorage.setItem("cart", JSON.stringify(productCart));
          console.log(productCart);
        }
      } else {
        productCart = [];
        productCart.push(objectToCart);
        localStorage.setItem("cart", JSON.stringify(productCart));
        console.log(productCart);
      }
    }
  });
 });