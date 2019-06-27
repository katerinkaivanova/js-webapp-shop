const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Keyboard', price: 70},
    {id: 3, title: 'Mouse', price: 46},
    {id: 4, title: 'Gamepad', price: 68},
    {id: 5, title: 'Chair', price: 168},
];

const renderProduct = (title, price) => {
    return `<div class="product-item">
                <h3 class="product-item-title">${title}</h3>
                <p class="product-item-price">${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};

const renderProductList = list => {
    const productList = list.map(item => renderProduct(item.title, item.price));
    document.querySelector(`.products`).innerHTML = productList.join('');
};

renderProductList(products);

