const teddySingle = localStorage.getItem("teddy_key");
let url = new URL('http://localhost:3000/api/teddies/' + teddySingle);



fetch(url)
    .then(response => {
           return response.json();
    })
    .then(data => {
            console.log(data);
        })


