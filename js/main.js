
gsap.registerPlugin(ScrollTrigger)

gsap.from('.timer', {
    y: '-200%',
    delay: .3
});
gsap.from('.timer__inner', {
    opacity: 0,
    delay: 1
});

gsap.from('.hamburger', {
    opacity: 0,
    delay: 1.5
});
gsap.from('.link', {
    y: '300%',
    delay: 1
});
gsap.from('.social', {
    y: '300%',
    delay: 1.2
});

window.addEventListener('DOMContentLoaded', () => {

    // TIMER
    function timer() {
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
    }
    timer();

    // //TIMER

    // GAME
    function game() {
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
    }
    game();

    // //GAME

    // CLICKER
    function clicker() {
        const clickerScore = document.querySelector('.clicker__score'),
            clickerBtn = document.querySelector('.clicker__btn');
        let counter = 0;

        clickerBtn.addEventListener('click', (e) => {
            let target = e.target;
            if (target.className = 'clicker__btn') {
                counter % 2 === 0 ? target.style.transform = 'scale(.98)' : target.style.transform = 'scale(1)';
            }
            clickerScore.textContent = counter;
            counter++;
        });
    }
    clicker();


    // //CLICKER

    // WORDS
    function words() {
        const enWord = document.querySelector('#en'),
            ruWord = document.querySelector('#ru'),
            inputs = document.querySelectorAll('.words__input'),
            btnAdd = document.querySelector('.words__btn'),
            table = document.querySelector('.words__block');

        let words;
        let btnDelete;

        localStorage.length < 1 ? words = [] : words = JSON.parse(localStorage.getItem('words'));

        const addWordToTable = (index) => {
            table.innerHTML += `
        <div class="add_wrapper">
            <span class="add_en">${words[index].enlish}</span>
            <span class="add_ru">${words[index].russian}</span>
            <button class="add_delete">-</button>
        </div>
        `
        }

        words.forEach((elem, i) => {
            addWordToTable(i);
            elem.addEventListener('click', function () {
                elem.classList.remove('add_wrapper')
            })
        });

        btnAdd.addEventListener('click', () => {
            if (enWord.value.length < 1 ||
                ruWord.value.length < 1 ||
                !isNaN(enWord.value) ||
                !isNaN(ruWord.value)) {
                for (let key of inputs) {
                    key.classList.add('error');
                }
            } else {
                for (let key of inputs) {
                    key.classList.remove('error');
                }
                words.push(new createWord(enWord.value, ruWord.value));
                localStorage.setItem('words', JSON.stringify(words));
                addWordToTable(words.length - 1);
                enWord.value = null;
                ruWord.value = null;
            }
        });

        function createWord(english, russian) {
            this.english = english;
            this.russian = russian;
        }

        const deleteWord = (e) => {
            const rowIndex = e.target.parentNode.rowIndex;
            e, target.parentNode.parentNode.remove();
            words.splice(rowIndex, 1);
            localStorage.removeItem('words');
            localStorage.setItem('words', JSON.stringify(words));
        }

        const addEventDelete = () => {
            if (words.length > 0) {
                btnDelete = document.querySelectorAll('.add_delete');
                for (let btn of btnDelete) {
                    btn.addEventListener('click', (e) => {
                        deleteWord(e);
                    });
                }
            }
        }
        addEventDelete();
    }

    // //WORDS


    // MENU
    function menu() {
        const menu = document.querySelector('.menu'),
            menuOpen = document.querySelector('.hamburger'),
            menuClose = document.querySelector('.menu__close');

        menuOpen.addEventListener('click', () => {
            menu.style.display = 'block';
            menuOpen.style.opacity = '0';
        });

        menuClose.addEventListener('click', () => {
            menu.style.display = 'none';
            menuOpen.style.opacity = '1';
        });
    }
    menu();

    // //MENU

    // SNOW NAVIGATION
    function snowNavigation() {
        const smoothLinks = document.querySelectorAll('a[href^="#"]'),
            menu = document.querySelector('.menu'),
            hamburger = document.querySelector('.hamburger');
        for (let smoothLink of smoothLinks) {
            smoothLink.addEventListener('click', function (e) {
                e.preventDefault();
                const id = smoothLink.getAttribute('href');
                menu.style.display = 'none';
                hamburger.style.opacity = '1';

                document.querySelector(id).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        };
    }
    snowNavigation();
    // //SNOW NAVIGATION


});