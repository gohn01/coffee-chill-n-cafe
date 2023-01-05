// -------------------side scroll bar-------------------------

function arrowL() {
    let left = document.querySelector(".scroll-images");
    left.scrollBy(350, 0)
}

function arrowR() {
    let right = document.querySelector(".scroll-images");
    right.scrollBy(-350, 0)
}


// ---------------------- Hamburger Menu ------------------------

const bar = document.getElementById('bar')
const nav = document.getElementById('navbar')
const close = document.getElementById('close')


if (bar) {
    bar.addEventListener('click', () => {
        navbar.classList.add('active')
    })
}

if (close) {
    close.addEventListener('click', () => {
        navbar.classList.remove('active')
    })
}

// ---------------- add to cart -------------------

let carts = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Affogato',
        tag: 'affogato',
        price: 50,
        inCart: 0
    },
    {
        name: 'Americano',
        tag: 'americano',
        price: 20,
        inCart: 0
    },
    {
        name: 'Black',
        tag: 'black',
        price: 30,
        inCart: 0
    },
    {
        name: 'Cafeaulait',
        tag: 'cafeaulait',
        price: 40,
        inCart: 0
    },
    {
        name: 'Cappuccino',
        tag: 'cappuccino',
        price: 35,
        inCart: 0
    },
    {
        name: 'Coffee Drinks',
        tag: 'coffeedrinks',
        price: 20,
        inCart: 0
    },
    {
        name: 'Cortado',
        tag: 'cortado',
        price: 45,
        inCart: 0
    },
    {
        name: 'Doppio',
        tag: 'doppio',
        price: 30,
        inCart: 0
    },
    {
        name: 'Espresso',
        tag: 'espresso',
        price: 25,
        inCart: 0
    },
    {
        name: 'Flatwhite',
        tag: 'flatwhite',
        price: 50,
        inCart: 0
    },
    {
        name: 'Galao',
        tag: 'galao',
        price: 50,
        inCart: 0
    },
    {
        name: 'Irish',
        tag: 'irish',
        price: 50,
        inCart: 0
    },
    {
        name: 'Latte',
        tag: 'latte',
        price: 30,
        inCart: 0
    },
    {
        name: 'Lungo',
        tag: 'lungo',
        price: 40,
        inCart: 0
    },
    {
        name: 'Mocha',
        tag: 'mocha',
        price: 30,
        inCart: 0
    },
    {
        name: 'Red Eye',
        tag: 'redeye',
        price: 60,
        inCart: 0
    },
    {
        name: 'Ristretto',
        tag: 'ristretto',
        price: 60,
        inCart: 0
    }

    
]


for (let i=0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
    
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers)

    if ( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1 );
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }
    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {

        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1 ;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify
    (cartItems));
}

function totalCost(product) {
    // console.log("The product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);
    console.log(typeof cartCost );

    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else { 
        localStorage.setItem("totalCost", product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if( cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <i class="fa-solid fa-circle-xmark"></i>
                <span>${item.name}</span>
                <img src="../images/coffee/${item.tag}.jpg">
            </div>
            <div class="price">
                $${item.price},00
            </div>
            <div class="quantity">
                <i class="fa-solid fa-arrow-left"></i>
                <span>${item.inCart}</span>
                <i class="fa-solid fa-arrow-right"></i>
            </div>
            <div class="total">
                $${item.inCart * item.price},00
            </div>
            `;
        })

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>

        `
    }
}

onLoadCartNumbers();
displayCart();