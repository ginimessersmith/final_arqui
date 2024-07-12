document.addEventListener('DOMContentLoaded', () => {
    const productData = new ProductData();
    const productBusiness = new ProductBusiness(productData);
    const productPresentation = new ProductPresentation(productBusiness);
    productPresentation.initialize();
});
