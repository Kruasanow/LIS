let listcoord = {};

function addMap() {
    const map = L.map('map').setView({lon: 0, lat: 0}, 2);
    let selectedCoordinates = null;

    // Получаем элементы формы
    const latInput = document.querySelector('input[name="latitude"]');
    const lonInput = document.querySelector('input[name="longitude"]');
    const form = document.getElementById('sendevent');

    let currentMarker = null;

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
        };

        function addlistmarkers() {
            currentMarker = L.marker([lat, lon]).bindPopup('pizda').addTo(map);
        }
        addlistmarkers();

        // Отображаем координаты в форме
        updateForm(lat, lon);

        // Подтверждаем координаты после клика
        confirmCoordinates(lat, lon);
    });

    // Логика отправки формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Собираем данные из формы
        const formData = new FormData(form);
        const jsonData = {};

        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        // Добавляем координаты в данные
        jsonData['latitude'] = listcoord.latitude;
        jsonData['longitude'] = listcoord.longitude;

        // Отправляем данные в формате JSON на сервер
        $.ajax({
            url: "/api/addevent",
            method: "POST",
            data: JSON.stringify(jsonData),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (data) {
              if (data.status === "success") {
                $("#message").html(data.message);
              } else {
                $("#message").html(`Ошибка: ${data.message}`);
              }
            },
            error: function (xhr, status, error) {
              console.error("Error: ", xhr, status, error);
            },
          });
    });

    // Добавляем карту с OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'OpenStreetMap'
    }).addTo(map);

    // Добавляем масштаб
    L.control.scale().addTo(map);
}

addMap();