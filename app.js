document.addEventListener('DOMContentLoaded', function() {
    const noButton = document.getElementById('noBtn');
    const yesButton = document.getElementById('yesBtn');
    const questionSection = document.getElementById('questionSection');
    const successSection = document.getElementById('successSection');
    
    // Функция для получения случайного числа
    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Функция для перемещения кнопки "Нет"
    function moveButton() {
        if (!noButton) return;

        // Получаем размеры окна и кнопки
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const buttonRect = noButton.getBoundingClientRect();
        
        // Рассчитываем максимальные координаты, чтобы кнопка не уходила за край
        const maxX = viewportWidth - buttonRect.width - 50;
        const maxY = viewportHeight - buttonRect.height - 50;
        
        // Минимальные координаты
        const minX = 20;
        const minY = 20;
        
        // Генерируем случайные координаты
        const newX = Math.min(maxX, Math.max(minX, getRandomNumber(20, maxX)));
        const newY = Math.min(maxY, Math.max(minY, getRandomNumber(20, maxY)));
        
        // Применяем фиксированное позиционирование, чтобы кнопка могла двигаться по всему экрану
        noButton.style.position = 'fixed';
        noButton.style.left = newX + 'px';
        noButton.style.top = newY + 'px';
        noButton.style.zIndex = '1000';
        
        // Добавляем небольшую анимацию
        noButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            noButton.style.transform = 'scale(1)';
        }, 200);
    }

    // Обработчики для кнопки "Нет"
    if (noButton) {
        // Для компьютера - при наведении мыши
        noButton.addEventListener('mouseenter', function(e) {
            moveButton();
        });
        
        // Для телефона - при попытке нажать
        noButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            moveButton();
        });
        
        // Дополнительная защита от нажатия
        noButton.addEventListener('click', function(e) {
            e.preventDefault();
            moveButton();
        });
    }

    // Обработка нажатия на кнопку "Да"
    if (yesButton) {
        yesButton.addEventListener('click', function() {
            // Плавно скрываем секцию с вопросом
            questionSection.style.opacity = '0';
            questionSection.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                questionSection.classList.add('hidden');
                // Показываем секцию с успехом
                successSection.classList.remove('hidden');
                successSection.style.opacity = '0';
                successSection.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    successSection.style.opacity = '1';
                }, 50);
            }, 500);
        });
    }

    // Сбрасываем позицию кнопки при изменении размера окна
    window.addEventListener('resize', function() {
        if (noButton && !successSection.classList.contains('hidden')) {
            noButton.style.position = 'relative';
            noButton.style.left = '';
            noButton.style.top = '';
        }
    });
});
