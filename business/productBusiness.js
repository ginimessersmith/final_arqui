class ProductBusiness {
    constructor(data) {
        this.data = data;
    }

    createContext(type) {
        const strategy = this._getStrategy(type);
        return new Context(strategy);
    }

    _getStrategy(type) {
        switch (type) {
            case 'bebida':
                return new BeverageStrategy();
            case 'abarrotes':
                return new GroceryStrategy();
            default:
                return {
                    calculate: price => price.toFixed(2)
                };
        }
    }

    _getStateInstance(product, state) {
        switch (state) {
            case 'REGISTRADO':
                return new RegisteredState(product);
            case 'REVISADO':
                return new ReviewedState(product);
            case 'GUARDADO':
                return new SavedState(product);
            default:
                return new RegisteredState(product);
        }
    }

    createProduct(code, name, purchasePrice, type, state = 'REGISTRADO') {
        const context = this.createContext(type);
        const salePrice = parseFloat(context.calculate(purchasePrice));
        const product = {
            code,
            name,
            purchasePrice,
            type,
            salePrice,
            state: state,
            context: context,
            setState: function (newState) {
                this.state = newState;
            },
            canModifyPurchasePrice: function () {
                return this.state.canModifyPurchasePrice();
            },
            nextStatus: function () {
                this.state.advanceState();
            },
            toJSON: function () {
                return {
                    code: this.code,
                    name: this.name,
                    purchasePrice: this.purchasePrice,
                    type: this.type,
                    salePrice: this.salePrice,
                    state: this.state.name
                };
            },
            updatePurchasePrice: function (newPurchasePrice) {
                if (this.canModifyPurchasePrice()) {
                    this.purchasePrice = newPurchasePrice;
                    this.salePrice = parseFloat(this.context.calculate(newPurchasePrice));
                }
            },
            setStrategy: function (newStrategy) {
                this.context.setStrategy(newStrategy);
                this.salePrice = parseFloat(this.context.calculate(this.purchasePrice));
            }
        };

        product.state = this._getStateInstance(product, state);
        return product;
    }

    createProductFromData(productData) {
        return this.createProduct(
            productData.code,
            productData.name,
            productData.purchasePrice,
            productData.type,
            productData.state
        );
    }

    addProduct(product) {
        const productInstance = this.createProduct(
            product.code,
            product.name,
            product.purchasePrice,
            product.type,
            product.state
        );
        this.data.addProduct(productInstance.toJSON());
    }

    getProducts() {
        return this.data.getProducts().map(productData => this.createProductFromData(productData));
    }

    getProductTypes() {
        return this.data.getProductTypes();
    }

    updateProductStatus(productId, newStatus) {
        const product = this.getProducts().find(product => product.code === productId);
        if (product) {
            product.setState(newStatus);
            this.data.updateProduct(product.toJSON());
        }
    }

    advanceProductStatus(productId) {
        const product = this.getProducts().find(product => product.code === productId);
        if (product) {
            product.nextStatus();
            this.data.updateProduct(product.toJSON());
        }
    }

    updatePurchasePrice(productId, newPurchasePrice) {
        const product = this.getProducts().find(product => product.code === productId);
        if (product) {
            product.updatePurchasePrice(newPurchasePrice);
            this.data.updateProduct(product.toJSON());
        }
    }

    setProductStrategy(productId, newStrategy) {
        const product = this.getProducts().find(product => product.code === productId);
        if (product) {
            product.setStrategy(newStrategy);
            this.data.updateProduct(product.toJSON());
        }
    }
    
}

window.ProductBusiness = ProductBusiness;
