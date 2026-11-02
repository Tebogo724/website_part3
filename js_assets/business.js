// Mobile navigation functionality

const menuButton = document.getElementById("menu-button");
const navigationMenu = document.getElementById("navigation-menu");

if (menuButton && navigationMenu) {
    menuButton.addEventListener("click", function () {

        navigationMenu.classList.toggle("show-menu");

    });
}
function changeImage(image) {

    const featuredImage = document.getElementById("featured-image");

    featuredImage.src = image.src;
    featuredImage.alt = image.alt;

}

let currentProperty = 0;

const properties = [
    {
        id: "building",
        image: "_images/apartment_building.jpg",
        title: "Brand New Apartments",
        location: "Location: Cape Town",
        price: "Rent: From R7,900 per month",
        description: "Available options include one, two and three-bedroom apartments."
    },
    {
        id: "two-bedroom",
        image: "_images/apartments_two.jpg",
        title: "2-bedroom Apartments For Sale",
        location: "Location: Cape Town",
        price: "Price: R1,200,000",
        description: "Two-bedroom apartments available for sale."
    },
    {
        id: "single-bedroom",
        image: "_images/apartments_three.jpg",
        title: "Single Bedroom Apartments For Sale",
        location: "Location: Cape Town",
        price: "Price: R850,000",
        description: "Single-bedroom apartments available for sale."
    }
];

function openLightbox(property) {

    currentProperty = properties.findIndex(item => item.id === property);

    showProperty();

    document.getElementById("lightbox").style.display = "flex";
}

function showProperty() {

    const property = properties[currentProperty];

    document.getElementById("lightbox-image").src = property.image;
    document.getElementById("lightbox-image").alt = property.title;

    document.getElementById("property-title").textContent = property.title;
    document.getElementById("property-location").textContent = property.location;
    document.getElementById("property-price").textContent = property.price;
    document.getElementById("property-description").textContent = property.description;
}

function nextProperty() {

    currentProperty++;

    if (currentProperty >= properties.length) {
        currentProperty = 0;
    }

    showProperty();
}

function previousProperty() {

    currentProperty--;

    if (currentProperty < 0) {
        currentProperty = properties.length - 1;
    }

    showProperty();
}

function closeLightbox() {

    const lightbox = document.getElementById("lightbox");

    lightbox.style.display = "none";

}

document.addEventListener("keydown", function(event) {

    const lightbox = document.getElementById("lightbox");

    if (lightbox.style.display === "flex") {

        if (event.key === "ArrowRight") {
            nextProperty();
        }

        if (event.key === "ArrowLeft") {
            previousProperty();
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

    }

});

// Interactive property map

const propertyMap = document.getElementById("property-map");

if (propertyMap && typeof L !== "undefined") {

    const map = L.map("property-map").setView(
        [-33.9249, 18.4241],
        11
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([-33.9249, 18.4241])
        .addTo(map)
        .bindPopup("Our listed properties are located in Cape Town.")
        .openPopup();
}

// House property search

const houseSearch = document.getElementById("house-search");
const houseSearchButton = document.getElementById("house-search-button");
const houseCards = document.querySelectorAll(".house-card");
const houseSearchMessage = document.getElementById("house-search-message");

if (houseSearch && houseSearchButton) {

    houseSearchButton.addEventListener("click", function() {

        const searchValue = houseSearch.value.toLowerCase().trim();
        let results = 0;

        houseCards.forEach(function(house) {

            const location = house.dataset.location.toLowerCase();

            if (location.includes(searchValue)) {
                house.style.display = "block";
                results++;
            } else {
                house.style.display = "none";
            }

        });

        if (results === 0) {
            houseSearchMessage.textContent = "No houses found in that location.";
        } else {
            houseSearchMessage.textContent = results + " house(s) found.";
        }

    });

}



// Property enquiry form validation

const enquiryForm = document.getElementById("enquiry-form");

if (enquiryForm) {
    enquiryForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const enquiryName = document.getElementById("enquiry-name").value.trim();
        const enquiryResponse = document.getElementById("enquiry-response");

        if (enquiryName.length < 2) {
            enquiryResponse.textContent = "Please enter a valid full name.";
            return;
        }

        enquiryResponse.textContent =
            "Thank you, " + enquiryName +
            ". Your property enquiry has been submitted successfully.";

        enquiryForm.reset();
    });
}



// Contact form email preparation

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const contactName = document.getElementById("contact-name").value.trim();
        const contactEmail = document.getElementById("contact-email").value.trim();
        const contactPhone = document.getElementById("contact-phone").value.trim();
        const contactSubject = document.getElementById("contact-subject").value.trim();
        const contactMessage = document.getElementById("contact-message").value.trim();

        const recipient = "infotebogo@properties.co.za";

        const emailSubject = encodeURIComponent(contactSubject);

        const emailBody = encodeURIComponent(
            "Name: " + contactName +
            "\nEmail: " + contactEmail +
            "\nContact Number: " + contactPhone +
            "\n\nMessage:\n" + contactMessage
        );

        window.location.href =
            "mailto:" + recipient +
            "?subject=" + emailSubject +
            "&body=" + emailBody;

        document.getElementById("contact-response").textContent =
            "Your email application should open with your message prepared. Please send the email from there.";
    });
}
