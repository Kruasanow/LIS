let listcoord = {};

function addMap() {
    const map = L.map('map').setView([0, 0], 2);  // Устанавливаем координаты карты
    let currentMarker = null;

    // Получаем элементы формы
    const latInput = document.querySelector('input[name="latitude"]');
    const lonInput = document.querySelector('input[name="longitude"]');
    const form = document.getElementById('sendevent');

    // Функция для отображения выбранных координат в форме
    function updateForm(lat, lon) {
        latInput.value = lat;
        lonInput.value = lon;
    }

    // Функция для подтверждения выбранных координат
    function confirmCoordinates(lat, lon) {
        // Добавляем или обновляем координаты в объекте
        listcoord['latitude'] = lat;
        listcoord['longitude'] = lon;
        console.log("Confirmed coordinates:", listcoord);
    }

    // Обработчик клика по карте
    map.on('click', function(e) {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;

        if (currentMarker !== null) {
            map.removeLayer(currentMarker);
        }

        currentMarker = L.marker([lat, lon]).bindPopup('Coordinates').addTo(map);

        // Отображаем координаты в форме
        updateForm(lat, lon);

        // Подтверждаем координаты
        confirmCoordinates(lat, lon);
    });

    // Добавляем обработчик отправки формы только один раз
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();  // Отменяем стандартную отправку формы

            // Создаем новый объект FormData с данными формы
            var formData = new FormData(form);

            // Получаем файлы изображения и добавляем их в formData
            var imgFiles = $('input[name="img"]')[0].files;
            if (imgFiles.length > 0) {
                for (var i = 0; i < imgFiles.length; i++) {
                    formData.append('img[]', imgFiles[i]);
                }
            }

            // Выводим содержимое formData в консоль для отладки
            for (var pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            // Отправляем данные на сервер с помощью AJAX
            $.ajax({
                url: '/api/addevent',  // Путь на сервере для обработки данных
                type: 'POST',
                data: formData,
                contentType: false,  // Чтобы jQuery не устанавливала contentType автоматически
                processData: false,  // Чтобы jQuery не пыталась преобразовать данные
                success: function(response) {
                    $('#message').html('<p>Форма успешно отправлена!</p>');
                },
                error: function(xhr, status, error) {
                    $('#message').html('<p>Ошибка: ' + error + '</p>');
                }
            });
        });
    }

    // Добавляем карту с OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'OpenStreetMap'
    }).addTo(map);

    // Добавляем масштаб
    L.control.scale().addTo(map);
}

addMap();
