const API = `https://raw.githubusercontent.com/katerinkaivanova/online-store-api/master/responses`;

class Products {
    constructor(container = '.products') {
        this.container = container;
        this.data = [];
        this.allProducts = [];
        this._fetchGoods()
            .then(() => this._render())
    }

    _fetchGoods() {
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data];
            })
            .catch(error => console.log(error));
    }

    calcSum() {
        let result = 0;
        for (let product of this.allProducts) {
            result += product.price;
        }
        return result
    }

    _render() {
        const block = document.querySelector(this.container);
        for (let el of this.data) {
            const product = new ProductItem(el);
            this.allProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }
}


class ProductItem {
    constructor(product, img = "https://placehold.it/200x150") {
        this.price = product.price;
        this.product_name = product.product_name;
        this.id_product = product.id_product;
        this.img = img
    }

    render() {
        return `<div class="product-item">
                 <img src="${this.img}" alt="${this.product_name}">
                 <div class="desc">
                     <h3 class="product-item-title">${this.product_name}</h3>
                     <p class="product-item-price">${this.price}&#36;</p>
                     <button class="buy-btn">Buy</button>
                 </div>
             </div>`
    }
}


class Cart {
    constructor(container = '.dropdown-block') {
        this.container = container;
        this.data = [];
        this.cartProducts = [];
        this._fetchGoods()
            .then(() => this._render())
    }

    _fetchGoods() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.data = [...data.contents];
            })
            .catch(error => console.log(error));
    }

    _render() {
        const block = document.querySelector(this.container);
        for (let el of this.data) {
            const product = new CartItem(el);
            this.cartProducts.push(product);
            block.insertAdjacentHTML('beforeend', product.render());
        }
    }

    getSize() {
    } // количество элементов корзины

    getSum() {
    } // общая сумма корзины

    addProduct() {
    } // добавить продукт по id

    removeProduct() {
    } // удалить продукт по id
}


class CartItem {
    constructor(product) {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        this.quantity = product.quantity
    }

    render() {
        return `<div class="cart-item">
                     <p>${this.product_name}</p>
                     <p>${this.price}&#36;</p>
                     <p>${this.quantity}</p>
                 </div>`
    }
}

const products = new Products();
const cart = new Cart();

