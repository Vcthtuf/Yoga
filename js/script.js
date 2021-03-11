window.addEventListener('DOMContentLoaded', function () {

    'use strict';

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

    // Timer 

    let deadline = '2021-06-25';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()), // - количество миллисекунд между дедлайном и текущим временем
            seconds = Math.floor((t / 1000) % 60), // - количество секунд
            minutes = Math.floor(t / (1000 * 60) % 60), // - количество минут
            hours = Math.floor(t / (1000 * 60 * 60) % 60) - 5, // - количество часов
            days = Math.floor(t / (1000 * 60 * 60 * 24)); // - количество дней

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            days = timer.querySelector('.days'),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
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

});