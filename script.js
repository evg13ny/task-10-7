let minValue = parseInt(prompt('Минимальное знание числа для игры', '0')) || 0;
minValue = (-999 <= minValue && minValue <= 999) ? minValue : -999;
let maxValue = parseInt(prompt('Максимальное знание числа для игры', '100')) || 100;
maxValue = (-999 <= maxValue && maxValue <= 999) ? maxValue : 999;
alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
let answerNumber = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');


function figure2text(number) {
    let units = {
        1: 'один',
        2: 'два',
        3: 'три',
        4: 'четыре',
        5: 'пять',
        6: 'шесть',
        7: 'семь',
        8: 'восемь',
        9: 'девять',
    };
    let dozens = {
        10: 'десять',
        11: 'одиннадцать',
        12: 'двенадцать',
        13: 'тринадцать',
        14: 'четырнадцать',
        15: 'пятнадцать',
        16: 'шестнадцать',
        17: 'семнадцать',
        18: 'восемнадцать',
        19: 'девятнадцать',
    };
    let decades = {
        2: 'двадцать',
        3: 'тридцать',
        4: 'сорок',
        5: 'пятьдесять',
        6: 'шестьдесят',
        7: 'семьдесят',
        8: 'восемьдесят',
        9: 'девяносто',
    };
    let hundreds = {
        1: 'сто',
        2: 'двести',
        3: 'триста',
        4: 'четыреста',
        5: 'пятьсот',
        6: 'шестьсот',
        7: 'семьсот',
        8: 'восемьсот',
        9: 'девятьсот',
    };

    let text = '';
    let num = parseInt(number);
    key = null;

    if (num === 0) {
        text = '0';
    }
    if (num < 0) {
        text += 'минус ';
        num = Math.abs(num);
    }
    if (num >= 100) {
        key = Math.floor(num / 100);
        num = num - key * 100;
        text += hundreds[key] + ' ';
    }
    if (num >= 20) {
        key = Math.floor(num / 10);
        num = num - key * 10;
        text += decades[key] + ' ';
    }
    if (num >= 10 && num < 20) {
        text += dozens[num];
    }
    if (num > 0 && num < 10) {
        text += units[num];
    }
    
    text.trim;
    return text.length <= 20 ? text : number;
}


orderNumberField.innerText = orderNumber;
answerField.innerText = `Вы загадали число ${figure2text(answerNumber)}?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    minValue = parseInt(prompt('Минимальное знание числа для игры', '0')) || 0;
    minValue = (-999 <= minValue && minValue <= 999) ? minValue : -999;
    maxValue = parseInt(prompt('Максимальное знание числа для игры', '100')) || 100;
    maxValue = (-999 <= maxValue && maxValue <= 999) ? maxValue : 999;
    orderNumber = 1;
    answerNumber = Math.floor((minValue + maxValue) / 2);
    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);
    orderNumberField.innerText = orderNumber;
    answerField.innerText = `Вы загадали число ${figure2text(answerNumber)}?`;
    gameRun = true;
})

document.getElementById('btnOver').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                'Вы загадали неправильное число!\n\u{1F914}' :
                'Я сдаюсь..\n\u{1F92F}';
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            minValue = answerNumber + 1;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round(Math.random() * 2);
            answerField.innerText = (phraseRandom === 0) ?
                `Вы загадали число ${figure2text(answerNumber)}?` :
                (phraseRandom === 1) ?
                `Да это легко! Ты загадал ${figure2text(answerNumber) }?` :
                `Наверное, это число ${figure2text(answerNumber )}?`;
        }
    }
})

document.getElementById('btnLess').addEventListener('click', function () {
    if (gameRun) {
        if (minValue === maxValue) {
            const phraseRandom = Math.round(Math.random());
            const answerPhrase = (phraseRandom === 1) ?
                'Вы загадали неправильное число!\n\u{1F914}' :
                'Я сдаюсь..\n\u{1F92F}';
            answerField.innerText = answerPhrase;
            gameRun = false;
        } else {
            maxValue = answerNumber;
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round(Math.random() * 2);
            answerField.innerText = (phraseRandom === 0) ?
                `Вы загадали число ${figure2text(answerNumber) }?` :
                (phraseRandom === 1) ?
                `Да это легко! Ты загадал ${figure2text(answerNumber) }?` :
                `Наверное, это число ${figure2text(answerNumber) }?`;
        }
    }
})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        const phraseRandom = Math.round(Math.random() * 2);
        answerField.innerText = (phraseRandom === 0) ?
            'Я всегда угадываю\n\u{1F60E}' :
            (phraseRandom === 1) ?
            'Это было легко\n\u{1F607}' :
            'Кто молодец?\n\u{1F913}';
        gameRun = false;
    }
})