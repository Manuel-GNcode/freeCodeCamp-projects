const inputText = document.getElementById("text-input");
const form = document.getElementById("form");
const result = document.getElementById("result");

const checkPalindrome = (e)=> {
    e.preventDefault();
    const text = inputText.value;
    if (!text) {
        alert("Please input a value");
        result.innerHTML = "";
    } else {
        const debugText = text.toLowerCase().split("");
        const arrayText = debugText.filter((l)=>/[a-zA-Z0-9]/.test(l));
        if (arrayText.join("") === arrayText.reverse().join("")) {
            result.innerHTML = `<p>${text} is a palindrome</p>`;
        } else {
            result.innerHTML = `<p>${text} is not a palindrome</p>`;
        }
    }
}

form.addEventListener("submit", checkPalindrome);