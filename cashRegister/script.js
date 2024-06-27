"user strict";

const $price = document.querySelector(".cashRegister__price");
const $changeDue = document.getElementById("change-due");
const $inputCash = document.getElementById("cash");
const $buttonsNumber = document.querySelectorAll(".button-number");
const $commaBtn = document.getElementById("comma-btn");
const $purchaseBtn = document.getElementById("purchase-btn");
const $resetBtn = document.getElementById("reset-btn");

// const renderClient = async ()=>{
//     const request = await fetch('clients.txt');
//     const res = await request.json();
// }

$buttonsNumber.forEach(button => {
    button.addEventListener('click', ()=>{
        $inputCash.value += button.textContent;
    })
});
$resetBtn.addEventListener('click', ()=>{
    $inputCash.value = '';
})