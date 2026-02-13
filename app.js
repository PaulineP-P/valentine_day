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
        
        // Рассчитываем максимальные координаты
        const maxX = viewportWidth - buttonRect.width - 30;
        const maxY = viewportHeight - buttonRect.height - 30;
        
        // Минимальные координаты
        const minX = 10;
        const minY = 10;
        
        // Генерируем случайные координаты
        const newX = Math.min(maxX, Math.max(minX, getRandomNumber(10, maxX)));
        const newY = Math.min(maxY, Math.max(minY, getRandomNumber(10, maxY)));
        
        // Применяем фиксированное позиционирование
        noButton.style.position = 'fixed';
        noButton.style.left = newX + 'px';
        noButton.style.top = newY + 'px';
        noButton.style.zIndex = '9999';
        
        // Добавляем эффект "испуга"
        noButton.style.transform = 'scale(0.9) rotate(-5deg)';
        noButton.style.boxShadow = '0 15px 30px #ff69b4';
        
        setTimeout(() => {
            noButton.style.transform = 'scale(1) rotate(3deg)';
            setTimeout(() => {
                noButton.style.transform = 'scale(1) rotate(0deg)';
            }, 100);
        }, 150);
    }

    // Обработчики для кнопки "Нет"
    if (noButton) {
        // При наведении мыши
        noButton.addEventListener('mouseenter', function(e) {
            moveButton();
        });
        
        // Для телефона
        noButton.addEventListener('touchstart', function(e) {
            e.preventDefault();
            moveButton();
        });
        
        // Защита от нажатия
        noButton.addEventListener('click', function(e) {
            e.preventDefault();
            moveButton();
        });
    }

    // Обработка нажатия на кнопку "Да"
    if (yesButton) {
        yesButton.addEventListener('click', function() {
            // Эффект вспышки
            document.body.style.background = '#ffe4ec';
            document.body.style.transition = 'background 0.5s ease';
            
            setTimeout(() => {
                document.body.style.background = 'linear-gradient(145deg, #fff0f5 0%, #ffe4ec 50%, #ffd9e4 100%)';
            }, 300);
            
            // Плавно скрываем вопрос
            questionSection.style.opacity = '0';
            questionSection.style.transition = 'opacity 0.5s ease';
            
            setTimeout(() => {
                questionSection.classList.add('hidden');
                successSection.classList.remove('hidden');
                successSection.style.opacity = '0';
                successSection.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    successSection.style.opacity = '1';
                }, 50);
            }, 500);
        });
    }

    // Сброс позиции кнопки при изменении размера окна
    window.addEventListener('resize', function() {
        if (noButton && !successSection.classList.contains('hidden')) {
            noButton.style.position = 'relative';
            noButton.style.left = '';
            noButton.style.top = '';
            noButton.style.transform = '';
        }
    });

    // Добавляем легкие сердечки при движении мыши (для атмосферы)
    document.addEventListener('mousemove', function(e) {
        if (!successSection.classList.contains('hidden')) return;
        if (Math.random() > 0.1) return; // 10% шанс появления
        
        const heart = document.createElement('div');
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.fontSize = '20px';
        heart.style.color = '#ff69b4';
        heart.style.opacity = '0.5';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9998';
        heart.style.transition = 'all 1s ease';
        heart.textContent = '💗';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
            heart.style.opacity = '0';
            heart.style.transform = 'translateY(-30px) rotate(20deg)';
            setTimeout(() => {
                heart.remove();
            }, 1000);
        }, 50);
    });
});
