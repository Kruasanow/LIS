function apiCarousel() {
    window.onload = function () {
      fetch("/api/getevents")
        .then((response) => response.json())
        .then((data) => {
          const carousel = document.getElementsByClassName("list")[0];
  
          // Очистка контейнера перед добавлением новых элементов (если нужно)
          // carousel.innerHTML = '';
  
          data.forEach((item, index) => {
            const card = document.createElement("li");
            card.className = 'item';
  
            card.innerHTML = `
              <input type="radio" id="radio_testimonial-${index + 1}" name="basic_carousel" ${index === 0 ? 'checked' : ''} />
              <label class="label_testimonial-${index + 1}" for="radio_testimonial-${index + 1}">${item.title}</label>
              <div class="content-test content_testimonial-${index + 1}">
                <span class="picto"></span>
                <h1>${item.title}</h1>
                <p>“${item.description}”</p>
                <p class="testimonialFrom">Kruasanow</p>
                <p class="testimonialState">${item.date}</p>
              </div>
            `;
            carousel.appendChild(card);
          });
        })
        .catch((error) => console.error("Error loading items:", error));
    };
  }
  apiCarousel();
  