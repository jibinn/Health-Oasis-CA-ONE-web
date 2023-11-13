
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is ready');
    loadCartFromLocalStorage();
    updateCartCount(); // Update cart count on page load
});



function updateCartCount() {
    var cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        var cartItemCount = getCartItemCount();
        cartCountElement.innerText = cartItemCount;
    }
}

// Load from localStorage
function loadCartFromLocalStorage() {
    var cartItemsContainer = document.getElementById('cart-items-container');
    var savedCartItems = localStorage.getItem('cartItems');

    if (cartItemsContainer && savedCartItems) {
        var cartItems = JSON.parse(savedCartItems);

        // Clear the existing content
        cartItemsContainer.innerHTML = '';

        // Add each item to the cart
        cartItemsContainer.innerHTML = cartItems;
    }

    updateCartTotal();
    updateCartCount();
}


// Function to get the total number of items in the cart
function getCartItemCount() {
    var cartRows = document.getElementsByClassName('cart-row');
    var itemCount = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var quantityInput = cartRows[i].getElementsByClassName('cart-quantity-input')[0];
        itemCount += parseInt(quantityInput.value);
    }

    return itemCount;
}


// Save to localStorage
function saveCartToLocalStorage() {
    var cartItems = document.getElementById('cart-items-container').innerHTML;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function purchaseClicked() {
    alert('Thank you for your purchase');
    updateCartTotal();
    updateCartCount(); // Update cart count after purchase
    saveCartToLocalStorage();
}


function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    updateCartCount(); // Update cart count after removing an item
    saveCartToLocalStorage();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateCartTotal();
    saveCartToLocalStorage();
}
function searchGymEquipment() {
    var searchInput = document.getElementById('search-input').value.toLowerCase();
    var equipmentItems = document.getElementsByClassName('equipment-item');

    var headerSection = document.querySelector('.header__container');
    var gymEquipmentSection = document.querySelector('.gym-equipment-content');

    if (searchInput.trim() === '') {
        // If the search input is empty, show both sections
        headerSection.style.display = 'block';
        gymEquipmentSection.style.display = 'block';
        return; // Exit the function early
    }

    // Iterate through equipment items and check if the title includes the search input
    for (var i = 0; i < equipmentItems.length; i++) {
        var item = equipmentItems[i];
        var title = item.querySelector('.item-title').textContent.toLowerCase();

        // Check if the title includes the search input
        if (title.includes(searchInput)) {
            item.style.display = 'block'; // Show matching items
        } else {
            item.style.display = 'none'; // Hide non-matching items
        }
    }

    // Hide the header section when there are search results in the gym equipment section
    headerSection.style.display = 'none';
    gymEquipmentSection.style.display = 'block';
}


// Event listener for input event on the search input
document.getElementById('search-input').addEventListener('input', function() {
    // Call the function to update suggestions
    searchGymEquipment();
});
// Call this function after the DOM is ready
function generateStars() {
    var equipmentItems = document.getElementsByClassName('equipment-item');

    for (var i = 0; i < equipmentItems.length; i++) {
        var item = equipmentItems[i];
        var ratingElement = item.querySelector('.item-rating');
        if (ratingElement) {
            var rating = parseInt(ratingElement.getAttribute('data-rating'));
            generateStarRating(rating, ratingElement);
        }
    }
}

// Helper function to generate star rating
function generateStarRating(rating, container) {
    container.innerHTML = ''; // Clear any existing content

    for (var i = 1; i <= 5; i++) {
        var star = document.createElement('span');
        star.className = i <= rating ? 'star-filled' : 'star-empty';
        star.innerHTML = '&#9733;'; // Unicode star character

        // You can customize styles for filled and empty stars in your CSS
        container.appendChild(star);
    }
}

// Call the function to generate stars after the DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    generateStars();
});


function addToCartClicked(event) {
    console.log("Add to Cart button clicked");
    var button = event.target;
    var $shopItem = $(button).closest('.equipment-item');

    if ($shopItem.length) {
        console.log("Add to Cart button clicked");
        var title = $shopItem.find('.item-title').text();
        var price = $shopItem.find('.item-price').text();
        var imageSrc = $shopItem.find('img').attr('src');
        addItemToCart(title, price, imageSrc);
        updateCartTotal();
        updateCartCount(); // Update cart count after adding an item

        // Save the cart data to localStorage
        saveCartToLocalStorage();

        // Show the pop-up animation
        showPopup();
    } else {
        console.error("Could not find parent element with class 'equipment-item'");
    }
}


