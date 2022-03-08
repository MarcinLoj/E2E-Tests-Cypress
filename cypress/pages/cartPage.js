class CartPage {
    elements = {
        breadcrumb: () => cy.get('.active'),
        productItem: () => cy.get('#product-1')
    }
}
module.exports = new CartPage();