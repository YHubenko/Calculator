let buttons = ['C', '/', '*', 'CE', 7, 8, 9, '-', 4, 5, 6, '+', 1, 2, 3, '√', 0, '00', '.', '='];
let i = 0;
for (const button of buttons) {
    i++;
    let btnContainer = document.createElement('div');
    let btn = document.createElement('button');
    btn.textContent = button;
    btnContainer.append(btn);
    btnContainer.classList.add('btn-container');
    btn.classList.add('key');
    document.querySelector('#keyboard').append(btnContainer);
    if (i < 4 || i % 4 === 0) {
        btn.classList.add('btn-border');
    }
    if (button === 'C') {
        btn.classList.replace('key', 'C');
    } else if (button === 'CE') {
        btn.classList.replace('key', 'CE');
    } else if (button === '/' || button === '*' || button === '-' || button === '+' || button === '√') {
        btn.classList.replace('key', 'operator');
    } else if (button === '=') {
        btn.classList.replace('key', 'equals');
    } else if (button === '.') {
        btn.classList.replace('key', 'point');
    }
}


let output = document.querySelector('#output')
let keyboard = document.querySelectorAll('.key');
let arr1 = [];
let arr2 = [];
let arrFlag = true;
let emptyFlag = true;
let operatorFlag = false;
let usedOperatorFlag = false
let resultUsedFlag = false;
let operatorBtnList = document.querySelectorAll('.operator');
let operator = '';
let result;
let number1;
let number2;

for (const key of keyboard) {
    key.addEventListener('click', () => {keyOut(key.textContent)});
}
document.addEventListener('keydown', (e) => {
    if (e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' ||
        e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9' || e.key === '0') {
        keyOut(e.key);
    }
})

let point = document.querySelector('.point');
point.addEventListener('click', pointOut);
document.addEventListener('keydown', (e) => {
    if (e.key === '.' || e.key === ',') pointOut();
})

let clear = document.querySelector('.C');
clear.addEventListener('click', clearAll);

let clearElement = document.querySelector('.CE');
clearElement.addEventListener('click', clearE);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') clearE();
})

for (const operatorBtn of operatorBtnList) {
    operatorBtn.addEventListener('click', () => operation(operatorBtn.textContent));
    document.addEventListener('keydown', (e) => {
        if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') operation(e.key);
    })
}

let equals = document.querySelector('.equals');
equals.addEventListener('click', equalsResult);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === '=') equalsResult();
})


function equalsResult () {
    count();
    number1 = '';
    operatorFlag = false;
    usedOperatorFlag = false;
}

function count() {
    if (operator !== '' && arr2 !== [] && !operatorFlag) {
        if (!resultUsedFlag) {
            number2 = output.value;
        }
        if (operator === '+') result = (Number(number1) + Number(number2));
        if (operator === '-') result = (Number(number1) - Number(number2));
        if (operator === '*') result = (Number(number1) * Number(number2));
        if (operator === '/') result = (Number(number1) / Number(number2));
        if (operator === '√') result = Math.pow((Number(number1)), 1 / Number(number2));
        output.value = Math.floor(result * 100000) / 100000;
        number1 = result;
        resultUsedFlag = true;
        operatorFlag = true;
        operator = '';
    }
}

function keyOut(key) {
    emptyFlag = false;
    if (operatorFlag || resultUsedFlag) output.value = '';
    output.value += key;
    if (arrFlag) {
        arr1 = output.value.split('');
        arr1.push(Number(key));
    } else {
        arr2 = output.value.split('');
        arr2.push(Number(key));
    }
    resultUsedFlag = false;
    operatorFlag = false;
}

function clearE() {
    let newArray = output.value.split('');
    newArray.pop();
    output.value = newArray.join('');
    if (resultUsedFlag) number1 = output.value;
}

function clearAll() {
    output.value = '';
    arr1 = [];
    arr2 = [];
    result = '';
    operator = '';
    arrFlag = true;
    emptyFlag = true;
    resultUsedFlag = false;
    usedOperatorFlag = false;
}

function operation(key) {
    if (!emptyFlag && !operatorFlag && !usedOperatorFlag) {
        operator = key;
        arrFlag = false;
        operatorFlag = true;
        usedOperatorFlag = true;
        result = '';
        arr2 = [];
        number1 = output.value;
        console.log('Yes');
    } else if (usedOperatorFlag) {
        count();
        operator = key;
    }
}

function pointOut() {
    let arr = output.value.split('');
    let counter = 0;
    for (const item of arr) {
        if (item === '.') counter++;
    }
    if (counter === 0 && !emptyFlag && !operatorFlag && !resultUsedFlag) {
        output.value += '.';
    }
}
