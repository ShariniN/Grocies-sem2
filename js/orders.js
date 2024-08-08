document.addEventListener("DOMContentLoaded", () => {
    const cartBtn = document.querySelector(".cart-btn");
    const closeCartBtn = document.querySelector(".close-cart");
    const clearCartBtn = document.querySelector(".clear-cart");
    const addFavBtn = document.querySelector(".add-fav-btn");
    const applyFavBtn = document.querySelector(".apply-fav-btn");
    const cartDOM = document.querySelector(".cart");
    const cartOverlay = document.querySelector(".cart-overlay");
    const cartItems = document.querySelector(".cart-items");
    const cartTotal = document.querySelector(".cart-total");
    const cartContent = document.querySelector(".cart-content");
    const buyNowBtn = document.querySelector(".buy-now-btn");

    // Array to store cart items
    let cart = [];

    // Select product sections
    const productSections = {
        vegetables: document.querySelector(".vegetables-grid"),
        fruits: document.querySelector(".fruits-grid"),
        meat: document.querySelector(".meat-grid"),
        dairy: document.querySelector(".dairy-grid"),
        baking: document.querySelector(".baking-grid"),
    };

    // Get products data
    function getProducts() {
        return [
            { id: "1", title: "Carrot", price: 260.0, image: "images/veg/carrot.jpg", category: "vegetables" },
            { id: "2", title: "Cauliflower", price: 320.0, image: "images/veg/cauliflower.jpg", category: "vegetables" },
            { id: "3", title: "Cucumber", price: 280.0, image: "images/veg/cucumber.jpg", category: "vegetables" },
            { id: "4", title: "Pumpkin", price: 210.0, image: "images/veg/pumpkin.jpg", category: "vegetables" },
            { id: "5", title: "Potato", price: 40.0, image: "images/veg/potato.jpg", category: "vegetables" },
            { id: "6", title: "Onion", price: 40.0, image: "images/veg/onion.jpg", category: "vegetables" },
            { id: "9", title: "Chicken", price: 500.0, image: "images/meat/chicken.jpeg", category: "meat" },
            { id: "10", title: "Beef", price: 700.0, image: "images/meat/beef.jpeg", category: "meat" },
            { id: "11", title: "Prawns", price: 800.0, image: "images/meat/prawn.jpeg", category: "meat" },
            { id: "12", title: "Fish", price: 1000.0, image: "images/meat/fish.jpeg", category: "meat" },
            { id: "13", title: "Orange", price: 600.0, image: "images/fruit/orange.jpeg", category: "fruits" },
            { id: "14", title: "Grapes", price: 900.0, image: "images/fruit/grapes.jpg", category: "fruits" },
            { id: "15", title: "Mango", price: 600.0, image: "images/fruit/mango.jpg", category: "fruits" },
            { id: "16", title: "Pineapple", price: 1200.0, image: "images/fruit/pineapple.jpeg", category: "fruits" },
            { id: "17", title: "Strawberry", price: 2000.0, image: "images/fruit/strawberry.jpeg", category: "fruits" },
            { id: "18", title: "Blueberry", price: 2500.0, image: "images/fruit/blueberry.jpeg", category: "fruits" },
            { id: "19", title: "Milk", price: 60.0, image: "images/dairy/milk.jpg", category: "dairy" },
            { id: "20", title: "Cheese", price: 300.0, image: "images/dairy/cheddar.jpg", category: "dairy" },
            { id: "21", title: "Yogurt", price: 100.0, image: "images/dairy/yogurt.jpg", category: "dairy" },
            { id: "22", title: "Butter", price: 150.0, image: "images/dairy/butter.jpg", category: "dairy" },
            { id: "23", title: "Curd", price: 200.0, image: "images/dairy/curd.jpg", category: "dairy" },
            { id: "24", title: "Flour", price: 50.0, image: "images/baking/flour.jpeg", category: "baking" },
            { id: "25", title: "Cocoa Powder", price: 400.0, image: "images/baking/cocoa.jpeg", category: "baking" },
            { id: "26", title: "Oil", price: 150.0, image: "images/baking/oil.jpeg", category: "baking" },
            { id: "27", title: "Yeast", price: 120.0, image: "images/baking/yeast.jpeg", category: "baking" },
            { id: "28", title: "Baking Soda", price: 180.0, image: "images/baking/baking.jpeg", category: "baking" },
        ];
    }

    // Display products on the page
    function displayProducts(products) {
        products.forEach((product) => {
            const div = document.createElement("div");
            div.classList.add("product");
    
            const labelForQuantity = `quantity-${product.id}`; // Unique id for the label
    
            if (product.category === "vegetables" || product.category === "fruits" || product.category === "meat") {
                div.innerHTML = `
                    <div class="img-container">
                        <img src=${product.image} alt=${product.title} class="product-img">
                    </div>
                    <h3>${product.title}</h3>
                    <h4>LKR ${product.price} per kg</h4>
                    <label for="${labelForQuantity}" class="sr-only">Quantity for ${product.title}</label>
                    <input type="number" id="${labelForQuantity}" class="quantity-input" data-id=${product.id} min="0.1" step="0.1" value="0.1"> kg
                `;
            } else {
                div.innerHTML = `
                    <div class="img-container">
                        <img src=${product.image} alt=${product.title} class="product-img">
                    </div>
                    <h3>${product.title}</h3>
                    <h4>LKR ${product.price}</h4>
                    <label for="${labelForQuantity}" class="sr-only">Quantity for ${product.title}</label>
                    <input type="number" id="${labelForQuantity}" class="quantity-input" data-id=${product.id} min="1" step="1" value="1">
                `;
            }
            productSections[product.category].appendChild(div);
        });
    }
    

    // Toggle cart visibility
    function toggleCart() {
        cartOverlay.classList.toggle("transparentBcg");
        cartDOM.classList.toggle("showCart");
    }

    // Update the cart display
    function updateCart() {
        cartContent.innerHTML = "";
        cartTotal.innerText = cart.reduce((acc, item) => acc + item.price * item.amount, 0).toFixed(2);
        cartItems.innerText = cart.length;

        cart.forEach((item) => {
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <img src=${item.image} alt=${item.title}>
                <div>
                    <h4>${item.title}</h4>
                    <h5>LKR ${(item.price * item.amount).toFixed(2)}</h5>
                    <span class="remove-item" data-id=${item.id}>remove</span>
                </div>
                <div>
                    <input type="number" class="cart-quantity-input" data-id=${item.id} min="1" value=${item.amount}>
                </div>
            `;
            cartContent.appendChild(div);
        });
    }

    // Display popup message
    function displayPopupMessage(message) {
        const popupMessage = document.querySelector(".popup-message");
        popupMessage.innerText = message;
        popupMessage.classList.add("show-popup");

        setTimeout(() => {
            popupMessage.classList.remove("show-popup");
        }, 3000);
    }

    // Handle quantity input change for adding to cart and updating cart quantities
    function handleQuantityInput(event) {
        if (event.target.classList.contains("quantity-input")) {
            const id = event.target.dataset.id;
            const quantity = parseFloat(event.target.value);
            const product = getProducts().find((product) => product.id === id);
            const cartItem = { ...product, amount: quantity };

            const existingItemIndex = cart.findIndex((item) => item.id === id);
            if (existingItemIndex !== -1) {
                cart[existingItemIndex].amount = quantity;
            } else {
                cart.push(cartItem);
            }
            updateCart();
        }

        if (event.target.classList.contains("cart-quantity-input")) {
            const id = event.target.dataset.id;
            const quantity = parseFloat(event.target.value);

            const cartItem = cart.find((item) => item.id === id);
            if (cartItem) {
                cartItem.amount = quantity;
                updateCart();
            }
        }
    }

    // Handle remove item from cart
    function handleRemoveItem(event) {
        if (event.target.classList.contains("remove-item")) {
            const id = event.target.dataset.id;
            cart = cart.filter((item) => item.id !== id);
            updateCart();
        }
    }

    // Add current cart items to favorites => local storage
    function addToFavorites() {
        localStorage.setItem('favorites', JSON.stringify(cart));
        displayPopupMessage("Favorites added successfully!");
    }

    // Apply favorites from local storage to cart
    function applyFavorites() {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        if (favorites) {
            cart = favorites;
            updateCart();
            displayPopupMessage("Favorites applied successfully!");
        } else {
            displayPopupMessage("No favorites found!");
        }
    }

    // Handle Buy Now button click
    function handleBuyNow() {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'PayNow.html';
    }

    displayProducts(getProducts());

    // Event Listeners
    cartBtn.addEventListener("click", toggleCart);
    closeCartBtn.addEventListener("click", toggleCart);
    clearCartBtn.addEventListener("click", () => {
        cart = [];
        updateCart();
    });
    document.addEventListener("input", handleQuantityInput);
    document.addEventListener("click", handleRemoveItem);
    addFavBtn.addEventListener("click", addToFavorites);
    applyFavBtn.addEventListener("click", applyFavorites);
    buyNowBtn.addEventListener("click", handleBuyNow);
});