// pop up
function showPopup(message) {
    const popupMessage = document.getElementById('popup-message');
    
    if (popupMessage) {
        popupMessage.innerText = message;
        const popupEl = document.querySelector('.js_success-popup');
        popupEl.classList.add('popup--visible');
        setTimeout(() => hidePopup(), 2000); // Close the popup after  (2 seconds)
    }
}


function hidePopup() {
    const popupEl = document.querySelector('.js_success-popup');
    if (popupEl) {
        popupEl.classList.remove('popup--visible');
    }
}



function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    updateCartCount(); // Update cart count after removing an item
    saveCartToLocalStorage();
}


function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItemsContainer = document.getElementById('cart-items-container');

    if (cartItemsContainer) {
        var cartItemNames = cartItemsContainer.getElementsByClassName('cart-item-title');
        for (var i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].innerText == title) {
                alert('This item is already added to the cart');
                return;
            }
        }

        var cartRowContents = `
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
                <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`;

        cartRow.innerHTML = cartRowContents;
        cartItemsContainer.appendChild(cartRow);
        cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
        cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged);
    } else {
        console.error("Cart items container not found. Make sure the 'cart-items-container' element exists.");
    }
}


function updateCartTotal() {
    var cartItemContainer = document.getElementById('cart-items-container');
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];

        // Check if the required elements are found
        if (priceElement && quantityElement) {
            var price = parseFloat(priceElement.innerText.replace('$', ''));
            var quantity = quantityElement.value;
            total = total + price * quantity;
        } else {
            console.error("Cart item elements not found");
        }
    }

    total = Math.round(total * 100) / 100;

    // Check if the element exists before updating its innerText
    var cartTotalPriceElement = document.querySelector('.cart-total-price');
    if (cartTotalPriceElement) {
        cartTotalPriceElement.innerText = '$' + total;
    }
}

// Check if the document is still loading
if (document.readyState == 'loading') {
    // If loading, wait for the DOMContentLoaded event
    document.addEventListener('DOMContentLoaded', ready);
} else {
    // If already loaded, call the ready function directly
    ready();
}

// The ready function sets up event listeners and other functionality
function ready() {
    // Add event listeners only if the elements exist on the current page
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    if (removeCartItemButtons.length > 0) {
        for (var i = 0; i < removeCartItemButtons.length; i++) {
            var button = removeCartItemButtons[i];
            button.addEventListener('click', removeCartItem);
        }
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    if (quantityInputs.length > 0) {
        for (var i = 0; i < quantityInputs.length; i++) {
            var input = quantityInputs[i];
            input.addEventListener('change', quantityChanged);
        }
    }

    var addToCartButtons = document.getElementsByClassName('add-to-cart-btn');
    if (addToCartButtons.length > 0) {
        for (var i = 0; i < addToCartButtons.length; i++) {
            var button = addToCartButtons[i];
            button.addEventListener('click', addToCartClicked);
        }
    }

    var purchaseButton = document.getElementsByClassName('btn-purchase')[0];
    if (purchaseButton) {
        purchaseButton.addEventListener('click', purchaseClicked);
    }
}
document.addEventListener('DOMContentLoaded', ready);


// join button

function scrollToService() {
    var serviceSection = document.getElementById('about');

    if (serviceSection) {
        // Use smooth scrolling behavior
        serviceSection.scrollIntoView({ behavior: 'smooth' });
    }
}


// Function to open the reservation form
function openReservationForm() {
    var reservationForm = document.getElementById('reservation-form');
    reservationForm.style.display = 'block';
}

function closeReservationForm() {
    var reservationForm = document.getElementById('reservation-form');
    reservationForm.style.display = 'none';
}

// Function to handle form submission
function submitReservation() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    // Validate form data if needed

    // Log reservation details to the console
    console.log('Reservation Details:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);

    // Optionally, you can display an alert or perform other actions
    alert('Reservation added successfully');

    // Close the form after submission
    closeReservationForm();
}

// JavaScript code for toggle button
document.getElementById('toggle-nav').addEventListener('click', function() {
    var navLinks = document.querySelector('.nav__links');
    navLinks.classList.toggle('show');
  });
  
  