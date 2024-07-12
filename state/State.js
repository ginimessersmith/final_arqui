// state/State.js
class State {
    constructor(product) {
        this.product = product;
    }
    
    advanceState() {
        throw new Error("This method must be overridden!");
    }

    canModifyPurchasePrice() {
        throw new Error("This method must be overridden!");
    }
}
