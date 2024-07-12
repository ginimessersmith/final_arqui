class Product {
    constructor(code, name, purchasePrice, type, state = 'REGISTRADO') {
        this.code = code;
        this.name = name;
        this.purchasePrice = purchasePrice;
        this.type = type;
        this.strategy = this._getStrategy(type);
        this.salePrice = parseFloat(this.strategy.calculate(purchasePrice));
        this.state = this._getStateInstance(state);
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

    _getStateInstance(state) {
        switch (state) {
            case 'REGISTRADO':
                return new RegisteredState(this);
            case 'REVISADO':
                return new ReviewedState(this);
            case 'GUARDADO':
                return new SavedState(this);
            default:
                return new RegisteredState(this);
        }
    }

    setState(newState) {
        this.state = newState;
    }

    canModifyPurchasePrice() {
        return this.state.canModifyPurchasePrice();
    }

    nextStatus() {
        this.state.advanceState();
    }

    toJSON() {
        return {
            code: this.code,
            name: this.name,
            purchasePrice: this.purchasePrice,
            type: this.type,
            salePrice: this.salePrice,
            state: this.state.name
        };
    }
}
