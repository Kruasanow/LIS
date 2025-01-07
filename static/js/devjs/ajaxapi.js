function apiCarousel(){
window.onload = function () {
  fetch("/api/getevents")
    .then((response) => response.json())
    .then((data) => {
      const carousel = document.getElementById("carousel");
      data.forEach((item) => {
        const card = document.createElement("article");
        card.id = "card-1";
        card.innerHTML = `
                          <div class="Card-media">
                              <img 
                                class="Card__image"
                                alt="Card image description"
                                width="480"
                                height="480"
                                loading="lazy"
                                src="${item.image_url}" alt="${item.title}"
                              />
                          </div>
                          <div class="Card-main">
                              <h2 class="Card__heading">
                                <a class="Card_link" href="#">${item.title}</a>
                              </h2>
                              <p>${item.description}</p>
                              <p>${item.date}</p>
                          </div>
                      `;
        carousel.appendChild(card);
      });
    })
    .catch((error) => console.error("Error loading items:", error));
};
};
apiCarousel()