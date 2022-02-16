/*jshint esversion: 6 */ //Minim version to be used by the JS engine

//Order number
function orderNumber() {
    let dateStamp = Date.now().toString();
    let orderConfirmation = document.getElementById('orderNo');
    if (localStorage.length > 0) {
    orderConfirmation.innerHTML += `${dateStamp}-${localStorage.length}`;
    } else {
        orderConfirmation.innerHTML = 'Your cart is empty, please select the products you want to purches and then check out';
    }
    localStorage.clear();
}
orderNumber();