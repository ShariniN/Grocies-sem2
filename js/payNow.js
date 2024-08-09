document.addEventListener("DOMContentLoaded", () => {
    const cartContent = document.querySelector(".cart-content");
    const cartTotal = document.querySelector(".cart-total");
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const form = document.getElementById('multiStepForm');
    const deliverySummary = document.querySelector('.delivery-summary');
    const successAnimation = document.querySelector('.success-animation');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    let currentStep = 0;

    // Function to display cart items and total price
    const displayCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContent.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div>
                    <h4>${item.title}</h4>
                    <h5>$${item.price}</h5>
                    <p>Quantity: ${item.amount}</p>
                </div>
            `;
            cartContent.appendChild(div);
            total += item.price * item.amount;
        });

        cartTotal.innerText = `Total: $${total.toFixed(2)}`;
    };

    // Function to show delivery summary
    const showSummary = () => {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;

        document.getElementById("summary-name").innerText = `${firstName} ${lastName}`;
        document.getElementById("summary-address").innerText = address;
        document.getElementById("summary-email").innerText = email;

        deliverySummary.style.display = "block";
    };

    // Function to change the form step
    const changeStep = (increment) => {
        steps[currentStep].classList.remove('active');
        currentStep += increment;
        steps[currentStep].classList.add('active');
        if (currentStep === 1) showSummary(); 
    };

    // Event listener for "Next" button
    nextBtn.addEventListener('click', () => {
        if (validateStep()) {
            changeStep(1);
        }
    });

    // Event listener for "Previous" button
    prevBtn.addEventListener('click', () => changeStep(-1));

    // Event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateStep()) {
            form.style.display = 'none';
            successAnimation.style.display = 'block';
            displayDeliveryDate();
        }
    });

    // Function to validate user input
    const validateStep = () => {
        let isValid = true;
        const fields = steps[currentStep].querySelectorAll('input, textarea');
        const validations = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            cardNumber: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
            cvv: /^\d{3,4}$/
        };

        fields.forEach(field => {
            const errorElement = document.getElementById(`${field.id}Error`);
            const value = field.value.trim();
            const validationPattern = validations[field.id];

            if (!value) {
                isValid = false;
                errorElement.innerText = `${field.previousElementSibling.innerText} is required`;
            } else if (validationPattern && !validationPattern.test(value)) {
                isValid = false;
                errorElement.innerText = `Invalid ${field.previousElementSibling.innerText}`;
            } else {
                errorElement.innerText = '';
            }
        });

        return isValid;
    };

    // Function to display estimated delivery date
    const displayDeliveryDate = () => {
        const deliveryDateElement = document.getElementById('deliveryDate');
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 2);

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        deliveryDateElement.innerText = `Estimated Delivery Date: ${deliveryDate.toLocaleDateString(undefined, options)}`;
    };

    displayCart();
});
