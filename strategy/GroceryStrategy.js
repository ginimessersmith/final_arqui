class GroceryStrategy extends IStrategy {
    calculate(purchasePrice) {
        return (purchasePrice * 1.15).toFixed(2);
    }
}
