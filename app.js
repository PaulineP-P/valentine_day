// Ждем, пока весь HTML загрузится, чтобы скрипт точно нашел все элементы
document.addEventListener('DOMContentLoaded', function() {
    const noButton = document.getElementById('noBtn');
    const yesButton = document.getElementById('yesBtn');
    const questionSection = document.getElementById('questionSection');
    const yesMessage = document.getElementById('yesMessage');

    // Функция для получения случайного числа в диапазоне (min, max)
    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Функция, которая заставляет кнопку "убежать"
    function moveButton() {
        if (!noButton) return; // Если кнопки нет, выходим

        // Получаем размеры контейнера и кнопки, чтобы она не убегала за пределы экрана
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();

        // Рассчитываем максимальные координаты, куда можно сместить кнопку,
        // чтобы она оставалась видимой внутри контейнера (с небольшим отступом)
        const maxX = containerRect.width - buttonRect.width - 20; // 20px отступ справа
        const maxY = containerRect.height - buttonRect.height - 20; // 20px отступ снизу

        // Минимальные координаты (чтобы кнопка не улетела влево или вверх за пределы)
        const minX = 10;
        const minY = 10;

        // Генерируем случайные новые координаты для кнопки
        // Позиционирование относительно контейнера, поэтому используем containerRect для расчета,
        // но проще задавать в пикселях относительно исходного положения.
        // Используем style.left и style.top, так как кнопка имеет position: relative; в CSS.
        
        // Чтобы кнопка двигалась в пределах всего окна браузера (было веселее),
        // рассчитаем координаты относительно окна, но с учетом, что контейнер не должен ломаться.
        // Сделаем проще: будем двигать её в пределах видимой области, но следить, чтобы она не улетела за край.
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Текущие координаты кнопки
        const currentLeft = noButton.offsetLeft;
        const currentTop = noButton.offsetTop;

        // Генерируем новые координаты в пределах 0-90% от ширины/высоты окна,
        // но смещение будет относительно исходного положения в контейнере.
        // Так как кнопка relative, то смещение считается от её исходного места.
        // Это проще: дадим ей убегать в разные стороны на 100-200px.
        let newX = getRandomNumber(-150, 150);
        let newY = getRandomNumber(-150, 150);

        // Применяем новые координаты
        noButton.style.left = newX + 'px';
        noButton.style.top = newY + 'px';

        // Чтобы кнопка совсем не убегала за пределы экрана, можно немного скорректировать,
        // но для простоты и эффекта "убегания" оставим так. На маленьких экранах это будет забавно.
        // Альтернативный простой вариант: 
        // noButton.style.transform = `translate(${getRandomNumber(-50, 50)}px, ${getRandomNumber(-50, 50)}px)`;
    }

    // Добавляем обработчик события на кнопку "Нет"
    if (noButton) {
        // Событие mouseenter срабатывает, когда курсор мыши входит на территорию кнопки
        noButton.addEventListener('mouseenter', function(e) {
            moveButton();
        });

        // На случай, если на телефоне (там нет курсора мыши) — добавим обработчик клика,
        // чтобы кнопка тоже убегала при попытке нажатия.
        noButton.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем возможное действие по умолчанию
            moveButton();
        });

        // Чтобы кнопка не двигалась сразу при загрузке страницы, если мышь уже над ней,
        // но это редкость, оставим как есть.
    }

    // Обработка нажатия на кнопку "Да"
    if (yesButton) {
        yesButton.addEventListener('click', function() {
            // Прячем секцию с вопросом и кнопками
            if (questionSection) {
                questionSection.style.display = 'none';
            }
            // Показываем сообщение о согласии
            if (yesMessage) {
                yesMessage.classList.remove('hidden');
            }
        });
    }
});
