// class ProductType {
//     constructor(id, description) {
//         this.id = id;
//         this.description = description;
//     }
// }

const productTypes = [
    { id: 'bebida', description: 'Bebida' },
    { id: 'abarrotes', description: 'Abarrotes' }
];

localStorage.setItem('productTypes', JSON.stringify(productTypes));

