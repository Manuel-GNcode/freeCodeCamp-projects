"use strict";
const numbers = document.querySelectorAll(".number");
const inputNumber = document.getElementById("user-input");
const clearBtn = document.getElementById("clear-btn");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("results-div");
const delBtn = document.querySelector(".delete");

const regexs = [
    /^(1\s)?(\d{3}-){2}\d{4}\s?$/,
    /^1\s\(\d{3}\)\s\d{3}-\d{4}\s?$/,
    /^1?\(\d{3}\)\d{3}-\d{4}\s?$/,
    /^1\s\d{3}\s\d{3}\s\d{4}\s?$/,
    /^\d{10}\s?$/
]
const checkNumber = (str)=> regexs.some(regex=>regex.test(str));

const clear = ()=>{
    inputNumber.value = "";
    result.innerText = "";
};

const check = ()=>{
    const inputValue = inputNumber.value;
    if (!inputValue) {
        alert("Please provide a phone number");
        return;
    }
    if (checkNumber(inputValue)) {
        result.innerText = `Valid US number: ${inputValue}`;
    } else {
        result.innerText = `Invalid US number: ${inputValue}`;
    }
}

const delNum = ()=>{
    const inputValue = inputNumber.value;
    if (inputValue.length > 0) {
        inputNumber.value = inputValue.slice(0,inputValue.length-1);
    }
}

numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        inputNumber.value += event.target.innerText;
    });
});

clearBtn.addEventListener("click", clear);
checkBtn.addEventListener("click", check);
delBtn.addEventListener("click", delNum);