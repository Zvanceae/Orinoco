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
                    price: price.textContent,
                    imageTeddy: data.imageUrl,
                    teddyColor: selectedColor.options[selectedColor.selectedIndex].text
                };
                // Local storage
                // if (localStorage) {
                //     const resultFind = localStorage.find(
                //       (element) => element.id === id && element.color === color);
                //     if (resultFind) {
                //       let newProductQuantity = parseInt(localStorage.quantity) + parseInt(resultFind.quantity);
                //       resultFind.quantity = newProductQuantity;
                //       localStorage.setItem("productsInCart", JSON.stringify(localStorage));
                //       console.log(productCart);
                //     }
                if (localStorage.getItem('cart') === null) {

                    items.push(objectToCart);
                    localStorage.setItem('cart', JSON.stringify(items));
                }
                else {
                    let parsed = JSON.parse(localStorage.getItem('cart')); //retrive the data
                    parsed.push(objectToCart);
                    localStorage.setItem('cart', JSON.stringify(parsed));
                }
            }
            else if (quantity.value < 1) {
                alert('Please enter product quantity');
            }
        });


        let parsedObjs = JSON.parse(localStorage.getItem('cart'));
        

    })