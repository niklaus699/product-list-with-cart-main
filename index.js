// index.js
document.addEventListener('DOMContentLoaded', () => {
    const dessertsContainer = document.querySelector('.desserts');

    // Fetch dessert data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(dessert => createDessertCard(dessert));
        })
        .catch(error => console.error('Error loading desserts:', error));

    const createDessertCard = (dessert) => {
        const card = document.createElement('div');
        card.className = 'dessert-card';

        // Create image element
        const img = document.createElement('img');
        img.className = 'order-image';
        img.src = dessert.image.desktop;
        img.alt = dessert.name;

        // Create button
        // Create the multi-icon button
        const incDecBtn = document.createElement('button');
        incDecBtn.className = 'inc-dec-btn';

        const cartIcon = document.createElement('img');
        cartIcon.className = 'cart-icon';
        cartIcon.src = './assets/images/icon-add-to-cart.svg';


        // Minus icon
        const minusIcon = document.createElement('img');
        minusIcon.src = './assets/images/icon-decrement-quantity.svg'; // Change to your path
        minusIcon.alt = '-';
        minusIcon.className = 'icon icon-left';

        // Text span (center)
        const textContent = document.createElement('span');
        textContent.className = 'btn-text';
        textContent.textContent = 'Add to Cart';

        // Plus icon
        const plusIcon = document.createElement('img');
        plusIcon.src = './assets/images/icon-increment-quantity.svg'; // Change to your path
        plusIcon.alt = '+';
        plusIcon.className = 'icon icon-right';

        // Append icons + text into the button
        incDecBtn.appendChild(cartIcon);
        incDecBtn.appendChild(minusIcon);
        incDecBtn.appendChild(textContent);
        incDecBtn.appendChild(plusIcon);


        // Add event listeners for increment/decrement
        minusIcon.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent click bubbling to the button
            decrementItem(dessert);
        });
        plusIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            incrementItem(dessert);
        });


        // Create info elements
        const category = document.createElement('p');
        category.className = 'order-info';
        category.textContent = dessert.category;

        const name = document.createElement('h4');
        name.className = 'order-name';
        name.textContent = dessert.name;

        const price = document.createElement('h4');
        price.className = 'order-price';
        price.textContent = `$${dessert.price.toFixed(2)}`;

        // Assemble card
        card.append(img, incDecBtn, category, name, price);
        dessertsContainer.appendChild(card);
    }
    const cart = {};
    const cartItemsElement = document.getElementById('cartItems');
    const cartCountElement = document.createElement('h4');
    const cartTotalElement = document.createElement('h4');
    const cartTotalElementText = document.createElement('h4');
    const cartTotalElementDiv = document.createElement('div');
    const incrementItem = (dessert) => {
        // Add your cart logic here
        const priceTag = dessert.price;
        const itemName = dessert.name;
        if (!cart[itemName]) {
            cart[itemName] = {
                price: priceTag,
                amount: 1
            }
        } else {
            cart[itemName].amount++;
        }
        updateCartUI()
        console.log('Added to cart:', dessert.name, );
    }

    const decrementItem = (dessert) => {
        const priceTag = dessert.price;
        const itemName = dessert.name;
        if (!cart[itemName]) {
            cart[itemName] = {
                price: priceTag,
                amount: 0
            }
        }
        if (cart[itemName].amount == 0) {
            cart[itemName].amount = 0;
        } else {
            cart[itemName].amount--;
        }
        updateCartUI()
        console.log('Added to cart:', dessert.name, );
    }

    const updateCartUI = () => {
        cartItemsElement.innerHTML = '';
        let total = 0;
        let totalQuantity = 0;
        for (const [itemName, itemData] of Object.entries(cart)) {
            const itemTotal = itemData.price * itemData.amount;
            console.log(itemData.amount);
            total += itemTotal;
            totalQuantity += itemData.quantity;

            // Create a <li> element to show: Name, Price, Quantity, and Subtotal
            const li = document.createElement('li');

            // Create a span element for the x icon so i can style it
            const xIcon = document.createElement('span');
            xIcon.textContent = `${itemData.amount}x`;
            xIcon.className = 'x-icon';


            // Create an img element so user can remove an order onclick
            const removeIcon = document.createElement('img');
            removeIcon.className = 'remove-icon';
            removeIcon.src = './assets/images/icon-remove-item.svg';
            removeIcon.alt = 'x';


            // Create a paragraph element that would contain details of each order and give it a classname
            const paragraph = document.createElement('p');
            paragraph.className = 'order-paragraph';

            paragraph.textContent = `  @ $${itemData.price.toFixed(2)}  $${itemTotal.toFixed(2)}`;
            paragraph.prepend(xIcon);
            paragraph.appendChild(removeIcon);
            li.textContent = `${itemName} `;
            li.appendChild(paragraph);
            cartItemsElement.appendChild(li);


            // Update total items count and total cost
            cartCountElement.textContent = totalQuantity;
            cartTotalElementText.textContent = 'Order total';
            cartTotalElement.textContent = `$${total.toFixed(2)}`;
            cartTotalElement.className = 'total-amount';
            cartTotalElementDiv.className = 'total-amount-container';
            cartTotalElementDiv.append(cartTotalElementText, cartTotalElement);
            cartItemsElement.appendChild(cartTotalElementDiv);
        }
    }
});