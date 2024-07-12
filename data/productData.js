class ProductData {
    constructor() {
        this.products = JSON.parse(localStorage.getItem('products'))?.map(productData => ({
            code: productData.code,
            name: productData.name,
            purchasePrice: productData.purchasePrice,
            type: productData.type,
            state: productData.state
        })) || [];
    }

    addProduct(product) {
        this.products.push(product);
        this._commit();
    }

    getProducts() {
        return this.products;
    }

    getProductById(productId) {
        return this.products.find(product => product.code === productId);
    }

    updateProduct(updatedProduct) {
        const index = this.products.findIndex(product => product.code === updatedProduct.code);
        if (index !== -1) {
            this.products[index] = updatedProduct;
            this._commit();
        }
    }

    getProductTypes() {
        return JSON.parse(localStorage.getItem('productTypes')) || [];
    }

    _commit() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }
}

window.ProductData = ProductData;
