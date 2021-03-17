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
            seconds = timer.querySelector('.seconds');

        let updateClock = () => {
            let t = getTimeRemaining(endtime);
            monthes.textContent = t.monthes;
            days.textContent = t.days;
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total < 0) {
                clearInterval(timeInterval);
            }
        };

        let timeInterval = setInterval(updateClock, 1000);



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

    // form 

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Мы с Вами скоро свяжемся',
        failure: 'Что-то пошло не так'
    }

    let form = document.querySelector('.main-form'),
        input = form.querySelectorAll('input'),
        statusMessage = document.createElement('div');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        let formData = new FormData(form);
        request.send(formData);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status === 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

    });



});

