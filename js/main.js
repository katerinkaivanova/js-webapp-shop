class Products {
    constructor(container = '.products') {
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this.totalAmount = 0
        this.init()
    }

    init() {
        this._fetchGoods();
        this._render();
    }

    _fetchGoods() {
        this.data = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Keyboard', price: 70},
            {id: 3, title: 'Mouse', price: 46},
            {id: 4, title: 'Gamepad', price: 54},
            {id: 5, title: 'Chair', price: 30},
        ];
    }

    _render() {
        const block = document.querySelector(this.container);
        for (let el of this.data) {
            const product = new ProductItem(el);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }

    getTotal() {
        for (let product of this.allProducts) {
            this.totalAmount += product.price;
        }
        return this.totalAmount
    }
}


class ProductItem {
    constructor(product, img = "https://placehold.it/200x150") {
        this.price = product.price;
        this.title = product.title;
        this.id = product.id;
        this.img = img
    }

    render() {
        return `<div class="product-item">
                 <img src="${this.img}" alt="${this.title}">
                 <div class="desc">
                     <h3 class="product-item-title">${this.title}</h3>
                     <p class="product-item-price">${this.price}</p>
                     <button class="buy-btn">Купить</button>
                 </div>
             </div>`
    }
}


class Cart {
    constructor() {
        this.allProducts = [];
        this.init()
    }

    init() {
        this.allProducts = this.getProducts();
    }

    getProducts() {} // cодержимое корзины

    getSize() {} // количество элементов корзины

    getTotal() {} // общая сумма корзины

    addProduct() {} // добавить продукт по id

    removeProduct() {} // удалить продукт по id
}


class CartItem {
    constructor(product) {
        this.id = product.id;
    }

    getPrice(id) {} // цена товара

    getQuantity(id) {} // количество товара

    getValue(id) {} // общая сумма товара
}

const products = new Products();
const totalRes = products.getTotal();
console.log(totalRes);

const cart = new Cart();
