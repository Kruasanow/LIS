// function apiCarousel() {
//   window.onload = function () {
//     fetch("/api/getevents")
//       .then((response) => response.json())
//       .then((data) => {
//         const carousel = document.getElementById("card-carousel");

//         // Убедимся, что контейнер пуст перед добавлением новых карточек
//         carousel.innerHTML = '';

//         data.forEach((item) => {
//           const card = document.createElement("div");
//           card.className = "card";
//           card.innerHTML = `
//             <div class="image-container" style="background-image: url('{{ url_for('static', filename='upload/' + item.title + '/' + item.image_url) }}');"></div>
//             <p>${item.title}</p>
//             <p>${item.description}</p>
//             <p>${item.date}</p>
//           `;
//           carousel.appendChild(card);
//         });

//         // После добавления карточек, инициализируем карусель
//         const carouselInstance = new CardCarousel(carousel);
//       })
//       .catch((error) => console.error("Error loading items:", error));
//   };
// }
// apiCarousel();