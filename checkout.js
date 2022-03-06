const taxRate = 0.18;
const shippingPrice = 15.00;

window.addEventListener("load", ()=>{
    localStorage.setItem("taxRate", taxRate);                   //global değişken ile declare edilen verinin localstorage'de tutulması işlemi
    localStorage.setItem("shippingPrice", shippingPrice);       //localstorage'de veriler string olarak tutulur. ve sayfa yenilense browser kapatılsa dahi veriler localstorage'de kalıcı olur.
    sessionStorage.setItem("taxRate", taxRate);                 //sessionStorage'a gönderlen veriler sayfa yenilenmesi veya browser kapatılması durumunda silinir.
    sessionStorage.setItem("shippingPrice", shippingPrice);     //global değişken ile declare edilen verinin sessionstorage'de tutulması işlemi
})

//capturing
let productsDiv = document.querySelector(".products");
productsDiv.addEventListener("click", (e)=>{
    let quantityP = e.target.parentElement.parentElement.querySelector("#product-quantity");

    //minus buttons
    if (e.target.classList.contains("fa-minus") || e.target == quantityP.parentElement.firstElementChild) {
        if (quantityP.innerText > 1) {
            quantityP.innerText--;
            //calculate Product and Cart Total
            calculateProductTotal(quantityP);
        }
        else{
            if(confirm("Product will be removed!")){
                quantityP.parentElement.parentElement.parentElement.remove();
                //calculateCartTotal
                calculateCartTotal();
            }
        }
    }

    //plus buttons
    else if(e.target.className == "fas fa-plus" || e.target == quantityP.parentElement.lastElementChild){
        quantityP.innerText++;
         //calculate Product and Cart Total
         calculateProductTotal(quantityP);
    }

    //remove buttons
    else if(e.target.className == "remove-product"){
        if (confirm("Product will be removed")) {
            quantityP.parentElement.parentElement.parentElement.remove();
            calculateCartTotal()
        }
        //calculateCartTotal

        // e.target.parentElement.parentElement.remove();
        // console.log("removeBtn clicked");
    }
    //others
    else{
        console.log("other elements clicked");
    }
})

const calculateProductTotal = (quantityP) =>{
    console.log(quantityP.innerText);
    let productPrice = quantityP.parentElement.parentElement.querySelector("strong");
    let productTotalPriceDiv = quantityP.parentElement.parentElement.querySelector(".product-line-price");

    productTotalPriceDiv.innerText = (quantityP.innerText * productPrice.innerText).toFixed(2);

    calculateCartTotal();
}

const calculateCartTotal = () =>{

    let productTotalPriceDivs = document.querySelectorAll(".product-line-price");

    let subtotal = 0;
    productTotalPriceDivs.forEach(eachProductTotalPriceDiv=>{
        subtotal += parseFloat(eachProductTotalPriceDiv.innerText)
    });
    
    // console.log(subtotal);
    let taxPrice = subtotal * localStorage.getItem("taxRate");
    // console.log(taxPrice);
    let shipping = (subtotal > 0 ? parseFloat(localStorage.getItem("shippingPrice")) :0);
    // console.log(shipping);
    let cartTotal = subtotal + taxPrice + shipping;
    // console.log(cartTotal);

    document.querySelector("#cart-subtotal p:nth-child(2)").innerText = subtotal.toFixed(2);
    document.querySelector("#cart-tax p:nth-child(2)").innerText = taxPrice.toFixed(2);
    document.querySelector("#cart-shipping p:nth-child(2)").innerText = shipping.toFixed(2);
    document.querySelector("#cart-total").lastElementChild.innerText = cartTotal.toFixed(2);
}
