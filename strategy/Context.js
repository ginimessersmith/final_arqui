class Context {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    calculate(purchasePrice) {
        return this.strategy.calculate(purchasePrice);
    }
}

window.Context = Context;
