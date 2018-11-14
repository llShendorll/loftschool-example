/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    const newDiv = document.createElement('div');

    newDiv.style.height = getRandom(1, 600) + 'px';
    newDiv.style.width = getRandom(1, 600) + 'px';
    newDiv.style.backgroundColor = '#' + Math.random().toString(16).slice(-6);
    newDiv.style.position = 'absolute';
    newDiv.style.left = getRandom(1, 600) + 'px';
    newDiv.style.top = getRandom(1, 600) + 'px';
    newDiv.classList.add('draggable-div');

    return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    target.addEventListener('mousedown', (event) => {
        let oX = event.pageX - target.getBoundingClientRect().left;
        let oY = event.pageY - target.getBoundingClientRect().top;

        let moveTo = (event) => {
            target.style.left = event.pageX - oX + 'px';
            target.style.top = event.pageY - oY + 'px';
        };

        let mouseUp = () => {
            document.removeEventListener('mousemove', moveTo);
            target.removeEventListener('mouseup', mouseUp);
        };

        document.addEventListener('mousemove', moveTo);
        target.addEventListener('mouseup', mouseUp);
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
