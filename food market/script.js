/* =============================================
   FRESH MARKET — Interactive JavaScript
   ============================================= */

// -----------------------------------------------
// PRODUCTS PAGE: Intercept "Buy Now" clicks
// Grabs the product image + name from the card
// and passes them to buy.html via URL parameters
// -----------------------------------------------
function setupBuyButtons() {
  var buyButtons = document.querySelectorAll(".buy-btn");

  buyButtons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      // Prevent the default anchor tag navigation
      e.preventDefault();
      
      // Stop the click from bubbling up to the anchor tag just in case
      e.stopPropagation();

      var card = btn.closest(".card");
      if (!card) return;

      var imgEl = card.querySelector(".card-img");
      var nameEl = card.querySelector("h3");

      var imgSrc = imgEl ? imgEl.getAttribute("src") : "";
      var productName = nameEl ? nameEl.textContent.trim() : "Grocery Item";

      // Navigate to buy.html with product info in the URL
      window.location.href =
        "buy.html?img=" + encodeURIComponent(imgSrc) +
        "&name=" + encodeURIComponent(productName);
    });
  });
  
  // Also intercept clicks on the anchor tag wrapping the button to prevent navigation
  var cardLinks = document.querySelectorAll('.card a[href="buy.html"]');
  cardLinks.forEach(function(link) {
    link.addEventListener("click", function(e) {
      e.preventDefault();
    });
  });
}

// -----------------------------------------------
// BUY PAGE: Read URL parameters and display
// the correct product image and name
// -----------------------------------------------
function loadProductOnBuyPage() {
  // Only run on buy.html
  if (window.location.href.indexOf("buy.html") === -1) return;

  var params = new URLSearchParams(window.location.search);
  var imgSrc = params.get("img");
  var productName = params.get("name");

  // Update the product image
  if (imgSrc) {
    var imgEl = document.querySelector(".order-image img");
    if (imgEl) {
      imgEl.src = decodeURIComponent(imgSrc);
      imgEl.alt = productName || "Product";
    }
  }

  // Update the product title
  if (productName) {
    var titleEl = document.querySelector(".order-details h1");
    if (titleEl) {
      titleEl.textContent = decodeURIComponent(productName);
    }
  }
}

// -----------------------------------------------
// ORDER BUTTON: Confirm and place order alert
// -----------------------------------------------
function setupOrderButton() {
  var orderBtn = document.querySelector(".order-btn");
  if (!orderBtn) return;

  orderBtn.addEventListener("click", function () {
    var qtyInput = document.getElementById("qty");
    var qty = qtyInput ? parseInt(qtyInput.value) : 1;

    if (qty < 1 || isNaN(qty)) {
      alert("Please enter a valid quantity (at least 1).");
      return;
    }

    var titleEl = document.querySelector(".order-details h1");
    var itemName = titleEl ? titleEl.textContent.trim() : "Grocery Item";

    var priceEl = document.querySelector(".order-price");
    var price = priceEl ? priceEl.textContent.trim() : "₹49.00";

    var confirmed = confirm(
      "Order Summary\n" +
      "─────────────────\n" +
      "Item: " + itemName + "\n" +
      "Quantity: " + qty + "\n" +
      "Price: " + price + " each\n" +
      "─────────────────\n\n" +
      "Confirm your order?"
    );

    if (confirmed) {
      alert("Order placed successfully!\nThank you for shopping at Fresh Market.");
    } else {
      alert("Order cancelled. Feel free to continue shopping!");
    }
  });
}

// -----------------------------------------------
// WELCOME ALERT (home page only, once per session)
// -----------------------------------------------
function showWelcome() {
  if (window.location.href.indexOf("web.html") === -1) return;

  var visited = sessionStorage.getItem("welcomed");
  if (!visited) {
    setTimeout(function () {
      alert("Welcome to Fresh Market!\nShop smart, live fresh.");
      sessionStorage.setItem("welcomed", "true");
    }, 500);
  }
}

// -----------------------------------------------
// BACK TO TOP BUTTON
// -----------------------------------------------
function setupBackToTop() {
  var btn = document.createElement("button");
  btn.textContent = "↑ Top";
  btn.id = "back-to-top";
  btn.style.cssText =
    "position:fixed; bottom:30px; right:30px; padding:10px 16px; " +
    "background-color:#2E7D32; color:#fff; border:none; border-radius:8px; " +
    "font-size:14px; font-weight:600; cursor:pointer; display:none; z-index:1000;";
  document.body.appendChild(btn);

  window.addEventListener("scroll", function () {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  });

  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// -----------------------------------------------
// INITIALIZE
// -----------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  showWelcome();
  setupBuyButtons();
  loadProductOnBuyPage();
  setupOrderButton();
  setupBackToTop();
});