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
        
        // Добавляем неоновый след
        noButton.style.boxShadow = '0 0 30px #ff00a6, 0 0 60px #ff00a6';
        
        // Анимация испуга
        noButton.style.transform = 'scale(0.8) rotate(5deg)';
        setTimeout(() => {
            noButton.style.transform = 'scale(1) rotate(-5deg)';
            setTimeout(() => {
                noButton.style.transform = 'scale(1) rotate(0deg)';
            }, 100);
        }, 100);
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
        
        // Чтобы кнопка не убегала слишком далеко при скролле
        window.addEventListener('scroll', function() {
            if (noButton.style.position === 'fixed') {
                moveButton();
            }
        });
    }

    // Обработка нажатия на кнопку "Да"
    if (yesButton) {
        yesButton.addEventListener('click', function() {
            // Неоновый эффект при нажатии
            document.body.style.background = '#ff00a6';
            document.body.style.transition = 'background 0.5s ease';
            
            setTimeout(() => {
                document.body.style.background = '#000';
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
            noButton.style.boxShadow = '0 0 15px #ff00a6';
        }
    });

    // Добавляем неоновые искры при движении мыши
    document.addEventListener('mousemove', function(e) {
        if (!successSection.classList.contains('hidden')) return;
        
        const spark = document.createElement('div');
        spark.style.position = 'fixed';
        spark.style.left = e.clientX + 'px';
        spark.style.top = e.clientY + 'px';
        spark.style.width = '5px';
        spark.style.height = '5px';
        spark.style.background = '#ff00a6';
        spark.style.borderRadius = '50%';
        spark.style.boxShadow = '0 0 20px #ff00a6, 0 0 40px #ff00a6';
        spark.style.pointerEvents = 'none';
        spark.style.zIndex = '9998';
        spark.style.transition = 'all 1s ease';
        
        document.body.appendChild(spark);
        
        setTimeout(() => {
            spark.style.opacity = '0';
            spark.style.transform = 'translateY(-30px)';
            setTimeout(() => {
                spark.remove();
            }, 1000);
        }, 50);
    });
});
