"user strict";

const $price = document.querySelector(".cashRegister__price");
const $changeDue = document.getElementById("change-due");
const $inputCash = document.getElementById("cash");
const $buttonsNumber = document.querySelectorAll(".button-number");
const $commaBtn = document.getElementById("comma-btn");
const $purchaseBtn = document.getElementById("purchase-btn");
const $drawerBtn = document.getElementById("drawer-btn");
const $cashRegisterBtn = document.querySelector(".cashRegisterBtn");
const $changes = document.querySelectorAll(".change P");
const $drawer = document.querySelector(".cashRegister__inside");

let isDrawerOpen = false;

let price = 3.26;
let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];

const update = (cPrice, cCid)=>{
    price = cPrice;
    $price.textContent = `$ ${price}`;

    $changes.forEach((change, index)=>{
        change.textContent = `$ ${cCid[index][1]}`;
    })        
}

function checkCashRegister(cPrice, cCash, cCid) {
    const UNIT_AMOUNT = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.1,
        "QUARTER": 0.25,
        "ONE": 1.0,
        "FIVE": 5.0,
        "TEN": 10.0,
        "TWENTY": 20.0,
        "ONE HUNDRED": 100.0,
    };

    let totalCID = 0;

    for (let element of cCid) {
        totalCID += element[1];
    }
    totalCID = totalCID.toFixed(2);

    let changeToGive = cCash - cPrice;
    const changeArray = [];

    if (changeToGive > totalCID) {
        return { status: "INSUFFICIENT_FUNDS", change: changeArray, newCid: [] };
    } else if (changeToGive.toFixed(2) === totalCID) {
        return { 
            status: "CLOSED",
            change: cCid.filter((element)=> element[1] > 0 ),
            newCid: cCid
        };
    } else {
        cCid = cCid.reverse();

        for (let elem of cCid) {
            elem[1] = elem[1].toFixed(2);

            let holder = [elem[0], 0];
            while (changeToGive >= UNIT_AMOUNT[elem[0]] && elem[1] > 0) {
                holder[1] += UNIT_AMOUNT[elem[0]];
                elem[1] -= UNIT_AMOUNT[elem[0]];
                changeToGive -= UNIT_AMOUNT[elem[0]];
                changeToGive = changeToGive.toFixed(2);
            }
            if (holder[1] > 0) {
                changeArray.push(holder);
            }
        }
    }
    if (changeToGive > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [], newCid: []};
    }
    return { status: "OPEN", change: changeArray, newCid: cCid.reverse()};
}

update(price, cid);

document.addEventListener("click", e=>{
    if (e.target.id == "purchase-btn" && price >= 0) {
        let cash = Number($inputCash.value);
        if (cash < price) {
            alert("Customer does not have enough money to purchase the item");
        } else if (cash == price) {
            $changeDue.textContent = "No change due - customer paid with exact cash";
            $changeDue.style.height = "150px";
        } else if (cash > price) {
            const output = checkCashRegister(price, cash, cid);
            $changeDue.textContent = `Status: ${output.status}`;
            for (let element of output.change) {
                $changeDue.textContent += ` ${element[0]}: $${element[1]}`;
            }
            if (output.newCid) {
                for (let i = 0; i < cid.length; i++) {
                    cid[i][1] -= output.newCid[i][1];
                }
            }
            update(0, cid);
            $changeDue.style.height = "150px";
        } 
    }
    if (e.target.id == "drawer-btn") {
        $changeDue.style.height = "0px";
    }
    if (e.target.id == "comma-btn") {
        
    }
    if (e.target.classList.contains("button-number")) {
        
    }
    if (e.target.classList.contains("cashRegisterBtn")) {
        if (isDrawerOpen) {
            $drawer.style.height = "0px";
            isDrawerOpen = !isDrawerOpen;
        } else {
            $drawer.style.height = "150px";
            isDrawerOpen = !isDrawerOpen;
        }
    }
})

