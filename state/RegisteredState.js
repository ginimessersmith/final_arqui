// state/RegisteredState.js
class RegisteredState extends State {
    constructor(product) {
        super(product);
        this.name = 'REGISTRADO';
    }

    advanceState() {
        this.product.setState(new ReviewedState(this.product));
    }

    canModifyPurchasePrice() {
        return true;
    }
}
