'use strict';

window.addEventListener('DOMContentLoaded', function () {



    // Tabs 

    let info = document.querySelector('.info-header'),
        infoTab = document.querySelectorAll('.info-header-tab'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabcontent(a) {
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabcontent(1);

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < infoTab.length; i++) {
                if (target == infoTab[i]) {
                    hideTabcontent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // --------------------------------------

    // Timer 

    let deadline = '2021-06-25T17:30+05:00';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()), // - количество миллисекунд между дедлайном и текущим временем
            seconds = Math.floor((t / 1000) % 60), // - количество секунд
            minutes = Math.floor(t / (1000 * 60) % 60), // - количество минут
            hours = Math.floor(t / (1000 * 60 * 60) % 24), // - количество часов
            days = Math.floor((t / (1000 * 60 * 60 * 24)) % 30), // - количество дней
            monthes = Math.floor(t / (1000 * 60 * 60 * 24 * 30)); //  количество месяцев

        return {
            'total': t,
            'monthes': monthes,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            monthes = timer.querySelector('.monthes'),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),

            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            monthes.textContent = t.monthes;
            days.textContent = t.days;
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total < 0) {
                clearInterval(timeInterval);
            }
        }

    }
    setClock('timer', deadline);

    // -----------------------------------------------

    // modal window 

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('.more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = 'visible';
    });

    // ------------------------------------------------


});


class User {
    constructor(name, id) {
        this.name = name;
        this.id = id;
        this.homan = true;
        this.isAdmin = true;
    }
    hello() {
        console.log('Hello, I\'m ' + this.name);
    }

}

let Alex = new User('Alex', 34),
    Sergey = new User('Sergey', 21);

User.prototype.exit = function () {
    console.log('Пользователь ' + this.name + ' ушел');
}
User.prototype.hungry = true;

// function showThis(a, b) {
//     console.log(this);
//     function sum() {
//         console.log(this);
//         return a + b;
//     }
//     console.log(sum());
// }

// showThis(8, 6);

// let obj = {
//     a: 10,
//     b: 34,
//     sum: function () {
//         // return this.a + this.b;
//         console.log(this);
//         console.log(this.a + this.b);
//     }
// }

// obj.sum();
// // Alex.hello();
// // Sergey.exit();

let user = {
    name: 'John',

};

function sayName() {
    console.log(this);
    console.log(this.name);
};
sayName.call(user);
sayName.apply(user);
