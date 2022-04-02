window.addEventListener('DOMContentLoaded', () => {
    // TIMER
    const deadline = '2022-12-02';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer__wrapper', deadline);
    // //TIMER

    // GAME
    const area = document.querySelector('.game__wrapper'),
        modalContent = document.querySelector('.game__content'),
        modalOverlay = document.querySelector('.game__overlay'),
        modalBtnClose = document.querySelector('.game__close'),
        modalResult = document.querySelector('.game__modal');
    let move = 0;
    let result = '';

    area.addEventListener('click', (e) => {
        const target = e.target;
        if (target.className = 'game__block') {
            move % 2 === 0 ? target.innerHTML = 'X' : target.innerHTML = '0';
            move++;
            check();
        }
    });

    const check = () => {
        const boxes = document.querySelectorAll('.game__block');
        const arr = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (i = 0; i < arr.length; i++) {
            if (boxes[arr[i][0]].innerHTML == 'X' && boxes[arr[i][1]].innerHTML == 'X' && boxes[arr[i][2]].innerHTML == 'X') {
                result = 'крестики';
                prepareResult(result);
            } else if (boxes[arr[i][0]].innerHTML == '0' && boxes[arr[i][1]].innerHTML == '0' && boxes[arr[i][2]].innerHTML == '0') {
                result = 'нолики';
                prepareResult(result);
            } else if (move == 9) {
                result = 'ничья';
                prepareResult(result);
            }
        }
    }
    const prepareResult = winner => {
        modalContent.innerHTML = `Победили ${winner}`;
        modalResult.style.display = 'block';
        modalResult.classList.add('fade');
    }
    const closeModal = () => {
        modalResult.style.display = 'none';
        location.reload();
    }
    modalOverlay.addEventListener('click', closeModal);
    modalBtnClose.addEventListener('click', closeModal);
    // //GAME

    // CLICKER
    const clickerScore = document.querySelector('.clicker__score'),
        clickerBtn = document.querySelector('.clicker__block');
    let counter = 0;

    clickerBtn.addEventListener('click', (e) => {
        let target = e.target;
        if (target.className = 'clicker__block') {
            counter % 2 === 0 ? target.style.transform = 'scale(.98)' : target.style.transform = 'scale(1)';
        }
        clickerScore.textContent = counter;
        counter++;

    });
    // //CLICKER


    // SNOW NAVIGATION
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');

            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };
    // //SNOW NAVIGATION


});

