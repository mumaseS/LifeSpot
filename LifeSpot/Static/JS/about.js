/*
* Конструктор, через который создаётся комментарий
*
* */
function Comment() {
    // Запросим имя
    this.author = prompt("Как вас зовут ?")
    if (this.author == null) {
        this.empty = true
        return
    }

    // Запросим текст
    this.text = prompt("Оставьте отзыв")
    if (this.text == null) {
        this.empty = true
        return
    }

    // Сохраним текущее время
    this.date = new Date().toLocaleString()
}

/*
* Оставить комментарий
*
* */
function addComment() {
    let comment = new Comment()

    // проверяем, успешно ли юзер осуществил ввод
    if (comment.empty) {
        return;
    }

    // Запросим, хочет ли пользователь оставить полноценный отзыв или это будет обычный комментарий
    let enableLikes = confirm('Разрешить пользователям оценивать ваш отзыв?')

    if (enableLikes) {
        // Создадим для отзыва новый объект из прототипа - комментария
        let review = Object.create(comment)
        // и добавим ему нужное свойство
        review.rate = 0;

        // Добавляем отзыв с возможностью пользовательских оценок
        writeReview(review)
    } else {
        // Добавим простой комментарий без возможности оценки
        writeReview(comment)
    }
}


/*
 * Запишем объект на страницу
 *
 * */
const writeReview = review => {
    let likeCounter = '';

    // Если публикуется отзыв - добавляем ему кнопку с лайками.
    if (review.hasOwnProperty('rate')) {

        // Генерим идентификатор комментария.
        let commentId = Math.random();
        // Для кнопки лайков добавляем: идентификатор, атрибут onclick для передачи идентификатора в функцию, значок лайка, и само значение счётчика отделяем пробелом
        // Также мы добавили стиль, чтобы кнопка смотрелась лучше и не имела рамок
        likeCounter += '<button id="' + commentId + '" style="border: none" onclick="addLike(this.id)">' + `❤️ ${review.rate}</button>`
    }
    // Запишем результат 
    document.getElementsByClassName('reviews')[0].innerHTML += ' <div class="review-    text">\n' + `<p> <i> <b>${review['author']}</b> ${review['date']}${likeCounter}</i></p>` + `<p>${review['text']}</p>` + '</div>';
}
/*
* Увеличивает счётчик лайков
*
* */
function addLike(id) {
    // Найдём нужный элемент по id
    let element = document.getElementById(id);

    // Преобразуем текст элемента в массив, разбив его по пробелам (так как счётчик лайков у нас отделен от символа ❤️пробелом)
    let array = element.innerText.split(' ')

    // Вытащим искомое значение счётчика и сразу же преобразуем его в число, так как
    // при сложении любого значения со строкой в JS будет строка, а нам этого не требуется
    let resultNum = parseInt(array[array.length - 1], 10);

    // Увеличим счётчик
    resultNum += 1

    // Сохраним измененное значение обратно в массив
    array[array.length - 1] = `${resultNum}`

    // Обновим текст элемента
    element.innerText = array.join(' ')
}


// -- Переключение слайдов стрелками

let slideIndex = 1;
showSlides(slideIndex);

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// -- Переключение слайдов мышкой

var initMouseX;
var isMonitored = false;
function startListen() {
    showSlides(1);
    ssContainer = document.getElementById('slideContainer');

    ssContainer.addEventListener('mousedown', (event) => {
        event.preventDefault();
        console.log('mouse is down');
        if (isMonitored == false) {
            isMonitored = true;
            initMouseX = event.clientX;
            ssContainer.addEventListener('mousemove', (e) => {
                let currentMouseX = event.clientX;
                console.log(`Mouse X: ${currentMouseX} from startListen`);
                if (currentMouseX - initMouseX > 100) {
                    initMouseX = currentMouseX;
                    plusSlides(1);
                }

            });
        } else {
            isMonitored = false;
        }

    });

    ssContainer.addEventListener('mouseup', (evt) => { evt.preventDefault(); console.log('mouse is up'); });

}


var mouseXStartPosition;
function mouseDownProcess(event) {
    console.log('--mouseDownProcess started--');
    mouseXStartPosition = event.clientX;
    console.log(mouseXStartPosition);
    document.addEventListener('mouseup', (event) => {
        event.preventDefault();
        console.log('mouseup happened');
    });

}

function mouseUpProcess(event) {
    event.preventDefault();
    console.log('--mouseUpProcess started--');
    let mouseXEndPosition = event.clientX;
    console.log(`Mouse X: ${event.clientX}`);
    console.log(mouseXEndPosition - mouseXStartPosition);

}

function miceUpImg1(event) {
    event.preventDefault();
    console.log('--mouseUpImg1 started--');
    let miceUpPosition = event.clientX;
    console.log(miceUpPosition);

}