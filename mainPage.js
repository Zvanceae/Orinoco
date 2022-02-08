const api = 'http://localhost:3000/api/teddies';

let parentContainer = document.querySelector('#main_container');
let teddytemplate = (data) => `
<div class="m-3 card teddy_main" style="width: 18rem;">
<img class="card-img-top" src="" alt="Card image cap">
<div class="card-body">
  <h5 class="card-title">Teddy name: ${data.name}</h5>
  <p class="card-text">Color: ${data.colors.length}</p>
  <button type="button" class="getSpecificItem btn btn-secondary">${data.price} $</button>
</div>
</div>
`;


//making API request
function makeRequest() {
    return new Promise((resolve, reject) => {
        let apiRequest = new XMLHttpRequest();
        apiRequest.open('GET', api);
        apiRequest.send();
        apiRequest.onreadystatechange = () => {
            if (apiRequest.readyState === 4) {
                if (apiRequest.status === 200) {
                    resolve(JSON.parse(apiRequest.response));

// FROM HERE I START WORKING WITH THE ELEMENTS
                    let res = JSON.parse(apiRequest.response);
                    res.forEach(teddy => {
                        parentContainer.insertAdjacentHTML('afterbegin', teddytemplate(teddy));
                        document.querySelector('.card-img-top').setAttribute("src", teddy.imageUrl);

                        document.querySelector('.getSpecificItem').addEventListener('click', () => {
                            localStorage.setItem("teddy_key" , teddy._id);
                            location.href = "./product.html";})
                    });

// HERE I STOPPED WORKING IWTH THE ELEMENTS
                } else {
                    reject('Oooops, something went wrong');
                    document.querySelector('main').outerHTML = '<h1 class="text-center m-2"> Oooops, something went wrong... </h1>';
                    console.log('Oooops, something went wrong');
                }
            }
        }
    });
};
makeRequest();
