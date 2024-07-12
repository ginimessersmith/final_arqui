class BeverageStrategy extends IStrategy {
    calculate(purchasePrice) {
        return (purchasePrice * 1.10).toFixed(2);
    }
}
