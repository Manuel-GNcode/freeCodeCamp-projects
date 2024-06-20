const $inputNum = document.getElementById("number");
const $button = document.getElementById("convert-btn");
const $result = document.getElementById("output");

let result = "";
const romanArabic = ["I","IV","V","IX","X","XL","L","XC","C","CD","D","CM","M"];

const numberToRoman = (num)=>{
    if (num === 0) {
        return;
    } else if (num < 4) {
        result += romanArabic[0];
        numberToRoman(num-1);
    } else if (num < 5) {
        result += romanArabic[1];
        numberToRoman(num-4);
    } else if (num < 9) {
        result += romanArabic[2];
        numberToRoman(num-5);
    } else if (num < 10) {
        result += romanArabic[3];
        numberToRoman(num-9);
    } else if (num < 40) {
        result += romanArabic[4];
        numberToRoman(num-10);
    } else if (num < 50) {
        result += romanArabic[5];
        numberToRoman(num-40);
    } else if (num < 90) {
        result += romanArabic[6];
        numberToRoman(num-50);
    } else if (num < 100) {
        result += romanArabic[7];
        numberToRoman(num-90);
    } else if (num < 400) {
        result += romanArabic[8];
        numberToRoman(num-100);
    } else if (num < 500) {
        result += romanArabic[9];
        numberToRoman(num-400);
    } else if (num < 900) {
        result += romanArabic[10];
        numberToRoman(num-500);
    } else if (num < 1000) {
        result += romanArabic[11];
        numberToRoman(num-900);
    } else if (num < 4000) {
        result += romanArabic[12];
        numberToRoman(num-1000);
    }
}

$button.addEventListener("click", ()=>{
    result = "";
    if (/^[1-9]\d*$/.test($inputNum.value)) {
        const inputNum = Math.floor(parseInt($inputNum.value));
        if (inputNum >= 4000) {
            $inputNum.value = "";
            $result.textContent = "Please enter a number less than or equal to 3999";
            $result.classList.remove("numValid");
            $result.classList.add("numInvalid");
            return;
        }

        numberToRoman(inputNum);
        $inputNum.value = "";
        $result.textContent = result;
        $result.classList.remove("numInvalid");
        $result.classList.add("numValid");
    } else if (!$inputNum.value) {
        $inputNum.value = "";
        $result.textContent = "Please enter a valid number";
        $result.classList.remove("numValid");
        $result.classList.add("numInvalid");
    } else {
        $inputNum.value = "";
        $result.textContent = "Please enter a number greater than or equal to 1";
        $result.classList.remove("numValid");
        $result.classList.add("numInvalid");
    }
})
document.addEventListener("keydown", (e)=>{
    if (e.key == "Enter" || e.key == " ") {
        result = "";
        if (/^[1-9]\d*$/.test($inputNum.value)) {
            const inputNum = Math.floor(parseInt($inputNum.value));
            if (inputNum >= 4000) {
                $inputNum.value = "";
                $result.textContent = "Please enter a number less than or equal to 3999";
                $result.classList.remove("numValid");
                $result.classList.add("numInvalid");
                return;
            }
    
            numberToRoman(inputNum);
            $inputNum.value = "";
            $result.textContent = result;
            $result.classList.remove("numInvalid");
            $result.classList.add("numValid");
        } else if (!$inputNum.value) {
            $inputNum.value = "";
            $result.textContent = "Please enter a valid number";
            $result.classList.remove("numValid");
            $result.classList.add("numInvalid");
        } else {
            $inputNum.value = "";
            $result.textContent = "Please enter a number greater than or equal to 1";
            $result.classList.remove("numValid");
            $result.classList.add("numInvalid");
        }
    }
})



