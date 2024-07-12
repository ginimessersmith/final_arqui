// state/SavedState.js
class SavedState extends State {
    constructor(product) {
        super(product);
        this.name = 'GUARDADO';
    }

    advanceState() {
        console.log("Already saved, no further transitions.");
    }

    canModifyPurchasePrice() {
        return false;
    }
}
