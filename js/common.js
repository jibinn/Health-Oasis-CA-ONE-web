document.addEventListener('DOMContentLoaded', ready);

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

    var addToCartButtons = document.getElementsByClassName('btn btn-primary');
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
// JavaScript to toggle navigation and update button text/icon
var isNavOpen = false; // Keep track of navigation state

document.getElementById('toggle-nav').addEventListener('click', function() {
  isNavOpen = !isNavOpen; // Toggle navigation state

  // Update button text based on navigation state
  document.getElementById('toggle-text').innerText = isNavOpen ? 'Hide Navigation' : 'Show Navigation';

  // Update button icon based on navigation state
  var iconElement = document.querySelector('#toggle-nav .ri-menu-line');
  iconElement.className = isNavOpen ? 'ri-close-line' : 'ri-menu-line';
});
