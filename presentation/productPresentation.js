class ProductPresentation {
    constructor(business) {
        this.business = business;
        this.form = document.getElementById('productForm');
        this.productList = document.getElementById('productList');
        this.code = document.getElementById('code');
        this.name = document.getElementById('name');
        this.purchasePrice = document.getElementById('purchasePrice');
        this.type = document.getElementById('type');
    }

    initialize() {
        this._populateProductTypes();
        this._bindFormSubmit();
        this._renderProductList();
    }

    _populateProductTypes() {
        const productTypes = this.business.getProductTypes();
        this.type.innerHTML = ''; // Clear existing options
        productTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type.id;
            option.textContent = type.description;
            this.type.appendChild(option);
        });
    }

    _bindFormSubmit() {
        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            const product = {
                code: this.code.value,
                name: this.name.value,
                purchasePrice: parseFloat(this.purchasePrice.value),
                type: this.type.value,
                state: 'REGISTRADO'
            };
            this.business.addProduct(product);
            this._renderProductList();
            this.form.reset();
        });
    }

    _renderProductList() {
        const products = this.business.getProducts();
        this.productList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.code} - ${product.name} - $${product.purchasePrice} - $${product.salePrice} - ${product.type} - ${product.state.name}`;
            if (product.state.name !== 'GUARDADO') {
                const updatePriceButton = document.createElement('button');
                updatePriceButton.textContent = 'Actualizar Precio';
                updatePriceButton.addEventListener('click', () => {
                    const newPrice = prompt('Ingrese el nuevo precio:', product.purchasePrice);
                    if (newPrice) {
                        this.business.updatePurchasePrice(product.code, parseFloat(newPrice));
                        this._renderProductList();
                    }
                });
                li.appendChild(updatePriceButton);

                const nextButton = document.createElement('button');
                nextButton.textContent = 'Siguiente Estado';
                nextButton.addEventListener('click', () => {
                    this.business.advanceProductStatus(product.code);
                    this._renderProductList();
                });
                li.appendChild(nextButton);
            }
            this.productList.appendChild(li);
        });
    }
}

window.ProductPresentation = ProductPresentation;
