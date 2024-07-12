// state/ReviewedState.js
class ReviewedState extends State {
    constructor(product) {
        super(product);
        this.name = 'REVISADO';
    }

    advanceState() {
        this.product.setState(new SavedState(this.product));
    }

    canModifyPurchasePrice() {
        return true;
    }
}
