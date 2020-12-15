let minValue;
let maxValue;
let answerNumber;
let orderNumber = 1;
let gameRun = true;

const inputMin = document.getElementById('inputMin');
const inputMax = document.getElementById('inputMax');
const orderNumberField = document.getElementById('orderNumberField');
const answerField = document.getElementById('answerField');

orderNumberField.innerText = orderNumber;

// преобразование числа в текст по остатку от деления
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
    return text.length <= 20 ? text : number; // длина текста не более 20 символов
}

// минимальное значение
inputMin.addEventListener('change', function () {
    minValue = parseInt(inputMin.value);
    minValue = isNaN(minValue) ? 0 : minValue; // если NaN
    minValue = (-999 <= minValue && minValue <= 999) ? minValue : -999; // при выходе за границы
})

// максимальное значение
inputMax.addEventListener('change', function () {
    maxValue = parseInt(inputMax.value);
    maxValue = isNaN(maxValue) ? 100 : maxValue; // если NaN
    maxValue = (-999 <= maxValue && maxValue <= 999) ? maxValue : 999; // при выходе за границы
})

// кнопка Начать игру
document.getElementById('btnStart').addEventListener('click', function () {
    if (minValue > maxValue) { // если min max перепутаны местами
        let temp = minValue;
        minValue = maxValue;
        maxValue = temp;
    };
    minValue = isNaN(minValue) ? 0 : minValue; // если NaN
    maxValue = isNaN(maxValue) ? 100 : maxValue; // если NaN
    document.getElementById('leftEdge').innerText = minValue;
    document.getElementById('rightEdge').innerText = maxValue;
    document.getElementById('secondScreen').classList.remove("d-none"); // смена экрана
    document.getElementById('firstScreen').classList.add("d-none");
})

// кнопка Начали
document.getElementById('btnGoOn').addEventListener('click', function () {
    document.getElementById('leftEdge').innerText = minValue;
    document.getElementById('rightEdge').innerText = maxValue;
    document.getElementById('thirdScreen').classList.remove("d-none"); // смена экрана
    document.getElementById('secondScreen').classList.add("d-none");
    answerNumber = Math.floor((minValue + maxValue) / 2);
    answerField.innerText = `Вы загадали число ${figure2text(answerNumber)}?`;
})

// кнопка Заново
document.getElementById('btnRetry').addEventListener('click', function () {
    inputMin.value = ''; // сброс минимального значения
    minValue = parseInt(inputMin.value);
    inputMax.value = ''; // сброс максимального значения
    maxValue = parseInt(inputMax.value);
    orderNumber = 1; // сброс количества вопросов
    orderNumberField.innerText = orderNumber;
    document.getElementById('firstScreen').classList.remove("d-none"); // смена экрана
    document.getElementById('thirdScreen').classList.add("d-none");
    gameRun = true;
})

// кнопка Больше
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
            minValue = answerNumber + 1; // изменение нижней границы поискового диапазона
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round(Math.random() * 2); // вопрос в 3 вариантах
            answerField.innerText = (phraseRandom === 0) ?
                `Вы загадали число ${figure2text(answerNumber)}?` :
                (phraseRandom === 1) ?
                `Да это легко! Ты загадал ${figure2text(answerNumber) }?` :
                `Наверное, это число ${figure2text(answerNumber )}?`;
        }
    }
})

// кнопка Меньше
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
            maxValue = answerNumber; // изменение верхней границы поискового диапазона
            answerNumber = Math.floor((minValue + maxValue) / 2);
            orderNumber++;
            orderNumberField.innerText = orderNumber;
            const phraseRandom = Math.round(Math.random() * 2); // вопрос в 3 вариантах
            answerField.innerText = (phraseRandom === 0) ?
                `Вы загадали число ${figure2text(answerNumber) }?` :
                (phraseRandom === 1) ?
                `Да это легко! Ты загадал ${figure2text(answerNumber) }?` :
                `Наверное, это число ${figure2text(answerNumber) }?`;
        }
    }
})

// кнопка Верно
document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun) {
        const phraseRandom = Math.round(Math.random() * 2); // сообщение об успехе в 3 вариантах
        answerField.innerText = (phraseRandom === 0) ?
            'Я всегда угадываю\n\u{1F60E}' :
            (phraseRandom === 1) ?
            'Это было легко\n\u{1F607}' :
            'Кто молодец?\n\u{1F913}';
        gameRun = false;
    }
})