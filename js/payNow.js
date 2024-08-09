document.addEventListener("DOMContentLoaded", () => {
    const cartContent = document.querySelector(".cart-content");
    const cartTotal = document.querySelector(".cart-total");
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const form = document.getElementById('Form');
    const deliverySummary = document.querySelector('.delivery-summary');
    const successAnimation = document.querySelector('.success-animation');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    let currentStep = 0;

    // Function to display the cart content
    const displayCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartContent.innerHTML = "";
        let total = 0;

        // Loop through each cart item and append it to the cart content
        cart.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <img src=${item.image} alt=${item.title}>
                <div>
                    <h4>${item.title}</h4>
                    <h5>LKR ${item.price}</h5>
                    <p>Quantity: ${item.amount}</p>
                </div>
            `;
            cartContent.appendChild(div);
            total += item.price * item.amount;
        });

        // Display the total price of items in the cart
        cartTotal.innerText = `Total: LKR ${total.toFixed(2)}`;
    };

    // Function to display a summary of the delivery information
    const showSummary = () => {
        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const address = document.getElementById("address").value;

        document.getElementById("summary-name").innerText = `${firstName} ${lastName}`;
        document.getElementById("summary-address").innerText = address;
        document.getElementById("summary-email").innerText = email;

    };

    // Function to navigate between form steps
    const changeStep = (increment) => {
        steps[currentStep].classList.remove('active');
        currentStep += increment;
        steps[currentStep].classList.add('active');
        if (currentStep === 1) showSummary(); 
    };

    // Event listener for the "Next" button
    nextBtn.addEventListener('click', () => {
        if (validateStep()) {
            changeStep(1); 
        }
    });

    // Event listener for the "Previous" button
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

    // Function to validate the current form step
    const validateStep = () => {
        if (currentStep === 0) { 
            let isValid = true;
            const currentStepFields = steps[currentStep].querySelectorAll('input, textarea');

            currentStepFields.forEach(field => {
                const errorElement = document.getElementById(`${field.id}Error`);
                const value = field.value.trim();
                const validations = {
                    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                    cardNumber: /^\d{4}-\d{4}-\d{4}-\d{4}$/, 
                    cvv: /^\d{3,4}$/ 
                };

                // Display error messages if validation fails
                if (!value) {
                    isValid = false;
                    errorElement.innerText = `${field.previousElementSibling.innerText} is required`;
                } else if (validations[field.id] && !validations[field.id].test(value)) {
                    isValid = false;
                    errorElement.innerText = `Invalid ${field.previousElementSibling.innerText}`;
                } else {
                    errorElement.innerText = '';
                }
            });

            return isValid;
        } else {
            return true; 
        }
    };

    // Function to display the estimated delivery date
    const displayDeliveryDate = () => {
        const deliveryDateElement = document.getElementById('deliveryDate');
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 2); 

        // Format the delivery date for display
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        deliveryDateElement.innerText = `Estimated Delivery Date: ${deliveryDate.toLocaleDateString(undefined, options)}`;
    };

    displayCart(); 
});
